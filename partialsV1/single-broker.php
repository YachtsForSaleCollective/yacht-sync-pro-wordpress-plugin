<?php
get_header();
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
        // var_dump($meta);
    ?>

        <div class="ysp-single-broker">
            <div class="broker-main-container">
                <h2 class="our-team">Our Team</h2>
                
                <div class="broker-info-container">
                    <div class="broker-image-general-container">
                        <div class="broker-image">
                            <img src="<?php echo esc_url(get_the_post_thumbnail_url())?>" alt="profile-picture" />
                        </div>
                        <div class="broker-general-info">
                            <p class="broker-name"><?php echo($meta["ysp_team_fname"] . " " . $meta["ysp_team_lname"]); ?></p>
                            <p class="broker-title">Broker</p>
                            <p class="broker-email"><?php echo($meta["ysp_team_email"]); ?></p>
                            <p class="broker-phone"><?php echo($meta["ysp_team_phone"]); ?></p>
                        </div>
                    </div>
                    <div class="broker-general-description-container">
                        <?php the_content(); ?>
                    </div>
                </div>

                <h2 class="our-team">
                    <?php echo($meta["ysp_team_fname"] . " " . $meta["ysp_team_lname"]); ?>'s Listings
                </h2>

                <?php echo do_shortcode('[ys-featured-listings ys_broker_name="'. $meta['ysp_team_fname'] .' '. $meta['ysp_team_lname'] .'"][/ys-featured-listings]'); ?>

            </div>
            <div class="second-main-container">
                <div class="broker-form-container">
                    <p class="broker-form-title">Inquire Now</p>
                    <form class="single-broker-detils-lead" action="/submit" method="post">
                        <input type="hidden" name="brokerID" value="<?php echo $post->ID; ?>" />

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
                        <input class="broker-form-submit" type="submit" value="Send" />
                    </form>
                    <div class="success-message" style="display: none; background-color: #4CAF50; color: #fff; padding: 10px; text-align: center;">
                        <p class="success-messages">Thank you for getting in touch. We will be in touch shortly.</p>
                    </div>
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
