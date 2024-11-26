<?php
get_header();
?>
    <?php
        $brokerQueryArgs = array(
            'post_type' => 'ysp_team',
            'posts_per_page' => 1,
        );

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

        $YSP_Options = new YachtSyncPro_Options();

        $YSP_Euro_Opt = $YSP_Options->get('is_euro_site');
    ?>

<main id="primary" class="site-main ysp-single-y-container">
    <?php
        while (have_posts()) :
            the_post();

            $meta = get_post_meta($post->ID);

            foreach ($meta as $indexM => $valM) {
                if (is_array($valM) && !isset($valM[1])) {
                    $meta[$indexM] = $valM[0];
                }
            }

            $vessel = array_map("maybe_unserialize", $meta);

            $vessel = (object) $vessel; 
            $yacht = (object) $vessel; 

            $vesselLocation = ($yacht->BoatLocation->BoatCountryID == "US" || $yacht->BoatLocation->BoatCountryID == "United States") ? $yacht->BoatLocation->BoatCityName.', '.$yacht->BoatLocation->BoatStateCode : $yacht->BoatLocation->BoatCityName.', '. $yacht->BoatLocation->BoatCountryID;

            if (isset($vessel->SalesRep->Name)) {
                $brokerNameFromApi = $vessel->SalesRep->Name;
                $BrokerNames = explode(' ', $brokerNameFromApi);                        
            }
            else {
                $BrokerNames = [];
            }
            
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
                    'key' => 'ysp_team_fname',
                    'compare' => 'LIKE',
                    'value' => $bName,
                ];
            }

            foreach ($BrokerNames as $bName) {
                $brokerQueryArgs['meta_query']['name'][]=[
                    'key' => 'ysp_team_lname',
                    'compare' => 'LIKE',
                    'value' => $bName,
                ];
            }

            $brokerQuery = new WP_Query($brokerQueryArgs);

            if ($brokerQuery->have_posts() && ! empty($vessel->SalesRep->Name)) {

            }
            else {
                $mainBrokerQueryArgs = array(
                    'post_type' => 'ysp_team',
                    'meta_query' => array(
                        array(
                            'key' => 'ysp_main_broker',
                            'type' => 'NUMERIC',
                            'value' => 1
                        ),
                    ),
                    'posts_per_page' => 1,
                );

                $brokerQuery = new WP_Query($mainBrokerQueryArgs);
            }
            ?>

            <div id="ysp-single-y-image-topper">

                <img src="<?php echo ($vessel->Images[0]->Uri); ?>" alt="" id="ysp-single-y-main-iamge" />

                <div class="TwoStack">
                    <img src="<?php echo ($vessel->Images[1]->Uri); ?>" alt="" />
                    <img src="<?php echo ($vessel->Images[2]->Uri); ?>" alt="" />
                </div>
            </div>

            <div id="ysp-single-y-breadcrumbs">
                <?php
                    if ( function_exists('yoast_breadcrumb') ) {
                      yoast_breadcrumb( '<div>','</div>' );
                    }
                ?>

                <nav class="ysp-single-y-links">
                    
                    <?php
                        if ($brokerQuery->have_posts()) {
                            while ($brokerQuery->have_posts()) {
                                $brokerQuery->the_post();

                                //$broker_first_name = get_post_meta($post->ID, 'ysp_team_fname', true);
                                //$broker_last_name = get_post_meta($post->ID, 'ysp_team_lname', true);
                                //$broker_email = get_post_meta($post->ID, 'ysp_team_email', true);
                                $broker_phone = get_post_meta($post->ID, 'ysp_team_phone', true);

                                ?>

                                <a href="tel: <?= $broker_phone ?>">
                                    <img src="<?= YSP_ASSETS ?>/images/single-yacht/Message.png" alt="Message" />
                                </a>

                                <?php
                            }
                        }
                    ?>

                    <a rel="nofollow" href="<?php echo get_rest_url(); ?>ysp/yacht-pdf-loader?yacht_post_id=<?php echo get_the_ID(); ?>" target="_blank">
                        <img src="<?= YSP_ASSETS ?>/images/single-yacht/Brochure.png" alt="Brochure" />
                    </a>
            
                    <a href="#" data-modal="#ysp-single-y-share-modal">
                        <img src="<?= YSP_ASSETS ?>/images/single-yacht/Share.png" alt="Share" />
                    </a>
                
                </nav>
            </div>

            <div id="ysp-single-y-middle-split">

                <div class="ysp-single-y-main">

                    <div class="ysp-single-y-headings">

                        <h1><?= $vessel->YSP_LOAFeet.'ft '.$vessel->MakeString.' '.$vessel->ModelYear.' ' ?></h1>

                        <h2>
                            <?= $vessel->BoatName ?> 
                            | 
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#067AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#067AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                            <?=  $vesselLocation ?> 
                        </h2>
                    </div>

                    <div class="ysp-single-y-status-and-price">

                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <circle cx="6" cy="6" r="6" fill="#4AAE8C"/>
                            </svg>
                            
                            <b>FOR SALE</b> | Active
                        </span>

                        <span class="ysp-single-y-price">
                            <?php
                                if ($YSP_Euro_Opt == "yes") {
                                    echo '€' . number_format($vessel->YSP_EuroVal) . ' ' . 'EUR';
                                } else {
                                    echo '$' . number_format($vessel->YSP_USDVal);
                                }
                            ?>
                        </span>
                    </div>

                    <!-- Maybe A Map -->

                    <table class="ysp-single-y-basic-info-table">
                        <tr>
                            <th>Length</th>
                            <td><?php echo empty($vessel->YSP_LOAFeet) ? "N/A" : $vessel->YSP_LOAFeet . "ft / " . $vessel->YSP_LOAMeter . ' m'; ?></td>

                            <th>Guest</th>
                            <td><?= $vessel->ModelYear ?></td>                            
                        </tr>

                        <tr>
                            <th>Builder</th>
                            <td><?= $vessel->MakeString ?></td>

                            <th>Cabins</th>
                            <td><?php echo (empty($vessel->CabinsCountNumeric) ? 'N/A' : $vessel->CabinsCountNumeric); ?></td>
                        </tr>

                        <tr>                            
                            <th>Year</th>
                            <td><?= $vessel->ModelYear ?></td>

                            <th>Crew</th>
                            <td>N/A</td>
                        </tr>
                    </table>

                    <div class="ysp-single-y-description">
                        <?php 
                            if (isset($vessel->GeneralBoatDescription) && is_array($vessel->GeneralBoatDescription)) { 
                                echo join(" ", $vessel->GeneralBoatDescription); 
                            }
                            elseif (isset($vessel->GeneralBoatDescription) && is_string($vessel->GeneralBoatDescription)) {
                                echo $vessel->GeneralBoatDescription;
                            } 
                        ?>
                    </div>

                    <div class="ysp-single-y-accord">
                        <div class="ysp-accord-heading">
                            <h3>Yacht Details</h3>
                        
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M18 15L12 9L6 15" stroke="#3184F7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>

                        <div class="ysp-accord-content">
                            <ul class="ysp-single-y-details-list">
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M7 17V15H13C12.7667 14.7167 12.579 14.4083 12.437 14.075C12.295 13.7417 12.1827 13.3833 12.1 13H9V11H12.1C12.1833 10.6167 12.296 10.2583 12.438 9.925C12.58 9.59167 12.7673 9.28333 13 9H3V7H17C18.3833 7 19.5627 7.48767 20.538 8.463C21.5133 9.43833 22.0007 10.6173 22 12C22 13.3833 21.5123 14.5627 20.537 15.538C19.5617 16.5133 18.3827 17.0007 17 17H7ZM2 13V11H8V13H2ZM3 17V15H6V17H3Z" fill="#2D3748"/>
                                    </svg>

                                    <span>Length</span>

                                    <?php echo empty($vessel->NominalLength) ? "N/A" : $vessel->NominalLength . " / " . round((float)$vessel->NominalLength * 0.3048, 2) . ' m'; ?>
                                </li>

                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                      <path d="M17.15 20.7L11.1 14.6C10.7667 14.7333 10.4293 14.8333 10.088 14.9C9.74667 14.9667 9.384 15 9 15C7.33333 15 5.91667 14.4167 4.75 13.25C3.58333 12.0833 3 10.6667 3 9C3 8.4 3.08333 7.82933 3.25 7.288C3.41667 6.74667 3.65 6.234 3.95 5.75L7.6 9.4L9.4 7.6L5.75 3.95C6.23333 3.65 6.746 3.41667 7.288 3.25C7.83 3.08333 8.40067 3 9 3C10.6667 3 12.0833 3.58333 13.25 4.75C14.4167 5.91667 15 7.33333 15 9C15 9.38333 14.9667 9.746 14.9 10.088C14.8333 10.43 14.7333 10.7673 14.6 11.1L20.7 17.15C20.9 17.35 21 17.5917 21 17.875C21 18.1583 20.9 18.4 20.7 18.6L18.6 20.7C18.4 20.9 18.1583 21 17.875 21C17.5917 21 17.35 20.9 17.15 20.7Z" fill="#2D3748"/>
                                    </svg>

                                    <span>Builder</span>

                                    <?php echo empty($vessel->MakeString) ? "N/A" : $vessel->MakeString; ?>
                                </li>

                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                      <path d="M6.5 11L12 2L17.5 11H6.5ZM17.5 22C16.25 22 15.1873 21.5623 14.312 20.687C13.4367 19.8117 12.9993 18.7493 13 17.5C13 16.25 13.4377 15.1873 14.313 14.312C15.1883 13.4367 16.2507 12.9993 17.5 13C18.75 13 19.8127 13.4377 20.688 14.313C21.5633 15.1883 22.0007 16.2507 22 17.5C22 18.75 21.5623 19.8127 20.687 20.688C19.8117 21.5633 18.7493 22.0007 17.5 22ZM3 21.5V13.5H11V21.5H3Z" fill="#2D3748"/>
                                    </svg>

                                    <span>Yacht type</span>

                                    Motor
                                </li>

                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                      <path d="M10.45 15.5C10.8667 15.9167 11.3917 16.1127 12.025 16.088C12.6583 16.0633 13.1167 15.834 13.4 15.4L19 7L10.6 12.6C10.1667 12.9 9.92933 13.354 9.888 13.962C9.84667 14.57 10.034 15.0827 10.45 15.5ZM5.1 20C4.73333 20 4.396 19.9207 4.088 19.762C3.78 19.6033 3.534 19.366 3.35 19.05C2.91667 18.2667 2.58333 17.454 2.35 16.612C2.11667 15.77 2 14.8993 2 14C2 12.6167 2.26267 11.3167 2.788 10.1C3.31333 8.88333 4.02567 7.825 4.925 6.925C5.825 6.025 6.88333 5.31267 8.1 4.788C9.31667 4.26333 10.6167 4.00067 12 4C13.3667 4 14.65 4.25833 15.85 4.775C17.05 5.29167 18.1 5.996 19 6.888C19.9 7.77933 20.6167 8.821 21.15 10.013C21.6833 11.205 21.9583 12.484 21.975 13.85C21.9917 14.7667 21.8873 15.6627 21.662 16.538C21.4367 17.4133 21.091 18.2507 20.625 19.05C20.4417 19.3667 20.1957 19.6043 19.887 19.763C19.5783 19.9217 19.241 20.0007 18.875 20H5.1Z" fill="#2D3748"/>
                                    </svg>

                                    <span>Max speed</span>

                                    24 Knots
                                </li>

                                <li>   
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                      <path d="M10 12H3M3 12L6 9M3 12L6 15M14 12H21M21 12L18 9M21 12L18 15M3 6V3H21V6M3 18V21H21V18" stroke="#2D3748" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>

                                    <span>Beam</span>

                                    <?php echo empty($vessel->BeamMeasure) ? "N/A" : $vessel->BeamMeasure . " / " . round((float)$vessel->BeamMeasure * 0.3048, 2) . ' m'; ?>
                                </li>

                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                      <path d="M12 14L12 21M12 21L9 18M12 21L15 18M12 10L12 3M12 3L9 6M12 3L15 6M6 21L3 21L3 3L6 3M18 21L21 21L21 3L18 3" stroke="#2D3748" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>

                                    <span>Draft</span>

                                    23' (2m)
                                </li>

                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                      <path d="M19 19H5V8H19M16 1V3H8V1H6V3H5C3.89 3 3 3.89 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H18V1M17 12H12V17H17V12Z" fill="#2D3748"/>
                                    </svg>

                                    <span>Year Built</span>

                                    <?php echo empty($vessel->ModelYear) ? "N/A" : $vessel->ModelYear; ?>
                                </li>

                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                      <path d="M3 21V19H5V3H15V4H19V19H21V21H17V6H15V21H3ZM11 13C11.2833 13 11.521 12.904 11.713 12.712C11.905 12.52 12.0007 12.2827 12 12C12 11.7167 11.904 11.479 11.712 11.287C11.52 11.095 11.2827 10.9993 11 11C10.7167 11 10.479 11.096 10.287 11.288C10.095 11.48 9.99933 11.7173 10 12C10 12.2833 10.096 12.521 10.288 12.713C10.48 12.905 10.7173 13.0007 11 13Z" fill="#2D3748"/>
                                    </svg>

                                    <span>Cabins</span>

                                    <?php echo (empty($vessel->CabinsCountNumeric) ? 'N/A' : $vessel->CabinsCountNumeric); ?>
                                </li>

                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                      <path d="M11.9972 7C12.2806 7 12.5182 6.904 12.7102 6.712C12.9022 6.52 12.9979 6.28267 12.9972 6C12.9972 5.71667 12.9012 5.479 12.7092 5.287C12.5172 5.095 12.2799 4.99933 11.9972 5C11.7139 5 11.4762 5.096 11.2842 5.288C11.0922 5.48 10.9966 5.71733 10.9972 6C10.9972 6.28333 11.0932 6.521 11.2852 6.713C11.4772 6.905 11.7146 7.00067 11.9972 7ZM14.8222 7H16.5722C17.0722 7 17.5056 7.16667 17.8722 7.5C18.2389 7.83333 18.4639 8.24167 18.5472 8.725L19.9722 18.725C20.0556 19.325 19.9012 19.8543 19.5092 20.313C19.1172 20.7717 18.6132 21.0007 17.9972 21H5.99724C5.38057 21 4.87624 20.7707 4.48424 20.312C4.09224 19.8533 3.93824 19.3243 4.02224 18.725L5.44723 8.725C5.53057 8.24167 5.75557 7.83333 6.12224 7.5C6.4889 7.16667 6.92224 7 7.42224 7H9.17224C9.12224 6.83333 9.08057 6.671 9.04724 6.513C9.0139 6.355 8.99724 6.184 8.99724 6C8.99724 5.16667 9.2889 4.45833 9.87224 3.875C10.4556 3.29167 11.1639 3 11.9972 3C12.8306 3 13.5389 3.29167 14.1222 3.875C14.7056 4.45833 14.9972 5.16667 14.9972 6C14.9972 6.18333 14.9806 6.35433 14.9472 6.513C14.9139 6.67167 14.8722 6.834 14.8222 7Z" fill="#2D3748"/>
                                    </svg>

                                    <span>Gross Tonnage</span>

                                    999.99
                                </li>

                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                      <path d="M11.9972 7C12.2806 7 12.5182 6.904 12.7102 6.712C12.9022 6.52 12.9979 6.28267 12.9972 6C12.9972 5.71667 12.9012 5.479 12.7092 5.287C12.5172 5.095 12.2799 4.99933 11.9972 5C11.7139 5 11.4762 5.096 11.2842 5.288C11.0922 5.48 10.9966 5.71733 10.9972 6C10.9972 6.28333 11.0932 6.521 11.2852 6.713C11.4772 6.905 11.7146 7.00067 11.9972 7ZM14.8222 7H16.5722C17.0722 7 17.5056 7.16667 17.8722 7.5C18.2389 7.83333 18.4639 8.24167 18.5472 8.725L19.9722 18.725C20.0556 19.325 19.9012 19.8543 19.5092 20.313C19.1172 20.7717 18.6132 21.0007 17.9972 21H5.99724C5.38057 21 4.87624 20.7707 4.48424 20.312C4.09224 19.8533 3.93824 19.3243 4.02224 18.725L5.44723 8.725C5.53057 8.24167 5.75557 7.83333 6.12224 7.5C6.4889 7.16667 6.92224 7 7.42224 7H9.17224C9.12224 6.83333 9.08057 6.671 9.04724 6.513C9.0139 6.355 8.99724 6.184 8.99724 6C8.99724 5.16667 9.2889 4.45833 9.87224 3.875C10.4556 3.29167 11.1639 3 11.9972 3C12.8306 3 13.5389 3.29167 14.1222 3.875C14.7056 4.45833 14.9972 5.16667 14.9972 6C14.9972 6.18333 14.9806 6.35433 14.9472 6.513C14.9139 6.67167 14.8722 6.834 14.8222 7Z" fill="#2D3748"/>
                                    </svg>

                                    <span>Displacements</span>

                                    39490234 Lbs
                                </li>

                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                      <path d="M12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.3283 14.4353 9.65339 14.3097 9.95671C14.1841 10.26 13.9999 10.5356 13.7678 10.7678C13.5356 10.9999 13.26 11.1841 12.9567 11.3097C12.6534 11.4353 12.3283 11.5 12 11.5ZM12 2C10.1435 2 8.36301 2.7375 7.05025 4.05025C5.7375 5.36301 5 7.14348 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025C15.637 2.7375 13.8565 2 12 2Z" fill="#2D3748"/>
                                    </svg>

                                    <span>Location</span>

                                    <?= $vesselLocation ?>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- <div class="ysp-single-y-accord">
                        <h3>Features & Amenities</h3>

                    </div> -->
                        



                    <div class="ysp-single-y-video">
                        <?php 
                            if(isset($vessel->Videos)) {
                                $videoUrls = $vessel->Videos->url;
                                
                                foreach($videoUrls as $aindex => $video) { ?>
                                    <!-- <a data-src="<?php echo $video;?>">
                                        <button class="yacht-download-button" type="button">
                                            Open Video <?= ($aindex+1) ?>
                                        </button>
                                    </a> -->

                                    <a href="<?= $vessel->Videos->url[$aindex] ?>" target="_blank">

                                        <img src="<?php echo ($vessel->Images[(10+$aindex)]->Uri); ?>" alt="" />

                                        <svg xmlns="http://www.w3.org/2000/svg" width="81" height="83" viewBox="0 0 81 83" fill="none" id="play-button">
                                          <g filter="url(#filter0_d_5020_60896)">
                                            <ellipse cx="40.4346" cy="37" rx="28.9111" ry="30" fill="white"/>
                                            <path d="M68.9707 37C68.9707 53.3746 56.1817 66.625 40.4346 66.625C24.6874 66.625 11.8984 53.3746 11.8984 37C11.8984 20.6254 24.6874 7.375 40.4346 7.375C56.1817 7.375 68.9707 20.6254 68.9707 37Z" stroke="#D0DBFF" stroke-width="0.75"/>
                                          </g>
                                          <path d="M49.1256 35.7132C50.0978 36.2957 50.0978 37.7043 49.1256 38.2868L37.2818 45.3823C36.282 45.9813 35.0109 45.2611 35.0109 44.0956L35.0109 29.9044C35.0109 28.7389 36.282 28.0187 37.2818 28.6177L49.1256 35.7132Z" fill="#067AED"/>
                                          <defs>
                                            <filter id="filter0_d_5020_60896" x="0.273438" y="0.25" width="80.3203" height="82.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                              <feOffset dy="4.5"/>
                                              <feGaussianBlur stdDeviation="5.625"/>
                                              <feColorMatrix type="matrix" values="0 0 0 0 0.25098 0 0 0 0 0.309804 0 0 0 0 0.407843 0 0 0 0.05 0"/>
                                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5020_60896"/>
                                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5020_60896" result="shape"/>
                                            </filter>
                                          </defs>
                                        </svg>
                                    </a>
                                    
                                
                                <?php   
                                
                                }
                            }

                            //var_dump($vessel->Videos);

                           /* $video_url = $vessel->Videos->url[0];
                            
                            if (isset($video_url) && str_contains($video_url, 'youtu.be')) {
                                $video_thumbnail = $vessel->Videos->thumbnailUrl[0];
                                
                                //var_dump($video_thumbnail);
                            }*/

                        ?>


                    </div>


                    <!-- !!!  VIDEO !!! -->
<!-- 
                    <div class="ysp-single-y-accord">
                        <h3>Hightlights/Key Features</h3>
                    
                        <ul>
                            <li>
                                
                            </li>
                        </ul>
                    </div> -->

                </div>

                <div class="ysp-single-y-sidebar">

                    <div class="ysp-single-y-sidebar-contact-broker">
                        <h3>Get More Information</h3>

                        <?php
                            if ($brokerQuery->have_posts()) {
                                while ($brokerQuery->have_posts()) {
                                    $brokerQuery->the_post();

                                    $broker_first_name = get_post_meta($post->ID, 'ysp_team_fname', true);
                                    $broker_last_name = get_post_meta($post->ID, 'ysp_team_lname', true);
                                    $broker_email = get_post_meta($post->ID, 'ysp_team_email', true);
                                    $broker_phone = get_post_meta($post->ID, 'ysp_team_phone', true);

                                    ?>

                                    <div class="ysp-single-y-sidebar-broker">
                                        <a href="<?= get_the_permalink(); ?>">
                                            <img src="<?php echo esc_url(get_the_post_thumbnail_url()); ?>" alt="" id="ysp-single-y-broker-image" />
                                        </a>

                                        <div>
                                            <a href="<?= get_the_permalink(); ?>">
                                                <h4><?= $broker_first_name.' '.$broker_last_name ?></h4>
                                            </a>

                                            <a href="tel: <?= $broker_phone ?>; ">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <g clip-path="url(#clip0_5813_10481)">
                                                <path d="M15.3483 10.11L13.9283 8.69C13.6232 8.39872 13.2176 8.23619 12.7958 8.23619C12.374 8.23619 11.9684 8.39872 11.6633 8.69L11.1633 9.19C10.8241 9.528 10.3647 9.71778 9.88582 9.71778C9.40693 9.71778 8.94756 9.528 8.60832 9.19C8.22332 8.805 7.97832 8.545 7.73332 8.29C7.48832 8.035 7.23332 7.76 6.83332 7.365C6.49562 7.02661 6.30597 6.56807 6.30597 6.09C6.30597 5.61193 6.49562 5.15339 6.83332 4.815L7.33332 4.315C7.48242 4.16703 7.60072 3.99099 7.68139 3.79703C7.76206 3.60308 7.8035 3.39506 7.80332 3.185C7.8015 2.76115 7.63262 2.35512 7.33332 2.055L5.91332 0.625C5.51217 0.225577 4.9694 0.000919443 4.40332 0C4.12447 0.000410905 3.84845 0.0558271 3.59105 0.163075C3.33366 0.270322 3.09995 0.427294 2.90332 0.625L1.54832 1.97C0.57188 2.94779 0.0234375 4.27315 0.0234375 5.655C0.0234375 7.03685 0.57188 8.36221 1.54832 9.34C2.32832 10.12 3.21832 11 4.10332 11.92C4.98832 12.84 5.85832 13.7 6.63332 14.5C7.6109 15.4749 8.93519 16.0224 10.3158 16.0224C11.6964 16.0224 13.0207 15.4749 13.9983 14.5L15.3483 13.15C15.7453 12.7513 15.9698 12.2126 15.9733 11.65C15.9782 11.3644 15.9254 11.0808 15.818 10.8162C15.7106 10.5516 15.5509 10.3114 15.3483 10.11ZM14.5933 12.375L14.4483 12.5L12.9983 11.045C12.95 10.99 12.891 10.9455 12.8248 10.9142C12.7586 10.8829 12.6868 10.8655 12.6136 10.8632C12.5405 10.8608 12.4676 10.8734 12.3995 10.9003C12.3315 10.9272 12.2696 10.9678 12.2179 11.0196C12.1661 11.0713 12.1256 11.1332 12.0986 11.2012C12.0717 11.2693 12.0591 11.3421 12.0615 11.4153C12.0639 11.4884 12.0812 11.5603 12.1125 11.6265C12.1438 11.6927 12.1883 11.7517 12.2433 11.8L13.7183 13.275L13.2683 13.725C12.4904 14.5005 11.4368 14.936 10.3383 14.936C9.23987 14.936 8.18622 14.5005 7.40832 13.725C6.63832 12.955 5.76332 12.065 4.90832 11.175C4.05332 10.285 3.12832 9.37 2.34832 8.59C1.57278 7.81209 1.1373 6.75845 1.1373 5.66C1.1373 4.56155 1.57278 3.50791 2.34832 2.73L2.79832 2.28L4.22332 3.75C4.32277 3.85277 4.45898 3.91182 4.60198 3.91417C4.74497 3.91651 4.88304 3.86196 4.98582 3.7625C5.08859 3.66304 5.14764 3.52684 5.14998 3.38384C5.15233 3.24084 5.09777 3.10277 4.99832 3L3.49832 1.5L3.64332 1.355C3.74185 1.25487 3.85939 1.17543 3.98904 1.12134C4.11869 1.06725 4.25784 1.03959 4.39832 1.04C4.68177 1.04085 4.95331 1.15414 5.15332 1.355L6.57832 2.8C6.67722 2.8998 6.7329 3.0345 6.73332 3.175C6.73338 3.24462 6.71972 3.31358 6.69312 3.37792C6.66653 3.44226 6.62752 3.50074 6.57832 3.55L6.07832 4.05C5.54094 4.58893 5.23918 5.31894 5.23918 6.08C5.23918 6.84106 5.54094 7.57107 6.07832 8.11C6.49832 8.5 6.72832 8.745 6.99832 9C7.26832 9.255 7.49832 9.53 7.89332 9.92C8.43224 10.4574 9.16225 10.7591 9.92332 10.7591C10.6844 10.7591 11.4144 10.4574 11.9533 9.92L12.4533 9.42C12.5554 9.32366 12.6905 9.26999 12.8308 9.26999C12.9712 9.26999 13.1062 9.32366 13.2083 9.42L14.6283 10.84C14.7282 10.9387 14.8075 11.0563 14.8616 11.1859C14.9157 11.3155 14.9434 11.4546 14.9433 11.595C14.9407 11.7412 14.9084 11.8853 14.8482 12.0186C14.788 12.1518 14.7013 12.2714 14.5933 12.37V12.375Z" fill="#2D3748"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_5813_10481">
                                                <rect width="16" height="16" fill="white"/>
                                                </clipPath>
                                                </defs>
                                                </svg>

                                                <?= $broker_phone ?>        
                                            </a>
                                            
                                            <br />
                                            
                                            <a href="<?= get_the_permalink(); ?>#listings">
                                                View Listings
                                            </a>
                                        </div>
                                    </div>

                                    <?php 

                                }
                            }
                        ?>

                        <form class="ysp-single-y-contact-form">
                            <input type="text" name="fullname" placeholder="Full Name" />
                            <input type="text" name="email" placeholder="Email" />
                            <input type="text" name="phone" placeholder="Phone Number" />

                            <textarea name="message" rows="8" placeholder="Message"></textarea>

                            <button type="submit" class="ysp-btn ysp-btn-block">Send Message</button>
                        </form>

                        <div style="margin-top: 15px; display: grid; gap: 15px; grid-template-columns: 1fr 1fr;">
                            <button type="button" class="ysp-btn">Call</button>
                            <button type="button" class="ysp-btn">Email</button>
                        </div>
                    </div>

                </div>

            </div>

            <div id="lightgallery">

                <div id="ysp-single-y-gallery" class=" ysp-single-y-section">
                    
                    <div class="set1"> 
                        <img src="<?php echo ($vessel->Images[3]->Uri); ?>" alt="" class="c1" style="width: 100%; height: 50%; flex-grow: 1; " />

                        <div class="thesplit">
                            <img src="<?php echo ($vessel->Images[4]->Uri); ?>" alt="" class="c2"/>     
                            <img src="<?php echo ($vessel->Images[5]->Uri); ?>" alt="" />
                        </div>
                    </div>
                    
                    <div class="set2">
                        <img src="<?php echo ($vessel->Images[6]->Uri); ?>" alt="" style="height: 100%; " />    
                        
                        <div class="thesplit">
                            <img src="<?php echo ($vessel->Images[7]->Uri); ?>" alt="" class="c3" />    
                            <img src="<?php echo ($vessel->Images[8]->Uri); ?>" alt="" class="c4" />    
                        </div>
                    </div>
                 </div>
            </div>

            <div id="ysp-single-y-similar-listings" class=" ysp-single-y-section">
                <h3>
                    Similar Listings
                </h3>
                
                <div class="ysp-the-yacht-results">
                    <?php
                        $yachtQuery = new WP_Query(array(
                            'post_type' => 'ysp_yacht',
                            'similar_listings_to' => get_the_ID(),

                            'posts_per_page' => 6,
                            'orderby' => 'rand'
                        ));


                        while ( $yachtQuery->have_posts() ) {
                            $yachtQuery->the_post();

                            $meta = get_post_meta($yachtQuery->post->ID);

                            foreach ($meta as $indexM => $valM) {
                                if (is_array($valM) && ! isset($valM[1])) {
                                    $meta[$indexM] = $valM[0];
                                }
                            }

                            $meta2=array_map("maybe_unserialize", $meta);

                            $meta2['_link']=get_permalink($yachtQuery->post->ID);

                            $yacht = $meta2;
                            include ('yacht-results-card.php');
                        }

                        wp_reset_postdata();
                    ?>
                </div>
            </div>

            <div id="ysp-single-y-bottom-form" class="ysp-single-y-section">
                
                <div class="headings">
                    <h3>Keep Learning<br /> About this Vessel<br /></h3>
                    <h4>Take a brochure with you</h4>

                    <a href="">
                        <img src="<?= YSP_ASSETS ?>/images/download.png" width="64px" height="64px" />

                    </a>
                </div>

                <div style="width: 560px;">
                    <h3 style="text-align: center;">Contact Us Today</h3>

                    <form class="ysp-single-y-contact-form">
                        <input type="text" name="fullname" placeholder="Full Name" />
                        <input type="text" name="email" placeholder="Email" />
                        <input type="text" name="phone" placeholder="Phone Number" />

                        <textarea name="message" rows="8" placeholder="Message"></textarea>

                        <button type="submit" class="ysp-btn ysp-btn-block">Send Message</button>
                    </form>
                </div>
            </div>

<!-- 
            <div id="ysp-single-y-bottom-broker-area" class="ysp-single-y-section">
                
                 <?php
                    if ($brokerQuery->have_posts()) {
                        while ($brokerQuery->have_posts()) {
                            $brokerQuery->the_post();

                            $broker_first_name = get_post_meta($post->ID, 'ysp_team_fname', true);
                            $broker_last_name = get_post_meta($post->ID, 'ysp_team_lname', true);
                            $broker_email = get_post_meta($post->ID, 'ysp_team_email', true);
                            $broker_phone = get_post_meta($post->ID, 'ysp_team_phone', true);

                            ?>

                            <div class="ysp-single-y-bottom-broker-profile">

                                <a href="<?= get_the_permalink(); ?>">
                                    <img src="<?php echo esc_url(get_the_post_thumbnail_url()); ?>" alt="" class="broker-image" />
                                </a>

                                <table>
                                    <tr>
                                        <th>Presented by:</th>
                                        <td><?php echo ($broker_first_name . " " . $broker_last_name); ?></td>
                                    </tr>
                                    <tr>
                                        <th>Brokered by:</th>
                                        <td>Big Baller Joshua Brokerage</td>
                                    </tr>
                                </table>

                                <table>
                                    <tr>
                                        <th>Broker Location:</th>
                                        <td>Fort Lauderdale, FL</td>
                                    </tr>
                                    <tr>
                                        <th>Data Source:</th>
                                        <td>Yatco | BoatWizard | IYBA</td>
                                    </tr>
                                    <tr>
                                        <th>MLS ID:</th>
                                        <td>#890082345</td>
                                    </tr>
                                    <tr>
                                        <th>Data Source Copyright:</th>
                                        <td>2023 YATCO. All rights reserved</td>
                                    </tr>
                                </table>


                            </div>

                            <?php
                        }
                    }
                ?>


            </div> -->


    <?php
        endwhile; // End of the loop.
    ?>

<?php
    $image = $vessel->Images[0];
?>
<div class="ysp-modal" id="ysp-single-y-share-modal">
    <div class="modal-content">
        <div class="modal-left">
            <img src="<?php echo $image->{'Uri'}; ?>" alt="Vessel Image">
            <p class="modal-title">
                <?php echo esc_html($vessel->ModelYear . ' ' . $vessel->MakeString . ' ' . $vessel->BoatName); ?>
            </p>
        </div>
        <div class="modal-right">
            <h2>Share This</h2>

            <div class="modal-socials">
                <div class="modal-social-icon">
                    <a href="mailto:?subject=<?php echo urlencode($vessel->ModelYear . ' ' . $vessel->MakeString . ' ' . $vessel->BoatName); ?>&body=<?php echo get_the_permalink(); ?>" style="text-decoration: none; color: black;">
                        <img src="<?php echo YSP_ASSETS; ?>/icons/send.svg" alt="Email" style="width: 20px; height: 20px;">
                        <p class="modal-social"> Email </p>
                    </a>
                </div>
                <div class="modal-social-icon">
                    <a class="yacht-brochure" onclick="window.open('http://www.facebook.com/sharer/sharer.php?u=<?php echo get_the_permalink(); ?>&t=<?php echo urlencode($vessel->ModelYear . ' ' . $vessel->MakeString . ' ' . $vessel->BoatName); ?>', '_blank');" target="_blank" style="text-decoration: none; color: black;">
                        <img src="<?php echo YSP_ASSETS; ?>/icons/facebook.svg" alt="Facebook Icon" style="width: 20px; height: 20px;">
                        <p class="modal-social"> Facebook </p>
                    </a>
                </div>
                <div class="modal-social-icon">
                    <a href="http://twitter.com/share?url=<?php echo get_the_permalink(); ?>&text=<?php echo urlencode($vessel->ModelYear . ' ' . $vessel->MakeString . ' ' . $vessel->BoatName); ?>" target="_blank" style="text-decoration: none; color: black;">
                        <img src="<?php echo YSP_ASSETS; ?>/icons/twitter.svg" alt="Twitter Icon" style="width: 20px; height: 20px;">
                        <p class="modal-social"> Twitter </p>
                    </a>
                </div>
            </div>

            <h3>Copy Link</h3>

            <div class="copy-link-section">
                <input type="text" value="<?php echo esc_url(get_permalink()); ?>" id="copyLinkInput" readonly>
                <button onclick="copyLink()">Copy Link</button>
            </div>
        </div>
    </div>
</div>

</main><!-- #main -->

<?php
//get_sidebar();
get_footer();
