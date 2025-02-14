<?php

$YSP_Options = new YachtSyncPro_Options();

$meta = get_post_meta($yacht_post_id);

foreach ($meta as $indexM => $valM) {
    if (is_array($valM) && ! isset($valM[1])) {
        $meta[$indexM] = $valM[0];
    }
}

$vessel = array_map("maybe_unserialize", $meta);

$vessel = (object) $vessel;


if ( $vessel->BoatName != null ) {
    $vesselH1 = $vessel->ModelYear . " " . $vessel->MakeString . " " . $vessel->Model . " " . $vessel->BoatName;
} else {
    $vesselH1 = $vessel->ModelYear . " " . $vessel->MakeString . " " . $vessel->Model;
}

$price = ($vessel->Price && $vessel->Price != "0.00 USD" && $vessel->Price != "1.00 USD") ? number_format((trim(str_replace(['EUR', 'USD'], '', $vessel->Price)))) : "Contact Us For Price";

$itemReceivedDate = $vessel->ItemReceivedDate;
$itemDate = strtotime($itemReceivedDate);

$beam = $vessel->BeamMeasure;

$beamMeters = sprintf("%0.2f", $beamMeters);
$boatHullID = $vessel->BoatHullID;
$boatCity = $vessel->BoatLocation->BoatCityName;
$boatState = $vessel->BoatLocation->BoatStateCode;
$boatCountry = $vessel->BoatLocation->BoatCountryID;

if ($boatState != ""){
    $boatLocation = $boatCity . ', ' . $boatState;
} else {
    $boatLocation = $boatCity . ', ' . $boatCountry;
}

$cabin = $vessel->CabinHeadroomMeasure;
$cabinCount = $vessel->CabinsCountNumeric;
$category = $vessel->BoatCategoryCode;
$city = $vessel->Office->City;
$condition = $vessel->SaleClassCode;
$construction = $vessel->BoatHullMaterialCode;
$country = $vessel->Office->Country;
$cruisingSpeed = $vessel->CruisingSpeedMeasure;
$dryWeight = $vessel->DryWeightMeasure;
$int_var = (int)filter_var($dryWeight, FILTER_SANITIZE_NUMBER_INT);
$draft = $vessel->MaxDraft;
$length = $vessel->YSP_LOAFeet;

$lengthOverall = $vessel->LengthOverall;
$length2 = $vessel->NormNominalLength;

$lengthMeters =  $vessel->YSP_LOAMeter;

$make = $vessel->MakeString;
$model = $vessel->Model;
$maxSpeed = $vessel->MaximumSpeedMeasure;
$driveTypeCode = $vessel->DriveTypeCode;
$year = $vessel->ModelYear;
$phone = $vessel->Office->Phone; 
$email = $vessel->Office->Email;

if ($phone == ""){
    $phone = $YSP_Options->get('company_number');;
}

if ($email == "") {
    $email = $YSP_Options->get('send_lead_to_this_email');;
}

$numberOfEngines = $vessel->NumberOfEngines;

if (is_array($vessel->Engines)) {
    $enginesData = array(); 

    foreach ($vessel->Engines as $engine) {
        $engineData = array(
            'Make' => $engine->Make,
            'Model' => $engine->Model,
            'Drive' => $engine->DriveTransmissionDescription,
            'Fuel' => $engine->Fuel,
            'Power' => $engine->EnginePower,
        );

        $enginesData[] = $engineData;
    }

}

$post = get_post($yacht_post_id);
$permalink = get_permalink($yacht_post_id);

$colorTxt = $YSP_Options->get('rai_ys_button_txt_color_one');
$colorBg = $YSP_Options->get('rai_ys_button_bg_color_one');

$limitOfGallery = 16;

if ( isset( $_GET['GalleryLimit'] ) && ! empty( $_GET['GalleryLimit'] )) {

    $limitOfGallery = $_GET['GalleryLimit'];

}

$imageGallery = array_slice($vessel->Images, 0, $limitOfGallery);

$chuckedGallery = array_chunk($imageGallery, 8);

$broker = $vessel->SalesRep->Name;
    
$BrokerNames = explode(' ', $broker);

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
        'key' => 'broker_fname',
        'compare' => 'LIKE',
        'value' => $bName,
    ];
}

foreach ($BrokerNames as $bName) {
    $brokerQueryArgs['meta_query']['name'][]=[
        'key' => 'broker_lname',
        'compare' => 'LIKE',
        'value' => $bName,
    ];
}

$brokerQuery = new WP_Query($brokerQueryArgs);

if ($brokerQuery->have_posts()) {

}
else {
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

    $brokerQuery = new WP_Query($mainBrokerQueryArgs);


}

?>
<!DOCTYPE html>
<html>
<head>
    <title><?= $post->post_title ?> - PDF</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <style type="text/css">

        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900');

        #pdf-page-template {
            font-family: 'Montserrat', sans-serif;
            margin: auto;
            padding: 20px;
            max-width: 1440px;
        }

        .go-back{
            display: flex;
            text-decoration: none;
            color: black;
            padding-bottom: 20px;
            width: 155px;
            font-size: 12px;
        }
        
        .back-yacht{
            padding-left: 5px;
            font-weight: 12px;
        }

        .cover-page-title-container {
            display: flex;
            align-items: center;
        }

        .cover-page-title-container .cover-title {
            color: #C00020;
            width: 100%;
            text-align: center;
            font-weight: 400;
            text-transform: uppercase;
        }

        .main-title-container {
            margin-bottom: 15px;
        }

        .main-name-price-container {
            display: flex;
            justify-content: space-between;
        }

        .main-name-price-container .main-boat-name {
            text-transform: uppercase;
            font-weight: 400;
        }

        .main-name-price-container .main-boat-price {
            text-transform: uppercase;
            font-weight: 400;
        }

        .main-page-container .main-hero-image-container img {
            width: 100%;
            max-height: 400px;
            object-fit: cover;
            border-radius: 12px;
        }

        .main-hero-image-container {
            margin-bottom: 30px;
        }

        .main-info-container {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;

            justify-content: space-between;
            margin-bottom: 30px;
            font-size: 14px;
        }

        .main-location-container, .main-builder-container, .main-cabins-container, .main-length-container {
            display: flex;
            align-items: center;
            
            position: relative;

            padding-left: 2px;
        }

        .main-builder-container img, .main-cabins-container img, .main-length-container img {
            margin-left: 30px;
        }

        .main-location, .main-builder, .main-cabins, .main-length {
            margin-left: 20px;
        }

        .location-name, .builder-name, .cabins-name, .length-name {
            font-size: 12px;
            margin-bottom: 10px;
        }
        
        .location-value, .builder-value, .cabins-value, .length-value {
            font-size: 10px;
        }

        .main-specifications-container .main-specifications-title {
            text-transform: uppercase;
        }

        .main-specifications-container .specifications-container {
            display: flex;
            justify-content: space-between;
        }

        .specifications-container .specification-column {
            flex-basis: calc(50% - 20px);
        }

        .specification-column .individual-specification-group {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #D9D9D9;
        }

        .individual-specification-group .specification-title {
            text-transform: uppercase;
        }

        .individual-specification-group .specification-value {
            font-weight: 400;
            font-size: 10px;
        }

        .specifications-tables{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 15px;
        }

        .specifications-table{
            border-collapse: collapse; 
            width: 100%;
            text-align: left;
            font-size: 12px;
        }

        .specifications-table th{
            text-align: left;
        }
    
        .specifications-table td{
            text-align: right;
        }

        .specifications-table th, .specifications-table td{
            padding-top: 10px;
            padding-bottom: 10px;
        }

        .specifications-table tr{
             border-bottom: 1px solid #D9D9D9;
        }

        .other-specs-table{
            width: 100%;
            border-collapse: collapse; 
            text-align: left;
            font-size: 12px;
            margin-bottom: 15px;
        }

        .other-specs-table tr{
            border-bottom: 1px solid #D9D9D9;
        }

        .other-specs-table td{
            text-align: right;
        }

        .other-specs-table th, .other-specs-table td{
            padding-top: 10px;
            padding-bottom: 10px;
        }

        .image-gallery-container {
            display: grid;
            grid-template-columns: 1fr 1fr;

            flex-wrap: wrap;
            justify-content: center;
            align-items: center;

            gap: 15px;

            margin-bottom: 15px;
        }

        .individual-image-container {
            box-sizing: border-box;
        }

        .gallery-image {
            max-width: 100%;
            height: 200px;
            width: 100%;
            display: block;
            border-radius: 12px;
            object-fit: cover;
        }

        .footer-broker-info {
            
            padding-top: 20px;
            padding-bottom: 20px;
            font-size: 24px;
            text-align: center;
        }
    </style>
</head>
<body>
<div id="pdf-page-template">
    <div class="main-page-container">
        <div class="main-title-container">
            <div class="go-back-back">
                <a class="go-back" href="<?php echo $permalink ?>">
                 <img src="<?php echo YSP_ASSETS; ?>images/back.svg" alt="" />
                 <div class="back-yacht">DETAIL'S PAGE</div>
                </a>
            </div>
            <div class="main-name-price-container">
                <h3 class="main-boat-name"><?= $vesselH1 ?></h3>
                <h3 class="main-boat-price">$<?= $price ?></h3>
            </div>
            <div class="main-iyg-flag-container">
                <img src="<?php echo get_template_directory_uri(); ?>/images/separator.svg" alt="" />
            </div>
        </div>
        <div class="main-hero-image-container">
            <img src="<?php echo $vessel->Images[0]->Uri ?>" alt="" />
        </div>
        <div class="main-info-container"> 
            <div class="main-location-container">
                <img width="50" height="50" src="<?php echo YSP_ASSETS; ?>images/Compass.svg" alt="" />
                <div class="main-location">
                    <p class="location-name">LOCATION</p>
                    <p class="location-value"><?= $boatLocation ?></p>
                </div>
            </div>
            <div class="main-builder-container">
                <img width="50" height="50" src="<?php echo YSP_ASSETS; ?>images/Vector.svg" alt="" />
                <div class="main-builder">
                    <p class="builder-name">BUILDER</p>
                    <p class="builder-value"><?= $make ?></p>
                </div>
            </div>
            <div class="main-cabins-container">
                <img width="50" height="50" src="<?php echo YSP_ASSETS; ?>images/Bed.svg" alt="" />
                <div class="main-cabins">
                    <p class="cabins-name">CABINS</p>
                    <p class="cabins-value"><?= $cabinCount ?></p>
                </div>
            </div>
            <div class="main-length-container">
                <img width="90" height="50" src="<?php echo YSP_ASSETS; ?>images/Length.svg" alt="" />
                <div class="main-length">
                    <p class="length-name">LENGTH</p>
                    <p class="length-value"><?= $length ?>ft</p>
                </div>
            </div>
        </div>

        <div class="main-specifications-container" style="page-break-after: always;">
            <h3 class="main-specifications-title">SPECIFICATIONS</h3>

            <div class="specifications-tables">
                <table class="specifications-table">
                    <tr>
                        <th>YACHT TYPE</th>
                        <td><?= $category ? $category : 'N/A' ?></td>
                    </tr>
                    <tr>
                        <th>BRAND</th>
                        <td><?= $make ? $make : 'N/A' ?></td>
                    </tr>
                    <tr>
                        <th>YEAR</th>
                        <td><?= $year ? $year : 'N/A' ?></td>
                    </tr>
                    <tr>
                        <th>HULL</th>
                        <td><?= $construction ? $construction : 'N/A' ?></td>
                    </tr>
                    <tr>
                        <th>DAYS LISTED</th>
                        <td><?= $itemDate ? $itemDate : 'N/A' ?></td>
                    </tr>
                    <tr>
                        <th>PRICE</th>
                        <td>$<?= $price ? $price : 'N/A' ?></td>
                    </tr>

                </table>
                <table class="specifications-table">
                    <tr>
                        <th>LENGTH OVERALL</th>
                        <td><?= (isset($length) && isset($lengthMeters)) ? $length . "ft / " . $lengthMeters . " m" : "N/A" ?></td>
                    </tr>
                    <tr>
                        <th>BEAM</th>
                        <td><?= (isset($beam) && isset($beamMeters)) ? $beam . " / " . $beamMeters . " m" : "N/A" ?></td>
                    </tr>
                    <tr>
                        <th>MAX DRAFT</th>
                        <td><?= (isset($draft) && isset($draftMeters)) ? $draft . " / " . $draftMeters . " m" : 'N/A' ?></td>
                    </tr>
                    <tr>
                        <th>MAX SPEED</th>
                        <td><?= $maxSpeed ? $maxSpeed : 'N/A' ?></td>
                    </tr>
                    <tr>
                        <th>CRUISING SPEED</th>
                        <td><?= $cruisingSpeed ? $cruisingSpeed : 'N/A' ?></td>
                    </tr>
                    <tr>
                        <th>ENGINES</th>
                        <td>N/A</td>
                    </tr>
                </table>
            </div>
        </div>
        
        <div class="other-specs-group">
            <h3 class="other-specs-title">BASIC INFO</h3>
            
            <table class="other-specs-table">
                <tr>
                    <th>MAKE</th>
                    <td><?= $make ? $make : 'N/A' ?></td>
                </tr>
                <tr>
                    <th>MODEL</th>
                    <td><?= $model ? $model : 'N/A' ?></td>
                </tr>
                <tr>
                    <th>CONDITION</th>
                    <td><?= $condition ? $condition : 'N/A' ?></td>
                </tr>
                <tr>
                    <th>CONSTRUCTION</th>
                    <td><?= $construction ? $construction : 'N/A' ?></td>
                </tr>
                <tr>
                    <th>BOAT HULL ID</th>
                    <td><?= $boatHullID ? $boatHullID : 'N/A' ?></td>
                </tr>
            </table>
        </div>

        <div class="other-specs-group" style="">
            <h3 class="other-specs-title">DIMENSIONS</h3>

            <table class="other-specs-table">
                <tr>
                    <th>LENGTH</th>
                    <td><?= (isset($length) && isset($lengthMeters)) ? $length . "ft / " . $lengthMeters . " m" : "N/A" ?></td>
                </tr>
                <tr>
                    <th>BEAM</th>
                    <td><?= (isset($beam) && isset($beamMeters)) ? $beam . " / " . $beamMeters . " m" : "N/A" ?></td>
                </tr>
                <tr>
                    <th>DRY WEIGHT</th>
                    <td><?= $dryWeight ? $dryWeight : 'N/A' ?></td>
                </tr>
                <tr>
                    <th>CABINS COUNT</th>
                    <td><?= $cabinCount ? $cabinCount : 'N/A' ?></td>
                </tr>
            </table>
        </div>

    <?php
        if (is_array($enginesData) && !empty($enginesData)) {
            $counter = 1;

            foreach ($enginesData as $engineData) {
                ?>
                <div class="other-specs-group">
                    <h3 class="other-specs-title"><?= 'ENGINE ' . $counter ?></h3>

                    <table class="other-specs-table">
                        <?php foreach ($engineData as $key => $waolue) { ?>
                            <tr class="individual-specs-group">
                                <th><?= strtoupper($key) ?></th>
                                <td><?= $waolue ? $waolue : "N/A" ?></td>
                            </tr>
                        <?php } ?>
                    </table>
                </div>
                <?php
                $counter++;
            }
        }
        ?>
        <div  style="page-break-after: always;"></div>
    </div>

    <h3 class="other-specs-title">GALLERY</h3>

    <?php foreach ($chuckedGallery as $cg) { ?> 
        <div class="pdf-page" style="page-break-after: always;">
            <div class="image-gallery-container">
                <?php foreach($cg as $image) { ?>
                    <div class="individual-image-container">
                        <img class="gallery-image" src="<?= str_replace("XLARGE", "LARGE", $image->Uri) ?>" alt="boat-image" />
                    </div>
                <?php } ?>
            </div>
        </div>
    <?php } ?>
    
    <?php
   
    if ($brokerQuery->have_posts()) {
        while ($brokerQuery->have_posts()) {
            $brokerQuery->the_post(); 
            $broker_first_name = get_post_meta($brokerQuery->post->ID, 'ysp_team_fname', true);
            $broker_last_name = get_post_meta($brokerQuery->post->ID, 'ysp_team_lname', true);
            $broker_email = get_post_meta($brokerQuery->post->ID, 'ysp_team_email', true);
            $broker_phone = get_post_meta($brokerQuery->post->ID, 'ysp_team_phone', true);
         ?>
            <!-- <div class="footer-container" style="page-break-after: always;">
                <div class="footer-broker-info">
                    <a href="<?= get_permalink($brokerQuery->post->ID) ?>"><?php echo ($broker_first_name . " " . $broker_last_name); ?></a>
                    - <a href="tel:<?php echo $broker_phone; ?>"><?php echo $broker_phone; ?></a> - 
                    <a href="mailto:<?php echo $broker_email; ?>"><?php echo $broker_email; ?></a>
                </div>
            </div> -->
        <?php
            }
            wp_reset_postdata();
        }
        ?>
    </div>

</body>
</html>