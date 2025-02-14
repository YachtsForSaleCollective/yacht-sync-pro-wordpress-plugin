var YSP_VesselCompareList=[];


function ysp_restoreCompares() {
    let URLREF=new URL(location.href); // maybe for a re-do
    let compare_post_ids = URLREF.searchParams.get( 'restore_to_compare' ); 

    console.log(typeof compare_post_ids);
    console.log(compare_post_ids);

    if (typeof compare_post_ids == 'string') {
        YSP_VesselCompareList = compare_post_ids.split(',');
    

        ysp_makeCompareLinkout();
    }



}


function ysp_makeCompareVessel(ele_card) {
	 
	 jQuery('.compare_toggle', ele_card).change(function(e) {
	 	console.log('howdy');

        e.preventDefault();
    
        jQuery(this).toggleClass('armed');

        let yachtId = ele_card.data('post-id');
    
        if ( jQuery(this).hasClass('armed') ) {
            ysp_addVesselToCompareList(yachtId);
        }
        else {
            ysp_removeVesselToCompareList(yachtId);
        }

    });

    let yachtId = ele_card.data('post-id');

    if (YSP_VesselCompareList.indexOf( yachtId ) != -1  || YSP_VesselCompareList.indexOf( yachtId.toString() ) != -1 ) {

        console.log('hello world restored');

        ele_card.addClass('armed');

        jQuery('.compare_toggle', ele_card).addClass('armed').prop('checked', true);

    }

}

function ysp_addVesselToCompareList(yachtId) {

    if (YSP_VesselCompareList.indexOf( yachtId ) == -1) {

    	YSP_VesselCompareList.push(yachtId);
        
    }
    
    ysp_makeCompareLinkout();
}
    
function ysp_removeVesselToCompareList(yachtId) {
	let indexed = YSP_VesselCompareList.indexOf( yachtId )

	if ( indexed != -1) {

    	delete YSP_VesselCompareList[indexed];        
        YSP_VesselCompareList.splice(indexed, 1);
  		
        
    }

    ysp_makeCompareLinkout();
}

function ysp_makeCompareLinkout() {

    if (YSP_VesselCompareList.length >= 2) {
        if (document.getElementById('ysp_compare_linkout')) {
            document.getElementById('ysp_compare_linkout').href=ysp_yacht_sync.wp_rest_url+"ysp/compare/?postID="+YSP_VesselCompareList.join(',');
    	    document.getElementById('ysp_compare_linkout').innerHTML=`<button type="button" class="ysp-general-button">Compare ( ${YSP_VesselCompareList.length} )</button>`;
        }

        if (document.getElementById('ysp_compare_linkout_mobile')) {
            document.getElementById('ysp_compare_linkout_mobile').href=ysp_yacht_sync.wp_rest_url+"ysp/compare/?postID="+YSP_VesselCompareList.join(',');
    	    document.getElementById('ysp_compare_linkout_mobile').innerHTML=`<button type="button" class="ysp-general-button">Compare ( ${YSP_VesselCompareList.length} )</button>`;
        }
        
        let params = {
            'post__in': YSP_VesselCompareList,
        };

        return ysp_api.call_api("POST", "yachts", params).then(function(data_result) {

            jQuery('#ysp-compare-previews').html('');

            data_result.results.forEach(function(item) {
                jQuery('#ysp-compare-previews').append( ysp_templates.yacht.compare_preview(item, params) );

                let ele_preview = jQuery('#ysp-compare-previews *[data-post-id='+ item._postID +']');
                
                jQuery('.remove-from-compare', ele_preview).click(function() {
                    jQuery('div[data-post-id='+ item._postID +'] .compare_toggle').prop('checked', false).removeClass('armed');

                    ysp_removeVesselToCompareList(item._postID);
                
                    ysp_makeCompareLinkout();


                });

            });

        });
    }
    else {
        jQuery('#ysp-compare-previews').html('<span style="color: #fff;">Pick two to compare.</span>');
        jQuery('#ysp_compare_linkout').html('');
        jQuery('#ysp_compare_linkout_mobile').html('');
    }


    



}
