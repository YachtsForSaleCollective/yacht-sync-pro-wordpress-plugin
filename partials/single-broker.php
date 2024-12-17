<?php
get_header();
?>

<main id="primary" class="site-main ysp-single-b-container">
    <?php
    while (have_posts()) :
        the_post();

        $meta = get_post_meta($post->ID);

        foreach ($meta as $indexM => $valM) {
            if (is_array($valM) && !isset($valM[1])) {
                $meta[$indexM] = $valM[0];
            }
        }
        // var_dump($meta);
    ?>


        <div class="ysp-single-b-split">

            <div class="ysp-single-b-main">

                <div class="ysp-single-b-card ysp-single-b-section">
                    <img src="<?php echo esc_url(get_the_post_thumbnail_url())?>" alt="profile-picture" class="broker-image" />

                    <div>
                        <h1 class="broker-name"><?php echo($meta["ysp_team_fname"] . " " . $meta["ysp_team_lname"]); ?></h1>
                        <span class="broker-title"><?php echo empty($meta['ysp_team_title'])?'Broker':$meta['ysp_team_title']; ?></span><br />
                        <span class="broker-email">
                            <a href="mailto: <?php echo($meta["ysp_team_email"]); ?>; ">
                                <?php echo($meta["ysp_team_email"]); ?>        
                            </a>
                        </span><br />
                        <span class="broker-phone">
                            <a href="tel: <?php echo($meta["ysp_team_phone"]); ?>;">
                                <?php echo($meta["ysp_team_phone"]); ?>
                            </a>
                        </span>
                        <br />
                        <br />

                        <?php the_content(); ?>
                    </div>

                </div>

                <div class=" ysp-single-b-section">
                    <!-- <h2 class="our-team">
                        Broker's Featured Listings
                    </h2> -->

                    <div id="listings"></div>

                    <?php echo do_shortcode('[ys-featured-listings posts_per_page="12" ys_broker_name="'. $meta['ysp_team_fname'] .' '. $meta['ysp_team_lname'] .'"][/ys-featured-listings]'); ?>
                </div>
            </div>

            <div class="ysp-single-b-sidebar">

                <div class="">

                    <form class="ysp-single-b-contact-form ysp-form ysp-lead-form ysp-lead-form-v2" action="/wp-json/ysp/lead-v2" method="post">

                        <div class="hide-after-submit">
                            <input type="hidden" name="WhichBrokerID" value="<?= $post->ID ?>" />

                            <div class="ysp-lead-form-row">
                                <input type="text" name="fname" placeholder="First Name" />
                                <input type="text" name="lname" placeholder="Last Name" />
                            </div>

                            <input type="text" name="email" placeholder="Email" />
                            <input type="text" name="phone" placeholder="Phone Number" />

                            <textarea name="message" rows="8" placeholder="Message"></textarea>

                            <button type="submit" class="ysp-btn ysp-btn-block">Send Message</button>
                        </div>

                        <div class="success-message">
                            <p>Thank you for getting in touch. We will be in touch shortly.</p>
                        </div>
                    </form>
                </div>

            </div>

        </div>

    <?php
        endwhile; // End of the loop.
    ?>

</main><!-- #main -->

<?php
//get_sidebar();
get_footer();
