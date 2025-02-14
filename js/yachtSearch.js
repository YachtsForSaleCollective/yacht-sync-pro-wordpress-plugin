const yspBeforeYachtSearch = new Event("ysp-before-submitting-yacht-search");
const yspAfterYachtSearch = new Event("ysp-after-submitting-yacht-search");
const yspAfterRenderingYacht = new Event("ysp-after-rendering-yacht-search");

function ysp_yacht_search_and_reader(data) {

    console.log(data);

    jQuery('#ysp-the-yacht-results').html('');
    jQuery('#ysp-yacht-results-pagination').html('');

    document.querySelector('#ysp-yacht-results-section').classList.remove('loaded');
    document.querySelector('#ysp-yacht-results-section').classList.add('loading');

    ysp_set_form_to_data( data );

    ysp_makeSearchTags( data );

    // GET AND WRITE
    return ysp_api.call_api("POST", "yachts", data).then(function(data_result) {

        document.querySelector('#ysp-yacht-results-section').classList.remove('loading');
        document.querySelector('#ysp-yacht-results-section').classList.add('loaded');

        document.title = data_result.SEO.title;
        jQuery('#ysp-search-heading').text(data_result.SEO.heading);
        jQuery('#ysp-search-paragraph').text(data_result.SEO.p);

        jQuery('#ysp-total-yacht-results').text(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(data_result.total));

        let currentURL=null;

        if (typeof data.dont_push == 'undefined') {
            currentURL=ysp_push_history( data );
        }
        else {
            currentURL = location.href;
        }
        
        if (data_result.total > 0) {

            jQuery('#ysp-the-yacht-results').removeClass(['view-grid', 'view-list']);

             if (typeof data.view != 'undefined' && data.view.toLowerCase() == 'list') {
                jQuery('#ysp-the-yacht-results').addClass('view-list');
            }
            else {
                jQuery('#ysp-the-yacht-results').addClass('view-grid');
            }

            data_result.results.forEach(function(item) {
                if (typeof data.view != 'undefined' && data.view.toLowerCase() == 'list') {
                    jQuery('#ysp-the-yacht-results').addClass('view-list').removeClass('view-grid');
                    jQuery('#ysp-the-yacht-results').append( ysp_templates.yacht.list(item, data) );
                }
                else {
                    jQuery('#ysp-the-yacht-results').addClass('view-grid');
                    jQuery('#ysp-the-yacht-results').append( ysp_templates.yacht.grid(item, data) );
                }

                let ele_card = jQuery('#ysp-the-yacht-results [data-post-id='+ item._postID +']');

                jQuery('[data-modal=#ysp-yacht-results-lead-modal]', ele_card).click(function(e) {
                    e.preventDefault();
                
                    let BoatName = item.ModelYear + ' ' + item.MakeString + ' ' + item.BoatName;

                    jQuery('#ysp-yacht-results-lead-modal .boatname').html(BoatName);
                    jQuery('#ysp-yacht-results-lead-modal input[name=WhichBoat]').val(BoatName);
                    jQuery('#ysp-yacht-results-lead-modal input[name=WhichBoatID]').val(item._postID);

                    var data_modal = jQuery(this).data('modal');

                    jQuery( data_modal ).ysp_modal({
                        closeText: 'X',
                        modalClass: 'ysp-modal-open',
                        closeClass: 'ysp-model-close'
                    });
                });

                ysp_markLovedVessel( ele_card );     
                ysp_makeCompareVessel( ele_card );           
            });

            jQuery('#ysp-yacht-results-pagination').pagination({
                items: data_result.total,
                itemsOnPage: 12,
                currentPage: data.page_index,
                prevText: ysp_templates.pagination.prev_text,
                nextText: ysp_templates.pagination.next_text,
                edges: 4,
                displayedPages: 4,
                hrefTextPrefix: currentURL.replace(new RegExp("page_index-(\\d*)(/)", "g"), "")+'page_index-',
                hrefTextSuffix: '/',
                onPageClick: function(pageNumber, event) {
                    event.preventDefault();

                    document.querySelector('.ysp-yacht-search-form input[name=page_index]').value=pageNumber;

                    let formDataObject = ysp_get_form_data( document.querySelector('.ysp-yacht-search-form') );

                    ysp_yacht_search_and_reader(formDataObject);
                }
            });
        } 
        else {
            jQuery('#ysp-the-yacht-results').append(ysp_templates.noResults());
        }

        jQuery([document.documentElement, document.body]).animate({
            scrollTop: (jQuery(".scroll-to-here-on-yacht-search").offset().top)
        }, 250);

        document.querySelector('.ysp-yacht-search-form:not(#ysp-mobile-yacht-search-form)').dispatchEvent(yspAfterRenderingYacht);

        return data_result;

    }).catch(function(error) {

        console.log(error);

    });
}

document.addEventListener("DOMContentLoaded", function() {

    // Fill List Options
    let FillLists=[];
    let listElements = document.querySelectorAll("datalist[data-fill-list]");
    let listNeededElements = document.querySelectorAll("input[list]");

    listElements.forEach((ele) => {
        FillLists.push(ele.getAttribute('data-fill-list'));
    });

    listNeededElements.forEach((input_ele) => {

        input_ele.addEventListener('input', function(event) {

            let list_id = event.target.getAttribute('list');

            let ele_list = document.querySelector("datalist#"+list_id);

            if (event.target.value.length <= 3) {

                ysp_api.call_api(
                    'POST', 
                    'list-options-with-value', 
                    {
                        labels: [ ele_list.getAttribute('data-fill-list') ], 
                        value: event.target.value
                    }
                ).then(function(rOptions) {

                    for (let label in rOptions) {

                        let SelectorEle = document.querySelectorAll("datalist[data-fill-list='"+ label +"']");

                        SelectorEle.forEach((ele) => {
                            ele.innerHTML = '';
                        });
                        
                        rOptions[label].forEach(function(b) {

                            let option = document.createElement("OPTION");

                                option.text = b;
                                option.value = b;

                            SelectorEle.forEach((ele) => {
                                ele.append(option);
                            });
                        });
                    }

                });

            }


        });

    })
    
/*    ysp_api.call_api('POST', 'list-options', {labels: FillLists}).then(function(rOptions) {
        for (let label in rOptions) {

            let SelectorEle = document.querySelectorAll("datalist[data-fill-list='"+ label +"']");

            rOptions[label].forEach(function(b) {

                let option = document.createElement("OPTION");

                    option.text = b;
                    option.value = b;

                SelectorEle.forEach((ele) => {
                    ele.append(option);
                });
            });
        }
    });
*/
    let yachtSearchAndResults=document.querySelector('#ysp-yacht-search-form');

    if (yachtSearchAndResults) {
        document.querySelectorAll('.open-mobile-search').forEach((omse) => {
            omse.addEventListener('click', function(e) {

                document.querySelector('#ysp-super-mobile-search').style.display='block';
                document.querySelector('body').style.overflowY='hidden';
                document.querySelector('body').classList.add('ysp-mobile-yacht-search-open');

            });
        });
        
        if (document.querySelector('#close-mobile-search')) {
            document.querySelector('#close-mobile-search').addEventListener('click', function(e) {

                document.querySelector('#ysp-super-mobile-search').style.display='none';
                document.querySelector('body').style.overflowY='unset';
                document.querySelector('body').classList.remove('ysp-mobile-yacht-search-open');

            });
            
        }

        yachtSearchAndResults.addEventListener('submit', function(e) {
            e.preventDefault();

            e.target.dispatchEvent(yspBeforeYachtSearch);

            e.target.querySelector('input[name=page_index]').value=1;

            let params = ysp_get_form_data(e.target);

            ysp_yacht_search_and_reader( params ).then(function(api_data) {

                e.target.dispatchEvent(yspAfterYachtSearch);

            });

        }); 

        yachtSearchAndResults.querySelectorAll('input.submit-on-change').forEach((eleInput) => {
            eleInput.addEventListener('change', function(e) {
                e.target.form.requestSubmit();
            });
        });

        yachtSearchAndResults.querySelectorAll('input[type=reset]').forEach((eleReset) => {
            eleReset.addEventListener('click', function(e) {
                e.target.form.requestSubmit();
            });
        });

        if (document.querySelector('input[name="ys_company_only"]')) {
            document.querySelectorAll('input[name="ys_company_only"]').forEach(function(eleCheck) {
                eleCheck.addEventListener('change', function(e) {
                    e.target.form.requestSubmit();
                });
            })            
        }

        document.querySelectorAll('input[name=view][form=ysp-yacht-search-form], select[name=view][form=ysp-yacht-search-form],  select[name=sortby][form=ysp-yacht-search-form]').forEach((eleViewOption) => {
            eleViewOption.addEventListener('change', function(e) {
                e.target.form.requestSubmit();
            });
        });

        document.querySelectorAll('.pick-all').forEach(function(ele) {
            ele.addEventListener('click', function(e) {

                let input_name = e.target.getAttribute('name');

                document.querySelectorAll('input[name="'+ input_name +'"]').forEach((eleInput) => {
                    eleInput.checked=false;
                })

            });
        });

        // PRETTY URL
        let strpaths=window.location.href;

        strpaths=strpaths.replace(ysp_yacht_sync.yacht_search_page_id, '');

        let paths = strpaths.split("/");

        let pretty_url_path_params={};

        paths.forEach(function(path) {

            if (path != '') {
                let phase_path = path.split('-');
                let only_vals=phase_path.slice(1);

                only_vals=only_vals.join(' ').eachWordCapitalize();
                
                let only_vals_array=(only_vals.split('+'));

                if (typeof only_vals_array[1] != 'undefined') {
                    only_vals = only_vals_array.map((ov) => {
                        return ov.eachWordCapitalize();
                    });

                    //console.log(only_vals);
                }

                pretty_url_path_params[phase_path[0]]=only_vals;
            }

        });

        //console.log(pretty_url_path_params);

        // Restore Fields

        let URLREF=new URL(location.href); // maybe for a re-do

        let formInputs=document.querySelectorAll('.ysp-yacht-search-form *[name], *[name][form="ysp-yacht-search-form"], #ysp-mobile-yacht-search-form *[name], *[name][form="ysp-mobile-yacht-search-form"]');

        formInputs.forEach((ele) => {
            let input = ele;

            let name = ele.getAttribute('name');

            let urlVal = URLREF.searchParams.get( name );
                // urlVal = ;
   

            let hasPretty = pretty_url_path_params[ name ];

           // console.log(hasPretty);

            if (typeof hasPretty != 'null' && typeof hasPretty != 'undefined') {

                if (Array.isArray(hasPretty)) {
                    //console.log(hasPretty);

                    hasPretty.forEach((hP) => {

                        if (typeof input.type != 'undefined' && (input.type == 'checkbox' || input.type == 'radio') && input.getAttribute('value') == hP ) {
                            input.checked=true;
                        }
                   

                    });

                }
                else {

                    if (typeof input.type != 'undefined' && (input.type == 'checkbox' || input.type == 'radio') && input.getAttribute('value') == hasPretty ) {
                        input.checked=true;
                    }
                    else if (input.type != 'checkbox' && input.type != 'radio') {
                        input.value = hasPretty;
                    }

                }

            }

            if (urlVal != '' && urlVal != null) {

                if (typeof urlVal == 'string') {
                    urlVal = urlVal.eachWordCapitalize();
                }

                if (typeof input.type != 'undefined' &&  (input.type == 'checkbox' || input.type == 'radio') && input.getAttribute('value') == urlVal ) {
                    input.checked=true;
                }
                else if (input.type != 'checkbox' && input.type != 'radio') {
                    input.value = urlVal;
                }

            }
        });

        // Restore Compare
         ysp_restoreCompares();

        // Fill options
        let FillOptions=[];
        let selectorElements = document.querySelectorAll("select[data-fill-options]");

        selectorElements.forEach((ele) => {
            FillOptions.push(ele.getAttribute('data-fill-options'));
        });
        
        ysp_api.call_api('POST', 'dropdown-options', {labels: FillOptions}).then(function(rOptions) {
            for (let label in rOptions) {

                let SelectorEle = document.querySelectorAll("select[data-fill-options='"+ label +"']");

                console.log(SelectorEle);

                let name = SelectorEle[0].getAttribute('name');

                rOptions[label].forEach(function(b) {
                    SelectorEle.forEach((ele) => {
                        let option = document.createElement("OPTION");

                        if (typeof b == 'object') {
                            option.text = b.t;
                            option.value = b.v;
                        }
                        else {
                            option.text = b;
                            option.value = b;
                        }
                        
                        ele.add(option);
                    });
                });

                let URLREF = new URL(location.href);
                let UrlVal = URLREF.searchParams.get( name );

                let strpaths=window.location.href;

                strpaths=strpaths.replace(ysp_yacht_sync.yacht_search_page_id, '');

                let paths = strpaths.split("/");

                let pretty_url_path_params={};

                paths.forEach(function(path) {

                    if (path != '') {
                        let phase_path = path.split('-');
                        let only_vals=phase_path.slice(1);

                        pretty_url_path_params[phase_path[0]]=only_vals.join(' ');

                        if (typeof pretty_url_path_params[phase_path[0]] == 'string') {
                           pretty_url_path_params[phase_path[0]] = pretty_url_path_params[phase_path[0]].eachWordCapitalize();
                        }
                    }

                });
                
                if (UrlVal != '' && UrlVal != null) {
                    //console.log(UrlVal);

                    if (typeof UrlVal == 'string') {
                        UrlVal = UrlVal.eachWordCapitalize();
                    }

                    SelectorEle.forEach((ele) => {
                        ele.value = UrlVal; 

                        if (ele.value == '') {
                            ele.value = UrlVal.toUpperCase();
                        }
                    });

                }

                let hasPretty = pretty_url_path_params[ name ];

                //console.log( pretty_url_path_params[ name ]);

                if (hasPretty != '' && hasPretty != null) {
                    SelectorEle.forEach((ele) => {
                        ele.value = hasPretty; 

                        if (ele.value == '') {
                            ele.value = hasPretty.toUpperCase();
                        }
                    }); 
                }
            }
        }).then(function () {
            // Render Yachts For Page Load
            let params = ysp_get_form_data(document.querySelector('.ysp-yacht-search-form'));
                console.log(params);

            // Liked / Loved 
            if (typeof params.ys_yachts_loved != 'undefined') {

                let loved_yachts = JSON.parse( localStorage.getItem('ysp_loved_vessels') );

                if (loved_yachts.length > 0) {
                    params.ys_only_these = loved_yachts.join(',');

                }
                else {
                    params.ys_only_these="0,0,0";
                }
            }


            ysp_yacht_search_and_reader( params );       
        });

        let mobileForm = document.querySelector('#ysp-mobile-yacht-search-form');

        if (mobileForm) {
            mobileForm.addEventListener('submit', function(e) {
                e.preventDefault();

                e.target.querySelector('input[name=page_index]').value=1;

                document.querySelector('#ysp-super-mobile-search').style.display='none';
                document.querySelector('body').style.overflowY='unset';

                let params = ysp_get_form_data(e.target);               

                ysp_yacht_search_and_reader( params );

            }); 
        }
            
    }

});