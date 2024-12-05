var ysp_templates={};
	ysp_templates.yacht={};
	
	ysp_templates.yacht.grid=function(vessel, params) {
		let meters = parseInt(vessel.NominalLength) * 0.3048;

		let price = '';
		let length = '';

		if (ysp_yacht_sync.europe_option_picked == "yes") {
			length = vessel.NominalLength ? meters.toFixed(2) + ' m' : 'N/A';
			price = (typeof vessel.YSP_EuroVal != 'undefined' && vessel.YSP_EuroVal > 0) ? `€${new Intl.NumberFormat('en-us', { minimumFractionDigits: 2}).format(vessel.YSP_EuroVal) }` : 'Contact Us For Price';
		} 
		else {
			length = vessel.NominalLength ? vessel.NominalLength + " / " + meters.toFixed(2) + ' m' : 'N/A';

			if (params.currency == 'Eur') {
				price = (typeof vessel.YSP_USDVal != 'undefined' && vessel.YSP_USDVal > 0) ? `€${new Intl.NumberFormat('en-us', { minimumFractionDigits: 2}).format(vessel.YSP_EuroVal) }` : 'Contact Us For Price';
			}
			else {
				price = (typeof vessel.YSP_USDVal != 'undefined' && vessel.YSP_USDVal > 0) ? `$${new Intl.NumberFormat('en-us', { minimumFractionDigits: 2}).format(vessel.YSP_USDVal) }` : 'Contact Us For Price';
			}

		}

		let vesselLocation = (vessel.BoatLocation.BoatCountryID == "US" || vessel.BoatLocation.BoatCountryID == "United States" ? `${vessel.BoatLocation.BoatCityName.toLowerCase()}, ${vessel.BoatLocation.BoatStateCode}` : `${vessel.BoatLocation.BoatCityName.toLowerCase()}, ${vessel.BoatLocation.BoatCountryID}`);
        
            vesselLocation = vesselLocation;

		return `
			<div class="ysp-yacht-item ysp-view-grid" data-post-id="${ vessel._postID }" data-yacht-id="${ vessel.DocumentID }">
				<div class="ri-image">
					<a href="${ vessel._link }">
						<img class="yacht-image" src="${vessel.Images ? vessel.Images[0].Uri : ysp_yacht_sync.assets_url + 'images/default-yacht-image.jpeg'}" alt="yacht-image" loading="lazy" />
						
						<svg title="like" class="like-me love" xmlns="http://www.w3.org/2000/svg" width="57" height="54" viewBox="0 0 57 54" fill="none"  data-yacht-id="${ vessel.DocumentID }">
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

						<label class="top-compare" title="compare">
							<input type="checkbox" class="compare_toggle" name="compare" value="${ vessel._postID }" />

							<svg width="58" height="25" viewBox="0 0 58 25" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M51.5029 18.1953L54.6753 14.7767C55.4411 13.9515 55.1258 12.5418 54.0937 12.1843L52.2 11.5284V4.6875C52.2 3.82456 51.5508 3.125 50.75 3.125H47.85V1.17187C47.85 0.524658 47.3631 0 46.7625 0H40.2375C39.6369 0 39.15 0.524658 39.15 1.17187V3.125H36.25C35.4492 3.125 34.8 3.82456 34.8 4.6875V11.5284L32.9063 12.1843C31.8753 12.5414 31.5581 13.9506 32.3247 14.7767L35.4971 18.1953C34.7016 20.3265 32.8782 21.875 30.0875 21.875C29.4869 21.875 29 22.3997 29 23.0469V23.8281C29 24.4753 29.4869 25 30.0875 25C32.8526 25 34.9585 23.9937 36.5789 22.0998C37.2322 23.8004 38.7885 25 40.6 25H46.4C48.2116 25 49.7678 23.8004 50.4211 22.0998C52.0412 23.9934 54.147 25 56.9125 25C57.5131 25 58 24.4753 58 23.8281V23.0469C58 22.3997 57.5131 21.875 56.9125 21.875C54.1567 21.875 52.3114 20.3613 51.5029 18.1953ZM37.7 6.25H49.3V10.524L43.9437 8.66875C43.6552 8.5688 43.3448 8.5688 43.0563 8.66875L37.7 10.524V6.25Z" fill="white"/>
							<path d="M22.5029 18.1953L25.6753 14.7767C26.4411 13.9515 26.1258 12.5418 25.0937 12.1843L23.2 11.5284V4.6875C23.2 3.82456 22.5508 3.125 21.75 3.125H18.85V1.17188C18.85 0.524658 18.3631 0 17.7625 0H11.2375C10.6369 0 10.15 0.524658 10.15 1.17188V3.125H7.25C6.44919 3.125 5.8 3.82456 5.8 4.6875V11.5284L3.9063 12.1843C2.8753 12.5414 2.55807 13.9506 3.32467 14.7767L6.49709 18.1953C5.70158 20.3265 3.87816 21.875 1.0875 21.875C0.486883 21.875 0 22.3997 0 23.0469V23.8281C0 24.4753 0.486883 25 1.0875 25C3.8526 25 5.95855 23.9937 7.57888 22.0998C8.23224 23.8004 9.78845 25 11.6 25H17.4C19.2115 25 20.7678 23.8004 21.4211 22.0998C23.0412 23.9934 25.147 25 27.9125 25C28.5131 25 29 24.4753 29 23.8281V23.0469C29 22.3997 28.5131 21.875 27.9125 21.875C25.1567 21.875 23.3114 20.3613 22.5029 18.1953ZM8.7 6.25H20.3V10.524L14.9437 8.66875C14.6552 8.5688 14.3448 8.5688 14.0563 8.66875L8.7 10.524V6.25Z" fill="white"/>
							</svg>							
						</label>


						${vessel.CompanyName === ysp_yacht_sync.company_name ? `<div class="company-banner"><img src="${ysp_yacht_sync.company_logo}"></div>` : ''}
				
						<span class="ri-price">${ price }</span>
					</a>	
				</div>

				<div class="result-item-info">
					<div class="ri-top">
						<a href="${ vessel._link }">
							<span class="ri-name">${vessel.ModelYear ? vessel.ModelYear : ''} ${vessel.MakeString ? vessel.MakeString : ''} ${vessel.Model ? vessel.Model : ''}</span><br>

							<span class="ri-sub-name">${ vessel.BoatName ? vessel.BoatName : 'N/A' }</span>
						</a>
					</div>

					<div class="ri-bottom">
						<span class="ri-location">							
							<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M15.75 7.5C15.75 12.75 9 17.25 9 17.25C9 17.25 2.25 12.75 2.25 7.5C2.25 5.70979 2.96116 3.9929 4.22703 2.72703C5.4929 1.46116 7.20979 0.75 9 0.75C10.7902 0.75 12.5071 1.46116 13.773 2.72703C15.0388 3.9929 15.75 5.70979 15.75 7.5Z" stroke="#067AED" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z" stroke="#067AED" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
							${ vesselLocation }
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
		`;
	};

	ysp_templates.yacht.list=function(vessel) {
		let meters = parseInt(vessel.NominalLength) * 0.3048;
		let price = '';

		if (typeof vessel.Price == 'string') {
			let price = vessel.Price.slice(0, -3);
		}
		
		let length = '';
		
		if(ysp_yacht_sync.europe_option_picked == "yes"){
			length = vessel.NominalLength ? meters.toFixed(2) + ' m' : 'N/A';
			price = vessel.Price ? `€ ${new Intl.NumberFormat('en-us', { minimumFractionDigits: 2}).format((parseInt(vessel.Price.slice(0, -3)) * ysp_yacht_sync.euro_c_c))}` : 'Contact Us For Price';
		} else {
			length = vessel.NominalLength ? vessel.NominalLength + " / " + meters.toFixed(2) + ' m' : 'N/A';
			price = vessel.Price ? `$ ${new Intl.NumberFormat('en-us', { minimumFractionDigits: 2}).format(parseInt(vessel.Price.slice(0, -3)))}` : 'Contact Us For Price'
		}

		let vesselLocation = (vessel.BoatLocation.BoatCountryID == "US" || vessel.BoatLocation.BoatCountryID == "United States" ? `${vessel.BoatLocation.BoatCityName.toLowerCase()}, ${vessel.BoatLocation.BoatStateCode}` : `${vessel.BoatLocation.BoatCityName.toLowerCase()}, ${vessel.BoatLocation.BoatCountryID}`);
        
            vesselLocation = vesselLocation;

		return `
			<div class="ysp-yacht-item ysp-view-list" data-post-id="${ vessel._postID }" data-yacht-id="${ vessel.DocumentID }">
				<div class="ri-image">
					<a href="${ vessel._link }">
						<img class="yacht-image" src="${vessel.Images ? vessel.Images[0].Uri : ysp_yacht_sync.assets_url + 'images/default-yacht-image.jpeg'}" alt="yacht-image" loading="lazy" />
						
						<svg title="compare" class="like-me love" xmlns="http://www.w3.org/2000/svg" width="57" height="54" viewBox="0 0 57 54" fill="none"  data-yacht-id="${ vessel.DocumentID }">
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

						<label class="top-compare" title="compare">
							<input type="checkbox" class="compare_toggle" name="compare" value="${ vessel._postID }" />

							<svg width="58" height="25" viewBox="0 0 58 25" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M51.5029 18.1953L54.6753 14.7767C55.4411 13.9515 55.1258 12.5418 54.0937 12.1843L52.2 11.5284V4.6875C52.2 3.82456 51.5508 3.125 50.75 3.125H47.85V1.17187C47.85 0.524658 47.3631 0 46.7625 0H40.2375C39.6369 0 39.15 0.524658 39.15 1.17187V3.125H36.25C35.4492 3.125 34.8 3.82456 34.8 4.6875V11.5284L32.9063 12.1843C31.8753 12.5414 31.5581 13.9506 32.3247 14.7767L35.4971 18.1953C34.7016 20.3265 32.8782 21.875 30.0875 21.875C29.4869 21.875 29 22.3997 29 23.0469V23.8281C29 24.4753 29.4869 25 30.0875 25C32.8526 25 34.9585 23.9937 36.5789 22.0998C37.2322 23.8004 38.7885 25 40.6 25H46.4C48.2116 25 49.7678 23.8004 50.4211 22.0998C52.0412 23.9934 54.147 25 56.9125 25C57.5131 25 58 24.4753 58 23.8281V23.0469C58 22.3997 57.5131 21.875 56.9125 21.875C54.1567 21.875 52.3114 20.3613 51.5029 18.1953ZM37.7 6.25H49.3V10.524L43.9437 8.66875C43.6552 8.5688 43.3448 8.5688 43.0563 8.66875L37.7 10.524V6.25Z" fill="white"/>
							<path d="M22.5029 18.1953L25.6753 14.7767C26.4411 13.9515 26.1258 12.5418 25.0937 12.1843L23.2 11.5284V4.6875C23.2 3.82456 22.5508 3.125 21.75 3.125H18.85V1.17188C18.85 0.524658 18.3631 0 17.7625 0H11.2375C10.6369 0 10.15 0.524658 10.15 1.17188V3.125H7.25C6.44919 3.125 5.8 3.82456 5.8 4.6875V11.5284L3.9063 12.1843C2.8753 12.5414 2.55807 13.9506 3.32467 14.7767L6.49709 18.1953C5.70158 20.3265 3.87816 21.875 1.0875 21.875C0.486883 21.875 0 22.3997 0 23.0469V23.8281C0 24.4753 0.486883 25 1.0875 25C3.8526 25 5.95855 23.9937 7.57888 22.0998C8.23224 23.8004 9.78845 25 11.6 25H17.4C19.2115 25 20.7678 23.8004 21.4211 22.0998C23.0412 23.9934 25.147 25 27.9125 25C28.5131 25 29 24.4753 29 23.8281V23.0469C29 22.3997 28.5131 21.875 27.9125 21.875C25.1567 21.875 23.3114 20.3613 22.5029 18.1953ZM8.7 6.25H20.3V10.524L14.9437 8.66875C14.6552 8.5688 14.3448 8.5688 14.0563 8.66875L8.7 10.524V6.25Z" fill="white"/>
							</svg>							
						</label>

						${vessel.CompanyName === ysp_yacht_sync.company_name ? `<div class="company-banner"><img src="${ysp_yacht_sync.company_logo}"></div>` : ''}
				
						<span class="ri-price">${ price }</span>
					</a>	
				</div>

				<div class="result-item-info">
					<div class="ri-top">
						<a href="${ vessel._link }">
							<span class="ri-name">${vessel.ModelYear ? vessel.ModelYear : ''} ${vessel.MakeString ? vessel.MakeString : ''} ${vessel.Model ? vessel.Model : ''}</span><br />

							<span class="ri-sub-name">${ vessel.BoatName ? vessel.BoatName : 'N/A' }</span><br />

							<span class="ri-location">							
								<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M15.75 7.5C15.75 12.75 9 17.25 9 17.25C9 17.25 2.25 12.75 2.25 7.5C2.25 5.70979 2.96116 3.9929 4.22703 2.72703C5.4929 1.46116 7.20979 0.75 9 0.75C10.7902 0.75 12.5071 1.46116 13.773 2.72703C15.0388 3.9929 15.75 5.70979 15.75 7.5Z" stroke="#067AED" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z" stroke="#067AED" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
								${ vesselLocation }
							</span>
						</a>
					</div>

					<div class="ri-bottom">
						<span>
							
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
			
		`;
	};

	ysp_templates.yacht.compare_preview = function(vessel, params) {

		return `

			<div class="ysp-yacht-compare-preview" data-post-id="${ vessel._postID }" data-yacht-id="${ vessel.DocumentID }">			
				<span class="remove-from-compare">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#FFFFFF"/>
					<path d="M8.26876 14.9346C8.04909 15.1543 8.04909 15.5104 8.26876 15.7301C8.48843 15.9498 8.84458 15.9498 9.06425 15.7301L8.26876 14.9346ZM12.3976 12.3968C12.6173 12.1771 12.6173 11.8209 12.3976 11.6013C12.1779 11.3816 11.8218 11.3816 11.6021 11.6013L12.3976 12.3968ZM11.6018 11.6016C11.3821 11.8213 11.3821 12.1774 11.6018 12.3971C11.8214 12.6168 12.1776 12.6168 12.3973 12.3971L11.6018 11.6016ZM15.7306 9.06376C15.9503 8.84409 15.9503 8.48794 15.7306 8.26827C15.5109 8.0486 15.1548 8.0486 14.9351 8.26827L15.7306 9.06376ZM12.3973 11.6013C12.1776 11.3816 11.8214 11.3816 11.6018 11.6013C11.3821 11.8209 11.3821 12.1771 11.6018 12.3968L12.3973 11.6013ZM14.9351 15.7301C15.1548 15.9498 15.5109 15.9498 15.7306 15.7301C15.9503 15.5104 15.9503 15.1543 15.7306 14.9346L14.9351 15.7301ZM11.6021 12.3971C11.8218 12.6168 12.1779 12.6168 12.3976 12.3971C12.6173 12.1774 12.6173 11.8213 12.3976 11.6016L11.6021 12.3971ZM9.06425 8.26827C8.84458 8.0486 8.48843 8.0486 8.26876 8.26827C8.04909 8.48794 8.04909 8.84409 8.26876 9.06376L9.06425 8.26827ZM9.06425 15.7301L12.3976 12.3968L11.6021 11.6013L8.26876 14.9346L9.06425 15.7301ZM12.3973 12.3971L15.7306 9.06376L14.9351 8.26827L11.6018 11.6016L12.3973 12.3971ZM11.6018 12.3968L14.9351 15.7301L15.7306 14.9346L12.3973 11.6013L11.6018 12.3968ZM12.3976 11.6016L9.06425 8.26827L8.26876 9.06376L11.6021 12.3971L12.3976 11.6016Z" fill="#FFFFFF"/>
					</svg>
				</span>

				<a class="preview-link" href="${ vessel._link }">

					<img class="yacht-main-image" src="${vessel.Images ? vessel.Images[0].Uri : ysp_yacht_sync.assets_url + 'images/default-yacht-image.jpeg'}" alt="yacht-image" loading="lazy" />
				
					<h6 class="yacht-title">${vessel.ModelYear ? vessel.ModelYear : ''} ${vessel.MakeString ? vessel.MakeString : ''} ${vessel.Model ? vessel.Model : ''} ${vessel.BoatName ? vessel.BoatName : ''}</h6>
				</a>

			</div>

		`;

	};

	ysp_templates.noResults=function() {

        return `
            <div>
                <b>No Results</b>
            </div>
        `;

    };


    ysp_templates.yacht_tag = function(label, value) {

    	return `
    		<span>
	    		${value}

	    		<img src="${ysp_yacht_sync.assets_url}/images/remove-tag.png">
			</span>
    	`;
    };

    ysp_templates.pagination = {};
    
    	ysp_templates.pagination.next_text = `>`;

    	ysp_templates.pagination.prev_text = `<`;

