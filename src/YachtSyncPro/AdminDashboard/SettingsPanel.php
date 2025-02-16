<?php
	#[AllowDynamicProperties]
	class YachtSyncPro_AdminDashboard_SettingsPanel {

		const SLUG = 'rai_ys';

		public function __construct() {
			$this->fields = new YachtSyncPro_AdminDashboard_Fields();

		}

		public function add_actions_and_filters() {

			add_action( 'admin_init', [$this, 'register_setting'] );
			add_action( 'admin_menu', [$this, 'add_options_page'] );

		}

		public function register_setting() {
			
			register_setting( self::SLUG, self::SLUG . '_boats_com_api_global_key');
			register_setting( self::SLUG, self::SLUG . '_boats_com_api_global_key_2');

			register_setting( self::SLUG, self::SLUG . '_boats_com_api_brokerage_key');
			register_setting( self::SLUG, self::SLUG . '_boats_com_api_brokerage_key_2');
			register_setting( self::SLUG, self::SLUG . '_boats_com_api_brokerage_status_override');
			
			register_setting( self::SLUG, self::SLUG . '_yacht_broker_org_api_token');
			register_setting( self::SLUG, self::SLUG . '_yacht_broker_org_id');
			register_setting( self::SLUG, self::SLUG . '_yacht_broker_org_limit');

			register_setting( self::SLUG, self::SLUG . '_yacht_broker_org_api_token_2');
			register_setting( self::SLUG, self::SLUG . '_yacht_broker_org_id_2');

			register_setting( self::SLUG, self::SLUG . '_yacht_broker_brokerage_id');

			register_setting( self::SLUG, self::SLUG . '_yatco_api_token');

			register_setting( self::SLUG, self::SLUG . '_is_euro_site');
			register_setting( self::SLUG, self::SLUG . '_prerender_brochures');

			register_setting( self::SLUG, self::SLUG . '_alert_on_low_count');
			register_setting( self::SLUG, self::SLUG . '_alert_emails');

			register_setting( self::SLUG, self::SLUG . '_last_synced');

			register_setting( self::SLUG, self::SLUG . '_color_one');
			register_setting( self::SLUG, self::SLUG . '_color_two');
			register_setting( self::SLUG, self::SLUG . '_color_three');
			register_setting( self::SLUG, self::SLUG . '_color_four');


			register_setting( self::SLUG, self::SLUG . '_button_bg_color_one');
			register_setting( self::SLUG, self::SLUG . '_button_txt_color_one');

			register_setting( self::SLUG, self::SLUG . '_send_lead_to_this_email');

			register_setting( self::SLUG, self::SLUG . '_yacht_search_page_id');
			register_setting( self::SLUG, self::SLUG . '_team_page_id');
			
			register_setting( self::SLUG, self::SLUG . '_company_name');
			register_setting( self::SLUG, self::SLUG . '_company_number');
			register_setting( self::SLUG, self::SLUG . '_company_logo');

			register_setting( self::SLUG, self::SLUG . '_akismet_api_token');
			register_setting( self::SLUG, self::SLUG . '_exchange_api_token');
			register_setting( self::SLUG, self::SLUG . '_chatgpt_api_token');
			register_setting( self::SLUG, self::SLUG . '_chatgpt_api_model');

			register_setting( self::SLUG, self::SLUG . '_pdf_urlbox_api_token_public_key');
			register_setting( self::SLUG, self::SLUG . '_pdf_urlbox_api_secret_key');

			register_setting( self::SLUG, self::SLUG . '_pdf_s3_bucket');
			register_setting( self::SLUG, self::SLUG . '_pdf_s3_endpoint');
			register_setting( self::SLUG, self::SLUG . '_pdf_s3_key');
			register_setting( self::SLUG, self::SLUG . '_pdf_s3_secret');

			register_setting( self::SLUG, self::SLUG . '_pdf_bandwidth');

			register_setting( self::SLUG, self::SLUG . '_youtube_data_api_key');

			$this->fields->set_fields();
			
		}

		public function add_options_page() {

			add_options_page(
				'Yacht Sync Pro Settings',
				'Yacht Sync Pro',
				'manage_options',
				self::SLUG,
				
				array( $this, 'display_options_page' )
			);

		}

		public function display_options_page() {

			include_once YSP_TEMPLATES_DIR.'/admin-settings.php';
		
		}


	}