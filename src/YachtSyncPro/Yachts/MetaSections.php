<?php
	#[AllowDynamicProperties]
	class YachtSyncPro_Yachts_MetaSections {

		public function __construct() {
			
		}

		public function add_actions_and_filters() {

			add_action( 'add_meta_boxes', [ $this, 'yachts_meta_boxes' ]);
			add_action( 'save_post_ysp_yacht', [$this, 'ysp_yacht_data_save']);

		}

		public function yachts_meta_boxes() { 
			add_meta_box(
				'ysp_yacht_sync_meta_box',
				'Yacht Info',
				[ $this, 'yacht_meta_box_html' ],
				['ysp_yacht']
			);									
		}

		public function yacht_meta_box_html($post) {
			include YSP_TEMPLATES_DIR.'/admin-metabox-yacht-basics.php';		
		}

		public function ysp_yacht_data_save($post_id) {
			if ( isset($_POST['is_yacht_manual_entry']) && $_POST['is_yacht_manual_entry'] == 'yes') {
	            $fields = [
				    'YSP_BeamFeet',
				    'YSP_BeamMeter',
				    'YSP_BrokerName',
				    'YSP_City',
				    'YSP_CountryID',
				    'YSP_State',
					'COUNTRY_WEIGHT',
				    'YSP_EngineCount',
				    'YSP_EngineFuel',
				    'YSP_EngineHours',
				    'YSP_EngineModel',
				    'YSP_EnginePower',
				    'YSP_EngineType',
				    'NormPrice',
					'YSP_USDVal',
				    'YSP_EuroVal',
					'YSP_AUDVal',
				    'YSP_Length',
				    'NominalLength',
				    'YSP_LOAFeet',
				    'YSP_LOAMeter',
				    'YSP_ListingDate',
				    'MakeString',
				    'Model',
				    'ModelYear',
				    'SalesStatus',
					'SaleClassCode',
				    'BoatCategoryCode',
				    //'BoatClassCode',
				    'HasHullID',
				    'BoatHullID',
				    'BoatHullMaterialCode',
				    'BoatName',
				    'CompanyBoat',
				    'CompanyName',
				    'DocumentID',
					'CruisingSpeedMeasure',
					'MaximumSpeedMeasure',
					'RangeMeasure',
				    //'GeneralBoatDescription',
				    //'AdditionalDetailDescription',
				    'HeadsCountNumeric',
				    'FuelTankCapacityMeasure',
				    'FuelTankCountNumeric',
				    'FuelTankMaterialCode',
				    'HoldingTankCapacityMeasure',
				    'HoldingTankCountNumeric',
				    'HoldingTankMaterialCode',
				    'WaterTankCapacityMeasure',
				    'WaterTankCountNumeric',
				    'WaterTankMaterialCode',
				    'TotalEngineHoursNumberic',
				    'TotalEnginePowerQuantity',
				    'CompanyWeight',
				    'MakeWeight',
					'SalesStatusWeight',
					'YSP_Length_Feet_Measurement',
					'YSP_Length_Inch_Measurement',
					'YSP_Beam_Feet_Measurement',
					'YSP_Beam_Inch_Measurement',
					'YSP_Max_Draft_Feet_Measurement',
					'YSP_Max_Draft_Inch_Measurement',
				];

				foreach ($fields as $field) {
				    if (isset($_POST[$field])) {
				        update_post_meta($post_id, $field, $_POST[$field]);
				    }
				}

				$boatLocation=(object) [
					"BoatCityName" => '',
					"BoatCountryID" => '',
					"BoatStateCode" => '',
				];

				if (isset($_POST['YSP_CountryID'])) {
					$boatLocation->BoatCountryID = $_POST['YSP_CountryID'];
				}
				
				if (isset($_POST['YSP_City'])) {
					$boatLocation->BoatCityName = $_POST['YSP_City'];
				}

				if (isset($_POST['YSP_State'])) {
					$boatLocation->BoatCityName = $_POST['YSP_State'];
				}

				update_post_meta($post_id, "BoatLocation", $boatLocation);

				if (isset($_POST['BoatClassCode'])) {
					update_post_meta($post_id, "BoatClassCode", [ $_POST['BoatClassCode'] ]);
				}
			}
		}
	}