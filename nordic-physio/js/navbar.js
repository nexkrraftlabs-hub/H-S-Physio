/* Navbar component - edit the HTML below once, it updates on every page.
   Pages just contain: <div id="site-navbar"></div> */
(function () {
  var host = document.getElementById("site-navbar");
  if (!host) return;
  host.outerHTML = `<header class="site-header">
  <div class="site-header__inner">
    <a class="logo" href="index.html" aria-label="Health &amp; Sport Physiotherapy Center — home"><img src="assets/img/logo-transparent.png" alt="Health &amp; Sport Physiotherapy Center" width="104" height="46"></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu" aria-label="Open menu"><span></span><span></span><span></span></button>
    <div class="nav-group" id="site-menu">
      <nav class="nav-pill" aria-label="Primary">
        <ul>
          <li><a href="index.html" data-page="index.html">Home</a></li>
          <li><a href="about.html" data-page="about.html">About Us</a></li>
          <li><a href="services.html" data-page="services.html">Services</a></li>
          <li><a href="gallery.html" data-page="gallery.html">Gallery</a></li>
          <li><a href="team.html" data-page="team.html">Our Team</a></li>
          <li><a href="resources.html" data-page="resources.html">Resources</a></li>
          <li><a href="contact.html" data-page="contact.html">Contact</a></li>
        </ul>
      </nav>
      <a class="nav-phone" href="tel:+919415288277"><img src="assets/img/icon-phone.svg" alt="" width="16" height="16"> +91 94152 88277</a>
      <a class="btn btn--light btn--nav" href="contact.html">Book Appointment</a>
    </div>
  </div>
</header>
<div class="menu-backdrop"></div>`;
  var file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-pill a[data-page]").forEach(function (a) {
    if (a.getAttribute("data-page").toLowerCase() === file) a.setAttribute("aria-current", "page");
  });
})();
