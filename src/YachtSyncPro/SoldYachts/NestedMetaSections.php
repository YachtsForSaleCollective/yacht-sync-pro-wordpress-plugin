<?php
	#[AllowDynamicProperties]
	class YachtSyncPro_SoldYachts_NestedMetaSections {

		public function __construct() {
			
		}

		public function add_actions_and_filters() {

			add_action( 'add_meta_boxes', [ $this, 'nested_sold_yachts_meta_boxes' ]);
			add_action( 'save_post_ysp_sold_yacht', [$this, 'ysp_sold_yacht_nested_data_save']);

		}

		public function nested_sold_yachts_meta_boxes() {
			add_meta_box(
				'ysp_sold_yacht_sync_nested_meta_boxes',
				'Other Sold Yacht Info',
				[ $this, 'nested_sold_yacht_meta_box_html' ],
				['ysp_sold_yacht']
			);									
		}

		public function nested_sold_yacht_meta_box_html($post) {
			include YSP_TEMPLATES_DIR.'/admin-nested-metabox-sold-yacht-basics.php';
		}

		public function ysp_sold_yacht_nested_data_save($post_id) {
			$general_boat_description = $_POST['General_Boat_Description'];

			update_post_meta($post_id, 'GeneralBoatDescription', [ $general_boat_description ]);

			$sales_rep = (object) [
				'PartyId' => $_POST['YSP_Sales_Rep_Party_ID'],
				'Name' => $_POST['YSP_Sales_Rep_Name']
			];

			update_post_meta($post_id, 'SalesRep', $sales_rep);

			$engines = [
				(object) [
					'Make' => $_POST['YSP_Engine_1_Make'],
					'Model' => $_POST['YSP_Engine_1_Model'],
					'Fuel' => $_POST['YSP_Engine_1_Fuel'],
					'EnginePower' => $_POST['YSP_Engine_1_EnginePower'],
					'Type' => $_POST['YSP_Engine_1_Type'],
					'Year' => $_POST['YSP_Engine_1_Year'],
					'Hours' => $_POST['YSP_Engine_1_Hours'],
					'BoatEngineLocationCode' => $_POST['YSP_Engine_1_Boat_Engine_Location_Code']
				],
				(object) [
					'Make' => $_POST['YSP_Engine_2_Make'],
					'Model' => $_POST['YSP_Engine_2_Model'],
					'Fuel' => $_POST['YSP_Engine_2_Fuel'],
					'EnginePower' => $_POST['YSP_Engine_2_EnginePower'],
					'Type' => $_POST['YSP_Engine_2_Type'],
					'Year' => $_POST['YSP_Engine_2_Year'],
					'Hours' => $_POST['YSP_Engine_2_Hours'],
					'BoatEngineLocationCode' => $_POST['YSP_Engine_2_Boat_Engine_Location_Code']
				]
			];

			update_post_meta($post_id, 'Engines', $engines);
			
			$images = [];

			for ($im=0; $im <= 19; $im++) {

				if (isset($_POST['YSP_Image_'.$im]) && !empty($_POST['YSP_Image_'.$im])) {
					$images[ $im ]=(object) [
						'Uri' => $_POST['YSP_Image_'.$im],
					];
				}

			}

			update_post_meta($post_id, 'Images', $images);
		}
	}