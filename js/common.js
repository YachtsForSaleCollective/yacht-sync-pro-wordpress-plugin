Object.defineProperty(String.prototype, 'eachWordCapitalize', {
  value: function() {
    return this.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
  },
  enumerable: false
});

function ysp_get_form_data(form_ele) {
    let formData = new FormData( form_ele );

    let fd=Object.fromEntries(formData.entries());

    for (const [fIndex, field] of Object.entries(fd)) {

        let ValArray = formData.getAll(fIndex);

        if (typeof ValArray[1] != 'undefined') {
            fd[ fIndex ] = ValArray;
        }

        if (fd[ fIndex ] == '') {
            delete fd[fIndex];
        }
    }

    return fd;
}

function ysp_set_form_to_data(inputData) {

    let formA=document.querySelector('.ysp-yacht-search-form');
    let formB=document.querySelector('#ysp-mobile-yacht-search-form');

    formA.reset();
    formB.reset();

    let formInputs=document.querySelectorAll('.ysp-yacht-search-form *[name], *[name][form="ysp-yacht-search-form"], #ysp-mobile-yacht-search-form *[name], *[name][form="ysp-mobile-yacht-search-form"]');

    formInputs.forEach((ele) => {
        let input = ele;

        let name = ele.getAttribute('name');

        let hasPretty = inputData[ name ];

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
    });
}

function ysp_push_history( data = {} ) {
    let searchParams = new URLSearchParams();
    let strpath='';

    for (const property in data) {
        let it = data[ property ];


        if (it != '' && typeof it != 'undefined' && typeof it == 'string' && property != 'OnFirstLoad' && typeof it != 'object') {
            searchParams.set(property, it);

            strpath=strpath+""+property+'-'+(it.toString().split(' ').join('-'))+'/';
            strpath=strpath.toLowerCase();
        }
        else if (Array.isArray(it)) {
            searchParams.set(property, it);

            it = it.map((prop) => { return prop.toString().split(' ').join('-'); });

            strpath=strpath+""+property+'-'+( it.join("+") )+'/';
            strpath=strpath.toLowerCase();  
        }
    }
    
    //history.pushState(data, '', ysp_yacht_sync.yacht_search_url+'?'+searchParams.toString());
    history.pushState(data, '', ysp_yacht_sync.yacht_search_url+strpath);

    return ysp_yacht_sync.yacht_search_url+strpath;    
}

