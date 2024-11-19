<div class="wrap">
	<h2><?php echo esc_html( get_admin_page_title() ); ?></h2>

	<form action="options.php" method="post">
		<?php
			settings_fields( self::SLUG );
			do_settings_sections( self::SLUG );
			submit_button();
		?>
	</form>
</div>
