<?php
        $YSP_Options = new YachtSyncPro_Options();
        $YSP_name = $YSP_Options->get('company_name');
        $YSP_Comapny_name = $YSP_Options->get('company_name');
		?>
<section id="search-result-section" class="search-result-section">
	<div class="scroll-to-here-on-yacht-search"></div>

    <h5 class="yacht-search-total">
        <span class="total-results-title"><span id="total-results"></span> YACHTS FOUND</span>
    </h5>
     

    <label><input type="checkbox" name="ys_company_only" value="1" form="ysp-yacht-search-form"> <?php echo $YSP_Comapny_name ?></label>

    <div class="yacht-search-options">
        <div class="list-view-and-sort-container">
            <div class="list-view-group">
                <label class="grid-view">
                    <input type="radio" form="ysp-yacht-search-form" name="view" value="Grid" style="display: none;">

                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 16" fill="none">
                            <path d="M12.6667 2H3.33333C2.59695 2 2 2.59695 2 3.33333V12.6667C2 13.403 2.59695 14 3.33333 14H12.6667C13.403 14 14 13.403 14 12.6667V3.33333C14 2.59695 13.403 2 12.6667 2Z" stroke="#334155" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2 6H14" stroke="#334155" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2 10H14" stroke="#334155" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6 2V14" stroke="#334155" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10 2V14" stroke="#334155" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        Gallery
                    </span>
                </label>

                <label class="list-view">
                    <input type="radio" form="ysp-yacht-search-form" name="view" value="List" style="display: none;">

                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 16" fill="none">
                            <path d="M2.66699 8H13.3337" stroke="#94A3B8" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2.66699 4H13.3337" stroke="#94A3B8" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2.66699 12H13.3337" stroke="#94A3B8" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        List
                    </span>
                </label>
            </div>

            <div>
                <label>Filter by: </label>

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
        </div>
    </div>

    <div class="loader-icon">
        <img src="<?php echo YSP_ASSETS; ?>/images/loading-icon.gif" alt="loading-gif" />
    </div>

    <div class="search-result-grid">
        <div id="search-result-row">
            
        </div>
    </div>

    <div id="yachts-pagination">

    </div>

    <div id="yachts-compare-bar">
        <div id="ysp-compare-previews" class="d-flex"></div>
        <br />
        <a href="" id="ysp_compare_linkout"></a>
    </div>
</section>

<div class="ysp-modal" id="single-share">
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
</div>
