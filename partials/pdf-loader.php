<?php
	$YSP_Options = new YachtSyncPro_Options();
		$YSP_logo = $YSP_Options->get('company_logo');
		$YSP_Comapny_logo = $YSP_Options->get('company_logo');
		$company_logo_url = wp_get_attachment_image_url($YSP_Comapny_logo, 'small');

	$pdf_url_parameters=[
		'yacht_post_id' =>  $request->get_param('yacht_post_id'),
		'template' =>  $request->get_param('template'),
		//'GalleryLimit' =>  $request->get_param('GalleryLimit')
	];

	$pdf_check_url=get_rest_url().'ysp/checker-yacht-pdf?'.http_build_query($pdf_url_parameters);
	$pdf_download_url=get_rest_url().'ysp/yacht-pdf-download?'.http_build_query($pdf_url_parameters);
?>
<!doctype html>
<html <?php language_attributes(); ?>>
	<head>
		<title>PDF Loading...</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
	</head>

	<body>
		<div style='display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;'>
			<img src="<?php echo esc_url($company_logo_url); ?>" alt="Company Logo" style="height: 120px;" />
		    
		    <div style='margin-top: 20px; text-align: center;'>
		        <b>LOADING PDF</b><br>
		        Our servers are generating this document in real-time. Please wait a few seconds.
		    </div>
			<img src='<?php echo YSP_ASSETS; ?>images/loading-icon.gif' alt='Loading Icon' style="height: 120px; width:120px;" />
		</div>

		<script type="text/javascript">

		    var xhttp = new XMLHttpRequest();

		    new Promise(function(resolve, reject) {
		        
		        xhttp.onreadystatechange = function() {
		            if (this.readyState == 4 && this.status == 200) {

		                //var responseData = JSON.parse( this.responseText );

		                resolve();
		            }
		        };					            

		        //xhttp.open("GET", "https://api.urlbox.io/v1/0FbOuhgmL1s2bINM/pdf?url=<?= get_rest_url() ?>ysp/yacht-pdf?yacht_post_id=<?php echo $request->get_param('yacht_post_id'); ?>", true);
		        xhttp.open("GET", "<?= $pdf_check_url ?>", true);

		        xhttp.setRequestHeader('Content-Type', 'application/pdf');

		        xhttp.send();
		        
		    }).then(function( rData) {

		    	setTimeout(function() {
		    		window.location.href="<?= $pdf_download_url ?>";

		    	}, 1000);


		  	});


		</script>
	</body>
</html>