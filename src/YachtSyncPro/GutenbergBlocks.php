<?php  
    #[AllowDynamicProperties]
    class YachtSyncPro_GutenbergBlocks {

        public function __construct() {
            
            $this->Shortcode_Yachts=new YachtSyncPro_Shortcodes_YachtSearch();
		}

		public function add_actions_and_filters() {
            add_action('init', [$this, 'serverside_blocks']);

            add_action('init', [$this, 'js_scripts']);
 
	        add_action( 'enqueue_block_editor_assets', [$this, 'pass_styles'] );
        }

        public function js_scripts() {
            wp_register_script(
                'ysp-gutenberg-blocks',
                YSP_ASSETS .'/build/js/all-blocks.js',
                   array( 'wp-block-editor', 'wp-blocks', 'wp-components', 'wp-element', 'wp-server-side-render'),
                null
            );
    
            $js_vars = [
                //'wp_rest_url' => get_rest_url(),
                'theme_url' => get_template_directory_uri(),
            ];
    
            wp_localize_script('ysp-gutenberg-blocks', 'ysp_blocks', $js_vars); 

        }

       
        public function pass_styles() {

            if (! is_customize_preview()) {
                wp_enqueue_style( 
                    'ysp-style', 
                    YSP_ASSETS .'/build/css/app-style.css', 
                    array( 'wp-edit-blocks' ), 
                    null
                );
            }
    
        }

        public function serverside_blocks() {
            register_block_type( 'ysp-blocks/hform-block', [
                'api_version'    => 1,
                'title'          => 'Horizontal Form',
                'editor_script'  => 'ysp-gutenberg-blocks',
                'attributes'     => [
                    
                ],
                'render_callback' => [$this, 'hform_block']
            ]);
            register_block_type( 'ysp-blocks/vform-block', [
                'api_version'    => 1,
                'title'          => 'Vertical Form',
                'editor_script'  => 'ysp-gutenberg-blocks',
                'attributes'     => [
                    
                ],
                'render_callback' => [$this, 'vform_block']
            ]);
            register_block_type( 'ysp-blocks/ysp-yacht-results-block', [
                'api_version'    => 1,
                'title'          => 'Yachts Results',
                'editor_script'  => 'ysp-gutenberg-blocks',
                'attributes'     => [
                    
                ],
                'render_callback' => [$this, 'yacht_results']
            ]);
            register_block_type( 'ysp-blocks/quick-search', [
                'api_version'    => 1,
                'title'          => 'Quick Search',
                'editor_script'  => 'ysp-gutenberg-blocks',
                'attributes'     => [
                    
                ],
                'render_callback' => [$this, 'quick_search']
            ]);
            register_block_type( 'ysp-blocks/quick-h-search', [
                'api_version'    => 1,
                'title'          => 'Quick Horizontal Search',
                'editor_script'  => 'ysp-gutenberg-blocks',
                'attributes'     => [
                    
                ],
                'render_callback' => [$this, 'quick_h_search']
            ]);
        }

        public function hform_block($props) {
            return $this->Shortcode_Yachts->h_searchform($props, '');
        }
        public function vform_block($props) {
            return $this->Shortcode_Yachts->v_searchform($props, '');
        }
        public function yacht_results($props) {
            return $this->Shortcode_Yachts->yacht_results($props, '');
        }
        public function quick_search($props) {
            return $this->Shortcode_Yachts->quick_search($props, '');
        }
        public function quick_h_search($props) {
                return $this->Shortcode_Yachts->quick_h_search($props, '');
        }

    }


	