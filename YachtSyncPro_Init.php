<?php

    function YachtSyncPro_Init($file) {

        $YachtSyncProPlugin = new YachtSyncPro_Plugin();
        // $options = new rossWorld_Options();

        $YachtSyncProPlugin->version = YSP_VERSION;

        // Install the plugin
        // NOTE: this file gets run each time you *activate* the plugin.
        // So in WP when you "install" the plugin, all that does is dump its files in the plugin-templates directory
        // but it does not call any of its code.
        // So here, the plugin tracks whether or not it has run its install operation, and we ensure it is run only once
        // on the first activation
        if ( ! $YachtSyncProPlugin->isInstalled() ) {
            $YachtSyncProPlugin->install();
        } else {
            // Perform any version-upgrade activities prior to activation (e.g. database changes)
            $YachtSyncProPlugin->upgrade();
        }

        // Add callbacks to hooks
        $YachtSyncProPlugin->addActionsAndFilters();
        
        if (!$file) $file = __FILE__;

        // Register the Plugin Activation Hook
        register_activation_hook($file, [$YachtSyncProPlugin, 'activate']);

        // // Register the Plugin Deactivation Hook
        register_deactivation_hook($file, array($YachtSyncProPlugin, 'deactivate'));

    }