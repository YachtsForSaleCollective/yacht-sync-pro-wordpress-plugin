 <div id="ysp-v-super-search">
    <form id="ysp-yacht-search-form" class="ysp-yacht-search-form ysp-form" >
   
    <input type="hidden" name="page_index" />    


    <div class="ysp-s-field">
            <label>Keyword</label>
            <input type="text" name="ys_keyword" placeholder="Search by Name, Models, Builders, Size, And Location!" list="ysp_keywords_list" />
        </div>
        <div class="ysp-s-field">
            <label>Condition</label>

            <div class="selection-overflow" style="height: 120px;">
                <label><input type="checkbox" name="condition" value="" > Both</label>
                 <?php 

                    $conditions = get_terms([
                        'taxonomy' => 'boatcondition',
                        'post_type' => 'ysp_yacht',
                        'hide_empty' => true,
                    ]);

                    foreach ($conditions as $c) {
                        
                        echo "<label><input type='checkbox' name='boatcondition' value='$c->name'  class='submit-on-change' /> $c->name</label>";

                    }
                ?>
            </div>
        </div>
        
        <div class="ysp-s-field">
            <label>Type</label>

            <div class="selection-overflow" style="height: 120px;">
                <label><input type="checkbox" name="boattype" value="" > Both</label>
                 <?php 

                    $conditions = get_terms([
                        'taxonomy' => 'boattype',
                        'post_type' => 'ysp_yacht',
                        'hide_empty' => true,
                    ]);

                    foreach ($conditions as $c) {
                        
                        echo "<label><input type='checkbox' name='boattype' value='$c->name'  class='submit-on-change' /> $c->name</label>";

                    }
                ?>
            </div>
        </div>

        <div class="ysp-s-field">
            <label>Category</label>
            <div class="selection-overflow">
            
                <?php 
                    echo "<label class='pick-all'><input type='checkbox' name='boatclass' value='' > All</label>";

                    $categories = get_terms([
                        'taxonomy' => 'boatclass',
                        'post_type' => 'ysp_yacht',
                        'hide_empty' => true,
                    ]);

                    foreach ($categories as $cat) {
                        
                        echo "<label><input type='checkbox' name='boatclass' value='$cat->name'  class='submit-on-change' /> $cat->name</label>";

                    }
                ?>
            </div>
        </div>

        <div class="ysp-s-field">
            <label>Builder</label>
            
            <div class="selection-overflow">
                <?php 
                    echo "<label><input type='checkbox' name='boatmaker' value='' /> All</label>";
                   
                    $YSP_DBHelper = new YachtSyncPro_DBHelper();

                    $builders = get_terms([
                        'taxonomy' => 'boatmaker',
                        'post_type' => 'ysp_yacht',
                        'hide_empty' => true,
                    ]);
                    foreach ($builders as $build) {

                        echo "<label><input type='checkbox' name='boatmaker' value='$build->slug'  class='submit-on-change'/> $build->name</label>";

                    }
                ?>
            </div>
        </div>

       <!--  <div class="ysp-s-field">
            <label>Hull</label>
            
            <div style="height: 100px; overflow-y: scroll;">
                <?php 
                    echo "<label  class='pick-all'><input type='checkbox' name='staterooms' value='' > All</label>";

                    $hulls = $YSP_DBHelper->get_unique_yacht_meta_values('BoatHullMaterialCode');

                    foreach ($hulls as $hull) {

                        echo "<label><input type='checkbox' name='hull' value='$hull'  class='submit-on-change' /> $hull</label>";

                    }
                ?>
            </div>
        </div>
 -->
        <!-- <div class="ysp-s-field">
            <label>Staterooms</label>
            
            <div style="height: 100px; overflow-y: scroll;">
                <?php 
                    echo "<label  class='pick-all'><input type='checkbox' name='staterooms' value='' /> All</label>";
                    
                    for ($s=1; $s <= 9; $s++) {

                        echo "<label><input type='checkbox' name='staterooms' value='$s' class='submit-on-change' /> Stateroom $s</label>";

                    }
                ?>
            </div>
        </div> -->
        
        <div class="ysp-s-field">
            <label>Year</label>
            <div class="min-max-container">
                <input type="number" name="yearlo" placeholder="Min" class='submit-on-change' />
                <span>-</span>
                <input type="number" name="yearhi" placeholder="Max" class='submit-on-change' />
            </div>
        </div>
        
        <div class="ysp-s-field">
             <div class="labal-with-toggles">
                <label>Length</label>
                    
                <div class="toggles">
                    <input type="radio" name="lengthunit" id="ysp-lenghtft-qs" checked="" value="Feet" class='submit-on-change' />
                    
                    <label class="" for="ysp-lenghtft-qs">
                        FT
                    </label>

                    <input type="radio" name="lengthunit" id="ysp-lenghtm-qs" value="Meter" class='submit-on-change' />
                    
                    <label class="" for="ysp-lenghtm-qs">
                        M
                    </label>
                </div>
            </div>    

            <div class="min-max-container">
                <input type="number" name="lengthlo" placeholder="Min" class='submit-on-change'/>
                <span>-</span>
                <input type="number" name="lengthhi" placeholder="Max" class='submit-on-change'/>
            </div>
        </div>
        
        <div class="ysp-s-field">
            <div class="labal-with-toggles">
                <label>Price</label>
                    
                <div class="toggles">
                    <input type="radio" name="currency" id="ysp-currency-switcher-usd-qs" value="Usd" checked="" class='submit-on-change' />

                    <label class="" for="ysp-currency-switcher-usd-qs">
                        USD
                    </label>

                    <input type="radio" class="btn-check" name="currency" id="ysp-currency-switcher-eur-qs" value="Eur" class='submit-on-change'/>
                    
                    <label class="" for="ysp-currency-switcher-eur-qs">
                        EUR
                    </label>
                </div>
            </div>    

            <div class="min-max-container">
                <input type="number" name="pricelo" placeholder="Min" class='submit-on-change'/>
                <span>-</span>
                <input type="number" name="pricehi" placeholder="Max" class='submit-on-change'/>
            </div>
        </div>
        
        <div class="ysp-s-field submit-container">
            <label><br /></label>
            <input type="submit" value="Search" class="ysp-general-button ysp-btn-block" />
        </div>
    </form>
</div>

<datalist id="ysp_keywords_list" data-fill-list='Keywords'></datalist>

<button class="open-mobile-search">
    <img src="<?= YSP_ASSETS ?>/icons/filters.png" alt="icon" style="vertical-align: middle;"/> 
    Filters
</button>

<div class="Filters-Floating-Bar">
    
    <button class="open-mobile-search"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none" style="position: relative; top: 2px;">
        <path d="M13.8335 4.6665H7.8335" stroke="white" stroke-width="0.886667" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9.8335 11.3335H3.8335" stroke="white" stroke-width="0.886667" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11.8335 13.3335C12.9381 13.3335 13.8335 12.4381 13.8335 11.3335C13.8335 10.2289 12.9381 9.3335 11.8335 9.3335C10.7289 9.3335 9.8335 10.2289 9.8335 11.3335C9.8335 12.4381 10.7289 13.3335 11.8335 13.3335Z" stroke="white" stroke-width="0.886667" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5.1665 6.6665C6.27107 6.6665 7.1665 5.77107 7.1665 4.6665C7.1665 3.56193 6.27107 2.6665 5.1665 2.6665C4.06193 2.6665 3.1665 3.56193 3.1665 4.6665C3.1665 5.77107 4.06193 6.6665 5.1665 6.6665Z" stroke="white" stroke-width="0.886667" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        Filters
    </button>

</div>


<div id="ysp-super-mobile-search">
    <div style="padding: 15px; overflow-y: scroll; height: 100%;">

        <div style="position: fixed; top: 0px; left: 0px; width: 100%; background: #fff; border-bottom: 1px solid #d9d9d9; ">

            <div style="padding: 15px; background: var(--slate-700, #334155); color: #fff; display: flex; justify-content: space-between; align-items: center;">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none" style="position: relative; top: 2px;">
                    <path d="M13.8335 4.6665H7.8335" stroke="white" stroke-width="0.886667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9.8335 11.3335H3.8335" stroke="white" stroke-width="0.886667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.8335 13.3335C12.9381 13.3335 13.8335 12.4381 13.8335 11.3335C13.8335 10.2289 12.9381 9.3335 11.8335 9.3335C10.7289 9.3335 9.8335 10.2289 9.8335 11.3335C9.8335 12.4381 10.7289 13.3335 11.8335 13.3335Z" stroke="white" stroke-width="0.886667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M5.1665 6.6665C6.27107 6.6665 7.1665 5.77107 7.1665 4.6665C7.1665 3.56193 6.27107 2.6665 5.1665 2.6665C4.06193 2.6665 3.1665 3.56193 3.1665 4.6665C3.1665 5.77107 4.06193 6.6665 5.1665 6.6665Z" stroke="white" stroke-width="0.886667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    Filters

                </span>


                <span id="close-mobile-search"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" style="position: relative; top: 2px;">
                    <path d="M18 6.5L6 18.5" stroke="white" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 6.5L18 18.5" stroke="white" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>

            </div>

            <div style=" padding: 15px; ">
                <h3 style="margin-bottom: 5px;">Yacht Search</h3>

                <div class="ysp-search-tags">
                    
                </div>
            </div>
        </div>

        <div style="height: 125px;"></div>

        <form id="ysp-mobile-yacht-search-form" class="ysp-v-row ysp-yacht-search-form ysp-form ysp-search-mobile">
            <input type="hidden" name="page_index" />

            <div class="ysp-s-field">
                <?php 
                    $YSP_Options = new YachtSyncPro_Options();
                    $YSP_Comapny_name = $YSP_Options->get('company_name');
                ?>

                <label>
                    <input type="checkbox" name="ys_company_only" value="1" style="width: unset;"> 
                    <?php echo $YSP_Comapny_name; ?>'s Listings
                </label>
            </div>

            <div class="ysp-s-field">
                <label for="ys_keyword">Keyword</label>

                <input type="text" name="ys_keyword" placeholder="Search by keywords" list="ysp_keywords_list" />

                <!-- <img src="" alt="magnifying-glass" /> -->
                <!-- <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="icon/search">
                        <path id="Vector" d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#334155" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path id="Vector_2" d="M14.0001 14.0001L11.1001 11.1001" stroke="#334155" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                </svg> -->
            </div>

            <div class="ysp-s-field">
                <label for="condition">Condition</label>

                <select name="boatcondition" data-fill-options="BoatConditionsWithCount">
                    <option value="">Any</option>
                </select>
            </div>


             <div class="ysp-s-field">
                <label for="boattype">Type</label>

                <select name="boattype" data-fill-options="BoatTypesWithCount">
                    <option value="">Any</option>
                </select>
            </div>
        
            <div class="ysp-s-field">
                <label for="make">Builder</label>

                <select name="boatmaker" data-fill-options="BoatMakesWithCount">
                    <option value="">Any</option>
                </select>
            </div>


            <div class="ysp-s-field">
                <label for="boatclass">Category</label>

                <select name="boatclass" data-fill-options="BoatCategoriesWithCount">
                    <option value="">Any</option>
                </select>
            </div>

            <div class="ysp-s-field">
                <label>Year</label>

                <div class="min-max-container">
                    <input type="number" label="Year Above" name="yearlo" placeholder="Min" min="1900" />
                    <span>-</span>
                    <input type="number" label="Year Below" name="yearhi" placeholder="Max" max="<?= (date("Y")+3) ?>" />
                </div>
            </div>

            <div class="ysp-s-field">
                 <div class="labal-with-toggles">
                    <label>Length</label>
                        
                    <div class="toggles">
                        <input type="radio" name="lengthunit" id="ysp-lenghtft-ms" checked="" value="Feet" />
                        
                        <label class="" for="ysp-lenghtft-ms">
                            FT
                        </label>

                        <input type="radio" name="lengthunit" id="ysp-lenghtm-ms" value="Meter" />
                        
                        <label class="" for="ysp-lenghtm-ms">
                            M
                        </label>
                    </div>
                </div>    
                
                <div class="min-max-container">
                    <input type="number" label="Length Above" name="lengthlo" placeholder="Min" min="5" />
                    <span>-</span>
                    <input type="number" label="Length Below" name="lengthhi" placeholder="Max" />
                </div>
            </div>

            <div class="ysp-s-field">
                <div class="labal-with-toggles">
                    <label>Price</label>
                        
                    <div class="toggles">
                        <input type="radio" name="currency" id="ysp-currency-switcher-usd-ms" value="Usd" checked="" />
 
                        <label class="" for="ysp-currency-switcher-usd-ms">
                            USD
                        </label>

                        <input type="radio" class="btn-check" name="currency" id="ysp-currency-switcher-eur-ms" value="Eur" />
                        
                        <label class="" for="ysp-currency-switcher-eur-ms">
                            EUR
                        </label>
                    </div>
                </div>    

                <div class="min-max-container">
                    <input type="number" label="Price Above" name="pricelo" placeholder="Min"/>
                    <span>-</span>
                    <input type="number" label="Price Below" name="pricehi" placeholder="Max"/>
                </div>
            </div>

            <div class="ysp-s-field">
                <label for="staterooms">Cabins</label>

                <select name="stateroomlo">
                    <option value="">Any</option>
                    <option value="1">1+ Cabins</option>
                    <option value="2">2+ Cabins</option>
                    <option value="3">3+ Cabins</option>
                    <option value="4">4+ Cabins</option>
                    <option value="5">5+ Cabins</option>
                    <option value="6">6+ Cabins</option>
                    <option value="7">7+ Cabins</option>
                    <option value="8">8+ Cabins</option>
                    <option value="9">9+ Cabins</option>
                </select>
            </div>


<!--             <div class="ysp-s-field">
                <label for="hull">Hull</label>

                <select name="hull" data-fill-options="HullMaterials">
                    <option value="">Any</option>
                </select>
            </div> -->

            <div style="height: 75px;"></div>

            <div class="submit-container" style="position: fixed; bottom: 0px; left: 0px; width: 100%; background: #fff; padding: 15px; border-top: 1px solid #d9d9d9;">
                <button class="ysp-general-button" type="submit" style="background: #334155;">Search Yachts</button>
            </div>
        </form>

    </div>
</div>