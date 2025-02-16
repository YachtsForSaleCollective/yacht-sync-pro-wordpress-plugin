<?php 
	class YachtSyncPro_Yachts_MetaIsManual {

		public function __construct() {
			
		}

		public function add_actions_and_filters() {

			add_action( 'add_meta_boxes', [ $this, 'yachts_meta_boxes' ]);
			add_action( 'save_post_ysp_yacht', [$this, 'ysp_yacht_data_save']);

		}

		public function yachts_meta_boxes() { 
			add_meta_box(
				'ysp_yacht_is_manual_metabox',
				'Is Manual Entry',
				[ $this, 'yacht_meta_box_html' ],
				['ysp_yacht'],
				'side'
			);									
		}

		public function yacht_meta_box_html($post) {

			$_is_yacht_manual_entry=get_post_meta($post->ID, 'is_yacht_manual_entry', true);

			echo 'Manual Entry <br>';
			echo "<input type='checkbox' name='is_yacht_manual_entry' value='yes' ". checked('yes', $_is_yacht_manual_entry, false) ." />";	
		}

		public function ysp_yacht_data_save($post_id) {
			if ( isset($_POST['is_yacht_manual_entry']) && $_POST['is_yacht_manual_entry'] == 'yes') {
				update_post_meta($post_id, 'is_yacht_manual_entry', 'yes');
			}
		}
	}