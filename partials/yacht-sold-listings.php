<div class="ysp-sold-listings-container">
    <form id="ysp-sold-form" class="ysp-yacht-search-form" method="get">
        <div style="display: flex; margin-bottom: 30px;">
            <input type="search" name="keyword" placeholder="SEARCH BY KEYWORD" list="ysp_keywords_list" style="margin-right: 15px; height: auto;" value="<?= (isset($_GET['keyword']))?$_GET['keyword']:'' ?>">

            <button type="submit" class="ysp-general-button" style="width: 100px;">SEARCH</button>
        </div>
    </form>

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

    <div id="ysp-yacht-results-pagination">
        <?php  
            $big = 999999999; // need an unlikely integer

            echo paginate_links( array(
                'type' => 'list', 
                'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
                'format' => '?paged=%#%',
                'current' => max( 1, get_query_var('paged') ),
                'total' => $yachtQuery->max_num_pages
            ) );
        ?>
    </div>
</div>