<?php
        $YSP_Options = new YachtSyncPro_Options();
        $YSP_name = $YSP_Options->get('company_name');
        $YSP_Comapny_name = $YSP_Options->get('company_name');
		?>
<section id="ysp-yacht-results-section">
	<div class="scroll-to-here-on-yacht-search"></div>

    
    <div class="yacht-search-top">
        <div class="found">
            <span class="total-results"><span id="ysp-total-yacht-results"></span> YACHTS FOUND</span>
        </div>

        <div class="dropdowns">
            <div class="top-field">
                <label>Sort by: </label>

                <select name="sortby" label="Sorted By" form="ysp-yacht-search-form">
                    <option value="">Pick a sort</option>
                    
                    <option value="Length:desc">Length: high to low</option>
                    <option value="Length:asc">Length: low to high</option>
                    
                    <option value="Price:desc">Price: high to low</option>
                    <option value="Price:asc">Price: low to high</option>

                    <option value="Year:desc">Year: high to low</option>
                    <option value="Year:asc">Year: low to high</option>

                    <option value="Timeon:desc">Least time on market</option>
                    <option value="Timeon:asc">Most time on market</option>
                </select>
            </div>

            <div class="top-field">
                <label>View: </label>

                <select name="view" label="View" form="ysp-yacht-search-form">
                    <option value="Grid">Module</option>
                    <option value="List">List</option>
                </select>
            </div>
        </div>
    </div>

    <div class="loader-icon">
        <img src="<?php echo YSP_ASSETS; ?>/images/loading-icon.gif" alt="loading-gif" />
    </div>

    <div id="ysp-the-yacht-results">
    
    </div>

    <div id="ysp-yacht-results-pagination">

    </div>

    <div id="ysp-yachts-compare-bar">
        <div id="ysp-compare-previews">
            
            <span style="color: #fff;">Pick two to compare.</span>

        </div>
        <br />
        <a href="" id="ysp_compare_linkout"></a>
    </div>
</section>

<div class="ysp-modal" id="ysp-yacht-results-lead-modal" style="max-width: 400px;">
    <div class="yacht-form-containers">
        <h3 style="text-align: center; margin-bottom: 50px;">Inquire About <br /> <span class="boatname"></span></h3>
     
        <form class="ysp-lead-form ysp-lead-form-v2 ysp-form" action="/wp-json/ysp/lead-v2" method="post">
            <input type="hidden" name="WhichBoatID" value="" />

            <div class="hide-after-submit">
                <div class="ysp-lead-form-row">

                    <div  class="ysp-lead-field">
                        <label>First name</label>
                        <input type="text" name="fname" placeholder="First name" required />
                    </div>

                    <div  class="ysp-lead-field">
                        <label>Last name</label>
                        <input type="text" name="lname" placeholder="Last name" required />
                    </div>

                </div>
                <div  class="ysp-lead-field">
                    <label>E-mail</label>
                    <input type="email" name="email" placeholder="name@email.com" required />
                </div>
                <div  class="ysp-lead-field">
                    <label>Phone number</label>
                    <input type="tel" name="phone" placeholder="777-777-7777" required />
                </div>

                <div style="display: none;">
                    <input type="text" name="fax" />
                </div>
                
                <div class="ysp-lead-field">
                    <label>Message</label>
                    <textarea name="message" placeholder="Type your message" required rows=8></textarea>
                </div>
                
                <input type="submit" value="Send Message" class="yacht-form-submit ysp-general-button ysp-btn-block"  />
            </div>
            
            <div class="success-message">
                <p>Thank you for getting in touch.<br /> We will be in touch shortly.</p>
            </div>
        </form>
    </div>
</div>
