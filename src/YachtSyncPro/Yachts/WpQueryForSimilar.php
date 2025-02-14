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

                $category = wp_get_post_terms($similar_post_id, 'boatclass', array( 'fields' => 'slugs' ) );
                $maker = wp_get_post_terms($similar_post_id, 'boatmaker', array( 'fields' => 'slugs' ) );
                $type = wp_get_post_terms($similar_post_id, 'boattype', array( 'fields' => 'slugs' ) );
                $condition = wp_get_post_terms($similar_post_id, 'boatcondition', array( 'fields' => 'slugs' ) );

                $similar_queries_const = [
                    'post_type' => 'ysp_yacht',
                    'post__not_in' => [ $similar_post_id ],

                    'sortby' => null,
                    'orderby' => 'lc',

                    'no_found_rows' => true,
                    'posts_per_page' => 6
                ];

                $similar_queries_to_test = [
                    [
                        'boatmaker' => $maker,
                        'boatclass' => $category,
                        'boattype' => $type,
                        'boatcondition' => $condition,
                        'lengthcompare' => [($length - 5), ($length + 5)],
                        'yearcompare' => [( $year - 8 ), (  $year + 8 )],
                    ],

                    [
                        'boatmaker' => $maker,
                        'boattype' => $type,
                        'lengthcompare' => [($length - 5), ($length + 5)],
                        'yearcompare' => [( $year - 8 ), (  $year + 8 )],
                    ],

                    [
                        'boatclass' => $category,
                        'boattype' => $type,
                        'boatcondition' => $condition,
                        'lengthcompare' => [($length - 10), ($length + 10)],
                        'yearcompare' => [( $year - 12 ), ($year + 12 )],
                    ],

                    [
                        'boatclass' => $category,
                        'lengthcompare' => [($length - 15), ($length + 15)],
                        'yearcompare' => [( $year - 18 ), (  $year + 18 )],
                    ],

                    [
                        'boatclass' => $category,
                        'yearcompare' => [( $year - 15 ), (  $year + 15 )],
                        'lengthcompare' => null,
                    ],

                    [
                        'lengthcompare' => [($length - 20), ($length + 20)],
                        'yearcompare' => [( $year - 20 ), (  $year + 20 )]
                    ]
                ];

                foreach ($similar_queries_to_test as $tIndex => $test) {
                    $args = array_merge($similar_queries_const, $test);

                    $similar_query = new WP_Query($args);

                    if (count($similar_query->posts) >= 3) {
                        unset($args['posts_per_page']);
                        
                        $query->query_vars = array_merge($query->query_vars, $args);
                        return $query;
                    }
                    else {
                        continue;
                    }

                }

                $diff_length=20;
                $diff_year=20;

                $query->query_vars = array_merge($query->query_vars, [
                    'post__not_in' => [ $similar_post_id ],                            
                    
                    'lengthcompare' => [($length - $diff_length), ($length + $diff_length)],
                    'yearcompare' => [( $year - $diff_length ), (  $year + $diff_length )],

                    'sortby' => null,
                    'orderby' => 'lc',

                ]);
        
            }

			return $query;
            
        }


    }