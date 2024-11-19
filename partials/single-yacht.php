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

            $vessel = (object) $vessel; 

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
                        include 'yacht-results-card.php';
                    }

                    wp_reset_postdata();
                ?>
            </div>
        </div>
    <?php
    endwhile; // End of the loop.
    ?>

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
