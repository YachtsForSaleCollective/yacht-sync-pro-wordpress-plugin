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

		return `
			<div class="yacht-result-grid-item grid-view" data-post-id="${ vessel._postID }" data-yacht-id="${ vessel.DocumentID }">
				<div class="yacht-main-image-container">
					<a class="yacht-details" href="${ vessel._link }">
						<img class="yacht-main-image" src="${vessel.Images ? vessel.Images[0].Uri : ysp_yacht_sync.assets_url + 'images/default-yacht-image.jpeg'}" alt="yacht-image" loading="lazy" />
						<svg class="like-me love" xmlns="http://www.w3.org/2000/svg" width="57" height="54" viewBox="0 0 57 54" fill="none"  data-yacht-id="${ vessel.DocumentID }">
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
						${vessel.CompanyName === ysp_yacht_sync.company_name ? `<div class="company-banner"><img src="${ysp_yacht_sync.company_logo}"></div>` : ''}
					</a>	
				</div>
				<div class="yacht-general-info-container">
					<div class="yacht-title-container">
						<a class="yacht-details" href="${ vessel._link }">
							<h6 class="yacht-title">${vessel.ModelYear ? vessel.ModelYear : ''} ${vessel.MakeString ? vessel.MakeString : ''} ${vessel.Model ? vessel.Model : ''} ${vessel.BoatName ? vessel.BoatName : ''}</h6>
						</a>
					</div>
					<div class="yacht-info-container">
						<div class="yacht-info">
							<div class="yacht-individual-container">
								<p class="yacht-individual-title">Year</p>
								<p class="yacht-individual-value">${vessel.ModelYear ? vessel.ModelYear : 'N/A'}</p>
							</div>
							<div class="yacht-individual-container">
								<p class="yacht-individual-title">Cabins</p>
								<p class="yacht-individual-value">${vessel.CabinsCountNumeric ? vessel.CabinsCountNumeric : 'N/A'}</p>
							</div>
							<div class="yacht-individual-container">
								<p class="yacht-individual-title">Builder</p>
								<p class="yacht-individual-value">${vessel.MakeString ? vessel.MakeString : 'N/A'}</p>
							</div>
							<div class="yacht-individual-container">
								<p class="yacht-individual-title">Length</p>
								<p class="yacht-individual-value">${length}</p>
							</div>
							<div class="yacht-individual-container">
								<p class="yacht-individual-title">Compare</p>
								<p class="yacht-individual-value"><input type="checkbox" class="compare_toggle" name="compare" value="${ vessel._postID }" /></p>
							</div>
						</div>
					</div>
					<div class="yacht-price-details-container">
						<div class="yacht-price-container">
							<p class="yacht-price">${price}</p>
						</div>
						
						<button class="yacht-download-button" type="button" data-modal="#single-share">Contact</button>
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

		return `
			<div class="yacht-result-grid-item list-view" data-post-id="${ vessel._postID }" data-yacht-id="${ vessel.DocumentID }">
				<div class="yacht-main-image-container">
					<a class="yacht-details" href="${ vessel._link }">
						<img class="yacht-main-image" src="${vessel.Images ? vessel.Images[0].Uri : vessel.Images ? vessel.Images[0].Uri : ysp_yacht_sync.assets_url + 'images/default-yacht-image.jpeg'}" alt="yacht-image" loading="lazy" />
						<svg class="like-me love" xmlns="http://www.w3.org/2000/svg" width="57" height="54" viewBox="0 0 57 54" fill="none"  data-yacht-id="${ vessel.DocumentID }">
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
					</a>
				</div>
				<div class="yacht-general-info-container">
					<div class="yacht-title-container">
						<a class="yacht-details" href="${ vessel._link }">
							<h6 class="yacht-title">${vessel.ModelYear ? vessel.ModelYear : ''} ${vessel.MakeString ? vessel.MakeString : ''} ${vessel.Model ? vessel.Model : ''} ${vessel.BoatName ? vessel.BoatName : ''}</h6>
						</a>
					</div>
					<div class="yacht-info-container">
						<div class="yacht-info">
							<div class="yacht-individual-container">
								<p class="yacht-individual-title">Year</p>
								<p class="yacht-individual-value">${vessel.ModelYear ? vessel.ModelYear : 'N/A'}</p>
							</div>
							<div class="yacht-individual-container">
								<p class="yacht-individual-title">Cabins</p>
								<p class="yacht-individual-value">${vessel.CabinsCountNumeric ? vessel.CabinsCountNumeric : 'N/A'}</p>
							</div>
							<div class="yacht-individual-container">
								<p class="yacht-individual-title">Builder</p>
								<p class="yacht-individual-value">${vessel.MakeString ? vessel.MakeString : 'N/A'}</p>
							</div>
							<div class="yacht-individual-container">
								<p class="yacht-individual-title">Length</p>
								<p class="yacht-individual-value">${length}</p>
							</div>
							<div class="yacht-individual-container">
								<p class="yacht-individual-title">Compare</p>
								<p class="yacht-individual-value"><input type="checkbox" class="compare_toggle" name="compare" value="${ vessel._postID }" /></p>
							</div>
						</div>
					</div>
					<div class="yacht-price-details-container">
						<div class="yacht-price-container">
							<p class="yacht-price">${price}</p>
						</div>
						
						<button class="yacht-download-button" type="button" data-modal="#single-share">Contact</button>
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


				<img class="yacht-main-image" src="${vessel.Images ? vessel.Images[0].Uri : ysp_yacht_sync.assets_url + 'images/default-yacht-image.jpeg'}" alt="yacht-image" loading="lazy" />
				<a class="preview-link" href="${ vessel._link }">
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

