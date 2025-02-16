<?php
	#[AllowDynamicProperties]
	class YachtSyncPro_AddCommands {

		public function __construct() {

		}

		public function add_actions_and_filters() {		
			if ( defined( 'WP_CLI' ) && WP_CLI ) {
				WP_CLI::add_command( 'sync-yachts', 'YachtSyncPro_CommandSync' );
				WP_CLI::add_command( 'sync-brokerage-only', 'YachtSyncPro_CommandSyncBrokerageOnly' );
				WP_CLI::add_command( 'sitemap-generator', 'YachtSyncPro_CommandSitemaps' );
				WP_CLI::add_command( 'redo-yacht-meta-descriptions', 'YachtSyncPro_CommandRedoYachtMetaDescriptions' );
				WP_CLI::add_command( 'sync-sold-yachts', 'YachtSyncPro_CommandSyncSoldYachts' );
			}
		}

	}