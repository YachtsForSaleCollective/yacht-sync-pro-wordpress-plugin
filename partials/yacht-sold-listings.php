<div class="ysp-sold-listings-container">
    <div class="yacht-sold-listing-row">
        <?php
        while ($yachtQuery->have_posts()) {
            $yachtQuery->the_post();

            $meta = get_post_meta($yachtQuery->post->ID);

            foreach ($meta as $indexM => $valM) {
                if (is_array($valM) && !isset($valM[1])) {
                    $meta[$indexM] = $valM[0];
                }
            }

            $meta2 = array_map("maybe_unserialize", $meta);

            $meta2['_link'] = get_permalink($yachtQuery->post->ID);

            $yacht = $meta2;
            include('result-sold-card.php');
        }

        wp_reset_postdata();
        ?>
    </div>
</div>