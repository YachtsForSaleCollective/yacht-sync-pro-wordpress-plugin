<?php get_header(); ?>

<?php
    foreach ($boats as $key => $boat_post) {
        $meta = get_post_meta($boat_post->ID);

        foreach ($meta as $indexM => $valM) {
            if (is_array($valM) && !isset($valM[1])) {
                $meta[$indexM] = $valM[0];
            }
        }

        $vessel = array_map("maybe_unserialize", $meta);
        $vessel = (object) $vessel;
        $boats[$key]->yacht = $vessel;
    }
    $YSP_Options = new YachtSyncPro_Options();
    $YSP_logo = $YSP_Options->get('company_logo');
    $YSP_Comapny_logo = $YSP_Options->get('company_logo');;
    $company_logo_url = wp_get_attachment_image_url($YSP_Comapny_logo, 'full');

    $search_page_url= get_permalink($YSP_Options->get('yacht_search_page_id'));
?>
<div class="ysp-compare-yachts-container">
    <h1 style="text-align: center; margin: 20px 0px;">Compare Yachts</h1>

    <p style="text-align: center;">     
        <a href="<?= $search_page_url ?>">
            <img src="<?= YSP_ASSETS ?>images/blue_arrow_left.svg" alt="Back" title="Back" width="22" height="22" /> 
            Back To Search
        </a>
    </p>

    <!-- <div class="ysp-compare-logo-container">
        <img style="margin: auto;" src="<?php echo esc_url($company_logo_url); ?>" alt="Company Logo" style="height: 120px; width: 120px; " />
    </div> -->

    <table class="ysp-yacht-compare-supporting-container">
        <thead>
            <tr>
                <th>Yacht Compare Tool</th>

                <?php foreach ($boats as $boat_post) : ?>
                    <th><?= $boat_post->post_title ?></th>
                <?php endforeach; ?>
            </tr>
        </thead>

        <tbody>
            <tr>
                <th>Image</th>

                <?php foreach ($boats as $boat_post) : ?>
                    <td><img src="<?php echo $boat_post->Images[0]->Uri; ?>" alt="Yacht Image" style="width: 100%; object-fit: cover;" /></td>
                <?php endforeach; ?>
            </tr>

            <tr>
                <th>Make</th>

                <?php foreach ($boats as $boat_post) : ?>
                    <td><?php echo empty($vessel->MakeString) ? "N/A" : $vessel->MakeString; ?></td>
                <?php endforeach; ?>
            </tr>

            <tr>
                <th>Model</th>

                <?php foreach ($boats as $boat_post) : ?>
                    <td><?php echo empty($vessel->Model) ? "N/A" : $vessel->Model; ?></td>
                <?php endforeach; ?>
            </tr>

            <tr>
                <th>Condition</th>
                
                <?php foreach ($boats as $boat_post) : ?>
                    <td><?php echo empty($vessel->SaleClassCode) ? "N/A" : $vessel->SaleClassCode; ?></td>
                <?php endforeach; ?>
            </tr>

            <tr>
                <th>Price</th>
            
                <?php foreach ($boats as $boat_post) : ?>
                    <td><?php echo empty($boat_post->Price) ? "N/A" : number_format(intval($boat_post->Price), 2); ?></td>
                <?php endforeach; ?>
            </tr>

            <tr>
                <th>Class</th>

                <?php foreach ($boats as $boat_post) : ?>
                    <td><?php echo empty($vessel->BoatCategoryCode) ? "N/A" : $vessel->BoatCategoryCode;?></td>
                <?php endforeach; ?>
            </tr>

            <tr>
                <th>Construction</th>
                
                <?php foreach ($boats as $boat_post) : ?>
                    <td><?php echo empty($vessel->BoatHullMaterialCode) ? "N/A" : $vessel->BoatHullMaterialCode; ?></td>
                <?php endforeach; ?>
            </tr>

            <tr>
                <th>Boat Hull ID</th>
            
                <?php foreach ($boats as $boat_post) : ?>
                    <td><?php  echo empty($vessel->BoatHullID) ? "N/A" : $vessel->BoatHullID; ?></td>
                <?php endforeach; ?>
            </tr>

            <tr>
                <th>Has Hull ID</th>
                
                <?php foreach ($boats as $boat_post) : ?>
                    <td><?php echo empty($vessel->HasBoatHullID) ? "No" : ($vessel->HasBoatHullID == '1' ? 'Yes' : "N/A");  ?></td>
                <?php endforeach; ?>
            </tr>

            <tr>
                <th>Year</th>

                <?php foreach ($boats as $boat_post) : ?>
                    <td><?php  echo $boat_post->ModelYear; ?></td>
                <?php endforeach; ?>
            </tr>

            <tr>
                <th>Length</th>

                <?php foreach ($boats as $boat_post) : ?>
                    <td><?php  echo empty($vessel->NominalLength) ? "N/A" : $vessel->NominalLength . " / " . round((float)$vessel->NominalLength * 0.3048, 2) . ' m';  ?></td>
                <?php endforeach; ?>
            </tr>

            <tr>
                <th>Beam</th>

                <?php foreach ($boats as $boat_post) : ?>
                    <td><?php echo (empty($vessel->BeamMeasure) ? 'N/A' : ($vessel->BeamMeasure . '/' . (number_format((substr($vessel->BeamMeasure, 0, -3) * 0.3048), 1) . ' m'))); ?></td>
                <?php endforeach; ?>
            </tr>

            <tr>
                <th>Engine Make</th>

                <?php foreach ($boats as $boat_post) : ?>
                    <td><?php echo empty($boat_post->Engines[0]->Make) ? "N/A" : $boat_post->Engines[0]->Make; ?></td>
                <?php endforeach; ?>
            </tr>

            <tr>
                <th>Engine Model</th>

                <?php foreach ($boats as $boat_post) : ?>
                    <td><?php echo empty($boat_post->Engines[0]->Model) ? "N/A" : $boat_post->Engines[0]->Model ?></td>
                <?php endforeach; ?>
            </tr>

            <tr>
                <th>Fuel</th>

                <?php foreach ($boats as $boat_post) : ?>
                    <td><?php echo empty($boat_post->Engines[0]->Fuel) ? "N/A" : $boat_post->Engines[0]->Fuel; ?></td>
                <?php endforeach; ?>
            </tr>

            <tr>
                <th>Engine Power</th>

                <?php foreach ($boats as $boat_post) : ?>
                    <td><?php echo empty($boat_post->Engines[0]->EnginePower) ? "N/A" : $boat_post->Engines[0]->EnginePower; ?></td>
                <?php endforeach; ?>
            </tr>
                
            <tr>
                <th>Type</th>

                <?php foreach ($boats as $boat_post) : ?>
                    <td><?php echo empty($boat_post->Engines[0]->Type) ? "N/A" : $boat_post->Engines[0]->Type; ?></td>
                <?php endforeach; ?>
            </tr>

            <tr>
                <th>Engine Hours</th>

                <?php foreach ($boats as $boat_post) : ?>
                    <td><?php echo empty($boat_post->Engines[0]->Hours) ? "N/A" : number_format(intval($boat_post->Engines[0]->Hours)); ?></td>
                <?php endforeach; ?>
            </tr>

            <tr>
                <th>Actions</th>

                <?php foreach ($boats as $boat_post) : 
                    $current_url = $actual_link = (empty($_SERVER['HTTPS']) ? 'http' : 'https') . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
                    $link=str_replace([$boat_post->ID.',', ','.$boat_post->ID, $boat_post->ID], ['', '', ''], $current_url);

                    ?>
                    <td>
                        <a class="ysp-remove-button" href="<?php echo get_the_permalink($boat_post->ID); ?>" class="button-link">
                            Yacht Details
                        </a>
                        &nbsp;
                        <a class="ysp-remove-button" href="<?php echo $link; ?>" class="button-link">
                            Remove Yacht
                        </a>
                    </td>
                <?php endforeach; ?>
            </tr>

        </tbody>
    </table>

    <p style="text-align: center;">
        <a href="javascript: window.print();">Print This Out</a>
    </p>
</div>
<?php get_footer(); 