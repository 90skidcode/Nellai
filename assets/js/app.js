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

$("#side-menu.employee").html(
    ` 
    <li>
        <a href="javascript: void(0);" class="has-arrow waves-effect">
            <i class="bx bx bxs-user"></i>
            <span>Employee</span>
        </a>
        <ul class="sub-menu mm-collapse" aria-expanded="false">
            <li><a href="employee-dashboard.html">Employee List</a></li>
            <li><a href="allowence-list.html">Allowence List</a></li>  
            <li><a href="grade-list.html">Grade List</a></li> 
            <li><a href="designation-list.html">Designation List</a></li>            
        </ul>
    </li>  

    <li>
        <a href="product.html" class="has-arrow waves-effect">
            <i class='bx bx-calendar-plus'></i>
            <span>Leave</span>
        </a>
        <ul class="sub-menu mm-collapse" aria-expanded="false">
            <li><a href="leave-type-list.html">Leave Type List</a></li>
            <li><a href="leave-list.html">Leave List</a></li>              
        </ul>
    </li>

    <li>
        <a href="product.html" class="has-arrow waves-effect">
            <i class='bx bx-fingerprint'></i>
            <span>Setting</span>
        </a>
        <ul class="sub-menu mm-collapse" aria-expanded="false">
            <li><a href="department-list.html">Department List</a></li>
            <li><a href="branch-list.html">Branch List</a></li>              
        </ul>
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


/* Menu */
/*
let userData = sessionStorage.getItem("user");

if (!userData && location.pathname != '/' && location.pathname != '/index.html')
    window.location.href = 'index.html';
else {
    let menuHtml = ``;
    switch (JSON.parse(userData)[0].employee_type_id) {
        case '1':
            menuHtml = `<li class="nav-item dropdown">
                    <a href="dashboard.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-dashboard"></i>
                        </span>
                        <span class="title">Dashboard</span>           
                    </a>        
                </li>
                <li class="nav-item dropdown">
                    <a class="dropdown-toggle" data-href="booking-add.html" data-href="booking-list.html" data-href="booking-amend-list.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-plus"></i>
                        </span>
                        <span class="title">Check In</span> 
                        <span class="arrow">
                            <i class="arrow-icon"></i>
                        </span>           
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="booking-list.html">Check IN List</a>
                        </li>
                        <li>
                            <a href="booking-amend-list.html">Amend Check IN List</a>
                        </li>
                        <li>
                            <a href="booking-add.html">Add Check IN</a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a data-href="reservation-add.html" data-href="reservation-list.html" data-href="reservation-amend-list.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-schedule"></i>
                        </span>
                        <span class="title">Reservation</span> 
                        <span class="arrow">
                            <i class="arrow-icon"></i>
                        </span>         
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="reservation-list.html">Reservation List</a>
                        </li>
                        <li>
                            <a href="reservation-amend-list.html">Amend Reservation List</a>
                        </li>
                        <li>
                            <a href="reservation-add.html">Add Reservation</a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a href="customer-list.html" data-href="customer-add.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-usergroup-add"></i>
                        </span>
                        <span class="title">Customer</span>           
                    </a>        
                </li>
                <li class="nav-item dropdown">
                    <a href="expenses-list.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-dollar"></i>
                        </span>
                        <span class="title">Expenses</span>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a href="room-list.html" data-href="room-add.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-key"></i>
                        </span>
                        <span class="title">Room</span>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a href="room-category-list.html" data-href="room-category-add.html">
                        <span class="icon-holder">
                            <i class="fas fa-door-open"></i>
                        </span>
                        <span class="title">Room Category</span>
                    </a>
                </li>
                
                <li class="nav-item dropdown">
                    <a href="agent-list.html" data-href="agent-add.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-solution"></i>
                        </span>
                        <span class="title">Agent</span>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a href="mealplan-list.html" data-href="mealplan-add.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-coffee"></i>
                        </span>
                        <span class="title">Meal Plan</span>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a href="paymentmode-list.html" data-href="paymentmode-add.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-dollar"></i>
                        </span>
                        <span class="title">Payment Mode</span>
                    </a>
                </li>

                <li class="nav-item dropdown">
                    <a href="employee-list.html" data-href="employee-add.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-user"></i>
                        </span>
                        <span class="title">Employee</span>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a class="dropdown-toggle">
                        <span class="icon-holder">
                            <i class="anticon anticon-file-sync"></i>
                        </span>
                        <span class="title">Report</span>
                        <span class="arrow">
                            <i class="arrow-icon"></i>
                        </span>
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="report-avalilability-chart.html">Avalilability Chart</a>
                        </li>
                    </ul>
                </li>`;
            break;
        case '2':

            menuHtml = `<li class="nav-item dropdown">
                    <a href="dashboard.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-dashboard"></i>
                        </span>
                        <span class="title">Dashboard</span>           
                    </a>        
                </li>
                <li class="nav-item dropdown">
                    <a class="dropdown-toggle" data-href="booking-add.html" data-href="booking-list.html" data-href="booking-amend-list.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-plus"></i>
                        </span>
                        <span class="title">Check In</span> 
                        <span class="arrow">
                            <i class="arrow-icon"></i>
                        </span>           
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="booking-list.html">Check IN List</a>
                        </li>
                        <li>
                            <a href="booking-amend-list.html">Amend Check IN List</a>
                        </li>
                        <li>
                            <a href="booking-add.html">Add Check IN</a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a data-href="reservation-add.html" data-href="reservation-list.html" data-href="reservation-amend-list.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-schedule"></i>
                        </span>
                        <span class="title">Reservation</span> 
                        <span class="arrow">
                            <i class="arrow-icon"></i>
                        </span>         
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="reservation-list.html">Reservation List</a>
                        </li>
                        <li>
                            <a href="reservation-amend-list.html">Amend Reservation List</a>
                        </li>
                        <li>
                            <a href="reservation-add.html">Add Reservation</a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a href="customer-list.html" data-href="customer-add.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-usergroup-add"></i>
                        </span>
                        <span class="title">Customer</span>           
                    </a>        
                </li>`;
            break;
    }

    menuHtml += `
            <li class="nav-item dropdown">
                <a href="index.html">
                    <span class="icon-holder">
                        <i class="anticon anticon-logout text-danger"></i>
                    </span>
                    <span class="title">LogOut</span>           
                </a>        
            </li>
            `;


    $(".side-nav-menu").html(menuHtml);
}

/* Add Loader to body */
$('body').prepend(`<div class="loader-area">
    <div class="loader-overlay">
        <div class="loader"></div>
    </div>
</div>`);

/* Set Menu Active */

var path = window.location.pathname;
var page = path.split("/").pop();
$(".nav-item [href='" + page + "']").closest('li').addClass('active');
$(".nav-item [data-href='" + page + "']").closest('li').addClass('active');
$(".nav-item [href='" + page + "']").closest('ul').closest('li').addClass('open');
$(".nav-item [data-href='" + page + "']").closest('ul').closest('li').addClass('open');

/**
 * Title
 */

$('title').html('Nellai Krishna Foods PVT. LTD');

/**
 * Input Auto Complete Off
 */

$('input').attr('autocomplete', 'no-fill');

/**
 * Select 2
 */

$(document).ready(function() {
    if ($('.select2').length) {
        $('.select2').select2();
        $('select').on('select2:open', function(e) {
            $('.add-new-record').remove()
            if (typeof($(this).attr('data-hasModel')) != 'undefined' && $(this).attr('data-hasModel')) {
                $(".select2-results__options").after('<div class="add-new-record" data-toggle="modal" data-target="#' + $(this).attr('data-hasModel') + '"><i class="anticon anticon-plus"></i> Add New Record</div>')
            }
        });
        $(document).on('shown.bs.modal', function(e) {
            try {
                if ($('body').find('.select2-container--open').length) {
                    $('.select2').select2("close");
                    var targetId = e.target.id.replace("_modal", "");
                    $('[name="' + targetId + '"]').focus();
                }
            } catch (error) {
                console.log(error);
            }
        })
    }
});

/**
 * To Serlize object
 */
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};




/**
 * 
 * @param {JSON} data  Full data for Table list
 * @param {JSON} column  Column Header
 * @param {boolean} filter  Individual Column filter
 * @param {'string'} dataTableId Table ID
 */

/**
 * Table
 */
function dataTableDisplay(data, column, filter, dataTableId, button) {
    $('#' + dataTableId).DataTable({
        lengthChange: !1,
        buttons: ["excel", "pdf"],
        'columns': column,
        'data': data,
        initComplete: function() {


            if (filter) {
                var i = 0;
                this.api().columns().every(function() {
                    var column = this;
                    if ($("thead tr:first-child th").eq(i).text() != 'Action') {
                        var select = $('<select><option value=""></option></select>')
                            .appendTo($("thead tr:first-child th").eq(i).empty())
                            .on('change', function() {
                                var val = $.fn.dataTable.util.escapeRegex(
                                    $(this).val()
                                );
                                column
                                    .search(val ? '^' + val + '$' : '', true, false)
                                    .draw();
                            });
                        column.data().unique().sort().each(function(d, j) {
                            select.append('<option value="' + d + '">' + d + '</option>')
                        });
                        i++;
                    } else {
                        $("thead tr:first-child th").eq(i).html("")
                    }
                });
            }
            $(".dataTables_filter").parent().append(button);
            $(".dataTables_filter").addClass('search-box pull-left');
            $(".dataTables_filter label").addClass('position-relative').append(`<i class="bx bx-search-alt search-icon"></i>`);
            $(".dataTables_filter label input").attr('placeholder', 'Search...').removeClass('form-control-sm');
            $(".paging_simple_numbers > .pagination").addClass('pagination-rounded justify-content-end mb-2"');
            $(".dataTables_info").addClass('text-dark');
        },
        "drawCallback": function() {
            $(".paging_simple_numbers > .pagination").addClass('pagination-rounded justify-content-end mb-2"');
        }
    }).buttons().container().appendTo("#" + dataTableId + "_wrapper .col-md-6:eq(0)")
}

/**
 * To Serlize object
 */
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    var $radio = $('input[type=radio],input[type=checkbox]', this);
    $.each($radio, function() {
        if (!o.hasOwnProperty(this.name)) {
            o[this.name] = '';
        }
    });
    return o;
};


/**
 * Table Row to Array of Objects
 * @param {string} selector  Eg: '#employee-table tbody tr:not(#addItem)'
 */

function tableRowTOArrayOfObjects(selector) {
    var TableData = new Array();
    $(selector).each(function() {
        let inputData = $(this).find('.form-control');
        var item = {};
        inputData.each(function() {
            item[$(this).attr('name')] = $(this).val();
        })
        TableData.push(item);
    });
    return TableData;
}
/**
 *  To Get Parameter
 *  @parameterName 
 */

function getParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function(item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

/**
 * Append Delete Modal
 */

$("body").append(`
<div class="modal fade" id="delete">
<div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="delete">Delete</h5>
            <button type="button" class="close" data-dismiss="modal">
                <i class="anticon anticon-close"></i>
            </button>
        </div>
        <div class="modal-body">
            Are you sure want to Delete?
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger btn-delete">Delete</button>
        </div>
    </div>
    
</div>
</div>
`)



/**
 * Set vale to delete modal
 */

$(document).on('click', '.btn-delete-table', function() {
    $(".btn-delete").attr('data-detete', $(this).attr('data-delete'))

    if (typeof($(this).attr('data-type')) != 'undefined')
        $(".btn-delete").attr('data-type', $(this).attr('data-type'))
})


/**
 * ShoW Toast
 * @param {string} msg Message
 * @param {string} type it shoul be success/error
 */

function showToast(msg, type) {
    (type == 'success') ? toastr.success(msg, type.toLocaleUpperCase()): toastr.error(msg, type.toLocaleUpperCase());
}

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": 3000,
    "hideDuration": 1000,
    "timeOut": 5000,
    "extendedTimeOut": 1000,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}


/* Input for number no negative numbers */

$("input[type=number]").each(function(index) {
    $(this).attr({
        "min": "0",
        "oninput": "validity.valid||(value='')"
    });
});


/**
 * Loader 
 * @param {boolean} type 
 * 
 */

function loader(type) {
    (type) ? $(".loader-area").addClass('display-block'): $(".loader-area").removeClass('display-block');
}

/* For Validate Required field */

$(document).on('keyup blur', '[required]', function() {
    ($(this).val()) ? $(this).removeClass('is-invalid'): $(this).addClass('is-invalid');
});

/** Adding Star to Required field */
$('[required]').each(function() {
    $(this).closest('div').find('label').append('<span class="text-danger">*</span>');
});


/**
 * Required field checker
 * @param {string} selector  ID/Class for the Form
 */

function checkRequired(selector) {
    var flag = true;
    $(selector + " [required]").each(function(index) {
        if (!$(this).val()) {
            $(this).addClass('is-invalid');
            flag = false;
        } else
            $(this).removeClass('is-invalid');
    });
    return flag;
}

/**
 * Common ajax functions
 * @param {string} url 
 * @param {string} type 
 * @param {JSON} data 
 * @param {string} modalSelector  ID/Class for the Form to reset after success
 * @param {string} sMessage 
 * @param {string} eMessage 
 * @param {JSON} sCallBack  *function* for function name, *param* for call back paramater
 * @param {JSON} eCallBack  *function* for function name, *param* for call back paramater
 */

function commonAjax(url, type, data, modalSelector, sMessage, eMessage, sCallBack, eCallBack) {
    loader(true);
    let serverUrl = 'http://glowmedia.in/nellai/api/';
    $.ajax({
        url: (isEmptyValue(url)) ? serverUrl + 'services.php' : serverUrl + url,
        type: type,
        data: data,
        success: function(response) {
            loader(false);
            try {
                var response = JSON.parse(response);
                if (data.query == 'fetch') {
                    if (!isEmptyValue(response)) {
                        if (!isEmptyValue(modalSelector)) {
                            $(".select2[multiple]").val(null).trigger("change");
                            $(modalSelector).modal('hide');
                        }
                        if (!isEmptyValue(sMessage))
                            showToast(sMessage, 'success')
                        if (!isEmptyValue(sCallBack))
                            window[sCallBack.functionName](response, sCallBack.param1, sCallBack.param2, sCallBack.param3)
                    } else {
                        if (!isEmptyValue(eMessage))
                            showToast(eMessage, 'error')
                        if (!isEmptyValue(eCallBack))
                            window[eCallBack.functionName](response, eCallBack.param1, eCallBack.param2, eCallBack.param3)
                    }
                } else {
                    if (response.status_code == '200') {
                        if (!isEmptyValue(modalSelector)) {
                            $(".select2[multiple]").val(null).trigger("change");
                            $(modalSelector).modal('hide');
                        }
                        if (!isEmptyValue(sMessage))
                            showToast(sMessage, 'success')
                        if (!isEmptyValue(sCallBack))
                            window[sCallBack.functionName](response, sCallBack.param1, sCallBack.param2, sCallBack.param3)
                    } else {
                        (isEmptyValue(eMessage)) ? showToast(response.message, 'error'): showToast(eMessage, 'error')
                        if (!isEmptyValue(eCallBack))
                            window[eCallBack.functionName](response, eCallBack.param1, eCallBack.param2, eCallBack.param3)
                    }
                }
            } catch (err) {
                console.log(err)
            }

        }
    });
}
/**
 * To check a value is empty or not 
 * @param {Array|Object|string} value The value to inspect.
 * @returns {boolean} Returns `true` if the `value` is empty, else `false`.
 */

function isEmptyValue(value) {
    return (
        // null or undefined
        (value == null) || (typeof(value) == 'undefined') ||

        // has length and it's zero
        (value.hasOwnProperty('length') && value.length === 0) ||

        // is an Object and has no keys
        (value.constructor === Object && Object.keys(value).length === 0)
    )
}

/**
 * To List in Select2
 * @param {JSON} data 
 * @param {string} selector ID/Class name of the node
 * @param {String} Label for Select 2
 * @param {String} Value for Select 2
 */

function listSelect2(data, selector, jsonLabel, jsonValue) {
    let select2Data = [];
    let i = 1;
    data.forEach(element => {
        if (jsonValue)
            i = eval('element.' + jsonValue);
        select2Data.push({ 'id': i, 'text': eval('element.' + jsonLabel) })
        if (!jsonValue || typeof(jsonjsonValueKey) == 'undefined')
            i++;
    });
    $(selector).select2({
        data: select2Data
    })
}

/**
 * Add Status & creted by for all form
 */

$('form').append(`<input type="hidden" class="form-control" name="created_by" value="1000488"><input type="hidden" class="form-control" name="status" value="1">`);


/**
 * Location Reload
 */

function locationReload() {
    setTimeout(function() {
        location.reload();
    }, 1100)
}

/**
 * Setting Value to field
 * @param {string} Field name attr
 * @param {string} Field Value
 */

function setValue(name, value) {
    $('[name="' + name + '"]').val(value);
    if ($('[name="' + name + '"]').hasClass('select2'))
        $('[name="' + name + '"]').trigger('change');
}

/**
 * List Country
 */

function listCountry() {
    $("#country").select2({
        data: country.countries
    })
}

/**
 * List State
 * @param {string} countryId
 */

function listState(countryId) {
    var tempState = state.states.filter(function(el) {
        return el.country_id == countryId;
    });
    $("#state").select2('destroy').empty().select2({
        data: tempState
    })
    listCity($('#state').val());
}

/**
 *  List City
 * @param {string} stateId
 */

function listCity(stateId) {
    var tempCity = city.cities.filter(function(el) {
        return el.state_id == stateId;
    });
    $("#city").select2('destroy').empty().select2({
        data: tempCity
    })
}


/**
 * To set current date time
 * @param {string} ele Class name
 */

function setCurrentDate(ele) {
    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    $("." + ele).val(now.toISOString().slice(0, 16));
}

/**
 * To add days
 * @param {date} theDate from Date
 * @param {number} days  No of days to increment
 * @param {string} ele Class name
 */
function addDays(theDate, days, ele) {
    var now = new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    $("." + ele).val(now.toISOString().slice(0, 16));
}



/**
 * To set row json 
 * @param {JSON} responce 
 * @param {*} that 
 */

function setJsonToRow(responce, that) {
    that.closest('tr').attr('data-json', JSON.stringify(responce));
}

/**
 * To remove row json 
 * @param {JSON} responce 
 * @param {*} that 
 */

function removeJsonToRow(responce, that) {
    that.closest('tr').attr('data-json', '');
    $('.no_of_night').blur();
}


/**
 * Empty set to zero
 */

function emptySetToZero(value) {
    if (typeof(value) != 'undefined' && value && typeof(value) != 'NaN')
        return value
    else
        return 0;
}

/**
 * Number to Words
 * @param {number} eg:258452
 */

var single = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
var double = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = '';
    str += (n[1] != 0) ? (single[Number(n[1])] || double[n[1][0]] + ' ' + single[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (single[Number(n[2])] || double[n[2][0]] + ' ' + single[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (single[Number(n[3])] || double[n[3][0]] + ' ' + single[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (single[Number(n[4])] || double[n[4][0]] + ' ' + single[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (single[Number(n[5])] || double[n[5][0]] + ' ' + single[n[5][1]]) + 'only ' : '';
    return str;
}

/*
 * Check Edit or Add
 */

function checkAddOrEdit(databasename, conditionkey, imageFlag) {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    if (!isEmptyValue(id)) {
        let data = {
            "query": 'fetch',
            "databasename": databasename,
            "column": {
                "* ": " *"
            },
            "condition": {},
            "like": ""
        }

        data['condition'][conditionkey] = id;
        let flag = false;
        if (imageFlag && typeof(imageFlag) != 'undefined') {
            flag = true;
        }
        commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "multipleSetValue", "param1": flag })
    }
}

/**
 * Multiple set value
 * @param { JSON } 
 */

function multipleSetValue(responce, imageFlag) {
    if (!isEmptyValue(responce)) {
        $.each(responce[0], function(i, v) {
            setValue(i, v)
        })
    }
    docShow(imageFlag)
}

/**
 * Based on the flag
 * @param {Booleen} imageFlag 
 */
function docShow(imageFlag) {
    if (imageFlag) {
        var uploadData = $('[name=customer_doc]').val().split(",");
        /**
         * To preload Image in edit  
         */
        let html = '';
        if (uploadData.toString() != "" && uploadData) {
            $.each(uploadData, function(i, v) {
                let randomClass = randomString(16, 'aA');
                html += ` <div class="col-md-3 ${randomClass}" data-val="${v}">
                            <span class="badge-danger float-right border-radius-round position-absolute pointer remove-img" title="remove">
                                <span class="icon-holder">
                                    <i class="anticon anticon-close"></i>
                                </span>
                            </span>
                            <img class="w-100" src="http://glowmedia.in/frontoffice/admin/api/uploads/${v}" alt="">                        
                        </div>`;
            })
            $(".image-prev-area").append(html);
            $(".image-prev-area").removeClass('d-none');
        }
    }
}

/**
 * Local Imgae file to Base64 Image
 * @param {*} input Eg: this
 * @param {*} randomClass  where the image want to set Classname
 */

function readURL(input, randomClass) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $("." + randomClass + " img").attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

/**
 * Ramdom String 
 * @param {*} length Eg : 16
 * @param {*} chars Eg: 'aA' , '#aA' , '#A!'
 */

function randomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}

/**
 * Remove Item From Array
 * @param {*} array Eg:[a,b,'c',d] 
 * @param {*} value Eg: b
 */

function removeItemOnce(array, value) {
    var index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}


/**
 *  Wheel Scroll Stop in JS
 *

$('input').on("wheel mousewheel ", function(e) {
    if (e.originalEvent.deltaY > 0) {
        e.preventDefault();
        return;
    } else if (e.originalEvent.wheelDeltaY < 0) {
        e.preventDefault();
        return;
    }
});


/**
 * Stop Injecting Script
 */