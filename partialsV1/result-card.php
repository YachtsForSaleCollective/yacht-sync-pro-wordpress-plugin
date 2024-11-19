<?php
    $meters = (int) $yacht['NominalLength'] * 0.3048;
    $length = '';

    if ($YSP_Euro_Opt == "yes") {
        $length = $yacht["NominalLength"] ? number_format($meters, 2) . ' m' : 'N/A';
        $price = $yacht["Price"] ?  '€' . number_format($yacht['YSP_EuroVal']) : 'Contact Us For Price';
    } 
    else {
        $length = $yacht["NominalLength"] ? $yacht['NominalLength'] . ' / ' . number_format($meters, 2) . ' m' : 'N/A';
        $price = $yacht["Price"] ? '$' . number_format($yacht['YSP_USDVal']) : 'Contact Us For Price'; 
    }

?>
<div class="yacht-result-grid-item">
<div class="yacht-main-image-container">
    <a class="yacht-details" href="<?php echo $yacht['_link']; ?>">
        <div class="image-wrapper">
            <img class="yacht-main-image" src="<?php echo ($yacht['Images'] ? $yacht['Images'][0]->Uri : YSP_ASSETS . 'images/default-yacht-image.jpeg') ?>" alt="yacht-image" loading="lazy" />
        </div>
    </a>
</div>
    <div class="yacht-general-info-container">
        <div class="yacht-title-container">
            <a class="yacht-details" href="<?php echo($yacht['_link']);?>">
                <h6 class="yacht-title"><?php echo ($yacht['ModelYear'] ? $yacht['ModelYear'] : '');?> <?php echo ($yacht['MakeString'] ? $yacht['MakeString'] : '');?> <?php echo ($yacht['Model'] ? $yacht['Model'] : '');?> <?php echo ($yacht['BoatName'] ? $yacht['BoatName'] : '');?></h6>
            </a>
        </div>
        <div class="yacht-info-container">
            <div class="yacht-info">
                <div class="yacht-individual-container">
                    <p class="yacht-individual-title">Year</p>
                    <p class="yacht-individual-value"><?php echo ($yacht['ModelYear'] ? $yacht['ModelYear'] : 'N/A') ?></p>
                </div>
                <div class="yacht-individual-container">
                    <p class="yacht-individual-title" style="">Cabins</p>
                    <p class="yacht-individual-value"><?php echo (isset($yacht['CabinCountNumeric']) ? $yacht['CabinCountNumeric'] : 'N/A') ?></p>
                </div>
                <div class="yacht-individual-container">
                    <p class="yacht-individual-title">Builder</p>
                    <p class="yacht-individual-value"><?php echo ($yacht['MakeString'] ? $yacht['MakeString'] : 'N/A') ?></p>
                </div>
                <div class="yacht-individual-container">
                    <p class="yacht-individual-title">Length</p>
                    <p class="yacht-individual-value"><?php echo ($length) ?></p>
                </div>
            </div>
        </div>
        <div class="similar-listing-container">
            <div class="yacht-price-details-container">
                <div class="yacht-price-container">
                    <p class="yacht-price"><?php echo ($price);?></p>
                </div>
                <a class="yacht-details" href="<?php echo($yacht['_link']);?>">
                    Details
                </a>
            </div>
        </div>
    </div>
</div>