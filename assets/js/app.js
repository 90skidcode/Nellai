var menuFlag = false;
var userSession = '';
if (sessionStorage.getItem("employee"))
    userSession = JSON.parse(sessionStorage.getItem("employee")).result[0];
$.getJSON("assets/json/menu.json", function(data) {
    let html = '';
    if (sessionStorage.getItem("employee")) {
        userSession = JSON.parse(sessionStorage.getItem("employee")).result[0];
        $.each(data, function(i, v) {
            if (v.menuid == userSession.department_id) {
                $.each(v.menu, function(inx, val) {
                    if (val.menulink == window.location.pathname.split('/').slice(-1)[0])
                        menuFlag = true;
                    html += `<li>
                    <a href="${val.menulink}" class="waves-effect">
                        <i class="bx ${val.menuicon}"></i>
                        <span>${val.menulabel}</span>
                    </a>`;
                    if (val.submenu) {
                        html += `<ul class="sub-menu mm-collapse" aria-expanded="false">`;
                        $.each(val.submenu, function(index, value) {
                            if (value.menulink == window.location.pathname.split('/').slice(-1)[0])
                                menuFlag = true;
                            html += `<li><a href="${value.menulink}">${value.menulabel}</a></li>`;
                        });
                        html += `</ul>`;
                    }
                    html += `</li>`;
                });
                $("#side-menu").html(html);
            }
        });

        /**
         * Add Status & creted by for all form
         */

        $('form').append(`<input type="hidden" class="form-control" name="created_by" value="${userSession.login_username}"><input type="hidden" class="form-control" name="status" value="1">`);
        $(".login-user-name").html(userSession.employee_name + " " + "<i class='bx bx-log-in-circle bx-fade-right font-size-22'></i>");
        if (!menuFlag)
            window.open('index.html', '_self');
    } else {
        if (window.location.pathname.split('/').slice(-1)[0] && window.location.pathname.split('/').slice(-1)[0] != 'index.html')
            window.open('index.html', '_self');
    }

});

/**
 * Menu 
 
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
            <span>Kitchen</span>
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

$("#side-menu.employee").html(` 
    <li>
        <a href="javascript: void(0);" class="has-arrow waves-effect">
            <i class="bx bx bxs-user"></i>
            <span>Employee</span>
        </a>
        <ul class="sub-menu mm-collapse" aria-expanded="false">
            <li><a href="employee-dashboard.html">Employee List</a></li>
            <li><a href="allowence-list.html">Allowence List</a></li> 
            <li><a href="deductions-list.html">Deductions List</a></li>  
            <li><a href="grade-list.html">Grade List</a></li> 
            <li><a href="designation-list.html">Designation List</a></li> 
            <li><a href="qualification-list.html">Qulification List</a></li>           
        </ul>
    </li>  

    <li>
        <a href="javascript: void(0);" class="has-arrow waves-effect">
            <i class='bx bx-calendar-plus'></i>
            <span>Leave</span>
        </a>
        <ul class="sub-menu mm-collapse" aria-expanded="false">           
            <li><a href="leave-list.html">Leave List</a></li> 
            <li><a href="leave-type-list.html">Leave Type List</a></li>             
        </ul>
    </li>

    <li>
        <a href="javascript: void(0);" class="has-arrow waves-effect">
        <i class='bx bx-slider-alt'></i>
            <span>Setting</span>
        </a>
        <ul class="sub-menu mm-collapse" aria-expanded="false">
            <li><a href="department-list.html">Department List</a></li>
            <li><a href="branch-list.html">Branch List</a></li>              
        </ul>
    </li>
    <li>
        <a href="attendance-list.html" class="has-arrow waves-effect">
        <i class='bx bx-fingerprint'></i>
            <span>Attendance</span>
        </a>
    </li>
    <li>
        <a  class="has-arrow waves-effect">
        <i class='bx bx-dollar'></i>
            <span>Salary</span>
        </a>
        <ul class="sub-menu mm-collapse" aria-expanded="false">
            <li><a href="salary-list.html">Salary List</a></li>
            <li><a href="salary-report.html">Salary Report</a></li>              
        </ul>
    </li>`);
*/

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
        try {
            $('.select2').select2();
            $('select').on('select2:open', function(e) {
                $('.add-new-record').remove()
                if (typeof($(this).attr('data-hasModel')) != 'undefined' && $(this).attr('data-hasModel')) {
                    $(".select2-results__options").after('<div class="add-new-record" data-toggle="modal" data-target="#' + $(this).attr('data-hasModel') + '"><i class="anticon anticon-plus"></i> Add New Record</div>')
                }
            });
        } catch (err) {

        }
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
            $(".dataTables_wrapper .row:first-child .col-sm-12.col-md-6:first-child").html(`<button onclick="tableToExcel('${dataTableId}', 'W3C Example Table')" class='btn btn-sm btn-primary'>Excel</button>`);
            $("th:first-child").trigger('click');
        },
        "drawCallback": function() {
            $(".paging_simple_numbers > .pagination").addClass('pagination-rounded justify-content-end mb-2"');
        }
    })
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
`);

/**
 * Set vale to delete modal
 */

$(document).on('click', '.btn-delete-table', function() {
    $(".btn-delete").attr('data-detete', $(this).attr('data-delete'))

    if (typeof($(this).attr('data-type')) != 'undefined')
        $(".btn-delete").attr('data-type', $(this).attr('data-type'))
});

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
    "preventDuplicates": true,
    "onclick": null,
}


/* Add Loader to body */
$('body').prepend(`
    <div id="preloader" class="display-none">
        <div id="status">
            <div class="spinner-chase">
                <div class="chase-dot"></div>
                <div class="chase-dot"></div>
                <div class="chase-dot"></div>
                <div class="chase-dot"></div>
                <div class="chase-dot"></div>
                <div class="chase-dot"></div>
            </div>
        </div>
    </div>`);

/**
 * Loader 
 * @param {boolean} type 
 * 
 */

function loader(type) {
    (type) ? $("#preloader").removeClass('display-none'): $("#preloader").addClass('display-none');
}

/* For Validate Required field 

$(document).on('blur change', '[required],.form-group.isinvalid .select2-container--default .select2-selection--single', function() {
    ($(this).val()) ? $(this).removeClass('is-invalid'): $(this).addClass('is-invalid');
    ($(this).val()) ? $(this).closest('.form-group').removeClass('isinvalid'): $(this).closest('.form-group').addClass('isinvalid');
});
*/

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
            $(this).closest('.form-group').addClass('isinvalid');
            flag = false;
        } else {
            $(this).removeClass('is-invalid');
            $(this).closest('.form-group').removeClass('isinvalid');
        }
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
    let serverUrl = 'https://glowmedia.in/nellai/api/';
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
                            showToast(sMessage, 'success');
                        if (!isEmptyValue(sCallBack))
                            window[sCallBack.functionName](response, sCallBack.param1, sCallBack.param2, sCallBack.param3)
                    } else {
                        if (!isEmptyValue(eMessage))
                            showToast(eMessage, 'error');
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
                            showToast(sMessage, 'success');
                        if (!isEmptyValue(sCallBack))
                            window[sCallBack.functionName](response, sCallBack.param1, sCallBack.param2, sCallBack.param3)
                    } else {
                        (isEmptyValue(eMessage)) ? showToast(response.message, 'error'): showToast(eMessage, 'error');
                        if (!isEmptyValue(eCallBack))
                            window[eCallBack.functionName](response, eCallBack.param1, eCallBack.param2, eCallBack.param3);
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
    select2Data.push({ 'id': "", 'text': "Select" })
    let i = 1;
    if (JSON.stringify(data) != '{}') {
        data.forEach(element => {
            if (jsonValue)
                i = eval('element.' + jsonValue);
            select2Data.push({ 'id': i, 'text': eval('element.' + jsonLabel) })
            if (!jsonValue || typeof(jsonjsonValueKey) == 'undefined')
                i++;
        });
        $(selector).html('');
        $(selector).select2({
            data: select2Data
        })
    } else {
        $(selector).html('');
    }

}



/**
 * Location Reload
 */

function locationReload() {
    loader(true);
    setTimeout(function() {
        location.reload();
    }, 3000)
}

/**
 * Setting Value to field
 * @param {string} Field name attr
 * @param {string} Field Value
 */

function setValue(name, value) {
    $('[name="' + name + '"]').val(value);
    if ($('[name="' + name + '"]').prop("tagName") == 'SELECT') {
        $('[name="' + name + '"]').trigger('change');
    }
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
 * @param {string} element Selector
 */

function setCurrentDate(ele) {
    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    $(ele).val(now.toISOString().slice(0, 10));
}

/**
 * To add days
 * @param {date} theDate from Date
 * @param {number} days  No of days to increment
 * @param {string}  element Selector
 */
function addDays(theDate, days, ele) {
    var now = new Date(new Date(theDate).getTime() + (days * 24 * 60 * 60 * 1000));
    $(ele).val(now.toISOString().slice(0, 10));
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
    let data = [];
    if (!isEmptyValue(responce)) {
        $.each(responce[0], function(i, v) {
            (i != 'state' && i != 'country' && i != 'city' && i != 'department_id' && i != 'branch_id' && i != 'employee_reporting_to') ? setValue(i, v): data[i] = v;
        })
        if (data.toString() != '[]') {
            setValue('country', data['country']);
            setValue('state', data['state']);
            setValue('city', data['city']);
            setTimeout(function() {
                setValue('department_id', data['department_id']);
            }, 300);
            setTimeout(function() {
                setValue('branch_id', data['branch_id']);
            }, 1500);
            setTimeout(function() {
                setValue('employee_reporting_to', data['employee_reporting_to']);
            }, 3000);
        }
    }
    docShow(imageFlag);
}

/**
 * Based on the flag * 
 * @param {string} element to which need to select 
 */
function docShow(element) {
    if (element) {
        var uploadData = $('[name=' + element + ']').val().split(",");
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
                                    <i class="bx bx-x"></i>
                                </span>
                            </span>
                            <img class="w-100" src="https://glowmedia.in/nellai/api/uploads/${v}" alt="">                        
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

/**
 * Find is any duplicate is there
 * @param {Array} array ['1','1','2']
 */

function hasDuplicates(array) {
    var counts = [];
    for (var i = 0; i <= array.length; i++) {
        if (counts[array[i]] === undefined) {
            counts[array[i]] = 1;
        } else {
            return true;
        }
    }
    return false;
}

/**
 * Find Array of Objects
 * @param {*} serachString  eg: "string 1" 
 * @param {*} key  eg: "name" 
 * @param {*} array eg: [
    { name:"string 1", value:"this", other: "that" },
    { name:"string 2", value:"this", other: "that" }
]
 */

function findInArrayOfObject(serachString, key, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === serachString) {
            return (typeof(array[i]) != 'undefined') ? array[i] : "";
        }
    }
}

/**
 * String to capitalize 
 * Eg: "Hi to all".capitalize();
 */

String.prototype.capitalize = function() {
    let text = this.split("_");
    text = text[0].split(" ");
    let replecedText = '';
    $.each(text, function(i, v) {
        replecedText += v.charAt(0).toUpperCase() + v.slice(1) + " ";
    })
    return replecedText;
}


/**
 * Numbers with Commas In Indian Formate
 * @param {*} x Eg: 12345 : 12,234
 */
function numberWithCommas(x) {
    return (typeof(x) != 'object') ? "Rs." + x.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,") : "";
}


/**
 * Numbers with Commas are removed
 * @param {*} x Eg: Rs.12,234 : 12234
 */

function removeCommas(x) {
    return x.replace(/,/g, "").replace(/Rs./g, "")
}

/**
 * Check Connection
 */

setInterval(function() {
    checkconnection()
}, 5000);

function checkconnection() {
    var status = navigator.onLine;
    if (status) {
        $('.internet-connect').remove();
    } else {
        $('.internet-connect').remove();
        $('body').prepend('<div class="internet-connect col-md-12 bg-danger p-3"><p class=" text-center">Check your Internet connection !!</p></div>').fadeIn();
    }
}


/**
 *  Wheel Scroll Stop in JS
 */

wheelRoll();

function wheelRoll() {
    $('input').on("wheel mousewheel", function(e) {
        if (e.originalEvent.deltaY > 0) {
            e.preventDefault();
            return;
        } else if (e.originalEvent.wheelDeltaY < 0) {
            e.preventDefault();
            return;
        }
    });

    $('input').attr({ 'min': 0 });

    /* Input for number no negative numbers */

    $("input[type=number]").each(function(index) {
        $(this).attr({
            "min": "0",
            "oninput": "validity.valid||(value='')"
        });
    });
}


/**
 * Tracking Staus Indicator
 */

function trackingStatus(data) {
    if (data == '1')
        return `<span class="badge badge-pill badge-warning font-size-12">Manager Approval Pending</span>`;
    if (data == '2')
        return `<span class="badge badge-pill badge-warning font-size-12">Finance Approval Pending</span>`;
    if (data == '3')
        return `<span class="badge badge-pill badge-warning font-size-12">Waiting For Stocks</span>`;
    if (data == '4')
        return `<span class="badge badge-pill badge-success font-size-12">Order recived</span>`;
    if (data == '5')
        return `<span class="badge badge-pill badge-warning font-size-12">CEO Approval Pending</span>`;
    if (data == '6')
        return `<span class="badge badge-pill badge-warning font-size-12">Partial Pending</span>`;
    if (data == '7')
        return `<span class="badge badge-pill badge-warning font-size-12">Send to consern Department</span>`;
    if (data == '8')
        return `<span class="badge badge-pill badge-danger font-size-12">Damaged Approved</span>`;
    if (data == '10')
        return `<span class="badge badge-pill badge-danger font-size-12">Deleted</span>`;
    else
        return ``;
}


/**
 *  Date time Fomrmate
 */

function formatDate(date) {
    var d = new Date(date);
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh;
    if (h >= 12) {
        h = hh - 12;
        dd = "PM";
    }
    if (h == 0) {
        h = 12;
    }
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);
    var replacement = h + ":" + m;
    replacement += " " + dd;
    return date.replace(pattern, replacement);
}

/**
 * Split number and text 
 * @param {*} inputText  eg: asdsa123sd return 123
 */
function processText(inputText) {
    var output = [];
    var json = inputText.split(' ');
    json.forEach(function(item) {
        output.push(item.replace(/\'/g, '').split(/(\d+)/).filter(Boolean));
    });
    return output[0][1];
}


/************************************************************************
 * Check Tracking
 */

/**
 * List Product in select 2
 */
listProducts();

function listProducts() {
    let data = {
        "query": 'fetch',
        "databasename": 'product_master',
        "column": {
            "product_code": "product_code",
            "product_name": "product_name"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "dataProduct" })
}

var productDataList = '<option value="">Select</option>';
var listProductArray = '';

function dataProduct(responce) {
    listProductArray = responce;
    $.each(responce, function(i, v) {
        productDataList += `<option value='${v.product_code}'>${v.product_code} - ${v.product_name}</option>`
    });
}

$('body').append(`<div class="modal fade info" tabindex="-1" role="dialog" aria-labelledby="addStoreOutLabel" style="display: none;" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered modal-xl" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="addStoreOutLabel">Details</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
            </button>
        </div>
        <div class="modal-body info-status">
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
    </div>
</div>
</div>`);

$(document).on('click', ".info-row", function() {
    let data = {
        "list_key": "getRequestTracking",
        "condition": { 'request_code': $(this).attr('data-id') }
    }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "infoStatus" });
});


function infoStatus(responce) {
    let html = ``;
    $.each(responce.result.tracking, function(i, v) {
        html += `<div class="card pl-3 pr-3 pt-2"><div class="row"><div class="w-100 header-badge">${trackingStatus(v.tracking_status)}</div>
        <div class="col-md-2">
                    <div class="form-group">
                        <label class="font-weight-bold">Bill No</label>
                        <p>${responce.result.request[0].bill_no}</p>     
                    </div>
                </div>
                <div class="col-md-2">
                <div class="form-group">
                    <label class="font-weight-bold">Vendor Name</label>
                    <p>${(v.vendor_name)? v.vendor_name : ""}</p>     
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                    <label class="font-weight-bold">Created By</label>
                    <p>${v.created_by_name}</p>     
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label class="font-weight-bold">Updated By</label>
                    <p>${v.employee_id} - ${v.employee_name}</p>     
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                    <label class="font-weight-bold">Department By</label>
                    <p>${v.department_name}</p>     
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                    <label class="font-weight-bold">Request Branch From</label>
                    <p>${v.branch_from}</p>     
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                    <label class="font-weight-bold">Requested Branch To</label>
                    <p>${v.branch_to}</p>     
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="font-weight-bold">Remarks</label>
                    <p> ${v.remarks}</p>     
                </div>
            </div>`;

        if (responce.result.request[0].damage_images) {
            html += `<div class="row">`;

            $.each(responce.result.request[0].damage_images.toString().split(","), function(inx, val) {
                html += `<div class="col-md-3"><img class="w-100" src="http://glowmedia.in/nellai/api/uploads/${val}"></div>`
            })
            html += `</div>`;
        }
        if (responce.result.request[0].item_code) {
            var vl = responce.result.request[0];
            html += `<table id="list" class="table table-centered table-nowrap table-bordered table-striped">
                        <thead class="bg-gray">
                            <tr>                   
                                <th class="w-80">Item</th>
                                <th class="w-20  text-right">Quantity (KGS)</th>
                            </tr>
                        </thead>
                        <tbody> 
                        <tr>
                            <th class="w-80">${vl.item_code} - ${vl.item_name}</th>
                            <th class="w-20 text-right">${vl.item_quantity}</th>
                        </tr>
                        </tbody>
                        </table>`;

        }
        html += `<table id="list" class="table table-centered table-nowrap table-bordered table-striped">
                        <thead class="bg-gray">
                            <tr>                   
                                <th class="w-40">Item</th>
                                <th class="w-20  text-right">Quantity (KGS)</th>
                                <th class="w-20  text-right">Cost per kg</th>
                                <th class="w-10  text-right">Total</th>
                            </tr>
                        </thead>`;
        $.each(JSON.parse(v.request_product_details), function(inx, val) {
            html += `<tbody> 
                <tr>
                    <th class="w-80">${val.product_code} - ${(typeof(findInArrayOfObject(val.product_code, 'product_code', listProductArray)) != 'undefined') ? findInArrayOfObject(val.product_code, 'product_code', listProductArray).product_name : ""}</th>
                    <th class="w-20 text-right">${val.quantity}</th>
                    <th class="w-20 text-right">${(emptySetToZero(val.cost))? emptySetToZero(val.cost) : ""}</th>
                    <th class="w-10 text-right">${(emptySetToZero(val.total))? numberWithCommas(emptySetToZero(val.total)) : ""}</th>
                </tr>
            </tbody>`;
        });
        html += `</table>
            <p class="col-md-12 text-right font-weight-bolder text-success font-size-20">${(v.product_total)?numberWithCommas(v.product_total):""}</p>
            </div></div>`;
    });
    $('.info-status').html(html);
}



/**
 * Export to Excel
 */

var tableToExcel = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>',
        base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
        format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
    return function(table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
        window.location.href = uri + base64(format(template, ctx))
    }
})()


function PrintElem() {
    var mywindow = window.open('', 'PRINT');
    mywindow.document.write('<html><head><title>Payment Slip</title>');
    mywindow.document.write('</head><body style="text-align:center;font: Georgia, "Times New Roman", Times, serif;background: #fff;font-size: 22pt;margin:20px auto auto 50px;" >');
    mywindow.document.write('<header style="text-align:center; white-space:nowrap;overflow:hidden;line-height: 1em;">' +
        '<p  style="font-size:16pt;white-space:nowrap;overflow:hidden;line-height: 12pt;">Payment Slip</p>' +
        '<p style="font-size:16pt;white-space:nowrap;overflow:hidden;line-height: 1em;">' + $('.mylabelpaymentheader').html() + '</p>' +
        '</header>');
    mywindow.document.write('<content style="text-align:center;">' +
        '<table style="margin-left: auto;margin-right: auto;border-collapse: collapse;font-size:16pt;">' +
        '<tr  style="border:1px solid black"><td  style="border:1px solid black">Name:</td><td  style="border:1px solid black">' + $('.lblName').html() + '</td></tr>' +
        '<tr style="border:1px solid black"><td style="border:1px solid black">Address:</td><td style="border:1px solid black">' + $('.lblAddress').html() + '</td></tr>' +
        '<tr  style="border:1px solid black"><td  style="border:1px solid black">Meter No:</td><td  style="border:1px solid black">' + $('.lblMeterNo').html() + '</td></tr>' +
        '<tr  style="border:1px solid black"><td  style="border:1px solid black">Token:</td><td  style="border:1px solid black">' + $('.lblToken').html() + '</td></tr>' +
        '</table>' +

        '</content>' +
        '<footer>' +
        '<hr style="margin-top:30pt;margin-bottom:30pt;">' +
        '<p style="text-align:right;">&copy pdb</p>' +
        '</footer>' +
        '');
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();

    return true;
}


$html = `<style>
                body {
                    font-size: 10px;
                    font-family:Calibri;
                }

                table {
                    font-size: 10px;
                    font-family:Calibri;
                }

            </style>

            <table style="width:100%">

                <tr>
                    <td align ="left">SALE ORDER NO</td>
                    <td align ="right">S01</td>
                </tr>
                <tr>
                    <td align ="left">SALE ORDER D/TIME</td>
                    <td align ="right">2009/01/01</td>
                </tr>

                <tr>
                    <td align ="left">CUSTOMER</td>
                    <td align ="right">JOHN DOE</td>
                </tr>

            </table>
            `;


function PrintElem() {
    Popup($html);
}

function Popup(data) {
    var mywindow = window.open('', 'my div', 'height=400,width=600');
    mywindow.document.write('<html><head><title>PressReleases</title>');
    mywindow.document.write('<link rel="stylesheet" href="css/main.css" type="text/css" />');
    mywindow.document.write('</head><body >');
    mywindow.document.write(data);
    mywindow.document.write('data');
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10

    myDelay = setInterval(checkReadyState, 100000000);

    function checkReadyState() {
        if (mywindow.document.readyState == "complete") {
            clearInterval(myDelay);
            mywindow.focus(); // necessary for IE >= 10

            mywindow.print();
            mywindow.close();
        }
    }

    return true;
}