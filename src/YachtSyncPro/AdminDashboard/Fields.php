<?php
	#[AllowDynamicProperties]
	class YachtSyncPro_AdminDashboard_Fields {

		const SLUG = 'rai_ys';

		public function __construct() {

			$this->options = new YachtSyncPro_Options();

		}

		public function set_fields() {
			
			add_settings_section(
					self::SLUG . '_admin_fields',
					'Settings',
					[$this, 'section_cb'],
					self::SLUG
				);
					add_settings_field(
						self::SLUG . '_is_in_sync',
						"Is Syncing Runing?",
						array( $this, 'is_in_sync_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_compare_sync_to_api',
						"Amount of yachts in API vs WP? (brokerage-only)",
						array( $this, 'compare_sync_to_api_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_boats_com_api_global_key',
						"Boats.com Api Global Key",
						array( $this, 'boats_com_api_global_key_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_boats_com_api_global_key_2',
						"Boats.com Api Global Key #2",
						array( $this, 'boats_com_api_global_key_2_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_boats_com_api_brokerage_key',
						"Boats.com Api Brokerage Key",
						array( $this, 'boats_com_api_brokerage_key_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_boats_com_api_brokerage_key_2',
						"Boats.com Api Brokerage Key #2",
						array( $this, 'boats_com_api_brokerage_key_2_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					
					add_settings_field(
						self::SLUG . '_boats_com_api_brokerage_status_orverride',
						"Boats.com Api Brokerage Extra Sale Statuses",
						array( $this, 'boats_com_api_brokerage_status_override_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_yacht_broker_org_api_token',
						"YachtBroker.org Api Token",
						array( $this, 'yacht_broker_org_api_token_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_yacht_broker_org_id',
						"YachtBroker.org Company ID",
						array( $this, 'yacht_broker_org_id_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_yacht_broker_org_api_token_2',
						"YachtBroker.org Api Token #2",
						array( $this, 'yacht_broker_org_api_token_2_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_yacht_broker_org_id_2',
						"YachtBroker.org Company ID #2",
						array( $this, 'yacht_broker_org_id_2_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_yacht_broker_brokerage_id',
						"YachtBroker.org Brokerage ID",
						array( $this, 'yacht_broker_brokerage_id_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					
					add_settings_field(
						self::SLUG . '_yatco_api_token',
						"YATCO API Token",
						array( $this, 'yatco_api_token_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_alert_on_low_count',
						"Alert When Listing Count Drops Belows",
						array( $this, 'alert_on_low_count_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					
					add_settings_field(
						self::SLUG . '_alert_emails',
						"Alert Who?",
						array( $this, 'alert_emails_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_last_synced',
						"Last Synced?",
						array( $this, 'last_synced_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					

					add_settings_field(
						self::SLUG . '_is_euro_site',
						"Make Site Display Meter And Euros",
						array( $this, 'is_euro_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_prerender_brochures',
						"Prerender Brochures (Cost Extra)",
						array( $this, 'prerender_brochure_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					
					add_settings_field(
						self::SLUG . 'button_bg_color_one',
						"Button BG Color",
						array( $this, 'button_bg_color_one_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					
					add_settings_field(
						self::SLUG . '_button_txt_color_one',
						"Button Text Color",
						array( $this, 'button_txt_color_one_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					
					add_settings_field(
						self::SLUG . '_is_euro_site',
						"Make Site Display Meter And Euros",
						array( $this, 'is_euro_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_send_lead_to_this_email',
						"Email Address To Receive Leads At",
						array( $this, 'send_lead_to_this_email_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_yacht_search_page_id',
						"Yacht Search Page",
						array( $this, 'yacht_search_page_id_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_team_page_id',
						"Team Page",
						array( $this, 'team_page_id_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					
					add_settings_field(
						self::SLUG . '_company_name',
						"Company Name",
						array( $this, 'company_name' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					
					add_settings_field(
						self::SLUG . '_company_logo',
						"Company Logo",
						array( $this, 'company_logo_id_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_company_number',
						"Company Phone Number",
						array( $this, 'company_number' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					
					add_settings_field(
						self::SLUG . '_akismet_api_token',
						"Akismet API TOKEN",
						array( $this, 'akismet_token_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_exchange_api_token',
						"Currency Exchange API TOKEN",
						array( $this, 'exchange_api_token_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_chatgpt_api_token',
						"ChatGPT API Token",
						array( $this, 'chatgpt_api_token_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_chatgpt_api_model',
						"ChatGPT API Model",
						array( $this, 'chatgpt_api_model_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_pdf_urlbox_api_token_public_key',
						"UrlBox API Public Token",
						array( $this, 'pdf_urlbox_api_public_token_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					
					add_settings_field(
						self::SLUG . '_pdf_urlbox_api_secret_key',
						"UrlBox API Secret Key",
						array( $this, 'pdf_urlbox_api_secret_token_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_pdf_s3_bucket',
						"S3 Bucket (FOR PDF STORAGE)",
						array( $this, 'pdf_s3_bucket_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					
					add_settings_field(
						self::SLUG . '_pdf_s3_endpoint',
						"S3 Enpoint (FOR PDF STORAGE)",
						array( $this, 'pdf_s3_endpoint_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					
					add_settings_field(
						self::SLUG . '_pdf_s3_key',
						"S3 Key (FOR PDF STORAGE)",
						array( $this, 'pdf_s3_key_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					
					add_settings_field(
						self::SLUG . '_pdf_s3_secret',
						"S3 Secret (FOR PDF STORAGE)",
						array( $this, 'pdf_s3_secret_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_pdf_bandwidth',
						"PDF Bandwidth",
						array( $this, 'pdf_bandwidth_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_youtube_data_api_key',
						"Youtube Data API Key",
						array( $this, 'youtube_data_api_key_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					
					
		}		

		public function section_cb() {
			echo '<p>Settings required for yacht syncing!</p>';

		}

		public function is_in_sync_field() {
			global $wpdb;

			$numberOfSyncing = $wpdb->get_var( "SELECT COUNT(*) FROM $wpdb->posts p WHERE p.post_type = 'syncing_ysp_yacht'" );
			$numberOfLastSynced = $wpdb->get_var( "SELECT COUNT(*) FROM $wpdb->posts p WHERE p.post_type = 'ysp_yacht'" );

			if ($numberOfSyncing > 0) {
				echo "Yes we syncing, current count is $numberOfSyncing ... last sync was ".$numberOfLastSynced;
			}
			else {
				echo 'Doesnt Appear to be in a sync.';
			}

		}

		public function compare_sync_to_api_field() {
			global $wpdb;

			$wpBrokerageCount = $wpdb->get_var( "
				SELECT COUNT(*) 
				FROM $wpdb->posts p 
				LEFT JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id
				WHERE p.post_type = 'ysp_yacht' AND pm.meta_key = 'CompanyBoat' AND pm.meta_value = '1' 
			" );

			$brokerageInventoryUrl = 'https://api.boats.com/inventory/search?SalesStatus=Active,On-Order&key=';

			$key=$this->options->get('boats_com_api_brokerage_key');

			$brokerageInventoryUrl .= $key;

			$brokerageApiCall = wp_remote_get($brokerageInventoryUrl, ['timeout' => 120]);

				$brokerageApiCall['body']=json_decode($brokerageApiCall['body'], true);

				$api_status_code = wp_remote_retrieve_response_code($brokerageApiCall);

				if ($api_status_code == 200 && isset($brokerageApiCall['body']['numResults'])) {

					echo 'Dont shot the messagener, the api has '. $brokerageApiCall['body']['numResults'] . ' and wordpress has '. $wpBrokerageCount;

					$EmailAlert = new YachtSyncPro_AlertOnDiffCount();

					$EmailAlert->email();

				}
				else {
					echo 'ERROR... ERROR...';

				}

		}

		public function boats_com_api_global_key_field() {

			$nameOfField=self::SLUG.'_boats_com_api_global_key';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function boats_com_api_global_key_2_field() {

			$nameOfField=self::SLUG.'_boats_com_api_global_key_2';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function boats_com_api_brokerage_key_field() {

			$nameOfField=self::SLUG.'_boats_com_api_brokerage_key';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function boats_com_api_brokerage_key_2_field() {

			$nameOfField=self::SLUG.'_boats_com_api_brokerage_key_2';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}
		
		public function boats_com_api_brokerage_status_override_field() {

			$nameOfField=self::SLUG.'_boats_com_api_brokerage_status_override';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}
		
		public function yacht_broker_org_api_token_field() {

			$nameOfField=self::SLUG.'_yacht_broker_org_api_token';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function yacht_broker_org_id_2_field() {
			$nameOfField=self::SLUG.'_yacht_broker_org_id_2';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function yacht_broker_org_api_token_2_field() {

			$nameOfField=self::SLUG.'_yacht_broker_org_api_token_2';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function yacht_broker_org_id_field() {
			$nameOfField=self::SLUG.'_yacht_broker_org_id';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function yacht_broker_org_limit_field() {
			$nameOfField=self::SLUG.'_yacht_broker_org_limit';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function yacht_broker_brokerage_id_field() {
			$nameOfField=self::SLUG.'_yacht_broker_brokerage_id';
			$valOfField=get_option($nameOfField);
			?>
			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function yatco_api_token_field() {
			$nameOfField=self::SLUG.'_yatco_api_token';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function alert_on_low_count_field() {
			$nameOfField=self::SLUG.'_alert_on_low_count';
			$valOfField=get_option($nameOfField);

			?>

			<input type="number" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function alert_emails_field() {
			$nameOfField=self::SLUG.'_alert_emails';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function last_synced_field() {

			$nameOfField=self::SLUG.'_last_synced';
			$val=get_option($nameOfField);

			echo $val;
		}

		public function is_euro_field() {
			$options=[
				'' => '---- Not Picked Yet ----',
				'yes' => 'YES',
				'no' => 'NO',
			];

			$nameOfField=self::SLUG.'_is_euro_site';
			$valOfField=get_option($nameOfField);

			?>

			<select name="<?= $nameOfField ?>"> 
				<?php 
					foreach ( $options as $opt_value => $opt_label ) {
						$option = '<option value="' . $opt_value . '" '. selected($opt_value, $valOfField, false) .'>';

						$option .= $opt_label;
						
						$option .= '</option>';

						echo $option;
					}
				?>
			</select><?php 
		}

		public function prerender_brochure_field() {
			$options=[
				'' => '---- Not Picked Yet ----',
				'yes' => 'YES',
				'no' => 'NO',
			];

			$nameOfField=self::SLUG.'_prerender_brochures';
			$valOfField=get_option($nameOfField);

			?>

			<select name="<?= $nameOfField ?>"> 
				<?php 
					foreach ( $options as $opt_value => $opt_label ) {
						$option = '<option value="' . $opt_value . '" '. selected($opt_value, $valOfField, false) .'>';

						$option .= $opt_label;
						
						$option .= '</option>';

						echo $option;
					}
				?>
			</select><?php 
		}

		public function color_one_field() {
			$nameOfField=self::SLUG.'_color_one';
			$valOfField=get_option($nameOfField);

			?>

			<input type="color" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function button_bg_color_one_field() {
			$nameOfField=self::SLUG.'_button_bg_color_one';
			$valOfField=get_option($nameOfField);

			?>

			<input type="color" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}
		public function button_txt_color_one_field() {
			$nameOfField=self::SLUG.'_button_txt_color_one';
			$valOfField=get_option($nameOfField);

			?>

			<input type="color" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function send_lead_to_this_email_field() {
			$nameOfField=self::SLUG.'_send_lead_to_this_email';
			$valOfField=get_option($nameOfField);

			?>

			<input type="email" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function yacht_search_page_id_field() {
			$pages=get_posts([
				'post_type' => 'page', 
				'posts_per_page' => -1, 
				'post_status' => ['draft', 'publish'], 
				'orderby' => 'title',
				'order' => 'ASC'
			]);

			$options=[
				'' => '---- Not Picked Yet ----',
			];

			foreach ($pages as $pg) {
				$options[$pg->ID]=$pg->post_title;
			}

			$nameOfField=self::SLUG.'_yacht_search_page_id';
			$valOfField=get_option($nameOfField);

			?>

			<select name="<?= $nameOfField ?>"> 
				<?php 
					foreach ( $options as $opt_value => $opt_label ) {
						$option = '<option value="' . $opt_value . '" '. selected($opt_value, $valOfField, false) .'>';

						$option .= $opt_label;
						
						$option .= '</option>';

						echo $option;
					}
				?>
			</select><?php 

		}

		public function team_page_id_field() {
			$pages=get_posts([
				'post_type' => 'page', 
				'posts_per_page' => -1, 
				'post_status' => ['draft', 'publish'], 
				'orderby' => 'title',
				'order' => 'ASC'
			]);

			$options=[
				'' => '---- Not Picked Yet ----',
			];

			foreach ($pages as $pg) {
				$options[$pg->ID]=$pg->post_title;
			}

			$nameOfField=self::SLUG.'_team_page_id';
			$valOfField=get_option($nameOfField);

			?>

			<select name="<?= $nameOfField ?>"> 
				<?php 
					foreach ( $options as $opt_value => $opt_label ) {
						$option = '<option value="' . $opt_value . '" '. selected($opt_value, $valOfField, false) .'>';

						$option .= $opt_label;
						
						$option .= '</option>';

						echo $option;
					}
				?>
			</select><?php 

		}

		public function company_name() {
			$nameOfField=self::SLUG.'_company_name';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function company_number() {
			$nameOfField=self::SLUG.'_company_number';
			$valOfField=get_option($nameOfField);

			?>

			<input type="tel" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}
		public function company_logo_id_field() {
			$image_id = get_option(self::SLUG . '_company_logo');
			$image_url = wp_get_attachment_image_url($image_id, 'full');
			?>
			<?php if ($image = wp_get_attachment_image_url($image_id, 'full')) : ?>
				<a href="#" class="rudr-upload">
					<img src="<?php echo esc_url($image) ?>" />
				</a>
				<a href="#" class="rudr-remove">Remove image</a>

				<input type="hidden" name="<?php echo self::SLUG; ?>_company_logo" value="<?php echo $image_id; ?>">
			<?php else : ?>
				<a href="#" class="button rudr-upload">Upload image</a>
				<a href="#" class="rudr-remove" style="display:none">Remove image</a>
				<input type="hidden" name="<?php echo self::SLUG; ?>_company_logo" value="<?php echo $image_id; ?>">
			<?php endif;
		}
		
		public function akismet_token_field() {
			$nameOfField=self::SLUG.'_akismet_api_token';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function exchange_api_token_field() {
			$nameOfField=self::SLUG.'_exchange_api_token';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}


		public function chatgpt_api_token_field() {
			$nameOfField=self::SLUG.'_chatgpt_api_token';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function chatgpt_api_model_field() {
			$nameOfField=self::SLUG.'_chatgpt_api_model';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php
		}

		public function pdf_urlbox_api_public_token_field() {
			$nameOfField=self::SLUG.'_pdf_urlbox_api_token_public_key';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function pdf_urlbox_api_secret_token_field() {
			$nameOfField=self::SLUG.'_pdf_urlbox_api_secret_key';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}
		
		public function pdf_s3_bucket_field() {
			$nameOfField=self::SLUG.'_pdf_s3_bucket';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function pdf_s3_endpoint_field() {
			$nameOfField=self::SLUG.'_pdf_s3_endpoint';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function pdf_s3_key_field() {
			$nameOfField=self::SLUG.'_pdf_s3_key';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function pdf_s3_secret_field() {
			$nameOfField=self::SLUG.'_pdf_s3_secret';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function pdf_bandwidth_field() {

			$options=[
				'' => '---- Not Picked Yet ----',
				'redirect' => 'Redirect',
				'sos' => 'Stay On Server',
			];

			$nameOfField=self::SLUG.'_pdf_bandwidth';
			$valOfField=get_option($nameOfField);

			?>

			<select name="<?= $nameOfField ?>"> 
				<?php 
					foreach ( $options as $opt_value => $opt_label ) {
						$option = '<option value="' . $opt_value . '" '. selected($opt_value, $valOfField, false) .'>';

						$option .= $opt_label;
						
						$option .= '</option>';

						echo $option;
					}
				?>
			</select><?php 
		}

		public function youtube_data_api_key_field() {
			$nameOfField=self::SLUG.'_youtube_data_api_key';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

	}