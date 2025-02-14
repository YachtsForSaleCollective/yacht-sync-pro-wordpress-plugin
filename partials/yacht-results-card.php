<?php
    $meters = (int) $yacht['NominalLength'] * 0.3048;
    $length = '';

    if ($YSP_Euro_Opt == "yes") {
        $length = $yacht["NominalLength"] ? number_format($meters, 2) . ' m' : 'N/A';
        $price = isset($yacht["Price"]) ?  '€' . number_format($yacht['YSP_EuroVal']) : 'Contact Us For Price';
    } 
    else {
        $length = $yacht["NominalLength"] ? $yacht['NominalLength'] . ' / ' . number_format($meters, 2) . ' m' : 'N/A';
        $price = isset($yacht["Price"]) ? '$' . number_format($yacht['YSP_USDVal']) : 'Contact Us For Price'; 
    }

    if ($price == "$0") {
        $price = "Contact Us For Price";
    }

    $yacht = (object) $yacht;

    if ($yacht->BoatLocation->BoatCityName !== "") {
        $vesselLocation = ($yacht->BoatLocation->BoatCountryID == "US" || $yacht->BoatLocation->BoatCountryID == "United States") ? $yacht->BoatLocation->BoatCityName.', '.$yacht->BoatLocation->BoatStateCode : $yacht->BoatLocation->BoatCityName.', '. $yacht->BoatLocation->BoatCountryID;

        $vesselLocationLink = $yacht_search_url.'/ys_keyword-'. str_replace([' '], ['-'], $yacht->BoatLocation->BoatCityName);
    }
    else {
        $vesselLocation = $yacht->BoatLocation->BoatCountryID;
        $vesselLocationLink = $yacht_search_url.'/ys_keyword-'. str_replace([' '], ['-'], $yacht->BoatLocation->BoatCountryID);
    }
?>
<div class="ysp-yacht-item ysp-view-grid" data-post-id="<?= $yacht->_postID ?>" data-yacht-id="<?= $yacht->DocumentID ?>">
    <div class="ri-image">
        <a href="<?= $yacht->_link ?>">
            <img class="yacht-image" src="<?= isset($yacht->Images[0] ) ? $yacht->Images[0]->Uri :  YSP_ASSETS . 'images/default-yacht-image.jpeg' ?>" alt="yacht-image" loading="lazy" />
            
            <span class="ri-price"><?= $price ?></span>
        </a>    
    </div>

    <div class="result-item-info">
        <div class="ri-top">
            <a href="<?=  $yacht->_link ?>">
                <span class="ri-name"><?= $yacht->ModelYear ? $yacht->ModelYear : ''?> <?= $yacht->MakeString ? $yacht->MakeString : '' ?> <?= $yacht->Model ? $yacht->Model : '' ?></span><br>

                <span class="ri-sub-name"><?=  $yacht->BoatName ? $yacht->BoatName : 'N/A' ?></span>
            </a>
        </div>

        <div class="ri-bottom">
            <span>                          
                <a class="ri-location" href="<?= $vesselLocationLink ?>">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.75 7.5C15.75 12.75 9 17.25 9 17.25C9 17.25 2.25 12.75 2.25 7.5C2.25 5.70979 2.96116 3.9929 4.22703 2.72703C5.4929 1.46116 7.20979 0.75 9 0.75C10.7902 0.75 12.5071 1.46116 13.773 2.72703C15.0388 3.9929 15.75 5.70979 15.75 7.5Z" stroke="#067AED" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z" stroke="#067AED" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <?=  $vesselLocation ?>
                </a>
            </span>

            <!-- <a href="#ysp-yacht-results-lead-modal" class="ri-contact" data-modal="#ysp-yacht-results-lead-modal">
                Contact
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <g clip-path="url(#clip0_8101_10277)">
                <path d="M15.5556 0H5.7778C5.53214 0 5.33334 0.198792 5.33334 0.444458C5.33334 0.690125 5.53214 0.888917 5.7778 0.888917H14.4827L0.130219 15.2413C-0.0434062 15.415 -0.0434062 15.6962 0.130219 15.8698C0.21701 15.9566 0.33076 16 0.444469 16C0.558177 16 0.671885 15.9566 0.758719 15.8698L15.1111 1.51737V10.2222C15.1111 10.4679 15.3099 10.6667 15.5556 10.6667C15.8013 10.6667 16.0001 10.4679 16.0001 10.2222V0.444458C16 0.198792 15.8012 0 15.5556 0Z" fill="#067AED"/>
                </g>
                <defs>
                <clipPath id="clip0_8101_10277">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
                </defs>
                </svg>
            </a> -->
        </div>
    </div>
</div>