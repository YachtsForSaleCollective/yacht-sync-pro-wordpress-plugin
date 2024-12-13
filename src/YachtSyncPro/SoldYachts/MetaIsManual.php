<?php 
	class YachtSyncPro_SoldYachts_MetaIsManual {

		public function __construct() {
			
		}

		public function add_actions_and_filters() {

			add_action( 'add_meta_boxes', [ $this, 'sold_yachts_meta_boxes' ]);
			add_action( 'save_post_ysp_yacht', [$this, 'ysp_sold_yacht_data_save']);

		}

		public function sold_yachts_meta_boxes() { 
			add_meta_box(
				'ysp_sold_yacht_is_manual_metabox',
				'Is Manual Entry',
				[ $this, 'sold_yacht_meta_box_html' ],
				['ysp_sold_yacht'],
				'side'
			);									
		}

		public function sold_yacht_meta_box_html($post) {

			$_is_sold_yacht_manual_entry=get_post_meta($post->ID, 'is_sold_yacht_manual_entry', true);

			echo 'Manual Entry <br>';
			echo "<input type='checkbox' name='is_sold_yacht_manual_entry' value='yes' ". checked('yes', $_is_sold_yacht_manual_entry, false) ." />";	
		}

		public function ysp_sold_yacht_data_save($post_id) {
			if ( isset($_POST['is_sold_yacht_manual_entry']) && $_POST['is_sold_yacht_manual_entry'] == 'yes') {
				update_post_meta($post_id, 'is_sold_yacht_manual_entry', 'yes');
			}
		}
	}