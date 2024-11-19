<div id="h-search-container">
    <form id="ysp-yacht-search-form" class="ys-h-row ysp-yacht-search-form ysp-form ysp-search-desktop">
        <input type="hidden" name="page_index" />

        <div class="ys-h-row-item">
            <label for="ys_keyword">Keyword</label>

            <input type="text" name="ys_keyword" placeholder="Boat Name, Location, Features" list="ysp_keywords_list" />
            <!-- <img src="" alt="magnifying-glass" /> -->
            <!-- <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="icon/search">
                    <path id="Vector" d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#334155" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path id="Vector_2" d="M14.0001 14.0001L11.1001 11.1001" stroke="#334155" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
            </svg> -->
        </div>
        
        <div class="ys-h-row-item">
            <label for="make">Builder</label>

            <select name="make" data-fill-options="Builders">
                <option value="">Any</option>
            </select>
        </div>

        <div class="ys-h-row-item">
            <label>Year</label>

            <div class="min-max-container">
                <input type="number" label="Year Above" name="yearlo" placeholder="Min" min="1900" />
                <span>-</span>
                <input type="number" label="Year Below" name="yearhi" placeholder="Max" max="<?= (date("Y")+3) ?>" />
            </div>
        </div>

        <div class="ys-h-row-item">
            <label>Length</label>
            
            <div class="min-max-container">
                <input type="number" label="Length Above" name="lengthlo" placeholder="Min" min=5 />
                <span>-</span>
                <input type="number" label="Length Below" name="lengthhi" placeholder="Max" max=500 />
            </div>
        </div>

        <div class="ys-h-row-item">
            <label>Price</label>

            <div class="min-max-container">
                <input type="number" label="Price Above" name="pricelo" placeholder="Min" min=0 />
                <span>-</span>
                <input type="number" label="Price Below" name="pricehi" placeholder="Max">
            </div>
        </div>
        
        <div class="ys-h-row-item">
            <label for="staterooms">Staterooms</label>

            <select name="staterooms">
                <option value="">Any</option>
                <option value="1">1 Stateroom</option>
                <option value="2">2 Staterooms</option>
                <option value="3">3 Staterooms</option>
                <option value="4">4 Staterooms</option>
                <option value="5">5 Staterooms</option>
                <option value="6">6 Staterooms</option>
                <option value="7">7 Staterooms</option>
                <option value="8">8 Staterooms</option>
                <option value="9">9 Staterooms</option>
                <option value="10">10 Staterooms</option>
            </select>
            
            <!-- <svg class="dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="#94A3B8" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg> -->
        </div>

        <div class="ys-h-row-item">
            <label for="hull">Hull</label>

            <select name="hull" data-fill-options="HullMaterials">
                <option value="">Any</option>
            </select>

            <!-- <svg class="dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="#94A3B8" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg> -->
        </div>

        <div class="ys-h-row-item">
            <label for="condition">Condition</label>

            <select name="condition">
                <option value="">Any</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
            </select>
        </div>

        <div class="ys-h-row-item">
            <label for="status">Status</label>

            <select name="status">
                <option value="">Any</option>
                <option value="Active">Active</option>
                <option value="Onorder">On-Order</option>
            </select>
        </div>

        <div class="ys-h-row-item submit-container">
            <label>Submit</label>
            
            <button class="ysp-general-button" type="submit">Search</button>
        </div>
    </form>

</div>

<button class="open-mobile-search ysp-general-button" style="width: auto;">
    <img src="<?= YSP_ASSETS ?>/icons/filters.png" alt="icon" style="vertical-align: middle;"/> 
    Filters
</button>

<div class="Filters-Floating-Bar">
    
    <button class="open-mobile-search ysp-general-button" style="width: auto;"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none" style="position: relative; top: 2px;">
        <path d="M13.8335 4.6665H7.8335" stroke="white" stroke-width="0.886667" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9.8335 11.3335H3.8335" stroke="white" stroke-width="0.886667" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11.8335 13.3335C12.9381 13.3335 13.8335 12.4381 13.8335 11.3335C13.8335 10.2289 12.9381 9.3335 11.8335 9.3335C10.7289 9.3335 9.8335 10.2289 9.8335 11.3335C9.8335 12.4381 10.7289 13.3335 11.8335 13.3335Z" stroke="white" stroke-width="0.886667" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5.1665 6.6665C6.27107 6.6665 7.1665 5.77107 7.1665 4.6665C7.1665 3.56193 6.27107 2.6665 5.1665 2.6665C4.06193 2.6665 3.1665 3.56193 3.1665 4.6665C3.1665 5.77107 4.06193 6.6665 5.1665 6.6665Z" stroke="white" stroke-width="0.886667" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        Filters
    </button>

    <a href="" id="ysp_compare_linkout_mobile"></a>
</div>

<datalist id="ysp_keywords_list" data-fill-list='Keywords'></datalist>

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

        <form id="ysp-mobile-yacht-search-form" class="ys-h-row ysp-yacht-search-form ysp-form ysp-search-mobile">
            <input type="hidden" name="page_index" />

            <div class="ys-h-row-item">
                <?php 
                    $YSP_Options = new YachtSyncPro_Options();
                    $YSP_Comapny_name = $YSP_Options->get('company_name');
                ?>

                <label>
                    <input type="checkbox" name="ys_company_only" value="1" style="width: unset;"> 
                    <?php echo $YSP_Comapny_name; ?>'s Listings
                </label>
            </div>

            <div class="ys-h-row-item">
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

            <div class="ys-h-row-item">
                <label for="condition">Condition</label>

                <select name="condition">
                    <option value="">Any</option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                </select>
            </div>
        
            <div class="ys-h-row-item">
                <label for="make">Builder</label>

                <select name="make" data-fill-options="Builders">
                    <option value="">Any</option>
                </select>
            </div>

            <div class="ys-h-row-item">
                <label>Year</label>

                <div class="min-max-container">
                    <input type="number" label="Year Above" name="yearlo" placeholder="Min"/>
                    <span>-</span>
                    <input type="number" label="Year Below" name="yearhi" placeholder="Max"/>
                </div>
            </div>

            <div class="ys-h-row-item">
                <label>Length</label>
                
                <div class="min-max-container">
                    <input type="number" label="Length Above" name="lengthlo" placeholder="Min"/>
                    <span>-</span>
                    <input type="number" label="Length Below" name="lengthhi" placeholder="Max"/>
                </div>
            </div>

            <div class="ys-h-row-item">
                <label>Price</label>

                <div class="min-max-container">
                    <input type="number" label="Price Above" name="pricelo" placeholder="Min"/>
                    <span>-</span>
                    <input type="number" label="Price Below" name="pricehi" placeholder="Max"/>
                </div>
            </div>

            <div class="ys-h-row-item">
                <label for="staterooms">Staterooms</label>

                <select name="staterooms">
                    <option value="">Any</option>
                    <option value="1">1 Stateroom</option>
                    <option value="2">2 Staterooms</option>
                    <option value="3">3 Staterooms</option>
                    <option value="4">4 Staterooms</option>
                    <option value="5">5 Staterooms</option>
                    <option value="6">6 Staterooms</option>
                    <option value="7">7 Staterooms</option>
                    <option value="8">8 Staterooms</option>
                    <option value="9">9 Staterooms</option>
                    <option value="10">10 Staterooms</option>
                </select>
                
                <!-- <svg class="dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="#94A3B8" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                </svg> -->
            </div>

            <div class="ys-h-row-item">
                <label for="hull">Hull</label>

                <select name="hull" data-fill-options="HullMaterials">
                    <option value="">Any</option>
                </select>

                <!-- <svg class="dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="#94A3B8" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                </svg> -->
            </div>

            <div style="height: 75px;"></div>

            <div class="submit-container" style="position: fixed; bottom: 0px; left: 0px; width: 100%; background: #fff; padding: 15px; border-top: 1px solid #d9d9d9;">
                <button class="ysp-general-button" type="submit" style="background: #334155;">Search Yachts</button>
            </div>
        </form>

    </div>
</div>