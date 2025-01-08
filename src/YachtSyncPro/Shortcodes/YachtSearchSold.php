<?php
    #[AllowDynamicProperties]
	
	class YachtSyncPro_Shortcodes_YachtSearchSold {

		public function __construct() {
			$this->options = new YachtSyncPro_Options();
		}

		public function add_actions_and_filters() {
			add_shortcode('ys-sold-search-form', [$this, 'sold_yacht_horizontal_search_form']);
			add_shortcode('ys-sold-yacht-results', [$this, 'sold_yacht_results']);

		}

        public function sold_yacht_horizontal_search_form($atts = array(), $content = null) {
			// normalize attribute keys, lowercase
		    $atts = array_change_key_case((array)$atts, CASE_LOWER);
		 
		    // override default attributes with user attributes
		    $attributes = shortcode_atts([
            	
            ], $atts);

            ob_start();
		  		
				$file_to_include=YSP_TEMPLATES_DIR.'/sold-horizontal-search-form.php'; 

		    	include apply_filters('ysp_ys_sold_yacht_horizontal_search_form_template', $file_to_include);

		    return ob_get_clean();
        }

        public function sold_yacht_results($atts = array(), $content = null) {
			// normalize attribute keys, lowercase
		    $atts = array_change_key_case((array)$atts, CASE_LOWER);
		 
		    // override default attributes with user attributes
		    $attributes = shortcode_atts([
            	
            ], $atts);

            ob_start();
		  		
				$file_to_include=YSP_TEMPLATES_DIR.'/sold-yacht-results.php'; 

		    	include apply_filters('ysp_ys_sold_yacht_results_template', $file_to_include);

		    return ob_get_clean();

       	}
	}