<?php
        $YSP_Options = new YachtSyncPro_Options();
        $YSP_name = $YSP_Options->get('company_name');
        $YSP_Comapny_name = $YSP_Options->get('company_name');
		?>
<section id="ysp-yacht-results-section">
	<div class="scroll-to-here-on-yacht-search"></div>

    
    <div class="yacht-search-top">
        <div class="">
            <span class="total-results"><span id="ysp-total-yacht-results"></span> YACHTS FOUND</span>
        </div>

        <div  style="display: flex; gap: 10px;">
            <div class="top-field">
                <label>Sort by: </label>

                <select name="sortby" label="Sorted By" form="ysp-yacht-search-form">
                    <option value="">pick a sort</option>
                    
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
        <div id="ysp-compare-previews" class="d-flex"></div>
        <br />
        <a href="" id="ysp_compare_linkout"></a>
    </div>
</section>

<div class="ysp-modal" id="ysp-yacht-results-lead-modal">
    <div class="yacht-form-containers">
        <p class="yacht-form-title">Inquire Now</p>
     
        <form class="single-yacht-detils-lead" action="/submit" method="post">
            <div>
            <input type="hidden" id="yatchHidden" name="yatchHidden" value="">
            </div>
            <div>
                <label for="fname">First name</label>
                <input type="text" id="fname" name="fname" placeholder="First name" required />
            </div>
            <div>
                <label for="lname">Last name</label>
                <input type="text" id="lname" name="lname" placeholder="Last name" required />
            </div>
            <div>
                <label for="email">E-mail</label>
                <input type="email" id="email" name="email" placeholder="name@email.com" required />
            </div>
            <div>
                <label for="phone">Phone number</label>
                <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="+1 (777) 777-7777" required />
            </div>
            <div style="display: none;">
            <input type="text"  name="fax">
            </div>
            <div>
                <label for="inquirytype">Inquiry type</label>
                <select>
                    <option value="Buying a yacht" selected>Buying a yacht</option>
                    <option value="Selling a yacht">Selling a yacht</option>
                    <option value="Trading a yacht">Trading a yacht</option>
                </select>
            </div>
            <div>
                <label for="message">Message</label>
                <textarea id="message" name="message" placeholder="Type your message"><?php the_title(); ?></textarea>
            </div>
            <div>
                <p class="form-disclaimer">Your privacy is important to us; to learn about how we protect it, read our <a href="#">privacy policy.</a></p>
            </div>
            <input class="yacht-form-submit ysp-general-button" type="submit" value="Send" />
        </form>

        <div class="success-message" style="display: none; background-color: #4CAF50; color: #fff; padding: 10px; text-align: center;">
            <p class="success-messages">Thank you for getting in touch. We will be in touch shortly.</p>
        </div>
    </div>
</div>
