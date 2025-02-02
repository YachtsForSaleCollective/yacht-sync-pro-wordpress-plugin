<?php
	#[AllowDynamicProperties]
	class YachtSyncPro_SearchSEO {

		public function __construct() {
			$this->ChatGPT_YachtSearch = new YachtSyncPro_ChatGPTYachtSearch();

			$this->options = new YachtSyncPro_Options();
		}

		public function add_actions_and_filters() {
			
		}

		public function all_together($params) {
			global $wp_query;

			$all=[
				'title' => $this->generate_title($params),
				'generate_meta_description' => $this->generate_meta_description($params),
				'heading' => $this->generate_heading($params),
				'p' => $this->generate_paragraph($params)
			];

			/*$links=[];

			$params = (array) $wp_query->get('params_from_paths');

			$yacht_query = get_posts(array_merge(['post_type' => 'ysp_yacht', 'posts_per_page' => 12], $params, ['page_index' => 1]));

			foreach ($yacht_query as $y) {
				$links[] = get_permalink($y);
			}
			
			$all['gpt_p'] = $this->ChatGPT_YachtSearch->make_description($all['p'], $links);*/

			return $all;

		}


		public function make_it_super_clean($string) {

			$string = str_replace('  ', ' ', $string);
			$string = str_replace('  ', ' ', $string);
			$string = str_replace('  ', ' ', $string);
			$string = str_replace('Yachts Yachts', 'Yachts', $string);
			$string = str_replace('yachts Yachts', 'Yachts', $string);
			$string = str_replace('Boats Yachts', 'Boats', $string);

			//$string = ucwords($string); 
			$string = ucfirst($string); 

			return $string;

		}

		public function grab_params($params = []) {
			global $wp_query;

			$order_of_params=[
				'condition', 
				'boatcondition', 
				'boattype',
				'ys_company_only',
				'ys_keyword',
				// sail or motor
				//'year',		
				//'length',
				'make',
				'boatmaker',
				'boatclass'
			];

			$orders_of_withins = [];

			$grabbed_params = '';

			foreach ($order_of_params as $param) {

				switch ($param) {
					case 'ys_company_only':
						if (isset($params['ys_company_only'])) {

							$pVal = $this->options->get('company_name');
						
						}

						break;

					case 'ys_keyword':
						if (isset($params['ys_keyword'])) {

							$pVal = '"'. $params['ys_keyword'] .'"';
						
						}

						break;

					case 'year':
						if (isset($params[ 'yearlo' ]) && isset($params['yearhi'])) {
							$pVal = $params['yearlo'].' - '.$params['yearhi'];
						}
						elseif (isset($params['yearlo'])) {
							$pVal = $params['yearlo'].' - '.date("Y", strtotime('+2year'));
						}
						elseif (isset($params['yearhi'])) {
							$pVal = '1960 - '.$params['yearhi'];
						}

						break;
					
					
					case 'length':
						if (
							(
								isset($params['lengthUnit']) 
								&& 
								($params['lengthUnit'] == 'meter' || $params['lengthUnit'] == 'Meter')
							)
							||
							(
								isset($params['lengthunit']) 
								&& 
								($params['lengthunit'] == 'meter' || $params['lengthunit'] == 'Meter')
							)) {

							if (isset($params[ 'lengthlo' ]) && isset($params['lengthhi'])) {
								$pVal = ''.$params['lengthlo'].'m - '.$params['lengthhi'].'m ';
							}
							elseif (isset($params['lengthlo'])) {
								$pVal = ''. number_format($params['lengthlo']).'m ';

							}
							elseif (isset($params['lengthhi'])) {
								$pVal = ''. number_format($params['lengthhi']) .'m ';
							}
						}
						else {
							if (isset($params[ 'lengthlo' ]) && isset($params['lengthhi'])) {
								$pVal = ''.$params['lengthlo'].'ft - '.$params['lengthhi'].'ft ';
							}
							elseif (isset($params['lengthlo'])) {
								$pVal = ''. number_format($params['lengthlo']).'ft ';

							}
							elseif (isset($params['lengthhi'])) {
								$pVal = ''. number_format($params['lengthhi']) .'ft ';
							}

						}

						break;
					
					default:

						if (isset($wp_query->query_vars['post_type']) && $wp_query->query_vars['post_type'] == 'ysp_yacht') {
							$pVal = $wp_query->query_vars[$param];
						}
						elseif (isset($params[ $param ])) {
							$pVal = $params[ $param ];
						}
						else {
							$pVal=null;
						}
						
						break;
				}
				
				if (isset($pVal) && ! is_null($pVal)) {
					if (is_array($pVal)) {
						$pVal = join(' + ', $pVal);

						$grabbed_params.=$pVal.' ';
	 				}
					elseif (is_string($pVal) && ! empty($pVal)) {
						$pVal_a = explode('+', $pVal);

						if (count($pVal_a) > 1) {
							$pVal = join(' + ', $pVal_a);
							
							$grabbed_params.=$pVal.' ';

						}
						else {
							$grabbed_params.=$pVal.' ';

						}
						
					}

				}

				unset($pVal);

			}


			return $grabbed_params;
		}

		
		public function grab_second_params($params) {
			global $wp_query;

			$order_of_params=[
				'length',
				'year',
				'price',
				'staterooms',
				'stateroomslo'
			];

			$orders_of_withins = [];

			$grabbed_params = '';

			foreach ($order_of_params as $param) {

				switch ($param) {
					case 'staterooms':
						if (isset($params['staterooms'])) {
							$pVal = 'With '. $params['staterooms'] .' Cabins';
						}

						if (isset($params['stateroomlo'])) {
							$pVal = 'With '. $params['stateroomlo'] .'+ Cabins';
						}

						break;
					case 'length':
						if (
							(
								isset($params['lengthUnit']) 
								&& 
								($params['lengthUnit'] == 'meter' || $params['lengthUnit'] == 'Meter')
							)
							||
							(
								isset($params['lengthunit']) 
								&& 
								($params['lengthunit'] == 'meter' || $params['lengthunit'] == 'Meter')
							)
						) {

							if (isset($params[ 'lengthlo' ]) && isset($params['lengthhi'])) {
								$pVal = 'Between '.$params['lengthlo'].'m - '.$params['lengthhi'].'m ';
							}
							elseif (isset($params['lengthlo'])) {
								$pVal = 'Above '. number_format($params['lengthlo']).'m ';

							}
							elseif (isset($params['lengthhi'])) {
								$pVal = 'Under '. number_format($params['lengthhi']) .'m ';
							}
						}
						else {
							if (isset($params[ 'lengthlo' ]) && isset($params['lengthhi'])) {
								$pVal = 'Between '.$params['lengthlo'].'ft - '.$params['lengthhi'].'ft ';
							}
							elseif (isset($params['lengthlo'])) {
								$pVal = 'Above '. number_format($params['lengthlo']).'ft ';

							}
							elseif (isset($params['lengthhi'])) {
								$pVal = 'Under '. number_format($params['lengthhi']) .'ft ';
							}

						}

						break;

					case 'price':

						if (isset($params['currency']) && $params['currency'] == 'Eur') {

							if (isset($params[ 'pricelo' ]) && isset($params['pricehi'])) {
								$pVal = 'With prices between €'.number_format($params['pricelo']).' - €'.number_format($params['pricehi']);
							}
							elseif (isset($params['pricelo'])) {
								$pVal = 'with prices above €'. number_format($params['pricelo']);

							}
							elseif (isset($params['pricehi'])) {
								$pVal = 'with prices under €'. number_format($params['pricehi']) .'';
							}

						}
						else {

							if (isset($params[ 'pricelo' ]) && isset($params['pricehi'])) {
								$pVal = 'With prices between $'.number_format($params['pricelo']).' - $'.number_format($params['pricehi']);
							}
							elseif (isset($params['pricelo'])) {
								$pVal = 'with prices above $'. number_format($params['pricelo']);

							}
							elseif (isset($params['pricehi'])) {
								$pVal = 'with prices under $'. number_format($params['pricehi']) .'';
							}

						}

						break;

					case 'year':
						if (isset($params[ 'yearlo' ]) && isset($params['yearhi'])) {
							$pVal = 'from '.$params['yearlo'].' to '.$params['yearhi'];
						}
						elseif (isset($params['yearlo'])) {
							$pVal = 'from '.$params['yearlo'].' to '.date("Y", strtotime('+2year'));

						}
						elseif (isset($params['yearhi'])) {
							$pVal = 'from 1960 to '.$params['yearhi'];
						}

						break;

					default:
						$pVal=null;
						break;
				}

				if (isset($pVal) && ! is_null($pVal)) {
					if (is_string($pVal) && ! empty($pVal)) {
						$grabbed_params.=$pVal.' ';
					}

				}

				unset($pVal);

			}

			return $grabbed_params;
		}

		public function grab_location($params) {

			$string = '';

			if (isset($params['page_index']) && $params['page_index'] >= 2) {
				$string = ' | Page '. $params['page_index'] .'';
			} 

			
			return $string;
		}

		public function cleanup_params($p) {

			if (is_array($p)) {
				foreach ($p as $index_p => $pv) {
					if (empty($pv)) {
						unset($p[$index_p]);
					}
				}
			}

			return $p;

		}


		public function generate_title($passed_params = []) {

			$passed_params = $this->cleanup_params($passed_params);

			$grabbed_params=$this->grab_params($passed_params);
			$grabbed_second_params=$this->grab_second_params($passed_params);
			$grabbed_location=$this->grab_location($passed_params);

			$title = sprintf(
				'%sYachts %s for Sale %s | %s',

				$grabbed_params,
				$grabbed_second_params,
				$grabbed_location,
				get_bloginfo('name')
			);

			$title = $this->make_it_super_clean($title);

			return $title;

		}

		public function generate_meta_description($passed_params = []) {

			$passed_params = $this->cleanup_params($passed_params);

			$grabbed_params=$this->grab_params($passed_params);
			$grabbed_second_params=$this->grab_second_params($passed_params);
			$grabbed_location=$this->grab_location($passed_params);

			$desc = sprintf(
				'Find %sboats and yachts %s for sale %s',

				$grabbed_params,
				$grabbed_second_params,
				$grabbed_location
			);

			$desc = $this->make_it_super_clean($desc);

			return $desc;
		}

		public function generate_heading($passed_params = []) {

			$passed_params = $this->cleanup_params($passed_params);

			$grabbed_params=$this->grab_params($passed_params);
			$grabbed_second_params=$this->grab_second_params($passed_params);
			$grabbed_location=$this->grab_location($passed_params);

			$heading = sprintf(
				'%sYachts %s for Sale %s',

				$grabbed_params,
				$grabbed_second_params,
				$grabbed_location
			);

			$heading = $this->make_it_super_clean($heading);

			return $heading;

		}

		public function generate_paragraph($passed_params = []) {

			$passed_params = $this->cleanup_params($passed_params);

			$grabbed_params=$this->grab_params($passed_params);
			$grabbed_second_params=$this->grab_second_params($passed_params);
			$grabbed_location=$this->grab_location($passed_params);

			$para = sprintf(
				'Find %sboats and yachts %s for sale %s',

				$grabbed_params,
				$grabbed_second_params,
				$grabbed_location
			);

			$para = $this->make_it_super_clean( $para );

			return $para;

		}	

	}