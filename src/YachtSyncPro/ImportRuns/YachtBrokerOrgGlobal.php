<?php
    #[AllowDynamicProperties]
	
	class YachtSyncPro_ImportRuns_YachtBrokerOrgGlobal {
		public $yachtBrokerAPIKey = '';
   		public $yachtClientId = '';
   		protected $url = '';
   		protected $yachtBrokerLimit = 23;

		public function __construct() {

			$this->options = new YachtSyncPro_Options();
			$this->LocationConvert = new YachtSyncPro_LocationConvert();

			$this->yachtBrokerAPIKey = $this->options->get('yacht_broker_org_api_token_2');
			$this->yachtClientId = $this->options->get('yacht_broker_org_id_2');
			$this->yachtBrokerageId = $this->options->get('yacht_broker_brokerage_id');

			$this->euro_c_c = floatval($this->options->get('euro_c_c'));
			$this->usd_c_c = floatval($this->options->get('usd_c_c'));

			$this->opt_prerender_brochures=$this->options->get('prerender_brochures');

			$this->CarryOverKeys = [
				'_yoast_wpseo_title',
				'_yoast_wpseo_metadesc'
			];
		}

		public function run() {
			global $wpdb;

			var_dump('Started Yacht Broker.org Co-Brokerage Import');

	        $headers = [
	            'headers' => [
	                'X-API-KEY'   => $this->yachtBrokerAPIKey,
	                'X-CLIENT-ID' => $this->yachtClientId
	            ],

	            'timeout' => 120
	        ];

	        $apiUrlOne  = 'https://api.yachtbroker.org/vessel?key='.$this->yachtBrokerAPIKey.'&id='. $this->yachtClientId .'&gallery=true&engines=true&generators=true&textblocks=true&media=true&limit='.$this->yachtBrokerLimit;

	        $apiCall = wp_remote_get($apiUrlOne, $headers);

	        $api_status_code = wp_remote_retrieve_response_code($apiCall);

	        $json = json_decode(wp_remote_retrieve_body($apiCall), true);

	        var_dump($api_status_code);
	        var_dump($apiUrlOne);

	        if ($api_status_code == 200 && isset($json['V-Data'])) {
				// return;
			}
			elseif ($api_status_code == 401) {
				return ['error' => 'Error with auth'];
			}
			else {
				return ['error' => 'Error http error '.$api_status_code];
			}

	        $total = $json['total'];
	        $yachtSynced = 0;
	        $page = 1;

	        while ($total > $yachtSynced) {

	        	var_dump( sprintf("%.2f%%", intval((($yachtSynced / $total)*100)))." Completed" );

	        	$apiUrl  = 'https://api.yachtbroker.org/vessel?key='.$this->yachtBrokerAPIKey.'&id='. $this->yachtClientId .'&gallery=true&engines=true&generators=true&textblocks=true&media=true&limit='.$this->yachtBrokerLimit;

	        	$apiUrl .='&page='.$page;

		        $apiCallWhile = wp_remote_get($apiUrl, $headers);
		        $apiBody = json_decode($apiCallWhile['body'], true);

		        if (isset($apiBody['next_page_url'])) {
		        	$page++;
		        }

		        if (count($apiBody['V-Data']) == 0) {
		        	break;
		        }

				foreach ($apiBody['V-Data'] as $row) {
		            $yachtSynced++; 
		           	
		           	$theBoat=[
		           		'BoatLocation' => (object) [
		           			'BoatCityName' => $row['City'],
		           			'BoatCountryID' => $row['Country'],
		           			'BoatStateCode' => $row['State']
		           		],

		           		'YSP_City' => $row['City'],
		           		'YSP_CountryID' => $row['Country'],
		           		'YSP_State' => $row['State'],

		           		'YSP_Full_Country' => $row['Country'],
		           		'YSP_Full_State' => $row['State'],

		           		'SalesRep' => (object)  [
		           			'PartyId' => $row['ListingOwnerID'],
		           			'Name' => $row['ListingOwnerName'],
		           			'Email' => $row['ListingOwnerEmail'],
		           			'Phone' => $row['ListingOwnerPhone']
		           		],

		           		'YSP_BrokerName' => $row['ListingOwnerName']
		           	];

		           	$MapToBoatOrg=[
		           		'YBDocumentID' => 'ID',
		           		'DocumentID' => 'ID',
		  				'SalesStatus' => 'Status',
		                'SaleClassCode' => 'Condition',
		                'CompanyName' => 'ListingOwnerBrokerageName' ,
		                'GeneralBoatDescription' => 'Summary' ,
		                'NumberOfEngines' => 'EngineQty',
		                'Price' => 'PriceUSD' ,
		                'NormPrice' => 'PriceUSD',
		                'ModelYear' => 'Year',
		                'Model' => 'Model',
		                'PriceHideInd' => 'PriceHidden',
		                'MakeString' => 'Manufacturer',
		                'BoatCategoryCode' => 'Type',
		                'BoatName' => 'VesselName',
		                'CruisingSpeedMeasure' => 'CruiseSpeed', 
		                'MaximumSpeedMeasure' => 'MaximumSpeed',
		                'RangeMeasure' => 'RangeNMI',
		                'BeamMeasure' => 'BeamFeet',
		                'LastModificationDate' => 'UpdatedTimestamp',
		                'WaterTankCapacityMeasure' => 'FreshWaterCapacityGallons',
		                'FuelTankCapacityMeasure' => 'FuelTankCapacityGallons' ,
		                'DryWeightMeasure' => 'DryWeight' ,
		                'CabinsCountNumeric' => 'CabinCount',
		                'HeadsCountNumeric' => 'HeadCount',
		                'BoatHullMaterialCode' => 'HullMaterial',
		                'BoatHullID' => 'HullIdentificationNumber',
		                'DisplayLengthFeet' => 'LOAFeet',
		                'TaxStatusCode' => 'TaxStatus',
		                
		                'NominalLength' => 'LOAFeet',
		                'YSP_LOAFeet' => 'LOAFeet',
		                'YSP_LOAMeter' => 'LOAMeter',
						
						'YSP_Beam_Feet_Measurement' => 'BeamFeet',
						'YSP_Beam_Inch_Measurement' => 'BeamInch',

						'YSP_Max_Draft_Feet_Measurement' => 'MaximumDraftFeet',
						'YSP_Max_Draft_Inch_Measurement' => 'MaximumDraftInches',

                        'YSP_USDVal' => 'PriceUSD',
                        'YSP_EuroVal' => 'PriceEuro',

						'YSP_Country' => 'Country',
						'YSP_Full_Country' => 'Country',
						'YSP_State' => 'State',
						'YSP_City' => 'City',

		                'AdditionalDetailDescription' => 'Description',
		                'CabinCountNumeric' => 'CabinCount'
		           	];

		           	foreach ($MapToBoatOrg as $mapToKey => $key) {
		           		if (isset($row[ $key ])) {
		           			$theBoat[ $mapToKey ] = $row[ $key ];
		           		}
		           		else {
		           			$theBoat[ $mapToKey ] = '';
		           		}

		           	}

		           	if (isset($row['gallery'])) {
		                $images = [];
		            
		                foreach ($row['gallery'] as $key => $img) {
		                    $images[] = (object) [
		                        //'Priority' => $img['Sort'],
		                        'Caption'  => $img['Title'],
		                        'Uri'      => $img['HD']
		                    ];
		                }
		            }

		            $theBoat['Images'] = $images;

					if (isset($row['Media']['YoutubeIDs'])) {
						$youtubeVideoData = [];
						foreach ($row['Media']['YoutubeIDs'] as $media) {
							$youtubeVideoData[] = (object) [
								'YoutubeID' => $media['YoutubeVideoID'],
								'Title' => $media['YoutubeVideoTitle'],
							];
						}

						$theBoat['YSP_YouTubeData'] = $youtubeVideoData;
					}

					if (isset($row['Media']['VirtualTours'])) {
						$virtualTourData = [];
						foreach ($row['Media']['VirtualTours'] as $tour) {
							$virtualTourData[] = (object) [
								'URL' => $tour['VirtualTourURL'],
							];
						}

						$theBoat['YSP_VirtualTours'] = $virtualTourData;
					}

					if (isset($row['NominalLength'])) {
						$theBoat['YSP_Length'] = (int) $row['NominalLength'];
					}

		            if (isset($row['CruisingSpeedMeasure'])) {
			            $row['CruisingSpeedMeasure'] .= ' '.str_replace('Knots', 'kn', $row['SpeedUnit']);
			            $theBoat['CruisingSpeedMeasure']=$row['CruisingSpeedMeasure'];		            	
		            }

		            if (isset($row['MaximumSpeedMeasure'])) {
			            $row['MaximumSpeedMeasure']  .= ' '.str_replace('Knots', 'kn', $row['SpeedUnit']);
			            $theBoat['MaximumSpeedMeasure']=$row['MaximumSpeedMeasure'];
		            }

					if (isset($row['YSP_USDVal'])){
						if (isset($row['YSP_EuroVal'])) {
							$theBoat['YSP_EuroVal'] = $row['YSP_EuroVal'];
							$theBoat['YSP_USDVal'] = $row['YSP_USDVal'];
						} else {
							$theBoat['YSP_USDVal'] = $row['YSP_USDVal']; 
							$theBoat['YSP_EuroVal'] = $theBoat['YSP_USDVal'] * $this->euro_c_c;
						}
					}

		            if (isset($row['BeamFeet'])) {
		                $row['BeamFeet'] .= ' ft';
		                $theBoat['BeamMeasure']=$row['BeamFeet'];
		            }

					if (isset($row['MaximumDraftFeet'])) {
						$theBoat['YSP_Max_Draft_Feet_Measurement'] = $row['MaximumDraftFeet'];
					}

					if (isset($row['MaximumDraftInches'])) {
						$theBoat['YSP_Max_Draft_Inch_Measurement'] = $row['MaximumDraftInches'];
					}

		            if (isset($row['WaterTankCapacityMeasure'])) {
		                $row['WaterTankCapacityMeasure'] .= '|gallon';

		                $theBoat['WaterTankCapacityMeasure']=$row['WaterTankCapacityMeasure'];
		            }
		            
		            if (isset($row['FuelTankCapacityMeasure'])) {
		                $row['FuelTankCapacityMeasure'] .= '|gallon';

		                $theBoat['FuelTankCapacityMeasure'] = $row['FuelTankCapacityMeasure'];
		            }
		            
		            if (isset($row['DryWeightMeasure'])) {
		                $row['DryWeightMeasure'] .= ' lb';

		                $theBoat['DryWeightMeasure'] = $row['DryWeightMeasure'];
		            }

		            if (isset($row['Category'])) {
		                $theBoat['BoatClassCode'] = [$row['Category']];
		            }
					
					if (isset($row['ListingOwnerBrokerageID'])) {
						if ($row['ListingOwnerBrokerageID'] == (int) $this->yachtBrokerageId) {
							$theBoat['CompanyBoat'] = 1;
						}
					} else {
						$theBoat['CompanyBoat'] = 0;
					}

		            // if there is no additional description and TextBlocks has description then let's grab it from there.
		            if (isset($row['AdditionalDetailDescription']) && ! empty($row['AdditionalDetailDescription']) 
		            	&& 
		            	isset($row['Textblocks']) && is_array($row['Textblocks'])
		            ) {
		                $theBoat['AdditionalDetailDescription'] = '';

		                foreach ($row['Textblocks'] as $block) {
		                    $theBoat['AdditionalDetailDescription'] .= '<h3>'.$block['Title'].'</h3>';
		                    $theBoat['AdditionalDetailDescription'] .= $block['Description'];
		                }
		            }

		            if (isset($row['Engines']) && is_array($row['Engines'])) {
		                $engines     = [];
		                $enginePower = 0;
		                foreach ($row['Engines'] as $engine) {
		                    $enginePower += $engine['PowerHP'];
		                    
		                    $engines[]   =  [
		                        'Make'        => $engine['EngineMake'],
		                        'Model'       => $engine['EngineModel'],
		                        'Fuel'        => $engine['FuelType'],
		                        'EnginePower' => $engine['PowerHP'],
		                        'Type'        => $engine['EngineType'],
		                        'Hours'       => $engine['Hours'],
		                    ];
		                }
		                $theBoat['Engines']                  = $engines;
		                $theBoat['TotalEnginePowerQuantity'] = number_format($enginePower, 2).' hp';
		            }

		         	if (isset($theBoat['Engines'])) {
						$theBoatC->YSP_EngineCount = count($theBoat['Engines']);
						if (isset($theBoat['Engines'][0]['Model'])){
							$theBoatC->YSP_EngineModel = $theBoat['Engines'][0]['Model'];
						}
						if (isset($theBoat['Engines'][0]['Fuel'])){
							$theBoatC->YSP_EngineFuel = $theBoat['Engines'][0]['Fuel'];
						}
						if (isset($theBoat['Engines'][0]['EnginePower'])){
							$theBoatC->YSP_EnginePower = $theBoat['Engines'][0]['EnginePower'];
						}
						if (isset($theBoat['Engines'][0]['Hours'])){
							$theBoatC->YSP_EngineHours = $theBoat['Engines'][0]['Hours'];
						}
						if (isset($theBoat['Engines'][0]['Type'])){
							$theBoatC->YSP_EngineType = $theBoat['Engines'][0]['Type'];
						}
					}

		            if (! empty($theBoat['BoatHullID'])) {
		                $find_post=get_posts([
		                    'post_type' => 'syncing_ysp_yacht',
		                    'meta_query' => [
		                        array(
		                           'key' => 'BoatHullID',
		                           'value' => $theBoat['BoatHullID'],
		                           'compare' => '=',
		                       )
		                    ],
		                ]);                
		            }
		            else {
		                $find_post=[];
		            }

		            $find_post_from_synced=get_posts([
	                    'post_type' => 'ysp_yacht',
	                    'meta_query' => [
	                        array(
	                           'key' => 'BoatHullID',
	                           'value' => $theBoat['BoatHullID'],
	                           'compare' => '=',
	                       )
	                    ],
	                ]);

					$pdf_still_e = false;
		           	$yacht_updated = false;

		           	if (! isset($find_post_from_synced[0]->ID)) {
			            if (! empty($record['BoatHullID'])) {
			                $find_post_from_synced=get_posts([
			                    'post_type' => 'ysp_yacht',
			                    'meta_query' => [

			                        array(
			                           'key' => 'YBDocumentID',
			                           'value' => $theBoat['YBDocumentID'],
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

		                // $synced_pdf = get_post_meta($synced_post_id, 'YSP_PDF_URL', true);

		                $saved_last_mod_date = get_post_meta($synced_post_id, 'LastModificationDate', true);
		                $current_last_mod_date = $theBoat['LastModificationDate'];

		                // if (!is_null($synced_pdf) && !empty($synced_pdf)) {
						// 	$apiPDF = wp_remote_request($synced_pdf, [
						// 		'method' => 'HEAD',
						// 		'timeout' => 180,
						// 		'stream' => false, 
						// 		'headers' => [
						// 			'Content-Type'  => 'application/pdf',

						// 		]
						// 	]);

						// 	$api_status_code = wp_remote_retrieve_response_code($apiPDF);

						// 	if ($api_status_code == '200') {
						// 		$pdf_still_e = true;
						// 	}
						// }

						if (strtotime($current_last_mod_date) > strtotime($saved_last_mod_date)) {
							$pdf_still_e = false;
							$yacht_updated = true;
						}

						// if ( $pdf_still_e ) {
						// 	$theBoat['YSP_PDF_URL'] = $synced_pdf;
						// }

						// carry overs
						foreach ($this->CarryOverKeys as $metakey) {
							$val = get_post_meta($synced_post_id, $metakey, true);
							$theBoat[ $metakey ] = $val;
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
		            /*elseif (isset($find_post_from_synced[0]->ID) && $yacht_updated == false) {
		                $post_id=$find_post_from_synced[0]->ID;
		            	
		            }*/
		            elseif (isset($find_post[0]->ID)) {
		                $post_id=$find_post[0]->ID;
		                $wpdb->delete($wpdb->postmeta, ['post_id' => $find_post[0]->ID], ['%d']);
		            }

		            // $theBoat['Touched_InSync'] = 1;
		            $theBoat['ImportSource'] = "IYBA";

		            $y_post_id=wp_insert_post(
		            	apply_filters('ysp_yacht_post', 
			                [
			                    'ID' => $post_id,
								'post_type' => 'syncing_ysp_yacht',
								'post_title' =>  addslashes( $theBoat['ModelYear'].' '.$theBoat['MakeString'].' '.$theBoat['Model'].($theBoat['BoatName'] ? ' '.$theBoat['BoatName'] : '') ),
								'post_name' => sanitize_title(
									$theBoat['ModelYear'].'-'.$theBoat['MakeString'].'-'.$theBoat['Model']
								),
								'post_content' => $theBoat['GeneralBoatDescription'],
								'post_status' => 'publish',
								'meta_input' => apply_filters('ysp_yacht_meta_sync', (object) $theBoat)

							],
							$theBoat
						)
					);

					wp_set_post_terms($y_post_id, $theBoat['MakeString'], 'boatmaker', false);
					wp_set_post_terms($y_post_id, $theBoat['BoatClassCode'], 'boatclass', false);
					wp_set_post_terms($y_post_id, $theBoat['BoatCategoryCode'], 'boattype', false);
					wp_set_post_terms($y_post_id, $theBoat['SaleClassCode'], 'boatcondition', false);

					// if ($this->opt_prerender_brochures == 'yes' && $pdf_still_e == false && ! in_array($theBoat['SalesStatus'], ['Sold', 'Suspend']) ) {

					// 	$generatorPDF = wp_remote_post(
					// 		"https://api.urlbox.io/v1/render/async", 
					// 		[
					// 			'headers' => [
					// 				'Authorization' => 'Bearer ae1422deb6fc4f658c55f5dda7a08704',
					// 				'Content-Type' => 'application/json'
					// 			],
					// 			'body' => json_encode([
					// 				'url' => get_rest_url() ."ysp/yacht-pdf?yacht_post_id=". $y_post_id,
					// 				'webhook_url' => get_rest_url() ."ysp/set-yacht-pdf?yacht_post_id=". $y_post_id,
					// 				'use_s3' => true,
					// 				'format' => 'pdf'
					// 			])
					// 		]
					// 	);

					// }
		        }

	        }

	        return ['success' => 'Successfully Sync YachtBroker.org Co-Brokerage Feed'];
 
	        // after for loop
	    }
	}