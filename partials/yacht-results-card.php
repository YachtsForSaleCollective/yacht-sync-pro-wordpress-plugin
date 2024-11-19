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

    $yacht = (object) $yacht;

    $vesselLocation = ($yacht->BoatLocation->BoatCountryID == "US" || $yacht->BoatLocation->BoatCountryID == "United States") ? $yacht->BoatLocation->BoatCityName.','.$yacht->BoatLocation->BoatStateCode : $yacht->BoatLocation->BoatCityName.','. $yacht->BoatLocation->BoatCountryID;
    
?>
<div class="ysp-yacht-item ysp-view-grid" data-post-id="<?= $yacht->_postID ?>" data-yacht-id="<?= $yacht->DocumentID ?>">
    <div class="ri-image">
        <a href="<?= $yacht->_link ?>">
            <img class="yacht-image" src="<?= $yacht->Images ? $yacht->Images[0]->Uri : '' ?>" alt="yacht-image" loading="lazy" />
            
            <svg class="like-me love" xmlns="http://www.w3.org/2000/svg" width="57" height="54" viewBox="0 0 57 54" fill="none"  data-yacht-id="<?=  $yacht->DocumentID ?>">
              <g filter="url(#filter0_d_2888_4333)">
                <path d="M34.7028 11.5755C36.2094 11.5755 37.6251 12.1699 38.6898 13.2488L38.8223 13.383C41.0206 15.6116 41.0206 19.2375 38.8223 21.466L38.0992 22.199L27.4995 32.9442L18.4883 23.808L16.9011 22.199L16.178 21.466C13.9797 19.2375 13.9797 15.6116 16.178 13.383L16.3083 13.2509C17.3739 12.1708 18.79 11.5759 20.2962 11.5764C21.8023 11.5764 23.2176 12.1708 24.2819 13.2492L25.005 13.9822L27.4991 16.5101L29.9928 13.9818L30.7158 13.2488C31.7801 12.1699 33.1962 11.5755 34.7028 11.5755ZM34.7028 8C32.357 8 30.0112 8.9068 28.2222 10.7204L27.4991 11.4534L26.776 10.7204C24.9878 8.90723 22.642 8.00043 20.297 8C17.9508 8 15.605 8.90723 13.8147 10.7221L13.6844 10.8542C10.1046 14.4832 10.1046 20.3645 13.6844 23.9935L14.4074 24.7265L15.9946 26.3354L27.4995 38L40.5933 24.7265L41.3164 23.9935C44.8945 20.3663 44.8945 14.4814 41.3164 10.8542L41.1839 10.72C39.3945 8.9068 37.0486 8 34.7028 8Z" fill="white"></path>
              </g>
              <defs>
                <filter id="filter0_d_2888_4333" x="-0.000488281" y="0" width="57.0005" height="54" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                  <feOffset dx="1" dy="4"></feOffset>
                  <feGaussianBlur stdDeviation="6"></feGaussianBlur>
                  <feComposite in2="hardAlpha" operator="out"></feComposite>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2888_4333"></feBlend>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2888_4333" result="shape"></feBlend>
                </filter>
              </defs>
            </svg>
    
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
            <span class="ri-location">                          
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.75 7.5C15.75 12.75 9 17.25 9 17.25C9 17.25 2.25 12.75 2.25 7.5C2.25 5.70979 2.96116 3.9929 4.22703 2.72703C5.4929 1.46116 7.20979 0.75 9 0.75C10.7902 0.75 12.5071 1.46116 13.773 2.72703C15.0388 3.9929 15.75 5.70979 15.75 7.5Z" stroke="#067AED" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z" stroke="#067AED" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <?=  $vesselLocation ?>
            </span>

            <a href="#ysp-yacht-results-lead-modal" class="ri-contact" data-modal="#ysp-yacht-results-lead-modal">
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
            </a>
        </div>
    </div>
</div>