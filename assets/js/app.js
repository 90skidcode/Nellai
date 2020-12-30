/**
 * Menu 
 */

$("#side-menu.store").html(
    `
    <li>
        <a href="dashboard.html" class="waves-effect">
            <i class="bx bx-layout"></i>
            <span>Dashboards</span>
        </a>
    </li>

    <li>
        <a href="javascript: void(0);" class="has-arrow waves-effect">
            <i class="bx bx-building-house"></i>
            <span>Store</span>
        </a>
        <ul class="sub-menu mm-collapse" aria-expanded="false">
            <li><a href="store-in-list.html">Store IN</a></li>
            <li><a href="store-out-list.html">Store OUT</a></li>  
            <li><a href="store-damage-list.html">Store Damage</a></li>            
        </ul>
    </li>  

    <li>
        <a href="product.html" class="has-arrow waves-effect">
            <i class="bx bxl-product-hunt"></i>
            <span>Products</span>
        </a>
        <ul class="sub-menu mm-collapse" aria-expanded="false">
            <li><a href="product.html">Products List</a></li>
            <li><a href="product-report.html">Products Report</a></li>              
        </ul>
    </li>
     `
);

$("#side-menu.pulverizing").html(
    ` 
    <li>
        <a href="javascript: void(0);" class="has-arrow waves-effect">
            <i class="bx bx bxs-factory"></i>
            <span>Pulverizing</span>
        </a>
        <ul class="sub-menu mm-collapse" aria-expanded="false">
            <li><a href="pulverizing-in-list.html">Pulverizing IN</a></li>
            <li><a href="pulverizing-out-list.html">Pulverizing OUT</a></li>  
            <li><a href="pulverizing-damage-list.html">Pulverizing Damage</a></li>            
        </ul>
    </li>  

    <li>
        <a href="product.html" class="has-arrow waves-effect">
            <i class="bx bxl-product-hunt"></i>
            <span>Pulverizing Store</span>
        </a>
        <ul class="sub-menu mm-collapse" aria-expanded="false">
            <li><a href="pulverizing-product.html">Products List</a></li>
            <li><a href="pulverizing-product-report.html">Products Report</a></li>              
        </ul>
    </li>
     `
);


$("#side-menu.kitchen").html(
    ` <li>
        <a href="javascript: void(0);" class="has-arrow waves-effect">
            <i class="bx bxs-flame"></i>
            <span>kitchen</span>
        </a>
        <ul class="sub-menu mm-collapse" aria-expanded="false">
            <li><a href="kitchen-in-list.html">Kitchen IN</a></li>
            <li><a href="kitchen-out-list.html">Kitchen OUT</a></li>  
            <li><a href="kitchen-damage-list.html">Kitchen Damage</a></li>            
        </ul>
    </li>  

    <li>
        <a href="product.html" class="has-arrow waves-effect">
            <i class="bx bxl-product-hunt"></i>
            <span>kitchen Store</span>
        </a>
        <ul class="sub-menu mm-collapse" aria-expanded="false">
            <li><a href="kitchen-product.html">Products List</a></li>
            <li><a href="kitchen-product-report.html">Products Report</a></li>              
        </ul>
    </li>
     `
);


$("#side-menu.outlet").html(
    ` <li>
        <a href="javascript: void(0);" class="has-arrow waves-effect">
            <i class="bx bxs-store-alt"></i>
            <span>Outlet</span>
        </a>
        <ul class="sub-menu mm-collapse" aria-expanded="false">
            <li><a href="outlet-in-list.html">Outlet IN</a></li>
            <li><a href="outlet-return-list.html">Outlet Return</a></li>  
            <li><a href="outlet-damage-list.html">Outlet Damage</a></li>            
        </ul>
    </li>  

    <li>
        <a href="outlet-bill.html" class="has-arrow waves-effect">
            <i class="bx bx-printer"></i>
            <span>Bill</span>
        </a>
    </li>
    
    <li>
        <a href="outlet-product.html" class="has-arrow waves-effect">
            <i class="bx bxl-product-hunt"></i>
            <span>Outlet Store</span>
        </a>
       
    </li>
     `
);






! function(t) {
    "use strict";

    function s(e) {
        1 == t("#light-mode-switch").prop("checked") && "light-mode-switch" === e ? (t("#dark-mode-switch").prop("checked", !1), t("#rtl-mode-switch").prop("checked", !1), t("#bootstrap-style").attr("href", "assets/css/bootstrap.min.css"), t("#app-style").attr("href", "assets/css/app.min.css"), sessionStorage.setItem("is_visited", "light-mode-switch")) : 1 == t("#dark-mode-switch").prop("checked") && "dark-mode-switch" === e ? (t("#light-mode-switch").prop("checked", !1), t("#rtl-mode-switch").prop("checked", !1), t("#bootstrap-style").attr("href", "assets/css/bootstrap-dark.min.css"), t("#app-style").attr("href", "assets/css/app-dark.min.css"), sessionStorage.setItem("is_visited", "dark-mode-switch")) : 1 == t("#rtl-mode-switch").prop("checked") && "rtl-mode-switch" === e && (t("#light-mode-switch").prop("checked", !1), t("#dark-mode-switch").prop("checked", !1), t("#bootstrap-style").attr("href", "assets/css/bootstrap.min.css"), t("#app-style").attr("href", "assets/css/app-rtl.min.css"), sessionStorage.setItem("is_visited", "rtl-mode-switch"))
    }

    function e() {
        document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || (console.log("pressed"), t("body").removeClass("fullscreen-enable"))
    }
    var n;
    t("#side-menu").metisMenu(), t("#vertical-menu-btn").on("click", function(e) {
        e.preventDefault(), t("body").toggleClass("sidebar-enable"), 992 <= t(window).width() ? t("body").toggleClass("vertical-collpsed") : t("body").removeClass("vertical-collpsed")
    }), t("#sidebar-menu a").each(function() {
        var e = window.location.href.split(/[?#]/)[0];
        this.href == e && (t(this).addClass("active"), t(this).parent().addClass("mm-active"), t(this).parent().parent().addClass("mm-show"), t(this).parent().parent().prev().addClass("mm-active"), t(this).parent().parent().parent().addClass("mm-active"), t(this).parent().parent().parent().parent().addClass("mm-show"), t(this).parent().parent().parent().parent().parent().addClass("mm-active"))
    }), t(".navbar-nav a").each(function() {
        var e = window.location.href.split(/[?#]/)[0];
        this.href == e && (t(this).addClass("active"), t(this).parent().addClass("active"), t(this).parent().parent().addClass("active"), t(this).parent().parent().parent().addClass("active"), t(this).parent().parent().parent().parent().addClass("active"), t(this).parent().parent().parent().parent().parent().addClass("active"))
    }), t('[data-toggle="fullscreen"]').on("click", function(e) {
        e.preventDefault(), t("body").toggleClass("fullscreen-enable"), document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement ? document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen() : document.documentElement.requestFullscreen ? document.documentElement.requestFullscreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullscreen && document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    }), document.addEventListener("fullscreenchange", e), document.addEventListener("webkitfullscreenchange", e), document.addEventListener("mozfullscreenchange", e), t(".right-bar-toggle").on("click", function(e) {
        t("body").toggleClass("right-bar-enabled")
    }), t(document).on("click", "body", function(e) {
        0 < t(e.target).closest(".right-bar-toggle, .right-bar").length || t("body").removeClass("right-bar-enabled")
    }), t(".dropdown-menu a.dropdown-toggle").on("click", function(e) {
        return t(this).next().hasClass("show") || t(this).parents(".dropdown-menu").first().find(".show").removeClass("show"), t(this).next(".dropdown-menu").toggleClass("show"), !1
    }), t(function() {
        t('[data-toggle="tooltip"]').tooltip()
    }), t(function() {
        t('[data-toggle="popover"]').popover()
    }), window.sessionStorage && ((n = sessionStorage.getItem("is_visited")) ? (t(".right-bar input:checkbox").prop("checked", !1), t("#" + n).prop("checked", !0), s(n)) : sessionStorage.setItem("is_visited", "light-mode-switch")), t("#light-mode-switch, #dark-mode-switch, #rtl-mode-switch").on("change", function(e) {
        s(e.target.id)
    }), t(window).on("load", function() {
        t("#status").fadeOut(), t("#preloader").delay(350).fadeOut("slow")
    }), Waves.init()
}(jQuery);