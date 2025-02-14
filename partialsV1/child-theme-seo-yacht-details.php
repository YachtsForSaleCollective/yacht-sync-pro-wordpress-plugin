<?php

	add_filter( 'wpseo_title', 'ct_yacht_details_title', 10, 1 );
	add_filter( 'wpseo_metadesc', 'ct_yacht_details_description', 10, 1 );
	add_action( 'wpseo_add_opengraph_images', 'ct_yacht_details_ogimage', 10, 1 );

	function ct_yacht_details_title($title) {
		global $wp_query, $post;

		if (is_singular('ysp_yacht')) {

		}

		return $title;
	}


	function ct_yacht_details_description($desc) {
		global $wp_query, $post;

		if (is_singular('ysp_yacht')) {

			
			
		}

		return $desc;
	}

	function ct_yacht_details_ogimage($object) {
		global $wp_query, $post;

		if (is_singular('ysp_yacht')) {
			$VesselImages=get_post_meta($post->ID, 'Images', true);

			$image = ['url' => $VesselImages[3]->Uri];

			$object->add_image( $image );
		}
	}