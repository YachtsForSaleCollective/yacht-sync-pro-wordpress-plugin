<?php 

	#[AllowDynamicProperties]
	class YachtSyncPro_StylesAndScripts {

		public function __construct() {
			
			$this->options = new YachtSyncPro_Options();

		}

		public function add_actions_and_filters() {
			add_action( 'wp_enqueue_scripts' , [$this, 'enqueueGlobal']);
			add_action( 'wp_enqueue_scripts' , [$this, 'enqueueYachtDetails']);
			add_action( 'admin_enqueue_scripts', [$this, 'rudr_include_js'] );
		}

		function rudr_include_js() {
			
			if ( ! did_action( 'wp_enqueue_media' ) ) {
				wp_enqueue_media();
			}

			 wp_enqueue_script( 
				'ysp-admin', 
				YSP_ASSETS. 'js/admin.js',
				array( 'jquery' ),
				null
			);
		}
		
		public function pickedColorsFromWpAdmin() {

			$button_bg = $this->options->get('button_bg_color_one');
			$button_txt = $this->options->get('button_txt_color_one');

			return "
				:root {
					--button-bg-color: $button_bg !important;
					--button-txt-color: $button_txt !important;
				}
			";

		}

		public function pickedEuroMeterFromWpAdmin() {
			$euroMeterSetting = $this->options->get('is_euro_site');

			return "";
		}
		public function pickedComapnyName() {
			$companyName = $this->options->get('comapny_name');

			return "";
		}

		public function enqueueGlobal() {

			wp_register_style('yacht-sync-styles', YSP_ASSETS.'build/css/app-style.noMaps.css', false, YSP_VERSION, false);
			wp_register_script('yacht-sync-script', YSP_ASSETS.'build/js/globalPlugin.noMaps.js', ['jquery'], YSP_VERSION, true);
			
			wp_register_style('ysp-single-yacht-styles', YSP_ASSETS.'build/css/app-single-yacht.noMaps.css', false, null, false);
			wp_register_script('ysp-single-yacht-script', YSP_ASSETS.'build/js/appSingleYacht.noMaps.js', ['jquery'], null, true);

			$js_vars = [
				'wp_rest_url' => get_rest_url(),
				'assets_url' => YSP_ASSETS,
				'yacht_search_url' => get_permalink($this->options->get('yacht_search_page_id')),
				'europe_option_picked' => $this->options->get('is_euro_site'),
				'company_name' => $this->options->get('company_name'),
				'company_number' => $this->options->get('company_number'),
				'company_logo' => wp_get_attachment_image_url($this->options->get('company_logo')),
				'euro_c_c' => $this->options->get('euro_c_c')
			];

			wp_localize_script('yacht-sync-script', 'ysp_yacht_sync', $js_vars); 

			wp_enqueue_script('yacht-sync-script');
			
			wp_enqueue_style('yacht-sync-styles');

			wp_add_inline_style('yacht-sync-styles', $this->pickedColorsFromWpAdmin());

			if (is_singular('ysp_yacht') || is_singular('ysp_sold_yacht')) {
				wp_enqueue_style("ysp-single-yacht-styles");
				wp_enqueue_script("ysp-single-yacht-script");
			}

		}

		public function enqueueYachtDetails() {


		}
	}