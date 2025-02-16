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

        $yacht_search_url = get_permalink($YSP_Options->get('yacht_search_page_id'));
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

            $vesselLocation = ($vessel->YSP_CountryID == "US" || $vessel->YSP_Country == "United States") ? $vessel->YSP_City.', '. $vessel->YSP_State : $vessel->YSP_City.', '. $vessel->YSP_CountryID;

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
            

            $broker_first_name = "";
            $broker_last_name = "";
            $broker_title = "";
            $broker_email = "";
            $broker_phone = "";
            $broker_image = "";
            $broker_link = "";

            $BoatPostId=$post->ID;

            if ($brokerQuery->have_posts()) {

                while ($brokerQuery->have_posts()) {

                    $brokerQuery->the_post();

                    $broker_first_name = get_post_meta($post->ID, 'ysp_team_fname', true);
                    $broker_last_name = get_post_meta($post->ID, 'ysp_team_lname', true);
                    $broker_title = get_post_meta($post->ID, 'ysp_team_title', true);
                    $broker_email = get_post_meta($post->ID, 'ysp_team_email', true);
                    $broker_phone = get_post_meta($post->ID, 'ysp_team_phone', true);
                    $broker_image = esc_url(get_the_post_thumbnail_url());
                    $broker_link = get_the_permalink($post->ID);

                }
            }

            wp_reset_postdata();
            ?>

            <div id="ysp-single-y-image-topper" title="click to view gallery"> 

                <img src="<?php echo ($vessel->Images[0]->Uri); ?>" alt="" class="img1" id="ysp-single-y-main-iamge" />

                <div class="TwoStack">
                    <img src="<?php echo ($vessel->Images[1]->Uri); ?>" class="img2" alt=""  loading="lazy " />
                    <img src="<?php echo ($vessel->Images[2]->Uri); ?>" class="img3" alt=""  loading="lazy" />

                </div>
               
                <svg width="82" height="83" viewBox="0 0 82 83" fill="none" xmlns="http://www.w3.org/2000/svg" style="pointer-events: none; position: absolute; bottom: 0px; right: 0px;">
                <g filter="url(#filter0_d_8129_11006)">
                <path d="M69.8223 37C69.8223 53.5685 56.8783 67 40.9111 67C24.944 67 12 53.5685 12 37C12 20.4315 24.944 7 40.9111 7C56.8783 7 69.8223 20.4315 69.8223 37Z" fill="white"/>
                <path d="M69.4473 37C69.4473 53.3746 56.6583 66.625 40.9111 66.625C25.164 66.625 12.375 53.3746 12.375 37C12.375 20.6254 25.164 7.375 40.9111 7.375C56.6583 7.375 69.4473 20.6254 69.4473 37Z" stroke="#D0DBFF" stroke-width="0.75"/>
                </g>
                <path d="M42.875 27H51.875C52.4963 27 53 27.4871 53 28.0879V35.3407C53 35.9415 52.4963 36.4286 51.875 36.4286H42.875C42.2537 36.4286 41.75 35.9415 41.75 35.3407V28.0879C41.75 27.4871 42.2537 27 42.875 27ZM39.125 27H30.125C29.5037 27 29 27.4871 29 28.0879V35.3407C29 35.9415 29.5037 36.4286 30.125 36.4286H39.125C39.7463 36.4286 40.25 35.9415 40.25 35.3407V28.0879C40.25 27.4871 39.7463 27 39.125 27ZM29 38.967V46.2198C29 46.8206 29.5037 47.3077 30.125 47.3077H39.125C39.7463 47.3077 40.25 46.8206 40.25 46.2198V38.967C40.25 38.3662 39.7463 37.8791 39.125 37.8791H30.125C29.5037 37.8791 29 38.3662 29 38.967ZM42.875 47.3077H51.875C52.4963 47.3077 53 46.8206 53 46.2198V38.967C53 38.3662 52.4963 37.8791 51.875 37.8791H42.875C42.2537 37.8791 41.75 38.3662 41.75 38.967V46.2198C41.75 46.8206 42.2537 47.3077 42.875 47.3077Z" fill="#067AED"/>
                <defs>
                <filter id="filter0_d_8129_11006" x="0.75" y="0.25" width="80.3203" height="82.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4.5"/>
                <feGaussianBlur stdDeviation="5.625"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.25098 0 0 0 0 0.309804 0 0 0 0 0.407843 0 0 0 0.05 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8129_11006"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_8129_11006" result="shape"/>
                </filter>
                </defs>
                </svg>
            </div>

            <div id="ysp-single-y-breadcrumbs">
                <?php
                    if ( function_exists('yoast_breadcrumb') ) {
                      yoast_breadcrumb( '<div>','</div>' );
                    }
                ?>

                <nav class="ysp-single-y-links">
                
                    <a href="tel: <?= $broker_phone ?>" title="Call">
                        <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1.75 11.8358V2.91667C1.75 2.60725 1.87292 2.3105 2.09171 2.09171C2.3105 1.87292 2.60725 1.75 2.91667 1.75H11.0833C11.3928 1.75 11.6895 1.87292 11.9083 2.09171C12.1271 2.3105 12.25 2.60725 12.25 2.91667V8.75C12.25 9.05942 12.1271 9.35616 11.9083 9.57496C11.6895 9.79375 11.3928 9.91667 11.0833 9.91667H4.64392C4.46905 9.91669 4.29643 9.95602 4.13882 10.0317C3.9812 10.1075 3.84262 10.2177 3.73333 10.3542L2.37358 12.054C2.32833 12.1107 2.26658 12.152 2.19686 12.172C2.12714 12.1921 2.0529 12.19 1.98442 12.1661C1.91594 12.1421 1.85659 12.0975 1.8146 12.0383C1.7726 11.9791 1.75003 11.9084 1.75 11.8358Z" stroke="#4A5568" stroke-width="0.875"/>
                        </svg>
                        </span>
                    </a>           

                    <a rel="nofollow" href="<?php echo get_rest_url(); ?>ysp/yacht-pdf-loader?yacht_post_id=<?php echo get_the_ID(); ?>" target="_blank" title="Download brochure">
                        <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <g clip-path="url(#clip0_8145_4250)">
                        <path d="M0.882812 0.881042H8.75408L5.25574 3.5048" stroke="#4A5568" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M0.882813 0.881042L0.882812 10.5015H5.25574" stroke="#4A5568" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5.25781 3.50482H13.1291V13.1253H5.25781V3.50482Z" stroke="#4A5568" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.75781 0.881042V3.5048" stroke="#4A5568" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_8145_4250">
                        <rect width="14" height="14" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>
                        </span>
                    </a>
            
                    <a href="#" data-modal="#ysp-single-y-share-modal" title="Share This Page">
                        <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M12.25 8.74998V11.0833C12.25 11.3927 12.1271 11.6895 11.9083 11.9083C11.6895 12.1271 11.3928 12.25 11.0833 12.25H2.91667C2.60725 12.25 2.3105 12.1271 2.09171 11.9083C1.87292 11.6895 1.75 11.3927 1.75 11.0833V8.74998M9.91602 4.91673L6.99935 2.00006M6.99935 2.00006V5.50006L6.99935 9.00006M6.99935 2.00006L5.54102 3.45839L4.08268 4.91673" stroke="#4A5568" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        </span>
                    </a>
                
                </nav>
            </div>

            <div id="ysp-single-y-middle-split">

                <div class="ysp-single-y-main">

                    <div class="ysp-single-y-headings">

                        <h1><?= $vessel->YSP_LOAFeet.'ft '.$vessel->MakeString.' '.$vessel->ModelYear.' ' ?></h1>

                        <h2>
                            <?= empty($vessel->BoatName)?"":$vessel->BoatName.' | ' ?> 
                            
                            <a href="<?=  $yacht_search_url  ?>/ys_keyword-<?= str_replace([' '], ['-'], $yacht->BoatLocation->BoatCityName) ?>/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#067AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#067AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>

                                <?=  $vesselLocation ?> 
                            </a>
                        </h2>
                    </div>

                    <div class="ysp-single-y-status-and-price">

                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <circle cx="6" cy="6" r="6" fill="#C00020"/>
                            </svg>
                            
                            <b>SOLD</b>
                        </span>


                        <span class="ysp-single-y-price">
                            Call For Price
                        </span>
                    </div>

                    <!-- Maybe A Map -->

                    <div class="ysp-single-y-basic-info-table">
                        <div class="ysp-single-y-info-table-cell">
                            <span class="cell-heading">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M7 17V15H13C12.7667 14.7167 12.579 14.4083 12.437 14.075C12.295 13.7417 12.1827 13.3833 12.1 13H9V11H12.1C12.1833 10.6167 12.296 10.2583 12.438 9.925C12.58 9.59167 12.7673 9.28333 13 9H3V7H17C18.3833 7 19.5627 7.48767 20.538 8.463C21.5133 9.43833 22.0007 10.6173 22 12C22 13.3833 21.5123 14.5627 20.537 15.538C19.5617 16.5133 18.3827 17.0007 17 17H7ZM2 13V11H8V13H2ZM3 17V15H6V17H3Z" fill="#2D3748"></path>
                                </svg> 
                                Length
                            </span>
                            <span><?php echo empty($vessel->YSP_LOAFeet) ? "N/A" : $vessel->YSP_LOAFeet . "ft / " . $vessel->YSP_LOAMeter . ' m'; ?></span>
                        </div>
                        
                        <div class="ysp-single-y-info-table-cell">
                            <span class="cell-heading">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M7 17V15H13C12.7667 14.7167 12.579 14.4083 12.437 14.075C12.295 13.7417 12.1827 13.3833 12.1 13H9V11H12.1C12.1833 10.6167 12.296 10.2583 12.438 9.925C12.58 9.59167 12.7673 9.28333 13 9H3V7H17C18.3833 7 19.5627 7.48767 20.538 8.463C21.5133 9.43833 22.0007 10.6173 22 12C22 13.3833 21.5123 14.5627 20.537 15.538C19.5617 16.5133 18.3827 17.0007 17 17H7ZM2 13V11H8V13H2ZM3 17V15H6V17H3Z" fill="#2D3748"></path>
                                </svg> 
                                Draft 
                            </span>
                            <span> <?php echo empty($vessel->MaxDraft)?"N/A":$vessel->MaxDraft; ?></span>
                        </div>

                        <div class="ysp-single-y-info-table-cell">
                            <span class="cell-heading">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path d="M12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.3283 14.4353 9.65339 14.3097 9.95671C14.1841 10.26 13.9999 10.5356 13.7678 10.7678C13.5356 10.9999 13.26 11.1841 12.9567 11.3097C12.6534 11.4353 12.3283 11.5 12 11.5ZM12 2C10.1435 2 8.36301 2.7375 7.05025 4.05025C5.7375 5.36301 5 7.14348 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025C15.637 2.7375 13.8565 2 12 2Z" fill="#2D3748"></path>
                                </svg>
                                Location
                            </span>
                            <span><?=  $vesselLocation ?> </span>
                        </div>

                        <div class="ysp-single-y-info-table-cell">
                            <span class="cell-heading">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path d="M3 21V19H5V3H15V4H19V19H21V21H17V6H15V21H3ZM11 13C11.2833 13 11.521 12.904 11.713 12.712C11.905 12.52 12.0007 12.2827 12 12C12 11.7167 11.904 11.479 11.712 11.287C11.52 11.095 11.2827 10.9993 11 11C10.7167 11 10.479 11.096 10.287 11.288C10.095 11.48 9.99933 11.7173 10 12C10 12.2833 10.096 12.521 10.288 12.713C10.48 12.905 10.7173 13.0007 11 13Z" fill="#2D3748"></path>
                                </svg>
                                Cabins
                            </span>
                            <span><?php echo (empty($vessel->CabinsCountNumeric) ? 'N/A' : $vessel->CabinsCountNumeric); ?></span>
                        </div>

                        <div class="ysp-single-y-info-table-cell">
                            <span class="cell-heading">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                      <path d="M6.5 11L12 2L17.5 11H6.5ZM17.5 22C16.25 22 15.1873 21.5623 14.312 20.687C13.4367 19.8117 12.9993 18.7493 13 17.5C13 16.25 13.4377 15.1873 14.313 14.312C15.1883 13.4367 16.2507 12.9993 17.5 13C18.75 13 19.8127 13.4377 20.688 14.313C21.5633 15.1883 22.0007 16.2507 22 17.5C22 18.75 21.5623 19.8127 20.687 20.688C19.8117 21.5633 18.7493 22.0007 17.5 22ZM3 21.5V13.5H11V21.5H3Z" fill="#2D3748"></path>
                                    </svg>
                                Yacht type
                            </span> 
                            <span><?php echo empty($vessel->BoatCategoryCode)?"N/A":$vessel->BoatCategoryCode; ?></span>
                        </div>

                        <div class="ysp-single-y-info-table-cell">
                            <span class="cell-heading">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path d="M19 19H5V8H19M16 1V3H8V1H6V3H5C3.89 3 3 3.89 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H18V1M17 12H12V17H17V12Z" fill="#2D3748"></path>
                                </svg> 
                                Year
                            </span>
                            <span><?= $vessel->ModelYear ?></span>                            
                        </div>

                        <div class="ysp-single-y-info-table-cell">
                            <span class="cell-heading">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path d="M10.45 15.5C10.8667 15.9167 11.3917 16.1127 12.025 16.088C12.6583 16.0633 13.1167 15.834 13.4 15.4L19 7L10.6 12.6C10.1667 12.9 9.92933 13.354 9.888 13.962C9.84667 14.57 10.034 15.0827 10.45 15.5ZM5.1 20C4.73333 20 4.396 19.9207 4.088 19.762C3.78 19.6033 3.534 19.366 3.35 19.05C2.91667 18.2667 2.58333 17.454 2.35 16.612C2.11667 15.77 2 14.8993 2 14C2 12.6167 2.26267 11.3167 2.788 10.1C3.31333 8.88333 4.02567 7.825 4.925 6.925C5.825 6.025 6.88333 5.31267 8.1 4.788C9.31667 4.26333 10.6167 4.00067 12 4C13.3667 4 14.65 4.25833 15.85 4.775C17.05 5.29167 18.1 5.996 19 6.888C19.9 7.77933 20.6167 8.821 21.15 10.013C21.6833 11.205 21.9583 12.484 21.975 13.85C21.9917 14.7667 21.8873 15.6627 21.662 16.538C21.4367 17.4133 21.091 18.2507 20.625 19.05C20.4417 19.3667 20.1957 19.6043 19.887 19.763C19.5783 19.9217 19.241 20.0007 18.875 20H5.1Z" fill="#2D3748"></path>
                                </svg>
                                Max Speed
                            </span>
                            <span><?php echo empty($vessel->MaximumSpeedMeasure)?"N/A":$vessel->MaximumSpeedMeasure; ?></span>
                        </div>
                    </div>

                    <div class="ysp-single-y-description">
                        <?php 
                            if ($post->post_content == 0) {
                                if (isset($vessel->GeneralBoatDescription) && is_array($vessel->GeneralBoatDescription)) { 
                                    echo join(" ", $vessel->GeneralBoatDescription); 
                                }
                                elseif (isset($vessel->GeneralBoatDescription) && is_string($vessel->GeneralBoatDescription)) {
                                    echo $vessel->GeneralBoatDescription;
                                } 

                            }
                            else {

                                the_content();
                            }
                        ?>
                    </div>                   

                    <!-- <div class="ysp-single-y-accord">
                        <h3>Features & Amenities</h3>

                    </div> -->
                    
                    <div class="ysp-single-y-video-grid" id="video-gallery">
                        <?php 
                            if(isset($vessel->Videos)) {
                                $videoUrls = $vessel->Videos->url;
                                
                                foreach($videoUrls as $aindex => $video) { 
                                    // $video_thumbnail = $vessel->Videos->thumbnailUrl[$aindex];

                                    ?>
                                    <!-- <a data-src="<?php echo $video;?>">
                                        <button class="yacht-download-button" type="button">
                                            Open Video <?= ($aindex+1) ?>
                                        </button>
                                    </a> -->

                                    <a href="<?= $vessel->Videos->url[$aindex] ?>" target="_blank" title="Play video" class="ysp-single-y-video">

                                        <img src="<?php echo ($vessel->Images[(10+$aindex)]->Uri); ?>" alt="Play Video" loading="lazy" />

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
                        ?>
                    </div>

                    <!-- 
                        <div class="ysp-single-y-accord">
                            <h3>Hightlights/Key Features</h3>
                        
                            <ul>
                                <li>
                                    
                                </li>
                            </ul>
                        </div> 
                    -->

                </div>

                <div class="ysp-single-y-sidebar">

                    <div class="ysp-single-y-sidebar-contact-broker">
                        <!-- <h3>Get More Information</h3> -->

           

                        <div class="ysp-single-y-sidebar-broker">
                            <a href="<?= $broker_link; ?>">
                                <img src="<?php echo $broker_image; ?>" alt="Photo Of <?= $broker_first_name ?>" id="ysp-single-y-broker-image" />
                            </a>

                            <div>
                                <a href="<?= $broker_link; ?>">
                                    <h4><?= $broker_first_name.' '.$broker_last_name ?></h4>
                                </a>

                                <?= $broker_title ?> <br />

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
                                
                                <a href="<?= $broker_link ?>#listings">
                                    View My Listings
                                </a>
                            </div>
                        </div>

                                   
                        <form class="ysp-single-y-contact-form ysp-lead-form ysp-lead-form-v2">
                            <input type="hidden" name="WhichBoatID" value="<?= $BoatPostId ?>">

                            <div class="hide-after-submit">                                            
                                <div class="ysp-lead-form-row">
                                    <input type="text" name="fname" placeholder="First Name" required />
                                    <input type="text" name="lname" placeholder="Last Name" required />
                                </div>

                                <input type="text" name="email" placeholder="Email" required />
                                <input type="text" name="phone" placeholder="Phone Number" required />

                                <div style="display: none;">
                                    <input type="text" name="fax">
                                </div>

                                <textarea name="message" rows="8" placeholder="Message" required></textarea>

                                <button type="submit" class="ysp-btn ysp-btn-block">
                                    Send Message 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M15.5553 0H5.77756C5.53189 0 5.3331 0.198792 5.3331 0.444458C5.3331 0.690125 5.53189 0.888917 5.77756 0.888917H14.4824L0.129975 15.2413C-0.0436504 15.415 -0.0436504 15.6962 0.129975 15.8698C0.216766 15.9566 0.330516 16 0.444225 16C0.557933 16 0.671641 15.9566 0.758475 15.8698L15.1109 1.51737V10.2222C15.1109 10.4679 15.3097 10.6667 15.5553 10.6667C15.801 10.6667 15.9998 10.4679 15.9998 10.2222V0.444458C15.9998 0.198792 15.801 0 15.5553 0Z" fill="white"/>
                                    </svg>
                                </button>
                            </div>

                            <div class="success-message">
                                <p>Thank you for getting in touch.<br /> We will be in touch shortly.</p>
                            </div>
                        </form>

                        <div style="margin-top: 15px; display: grid; gap: 15px; grid-template-columns: 1fr 1fr;">
                            <a href="tel: <?= $broker_phone ?>; ">
                                <button type="button" class="ysp-btn ysp-btn-block">Call</button>
                            </a>

                            <a href="mailto: <?= $broker_email ?>; ">
                                <button type="button" class="ysp-btn ysp-btn-block">Email</button>
                            </a>
                        </div>

                    </div>

                </div>

            </div>

            <div id="lightgallery">

                <div id="ysp-single-y-gallery" class=" ysp-single-y-section" title="click to view gallery">
                    
                    <div style="display: none;">
                        <?php for ($imgI=0; $imgI <= 2; $imgI++) : ?>
                            <img data-thumb-src="<?php echo ($vessel->Images[ $imgI ]->Uri); ?>" src="<?php echo ($vessel->Images[ $imgI ]->Uri); ?>" alt="" loading="lazy" />    
                        <?php endfor; ?>
                    </div>

                    <div class="set1"> 
                        <img data-thumb-src="<?php echo ($vessel->Images[3]->Uri); ?>" src="<?php echo ($vessel->Images[3]->Uri); ?>" alt="" class="c1" style="width: 100%; height: 50%; flex-grow: 1;   loading="lazy"" />

                        <div class="thesplit">
                            <img data-thumb-src="<?php echo ($vessel->Images[4]->Uri); ?>" src="<?php echo ($vessel->Images[4]->Uri); ?>" alt="" class="c2"  loading="lazy"/>     
                            <img data-thumb-src="<?php echo ($vessel->Images[5]->Uri); ?>" src="<?php echo ($vessel->Images[5]->Uri); ?>" alt=""  loading="lazy" />

                            <svg width="82" height="83" viewBox="0 0 82 83" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
                            <g filter="url(#filter0_d_8129_11006)">
                            <path d="M69.8223 37C69.8223 53.5685 56.8783 67 40.9111 67C24.944 67 12 53.5685 12 37C12 20.4315 24.944 7 40.9111 7C56.8783 7 69.8223 20.4315 69.8223 37Z" fill="white"/>
                            <path d="M69.4473 37C69.4473 53.3746 56.6583 66.625 40.9111 66.625C25.164 66.625 12.375 53.3746 12.375 37C12.375 20.6254 25.164 7.375 40.9111 7.375C56.6583 7.375 69.4473 20.6254 69.4473 37Z" stroke="#D0DBFF" stroke-width="0.75"/>
                            </g>
                            <path d="M42.875 27H51.875C52.4963 27 53 27.4871 53 28.0879V35.3407C53 35.9415 52.4963 36.4286 51.875 36.4286H42.875C42.2537 36.4286 41.75 35.9415 41.75 35.3407V28.0879C41.75 27.4871 42.2537 27 42.875 27ZM39.125 27H30.125C29.5037 27 29 27.4871 29 28.0879V35.3407C29 35.9415 29.5037 36.4286 30.125 36.4286H39.125C39.7463 36.4286 40.25 35.9415 40.25 35.3407V28.0879C40.25 27.4871 39.7463 27 39.125 27ZM29 38.967V46.2198C29 46.8206 29.5037 47.3077 30.125 47.3077H39.125C39.7463 47.3077 40.25 46.8206 40.25 46.2198V38.967C40.25 38.3662 39.7463 37.8791 39.125 37.8791H30.125C29.5037 37.8791 29 38.3662 29 38.967ZM42.875 47.3077H51.875C52.4963 47.3077 53 46.8206 53 46.2198V38.967C53 38.3662 52.4963 37.8791 51.875 37.8791H42.875C42.2537 37.8791 41.75 38.3662 41.75 38.967V46.2198C41.75 46.8206 42.2537 47.3077 42.875 47.3077Z" fill="#067AED"/>
                            <defs>
                            <filter id="filter0_d_8129_11006" x="0.75" y="0.25" width="80.3203" height="82.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="4.5"/>
                            <feGaussianBlur stdDeviation="5.625"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0.25098 0 0 0 0 0.309804 0 0 0 0 0.407843 0 0 0 0.05 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8129_11006"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_8129_11006" result="shape"/>
                            </filter>
                            </defs>
                            </svg>
                        </div>
                    </div>
                    
                    <div class="set2">
                        <img data-thumb-src="<?php echo ($vessel->Images[6]->Uri); ?>" src="<?php echo ($vessel->Images[6]->Uri); ?>" alt="" style="height: 100%; "  loading="lazy" />    
                        
                        <div class="thesplit">
                            <img data-thumb-src="<?php echo ($vessel->Images[7]->Uri); ?>"  src="<?php echo ($vessel->Images[7]->Uri); ?>" alt="" class="c3"  loading="lazy" />    
                            <img data-thumb-src="<?php echo ($vessel->Images[8]->Uri); ?>" src="<?php echo ($vessel->Images[8]->Uri); ?>" alt="" class="c4"  loading="lazy" /> 

                            <svg width="82" height="83" viewBox="0 0 82 83" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
                            <g filter="url(#filter0_d_8129_11006)">
                            <path d="M69.8223 37C69.8223 53.5685 56.8783 67 40.9111 67C24.944 67 12 53.5685 12 37C12 20.4315 24.944 7 40.9111 7C56.8783 7 69.8223 20.4315 69.8223 37Z" fill="white"/>
                            <path d="M69.4473 37C69.4473 53.3746 56.6583 66.625 40.9111 66.625C25.164 66.625 12.375 53.3746 12.375 37C12.375 20.6254 25.164 7.375 40.9111 7.375C56.6583 7.375 69.4473 20.6254 69.4473 37Z" stroke="#D0DBFF" stroke-width="0.75"/>
                            </g>
                            <path d="M42.875 27H51.875C52.4963 27 53 27.4871 53 28.0879V35.3407C53 35.9415 52.4963 36.4286 51.875 36.4286H42.875C42.2537 36.4286 41.75 35.9415 41.75 35.3407V28.0879C41.75 27.4871 42.2537 27 42.875 27ZM39.125 27H30.125C29.5037 27 29 27.4871 29 28.0879V35.3407C29 35.9415 29.5037 36.4286 30.125 36.4286H39.125C39.7463 36.4286 40.25 35.9415 40.25 35.3407V28.0879C40.25 27.4871 39.7463 27 39.125 27ZM29 38.967V46.2198C29 46.8206 29.5037 47.3077 30.125 47.3077H39.125C39.7463 47.3077 40.25 46.8206 40.25 46.2198V38.967C40.25 38.3662 39.7463 37.8791 39.125 37.8791H30.125C29.5037 37.8791 29 38.3662 29 38.967ZM42.875 47.3077H51.875C52.4963 47.3077 53 46.8206 53 46.2198V38.967C53 38.3662 52.4963 37.8791 51.875 37.8791H42.875C42.2537 37.8791 41.75 38.3662 41.75 38.967V46.2198C41.75 46.8206 42.2537 47.3077 42.875 47.3077Z" fill="#067AED"/>
                            <defs>
                            <filter id="filter0_d_8129_11006" x="0.75" y="0.25" width="80.3203" height="82.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="4.5"/>
                            <feGaussianBlur stdDeviation="5.625"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0.25098 0 0 0 0 0.309804 0 0 0 0 0.407843 0 0 0 0.05 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8129_11006"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_8129_11006" result="shape"/>
                            </filter>
                            </defs>
                            </svg>
                        </div>
                    </div>

                    <div style="display: none;">
                        <?php for ($imgI=0; $img <= count($vessel->Images) && $imgI <= 25; $imgI++) : 
                            if (isset($vessel->Images[ $imgI ]->Uri)) :
                            ?>
                            <img data-thumb-src="<?php echo ($vessel->Images[ $imgI ]->Uri); ?>" src="<?php echo ($vessel->Images[ $imgI ]->Uri); ?>" alt=""  loading="lazy" />    
                        
                        <?php 
                            endif;
                            endfor;
                        ?>
                    </div>
                 </div>
            </div>

            <div id="ysp-single-y-similar-listings" class=" ysp-single-y-section">
                <h2>
                    Similar Listings
                </h2>
                
                <div class="ysp-the-yacht-results">
                    <?php
                        $yachtQuery = new WP_Query(array(
                            'post_type' => 'ysp_yacht',
                            'similar_listings_to' => $post->ID,

                            'posts_per_page' => 6,
                            
                            'sortby' => 'length:desc',
                            'no_found_rows' => true,
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

            <div id="ysp-single-y-bottom-pdf-plus-contact" class="ysp-single-y-section">
                
                <div class="pdf">
                    <h3>Keep Learning<br /> About this Vessel<br /></h3>
                    <h4 style="margin-bottom: 10px;">Take a brochure with you</h4>

                    <a rel="nofollow" href="<?php echo get_rest_url(); ?>ysp/yacht-pdf-loader?yacht_post_id=<?php echo get_the_ID(); ?>" target="_blank" title="Download brochure">
                        <svg width="100" height="131" viewBox="0 0 100 131" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M58.3333 34.5484V0H6.25C2.78646 0 0 2.71815 0 6.09677V123.968C0 127.346 2.78646 130.065 6.25 130.065H93.75C97.2135 130.065 100 127.346 100 123.968V40.6452H64.5833C61.1458 40.6452 58.3333 37.9016 58.3333 34.5484ZM78.2422 88.2406L53.1328 112.552C51.401 114.231 48.6042 114.231 46.8724 112.552L21.763 88.2406C19.1198 85.6825 20.974 81.2903 24.6927 81.2903H41.6667V60.9677C41.6667 58.7221 43.5312 56.9032 45.8333 56.9032H54.1667C56.4687 56.9032 58.3333 58.7221 58.3333 60.9677V81.2903H75.3073C79.026 81.2903 80.8802 85.6825 78.2422 88.2406ZM98.1771 26.6734L72.6823 1.77823C71.5104 0.635081 69.9219 0 68.2552 0H66.6667V32.5161H100V30.9665C100 29.3661 99.349 27.8165 98.1771 26.6734Z" fill="#067AED"/>
                        </svg>
                    </a>
                </div>

                <div class="contact">
                    <h3 style="">Contact Us</h3> 

                    <form class="ysp-single-y-contact-form ysp-lead-form ysp-lead-form-v2">
                        <input type="hidden" name="WhichBoatID" value="<?= $post->ID ?>">

                        <div class="hide-after-submit">
                            <div class="ysp-lead-form-row">
                                <input type="text" name="fname" placeholder="First Name" required />
                                <input type="text" name="lname" placeholder="Last Name"  required />
                            </div>

                            <input type="text" name="email" placeholder="Email" required />
                            <input type="text" name="phone" placeholder="Phone Number" required />

                            <div style="display: none;">
                                <input type="text" name="fax">
                            </div>

                            <textarea name="message" rows="8" placeholder="Message" required></textarea>

                            <button type="submit" class="ysp-btn ysp-btn-block">
                                Send Message 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M15.5553 0H5.77756C5.53189 0 5.3331 0.198792 5.3331 0.444458C5.3331 0.690125 5.53189 0.888917 5.77756 0.888917H14.4824L0.129975 15.2413C-0.0436504 15.415 -0.0436504 15.6962 0.129975 15.8698C0.216766 15.9566 0.330516 16 0.444225 16C0.557933 16 0.671641 15.9566 0.758475 15.8698L15.1109 1.51737V10.2222C15.1109 10.4679 15.3097 10.6667 15.5553 10.6667C15.801 10.6667 15.9998 10.4679 15.9998 10.2222V0.444458C15.9998 0.198792 15.801 0 15.5553 0Z" fill="white"/>
                                </svg>
                            </button>
                        </div>

                        <div class="success-message">
                            <p>Thank you for getting in touch.<br /> We will be in touch shortly.</p>
                        </div>
                    </form>
                </div>
            </div>

    <?php
        endwhile; // End of the loop.
    ?>

<?php
    $image = $vessel->Images[0];
?>
<div class="ysp-modal" id="ysp-single-y-share-modal">
    <div class="modal-content">
        <div class="modal-left">
            <img src="<?php echo $image->{'Uri'}; ?>" alt="Vessel Image"  loading="lazy" />
            <p class="modal-title" style="text-align: center;">
                <?php echo esc_html($vessel->ModelYear . ' ' . $vessel->MakeString) .'<br />'. $vessel->BoatName; ?>
            </p>
        </div>
        <div class="modal-right">
            <h2>Share This Page!</h2>

            <div class="modal-socials">
                <div class="modal-social-icon">
                    <a href="mailto:?subject=<?php echo urlencode($vessel->ModelYear . ' ' . $vessel->MakeString . ' ' . $vessel->BoatName); ?>&body=<?php echo get_the_permalink(); ?>" style="text-decoration: none; color: black;">
                        <svg fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                             viewBox="0 0 495.003 495.003" xml:space="preserve">
                        <g id="XMLID_51_">
                            <path id="XMLID_53_" d="M164.711,456.687c0,2.966,1.647,5.686,4.266,7.072c2.617,1.385,5.799,1.207,8.245-0.468l55.09-37.616
                                l-67.6-32.22V456.687z"/>
                            <path id="XMLID_52_" d="M492.431,32.443c-1.513-1.395-3.466-2.125-5.44-2.125c-1.19,0-2.377,0.264-3.5,0.816L7.905,264.422
                                c-4.861,2.389-7.937,7.353-7.904,12.783c0.033,5.423,3.161,10.353,8.057,12.689l125.342,59.724l250.62-205.99L164.455,364.414
                                l156.145,74.4c1.918,0.919,4.012,1.376,6.084,1.376c1.768,0,3.519-0.322,5.186-0.977c3.637-1.438,6.527-4.318,7.97-7.956
                                L494.436,41.257C495.66,38.188,494.862,34.679,492.431,32.443z"/>
                        </g>
                        </svg>
                        <p class="modal-social"> Email </p>
                    </a>
                </div>
                <div class="modal-social-icon">
                    <a class="yacht-brochure" onclick="window.open('http://www.facebook.com/sharer/sharer.php?u=<?php echo get_the_permalink(); ?>&t=<?php echo urlencode($vessel->ModelYear . ' ' . $vessel->MakeString . ' ' . $vessel->BoatName); ?>', '_blank');" target="_blank" style="text-decoration: none; color: black;">
                        <svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M21.95 5.005l-3.306-.004c-3.206 0-5.277 2.124-5.277 5.415v2.495H10.05v4.515h3.317l-.004 9.575h4.641l.004-9.575h3.806l-.003-4.514h-3.803v-2.117c0-1.018.241-1.533 1.566-1.533l2.366-.001.01-4.256z"/></svg>
                        <p class="modal-social"> Facebook </p>
                    </a>
                </div>
                <div class="modal-social-icon">
                    <a href="http://twitter.com/share?url=<?php echo get_the_permalink(); ?>&text=<?php echo urlencode($vessel->ModelYear . ' ' . $vessel->MakeString . ' ' . $vessel->BoatName); ?>" target="_blank" style="text-decoration: none; color: black;">
                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7828 3.91825C20.1313 3.83565 20.3743 3.75444 20.5734 3.66915C20.8524 3.54961 21.0837 3.40641 21.4492 3.16524C21.7563 2.96255 22.1499 2.9449 22.4739 3.11928C22.7979 3.29366 23 3.6319 23 3.99986C23 5.08079 22.8653 5.96673 22.5535 6.7464C22.2911 7.40221 21.9225 7.93487 21.4816 8.41968C21.2954 11.7828 20.3219 14.4239 18.8336 16.4248C17.291 18.4987 15.2386 19.8268 13.0751 20.5706C10.9179 21.3121 8.63863 21.4778 6.5967 21.2267C4.56816 20.9773 2.69304 20.3057 1.38605 19.2892C1.02813 19.0108 0.902313 18.5264 1.07951 18.109C1.25671 17.6916 1.69256 17.4457 2.14144 17.5099C3.42741 17.6936 4.6653 17.4012 5.6832 16.9832C5.48282 16.8742 5.29389 16.7562 5.11828 16.6346C4.19075 15.9925 3.4424 15.1208 3.10557 14.4471C2.96618 14.1684 2.96474 13.8405 3.10168 13.5606C3.17232 13.4161 3.27562 13.293 3.40104 13.1991C2.04677 12.0814 1.49999 10.5355 1.49999 9.49986C1.49999 9.19192 1.64187 8.90115 1.88459 8.71165C1.98665 8.63197 2.10175 8.57392 2.22308 8.53896C2.12174 8.24222 2.0431 7.94241 1.98316 7.65216C1.71739 6.3653 1.74098 4.91284 2.02985 3.75733C2.1287 3.36191 2.45764 3.06606 2.86129 3.00952C3.26493 2.95299 3.6625 3.14709 3.86618 3.50014C4.94369 5.36782 6.93116 6.50943 8.78086 7.18568C9.6505 7.50362 10.4559 7.70622 11.0596 7.83078C11.1899 6.61019 11.5307 5.6036 12.0538 4.80411C12.7439 3.74932 13.7064 3.12525 14.74 2.84698C16.5227 2.36708 18.5008 2.91382 19.7828 3.91825ZM10.7484 9.80845C10.0633 9.67087 9.12171 9.43976 8.09412 9.06408C6.7369 8.56789 5.16088 7.79418 3.84072 6.59571C3.86435 6.81625 3.89789 7.03492 3.94183 7.24766C4.16308 8.31899 4.5742 8.91899 4.94721 9.10549C5.40342 9.3336 5.61484 9.8685 5.43787 10.3469C5.19827 10.9946 4.56809 11.0477 3.99551 10.9046C4.45603 11.595 5.28377 12.2834 6.66439 12.5135C7.14057 12.5929 7.49208 13.0011 7.49986 13.4838C7.50765 13.9665 7.16949 14.3858 6.69611 14.4805L5.82565 14.6546C5.95881 14.7703 6.103 14.8838 6.2567 14.9902C6.95362 15.4727 7.65336 15.6808 8.25746 15.5298C8.70991 15.4167 9.18047 15.6313 9.39163 16.0472C9.60278 16.463 9.49846 16.9696 9.14018 17.2681C8.49626 17.8041 7.74425 18.2342 6.99057 18.5911C6.63675 18.7587 6.24134 18.9241 5.8119 19.0697C6.14218 19.1402 6.48586 19.198 6.84078 19.2417C8.61136 19.4594 10.5821 19.3126 12.4249 18.6792C14.2614 18.0479 15.9589 16.9385 17.2289 15.2312C18.497 13.5262 19.382 11.1667 19.5007 7.96291C19.51 7.71067 19.6144 7.47129 19.7929 7.29281C20.2425 6.84316 20.6141 6.32777 20.7969 5.7143C20.477 5.81403 20.1168 5.90035 19.6878 5.98237C19.3623 6.04459 19.0272 5.94156 18.7929 5.70727C18.0284 4.94274 16.5164 4.43998 15.2599 4.77822C14.6686 4.93741 14.1311 5.28203 13.7274 5.89906C13.3153 6.52904 13 7.51045 13 8.9999C13 9.28288 12.8801 9.5526 12.6701 9.74221C12.1721 10.1917 11.334 9.92603 10.7484 9.80845Z" fill="#0F0F0F"/>
                        </svg>
                        <p class="modal-social"> Twitter </p>
                    </a>
                </div>
            </div>

            <h3>Copy Link</h3>

            <div class="copy-link-section">
                <form class="ysp-form">

                    <input type="text" value="<?php echo esc_url(get_permalink()); ?>" id="shareLinkInput" readonly />
                    <button class="ysp-btn" onclick="copyLink()">Copy Link</button>
                </form>
            </div>
        </div>
    </div>
</div>

</main><!-- #main -->

<?php
//get_sidebar();
get_footer();
