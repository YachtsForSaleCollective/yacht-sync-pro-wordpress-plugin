<?php
	#[AllowDynamicProperties]
	class YachtSyncPro_CommandSyncSoldYachts {
		protected $environment;

	    public function __construct( ) {
	        $this->environment = wp_get_environment_type();
	    }

	    public function __invoke( $args ) {	

		    $RunImports=new YachtSyncPro_RunImports();
			
		    $RunImports->run_sold_yachts();

	        WP_CLI::log( 'COMPLETED SOLD YACHTS SYNC' );
	    }
	}