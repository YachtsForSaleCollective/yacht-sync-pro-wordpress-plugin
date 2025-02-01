<?php
	#[AllowDynamicProperties]
	class YachtSyncPro_RestApi {

		public function __construct() {

			$this->options = new YachtSyncPro_Options();

			$this->db_helper = new YachtSyncPro_DBHelper();

			$this->RunImports = new YachtSyncPro_RunImports();
			
			$this->SearchSEO = new YachtSyncPro_SearchSEO();

			$this->Stats = new YachtSyncPro_Stats();

			$this->BrochureCleanUp = new YachtSyncPro_BrochureCleanUp();

			$this->rest_path="ysp";

		}

		public function add_actions_and_filters() {

			add_action('rest_api_init', [$this, 'register_rest_routes']);
			add_filter( 'wp_mail_content_type', [$this, 'wp_mail_set_content_type'] );

		}

		public function register_rest_routes() {

			register_rest_route( $this->rest_path, '/sync', array(
		        'callback' => [$this, 'sync_yachts'],
		        'methods'  => [WP_REST_Server::READABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            
		        )
		    ) );

		    register_rest_route( $this->rest_path, '/yachts', array(
		        'callback' => [$this, 'yachts'],
		        'methods'  => [WP_REST_Server::READABLE, WP_REST_Server::CREATABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            
		        )
		    ) );

			register_rest_route( $this->rest_path, '/compare', array(
		        'callback' => [$this, 'compare_yachts'],
		        'methods'  => [WP_REST_Server::READABLE, WP_REST_Server::CREATABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            
		        )
		    ) );

			register_rest_route( $this->rest_path, '/dropdown-options', array(
		        'callback' => [$this, 'yacht_dropdown_options'],
		        'methods'  => [WP_REST_Server::CREATABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            'labels' => array(
		                'required' => false,
		                'default' => [],
		            ),
		        )
		    ) );

		    register_rest_route( $this->rest_path, '/list-options', array(
		        'callback' => [$this, 'yacht_list_options'],
		        'methods'  => [WP_REST_Server::CREATABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            'labels' => array(
		                'required' => false,
		                'default' => [],
		            ),
		        )
		    ) );

		    register_rest_route( $this->rest_path, '/list-options-with-value', array(
		        'callback' => [$this, 'yacht_list_options_with_value'],
		        'methods'  => [WP_REST_Server::CREATABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            'labels' => array(
		                'required' => false,
		                'default' => [],
		            ),
		        )
		    ) );

		    // PDF 
		    register_rest_route( $this->rest_path, '/yacht-pdf', array(
		        'callback' => [$this, 'yacht_pdf'],
		        'methods'  => [WP_REST_Server::READABLE, WP_REST_Server::CREATABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            
		        )
		    ) );
			
			register_rest_route( $this->rest_path, '/set-yacht-pdf', array(
		        'callback' => [$this, 'set_yacht_pdf'],
		        'methods'  => [WP_REST_Server::READABLE, WP_REST_Server::CREATABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            
		        )
		    ) );

		    register_rest_route( $this->rest_path, '/checker-yacht-pdf', array(
		        'callback' => [$this, 'checker_yacht_pdf'],
		        'methods'  => [WP_REST_Server::READABLE, WP_REST_Server::CREATABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            
		        )
		    ) );

		    register_rest_route( $this->rest_path, '/yacht-pdf-loader', array(
		        'callback' => [$this, 'yacht_pdf_loader'],
		        'methods'  => [WP_REST_Server::READABLE, WP_REST_Server::CREATABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            
		        )
		    ) );

		    register_rest_route( $this->rest_path, '/yacht-pdf-download', array(
		        'callback' => [$this, 'yacht_pdf_download'],
		        'methods'  => [WP_REST_Server::READABLE, WP_REST_Server::CREATABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            
		        )
		    ) );

    		register_rest_route( $this->rest_path, '/redo-yacht-pdf', array(
		        'callback' => [$this, 'redo_yacht_pdf'],
		        'methods'  => [WP_REST_Server::READABLE, WP_REST_Server::CREATABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            
		        )
		    ) );
		    
    		register_rest_route( $this->rest_path, '/delete-yacht-pdf', array(
		        'callback' => [$this, 'delete_yacht_pdf'],
		        'methods'  => [WP_REST_Server::READABLE, WP_REST_Server::CREATABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            
		        )
		    ) );

    		// Leads v2 
			register_rest_route( $this->rest_path, '/lead-v2', array(
		        'callback' => [$this, 'lead_submittion_v2'],
		        'methods'  => [WP_REST_Server::READABLE, WP_REST_Server::CREATABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            
		        )
		    ) );


		}

		public function sync_yachts(WP_REST_Request $request) {

			$this->RunImports->run();

			return ['success' => 'finished sync =)'];

		}

		public function yachts(WP_REST_Request $request) {

			$yArgs = [
				'post_type' => 'ysp_yacht',
				'posts_per_page' => 12,
			];

			$r_params=$request->get_params();

			foreach ($r_params as $rIndex => $p) {
				if (is_array($p)) {
					if (! isset($p[1])) {
						$r_params[ $rIndex ] = $p[0];
					}
				}
			}
			

			$yArgs=array_merge($yArgs, $r_params);

			$yachts_query=new WP_Query($yArgs);

			$return = [
				'total' => $yachts_query->found_posts,
				'results' => []
			];

			while ( $yachts_query->have_posts() ) {
				$yachts_query->the_post();

				$meta = get_post_meta($yachts_query->post->ID);

				foreach ($meta as $indexM => $valM) {
					if (is_array($valM) && ! isset($valM[1])) {
						$meta[$indexM] = $valM[0];
					}
				}

				$meta2=array_map("maybe_unserialize", $meta);

					$meta2['_link']=get_permalink($yachts_query->post->ID);
					$meta2['_postID']=$yachts_query->post->ID;
				
				$return['results'][] = $meta2;

			}

			wp_reset_postdata();

			$return['query'] = $yachts_query->query_vars;

			$return['SEO'] = $this->SearchSEO->all_together( $yArgs );

			//$return['stats'] = $this->Stats->run( $yArgs );
			
			return $return;

	    }

		function compare_yachts(WP_REST_Request $request) {
			$ids = $request->get_param('postID');
		
			$ids_array = explode(',', $ids);
			$boats = array(); 
		
			foreach ($ids_array as $id) {
				$boat = get_post($id);

				if ($boat) {
					$boats[] = $boat; 
				}
			}

			header('Content-Type: text/html; charset=UTF-8');
		
			$file_to_include = YSP_TEMPLATES_DIR.'/compare-yachts.php';
		
			include apply_filters('ysp_ys_yacht_compare_yachts', $file_to_include);

		}
		

	   	public function yacht_dropdown_options(WP_REST_Request $request) {

	   		$labels = $request->get_param('labels');
   		
	   		$labelsToMetaField = [
	   			"Builders" => "MakeString",
	   			"HullMaterials" => "BoatHullMaterialCode"
	   		];

	   		$return = get_transient('ysp_yacht_dropdown_options_'.join('_', $labels));

			if (! $return) {
				$return = [];

				foreach ($labels as $label) {
					$return[ $label ] = $this->db_helper->get_unique_yacht_meta_values( $labelsToMetaField[ $label ] );
				}
	
				set_transient('ysp_yacht_dropdown_options_'.join('_', $labels), $return, 4 * HOUR_IN_SECONDS);
			}

	   		return $return; 

	   }

	   public function yacht_list_options(WP_REST_Request $request) {

	   		$labels = $request->get_param('labels');

	   		$labelsKey=[
	   			'Keywords' => function() {
	   				$makes=$this->db_helper->get_unique_yacht_meta_values('MakeString');

	   				//$years=$this->get_unique_yacht_meta_values('ModelYear', 'ysp_yacht');
	   				
	   				$models=$this->db_helper->get_unique_yacht_meta_values('Model');
	   				$boat_names=$this->db_helper->get_unique_yacht_meta_values('BoatName');
	   				$locations=$this->db_helper->get_unique_yacht_meta_values('BoatName');


	   				
	   				//$lengths=$this->get_unique_yacht_meta_values('LengthOverall', 'ysp_yacht');

	   				$list = array_merge($makes, $models, $boat_names);

	   				$list = array_filter($list, function($item) {
	   					return (! is_numeric($item));
	   				});

	   				$list=array_values($list);

	   				return $list;

	   			},

	   			'Cities' => function() {

	   				$list = $this->get_unique_yacht_meta_values('YSP_City');

	   				return $list;

	   			},

	   			'DisplayedLocation' => function() {

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

	   			},

	   		];

	   		$return = get_transient('ysp_yacht_list_options_'.join('_', $labels));

			if (! $return){
				foreach ($labels as $label) {
					if (is_callable($labelsKey[ $label ])) {
						$return[ $label ] = $labelsKey[ $label ]();
					}
				}
				
				set_transient('ysp_yacht_list_options'.join('_', $labels), $return, 4 * HOUR_IN_SECONDS);
			}

	   		return $return;
	   }

	   public function yacht_list_options_with_value(WP_REST_Request $request) {
	   		global $wpdb;

	   		$labels = $request->get_param('labels');
	   		$input_val = $request->get_param('value');

	   		$labelsKey=[
	   			'Keywords' => function() use ($input_val, $wpdb) {

	   				$makes=$this->db_helper->get_unique_yacht_meta_values_based_input('MakeString', $input_val);

	   				//$years=$this->get_unique_yacht_meta_values('ModelYear', 'ysp_yacht');
	   				
	   				$models=$this->db_helper->get_unique_yacht_meta_values_based_input('Model', $input_val);
	   				
	   				$boat_names=$this->db_helper->get_unique_yacht_meta_values_based_input('BoatName', $input_val);
	   				
	   				$locations=$wpdb->get_col( $wpdb->prepare( "
						SELECT DISTINCT IF(pmmm.meta_value='US' OR pmmm.meta_value='US', CONCAT(pm.meta_value, ', ', pmmmm.meta_value), CONCAT(pm.meta_value, ', ', pmmm.meta_value)) 
						FROM {$wpdb->postmeta} pm
						LEFT JOIN {$wpdb->posts} p ON p.ID = pm.post_id
						INNER JOIN {$wpdb->postmeta} pmm ON pmm.post_id = pm.post_id
						INNER JOIN {$wpdb->postmeta} pmmm ON pmmm.post_id = pm.post_id
						INNER JOIN {$wpdb->postmeta} pmmmm ON pmmmm.post_id = pm.post_id
						WHERE pm.meta_key = 'YSP_City' 
						AND pmmm.meta_key = 'YSP_CountryID'  
						AND pmmmm.meta_key = 'YSP_State'  
						AND pm.meta_value LIKE '%s' 
						AND p.post_status = '%s'
						AND p.post_type = '%s' 
						AND pmm.meta_key = 'SalesStatus' 
						AND pmm.meta_value != 'Sold'
						AND LENGTH(pm.meta_value) > 1
						ORDER BY pm.meta_value ASC
						", $input_val.'%', 'publish', 'ysp_yacht' ) );

	   				$states=$wpdb->get_col( $wpdb->prepare( "
						SELECT DISTINCT pm.meta_value 
						FROM {$wpdb->postmeta} pm
						RIGHT JOIN {$wpdb->posts} p ON p.ID = pm.post_id
						RIGHT JOIN {$wpdb->postmeta} pmm ON pmm.post_id = pm.post_id
						RIGHT JOIN {$wpdb->postmeta} pmmm ON pmmm.post_id = pm.post_id
						WHERE pm.meta_key = 'YSP_Full_State' 
						AND pmmm.meta_key = 'YSP_CountryID'  
						AND pmmm.meta_value = 'US'   
						AND pm.meta_value LIKE '%s' 
						AND p.post_status = '%s'
						AND p.post_type = '%s' 
						AND pmm.meta_key = 'SalesStatus' 
						AND pmm.meta_value != 'Sold'
						AND LENGTH(pm.meta_value) > 1
						ORDER BY pm.meta_value ASC
						", $input_val.'%', 'publish', 'ysp_yacht' ) );

	   				$countries=$wpdb->get_col( $wpdb->prepare( "
						SELECT DISTINCT pm.meta_value 
						FROM {$wpdb->postmeta} pm
						RIGHT JOIN {$wpdb->posts} p ON p.ID = pm.post_id
						RIGHT JOIN {$wpdb->postmeta} pmm ON pmm.post_id = pm.post_id
						WHERE pm.meta_key = 'YSP_Full_Country'
						AND pm.meta_value LIKE '%s' 
						AND p.post_status = '%s'
						AND p.post_type = '%s' 
						AND pmm.meta_key = 'SalesStatus' 
						AND pmm.meta_value != 'Sold'
						AND LENGTH(pm.meta_value) > 1
						ORDER BY pm.meta_value ASC
						", $input_val.'%', 'publish', 'ysp_yacht' ) );;
	   				
	   				//$lengths=$this->get_unique_yacht_meta_values('LengthOverall', 'ysp_yacht');

	   				$list = array_merge($makes, $models, $boat_names, $locations, $states, $countries);

	   				$list = array_filter($list, function($item) {
	   					return (! is_numeric($item));
	   				});

	   				$list=array_values($list);

	   				return $list;

	   			},

	   			'Cities' => function() use ($input_val) {

	   				$list = $this->get_unique_yacht_meta_values_based_input('YSP_City', $input_val);

	   				return $list;

	   			},

	   			'DisplayedLocation' => function() use ($input_val) {

	   				global $wpdb;
				
					$res = $wpdb->get_col( $wpdb->prepare( "
						SELECT DISTINCT IF(pmmm.meta_value='US' OR pmmm.meta_value='US', CONCAT(pm.meta_value, ', ', pmmmm.meta_value), CONCAT(pm.meta_value, ', ', pmmm.meta_value)) FROM {$wpdb->postmeta} pm
						LEFT JOIN {$wpdb->posts} p ON p.ID = pm.post_id
						INNER JOIN {$wpdb->postmeta} pmm ON pmm.post_id = pm.post_id
						INNER JOIN {$wpdb->postmeta} pmmm ON pmmm.post_id = pm.post_id
						INNER JOIN {$wpdb->postmeta} pmmmm ON pmmmm.post_id = pm.post_id
						WHERE pm.meta_key = 'YSP_City' 
						AND pm.meta_value LIKE '%s' 
						AND pmmm.meta_key = 'YSP_CountryID'  
						AND pmmmm.meta_key = 'YSP_State'  
						AND p.post_status = '%s'
						AND p.post_type = '%s' 
						AND pmm.meta_key = 'SalesStatus' 
						AND pmm.meta_value != 'Sold'
						AND LENGTH(pm.meta_value) > 1
						ORDER BY pm.meta_value ASC
						", $input_val.'%s', 'publish', 'ysp_yacht' ) );

					return $res;

	   			},

	   		];

	   		$return = [];

			foreach ($labels as $label) {
				if (is_callable($labelsKey[ $label ])) {
					$return[ $label ] = $labelsKey[ $label ]();
				}
			}			

	   		return $return;
	   }

	   public function yacht_pdf_loader(WP_REST_Request $request) {

	   		if ($request->get_param('yacht_post_id') != '') {
	   			// check if post id is real.

	   			$post_exists = get_post($request->get_param('yacht_post_id'));

	   			if (is_null($post_exists)) {
	   				return ['error' => 'post does not exists.'];
	   			}

	   			header('Content-Type: text/html; charset=UTF-8');

	   			$file_to_include=YSP_TEMPLATES_DIR.'/pdf-loader.php';

		    	include apply_filters('ysp_ys_yacht_pdf_loader_template', $file_to_include);

	   		}
	   		else {
				return ['success' => 'No YACHT ID'];
			}

	   }

	   public function yacht_pdf(WP_REST_Request $request) {

			if ($request->get_param('yacht_post_id') != '') {
	
				$yacht_post_id = $request->get_param('yacht_post_id');
				$template_name = $request->get_param('template');

				$post_exists = get_post($request->get_param('yacht_post_id'));

	   			if (is_null($post_exists)) {

	   				return ['error' => 'post does not exists.'];
	   			}

				// ----------------------

				header('Content-Type: text/html; charset=UTF-8');

				$file_to_include=YSP_TEMPLATES_DIR.'/pdf.php';

		    	$file_to_include=apply_filters('ysp_ys_yacht_pdf_template', $file_to_include);

		    	$file_to_include=apply_filters('ysp_ys_yacht_pdf_template_name', $file_to_include, $template_name);

		    	include $file_to_include;

			}
			else {
				return ['success' => 'No YACHT ID'];
			}

	   }

	   public function set_yacht_pdf(WP_REST_Request $request) {

			if ($request->get_param('yacht_post_id') != '') {
	
				$yacht_post_id = $request->get_param('yacht_post_id');

				$body_params = (array) $request->get_params();

				update_post_meta($yacht_post_id, 'YSP_PDF_URL', $body_params['result']['renderUrl']);

				return ['success' => 'joshie was here'];
		    	
			}
			else {
				return ['success' => 'No YACHT ID'];
			}

	   }

	   public function delete_yacht_pdf(WP_REST_Request $request) {
	   		if ($request->get_param('yacht_post_id') != '') {
	
				$y_post_id = $request->get_param('yacht_post_id');

				$pdf_url=get_post_meta($y_post_id, 'YSP_PDF_URL', true);

				$this->BrochureCleanUp->removeUseUrl($pdf_url);
				
				update_post_meta($y_post_id, 'YSP_PDF_URL', "");

				wp_redirect( $_SERVER['HTTP_REFERER'] );

				exit();

				return ['success' => 'joshie was here'];
			}
			else {
				return ['success' => 'No YACHT ID'];
			}
		}

		public function redo_yacht_pdf(WP_REST_Request $request) {

			if ($request->get_param('yacht_post_id') != '') {
	
				$y_post_id = $request->get_param('yacht_post_id');

				$pdf_url=get_post_meta($y_post_id, 'YSP_PDF_URL', true);
				
				if (! empty($pdf_url) && ! is_null($pdf_url)) {
					$this->BrochureCleanUp->removeUseUrl($pdf_url);
				}

				update_post_meta($y_post_id, 'YSP_PDF_URL', "");

				$error = get_post_meta($y_post_id, 'YSP_PDF_ERROR', true);

				$pdf_render_url =  get_rest_url() ."ysp/yacht-pdf?yacht_post_id=". $y_post_id;

				if (! empty($error)) {
					$pdf_render_url .= '&GalleryLimit=6';
				}

				$generatorPDF = wp_remote_post(
					"https://api.urlbox.io/v1/render/sync", 
					[
						'timeout' => 180, 

						'headers' => [
							'Authorization' => 'Bearer '.$this->options->get('pdf_urlbox_api_secret_key'),
							'Content-Type' => 'application/json'
						],
						
						'body' => json_encode([
							'url' => $pdf_render_url,
							//'webhook_url' => get_rest_url() ."ysp/set-yacht-pdf?yacht_post_id=". $y_post_id,
							'use_s3' => true,
							'format' => 'pdf'
						])
					]
				);

				$body = json_decode(wp_remote_retrieve_body($generatorPDF), true);

				if (isset($body['renderUrl'])) {
					update_post_meta($y_post_id, 'YSP_PDF_URL', $body['renderUrl']);
					//update_post_meta($y_post_id, 'YSP_PDF_ERROR', "");
				}
				elseif (isset($body['error']['message'])) {
					update_post_meta($y_post_id, 'YSP_PDF_ERROR', $body['error']['message']);
				}

				wp_redirect( $_SERVER['HTTP_REFERER'] );

				exit();

				return ['success' => 'joshie was here'];
		    	
			}
			else {
				return ['success' => 'No YACHT ID'];
			}

	   }

	   	public function checker_yacht_pdf(WP_REST_Request $request) {

			if ($request->get_param('yacht_post_id') != '') {
				$yacht_post_id=$request->get_param('yacht_post_id');
	
				$s3_url=get_post_meta($yacht_post_id, 'YSP_PDF_URL', true);

				if (!is_null($s3_url) && !empty($s3_url)) {
					return $s3_url;
				}
				else {
				//	wp_remote_get("https://api.urlbox.io/v1/0FbOuhgmL1s2bINM/pdf?url=". get_rest_url() ."ysp/yacht-pdf?yacht_post_id=". $request->get_param('yacht_post_id'), ['timeout' => 300]);
				}

				return ['success' => 'joshie was here'];
		    	
			}
			else {
				return ['success' => 'No YACHT ID'];
			}

	   }


	   public function yacht_pdf_download(WP_REST_Request $request) {

			if ($request->get_param('yacht_post_id') != '') {
	
				$yacht_post_id = $request->get_param('yacht_post_id');

				$yacht_p = get_post($yacht_post_id);

				$s3_url=get_post_meta($yacht_post_id, 'YSP_PDF_URL', true);

				$urlbox_public_key = $this->options->get('pdf_urlbox_api_token_public_key');

				$pdf_bandwidth = $this->options->get('pdf_bandwidth');

				// ----------------------

				
				if (! isset($_GET['GalleryLimit']) && !is_null($s3_url) && !empty($s3_url)) {

					$apiCall = wp_remote_get($s3_url, [
						'timeout' => 180, 
						'stream' => false, 
						'headers' => [
							'Content-Type'  => 'application/pdf',

						]
					]);

					if ($pdf_bandwidth == 'redirect') {
						wp_redirect($s3_url);
						exit();
					}
				}
				elseif (isset($_GET['GalleryLimit'])) {
					/*wp_redirect("https://api.urlbox.io/v1/$urlbox_public_key/pdf?url=". get_rest_url() ."ysp/yacht-pdf?yacht_post_id=". $request->get_param('yacht_post_id'));

					exit();*/

					$render_url_parameters=[
						'yacht_post_id' =>  $request->get_param('yacht_post_id'),
						'template' =>  $request->get_param('template'),
						'GalleryLimit' =>  $request->get_param('GalleryLimit'),

					];

					$render_url = urlencode(get_rest_url() ."ysp/yacht-pdf?".http_build_query($render_url_parameters));

					$pdfbox = "https://api.urlbox.io/v1/$urlbox_public_key/pdf?url=".$render_url;

					wp_redirect($pdfbox);
					exit();

					/*$apiCall = wp_remote_get(
						$pdfbox, 

						[
							'timeout' => 180, 
							'headers' => [
								'Content-Type'  => 'application/pdf',
							]
						]
					);*/
				}
				else {
					if ($pdf_bandwidth == 'redirect') {
						$yacht_post_id = $request->get_param('yacht_post_id');

						$meta = get_post_meta($yacht_post_id);


						foreach ($meta as $indexM => $valM) {
						    if (is_array($valM) && ! isset($valM[1])) {
						        $meta[$indexM] = $valM[0];
						    }
						}

						$vessel = array_map("maybe_unserialize", $meta);

						$vessel = (object) $vessel;
    
						$broker = $vessel->SalesRep->Name;
						
						$BrokerNames = explode(' ', $broker);

						$brokerQueryArgs = array(
						    'post_type' => 'ysp_team',
						    'posts_per_page' => 1,

						    'meta_query' => [
						        'name' => [
						            'relation' => 'OR'
						        ],
						    ],
						);

						foreach ($BrokerNames as $bName) {
						    $brokerQueryArgs['meta_query']['name'][]=[
						        'key' => 'broker_fname',
						        'compare' => 'LIKE',
						        'value' => $bName,
						    ];
						}

						foreach ($BrokerNames as $bName) {
						    $brokerQueryArgs['meta_query']['name'][]=[
						        'key' => 'broker_lname',
						        'compare' => 'LIKE',
						        'value' => $bName,
						    ];
						}

						$brokerQuery = new WP_Query($brokerQueryArgs);

						if ($brokerQuery->have_posts()) {

						}
						else {
						    $mainBrokerQueryArgs = array(
						        'post_type' => 'ysp_team',
						        'meta_query' => array(
						            array(
						                'key' => 'ysp_main_broker',
						                'value' => '1',
						            ),
						        ),
						        'posts_per_page' => 1,
						    );

						    $brokerQuery = new WP_Query($mainBrokerQueryArgs);
						}

						$render_url_parameters=[
							'url' => get_rest_url() ."ysp/yacht-pdf?yacht_post_id=". $request->get_param('yacht_post_id'),
							'pdf_show_header' => true,
							'pdf_show_footer' => true,
							//'pdf_header' => '<div class="text title center"></div>',
							'pdf_header' => '<div class="text center"></div>',
							//'pdf_footer' => '<div class="footer-broker-info text center"><a href="http://yspdemo.local/team/joshua-hoffman/">Joshua Hoffman</a> - <a href="tel:(863) 332-9038">(863) 332-9038</a> - <a href="mailto:mail@joshuahoffman.me">mail@joshuahoffman.me</a></div>',
						];

						if ($brokerQuery->have_posts()) {
					        while ($brokerQuery->have_posts()) {
					            $brokerQuery->the_post(); 
					            $broker_first_name = get_post_meta($brokerQuery->post->ID, 'ysp_team_fname', true);
					            $broker_last_name = get_post_meta($brokerQuery->post->ID, 'ysp_team_lname', true);
					            $broker_email = get_post_meta($brokerQuery->post->ID, 'ysp_team_email', true);
					            $broker_phone = get_post_meta($brokerQuery->post->ID, 'ysp_team_phone', true);
					        
					        	$render_url_parameters['pdf_footer'] = '<div class="footer-broker-info text center">
					        	<a href="'. get_permalink($brokerQuery->post->ID) .'">'. ($broker_first_name . " " . $broker_last_name) .'</a>
			                    - <a href="tel:'. $broker_phone .'">'. $broker_phone .'</a> - 
			                    <a href="mailto:'. $broker_email .'">'. $broker_email .'</a>
					        	</div>';
					        }
					    
					        wp_reset_postdata();
					    }					        

						wp_redirect("https://api.urlbox.io/v1/$urlbox_public_key/pdf?".http_build_query($render_url_parameters));

						exit();
					}

					$render_url_parameters=[
						'yacht_post_id' =>  $request->get_param('yacht_post_id'),
						'template' =>  $request->get_param('template')
					];

					$render_url = urlencode(get_rest_url() ."ysp/yacht-pdf?".http_build_query($render_url_parameters));

					$apiCall = wp_remote_get(
						"https://api.urlbox.io/v1/$urlbox_public_key/pdf?url=". $render_url, 

						[
							'timeout' => 180, 
							'headers' => [
								'Content-Type'  => 'application/pdf',
							]
						]
					);

				}

				//$apiCall = wp_remote_get(get_rest_url() . 'ysp/yacht-pdf-download?yacht_post_id=' . $request->get_param('yacht_post_id'));

				$api_status_code = wp_remote_retrieve_response_code($apiCall);

				if ($api_status_code == '200') {
					header('Content-Type: application/pdf; charset=UTF-8; ');
					header('Content-Disposition: inline; filename='.$yacht_p->post_title.'.pdf');
					//var_dump($apiCall);
					echo wp_remote_retrieve_body($apiCall);

				}
				else {
					return ['success' => 'pdf status was not 200 it was '. $api_status_code, 'body' => wp_remote_retrieve_body($apiCall), 'api-key' => $urlbox_public_key ];
				}		    	
			}
			else {
				return ['success' => 'No YACHT ID'];
			}

	   } 

	   public function wp_mail_set_content_type() {
			return 'text/html';
	   }

	  	public function spamChecker($form_data) {

	   		$comment = array(
			    'comment_type' => 'contact-form',
			    
			    'comment_author' => $form_data['fname'].' '.$form_data['lname'],
			    'comment_author_email' => $form_data['email'],

			    'comment_content' => $form_data['message'],

			    'permalink' => $form_data['ReferrerUrl'],

			    'honeypot_field_name' => 'fax',
			    
			    'hidden_honeypot_field' => $form_data['fax'],

			    'fax' => $form_data['fax'],

			);

			// good comment until proven bad
			$akismet = new YachtSyncPro_Akismet( $this->options->get('akismet_api_token') );
			
			if(!$akismet->error) {

			    //Check to see if the key is valid
			    if($akismet->valid_key()) {

				    $results = ['spam_aki' => true, 'error' => 'Please refresh and try again. Spam Key Issue.'];
			    
			    }
			    				    
			    if ($akismet->is_spam($comment)) {

				    $results = ['spam_aki' => true, 'error' => 'Please refresh and try again.'];
			    
			    }
			    else {
				
					$results = ['not_spam_aki' => true];
			    
			    }
			}
			return $results;
	  	}

	   	public function yacht_leads(WP_REST_Request $request) {

			$to = $this->options->get('send_lead_to_this_email');
			
			//$to = 'hauk@jamesrossadvertising.com';
			$fname = $request->get_param('fname');
			$lname = $request->get_param('lname');
			$message = $request->get_param('message');
			$email = $request->get_param('email');
			$phone = $request->get_param('phone');
			$fax = $request->get_param('fax');
			$vesselHidden = $request->get_param('yatchHidden');
			$ReferrerUrl = $_SERVER['HTTP_REFERER'];

			$subject = $fname . " " . $lname . " " . 'submitted an inquiry' ;

			$spamChecker = $this->spamChecker([
				'fname' => $fname,
				'lname' => $lname,
				'message' => $message,
				'email' => $email,
				'phone' => $phone,
				'yachtHidden' => $vesselHidden,	
				'fax' => $fax,
				'ReferrerUrl' => $ReferrerUrl
			]);

			if  ( isset( $spamChecker['not_spam_aki']) && $spamChecker['not_spam_aki'] == true ) {
				$fullMessage = '<!DOCTYPE html><html><body>';
				$fullMessage .= '<h1>' . $subject . '</h1>';
				$fullMessage .= '<p><strong>Vessel:</strong> ' . $vesselHidden . '</p>';
				$fullMessage .= '<p><strong>Page:</strong> ' . $ReferrerUrl . '</p>';
				$fullMessage .= '<p><strong>Name:</strong> ' . "$fname $lname" . '</p>';
				$fullMessage .= '<p><strong>Email:</strong> ' . $email . '</p>';
				$fullMessage .= '<p><strong>Phone:</strong> ' . $phone . '</p>';
				$fullMessage .= '<p><strong>Message:</strong></p>';
				$fullMessage .= '<p>' . nl2br($message) . '</p>'; 
			
				$fullMessage .= '</body></html>';
			
				$headers = array(
					'Content-Type: text/html; charset=UTF-8',
				);
			
				$sent = wp_mail($to, $subject, $fullMessage, $headers);
			
				if ($sent) {
					return array('message' => 'Email sent successfully');
				} else {
					return array('error' => 'Email failed to send');
				}
			}
			else {
				return array('error' => 'Email failed to send');
			}
		}

		public function broker_leads(WP_REST_Request $request) {
		
			$brokerID=$request->get_param('brokerID');
			//$broker=get_post($request->get_param('brokerID'));
			$broker_email = get_post_meta($brokerID, "ysp_team_email", true);

			$to = $broker_email;

			$fname = $request->get_param('fname');
			$lname = $request->get_param('lname');
			$message = $request->get_param('message');
			$email = $request->get_param('email');
			$phone = $request->get_param('phone');
			$fax = $request->get_param('fax');
			$ReferrerUrl = $_SERVER['HTTP_REFERER'];

			$subject = $fname . " " . $lname . " " . 'submitted an inquiry' ;

			$spamChecker = $this->spamChecker([
				'fname' => $fname,
				'lname' => $lname,
				'message' => $message,
				'email' => $email,
				'phone' => $phone,
				'brokerID' => $broker_email,
				'fax' => $fax,
				'ReferrerUrl' => $_SERVER['HTTP_REFERER']
			]);

			if  ( isset( $spamChecker['not_spam_aki']) && $spamChecker['not_spam_aki'] == true ) {
			
				$fullMessage = '<!DOCTYPE html><html><body>';
				$fullMessage .= '<h1>' . $subject . '</h1>';
				$fullMessage .= '<p><strong>Name:</strong> ' . "$fname $lname" . '</p>';
				$fullMessage .= '<p><strong>Page:</strong> ' . $ReferrerUrl . '</p>';
				$fullMessage .= '<p><strong>Email:</strong> ' . $email . '</p>';
				$fullMessage .= '<p><strong>Phone:</strong> ' . $phone . '</p>';
				$fullMessage .= '<p><strong>Message:</strong></p>';
				$fullMessage .= '<p>' . nl2br($message) . '</p>'; 
			
				$fullMessage .= '</body></html>';
			
				$headers = array(
					'Content-Type: text/html; charset=UTF-8',
				);
			
				$sent = wp_mail($to, $subject, $fullMessage, $headers);

				if ($sent) {
					return array('message' => 'Email sent successfully');
				} else {
					return array('error' => 'Email failed to send');
					}
			}
			else {
				return array('error' => 'Email failed to send');
			}
		}

		public function lead_submittion_v2(WP_REST_Request $request) {
	

			// FIELDS			
			$fname = $request->get_param('fname');
			$lname = $request->get_param('lname');

			$message = $request->get_param('message');
			$email = $request->get_param('email');
			$phone = $request->get_param('phone');

			$fax = $request->get_param('fax');
			$ReferrerUrl = $_SERVER['HTTP_REFERER'];

			// TO AND SUBJECT
			$BrokerIs=$request->get_param('WhichBroker');

			if (isset($BrokerIs) && !empty($BrokerIs)) {
				$HasBroker = true;

				$BrokerPost = get_post($BrokerIs);

				$to = get_post_meta($BrokerIs, "ysp_team_email", true);
				$subject = '';
			}

			$YachtIs=$request->get_param('WhichBoat');

			if (isset($YachtIs) && !empty($YachtIs)) {
				$HasYacht = true;

				$to = $this->options->get('send_lead_to_this_email');
				$subject = $fname.' is interested in '.$YachtIs;
			}

			$YachtID=$request->get_param('WhichBoatID');

			if (isset($YachtID) && !empty($YachtID)) {
				$HasYacht = true;

				$YachtPost = get_post($YachtID);

				$to = '';
				//$to = $this->options->get('send_lead_to_this_email');
				$subject = $fname.' is interested in '.$YachtPost->post_title;
			}

			$spamChecker = $this->spamChecker([
				'fname' => $fname,
				'lname' => $lname,
				'message' => $message,
				'email' => $email,
				'phone' => $phone,
				'brokerID' => $broker_email,
				'fax' => $fax,
				'ReferrerUrl' => $_SERVER['HTTP_REFERER']
			]);

			if  ( isset( $spamChecker['not_spam_aki']) && $spamChecker['not_spam_aki'] == true ) {
			
				$fullMessage = '<!DOCTYPE html><html><body>';
				$fullMessage .= '<h1>' . $subject . '</h1>';
				$fullMessage .= '<p><strong>Name:</strong> ' . "$fname $lname" . '</p>';
				$fullMessage .= '<p><strong>Page:</strong> ' . $ReferrerUrl . '</p>';
				$fullMessage .= '<p><strong>Email:</strong> ' . $email . '</p>';
				$fullMessage .= '<p><strong>Phone:</strong> ' . $phone . '</p>';
				$fullMessage .= '<p><strong>Message:</strong></p>';
				$fullMessage .= '<p>' . nl2br($message) . '</p>'; 
			
				$fullMessage .= '</body></html>';
			
				$headers = array(
					'Content-Type: text/html; charset=UTF-8',
				);
			
				$sent = wp_mail($to, $subject, $fullMessage, $headers);

				if ($sent) {
					return array('message' => 'Email sent successfully');
				} else {
					return array('error' => 'Email failed to send');
				}
			}
			else {
				return array('error' => 'Email failed to send');
			}

		}
		
	}