jQuery(document).ready(function() {
  
  jQuery('[data-modal]').click(function(e) {
    e.preventDefault();
    
    console.log('fuck me ');

    var data_modal = jQuery(this).data('modal');

    jQuery( data_modal ).ysp_modal({
    	closeText: 'X',
      modalClass: 'ysp-modal-open',
      closeClass: 'ysp-model-close'
    });
  });
});
