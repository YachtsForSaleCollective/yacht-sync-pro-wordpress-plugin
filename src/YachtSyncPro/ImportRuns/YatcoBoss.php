<?php
    #[AllowDynamicProperties]

	class YachtSyncPro_ImportRuns_YatcoBoss {
		public $yachtBrokerAPIKey = '';
   		public $yachtClientId = '';
   		protected $url = '';
   		protected $yachtBrokerLimit = 153;

		public function __construct() {

			$this->options = new YachtSyncPro_Options();
			$this->LocationConvert = new YachtSyncPro_LocationConvert();
			$this->ChatGPTYachtDescriptionVersionTwo = new YachtSyncPro_ChatGPTYachtDescriptionVersionTwo();

			$this->euro_c_c = floatval($this->options->get('euro_c_c'));
			$this->usd_c_c = floatval($this->options->get('usd_c_c'));

			//var_dump($this->euro_c_c);

			$this->api_url_base = 'http://api.yatcoboss.com/API/V1';
			$this->yachts_feed = $this->api_url_base .'/ForSale/Vessel/Search';

			$this->api_token = $this->options->get('yatco_api_token');
		}

		public function run() {
			global $wpdb;

			var_dump('Started YATCO Import');

	        $headers = [
	        	'timeout' => 90,

	        	'body' => json_encode([
	        		'year' => [
					  "Start" => 1960,
					  "End" => 2030
	        		],

	        		'loa' => [
	        			'Start' => 5, 
	        			'End' => 200
	        		],

	        		"Records" => 12,

	        	]),
	        	
	            'headers' => [
	             	'Authorization' => 'Basic ' . $this->api_token,
					'Accept' => 'application/json',
					'Content-Type' => 'application/json'
	            ]
	        ];

	        $apiUrlOne  = $this->yachts_feed;

	        $apiCall = wp_remote_post($apiUrlOne, $headers);

	        $api_status_code = wp_remote_retrieve_response_code($apiCall);

	        $json = json_decode(wp_remote_retrieve_body($apiCall), true);

	        //var_dump(wp_remote_retrieve_body($apiCall));

	        if ($api_status_code == 200 && isset($json['Results'])) {
				var_dump('Successfully Connect Made To YatcoBoss');
				// return;
			}
			elseif ($api_status_code == 401) {
				return ['error' => 'Error with auth'];
			}
			else {
				return ['error' => 'Error http error '.$api_status_code];
			}

	        $total = $json['Count'];
	        $yachtSynced = 0;
	        $page = -1;

	        $tryfailtrys=0;
	        $tryfailtrysMAX=5;

	        while ($total > $yachtSynced) {

	        	var_dump( sprintf("%.2f%%", ((($yachtSynced / $total)*100)))." Completed" );

	        	$apiUrl = $this->yachts_feed;

	        	$page++;

	        	sleep(6);

	        	$headers['body']=json_encode([
	        		'year' => [
					  "Start" => 1960,
					  "End" => 2030
	        		],

	        		'loa' => [
	        			'Start' => 5, 
	        			'End' => 200
	        		],

	        		'Records' => $this->yachtBrokerLimit,
	        		'Offset' => ($page*$this->yachtBrokerLimit)
	        	]);

		        $apiCallWhile = wp_remote_post($apiUrl, $headers);

		        $apiCallWhileStatus = wp_remote_retrieve_response_code($apiCallWhile);

				if ($apiCallWhileStatus == 200) {
					// return;
				}
				elseif ($apiCallWhileStatus == 401) {
					return (['error' => 'Error with auth']);
				}
				else {
					var_dump(['error' => 'Error http error '.$apiCallWhileStatus]);
					sleep(180);
					$page--;
					$tryfailtrys++;

					if ($tryfailtrys < $tryfailtrysMAX) {
						continue;
					}
					else {
						break;
					}
				}

		        $apiBody = json_decode($apiCallWhile['body'], true);

		        if (count($apiBody['Results']) == 0) {
		        	var_dump('returned zero');

		        	break;
		        }

		        if (! isset($apiBody['Results'])) {
		        	var_dump(wp_remote_retrieve_response_code($apiCallWhile));
		        }

				foreach ($apiBody['Results'] as $row) {
		            $yachtSynced++; 
		           	
		           	$theBoat=[
		           		
		           	];

		           	$row['BuilderName'] = strtolower($row['BuilderName']);
		           	$row['BuilderName'] = ucwords($row['BuilderName']);

		           	$MapToBoatOrg=[
		           		'YTC_VESSEL_ID' => 'VesselID',
		           		'DocumentID' => 'VesselID',
		  				'SalesStatus' => 'VesselStatusText',
		                'SaleClassCode' => 'VesselConditionText',
		                'CompanyName' => 'CompanyID' ,

		                //'GeneralBoatDescription' => 'BrokerTeaser',
		                
		                'Price' => 'AskingPrice',

		                'NormPrice' => 'AskingPrice',
		                'OriginalPrice' => 'AskingPriceFormatted',
		                
		                'ModelYear' => 'Year',
		                'Model' => 'Model',
		                
		                //'PriceHideInd' => 'PriceHidden',
		                
		                'MakeString' => 'BuilderName',
		                
		                'BoatCategoryCode' => 'MainCategoryText',
		                'BoatSubCategoryCode' => 'SubCategoryText',
		                
		                'BoatName' => 'VesselName',

		                //'CruisingSpeedMeasure' => 'CruiseSpeed', 
		                //'MaximumSpeedMeasure' => 'MaximumSpeed',

		                //'RangeMeasure' => 'RangeNMI',
		                'BeamMeasure' => 'BeamFeet',
		                
		                'LastModificationDate' => 'ModifiedDate',

		                //'WaterTankCapacityMeasure' => 'FreshWaterCapacityGallons',
		                //'FuelTankCapacityMeasure' => 'FuelTankCapacityGallons' ,
		                
		                //'DryWeightMeasure' => 'DryWeight' ,
		                
		                'CabinsCountNumeric' => 'StateRooms',
		                
		                //'HeadsCountNumeric' => 'HeadCount',
		                
		                'BoatHullMaterialCode' => 'HullMaterial',
		                //'BoatHullID' => 'HullIdentificationNumber',
		                
		                'DisplayLengthFeet' => 'LOAFeet',
		                //'TaxStatusCode' => 'TaxStatus',
		                
		                'NominalLength' => 'LOAFeet',

		                'YSP_LOAFeet' => 'LOAFeet',
		                'YSP_LOAMeter' => 'LOAMeters',
						
						'YSP_BeamFeet' => 'BeamFeet',
		                'YSP_BeamMeter' => 'BeamMeters',

		                //'AdditionalDetailDescription' => 'Description',
		                //'CabinCountNumeric' => 'CabinCount'
		           	];

		           	foreach ($MapToBoatOrg as $mapToKey => $key) {
		           		if (isset($row[ $key ])) {
		           			$theBoat[ $mapToKey ] = $row[ $key ];
		           		}
		           		else {
		           			$theBoat[ $mapToKey ] = '';
		           		}
		           	}

					$theBoat['BoatLocation'] = [
						'BoatCountryID' => array_key_exists( 'LocationCountry', $row ) ? $row['LocationCountry'] : '',
						'BoatCityName'  => array_key_exists( 'LocationCity', $row ) ? $row['LocationCity'] : '',
						'BoatStateCode' => array_key_exists( 'LocationState', $row ) ? $row['LocationState'] : '',
					];

					if ( isset( $theBoat['BoatLocation'] ) ) {
						$theBoat['YSP_City']         = $theBoat['BoatLocation']['BoatCityName'];
						$theBoat['YSP_CountryID']    = $theBoat['BoatLocation']['BoatCountryID'];
						$theBoat['YSP_Full_Country'] = $theBoat['BoatLocation']['BoatCountryID'];

						if ( isset( $theBoat['BoatLocation']['BoatStateCode'] ) ) {
							$theBoat['YSP_State']      = $theBoat['BoatLocation']['BoatStateCode'];
							$theBoat['YSP_Full_State'] = $theBoat['BoatLocation']['BoatStateCode'];
						}
					}
		           	
		           	$detailsUrl = $this->api_url_base.'/ForSale/Vessel/'. $row['VesselID'] .'/Details/fullSpecsAll';

		           	$detail_headers = [
			        	'timeout' => 120,
	
			            'headers' => [
			             	'Authorization' => 'Basic ' . $this->api_token,
							'Accept' => 'application/json',
							'Content-Type' => 'application/json'
			            ]
			        ];

			        sleep(6);

					$apiCallDetails = wp_remote_get($detailsUrl, $detail_headers);

					$apiCallDetailsStatus = wp_remote_retrieve_response_code($apiCallDetails);

					if ($apiCallDetailsStatus == 200) {
						// return;
					}
					elseif ($apiCallDetailsStatus == 401) {
						var_dump(['error' => 'Error with auth']);
						continue;
						//return ['error' => 'Error with auth'];
					}
					else {
						var_dump(['error' => 'Error http error '.$apiCallDetailsStatus]);
						sleep(180);

						/*$tryfailtrys++;

						if ($tryfailtrys < $tryfailtrysMAX) {*/
							continue;
						//}
							//else {
						//		break;
						//	}
					}
					
					$data = json_decode($apiCallDetails['body'], true);

					if (isset($data['PhotoGallery']) && is_array($data['PhotoGallery'])) {
	 
						$reducedImages = array_slice($data['PhotoGallery'], 0, 75);

	                    $reducedImages = array_map(
	                    	function($img) {
	                    		$reimg=[
	                    			'Uri' => $img['largeImageURL']
	                    		];

	                    		if (! empty($img['Caption'])) {
	                    			$reimg['Caption']=$img['Caption'];
	                    		}

	                    		return (object) $reimg;
	                    	}, 
	                    	$reducedImages
	                    );

	                    $theBoat['Images'] = $reducedImages;
	                    $theBoat['CompanyName'] = $data['Company']['CompanyName'];

	                    $theBoat['CruisingSpeedMeasure'] = $data['SpeedWeight']['CruiseSpeed'];
	                    $theBoat['MaximumSpeedMeasure'] = $data['SpeedWeight']['MaxSpeed'];

	                    $theBoat['MaximumSpeedMeasure'] = $data['Accommodations']['HeadsValue'];

	                    $theBoat['AdditionalDetailDescription'] = $data['Sections'];
	                    $theBoat['GeneralBoatDescription'] = $data['VD']['VesselDescriptionShortDescriptionNoStyles'];

	                    if (isset($theBoat['Price'])) {
							if (str_contains($theBoat['OriginalPrice'], 'EUR')) {
								$theBoat['YSP_EuroVal'] = $theBoat['Price'];
								$theBoat['YSP_USDVal'] = $theBoat['YSP_EuroVal']*$this->usd_c_c;

							} else {
								$theBoat['YSP_USDVal'] = intval($theBoat['Price']);
								$theBoat['YSP_EuroVal'] = $theBoat['YSP_USDVal']*$this->euro_c_c;
							}
						}
						else {
							$theBoat['OriginalPrice'] = 0;
							$theBoat['YSP_USDVal'] = 0;
							$theBoat['YSP_EuroVal'] = 0;
						}

					}

					if ( isset( $data['HullDeck']['HullID'] ) ) {
						$theBoat['BoatHullID'] = $data['HullDeck']['HullID'];
					}

					if ( isset( $data['Engines'] ) && is_array( $data['Engines'] ) ) {
						$engines     = [];
						$enginePower = 0;
						foreach ( $data['Engines'] as $engine ) {
							if ( array_key_exists( 'Horsepower', $engine ) ) {
								$enginePower += $engine['Horsepower'];
							}

							$engines[] = [
								'Make'           => array_key_exists( 'Manufacturer', $engine ) ? $engine['Manufacturer'] : '',
								'Model'          => array_key_exists( 'Model', $engine ) ? $engine['Model'] : '',
								'Fuel'           => array_key_exists( 'FuelType', $engine ) ? $engine['FuelType'] : '',
								'Horsepower'     => array_key_exists( 'Horsepower', $engine ) ? $engine['Horsepower'] : '',
								'EnginePower'    => array_key_exists( 'Horsepower', $engine ) ? $engine['Horsepower'] : '',
								'Type'           => array_key_exists( 'EngineType', $engine ) ? $engine['EngineType'] : '',
								'Hours'          => array_key_exists( 'AppoxHours', $engine ) ? $engine['AppoxHours'] : '',
								'Year'           => array_key_exists( 'Year', $engine ) ? $engine['Year'] : '',
								'toString'       => array_key_exists( 'toString', $engine ) ? $engine['toString'] : '',
								'ReportToString' => array_key_exists( 'ReportToString', $engine ) ? $engine['ReportToString'] : '',
							];
						}
						$theBoat['Engines']                  = $engines;
						$theBoat['TotalEnginePowerQuantity'] = ( $enginePower !== 0 ) ? number_format( $enginePower, 2 ) . ' hp' : '';
					}

					if ( isset( $theBoat['Engines'] ) ) {
						$theBoat['YSP_EngineCount'] = count( $theBoat['Engines'] );

						if ( isset( $theBoat['Engines'][0]['Model'] ) ) {
							$theBoat['YSP_EngineModel'] = $theBoat['Engines'][0]['Model'];
						}
						if ( isset( $theBoat['Engines'][0]['Manufacturer'] ) ) {
							$theBoat['YSP_EngineMake'] = $theBoat['Engines'][0]['Manufacturer'];
						}
						if ( isset( $theBoat['Engines'][0]['Fuel'] ) ) {
							$theBoat['YSP_EngineFuel'] = $theBoat['Engines'][0]['Fuel'];
						}
						if ( isset( $theBoat['Engines'][0]['EnginePower'] ) ) {
							$theBoat['YSP_EnginePower'] = $theBoat['Engines'][0]['EnginePower'];
						}
						if ( isset( $theBoat['Engines'][0]['Hours'] ) ) {
							$theBoat['YSP_EngineHours'] = $theBoat['Engines'][0]['Hours'];
						}
						if ( isset( $theBoat['Engines'][0]['Type'] ) ) {
							$theBoat['YSP_EngineType'] = $theBoat['Engines'][0]['Type'];
						}
					}

					if (
						( 
							isset($theBoat['_yoast_wpseo_metadesc']) 
							&& 
							( 
								empty($theBoat['_yoast_wpseo_metadesc']) 
								|| 
								is_null($theBoat['_yoast_wpseo_metadesc'])
							) 
						) 
						|| 
						! isset($theBoat['_yoast_wpseo_metadesc'])
					) {

						$theBoat['_yoast_wpseo_metadesc'] = $this->ChatGPTYachtDescriptionVersionTwo->make_description(
							'Vessel Name - '.$theBoat['ModelYear'].' '.$theBoat['MakeString'].' '.$theBoat['Model'].' '.$theBoat['BoatName']. '. '.
							'Vessel Description - '. $theBoat['GeneralBoatDescription']
						);

					}

					$theBoat['ImportSource'] = "YATCO";

	                $find_post=get_posts([
	                    'post_type' => 'syncing_ysp_yacht',
	                    'meta_query' => [
	                        array(
	                           'key' => 'YTC_VESSEL_ID',
	                           'value' => $row['VesselID']
	                       )
	                    ],
	                ]);
	           
		            $post_id=0;

		            if (isset($find_post[0]->ID)) {
		                $post_id=$find_post[0]->ID;

		                $wpdb->delete($wpdb->postmeta, ['post_id' => $find_post[0]->ID], ['%d']);
		            }

		            if (! isset($theBoat['Model'])) {
		            	$theBoat['Model']='';
		            }

		            if (! isset($row['SubCategoryText'])) {
		            	$row['SubCategoryText']='';
		            }

		           	$y_post_id=wp_insert_post(
		            	apply_filters('ysp_yacht_post', 
			                [
			                    'ID' => $post_id,
								'post_type' => 'syncing_ysp_yacht',
								
								'post_title' =>  addslashes( $row['ModelYear'].' '.$row['BuilderName'].' '.$theBoat['Model'].' '.$row['VesselName'] ),

								'post_name' => sanitize_title(
									$row['ModelYear'].'-'.$row['BuilderName'].'-'.$theBoat['Model']
								),
								'post_content' => $data['VD']['VesselDescriptionShortDescriptionNoStyles'],
								'post_status' => 'publish',

								'meta_input' => apply_filters('ysp_yacht_meta_sync', (object) $theBoat)
								
								/*'tax_input' => [
									'boatmaker' => [ $row['BuilderName'] ],
									'boatcondition' => [ $row['VesselConditionText'] ],
									'boattype' => [ $row['VesselTypeText'] ],
									'boatclass' => [ $row['MainCategoryText'], $row['SubCategoryText']]
								]*/
							],
							$theBoat
						)
					);

					wp_set_post_terms(
						$y_post_id, 
						[
							$row['MainCategoryText'],
							$row['SubCategoryText']
						], 
						'boatclass', 
						false
					);

					wp_set_post_terms($y_post_id, $row['BuilderName'], 'boatmaker', false);

					wp_set_post_terms($y_post_id, $row['VesselConditionText'], 'boatcondition', false);

					wp_set_post_terms($y_post_id, $row['VesselTypeText'], 'boattype', false);
		        }

	        }

	        return ['success' => 'Successfully Sync YatcoBoss'];
 
	        // after for loop
	    }
	}