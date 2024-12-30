<?php 
	class YachtSyncPro_SoldYachts_MetaIsManual {

		public function __construct() {
			
		}

		public function add_actions_and_filters() {
			add_action( 'save_post_ysp_sold_yacht', [$this, 'ysp_sold_yacht_data_save']);
		}
	}