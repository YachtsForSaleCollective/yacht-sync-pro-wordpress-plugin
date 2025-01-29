<?php 
	#[AllowDynamicProperties]
	class YachtSyncPro_Plugin {

		static public $indicateActivated;

		public function __construct() {

			$this->AdminBar = new YachtSyncPro_AdminDashboard_AdminBar();
			$this->AdminDashboard = new YachtSyncPro_AdminDashboard_SettingsPanel();
			$this->StylesAndScripts = new YachtSyncPro_StylesAndScripts();

			$this->PostTypes = new YachtSyncPro_PostTypes();
			$this->Taxonomies = new YachtSyncPro_Taxonomies();
			$this->RestApi = new YachtSyncPro_RestApi();
			

			$this->YoastFun_OgImage = new YachtSyncPro_YoastFun_ogImage();
			$this->YoastFun_Descriptions = new YachtSyncPro_YoastFun_Descriptions();

			$this->YoastFun_SchemaPieces = new YachtSyncPro_YoastFun_SchemaPieces();
			$this->YoastFun_Breadcrumbs = new YachtSyncPro_YoastFun_Breadcrumbs();
			$this->YoastFun_SitemapPriority = new YachtSyncPro_YoastFun_SitemapPriority();

			$this->Yachts_WpQueryAddon = new YachtSyncPro_Yachts_WpQueryAddon();
			$this->Yachts_WpQueryForSimilar = new YachtSyncPro_Yachts_WpQueryForSimilar();
			
			$this->Yachts_DetailOverride = new YachtSyncPro_Yachts_DetailsOverride();
			$this->Yachts_Shortcode = new YachtSyncPro_Shortcodes_YachtSearch();
			$this->Yachts_Search_Seo_ApplyToYoast = new YachtSyncPro_YoastFun_SearchSEOApply();
			$this->Yachts_Search_Seo_Shortcode = new YachtSyncPro_Shortcodes_YachtSearchSeo();
			$this->Yachts_RestrictManagePosts = new YachtSyncPro_Yachts_RestrictManagePosts();

			$this->Yachts_Meta_Brochure = new YachtSyncPro_Yachts_MetaBrochureSection();
			$this->Yachts_MetaFields = new YachtSyncPro_Yachts_MetaSections();
			$this->Yachts_NestedMetaFields = new YachtSyncPro_Yachts_NestedMetaSections();
			$this->Yachts_MetaIsManual = new YachtSyncPro_Yachts_MetaIsManual();

			$this->SoldYachts_DetailOverride = new YachtSyncPro_SoldYachts_DetailsOverride();
			$this->SoldYachts_MetaFields = new YachtSyncPro_SoldYachts_MetaSections();
			$this->SoldYachts_NestedMetaFields = new YachtSyncPro_SoldYachts_NestedMetaSections();
			// $this->SoldYachts_MetaIsManual = new YachtSyncPro_SoldYachts_MetaIsManual();

			$this->Brokers_DetailOverride = new YachtSyncPro_Brokers_DetailsOverride();
			$this->Brokers_MetaFields = new YachtSyncPro_Brokers_MetaSections();
			$this->Brokers_Shortcodes = new YachtSyncPro_Shortcodes_Brokers();

			$this->RewriteURL = new YachtSyncPro_RewriteURL();
			
			$this->Shortcode_PrintMeta = new YachtSyncPro_Shortcodes_PrintMetaField();

			$this->GutenbergBlocks = new YachtSyncPro_GutenbergBlocks();

			$this->AddSearchSitemapsToYoast = new YachtSyncPro_AddSearchSitemapsToYoast();

			$this->Commands = new YachtSyncPro_AddCommands();
			$this->Crons = new YachtSyncPro_Cron();
		
		}

		public function isInstalled() {
			//return $this->options->isInstalled();
		}

		public function install() {
			//	$this->installer->install();
		}

		public function upgrade() {
			# Cleanup and additions/subtractions pertaining to the version upgrade
			//$this->installer->installDatabaseTables();
		}

		public function activate() {
			// activation logic
			//self::$indicateActivated = $this->options->addOption('_activated', 1);

			//$this->installer->install();
			//$this->installer->installDatabaseTables();
		}

		public function deactivate() {
			//self::$indicateActivated = $this->options->deleteOption('_activated');
		}

		public function addActionsAndFilters() {
			
			foreach ($this as $this_key_value) {

				if (method_exists($this_key_value, 'add_actions_and_filters')) {

					$this_key_value->add_actions_and_filters();

				}

			}
		}
	}