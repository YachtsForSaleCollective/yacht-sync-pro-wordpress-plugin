
document.addEventListener("DOMContentLoaded", function() {

	let ele_quick_search = document.querySelector('.ysp-quick-search-form');

	if (ele_quick_search) {
		// Fill options
	    let FillOptions=[];
	    let selectorElements = document.querySelectorAll(".ysp-quick-search-form select[data-fill-options]");

	    selectorElements.forEach((ele) => {
	        FillOptions.push(ele.getAttribute('data-fill-options'));
	    });
	    
	    ysp_api.call_api('POST', 'dropdown-options', {labels: FillOptions}).then(function(rOptions) {
	        for (let label in rOptions) {

	            let SelectorEle = document.querySelectorAll(".ysp-quick-search-form select[data-fill-options='"+ label +"']");
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
	                console.log(UrlVal);

	                if (typeof UrlVal == 'string') {
	                    UrlVal = UrlVal.eachWordCapitalize();
	                }

	                SelectorEle.forEach((ele) => {
	                    ele.value = UrlVal; 
	                });

	            }


	            let hasPretty = pretty_url_path_params[ name ];

	            console.log( pretty_url_path_params[ name ]);

	            if (hasPretty != '' && hasPretty != null) {
	                SelectorEle.forEach((ele) => {
	                    ele.value = hasPretty; 
	                });

	            }
	        }
	    })
	}
});