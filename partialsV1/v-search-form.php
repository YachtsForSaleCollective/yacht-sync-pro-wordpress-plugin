<div id="v-search-container">
    <form id="ysp-yacht-search-form" class="ys-v-row ysp-yacht-search-form ysp-form" >
    <input type="hidden" name="page_index" />    
    <div class="ys-v-row-item">
            <label>Keyword</label>
            <input type="text" name="ys_keyword" placeholder="Search by Name" list="ysp_keywords_list" />
            <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="icon/search">
                    <path id="Vector" d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#334155" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path id="Vector_2" d="M14.0001 14.0001L11.1001 11.1001" stroke="#334155" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
            </svg>
        </div>
        <div class="ys-v-row-item">
            <label>Builder</label>
            <select name="make" data-fill-options="Builders">
                <option value="">Any</option>
            </select>
        </div>
        <div class="ys-v-row-item">
            <label>Year</label>
            <div class="min-max-container">
                <input type="number" name="yearlo" placeholder="Min"/>
                <span>-</span>
                <input type="number" name="yearhi" placeholder="Max"/>
            </div>
        </div>
        <div class="ys-v-row-item">
            <label>Length</label>
            <div class="min-max-container">
                <input type="number" name="lengthlo" placeholder="Min"/>
                <span>-</span>
                <input type="number" name="lengthhi" placeholder="Max"/>
            </div>
        </div>
        <div class="ys-v-row-item">
            <label>Price</label>
            <div class="min-max-container">
                <input type="number" name="pricelo" placeholder="Min"/>
                <span>-</span>
                <input type="number" name="pricehi" placeholder="Max"/>
            </div>
        </div>
        <div class="ys-v-row-item">
            <label>Staterooms</label>
            <select name="staterooms">
                <option value="" selected disabled>Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            <svg class="dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="#94A3B8" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="ys-v-row-item">
            <label>Hull</label>
            <select name="hull" data-fill-options="HullMaterials">
                <option value="" selected disabled>Any</option>
            </select>
            <svg class="dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="#94A3B8" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="ys-v-row-item">
            <label>Condition</label>
            <select name="condition">
                <option value="">Any</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
            </select>
            <svg class="dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="#94A3B8" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="ys-v-row-item submit-container">
            <label>Submit</label>
            <input class="ysp-general-button" type="submit" name="submit" value="Submit"/>
        </div>
    </form>
</div>


<datalist id="ysp_keywords_list" data-fill-list='Keywords'></datalist>