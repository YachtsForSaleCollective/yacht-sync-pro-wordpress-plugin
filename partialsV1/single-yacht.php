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
<main id="primary" class="site-main">
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

        $vessel = (object) $vessel; ?>

        <div class="yacht-general-info">
            <div class="yacht-name-price-info">
                <h1 class="yacht-title" style="text-align: center;">
                    <?php echo ($vessel->ModelYear . ' ' . $vessel->MakeString . ' ' . $vessel->BoatName) ?>
                </h1>
                <h2 class="yacht-price"  style="text-align: center;">
                <?php
                    if ($YSP_Euro_Opt == "yes") {
                        echo '€' . number_format($vessel->YSP_EuroVal) . ' ' . 'EUR';
                    } else {
                        echo '$' . number_format($vessel->YSP_USDVal);
                    }
                ?>
                | <?php echo ($vessel->MakeString); ?> | <?php echo ($vessel->ModelYear) ?>
                </h2>
                <br />
            </div>
        </div>

        <div class="yacht-image-container">
            <img class="big-image" src="<?php echo ($vessel->Images[0]->Uri); ?>" alt="yacht-image-carousel"/>
            
            <div class="TwoXTwo">
                <img class="yacht-image" src="<?php echo ($vessel->Images[1]->Uri); ?>" alt="yacht-image-carousel"/>
                <img class="yacht-image" src="<?php echo ($vessel->Images[2]->Uri); ?>" alt="yacht-image-carousel"/>
                <img class="yacht-image" src="<?php echo ($vessel->Images[3]->Uri); ?>" alt="yacht-image-carousel"/>
                <img class="yacht-image" src="<?php echo ($vessel->Images[4]->Uri); ?>" alt="yacht-image-carousel"/>     
            </div>

<!-- 
            <div id="lightgallery" class="carousel carousel-main yacht-main-image-container">
                <?php foreach($vessel->Images as $imageObject) { ?>
                    <div class="carousel-cell" data-src="<?php echo ($imageObject->Uri); ?>">
                        <img class="yacht-image" src="<?php echo ($imageObject->Uri); ?>" alt="yacht-image-carousel"/>
                    </div>
                <?php } ?>
            </div> -->
        </div>

        <div class="yacht-main-info-container">
            <div class="yacht-main-info">
                <div class="yacht-length">
                    <div class="yacht-length-text">
                        <img src="<?php echo YSP_ASSETS; ?>images/arrow-left-right.png" alt="length-icon" />
                        <p>Length</p>
                    </div>
                    <div class="yacht-length-value">
                        <p><?php echo empty($vessel->YSP_LOAFeet) ? "N/A" : $vessel->YSP_LOAFeet . "ft / " . $vessel->YSP_LOAMeter . ' m'; ?></p>
                    </div>
                </div>
                <div class="yacht-beam">
                    <div class="yacht-beam-text">
                        <img src="<?php echo YSP_ASSETS; ?>images/arrow-left-right.png" alt="beam-icon" />
                        <p>Beam</p>
                    </div>
                    <div class="yacht-beam-value">
                        <p><?php echo (empty($vessel->YSP_BeamFeet) ? 'N/A' : ($vessel->YSP_BeamFeet . 'ft /' . $vessel->YSP_BeamMeter . ' m')); ?></p>
                    </div>
                </div>
                <div class="yacht-cabins">
                    <div class="yacht-cabins-text">
                        <img src="<?php echo YSP_ASSETS; ?>images/bed-double.png" alt="bed-icon" />
                        <p>Cabins</p>
                    </div>
                    <div class="yacht-cabins-value">
                        <p><?php echo (empty($vessel->CabinsCountNumeric) ? 'N/A' : $vessel->CabinsCountNumeric); ?></p>
                    </div>
                </div>
                <div class="yacht-guests">
                    <div class="yacht-guests-text">
                        <img src="<?php echo YSP_ASSETS; ?>images/users.png" alt="beam-icon" />
                        <p>Guests</p>
                    </div>
                    <div class="yacht-guests-value">
                        <p>13</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="ysp-yacht-details">
            <div class="yacht-main-container">
                
              
                
                <div class="yacht-download-brochure-container">
                    <a rel="nofollow" href="<?php echo get_rest_url(); ?>ysp/yacht-pdf-loader?yacht_post_id=<?php echo get_the_ID(); ?>" target="_blank">
                        <button class="yacht-download-button">
                            <img src="<?php echo YSP_ASSETS; ?>images/download.png" alt="download-icon" />
                            Download Brochure
                        </button>
                    </a>

                    <a rel="nofollow" href="<?php echo get_rest_url(); ?>ysp/yacht-pdf-loader?template=salesproposal24&yacht_post_id=<?php echo get_the_ID(); ?>" target="_blank">
                        <button class="yacht-download-button">
                            <img src="<?php echo YSP_ASSETS; ?>images/download.png" alt="download-icon" />
                            Download Sells Proposal Brochure
                        </button>
                    </a>


                    <?php 
                        if(isset($vessel->Videos)) {
                            $videoUrls = $vessel->Videos->url;
                            
                            foreach($videoUrls as $aindex => $video) { ?>
                                <a data-src="<?php echo $video;?>">
                                    <button class="yacht-download-button" type="button">
                                        Open Video <?= ($aindex+1) ?>
                                    </button>
                                </a>
                            
                            <?php   
                            
                            }
                        }
                    ?>
            
                    <button class="yacht-download-button" type="button" data-modal="#single-share">Share</button>

                </div>
                
                    
                <?php
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
                    
                    if ($brokerQuery->have_posts()) {
                        while ($brokerQuery->have_posts()) {
                            $brokerQuery->the_post();

                            $broker_first_name = get_post_meta($post->ID, 'ysp_team_fname', true);
                            $broker_last_name = get_post_meta($post->ID, 'ysp_team_lname', true);
                            $broker_email = get_post_meta($post->ID, 'ysp_team_email', true);
                            $broker_phone = get_post_meta($post->ID, 'ysp_team_phone', true);
                            ?>
                            <div class="yacht-mobile-broker-container">
                                <div class="broker-profile-image">
                                    <a href="<?= get_the_permalink(); ?>">
                                        <img src="<?php echo esc_url(get_the_post_thumbnail_url()); ?>" alt="" style="width:120px; height:120px; object-fit: cover;" />
                                    </a>
                                </div>

                                <div class="broker-info">
                                    <p class="broker-name">
                                        <a href="<?= get_the_permalink(); ?>">
                                            <?php echo ($broker_first_name . " " . $broker_last_name); ?>    
                                        </a>
                                    </p>
                                     
                                    <p class="broker-title">Broker</p>
                                    <p class="broker-email"><a href="mailto:<?php echo $broker_email; ?>"><?php echo $broker_email; ?></a></p>
                                    <p class="broker-phone"><a href="tel:<?php echo $broker_phone; ?>"><?php echo $broker_phone; ?></a></p>
                                </div>
                            </div>
                            <?php
                        }
                        wp_reset_postdata();
                    }
                    ?>

                <div class="yacht-mobile-form-container">
                    <p class="yacht-form-title">Inquire Now</p>
                    <form class="single-yacht-detils-lead" action="/submit" method="post">
                        <div>
                        <input type="hidden" id="yatchHidden" name="yatchHidden" value="<?php echo ($vessel->ModelYear . ' ' . $vessel->MakeString . ' ' . $vessel->BoatName) ?>">
                        </div>
                        <div>
                            <label for="fname">First name</label>
                            <input type="text" id="fname" name="fname" placeholder="First name" required />
                        </div>
                        <div>
                            <label for="lname">Last name</label>
                            <input type="text" id="lname" name="lname" placeholder="Last name" required />
                        </div>
                        <div>
                            <label for="email">E-mail</label>
                            <input type="email" id="email" name="email" placeholder="name@email.com" required />
                        </div>
                        <div>
                            <label for="phone">Phone number</label>
                            <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="+1 (777) 777-7777" required />
                        </div>
                        <div style="display: none;">
                        <input type="text"  name="fax">
                        </div>
                        <div>
                            <label for="inquirytype">Inquiry type</label>
                            <select>
                                <option value="Buying a yacht" selected>Buying a yacht</option>
                                <option value="Selling a yacht">Selling a yacht</option>
                                <option value="Trading a yacht">Trading a yacht</option>
                            </select>
                        </div>
                        <div>
                            <label for="message">Message</label>
                            <textarea id="message" name="message" placeholder="Type your message"></textarea>
                        </div>
                        <div>
                            <p class="form-disclaimer">Your privacy is important to us; to learn about how we protect it, read our <a href="#">privacy policy.</a></p>
                        </div>
                        <input class="yacht-form-submit" type="submit" value="Send Message" />


                    </form>
                    <div class="success-message" style="display: none; background-color: #4CAF50; color: #fff; padding: 10px; text-align: center;">
                        <p class="success-messages">Thank you for getting in touch. We will be in touch shortly.</p>
                    </div>

                </div>
                <div class="yacht-general-description-container">
                    <p class="yacht-description-label">
                        Description
                    </p>
                    <div class="yacht-description-value">
                        <?php 
                            if (isset($vessel->GeneralBoatDescription) && is_array($vessel->GeneralBoatDescription)) { 
                                echo join(" ", $vessel->GeneralBoatDescription); 
                            }
                            elseif (isset($vessel->GeneralBoatDescription) && is_string($vessel->GeneralBoatDescription)) {
                                echo $vessel->GeneralBoatDescription;
                            } 
                        ?>
                    </div>
                </div>
               <!--  <div class="yacht-specs-container">
                    <p class="yacht-specs-label">
                        Specifications
                    </p>
                    <div class="yacht-specs-value">
                        <div class="yacht-specs-item">
                            <p class="specification-name">Make</p>
                            <p class="specification-value"><?php echo empty($vessel->MakeString) ? "N/A" : $vessel->MakeString; ?></p>
                        </div>
                        <div class="yacht-specs-item">
                            <p class="specification-name">Model</p>
                            <p class="specification-value"><?php echo empty($vessel->Model) ? "N/A" : $vessel->Model; ?></p>
                        </div>
                        <div class="yacht-specs-item">
                            <p class="specification-name">Year</p>
                            <p class="specification-value"><?php echo empty($vessel->ModelYear) ? "N/A" : $vessel->ModelYear; ?></p>
                        </div>
                        <div class="yacht-specs-item">
                            <p class="specification-name">Class</p>
                            <p class="specification-value"><?php echo empty($vessel->BoatCategoryCode) ? "N/A" : $vessel->BoatCategoryCode; ?></p>
                        </div>
                        <div class="yacht-specs-item">
                            <p class="specification-name">Price</p>
                            <p class="specification-value"><?php echo empty($vessel->Price) ? "N/A" : '$' . $vessel->Price; ?></p>
                        </div>
                        <div class="yacht-specs-item">
                            <p class="specification-name">Fuel Tank Capacity</p>
                            <p class="specification-value"><?php echo empty($vessel->FuelTankCapacityMeasure) ? "N/A" : $vessel->FuelTankCapacityMeasure; ?></p>
                        </div>
                        <div class="yacht-specs-item">
                            <p class="specification-name">Hull Material</p>
                            <p class="specification-value"><?php echo empty($vessel->BoatHullMaterialCode) ? "N/A" : $vessel->BoatHullMaterialCode; ?></p>
                        </div>
                    </div>
                </div> -->
                <div class="yacht-full-details-container">
                    <p class="yacht-details-label">
                        Full Details
                    </p>
                    <div class="yacht-details-value">
                        <div class="yacht-accordion-item">
                            <span class="yacht-accordion-name">
                                General Info
                            </span>
                            <span class="yacht-accordion-arrow">
                                <img class="yacht-arrow" src="<?php echo YSP_ASSETS; ?>images/chevron-down.png" alt="down-arrow-icon" />
                            </span>
                        </div>
                        <div class="yacht-accordion-display">
                            <p class="yacht-accordion-display-item">Make: <span class="yacht-accordion-display-value"><?php echo empty($vessel->MakeString) ? "N/A" : $vessel->MakeString; ?></span></p>
                            <p class="yacht-accordion-display-item">Model: <span class="yacht-accordion-display-value"><?php echo empty($vessel->Model) ? "N/A" : $vessel->Model; ?></span></p>
                            <p class="yacht-accordion-display-item">Condition: <span class="yacht-accordion-display-value"><?php echo empty($vessel->SaleClassCode) ? "N/A" : $vessel->SaleClassCode; ?></span></p>
                            <p class="yacht-accordion-display-item">Class: <span class="yacht-accordion-display-value"><?php echo empty($vessel->BoatCategoryCode) ? "N/A" : $vessel->BoatCategoryCode; ?></span></p>
                            <p class="yacht-accordion-display-item">Construction: <span class="yacht-accordion-display-value"><?php echo empty($vessel->BoatHullMaterialCode) ? "N/A" : $vessel->BoatHullMaterialCode; ?></span></p>
                            <p class="yacht-accordion-display-item">Boat Hull ID: <span class="yacht-accordion-display-value"><?php echo empty($vessel->BoatHullID) ? "N/A" : $vessel->BoatHullID; ?></span></p>
                            <p class="yacht-accordion-display-item">Has Hull ID: <span class="yacht-accordion-display-value"><?php echo empty($vessel->HasBoatHullID) ? "No" : ($vessel->HasBoatHullID == '1' ? 'Yes' : "N/A");  ?></span></p>
                        </div>
                        <div class="yacht-accordion-item">
                            <span class="yacht-accordion-name">
                                Measurements
                            </span>
                            <span class="yacht-accordion-arrow">
                                <img class="yacht-arrow" src="<?php echo YSP_ASSETS; ?>images/chevron-down.png" alt="down-arrow-icon" />
                            </span>
                        </div>
                        <div class="yacht-accordion-display">
                            <p class="yacht-accordion-display-item">Length: <span class="yacht-accordion-display-value"><?php echo empty($vessel->NominalLength) ? "N/A" : $vessel->NominalLength . " / " . round((float)$vessel->NominalLength * 0.3048, 2) . ' m'; ?></span></p>
                            <p class="yacht-accordion-display-item">Length Overall: <span class="yacht-accordion-display-value"><?php echo empty($vessel->LengthOverall) ? "N/A" : $vessel->LengthOverall . " / " . round((float)$vessel->LengthOverall * 0.3048, 2) . ' m'; ?></span></p>
                            <p class="yacht-accordion-display-item">Beam: <span class="yacht-accordion-display-value"><?php echo empty($vessel->BeamMeasure) ? "N/A" : $vessel->BeamMeasure . " / " . round((float)$vessel->BeamMeasure * 0.3048, 2) . ' m'; ?></span></p>
                        </div>
                        <?php if (!empty($vessel->Engines[0])) { ?>
                            <div class="yacht-accordion-item">
                                <span class="yacht-accordion-name">
                                    Engine 1
                                </span>
                                <span class="yacht-accordion-arrow">
                                    <img class="yacht-arrow" src="<?php echo YSP_ASSETS; ?>images/chevron-down.png" alt="down-arrow-icon" />
                                </span>
                            </div>
                            <div class="yacht-accordion-display">
                                <p class="yacht-accordion-display-item">Make: <span class="yacht-accordion-display-value"><?php echo empty($vessel->Engines[0]->Make) ? "N/A" : $vessel->Engines[0]->Make; ?></span></p>
                                <p class="yacht-accordion-display-item">Model: <span class="yacht-accordion-display-value"><?php echo empty($vessel->Engines[0]->Model) ? "N/A" : $vessel->Engines[0]->Model; ?></span></p>
                                <p class="yacht-accordion-display-item">Fuel: <span class="yacht-accordion-display-value"><?php echo empty($vessel->Engines[0]->Fuel) ? "N/A" : $vessel->Engines[0]->Fuel; ?></span></p>
                                <p class="yacht-accordion-display-item">Engine Power: <span class="yacht-accordion-display-value"><?php echo empty($vessel->Engines[0]->EnginePower) ? "N/A" : $vessel->Engines[0]->EnginePower; ?></span></p>
                                <p class="yacht-accordion-display-item">Type: <span class="yacht-accordion-display-value"><?php echo empty($vessel->Engines[0]->Type) ? "N/A" : $vessel->Engines[0]->Type; ?></span></p>
                                <p class="yacht-accordion-display-item">Engine Hours: <span class="yacht-accordion-display-value"><?php echo empty($vessel->Engines[0]->Hours) ? "N/A" : $vessel->Engines[0]->Hours; ?></span></p>
                            </div>
                        <?php }
                        if (!empty($vessel->Engines[1])) { ?>
                            <div class="yacht-accordion-item">
                                <span class="yacht-accordion-name">
                                    Engine 2
                                </span>
                                <span class="yacht-accordion-arrow">
                                    <img class="yacht-arrow" src="<?php echo YSP_ASSETS; ?>images/chevron-down.png" alt="down-arrow-icon" />
                                </>
                            </div>
                            <div class="yacht-accordion-display">
                                <p class="yacht-accordion-display-item">Make: <span class="yacht-accordion-display-value"><?php echo empty($vessel->Engines[1]->Make) ? "N/A" : $vessel->Engines[1]->Make; ?></span></p>
                                <p class="yacht-accordion-display-item">Model: <span class="yacht-accordion-display-value"><?php echo empty($vessel->Engines[1]->Model) ? "N/A" : $vessel->Engines[1]->Model; ?></span></p>
                                <p class="yacht-accordion-display-item">Fuel: <span class="yacht-accordion-display-value"><?php echo empty($vessel->Engines[1]->Fuel) ? "N/A" : $vessel->Engines[1]->Fuel; ?></span></p>
                                <p class="yacht-accordion-display-item">Engine Power: <span class="yacht-accordion-display-value"><?php echo empty($vessel->Engines[1]->EnginePower) ? "N/A" : $vessel->Engines[1]->EnginePower; ?></span></p>
                                <p class="yacht-accordion-display-item">Type: <span class="yacht-accordion-display-value"><?php echo empty($vessel->Engines[1]->Type) ? "N/A" : $vessel->Engines[1]->Type; ?></span></p>
                                <p class="yacht-accordion-display-item">Engine Hours: <span class="yacht-accordion-display-value"><?php echo empty($vessel->Engines[1]->Hours) ? "N/A" : $vessel->Engines[1]->Hours; ?></span></p>
                            </div>
                        <?php } ?>
                       
                    </div>
                </div>
            </div>
            <div class="secondary-container">
                <div class="secondary-sub-container">
                <?php

                    if ($brokerQuery->have_posts()) {
                        while ($brokerQuery->have_posts()) {
                            $brokerQuery->the_post();

                            $broker_first_name = get_post_meta($post->ID, 'ysp_team_fname', true);
                            $broker_last_name = get_post_meta($post->ID, 'ysp_team_lname', true);
                            $broker_email = get_post_meta($post->ID, 'ysp_team_email', true);
                            $broker_phone = get_post_meta($post->ID, 'ysp_team_phone', true);
                            ?>
                            <div class="broker-info-container">
                                <div class="broker-profile-image">
                                    <a href="<?= get_the_permalink(); ?>">
                                        <img src="<?php echo esc_url(get_the_post_thumbnail_url()); ?>" alt="" style="width:120px; height:120px; object-fit: cover;" />
                                    </a>
                                </div>
                                <div class="broker-info">
                                    <p class="broker-name">
                                        <a href="<?= get_the_permalink(); ?>">
                                            <?php echo ($broker_first_name . " " . $broker_last_name); ?>
                                        </a>                                    
                                    </p>

                                    <p class="broker-title">Broker</p>
                                    <p class="broker-email"><a href="mailto:<?php echo $broker_email; ?>"><?php echo $broker_email; ?></a></p>
                                    <p class="broker-phone"><a href="tel:<?php echo $broker_phone; ?>"><?php echo $broker_phone; ?></a></p>
                                </div>
                            </div>
                            <?php
                        }
                        wp_reset_postdata();
                    }
                    ?>

                    <div class="yacht-form-container">
                        <p class="yacht-form-title">Inquire Now</p>
                        <form class="single-yacht-detils-lead" action="/submit" method="post">
                            <div>
                            <input type="hidden" id="yatchHidden" name="yatchHidden" value="<?php echo ($vessel->ModelYear . ' ' . $vessel->MakeString . ' ' . $vessel->BoatName) ?>">
                            </div>
                            <div>
                                <label for="fname">First name</label>
                                <input type="text" id="fname" name="fname" placeholder="First name" required />
                            </div>
                            <div>
                                <label for="lname">Last name</label>
                                <input type="text" id="lname" name="lname" placeholder="Last name" required />
                            </div>
                            <div>
                                <label for="email">E-mail</label>
                                <input type="email" id="email" name="email" placeholder="name@email.com" required />
                            </div>
                            <div>
                                <label for="phone">Phone number</label>
                                <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="+1 (777) 777-7777" required />
                            </div>
                            <div style="display: none;">
                            <input type="text" name="fax">
                            </div>
                            <div>
                                <label for="inquirytype">Inquiry type</label>
                                <select>
                                    <option value="Buying a yacht" selected>Buying a yacht</option>
                                    <option value="Selling a yacht">Selling a yacht</option>
                                    <option value="Trading a yacht">Trading a yacht</option>
                                </select>
                            </div>
                            <div>
                                <label for="message">Message</label>
                                <textarea id="message" name="message" placeholder="Type your message"></textarea>
                            </div>
                            <div>
                                <p class="form-disclaimer">Your privacy is important to us; to learn about how we protect it, read our <a href="#">privacy policy.</a></p>
                            </div>
                            <input class="yacht-form-submit" type="submit" value="Send Message" />
                        </form>
                        <div class="success-message" style="display: none; background-color: #4CAF50; color: #fff; padding: 10px; text-align: center;">
                        <p class="success-messages">Thank you for getting in touch. We will be in touch shortly.</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="similar-listings-container">
            <h3 class="similar-listings-title">
                Similar Listings
            </h3>
            
            <hr />
            
            <div class="yacht-similar-listing-row">

                <?php
                    $yachtQuery = new WP_Query(array(
                        'post_type' => 'ysp_yacht',
                        'similar_listings_to' => get_the_ID(),

                        'posts_per_page' => 3,
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
                        include ('result-card.php');
                    }

                    wp_reset_postdata();
                ?>
            </div>
        </div>

        <script>
            document.addEventListener('DOMContentLoaded', function() {
                const accordions = document.querySelectorAll('.yacht-accordion-item');
                accordions.forEach(function(accordion, index) {
                    accordion.addEventListener('click', function() {
                        const arrowElement = document.querySelectorAll('.yacht-arrow')[index];
                        const displayElement = document.querySelectorAll('.yacht-accordion-display')[index];
                        arrowElement.style.transform = (displayElement.style.display === 'none' || displayElement.style.display === '') ? 'rotate(180deg)' : 'rotate(0deg)';
                        displayElement.style.display = (displayElement.style.display === 'none' || displayElement.style.display === '') ? 'block' : 'none';
                    });
                });
            });
        </script>

    <?php
    endwhile; // End of the loop.
    ?>

<link rel="stylesheet" type="text/css" href="styles.css">

<?php
$image = $vessel->Images[0];
?>
<div class="ysp-modal" id="single-share">
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
