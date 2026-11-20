/* Footer component (+ floating WhatsApp / call buttons) - edit once, it updates on every page.
   Pages just contain: <div id="site-footer"></div> */
(function () {
  var host = document.getElementById("site-footer");
  if (!host) return;
  host.outerHTML = `<footer class="site-footer">
  <div class="cta-band">
    <div class="cta-band__item">
      <h2>Book an Appointment</h2>
      <p>Expert physiotherapy and sports injury rehabilitation in Jankipuram, Lucknow. Quick, easy booking — personalised care starts here.</p>
      <a class="btn btn--outline-light btn--sm" href="contact.html">Book an Appointment</a>
    </div>
    <div class="cta-band__item">
      <h2>Find Us in Jankipuram</h2>
      <p>Infront of Sakshi Hanuman Mandir, near Apollo Pharmacy, Sector I, Janki Vihar Colony, Lucknow.</p>
      <a class="btn btn--outline-light btn--sm" href="https://www.google.com/maps/search/?api=1&amp;query=Health+%26+Sport+Physiotherapy+Center+Jankipuram+Lucknow" target="_blank" rel="noopener">Get Directions</a>
    </div>
  </div>
  <div class="cta-band__rule" aria-hidden="true"></div>
  <div class="container footer-main">
    <div class="footer-brand">
      <a class="footer-logo" href="index.html" aria-label="Health &amp; Sport Physiotherapy Center — home"><img src="assets/img/logo-transparent.png" alt="Health &amp; Sport Physiotherapy Center" width="160" height="71"></a>
      <div class="footer-news">
        <p class="footer-title">Newsletter Signup</p>
        <p class="footer-note">Stay up to date with expert tips, clinic news, and health guidance.</p>
        <form class="news-form" data-form data-success="Subscribed. Thank you!" novalidate>
          <label class="sr-only" for="news-email">Email address</label>
          <input class="field" id="news-email" name="newsletter_email" type="email" placeholder="Email address" required autocomplete="email">
          <button type="submit" aria-label="Subscribe"><img src="assets/img/icon-arrow-right.svg" alt="" width="16" height="13"></button>
          <p class="form__status" role="status" aria-live="polite"></p>
        </form>
      </div>
    </div>
    <div class="footer-col"><p class="footer-title">Quick Links</p>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="gallery.html">Gallery</a></li>
        <li><a href="team.html">Meet the Team</a></li>
        <li><a href="resources.html">Blog / Resources</a></li>
        <li><a href="index.html#faq">FAQs</a></li>
        <li><a href="contact.html">Contact Us</a></li>
      </ul>
    </div>
    <div class="footer-col"><p class="footer-title">Opening hours</p><ul class="hours"><li><span>Mon – Sat:</span><span>Closes 9 pm</span></li><li><span>Sunday:</span><span>Please call</span></li></ul></div>
    <div class="footer-col"><p class="footer-title">Contact info</p>
      <ul class="footer-contact">
        <li><img src="assets/img/footer-phone.svg" alt="" width="13" height="13"><a href="tel:+919415288277">+91 94152 88277</a></li>
        <li class="is-address"><img src="assets/img/footer-pin.svg" alt="" width="11" height="15"><span>Infront of Sakshi Hanuman Mandir, HD 113, near Apollo Pharmacy, Sector I, Janki Vihar Colony, Jankipuram, Lucknow, Uttar Pradesh 226021</span></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container footer-bottom__inner">
      <p>Copyright © 2025 Health &amp; Sport Physiotherapy Center. All Rights Reserved.</p>
      <div class="footer-legal"><a href="privacy-policy.html">Privacy Policy</a><a href="terms.html">Terms &amp; Conditions</a></div>
      <img class="footer-social" src="assets/img/footer-social.svg" alt="Social media icons" width="128" height="16">
    </div>
  </div>
</footer>
<div class="float-actions">
  <a class="float-btn float-btn--wa" href="https://wa.me/919415288277?text=Hi%20Health%20%26%20Sport%20Physiotherapy%2C%20I%27d%20like%20to%20book%20an%20appointment." target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true"><path fill="#fff" d="M16 3C8.800 3 3 8.800 3 16c0 2.300.6 4.500 1.700 6.400L3 29l6.800-1.800A13 13 0 1 0 16 3zm0 23.700c-2 0-3.900-.6-5.500-1.600l-.4-.2-4 1 1.100-3.900-.3-.4A10.700 10.700 0 1 1 16 26.700zm5.900-8c-.3-.2-1.900-.9-2.200-1s-.5-.2-.7.200-.8 1-1 1.200-.4.200-.7.100a8.700 8.700 0 0 1-4.300-3.800c-.3-.6.300-.5.900-1.700.1-.2 0-.4 0-.5l-1-2.300c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.100-.8.400s-1 1-1 2.500 1.100 2.900 1.200 3.100c.2.200 2.100 3.300 5.200 4.600 1.900.8 2.700.9 3.600.7.600-.1 1.900-.8 2.100-1.500.3-.7.300-1.400.2-1.500l-.5-.3z"/></svg></a>
  <a class="float-btn float-btn--call" href="tel:+919415288277" aria-label="Call us"><svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path fill="#fff" d="M6.600 10.800a15 15 0 0 0 6.600 6.600l2.200-2.200a1 1 0 0 1 1-.25 11.400 11.400 0 0 0 3.600.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.500a1 1 0 0 1 1 1c0 1.300.2 2.500.6 3.600a1 1 0 0 1-.25 1z"/></svg></a>
</div>`;
})();
