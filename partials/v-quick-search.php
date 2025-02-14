<div id="quick-search-container">
    <form id="ysp-quick-search-form" class="ysp-yacht-search-form ysp-form ysp-v-row ysp-quick-search-form" action="<?php echo $action_url; ?>" method="GET">
        <input type="hidden" name="page_index" />
        <div class="ysp-s-field">
            <label>Builder</label>

            <select name="boatmaker" data-fill-options="BoatMakes">
                <option value="">Any</option>
            </select>
        </div>
        <div class="ysp-s-field">
            <label>Year</label>

            <div class="min-max-container">
                <input type="number" name="yearlo" placeholder="Min"/>
                <span>-</span>
                <input type="number" name="yearhi" placeholder="Max"/>
            </div>
        </div>
        <div class="ysp-s-field">
            <div class="labal-with-toggles">
                <label>Length</label>
                    
                <div class="toggles">
                    <input type="radio" name="lengthunit" id="ysp-lenghtft-qs" checked="" value="Feet" />
                    
                    <label class="" for="ysp-lenghtft-qs">
                        FT
                    </label>

                    <input type="radio" name="lengthunit" id="ysp-lenghtm-qs" value="Meter" />
                    
                    <label class="" for="ysp-lenghtm-qs">
                        M
                    </label>
                </div>
            </div>    

            <div class="min-max-container">
                <input type="number" name="lengthlo" placeholder="Min"/>
                <span>-</span>
                <input type="number" name="lengthhi" placeholder="Max"/>
            </div>
        </div>
        <div class="ysp-s-field">
            
            <div class="labal-with-toggles">
                <label>Price</label>
                    
                <div class="toggles">
                    <input type="radio" name="currency" id="ysp-currency-switcher-usd-qs" value="Usd" checked="" />

                    <label class="" for="ysp-currency-switcher-usd-qs">
                        USD
                    </label>

                    <input type="radio" class="btn-check" name="currency" id="ysp-currency-switcher-eur-qs" value="Eur" />
                    
                    <label class="" for="ysp-currency-switcher-eur-qs">
                        EUR
                    </label>
                </div>
            </div>    


            <div class="min-max-container">
                <input type="number" name="pricelo" placeholder="Min"/>
                <span>-</span>
                <input type="number" name="pricehi" placeholder="Max"/>
            </div>
        </div>

        <div class="ysp-s-field submit-container">
            <input type="submit" value="Submit" class="ysp-btn ysp-btn-block" />
        </div>
    </form>
</div>
<datalist id="ysp_keywords_list" data-fill-list='Keywords'></datalist>