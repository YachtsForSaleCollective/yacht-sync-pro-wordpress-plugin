<?php

	#[AllowDynamicProperties]
	class YachtSyncPro_Cron {

	    public function __construct() {
	    	$this->options = new YachtSyncPro_Options();

	    	$this->exchange_token = $this->options->get('exchange_api_token');
	    }

	    public function add_actions_and_filters() {

	    	add_action( 'init', [$this, 'cron_scheduler']);

	    	add_filter( 'cron_schedules', [$this, 'add_cron_intervals'] );

	    	//add_action( 'ysp_cron_yacht_sync', [$this, 'run_cron_yacht_sync']);
	    	//add_action( 'ysp_cron_yacht_sync_for_brokerage_only', [$this, 'run_cron_yacht_sync_for_brokerage_only']);
			
			add_action( 'ysp_cron_euro_c_save', [$this, 'run_cron_euro_c_save']);
			add_action( 'ysp_cron_check_count', [$this, 'run_cron_check_count']);
			add_action( 'ysp_cron_yacht_search_sitemaps', [$this, 'run_cron_yacht_search_sitemaps']);

	    }

	    public function add_cron_intervals( $schedules ) {

	    	 $schedules['weekly'] = array(
		        'interval' => 604800, //that's how many seconds in a week, for the unix timestamp
		        'display' => __('weekly')
		    );

		    return $schedules;

	    }

	    public function cron_scheduler() {
	
			if ( ! wp_next_scheduled( 'ysp_cron_euro_c_save' ) ) {
			    wp_schedule_event( strtotime('02:00:00'), 'daily', 'ysp_cron_euro_c_save' );
			}

	    	if ( ! wp_next_scheduled( 'ysp_cron_yacht_sync' ) ) {
			   // wp_schedule_event( strtotime('04:00:00'), 'daily', 'ysp_cron_yacht_sync' );
			}

			if ( ! wp_next_scheduled( 'ysp_cron_yacht_sync_brokerage_only' ) ) {
			    //wp_schedule_event( strtotime('10:00:00'), 'daily', 'ysp_cron_yacht_sync_for_brokerage_only' );
			}

			if ( ! wp_next_scheduled( 'ysp_cron_yacht_search_sitemaps' ) ) {
				wp_schedule_event( time(), 'weekly', 'ysp_cron_yacht_search_sitemaps' );
			}
	    	
			if ( ! wp_next_scheduled( 'ysp_cron_check_count' ) ) {
			    wp_schedule_event( time(), 'hourly', 'ysp_cron_check_count' );
			}

	    }

	    public function run_cron_yacht_sync() {

	    	$RunImports=new YachtSyncPro_RunImports();
			
		    $RunImports->run();

	    }

	    public function run_cron_yacht_sync_for_brokerage_only() {

	    	$RunImports=new YachtSyncPro_RunImports();
			
		    $RunImports->run_brokerage_only();

	    }

		public function run_cron_euro_c_save() {

			// EURO

			$apiUrl = "http://api.exchangerate.host/live?access_key=$this->exchange_token&source=USD&symbols=EUR";
		
			$response = wp_remote_get($apiUrl, [
				
			]);
			
			$responseBody = wp_remote_retrieve_body($response);
			$responseCode = wp_remote_retrieve_response_code($response);
			
			$result = json_decode($responseBody);
			
			if (! is_wp_error($result) && $responseCode == 200) {
				if (isset($result->quotes)) {
					$this->options->update('euro_c_c', $result->quotes->USDEUR);
				}
				else {
					$this->options->update('euro_c_c', 0.92);
				}
			}
			else {
				$this->options->update('euro_c_c', 0.92);
			}

			// USD

			$apiUrl = "http://api.exchangerate.host/live?access_key=$this->exchange_token&source=EUR&symbols=USD";
		
			$response = wp_remote_get($apiUrl);
			$responseBody = wp_remote_retrieve_body($response);
			$responseCode = wp_remote_retrieve_response_code($response);
			
			$result = json_decode($responseBody);
			
			if (! is_wp_error($result) && $responseCode == 200) {
				if (isset($result->quotes)) {
					$this->options->update('usd_c_c', $result->quotes->EURUSD);
				}
				else {
					$this->options->update('usd_c_c', 1.08);
				}
			}
			else {
				$this->options->update('usd_c_c', 1.08);

			}

		}

		public function run_cron_check_count() {

			$alertOnLow = new YachtSyncPro_AlertOnLowCount();

			$alertOnLow->email();

			// -----------

			$alertOnDiffCount = new YachtSyncPro_AlertOnDiffCount();

			$alertOnDiffCount->email();

		}
		
		public function run_cron_yacht_search_sitemaps() {
			$mapsOfSearch = new YachtSyncPro_SitemapsOfSearch();

			$mapsOfSearch->generateSitemap();
		}
	}	