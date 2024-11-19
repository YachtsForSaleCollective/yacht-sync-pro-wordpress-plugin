<?php

$meta = get_post_meta($yacht_post_id);

foreach ($meta as $indexM => $valM) {
    if (is_array($valM) && ! isset($valM[1])) {
        $meta[$indexM] = $valM[0];
    }
}

$vessel = array_map("maybe_unserialize", $meta);

$vessel = (object) $vessel;


if( $vessel->BoatName != null ) {
    $vesselH1 = $vessel->ModelYear . " " . $vessel->MakeString . " " . $vessel->Model . " " . $vessel->BoatName;
} else {
    $vesselH1 = $vessel->ModelYear . " " . $vessel->MakeString . " " . $vessel->Model;
}

function ReplaceStr($str1)
{

    $res3 = str_replace(array(' USD'), '', $str1);

    return $res3;
}

$price = ($vessel->Price && $vessel->Price != "0.00 USD" && $vessel->Price != "1.00 USD") ? number_format(ReplaceStr(trim(str_replace(['EUR', 'USD'], '', $vessel->Price)))) : "Contact Us For Price";

$itemReceivedDate = $vessel->ItemReceivedDate;
$itemDate = strtotime($itemReceivedDate);

$beam = $vessel->BeamMeasure;

$beamMeters = sprintf("%0.2f", $beamMeters);
$boatHullID = $vessel->BoatHullID;
$boatCity = $vessel->BoatLocation->BoatCityName;
$boatState = $vessel->BoatLocation->BoatStateCode;
$boatCountry = $vessel->BoatLocation->BoatCountryID;

if($boatState != ""){
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
$length = $vessel->NominalLength;
$lengthOverall = $vessel->LengthOverall;
$length2 = $vessel->NormNominalLength;
$make = $vessel->MakeString;
$model = $vessel->Model;
$maxSpeed = $vessel->MaximumSpeedMeasure;
$driveTypeCode = $vessel->DriveTypeCode;
$year = $vessel->ModelYear;
$phone = $vessel->Office->Phone; 
$email = $vessel->Office->Email;
if($phone == ""){
    $phone = "(954) 533-3145";
}
if ($email == "") {
    $email = "info@theiyg.com";
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
$permalink = $post->guid;


$YSP_Options = new YachtSyncPro_Options();

$colorOne = $YSP_Options->get('color_one');
$colorTwo = $YSP_Options->get('color_two');
?>
<!DOCTYPE html>
<html>
<head>

    <style>

        :root {
            --main-color: <?php echo $colorOne; ?>;
            --secondary-color: <?php echo $colorTwo; ?>;
            --main-text-color: var(--main-color);
            --secondary-text-color: var(--secondary-color);
        }

        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto:wght@100;300;400;500;700;900&display=swap');

        #pdf-page-template {
            width: 100%;
            max-width: 1440px;
            margin: auto;
            font-family: 'Montserrat', sans-serif;
        }

        .cover-page-container-logo {
            width: 100%;
            height: 90vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .cover-page-container-logo img {
            width: 150px;
        }

        .cover-page-title-container {
            height: 10vh;
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
            margin-bottom: 40px;
        }
        .main-page-container {
            padding: 20px;
        }
        .main-name-price-container {
            display: flex;
            justify-content: space-between;
        }
        .main-name-price-container .main-boat-name {
            color: var(--secondary-text-color);
            text-transform: uppercase;
            font-weight: 400;
            margin: 0;
        }
        .main-name-price-container .main-boat-price {
            text-transform: uppercase;
            font-weight: 400;
            margin: 0;
        }

        .main-page-container .main-hero-image-container img {
            width: 100%;
            height: 500px;
            object-fit: cover;
        }

        .main-hero-image-container {
            margin-bottom: 40px;
        }

        /* MAIN INFO SECTION */

        .main-info-container {
            display: flex;
            justify-content: space-between;
            margin-bottom: 100px;
            font-size: 14px
        }

        .main-location-container, .main-builder-container, .main-cabins-container, .main-length-container {
            display: flex;
            align-items: center;
            flex: 0 0 calc(25% - 3px);
            position: relative;
            padding-left: 2px;
        }

        .main-builder-container img, .main-cabins-container img, .main-length-container img {
            margin-left: 30px;
        }

        .main-location-container::before, .main-builder-container::before, .main-cabins-container::before, .main-length-container::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 2px;
            background-color: var(--secondary-text-color);
        }

        .main-location-container::before {
            display: none;
        }

        .main-length-container {
            margin-right: 0;
        }
        .main-location, .main-builder, .main-cabins, .main-length {
            margin-left: 20px;
        }
        .location-name, .builder-name, .cabins-name, .length-name {
            font-size: 12px;
            margin: 0px;
            margin-bottom: 10px;
            color: var(--main-text-color);
        }
        .location-value, .builder-value, .cabins-value, .length-value {
            font-size: 10px;
            margin: 0px;
            color: var(--main-text-color);
        }

        .main-specifications-container {
            margin-bottom: 150px;
        }

        .main-specifications-container .main-specifications-title {
            color: var(--secondary-text-color);
            font-weight: 400;
            font-size: 14px;
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
            color: var(--main-text-color);
            font-weight: 600;
            font-size: 12px
        }
        .individual-specification-group .specification-value {
            color: var(--main-text-color);
            font-weight: 400;
            font-size: 10px;
        }
        /* FOOTER CONTAINER */

        .footer-container {
            display: flex;
            justify-content: space-between;
            margin-bottom: 200px;
            padding: 20px;
        }
        .footer-broker-info{
            display: flex;
            justify-content: space-between;
            width: 800px;
            margin: auto;
        }

        .footer-broker-info p {
            margin: auto;
            margin-bottom: 10px;
            font-size: 12px;
            color: var(--secondary-text-color);
        }

        .footer-container .footer-img {
            height: 50px;
            width: auto;
            margin-top: auto ;
            margin-bottom: auto ;
        }

        .footer-container .footer-broker-info .footer-broker-website {
            color: #C00020;
        }

        .main-description-container {
            line-height: 30px;
            margin-bottom: 100px;
            font-size: 12px;
        }

        .footer-broker-info p a {
            text-decoration: none;
            color: var(--secondary-text-color);
        }

        .other-specs-group .other-specs-title {
            color: var(--secondary-text-color);
            font-weight: 400;
            font-size: 14px;
        }

        .other-specs-group-container .individual-specs-group {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #D9D9D9;
        }

        .individual-specs-group .other-specs-name {
            color: var(--main-text-color);
            font-weight: 600;
            font-size: 12px;
        }

        .individual-specs-group .other-specs-value {
            color: var(--main-text-color);
            font-weight: 400;
            font-size: 10px;
        }

        .other-specs-group .other-specs-group-container {
            margin-bottom: 35px;
        }

        .additional-description {
            line-height: 30px;
            font-size: 12px;
        }

        .image-gallery-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
        }

        .individual-image-container {
            flex-basis: calc(50% - 10px);
            margin: 5px;
            box-sizing: border-box;
        }

        .gallery-image {
            max-width: 100%;
            height: auto;
            display: block;
            margin: auto;
        }
        .gallery-image {
            display: block;
            max-height: 317px !important;
            height: 317px !important;
            width: 480px;
        }

        .pdf-page {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
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
                    <p class="length-value"><?= $length ?> / <?= $lengthMeters ?> m</p>
                </div>
            </div>
        </div>
        <div class="main-specifications-container">
            <h3 class="main-specifications-title">SPECIFICATIONS</h3>
            <div class="specifications-container">
                <div class="specification-column">
                    <div class="individual-specification-group">
                        <p class="specification-title">YACHT TYPE</p>
                        <p class="specification-value"><?= $category ? $category : 'N/A' ?></p>
                    </div>
                    <div class="individual-specification-group">
                        <p class="specification-title">BRAND</p>
                        <p class="specification-value"><?= $make ? $make : 'N/A' ?></p>
                    </div>
                    <div class="individual-specification-group">
                        <p class="specification-title">YEAR</p>
                        <p class="specification-value"><?= $year ? $year : 'N/A' ?></p>
                    </div>
                    <div class="individual-specification-group">
                        <p class="specification-title">HULL</p>
                        <p class="specification-value"><?= $construction ? $construction : 'N/A' ?></p>
                    </div>
                    <div class="individual-specification-group">
                        <p class="specification-title">DAYS LISTED</p>
                        <p class="specification-value"><?= $itemDate ? $itemDate : 'N/A' ?></p>
                    </div>
                    <div class="individual-specification-group">
                        <p class="specification-title">PRICE</p>
                        <p class="specification-value">$<?= $price ? $price : 'N/A' ?></p>
                    </div>
                </div>
                <div class="specification-column">
                    <div class="individual-specification-group">
                        <p class="specification-title">LENGTH OVERALL</p>
                        <p class="specification-value"></p>
                    </div>
                    <div class="individual-specification-group">
                        <p class="specification-title">BEAM</p>
                        <p class="specification-value"><?= (isset($beam) && isset($beamMeters)) ? $beam . " / " . $beamMeters . " m" : "N/A" ?></p>
                    </div>
                    <div class="individual-specification-group">
                        <p class="specification-title">MAX DRAFT</p>
                        <p class="specification-value"><?= (isset($draft) && isset($draftMeters)) ? $draft . " / " . $draftMeters . " m" : "N/A" ?></p>
                    </div>
                    <div class="individual-specification-group">
                        <p class="specification-title">MAX SPEED</p>
                        <p class="specification-value"><?= $maxSpeed ? $maxSpeed : 'N/A' ?></p>
                    </div>
                    <div class="individual-specification-group">
                        <p class="specification-title">CRUISING SPEED</p>
                        <p class="specification-value"><?= $cruisingSpeed ? $cruisingSpeed : 'N/A' ?></p>
                    </div>
                    <div class="individual-specification-group">
                        <p class="specification-title">ENGINES</p>
                        <p class="specification-value"><?= $engineQty ? $engineQty . ' X ' . ucfirst($engineFuel1) : 'N/A' ?></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="other-info-container">
            <div class="other-specs-group">
                <h3 class="other-specs-title">BASIC INFO</h3>
                <div class="other-specs-group-container">
                    <div class="individual-specs-group">
                        <p class="other-specs-name">MAKE</p>
                        <p class="other-specs-value"><?= $make ? $make : 'N/A' ?></p>
                    </div>
                    <div class="individual-specs-group">
                        <p class="other-specs-name">MODEL</p>
                        <p class="other-specs-value"><?= $model ? $model : 'N/A' ?></p>
                    </div>
                    <div class="individual-specs-group">
                        <p class="other-specs-name">CONDITION</p>
                        <p class="other-specs-value"><?= $condition ? $condition : 'N/A' ?></p>
                    </div>
                    <div class="individual-specs-group">
                        <p class="other-specs-name">CONSTRUCTION</p>
                        <p class="other-specs-value"><?= $construction ? $construction : 'N/A' ?></p>
                    </div>
                    <div class="individual-specs-group">
                        <p class="other-specs-name">BOAT HULL ID</p>
                        <p class="other-specs-value"><?= $boatHullID ? $boatHullID : 'N/A' ?></p>
                    </div>
                </div>
            </div>
            <div class="other-specs-group">
                <h3 class="other-specs-title">DIMENSIONS</h3>
                <div class="other-specs-group-container">
                    <div class="individual-specs-group">
                        <p class="other-specs-name">LENGTH</p>
                        <p class="other-specs-value"><?= (isset($length) && isset($lengthMeters)) ? $length . " / " . $lengthMeters . " m" : "N/A" ?></p>
                    </div>
                    <div class="individual-specs-group">
                        <p class="other-specs-name">OVERALL</p>
                        <p class="other-specs-value"></p>
                    </div>
                    <div class="individual-specs-group">
                        <p class="other-specs-name">BEAM</p>
                        <p class="other-specs-value"><?= (isset($beam) && isset($beamMeters)) ? $beam . " / " . $beamMeters . " m" : "N/A" ?></p>
                    </div>
                    <div class="individual-specs-group">
                        <p class="other-specs-name">DRY WEIGHT</p>
                        <p class="other-specs-value"><?= $dryWeight ? $dryWeight : 'N/A' ?></p>
                    </div>
                    <div class="individual-specs-group">
                        <p class="other-specs-name">CABINS COUNT</p>
                        <p class="other-specs-value"><?= $cabinCount ? $cabinCount : 'N/A' ?></p>
                    </div>
                </div>
            </div>
            <?php
                if (is_array($enginesData) && !empty($enginesData)) {
                    $counter = 1;

                    foreach ($enginesData as $engineData) {
                        ?>
                        <div class="other-specs-group">
                            <h3 class="other-specs-title"><?= 'ENGINE ' . $counter ?></h3>
                            <div class="other-specs-group-container">
                                <?php
                                foreach ($engineData as $key => $waolue) {
                                    ?>
                                    <div class="individual-specs-group">
                                        <p class="other-specs-name"><?= strtoupper($key) ?></p>
                                        <p class="other-specs-value"><?= $value ? $value : "N/A" ?></p>
                                    </div>
                                    <?php
                                }
                                ?>
                            </div>
                        </div>
                        <?php
                        $counter++;
                    }
                }
                ?>
        </div>
    </div>

    <?php
        
        $limitOfGallery = 12;

        if ( isset( $_GET['GalleryLimit'] ) && ! empty( $_GET['GalleryLimit'] )) {

            $limitOfGallery = $_GET['GalleryLimit'];

        }

        $imageGallery = array_slice($vessel->Images, 0, $limitOfGallery);

        $chuckedGallery = array_chunk($imageGallery, 6);

    ?>

    <?php foreach ($chuckedGallery as $cg) { ?> 
        <div class="pdf-page">
            <div class="image-gallery-container" style="padding-top: 60px ">
                <?php foreach($cg as $image) { ?>
                    <div class="individual-image-container">
                        <img class="gallery-image" src="<?= str_replace("XLARGE", "LARGE", $image->Uri) ?>" alt="boat-image" style="object-fit: cover;" />
                    </div>
                <?php } ?>
            </div>
        </div>
    <?php } ?>
    
    <?php
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

    if ($brokerQuery->have_posts()) {
        while ($brokerQuery->have_posts()) {
            $brokerQuery->the_post(); 
            $broker_first_name = get_post_meta($brokerQuery->post->ID, 'ysp_team_fname', true);
            $broker_last_name = get_post_meta($brokerQuery->post->ID, 'ysp_team_lname', true);
            $broker_email = get_post_meta($brokerQuery->post->ID, 'ysp_team_email', true);
            $broker_phone = get_post_meta($brokerQuery->post->ID, 'ysp_team_phone', true);
         ?>
            <div class="footer-container" style="page-break-after: always;">
                <div class="footer-broker-info">
                <p class="footer-broker-name"><?php echo ($broker_first_name . " " . $broker_last_name); ?></p>
                <p class="footer-broker-phone"><a href="tel:<?php echo $broker_phone; ?>"><?php echo $broker_phone; ?></p>
                <p class="footer-broker-email"><a href="mailto:<?php echo $broker_email; ?>"><?php echo $broker_email; ?></p>
            </div>
        </div>
        <?php
            }
            wp_reset_postdata();
        }
        ?>
    </div>

</body>
</html>