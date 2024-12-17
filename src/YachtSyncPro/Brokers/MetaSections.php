<?php  
    #[AllowDynamicProperties]
    class YachtSyncPro_Brokers_MetaSections {
		public function __construct() {

		}

		public function add_actions_and_filters() {
           
            add_action( 'add_meta_boxes', [$this, 'broker_meta_boxes'] );

            add_action( 'save_post', [$this, 'broker_info_save'] );
            
        }

        public function broker_meta_boxes() {
            add_meta_box(
                'ysp_team_info_id', // Unique ID
                'Broker Info', // Box title
                [$this, 'broker_info_html'],  // Content callback, must be of type callable
                ['ysp_team']  // Post type
            );

        }

        public function broker_info_html($post) {
            $broker_fname = get_post_meta( $post->ID, 'ysp_team_fname', true );     
            $broker_lname = get_post_meta( $post->ID, 'ysp_team_lname', true );     
            $broker_title = get_post_meta( $post->ID, 'ysp_team_title', true );     
            $broker_email = get_post_meta( $post->ID, 'ysp_team_email', true );     
            $broker_phone = get_post_meta( $post->ID, 'ysp_team_phone', true );  
            $main_broker = get_post_meta($post->ID, 'ysp_main_broker', true) ?: '0';
            $broker_priority = get_post_meta($post->ID, 'ysp_team_priority', true);      
            ?>

                <label>First Name</label>
                <br>
                <input style="margin-bottom: 5px" type="text" name="broker_fname" value="<?= $broker_fname ?>">
                <br>
                <label>Last Name</label>
                <br>
                <input style="margin-bottom: 5px" type="text" name="broker_lname" value="<?= $broker_lname ?>">
                <br>
                <label>Title</label>
                <br>
                <input style="margin-bottom: 5px" type="text" name="broker_title" value="<?= $broker_title ?>">
                <br>
                <label>Email</label>
                <br>
                <input style="margin-bottom: 5px" type="text" name="broker_email" value="<?= $broker_email ?>">
                <br>
                <label>Phone</label>
                <br>
                <input style="margin-bottom: 5px" type="text" name="broker_phone" value="<?= $broker_phone ?>">
                <br>
                <label>Main Broker</label>
                <br>
                <input type="checkbox" name="main_broker" value="1" <?php checked($main_broker, '1'); ?>>
                <br>
                <label>Broker Priority</label>
                <br>
                <input type="number" name="broker_priority" min="0" max="100" value="<?= $broker_priority ?>">

            <?php 

        }

        public function broker_info_save($post_id) {
            if ( isset($_POST['broker_fname'])) {
                update_post_meta(
                    $post_id,
                    'ysp_team_fname',
                    $_POST['broker_fname']
                );
            }
            
            if ( isset($_POST['broker_lname'])) {
                update_post_meta(
                    $post_id,
                    'ysp_team_lname',
                    $_POST['broker_lname']
                );
            }

            if ( isset($_POST['broker_title'])) {
                update_post_meta(
                    $post_id,
                    'ysp_team_title',
                    $_POST['broker_title']
                );
            }
            
            if ( isset($_POST['broker_email'])) {
                update_post_meta(
                    $post_id,
                    'ysp_team_email',
                    $_POST['broker_email']
                );
            }
            
            if ( isset($_POST['broker_phone'])) {
                update_post_meta(
                    $post_id,
                    'ysp_team_phone',
                    $_POST['broker_phone']
                );
            }

            $main_broker = isset($_POST['main_broker']) ? '1' : '0';

            if ( isset($_POST['broker_priority'])) {
                update_post_meta(
                    $post_id,
                    'ysp_team_priority',
                    $_POST['broker_priority']
                );
            }
            
            update_post_meta($post_id, 'ysp_main_broker', $main_broker);
        }

    }