<?php

/*
 Plugin Name: Yacht Sync Pro
 Plugin URI: https://yspdemo.yachtsforsale.dev/
 Version: 2.5.2
 Author: <a href="https://buildtheintnets.com">Build The Internets</a>
 Description: Yacht Sync Pro is a new WordPress plugin that imports all three major yachting and boating MLS API feeds into your website. So whether you have YachtWorld/Boat Wizard or IYBA/YachtBroker, and/or Yatco, you can now benefit from savvy SEO tactics, easy-to-use blocks/shortcodes, custom post types, fast feature-rich search, and can still customize to your brands' needs.
 Text Domain: 
 License: GPLv3
 GNU GPLv3 License Origin: http://www.gnu.org/licenses/gpl-3.0.html
*/

// Define GLOBALS
define( 'YSP_DIR', dirname(__FILE__) );

define( 'YSP_TEMPLATES_DIR', dirname(__FILE__).'/partials' );

define( 'YSP_ASSETS', plugin_dir_url(__FILE__) . '');

define( 'YSP_VERSION', '2.5.2');

// class auto loader

spl_autoload_register( 'YachtSyncPro_autoloader' );

function YachtSyncPro_autoloader( $class_name ) {
    if ( false !== strpos( $class_name, 'YachtSyncPro_' ) ) {
        $classes_dir = realpath( plugin_dir_path( __FILE__ ) ) . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR;
        $class_file = str_replace( '_', DIRECTORY_SEPARATOR, $class_name ) . '.php';
        require_once $classes_dir . $class_file;
    }
}

add_action('plugins_loaded', 'initYachtSyncPro');

function initYachtSyncPro() {
    // Only load and run the init function if we know PHP version can parse it
    include_once('YachtSyncPro_Init.php');
    
    YachtSyncPro_Init(__FILE__);
}


//////////////////////////////////
// Run Updater
/////////////////////////////////
require __DIR__.'/src/plugin-update-checker/plugin-update-checker.php';
use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

$myUpdateChecker = PucFactory::buildUpdateChecker(
    'https://github.com/JamesRossMarine/yacht-sync-pro-wordpress-plugin',
    __FILE__,
    'yacht-sync-wp-plugin'
);

//Optional: If you're using a private repository, create an OAuth consumer
//and set the authentication credentials like this:
//Note: For now you need to check "This is a private consumer" when
//creating the consumer to work around #134:
// https://github.com/YahnisElsts/plugin-update-checker/issues/134

$myUpdateChecker->setAuthentication('git_hub_token_secret_something');

//Optional: Set the branch that contains the stable release.
$myUpdateChecker->setBranch('wp-admin-release');