document.addEventListener('DOMContentLoaded', function() {
    let LeadForms = document.querySelectorAll('.ysp-lead-form-v2');

    LeadForms.forEach((fEle) => {
        fEle.addEventListener('submit', function(e) {
            e.preventDefault();

            let formData = ysp_get_form_data(e.target);
            
            ysp_api.call_api("POST", 'lead-v2', formData)
                .then(function(data_result) {
                    e.target.querySelector('.success-message').style.display = 'block';

                    e.target.querySelector('.hide-after-submit').style.display = 'none';
                })
                .catch(function(error) {
                    console.log(error);
                });
        });
    });
    
});
