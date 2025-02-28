<?php
    #[AllowDynamicProperties]

	class YachtSyncPro_YoastFun_Descriptions {

		public function __construct() {
			$this->ChatGPT_YachtDescription = new YachtSyncPro_ChatGPTYachtDescriptionVersionTwo();
		}
	
		public function add_actions_and_filters() {
			//add_filter('wpseo_metadesc',  [$this, 'yacht_description'], 10, 1);
			//add_filter('wpseo_metadesc',  [$this, 'gpt_yacht_description'], 10, 1);

		}

		public function yacht_description($description) {
			global $wp_query, $post;

				if (is_singular('ysp_yacht')) {
					$meta = get_post_meta($post->ID);

			        foreach ($meta as $indexM => $valM) {
			            if (is_array($valM) && !isset($valM[1])) {
			                $meta[$indexM] = $valM[0];
			            }
			        }

			        $vessel = array_map("maybe_unserialize", $meta);
					
					$vessel=json_decode(json_encode($vessel), true);

					return str_replace(array(' ""', ' .'), array(' ', '.'), preg_replace('/\s,?\s+/', ' ',
						sprintf('%s %s %s %s is for sale.',
						$vessel['ModelYear'],
						$vessel['MakeString'],
						$vessel['Model'],
						$vessel['BoatName']
					)));

				}

			return $description;

		}

		public function gpt_yacht_description($description) {
			global $wp_query, $post;

				if (is_singular('ysp_yacht')) {
					
					$link = get_permalink($post);

					return $this->ChatGPT_YachtDescription->make_description('make description', [$link]);

				}

			return $description;

		}
	}