<?php
	#[AllowDynamicProperties]
	class YachtSyncPro_DBHelper {

		public function __construct() {

		}

		public function get_unique_yacht_meta_values( $key = 'trees' ) {
			global $wpdb;
		
			if( empty( $key ) )
				return [];
			
			$res = $wpdb->get_col( $wpdb->prepare( "
				SELECT DISTINCT pm.meta_value FROM {$wpdb->postmeta} pm
				LEFT JOIN {$wpdb->posts} p ON p.ID = pm.post_id
				INNER JOIN {$wpdb->postmeta} pmm ON pmm.post_id = pm.post_id
				WHERE pm.meta_key = '%s'
				AND p.post_status = '%s' 
				AND p.post_type = '%s' 
				AND pmm.meta_key = 'SalesStatus' 
				AND pmm.meta_value != 'Sold' AND pmm.meta_value != 'Suspend' 
				AND LENGTH(pm.meta_value) > 1
				ORDER BY pm.meta_value ASC
				", $key, 'publish', 'ysp_yacht' ) );

			return $res;
		}

		public function get_unique_yacht_meta_values_with_DISTINCT_count( $key = 'trees' ) {
			global $wpdb;
		
			if( empty( $key ) )
				return [];
			
			$res = $wpdb->get_results( $wpdb->prepare( "
				SELECT DISTINCT pm.meta_value as V, COUNT(DISTINCT pm.meta_value) as C FROM {$wpdb->postmeta} pm
				LEFT JOIN {$wpdb->posts} p ON p.ID = pm.post_id
				INNER JOIN {$wpdb->postmeta} pmm ON pmm.post_id = pm.post_id
				WHERE pm.meta_key = '%s'
				AND p.post_status = '%s' 
				AND p.post_type = '%s' 
				AND pmm.meta_key = 'SalesStatus' 
				AND pmm.meta_value != 'Sold' AND pmm.meta_value != 'Suspend' 
				AND LENGTH(pm.meta_value) > 1
				ORDER BY pm.meta_value ASC
				", $key, 'publish', 'ysp_yacht' ) );

			return $res;
		}
		
		public function get_unique_yacht_meta_values_based_input( $key = 'trees', $input_val = '' ) {
			global $wpdb;
		
			if( empty( $key ) || empty($input_val) )
				return [];
			
			$res = $wpdb->get_col( $wpdb->prepare( "
				SELECT DISTINCT pm.meta_value FROM {$wpdb->postmeta} pm
				LEFT JOIN {$wpdb->posts} p ON p.ID = pm.post_id
				INNER JOIN {$wpdb->postmeta} pmm ON pmm.post_id = pm.post_id
				WHERE pm.meta_key = '%s' 
				AND pm.meta_value LIKE '%s'
				AND p.post_status = '%s' 
				AND p.post_type = '%s' 
				AND pmm.meta_key = 'SalesStatus' 
				AND pmm.meta_value != 'Sold' AND pmm.meta_value != 'Suspend' 
				AND LENGTH(pm.meta_value) > 1
				ORDER BY pm.meta_value ASC
				", $key, $input_val.'%', 'publish', 'ysp_yacht' ) );

			return $res;
		}

		public function get_unique_display_locations() {
			global $wpdb;

			$res = $wpdb->get_col( $wpdb->prepare( "
				SELECT DISTINCT IF(pmmm.meta_value='US' OR pmmm.meta_value='US', CONCAT(pm.meta_value, ', ', pmmmm.meta_value), CONCAT(pm.meta_value, ', ', pmmm.meta_value)) FROM {$wpdb->postmeta} pm
				LEFT JOIN {$wpdb->posts} p ON p.ID = pm.post_id
				INNER JOIN {$wpdb->postmeta} pmm ON pmm.post_id = pm.post_id
				INNER JOIN {$wpdb->postmeta} pmmm ON pmmm.post_id = pm.post_id
				INNER JOIN {$wpdb->postmeta} pmmmm ON pmmmm.post_id = pm.post_id
				WHERE pm.meta_key = 'YSP_City' 
				AND pmmm.meta_key = 'YSP_CountryID'  
				AND pmmmm.meta_key = 'YSP_State'  
				AND p.post_status = '%s'
				AND p.post_type = '%s' 
				AND pmm.meta_key = 'SalesStatus' 
				AND pmm.meta_value != 'Sold'
				AND LENGTH(pm.meta_value) > 1
				ORDER BY pm.meta_value ASC
				", 'publish', 'ysp_yacht' ) );

			return $res;
		}


		public function get_unique_yacht_tax_values($tax) {

			$terms = get_terms( array(
			    'taxonomy'   => $tax,
			    'post_type' => 'ysp_yacht',
			    'fields' => 'names',
			    'hide_empty' => true,
			));

			return $terms;

		}

		public function get_unique_yacht_tax_values_with_count($tax) {

			$terms = get_terms( array(
			    'taxonomy'   => $tax,
			    'post_type' => 'ysp_yacht',
			    'hide_empty' => true,
			));

			$options=[];

			foreach ($terms as $t) {

				$options[]=[
					"t" => $t->name.' ('. $t->count .')',
					"v" => $t->name,
 				];

			}

			return $options;

		}



	}