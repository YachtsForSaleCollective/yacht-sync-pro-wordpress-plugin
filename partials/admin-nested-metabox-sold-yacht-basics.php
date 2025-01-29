<?php

    $yacht_ysp_general_boat_description = get_post_meta( $post->ID, 'GeneralBoatDescription', true );

    $sales_rep = get_post_meta( $post->ID, 'SalesRep', true );

    if (isset($sales_rep->Name)) {
        $yacht_ysp_sales_rep_party_id = $sales_rep->PartyId;
        $yacht_ysp_sales_rep_name = $sales_rep->Name;
    }
    else {
        $yacht_ysp_sales_rep_party_id='';
        $yacht_ysp_sales_rep_name='';
    }

    $engines = get_post_meta( $post->ID, 'Engines', true );

    if(isset($engines[0])) {
        $yacht_ysp_engine_1_make = $engines[0]->Make;
        $yacht_ysp_engine_1_model = $engines[0]->Model;
        $yacht_ysp_engine_1_fuel = $engines[0]->Fuel;
        $yacht_ysp_engine_1_engine_power = $engines[0]->EnginePower;
        $yacht_ysp_engine_1_type = $engines[0]->Type;
        $yacht_ysp_engine_1_year = $engines[0]->Year;
        $yacht_ysp_engine_1_hours = $engines[0]->Hours;
        $yacht_ysp_engine_1_boat_engine_location_code = $engines[0]->BoatEngineLocationCode;
    }
    else {
        $yacht_ysp_engine_1_make = "";
        $yacht_ysp_engine_1_model = "";
        $yacht_ysp_engine_1_fuel = "";
        $yacht_ysp_engine_1_engine_power = "";
        $yacht_ysp_engine_1_type = "";
        $yacht_ysp_engine_1_year = "";
        $yacht_ysp_engine_1_hours = "";
        $yacht_ysp_engine_1_boat_engine_location_code = "";
    }

    if (isset($engines[1])) {
        $yacht_ysp_engine_2_make = $engines[1]->Make;
        $yacht_ysp_engine_2_model = $engines[1]->Model;
        $yacht_ysp_engine_2_fuel = $engines[1]->Fuel;
        $yacht_ysp_engine_2_engine_power = $engines[1]->EnginePower;
        $yacht_ysp_engine_2_type = $engines[1]->Type;
        $yacht_ysp_engine_2_year = $engines[1]->Year;
        $yacht_ysp_engine_2_hours = $engines[1]->Hours;
        $yacht_ysp_engine_2_boat_engine_location_code = $engines[1]->BoatEngineLocationCode;
    }
    else {
        $yacht_ysp_engine_2_make = "";
        $yacht_ysp_engine_2_model = "";
        $yacht_ysp_engine_2_fuel = "";
        $yacht_ysp_engine_2_engine_power = "";
        $yacht_ysp_engine_2_type = "";
        $yacht_ysp_engine_2_year = "";
        $yacht_ysp_engine_2_hours = "";
        $yacht_ysp_engine_2_boat_engine_location_code = "";
    }

    $images = get_post_meta( $post->ID, 'Images', true );
?>


<div id="sold-yacht-nested-metabox-basics">
    <fieldset class="field-group">
        <legend>General Details</legend>
        <div class="grid-container">
            <div class="metafield">
                <label>Sales Rep Name</label>
                <input type="text" name="YSP_Sales_Rep_Name" value="<?= $yacht_ysp_sales_rep_name ?>">
            </div>
            <div class="metafield">
                <label>Sales Rep Party ID</label>
                <input type="text" name="YSP_Sales_Rep_Party_ID" value="<?= $yacht_ysp_sales_rep_party_id ?>">
            </div>
            <div class="metafield metafield-full">
                <label>General Boat Description</label>
                <textarea name="General_Boat_Description" style="width: 100%; height: 300px;">
                    <?php if (isset($yacht_ysp_general_boat_description[0])) : ?>
                        <?= $yacht_ysp_general_boat_description[0] ?>
                    <?php endif; ?>
                </textarea>
            </div>
        </div>
    </fieldset>
    <fieldset class="field-group">
        <legend>Engine 1 Details</legend>
        <div class="grid-container">
            <div class="metafield">
                <label>Engine 1 Make</label>
                <input type="text" name="YSP_Engine_1_Make" value="<?= $yacht_ysp_engine_1_make ?>">
            </div>
            <div class="metafield">
                <label>Engine 1 Model</label>
                <input type="text" name="YSP_Engine_1_Model" value="<?= $yacht_ysp_engine_1_model ?>">
            </div>
            <div class="metafield">
                <label>Engine 1 Fuel</label>
                <input type="text" name="YSP_Engine_1_Fuel" value="<?= $yacht_ysp_engine_1_fuel ?>">
            </div>
            <div class="metafield">
                <label>Engine 1 Engine Power</label>
                <input type="text" name="YSP_Engine_1_EnginePower" value="<?= $yacht_ysp_engine_1_engine_power ?>">
            </div>
            <div class="metafield">
                <label>Engine 1 Type</label>
                <input type="text" name="YSP_Engine_1_Type" value="<?= $yacht_ysp_engine_1_type ?>">
            </div>
            <div class="metafield">
                <label>Engine 1 Year</label>
                <input type="text" name="YSP_Engine_1_Year" value="<?= $yacht_ysp_engine_1_year ?>">
            </div>
            <div class="metafield">
                <label>Engine 1 Hours</label>
                <input type="text" name="YSP_Engine_1_Hours" value="<?= $yacht_ysp_engine_1_hours ?>">
            </div>
            <div class="metafield">
                <label>Engine 1 Location Code</label>
                <input type="text" name="YSP_Engine_1_Boat_Engine_Location_Code" value="<?= $yacht_ysp_engine_1_boat_engine_location_code ?>">
            </div>
        </div>
    </fieldset>
    <fieldset class="field-group">
        <legend>Engine 2 Details</legend>
        <div class="grid-container">
            <div class="metafield">
                <label>Engine 2 Make</label>
                <input type="text" name="YSP_Engine_2_Make" value="<?= $yacht_ysp_engine_2_make ?>">
            </div>
            <div class="metafield">
                <label>Engine 2 Model</label>
                <input type="text" name="YSP_Engine_2_Model" value="<?= $yacht_ysp_engine_2_model ?>">
            </div>
            <div class="metafield">
                <label>Engine 2 Fuel</label>
                <input type="text" name="YSP_Engine_2_Fuel" value="<?= $yacht_ysp_engine_2_fuel ?>">
            </div>
            <div class="metafield">
                <label>Engine 2 Engine Power</label>
                <input type="text" name="YSP_Engine_2_EnginePower" value="<?= $yacht_ysp_engine_2_engine_power ?>">
            </div>
            <div class="metafield">
                <label>Engine 2 Type</label>
                <input type="text" name="YSP_Engine_2_Type" value="<?= $yacht_ysp_engine_2_type ?>">
            </div>
            <div class="metafield">
                <label>Engine 2 Year</label>
                <input type="text" name="YSP_Engine_2_Year" value="<?= $yacht_ysp_engine_2_year ?>">
            </div>
            <div class="metafield">
                <label>Engine 2 Hours</label>
                <input type="text" name="YSP_Engine_2_Hours" value="<?= $yacht_ysp_engine_2_hours ?>">
            </div>
            <div class="metafield">
                <label>Engine 2 Location Code</label>
                <input type="text" name="YSP_Engine_2_Boat_Engine_Location_Code" value="<?= $yacht_ysp_engine_2_boat_engine_location_code ?>">
            </div>
        </div>
    </fieldset>

    <fieldset class="field-group">
        <legend>Images</legend>
        <div class="grid-container">
            <?php for ($x = 0; $x <= 19; $x++) {
                $v = isset($images[$x]->Uri) ? $images[$x]->Uri : ''; ?>
                <div class="metafield">
                    <label>Image <?= $x ?></label>
                    <input type="text" name="YSP_Image_<?= $x ?>" value="<?= $v ?>">
                    <input type="button" value="Or Upload" data-name="YSP_Image_<?= $x ?>" class="ysp-manual-images-uploads">
                </div>
            <?php } ?>
        </div>
    </fieldset>
</div>

<script type="text/javascript">
    jQuery('#sold-yacht-nested-metabox-basics .ysp-manual-images-uploads').each(function() {
    
        jQuery(this).on('click', function(e) {
            e.preventDefault();

            // Uploading files
            let file_frame;

            let name = jQuery(this).data('name');


            // If the media frame already exists, reopen it.
            if (file_frame) {
                file_frame.open();
                return;
            }

            // Create the media frame.
            file_frame = wp.media.frames.file_frame = wp.media({
                title: jQuery(this).data('name'),
                button: {
                    text: 'select',
                },
                multiple: false // Set to true to allow multiple files to be selected
            });

            // When a file is selected, run a callback.
            file_frame.on('select', function() {
                // We set multiple to false so only get one image from the uploader
                let attachment = file_frame.state().get('selection').first().toJSON();

                let url = attachment.url;

                let field = document.querySelector('#sold-yacht-nested-metabox-basics input[name="'+ name +'"]');

                field.value = url;
            });

            file_frame.open();
        })
    });

</script>


<style type="text/css">
	/* `#sold-yacht-nested-metabox-basics` .metafield{
		display: block;
		margin-top: 10px;
		margin-bottom: 10px;
		padding-bottom: 10px;
		border-bottom: 1px solid #000;
	}

	#sold-yacht-nested-metabox-basics .metafield label{
		display: block;
		margin-bottom: 10px;
	}

	#sold-yacht-nested-metabox-basics .metafield input{
		display: block;
		width: 100%;
		max-width: 500px;

	}
    #sold-yacht-nested-metabox-basics .metafield input[type="button"]{
        margin-top: 20px;
    } */
    #sold-yacht-nested-metabox-basics {
        font-family: Arial, sans-serif;
    }

    .field-group {
        margin-bottom: 20px;
        padding: 15px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    .field-group legend {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
    }

    .metafield {
        margin-bottom: 15px;
    }

    .metafield-full {
        grid-column: span 2;
    }

    .metafield label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    .metafield input,
    .metafield textarea {
        width: 100%;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 3px;
    }

    .metafield input[type="button"] {
        margin-top: 10px;
        padding: 5px 10px;
        cursor: pointer;
    }
</style>