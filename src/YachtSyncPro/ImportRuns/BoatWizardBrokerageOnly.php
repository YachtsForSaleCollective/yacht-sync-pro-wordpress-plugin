<?php
    #[AllowDynamicProperties]
	
	class YachtSyncPro_ImportRuns_BoatWizardBrokerageOnly {
   		protected $limit = 53;
		
		public $brokerageInventoryUrl = 'https://api.boats.com/inventory/search?key=';

		public function __construct($metakey = 'boats_com_api_brokerage_key') {

			$this->options = new YachtSyncPro_Options();

			$this->LocationConvert = new YachtSyncPro_LocationConvert();

			$this->BrochureCleanUp = new YachtSyncPro_BrochureCleanUp();

			$this->ChatGPTYachtDescriptionVersionTwo = new YachtSyncPro_ChatGPTYachtDescriptionVersionTwo();

			$this->key=$this->options->get($metakey);
			$this->status_override = $this->options->get('boats_com_api_brokerage_status_override');
			
			$this->brokerageInventoryUrl .= $this->key;
			$this->brokerageInventoryUrl .= (! empty($this->status_override))?'&SalesStatus='.$this->status_override:'&SalesStatus=Active,On-Order';
			
			$this->opt_prerender_brochures=$this->options->get('prerender_brochures');

			$this->euro_c_c = floatval($this->options->get('euro_c_c'));
			$this->usd_c_c = floatval($this->options->get('usd_c_c'));

			$this->urlbox_secret_key = $this->options->get('pdf_urlbox_api_secret_key');


			$this->CarryOverKeys = [
				'_yoast_wpseo_title',
				'_yoast_wpseo_metadesc'
			];
		}
		
		public function run() {
			global $wpdb;

			var_dump('Started Boats.com Brokerage Only Import');

			$offset = 0;
			$yachtsSynced = 0;

			// Sync broker inventory
			$apiCall = wp_remote_get($this->brokerageInventoryUrl, ['timeout' => 120]);

				$apiCallBody=json_decode(wp_remote_retrieve_body($apiCall), true);

				$api_status_code = wp_remote_retrieve_response_code($apiCall);

			if ($api_status_code == 200 && isset($apiCallBody['numResults'])) {
				// return;
			}
			elseif ($api_status_code == 401) {
				return ['error' => 'Error with auth'];
			}
			else {
				return ['error' => 'Error http error '.$api_status_code];
			}

	        $total = $apiCallBody['numResults'];

			//$apiCallInventory = $apiCall['body']['results'];

			//var_dump($total);

			while ($total > ($yachtsSynced)) {
				var_dump( sprintf("%.2f%%", intval((($yachtsSynced / $total)*100)))." Completed" );

				$apiUrl = $this->brokerageInventoryUrl;

				$apiUrl = $apiUrl.'&start='. $offset .'&rows='. $this->limit;

				sleep(15);

				// Sync broker inventory
				$apiCallForWhile = wp_remote_get($apiUrl, ['timeout' => 180]);

				//var_dump($apiCallForWhile);

				$apiCallForWhileBody = json_decode(wp_remote_retrieve_body($apiCallForWhile), true);

				if (! isset($apiCallForWhileBody['results']) && ! is_array($apiCallForWhileBody['results'])) {
					break;
				}

				$apiCallInventory = $apiCallForWhileBody['results'];

				if (count( $apiCallInventory ) == 0) {
					break;
				}

				foreach ($apiCallInventory as $boat) {
					$yachtsSynced++;
					$record=$boat;
					$boatC = json_decode(json_encode($boat));

					//$boatC->CompanyName = 'Italian Yacht Group';
					
		            $find_post=get_posts([
	                    'post_type' => 'syncing_ysp_yacht',
	                    'meta_query' => [

	                        array(
	                           'key' => 'DocumentID',
	                           'value' => $boat['DocumentID'],
	                           'compare' => '=',
	                       ),
	                        array(
	                           'key' => 'ImportSource',
	                           'value' => 'BoatWizard',
	                           'compare' => '=',
	                       )
	                    ],
	                ]);       

	                if (! isset($find_post[0]->ID)) {
			            if (! empty($record['BoatHullID'])) {
			                $find_post=get_posts([
			                    'post_type' => 'syncing_ysp_yacht',
			                    'meta_query' => [

			                        array(
			                           'key' => 'BoatHullID',
			                           'value' => $record['BoatHullID'],
			                           'compare' => '=',
			                       )
			                    ],
			                ]);
			            }
			            else {
			                $find_post=[];
			            }
		           	}
		           	
					$find_post_from_synced=get_posts([
	                    'post_type' => 'ysp_yacht',
	                    'meta_query' => [

	                        array(
	                           'key' => 'DocumentID',
	                           'value' => $boat['DocumentID'],
	                           'compare' => '=',
	                       ),
	                        array(
	                           'key' => 'ImportSource',
	                           'value' => 'BoatWizard',
	                           'compare' => '=',
	                       )
	                    ],
	                ]);

		           	if (! isset($find_post_from_synced[0]->ID)) {
			            if (! empty($record['BoatHullID'])) {
			                $find_post_from_synced=get_posts([
			                    'post_type' => 'ysp_yacht',
			                    'meta_query' => [

			                        array(
			                           'key' => 'BoatHullID',
			                           'value' => $record['BoatHullID'],
			                           'compare' => '=',
			                       )
			                    ],
			                ]);
			            }
			            else {
			                $find_post_from_synced=[];
			            }
		           	}	        	         
					
	                $pdf_still_e = false;
	                $yacht_updated = false;

	                if (isset($find_post_from_synced[0]->ID)) {
	                	$synced_post_id = $find_post_from_synced[0]->ID;

		                $synced_pdf = get_post_meta($synced_post_id, 'YSP_PDF_URL', true);

		                $saved_last_mod_date = get_post_meta($synced_post_id, 'LastModificationDate', true);
		                $current_last_mod_date = $boatC->LastModificationDate;
		                
		                if (!is_null($synced_pdf) && !empty($synced_pdf)) {
							$apiPDF = wp_remote_request($synced_pdf, [
								'method' => 'HEAD',

								'timeout' => 180, 
								'stream' => false, 
								
								'headers' => [
									'Content-Type'  => 'application/pdf',

								]
							]);

							$api_status_code = wp_remote_retrieve_response_code($apiPDF);

							if ($api_status_code == '200') {
								$pdf_still_e = true;
							}
						}

						if (strtotime($current_last_mod_date) > strtotime($saved_last_mod_date)) {
							$pdf_still_e = false;
							$yacht_updated = true;
						}

						if ( $pdf_still_e ) {
							$boatC->YSP_PDF_URL = $synced_pdf;
						}

						if (! empty($synced_pdf) && ! $pdf_still_e && $yacht_updated) {
							$this->BrochureCleanUp->removeUseUrl($synced_pdf);
						}

						// carry overs
						foreach ($this->CarryOverKeys as $metakey) {
							$val = get_post_meta($synced_post_id, $metakey, true);
							$boatC->{$metakey} = $val;
						}
	                }

		            $post_id=0;

		            if (isset($find_post_from_synced[0]->ID) && $yacht_updated) {
		                $post_id=$find_post_from_synced[0]->ID;

		                $wpdb->delete(
		                	$wpdb->postmeta, 
		                	[
		                		'post_id' => $find_post_from_synced[0]->ID
		                	], 
		                	['%d']
		                );
		            }
		           /* elseif (isset($find_post_from_synced[0]->ID) && $yacht_updated == false) {
		                $post_id=$find_post_from_synced[0]->ID;
		            	
		            }*/
		            elseif (isset($find_post[0]->ID)) {
		                $post_id=$find_post[0]->ID;

		                $wpdb->delete($wpdb->postmeta, ['post_id' => $find_post[0]->ID], ['%d']);
		            }

		            if (isset($boat['Images']) && is_array($boat['Images']) && count($boat['Images']) > 0) {
                        $reducedImages = $boat['Images'];

                        $reducedImages = array_map(
                        	function($img) {
                        		$reimg=[
                        			'Uri' => $img['Uri']
                        		];

                        		if (! empty($img['Caption'])) {
                        			$reimg['Caption']=$img['Caption'];
                        		}

                        		return (object) $reimg;
                        	}, 
                        	$reducedImages
                        );

                        $boatC->Images = $reducedImages;
                    }

					if (isset($boat['NominalLength'])) {
						$boatC->YSP_Length = floatval(str_replace(' ft', '', $boat['NominalLength']));
						$boatC->YSP_Length_Feet_Measurement = intval($boatC->YSP_Length);
						$boatC->YSP_Length_Inch_Measurement = round(($boatC->YSP_Length - $boatC->YSP_Length_Feet_Measurement) * 12);

						$boatC->YSP_LOAFeet = $boatC->YSP_Length;
						$boatC->YSP_LOAMeter = round(($boatC->YSP_Length * 0.3048), 2);
					}

					if (isset($boat['BeamMeasure'])) {
						$boatC->YSP_BeamFeet = floatval(str_replace(array(' ft'), '', $boat['BeamMeasure']));
						$boatC->YSP_Beam_Feet_Measurement = intval($boatC->YSP_BeamFeet);
						$boatC->YSP_Beam_Inch_Measurement = round(($boatC->YSP_BeamFeet - $boatC->YSP_Beam_Feet_Measurement) * 12);

						$boatC->YSP_BeamMeter = round(($boatC->YSP_BeamFeet * 0.3048), 2);
					}

					if (isset($boat['MaxDraft'])) {
						$boatC->YSP_Max_Draft = floatval(str_replace(array(' ft'), '', $boat['MaxDraft']));
						$boatC->YSP_Max_Draft_Feet_Measurement = intval($boatC->YSP_Max_Draft);
						$boatC->YSP_Max_Draft_Inch_Measurement = round(($boatC->YSP_Max_Draft - $boatC->YSP_Max_Draft_Feet_Measurement) * 12);
					}

		            if (isset($boat['BoatLocation'])) {
	                    $boatC->YSP_CountryID = $boat['BoatLocation']['BoatCountryID'];
	                    $boatC->YSP_City = $boat['BoatLocation']['BoatCityName'];
	                    $boatC->YSP_State = $boat['BoatLocation']['BoatStateCode'];

	                    $boatC->YSP_Full_Country = $this->LocationConvert->country[ $boatC->YSP_CountryID ];
	                    
	                    if (isset($this->LocationConvert->state[ $boatC->YSP_State ])) {
	                   		$boatC->YSP_Full_State = $this->LocationConvert->state[ $boatC->YSP_State ];
	                    }
	                    else {
	                   		$boatC->YSP_Full_State = "";
	                    }
                    }

                    if (isset($boat['SalesRep'])) {
                    	$boatC->YSP_BrokerName=$boat['SalesRep']['Name'];
                    }

                    if (isset($boat['Engines'])) {
						$boatC->YSP_EngineCount = count($boat['Engines']);
						if (isset($boat['Engines'][0]['Model'])){
							$boatC->YSP_EngineModel = $boat['Engines'][0]['Model'];
						}
						if (isset($boat['Engines'][0]['Make'])){
							$boatC->YSP_EngineMake = $boat['Engines'][0]['Make'];
						}
						if (isset($boat['Engines'][0]['Fuel'])){
							$boatC->YSP_EngineFuel = $boat['Engines'][0]['Fuel'];
						}
						if (isset($boat['Engines'][0]['EnginePower'])){
							$boatC->YSP_EnginePower = $boat['Engines'][0]['EnginePower'];
						}
						if (isset($boat['Engines'][0]['Hours'])){
							$boatC->YSP_EngineHours = $boat['Engines'][0]['Hours'];
						}
						if (isset($boat['Engines'][0]['Type'])){
							$boatC->YSP_EngineType = $boat['Engines'][0]['Type'];
						}
					}

					if (isset($boat['Images'][0]['LastModifiedDateTime'])){
						$boatC->YSP_ListingDate = $boat['Images'][0]['LastModifiedDateTime'];
					}
                    
					if (isset($boatC->AdditionalDetailDescription)) {
						foreach ($boatC->AdditionalDetailDescription as $aIndex => $description) {
							$boatC->AdditionalDetailDescription[ $aIndex ] = preg_replace('/(<[^>]+) style=".*?"/i', '$1', $description);
						}
	                }

					if (isset($boatC->GeneralBoatDescription)) {
						foreach ($boatC->GeneralBoatDescription as $gIndex => $description){
							$boatC->GeneralBoatDescription[ $gIndex ] = preg_replace('/(<[^>]+) style=".*?"/i', '$1', $description);
						}
					}

					if (isset($boat['OriginalPrice']) && isset($boat['Price'])){
						if (str_contains($boat['OriginalPrice'], 'EUR')) {
							$boatC->YSP_EuroVal = intval(str_replace(array(' EUR'), '', $boat['OriginalPrice']) );
							$boatC->YSP_USDVal = $boatC->YSP_EuroVal * $this->usd_c_c;
						} 
						else {
							$boatC->YSP_USDVal = intval(str_replace(array(' USD'), '', $boat['OriginalPrice']));
							$boatC->YSP_EuroVal = $boatC->YSP_USDVal * $this->euro_c_c;
						}
					}
					else {
						$boatC->OriginalPrice = 0;
						$boatC->YSP_USDVal = 0;
						$boatC->YSP_EuroVal = 0;
					}

					//var_dump($boatC->_yoast_wpseo_metadesc);
					
					if (
						( 
							isset($boatC->_yoast_wpseo_metadesc) 
							&& 
							( 
								empty($boatC->_yoast_wpseo_metadesc) 
								|| 
								is_null($boatC->_yoast_wpseo_metadesc)
							) 
						) 
						|| 
						! isset($boatC->_yoast_wpseo_metadesc)
					) {

						$boatC->_yoast_wpseo_metadesc = $this->ChatGPTYachtDescriptionVersionTwo->make_description(
							'Vessel Name - '.$boat['ModelYear'].' '.$boat['MakeString'].' '.$boat['Model'].' '.$boat['BoatName']. '. '.
							'Vessel Description - '.join(' ', $boatC->GeneralBoatDescription)
						);

					}

					$boatC->CompanyBoat = 1;
					$boatC->Touched_InSync=1;
					$boatC->ImportSource = "BoatWizard";
					
		            $y_post_id=wp_insert_post(
		            	apply_filters('ysp_yacht_post',
			                [
			                    'ID' => $post_id,
								'post_type' => 'syncing_ysp_yacht',
								
								'post_title' => addslashes(  $boat['ModelYear'].' '.$boat['MakeString'].' '.$boat['Model'].' '.$boat['BoatName'] ),
								
								'post_name' => sanitize_title(
									$boat['ModelYear'].'-'.$boat['MakeString'].'-'.$boat['Model']
								),
								'post_content' => join(' ', $boatC->GeneralBoatDescription),
								'post_status' => 'publish',
								'meta_input' => apply_filters('ysp_yacht_meta_sync', $boatC),

							],

							$boatC
						)
					);

					wp_set_post_terms($y_post_id, $boat['BoatClassCode'], 'boatclass', false);

					wp_set_post_terms($y_post_id, $boat['MakeString'], 'boatmaker', false);

					wp_set_post_terms($y_post_id, $boat['SaleClassCode'], 'boatcondition', false);

					wp_set_post_terms($y_post_id, $boat['BoatCategoryCode'], 'boattype', false);
					
					if ( $this->opt_prerender_brochures == 'yes' && $pdf_still_e == false && ! in_array($boatC->SalesStatus, ['Sold', 'Suspend']) ) {

						$generatorPDF = wp_remote_post(
							"https://api.urlbox.io/v1/render/async", 
							[
								'headers' => [
									'Authorization' => 'Bearer '.$this->urlbox_secret_key,
									'Content-Type' => 'application/json'
								],
								'body' => json_encode([
									'url' => get_rest_url() ."ysp/yacht-pdf?yacht_post_id=". $y_post_id,
									'webhook_url' => get_rest_url() ."ysp/set-yacht-pdf?yacht_post_id=". $y_post_id,
									'use_s3' => true,
									'format' => 'pdf'
								])
							]
						);

					}

					/*if ( defined( 'WP_CLI' ) && WP_CLI ) {
                        if (is_wp_error($y_post_id)) {
                            WP_CLI::log( 'Document ID - '. $boat['DocumentID']);

                            var_dump($boat);
                        }
                    }*/
                    
				}

				$offset = $offset + $this->limit;



			}

			return ['success' => 'Successfully Sync Boat.com Brokerage Only Feed'];

			//var_dump($yachtsSynced);

		}


	}