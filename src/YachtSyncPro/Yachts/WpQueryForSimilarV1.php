<?php
    #[AllowDynamicProperties]
    
    class YachtSyncPro_Yachts_WpQueryForSimilar {

        public function __construct() {
          
                        
        }

        public function add_actions_and_filters() {

            add_filter('query_vars', [$this, 'addQueryVars'], 30, 1);
            add_action('pre_get_posts', [$this, 'preGet'], 20, 1);

        }

		public function addQueryVars($vars) {
            
            $vars[] = 'similar_listings_to';

            return $vars;
        }

        public function preGet($query) {
            
            $similar_post_id = $query->get('similar_listings_to');
            
            if ( $query->get('post_type') == "ysp_yacht" && is_numeric( $similar_post_id )  ) {
                $length = intval(get_post_meta($similar_post_id, 'NominalLength', true));
                $year = intval(get_post_meta($similar_post_id, 'ModelYear', true));

                $make = get_post_meta($similar_post_id, 'MakeString', true);
                $category = wp_get_post_terms($similar_post_id, 'boatclass', array( 'fields' => 'slugs' ) );

                $category_and_count = wp_get_post_terms($similar_post_id, 'boatclass', array( ) );
                $make_and_count = wp_get_post_terms($similar_post_id, 'boatmake', array( ) );

                //$diff_year = 5;

                $diff_length = 15;
                
                $similar_query_one_args = [
                    'post_type' => 'ysp_yacht',
                    'post__not_in' => [ $similar_post_id ],

                    'lengthcompare' => [($length - $diff_length), ($length + $diff_length)],
                    'yearcompare' => [( $year - 5 ), (  $year + 5 )],

                    'sortby' => null,
                    'orderby' => 'lc',

                    'make' => $make,

                    'no_found_rows' => true,
                    
                    'posts_per_page' => 6,

                ];
/*
                if ($make_and_count[0]->count >= 3) {
                    $similar_query_one_args['make'] = $make;
                }
                elseif ($category_and_count[0]->count >= 3) {
                    $similar_query_one_args['boatclass'] = $category;
                } */

                $similar_query_one = new WP_Query($similar_query_one_args);

                if (count($similar_query_one->posts) >= 3) {
                   $query->query_vars = array_merge($query->query_vars, $similar_query_one_args);
                }
                else {
                    $diff_length=30;

                    if (count($category) > 0) {
                        $similar_query_two_args = [
                            'post_type' => 'ysp_yacht',
                            'post__not_in' => [ $similar_post_id ],
                        
                            'lengthcompare' => [($length - $diff_length), ($length + $diff_length)],
                            'yearcompare' => [( $year - 10 ), (  $year + 10 )],

                            'boatclass' => $category,

                            'sortby' => null,
                            'orderby' => 'lc',

                            'no_found_rows' => true,
                            
                            'posts_per_page' => 6,
                        ];

                        $similar_query_two = new WP_Query($similar_query_two_args);

                        if (count($similar_query_two->posts) >= 3) {

                            $query->query_vars = array_merge($query->query_vars, $similar_query_two_args);
                        }
                        else {
                            $query->query_vars = array_merge($query->query_vars, [
                                
                                'post__not_in' => [ $similar_post_id ],
                                'boatclass'  => $category
                                
                            ]);
                        }
                    }
                    else {
                        /*if ($length > 200) {
                            $diff_length = 60;
                        }*/

                        $query->query_vars = array_merge($query->query_vars, [
                            'post__not_in' => [ $similar_post_id ],                            
                            
                            'lengthcompare' => [($length - $diff_length), ($length + $diff_length)],

                            //'yearcompare' => [( $year - 10 ), (  $year + 10 )],

                            'sortby' => null,

                            'orderby' => 'lc',

                        ]);
                    }


                }

            }

			return $query;
            
        }


    }