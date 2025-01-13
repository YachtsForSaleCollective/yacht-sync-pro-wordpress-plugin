<div id="quick-search-container">
    <form id="ysp-quick-search-form" class="ys-h-row ysp-quick-search-form" action="<?php echo $action_url; ?>" method="GET">
        <input type="hidden" name="page_index" />
        <div class="ys-quick-row-item">
            <label>Builder</label>
            <select name="make" data-fill-options="Builders">
                <option value="" selected disabled>Any</option>
            </select>
        </div>
        <div class="ys-quick-row-item">
            <label>Year</label>
            <div class="min-max-container">
                <input type="number" name="yearlo" placeholder="Min"/>
                <span>-</span>
                <input type="number" name="yearhi" placeholder="Max"/>
            </div>
        </div>
        <div class="ys-quick-row-item">
            <label>Length</label>
            <div class="min-max-container">
                <input type="number" name="lengthlo" placeholder="Min"/>
                <span>-</span>
                <input type="number" name="lengthhi" placeholder="Max"/>
            </div>
        </div>
        <div class="ys-quick-row-item">
            <label>Price</label>
            <div class="min-max-container">
                <input type="number" name="pricelo" placeholder="Min"/>
                <span>-</span>
                <input type="number" name="pricehi" placeholder="Max"/>
            </div>
        </div>
        <div class="ys-quick-row-item submit-container">
            <input type="submit" value="Submit"/>
        </div>
    </form>
</div>
<datalist id="ysp_keywords_list" data-fill-list='Keywords'></datalist>