document.addEventListener("DOMContentLoaded", function() {
    // Activate sidebar nav
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();
   
    function loadNav() {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status != 200) return;
     
          // Muat daftar tautan menu
          document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
            elm.innerHTML = xhttp.responseText;
          });
     
          // Daftarkan event listener untuk setiap tautan menu
          document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
            elm.addEventListener("click", function(event) {
              // Tutup sidenav
              var sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();
     
              // Muat konten halaman yang dipanggil
              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
        }
      };
      xhttp.open("GET", "pages/nav.html", true);
      xhttp.send();
    }
  });
    
    // Load Footer
    var sliders = window.location.hash.substr(1);
    LoadFooter();

    function LoadFooter(){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
          var content = document.querySelector("#footer-content");
          if (this.status == 200) {
              content.innerHTML = xhttp.responseText;
          }else {
              content.innerHTML = "<p>Ups.. halaman gagal dimuat.</p>";
          }
          }
          (function($){
            $(function(){
              
          
            }); // end of document ready
          })(jQuery); // end of jQuery name space
      };
      xhttp.open("GET", "pages/footer.html", true);
      xhttp.send();
    }


    // Load page content
    var page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page);
    
    function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
        var content = document.querySelector("#body-content");
        if (this.status == 200) {
            content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
            content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
            content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
        }
        document.querySelectorAll(".plan-signup-btn a").forEach(function(elm) {
          elm.addEventListener("click", function(event) {
            // Muat konten halaman yang dipanggil
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
        (function($){
          $(function(){
              //Slider
              $(document).ready(function(){
                  $('.slider').slider({
                    fullWidth: true,
                    indicators : false,
                    height : 500
                  });
                  $('.parallax').parallax();
                  $('.materialboxed').materialbox();
                  $('.carousel').carousel({
                    indicators : true,
                    height : 800,
                    fullWidth: true
                  });
                  $('.datepicker').datepicker();
              });
              
          }); // end of document ready
        })(jQuery); // end of jQuery name space
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
    }