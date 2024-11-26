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
                        <p class="broker-title">Broker</p>
                        <p class="broker-email">
                            <a href="mailto: <?php echo($meta["ysp_team_email"]); ?>; ">
                                <?php echo($meta["ysp_team_email"]); ?>        
                            </a>
                        </p>
                        <p class="broker-phone">
                            <a href="tel: <?php echo($meta["ysp_team_phone"]); ?>;">
                                <?php echo($meta["ysp_team_phone"]); ?>
                            </a>
                        </p>
                    </div>

                </div>

                <div class=" ysp-single-b-section">
                    <h2 class="our-team">
                        Broker's Featured Listings
                    </h2>

                    <?php echo do_shortcode('[ys-featured-listings posts_per_page="12" ys_broker_name="'. $meta['ysp_team_fname'] .' '. $meta['ysp_team_lname'] .'"][/ys-featured-listings]'); ?>
                </div>
            </div>

            <div class="ysp-single-b-sidebar">

                <div class="">

                    <h2>Hit Me Up!</h2>

                    <form class="ysp-single-b-contact-form">
                        <input type="text" name="fullname" placeholder="Full Name" />
                        <input type="text" name="email" placeholder="Email" />
                        <input type="text" name="phone" placeholder="Phone Number" />

                        <textarea name="message" rows="8" placeholder="Message"></textarea>

                        <button type="submit" class="ysp-btn ysp-btn-block">Send Message</button>
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
