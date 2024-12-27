<?php 
    #[AllowDynamicProperties]
 class YachtSyncPro_Taxonomies {
    public function __construct() {

    }

    public function add_actions_and_filters() {
        add_action('init', [$this, 'add_taxonomies']);
    }

    public function add_taxonomies() {
        register_taxonomy('boatclass', ['ysp_yacht', 'syncing_ysp_yacht'], array(

            'public' => false,
            'publicly_queryable' => true,
            'show_ui' => true,
            'hierarchical' => false,

            'labels' => array(
              'name' => __( 'Boat Code Class' ),
              'singular_name' => __( 'Boat Code Class' ),
              'search_items' =>  __( 'Search Codes' ),
              'all_items' => __( 'All Boat Code Classes' ),
              'parent_item' => __( 'Parent Code' ),
              'parent_item_colon' => __( 'Parent Code:' ),
              'edit_item' => __( 'Edit Code Class' ),
              'update_item' => __( 'Update Code Class' ),
              'add_new_item' => __( 'Add New Code Class' ),
              'new_item_name' => __( 'New Code Class' ),
              'menu_name' => __( 'Boat Code Classes' ),
            )
        ));

        register_taxonomy('membercategroy', 'ysp_team', array(

            'public' => false,
            'publicly_queryable' => true,
            'show_ui' => true,
            'hierarchical' => false,

            'labels' => array(
              'name' => __( 'Team Member Category' ),
              'singular_name' => __( 'Team Member Category' ),
              'search_items' =>  __( 'Search Categories' ),
              'all_items' => __( 'All Team Member Categories' ),
              'parent_item' => __( 'Parent Category' ),
              'parent_item_colon' => __( 'Parent Category:' ),
              'edit_item' => __( 'Edit Team Member Category' ),
              'update_item' => __( 'Update Team Member Category' ),
              'add_new_item' => __( 'Add New Team Member Category' ),
              'new_item_name' => __( 'New Team Member Category' ),
              'menu_name' => __( 'Team Member Categories' ),
            )
        ));
    }

 }