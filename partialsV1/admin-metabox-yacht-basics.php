<?php 
	$yacht_ysp_beam_feet = get_post_meta( $post->ID, 'YSP_BeamFeet', true );
	$yacht_ysp_beam_meter = get_post_meta( $post->ID, 'YSP_BeamMeter', true );
	$yacht_ysp_broker_name = get_post_meta( $post->ID, 'YSP_BrokerName', true );
	$yacht_ysp_city = get_post_meta( $post->ID, 'YSP_City', true );
	$yacht_ysp_country_id = get_post_meta( $post->ID, 'YSP_CountryID', true );
	$yacht_ysp_state = get_post_meta( $post->ID, 'YSP_State', true );
	$yacht_ysp_engine_count = get_post_meta( $post->ID, 'YSP_EngineCount', true );
	$yacht_ysp_engine_fuel = get_post_meta( $post->ID, 'YSP_EngineFuel', true );
	$yacht_ysp_engine_hours = get_post_meta( $post->ID, 'YSP_EngineHours', true );
	$yacht_ysp_engine_model = get_post_meta( $post->ID, 'YSP_EngineModel', true );
	$yacht_ysp_engine_power = get_post_meta( $post->ID, 'YSP_EnginePower', true );
	$yacht_ysp_engine_type = get_post_meta( $post->ID, 'YSP_EngineType', true );
	$yacht_ysp_usd_val = get_post_meta( $post->ID, 'YSP_USDVal', true );
	$yacht_norm_price = get_post_meta( $post->ID, 'NormPrice', true );
	$yacht_ysp_euro_val = get_post_meta( $post->ID, 'YSP_EuroVal', true );
	$yacht_ysp_aud_val = get_post_meta( $post->ID, 'YSP_AUDVal', true );
	$yacht_ysp_loa_feet = get_post_meta( $post->ID, 'YSP_LOAFeet', true );
	$yacht_ysp_loa_meter = get_post_meta( $post->ID, 'YSP_LOAMeter', true );
	$yacht_ysp_length = get_post_meta( $post->ID, 'YSP_Length', true );
	$yacht_ysp_NominalLength = get_post_meta( $post->ID, 'NominalLength', true );
	$yacht_ysp_listing_date = get_post_meta( $post->ID, 'YSP_ListingDate', true );
	$yacht_make_string = get_post_meta( $post->ID, 'MakeString', true );
	$yacht_model = get_post_meta( $post->ID, 'Model', true );
	$yacht_model_year = get_post_meta( $post->ID, 'ModelYear', true );
	$yacht_sales_status = get_post_meta( $post->ID, 'SalesStatus', true );
	$yacht_sale_class_code = get_post_meta( $post->ID, 'SaleClassCode', true );

	$yacht_additional_detail_description = get_post_meta( $post->ID, 'AdditionalDetailDescription', true );
	$yacht_boat_category_code = get_post_meta( $post->ID, 'BoatCategoryCode', true );
	$yacht_boat_class_code = get_post_meta( $post->ID, 'BoatClassCode', true );
	$yacht_has_boat_hull_id = get_post_meta( $post->ID, 'HasBoatHullID', true );
	$yacht_boat_hull_id = get_post_meta( $post->ID, 'BoatHullID', true );
	$yacht_boat_hull_material_code = get_post_meta( $post->ID, 'BoatHullMaterialCode', true );
	$yacht_boat_name = get_post_meta( $post->ID, 'BoatName', true );
	$yacht_company_boat = get_post_meta( $post->ID, 'CompanyBoat', true );
	$yacht_company_name = get_post_meta( $post->ID, 'CompanyName', true );
	$yacht_document_id = get_post_meta( $post->ID, 'DocumentID', true );
	$yacht_general_boat_description = get_post_meta( $post->ID, 'GeneralBoatDescription', true );
	$yacht_fuel_tank_capacity_measure = get_post_meta( $post->ID, 'FuelTankCapacityMeasure', true );
	$yacht_fuel_tank_count_numeric = get_post_meta( $post->ID, 'FuelTankCountNumeric', true );
	$yacht_fuel_tank_material_code = get_post_meta( $post->ID, 'FuelTankMaterialCode', true );
	$yacht_heads_count_numeric = get_post_meta( $post->ID, 'HeadsCountNumeric', true );
	$yacht_holding_tank_capacity_measure = get_post_meta( $post->ID, 'HoldingTankCapacityMeasure', true );
	$yacht_holding_tank_count_numeric = get_post_meta( $post->ID, 'HoldingTankCountNumeric', true );
	$yacht_holding_tank_material_code = get_post_meta( $post->ID, 'HoldingTankMaterialCode', true );
	$yacht_water_tank_capacity_measure = get_post_meta( $post->ID, 'WaterTankCapacityMeasure', true );
	$yacht_water_tank_count_numeric = get_post_meta( $post->ID, 'WaterTankCountNumeric', true );
	$yacht_water_tank_material_code = get_post_meta( $post->ID, 'WaterTankMaterialCode', true );
	$yacht_total_engine_hours_numeric = get_post_meta( $post->ID, 'TotalEngineHoursNumeric', true );
	$yacht_total_engine_power_quantity = get_post_meta( $post->ID, 'TotalEnginePowerQuantity', true );

	$yacht_ysp_country_weight = get_post_meta( $post->ID, 'COUNTRY_WEIGHT', true );
	$yacht_ysp_make_weight = get_post_meta( $post->ID, 'MakeWeight', true );
	$yacht_ysp_company_weight = get_post_meta( $post->ID, 'CompanyWeight', true );
	$yacht_ysp_sales_status_weight = get_post_meta( $post->ID, 'SalesStatusWeight', true );
?>
<div id="yacht-metabox-basics">
	<div class="metafield">
		<label>Beam Measure (ft)</label>
		<input type="number" name="YSP_BeamFeet" step="0.1" value="<?= $yacht_ysp_beam_feet ?>">
	</div>
	<div class="metafield">
		<label>Beam Measure (m)</label>
		<input type="number" name="YSP_BeamMeter" step="0.1" value="<?= $yacht_ysp_beam_meter ?>">
	</div>
	<div class="metafield">
		<label>Broker Name</label>
		<input type="text" name="YSP_BrokerName" value="<?= $yacht_ysp_broker_name ?>">
	</div>
	<div class="metafield">
		<label>Yacht City Name</label>
		<input type="text" name="YSP_City" value="<?= $yacht_ysp_city ?>">
	</div>
	<div class="metafield">
		<label>Yacht Country Name</label>
		<input type="text" name="YSP_CountryID" value="<?= $yacht_ysp_country_id ?>">
	</div>
	<div class="metafield">
		<label>Yacht State Name</label>
		<input type="text" name="YSP_State" value="<?= $yacht_ysp_state ?>">
	</div>
	<div class="metafield">
		<label>Country Weight</label>
		<input type="number" name="COUNTRY_WEIGHT" value="<?= $yacht_ysp_country_weight ?>">
	</div>
	<div class="metafield">
		<label>Engine Count</label>
		<input type="text" name="YSP_EngineCount" value="<?= $yacht_ysp_engine_count ?>">
	</div>
	<div class="metafield">
		<label>Engine Fuel</label>
		<input type="text" name="YSP_EngineFuel" value="<?= $yacht_ysp_engine_fuel ?>">
	</div>
	<div class="metafield">
		<label>Engine Hours</label>
		<input type="number" name="YSP_EngineHours" value="<?= $yacht_ysp_engine_hours ?>">
	</div>
	<div class="metafield">
		<label>Engine Model</label>
		<input type="text" name="YSP_EngineModel" value="<?= $yacht_ysp_engine_model ?>">
	</div>
	<div class="metafield">
		<label>Engine Power</label>
		<input type="text" name="YSP_EnginePower" value="<?= $yacht_ysp_engine_power ?>">
	</div>
	<div class="metafield">
		<label>Engine Type</label>
		<input type="text" name="YSP_EngineType" value="<?= $yacht_ysp_engine_type ?>">
	</div>
	<div class="metafield">
		<label>YSP USD Value</label>
		<input type="number" name="YSP_USDVal" value="<?= $yacht_ysp_usd_val ?>">
	</div>
	<div class="metafield">
		<label>Price (USD)</label>
		<input type="number" name="NormPrice" value="<?= $yacht_norm_price ?>">
	</div>
	<div class="metafield">
		<label>Price (EUR)</label>
		<input type="number" name="YSP_EuroVal" value="<?= $yacht_ysp_euro_val ?>">
	</div>
	<div class="metafield">
		<label>Price (AUD)</label>
		<input type="number" name="YSP_AUDVal" value="<?= $yacht_ysp_aud_val ?>">
	</div>
	<div class="metafield">
		<label>Length</label>
		<input type="text" name="YSP_Length" value="<?= $yacht_ysp_length ?>">
	</div>
	<div class="metafield">
		<label>Nominal Length</label>
		<input type="text" name="NominalLength" value="<?= $yacht_ysp_NominalLength ?>" required="">
	</div>
	<div class="metafield">
		<label>Overall Length (ft)</label>
		<input type="number" name="YSP_LOAFeet" step="0.1" value="<?= $yacht_ysp_loa_feet ?>">
	</div>
	<div class="metafield">
		<label>Overall Length (m)</label>
		<input type="number" name="YSP_LOAMeter" step="0.1" value="<?= $yacht_ysp_loa_meter ?>">
	</div>
	<div class="metafield">
		<label>Listing Date</label>
		<input type="date" name="YSP_ListingDate" value="<?= $yacht_ysp_listing_date ?>">
	</div>
	<div class="metafield">
		<label>Make</label>
		<input type="text" name="MakeString" value="<?= $yacht_make_string ?>">
	</div>
	<div class="metafield">
		<label>Model</label>
		<input type="text" name="Model" value="<?= $yacht_model ?>">
	</div>
	<div class="metafield">
		<label>Year</label>
		<input type="number" name="ModelYear" min="1900" max="<?= (string) date("Y") + 1 ?>" value="<?= $yacht_model_year ?>">
	</div>
	<div class="metafield">
		<label>Make Weight</label>
		<input type="number" name="MakeWeight" value="<?= $yacht_ysp_make_weight ?>">
	</div>

	<div class="metafield">
		<label>Company Weight</label>
		<input type="number" name="CompanyWeight" value="<?= $yacht_ysp_company_weight ?>">
	</div>
	<div class="metafield">
		<label>Sales Status</label>
		<select name="SalesStatus">
			<option value="Active" <?php if ($yacht_sales_status == "Active") echo "selected"; ?>>Active</option>
			<option value="SalePending" <?php if ($yacht_sales_status == "SalePending") echo "selected"; ?>>Sale Pending</option>
			<option value="Sold" <?php if ($yacht_sales_status == "Sold") echo "selected"; ?>>Sold</option>
		</select>
	</div>
	<div class="metafield">
		<label>Sale Status Code</label>
		<select name="SaleClassCode">
			<option value="New" <?php if ($yacht_sale_class_code == "New") echo "selected"; ?>>New</option>
			<option value="Used" <?php if ($yacht_sale_class_code == "Used") echo "selected"; ?>>Used</option>
		</select>
	</div>
	<div class="metafield">
		<label>Sales Code Weight</label>
		<input type="number" name="SalesStatusWeight" value="<?= $yacht_ysp_sales_status_weight ?>">
	</div>
	<div class="metafield">
		<label>Yacht Category</label>
		<input type="text" name="BoatCategoryCode" value="<?= $yacht_boat_category_code ?>">
	</div>
	<div class="metafield">
		<label>Yacht Class</label>
		<input type="text" name="BoatClassCode" value="<?= $yacht_boat_class_code[0] ?>">
	</div> 
	<div class="metafield">
		<label>Has Hull ID</label>
		<input type="text" name="HasHullID" value="<?= $yacht_has_boat_hull_id ?>">
	</div>
	<div class="metafield">
		<label>Hull ID</label>
		<input type="text" name="BoatHullID" value="<?= $yacht_boat_hull_id ?>">
	</div>
	<div class="metafield">
		<label>Hull Material</label>
		<input type="text" name="BoatHullMaterialCode" value="<?= $yacht_boat_hull_material_code ?>">
	</div>
	<div class="metafield">
		<label>Yacht Name</label>
		<input type="text" name="BoatName" value="<?= $yacht_boat_name ?>">
	</div>
	<div class="metafield">
		<label>Company Owned</label>
		<select name="CompanyBoat">
			<option value="0" <?php if ($yacht_company_boat == "0") echo "selected"; ?>>No</option>
			<option value="1" <?php if ($yacht_company_boat == "1") echo "selected"; ?>>Yes</option>
		</select>
	</div>
	<div class="metafield">
		<label>Company Name</label>
		<input type="text" name="CompanyName" value="<?= $yacht_company_name ?>">
	</div>
	<div class="metafield">
		<label>Document ID</label>
		<input type="text" name="DocumentID" value="<?= $yacht_document_id ?>">
	</div>
	<div class="metafield">
		<label>Heads Count</label>
		<input type="number" name="HeadsCountNumeric" value="<?= $yacht_heads_count_numeric ?>">
	</div>
	<div class="metafield">
		<label>Fuel Tank Capacity</label>
		<input type="text" name="FuelTankCapacityMeasure" value="<?= $yacht_fuel_tank_capacity_measure ?>">
	</div>
	<div class="metafield">
		<label>Fuel Tank Count</label>
		<input type="text" name="FuelTankCountNumeric" value="<?= $yacht_fuel_tank_count_numeric ?>">
	</div>
	<div class="metafield">
		<label>Fuel Tank Material</label>
		<input type="text" name="FuelTankMaterialCode" value="<?= $yacht_fuel_tank_material_code ?>">
	</div>
	<div class="metafield">
		<label>Holding Tank Capacity</label>
		<input type="text" name="HoldingTankCapacityMeasure" value="<?= $yacht_holding_tank_capacity_measure ?>">
	</div>
	<div class="metafield">
		<label>Holding Tank Count</label>
		<input type="text" name="HoldingTankCountNumeric" value="<?= $yacht_holding_tank_count_numeric ?>">
	</div>
	<div class="metafield">
		<label>Holding Tank Material</label>
		<input type="text" name="HoldingTankMaterialCode" value="<?= $yacht_holding_tank_material_code ?>">
	</div>
	<div class="metafield">
		<label>Water Tank Capacity</label>
		<input type="text" name="WaterTankCapacityMeasure" value="<?= $yacht_water_tank_capacity_measure ?>">
	</div>
	<div class="metafield">
		<label>Water Tank Count</label>
		<input type="text" name="WaterTankCountNumeric" value="<?= $yacht_water_tank_count_numeric ?>">
	</div>
	<div class="metafield">
		<label>Water Tank Material</label>
		<input type="text" name="WaterTankMaterialCode" value="<?= $yacht_water_tank_material_code ?>">
	</div>
	<div class="metafield">
		<label>Total Engine Hours</label>
		<input type="number" name="TotalEngineHoursNumberic" value="<?= $yacht_total_engine_hours_numeric ?>">
	</div>
	<div class="metafield">
		<label>Total Engine Power Quantity</label>
		<input type="text" name="TotalEnginePowerQuantity" value="<?= $yacht_total_engine_power_quantity ?>">
	</div>
</div>

<style type="text/css">
	#yacht-metabox-basics .metafield{
		display: block;
		margin-top: 10px;
		margin-bottom: 10px;
		padding-bottom: 10px;
		border-bottom: 1px solid #000;

	}

	#yacht-metabox-basics .metafield label{
		display: block;
		margin-bottom: 10px;
	}

	#yacht-metabox-basics .metafield input{
		display: block;
		width: 100%;
		max-width: 500px;

	}
</style>