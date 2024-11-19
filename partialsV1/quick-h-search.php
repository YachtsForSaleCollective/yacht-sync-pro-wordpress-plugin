<div id="quick-h-search-container">
    <form id="ysp-yacht-quick-search-form" class="ys-h-row ysp-quick-search-form" action="<?php echo $action_url; ?>" method="GET" style="    justify-content: center;">
            <input type="hidden" name="page_index">

            <div class="ys-h-row-item">
                <label for="ys_keyword">Keywords</label>

                <input type="text" name="ys_keyword" placeholder="Boat Name, Location, Features" list="ysp_keywords_list">
                <!-- <img decoding="async" src="" alt="magnifying-glass" /> -->
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

            <div class="ys-h-row-item submit-container">
                <label>Submit</label>
                
                <button class="ysp-general-button" type="submit">Search</button>
            </div>
        </form>

    <datalist id="ysp_keywords_list" data-fill-list='Keywords'></datalist>
    </div>