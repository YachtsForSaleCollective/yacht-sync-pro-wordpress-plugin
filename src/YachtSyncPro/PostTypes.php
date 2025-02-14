<?php
	#[AllowDynamicProperties]
	class YachtSyncPro_PostTypes {

		public function __construct() {

		}

		public function add_actions_and_filters() {

			add_action( 'init', [ $this, 'addPostTypes' ], 12);

		}

		public function addPostTypes() {
	 
			register_post_type('syncing_ysp_yacht', [

           		'labels' => array(
					'name' => 'Syncing Yachts',
					'singular_name' => 'Yacht',
				),
				
				'has_archive' => false,
				//'query_var' => 'ysp_yacht_id',

				'rewrite' => array(
			        'slug' => 'yacht-listing',
			        'with_front' => true
			    ),

			    'capability_type' => 'post',
			    'map_meta_cap' => true,

				'public' => true,
				'publicly_queryable' => false,
				'can_export' => true,

				'supports' => array('title', 'editor', 'thumbnail', 'custom-fields')

            ]);
            
			register_post_type('ysp_yacht', [

           		'labels' => array(
					'name' => 'Synced Yachts',
					'singular_name' => 'Yacht',
				),

				'supports' => array('title', 'editor', 'thumbnail'),
				
				'has_archive' => false,
				//'query_var' => 'ysp_yacht_id',

				'rewrite' => array(
			        'slug' => 'yacht-listing',
			        'with_front' => true
			    ),

			    'capability_type' => 'post',
			    'map_meta_cap' => true,

				'public' => true,
				'publicly_queryable' => true,
				'can_export' => true

            ]);

			register_post_type('syncing_ysp_sold_yacht', [

					'labels' => array(
					'name' => 'Syncing Sold Yachts',
					'singular_name' => 'Sold Yacht',
				),
				
				'has_archive' => false,
				//'query_var' => 'ysp_yacht_id',

				'rewrite' => array(
					'slug' => 'sold-yacht',
					'with_front' => true
				),

				'capability_type' => 'post',
				'map_meta_cap' => true,

				'public' => false,
				'publicly_queryable' => false,
				'can_export' => true,

				'supports' => array('title', 'editor', 'thumbnail', 'custom-fields')

			]);
			

			register_post_type('ysp_sold_yacht', [

           		'labels' => array(
					'name' => 'Sold Yachts',
					'singular_name' => 'Sold Yacht',
				),

				'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
				
				'has_archive' => false,
				//'query_var' => 'ysp_sold_yacht_id',

				'rewrite' => array(
			        'slug' => 'sold-yacht',
			        'with_front' => true
			    ),
				
				'public' => true,
				'publicly_queryable' => true,
				'can_export' => false,

           ]);

           register_post_type('ysp_team', [
           		'labels' => array(
					'name' => 'Team Members',
					'singular_name' => 'Team Member',
				),
				
				'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
				
				'has_archive' => false,
				//'query_var' => 'ysp_team_id',

				
				'rewrite' => array(
			        'slug' => 'team',
			        'with_front' => true
			    ),

				'public' => true,
				'publicly_queryable' => true,
				'can_export' => false,
           ]);

		}

	}