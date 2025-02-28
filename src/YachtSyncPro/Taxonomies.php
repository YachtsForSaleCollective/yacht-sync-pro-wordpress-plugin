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

        register_taxonomy('boatmaker', ['ysp_yacht', 'syncing_ysp_yacht'], array(

            'public' => false,
            'publicly_queryable' => true,
            'show_ui' => true,
            'hierarchical' => false,

            'labels' => array(
              'name' => __( 'Boat Maker' ),
              'singular_name' => __( 'Boat Maker' ),
              'search_items' =>  __( 'Search Maker' ),
              'all_items' => __( 'All Boat Maker' ),
              'parent_item' => __( 'Parent Maker' ),
              'parent_item_colon' => __( 'Parent Maker:' ),
              'edit_item' => __( 'Edit Maker' ),
              'update_item' => __( 'Update Maker' ),
              'add_new_item' => __( 'Add New Maker' ),
              'new_item_name' => __( 'New Maker' ),
              'menu_name' => __( 'Boat Maker' ),
            )
        ));

        register_taxonomy('boattype', ['ysp_yacht', 'syncing_ysp_yacht'], array(

            'public' => false,
            'publicly_queryable' => true,
            'show_ui' => true,
            'hierarchical' => false,

            'labels' => array(
              'name' => __( 'Boat Type' ),
              'singular_name' => __( 'Boat Type' ),
              'search_items' =>  __( 'Search Type' ),
              'all_items' => __( 'All Boat Type' ),
              'parent_item' => __( 'Parent Type' ),
              'parent_item_colon' => __( 'Parent Type:' ),
              'edit_item' => __( 'Edit Type Class' ),
              'update_item' => __( 'Update Type' ),
              'add_new_item' => __( 'Add New Type' ),
              'new_item_name' => __( 'New Type' ),
              'menu_name' => __( 'Boat Type' ),
            )
        ));

        register_taxonomy('boatcondition', ['ysp_yacht', 'syncing_ysp_yacht'], array(

            'public' => false,
            'publicly_queryable' => true,
            'show_ui' => true,
            'hierarchical' => false,

            'labels' => array(
              'name' => __( 'Boat Condition' ),
              'singular_name' => __( 'Boat Condition' ),
              'search_items' =>  __( 'Search Condition' ),
              'all_items' => __( 'All Boat Condition' ),
              'parent_item' => __( 'Parent Condition' ),
              'parent_item_colon' => __( 'Parent Condition:' ),
              'edit_item' => __( 'Edit Condition' ),
              'update_item' => __( 'Update Condition' ),
              'add_new_item' => __( 'Add New Condition' ),
              'new_item_name' => __( 'New Condition' ),
              'menu_name' => __( 'Boat Condition' ),
            )
        ));

        register_taxonomy('boattags', ['ysp_yacht'], array(

            'public' => false,
            'publicly_queryable' => true,
            'show_ui' => true,
            'hierarchical' => false,

            'labels' => array(
              'name' => __( 'Boat Tags' ),
              'singular_name' => __( 'Boat Tag' ),
              'search_items' =>  __( 'Search Boat Tags' ),
              'all_items' => __( 'All Boat Tags' ),
              'parent_item' => __( 'Parent Boat Tag' ),
              'parent_item_colon' => __( 'Parent Boat Tag:' ),
              'edit_item' => __( 'Edit Boat Tag' ),
              'update_item' => __( 'Update old Boat Tag' ),
              'add_new_item' => __( 'Add New Boat Tag' ),
              'new_item_name' => __( 'New Boat Tag' ),
              'menu_name' => __( 'Internal Boat Tags' ),
            )
        ));    

        register_taxonomy('soldboattags', ['ysp_sold_yacht'], array(

            'public' => false,
            'publicly_queryable' => true,
            'show_ui' => true,
            'hierarchical' => false,

            'labels' => array(
              'name' => __( 'Sold Boat Tags' ),
              'singular_name' => __( 'Sold Boat Tag' ),
              'search_items' =>  __( 'Search Sold Boat Tags' ),
              'all_items' => __( 'All Sold Boat Tags' ),
              'parent_item' => __( 'Parent Sold Boat Tag' ),
              'parent_item_colon' => __( 'Parent Sold Boat Tag:' ),
              'edit_item' => __( 'Edit Sold Boat Tag' ),
              'update_item' => __( 'Update Sold Boat Tag' ),
              'add_new_item' => __( 'Add New Sold Boat Tag' ),
              'new_item_name' => __( 'New Sold Boat Tag' ),
              'menu_name' => __( 'Sold Boat Tags' ),
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