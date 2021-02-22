$(document).ready(function() {
    // displayAttendanceListInit();
    var currentDate = new Date();
    $('#left').click(function() {
        $('.attendance-table').html('');
        if (currentDate.getMonth() === 0) {
            currentDate = new Date(currentDate.getFullYear() - 1, 11);
            displayAttendanceListInit(currentDate);
        } else {
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
            displayAttendanceListInit(currentDate);
        }
    });
    $('#right').click(function() {
        $('.attendance-table').html('<tr></tr>');
        if (currentDate.getMonth() === 11) {
            currentDate = new Date(currentDate.getFullYear() + 1, 0);
            displayAttendanceListInit(currentDate);
        } else {
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
            displayAttendanceListInit(currentDate);
        }
    });
    displayAttendanceListInit(currentDate);
});

function generateCalendar(responce, d) {
    function monthDays(month, year) {
        var result = [];
        var days = new Date(year, month, 0).getDate();
        for (var i = 1; i <= days; i++) {
            result.push(i);
        }
        return result;
    }

    Date.prototype.monthDays = function() {
        var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
        return d.getDate();
    };

    var details = {
        // totalDays: monthDays(d.getMonth(), d.getFullYear()),
        totalDays: d.monthDays(),
        weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    };

    var start = new Date(d.getFullYear(), d.getMonth()).getDay();
    var cal = [];
    var day = 1;
    for (var i = 0; i <= 6; i++) {
        cal.push(['<tr>']);
        for (var j = 0; j < 7; j++) {
            if (i === 0) {
                cal[i].push('<td>' + details.weekDays[j] + '</td>');
            } else if (day > details.totalDays) {
                cal[i].push('<td class="border-light">&nbsp;</td>');
            } else {
                if (i === 1 && j < start) {
                    cal[i].push('<td class="border-light">&nbsp;</td>');
                } else {
                    let numerical = day++;
                    let today = new Date();
                    let dd = String(today.getDate()).padStart(2, '0');
                    let mm = String(today.getMonth());
                    let yyyy = today.getFullYear();
                    let dateStatus = '';
                    if (numerical == dd && d.getMonth() == mm && d.getFullYear() == yyyy)
                        dateStatus = 'currentdate';
                    else if (dd > numerical && d.getMonth() == mm && d.getFullYear() == yyyy)
                        dateStatus = 'pastdate';
                    else if (d.getMonth() < mm && d.getFullYear() == yyyy)
                        dateStatus = 'pastdate';
                    else if (d.getFullYear() < yyyy)
                        dateStatus = 'pastdate';
                    let checkAttendanceData = findInArrayOfObject(yyyy + "-" + (d.getMonth() + 1).toString().padStart(2, '0') + "-" + numerical.toString().padStart(2, '0'), "attendence_date", responce.result);
                    let checkAttendance = '';
                    (typeof(checkAttendanceData) != 'undefined') ? checkAttendance = '<span title="Attendance filled for ' + checkAttendanceData.employee_count + ' employee" class="attendance-count">' + checkAttendanceData.employee_count + '</span>': checkAttendance = '';
                    cal[i].push('<td class="day ' + dateStatus + '" data-date="' + numerical + '" data-month="' + (d.getMonth() + 1) + '" data-year="' + d.getFullYear() + '" >' + numerical + '' + checkAttendance + '</td>');
                }
            }
        }
        cal[i].push('</tr>');
    }
    cal = cal.reduce(function(a, b) {
        return a.concat(b);
    }, []).join('');
    $('.attendance-table').append(cal);
    let lastCount = true;
    $('.attendance-table tr:last-child td').each(function() {
        if ($(this).text().trim())
            lastCount = false;
    });
    if (lastCount)
        $('.attendance-table tr:last-child').remove();
    $('#month').text(details.months[d.getMonth()]);
    $('#year').text(d.getFullYear());
    $('td.day').mouseover(function() {
        $(this).addClass('hover');
    }).mouseout(function() {
        $(this).removeClass('hover');
    });
}

var button = `<div class="text-sm-right">
<button type="button" data-toggle="modal" data-target=".add" class="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2"><i class="mdi mdi-plus mr-1"></i> Add Attendance </button>
</div>`;

function displayAttendanceListInit(currentDate) {
    let data = { "list_key": "getAttendenceIndication", "branch_id": userSession.branch_id, "department_id": userSession.department_id, "attendence_year": new Date(currentDate).getFullYear(), "attendence_month": (new Date(currentDate).getMonth() + 1).toString().padStart(2, '0') }
    commonAjax('', 'POST', data, '', '', '', {
        "functionName": "generateCalendar",
        "param1": currentDate
    });

    let dataEmp = {
        "query": 'fetch',
        "databasename": 'employee_master',
        "column": {
            "employee_id": "employee_id",
            "employee_name": "employee_name"
        },
        "condition": {
            "branch_id": userSession.branch_id,
            "department_id": userSession.department_id
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', dataEmp, '', '', '', {
        "functionName": "setValueToVariable"
    });
}
var employeeList = '';

function setValueToVariable(res) {
    employeeList = res;
}

/**
 * To Add Attendance
 */

$(document).on('click', '.day', function() {
    if ($(this).hasClass('pastdate') || $(this).hasClass('currentdate')) {
        $(".attendance-add").removeAttr('data-id');
        $("#attendance-add")[0].reset();
        $("h3.title").html($(this).attr('data-date') + ' - ' + $("#month").html() + ' - ' + $("#year").html());
        $('.attendance-add').attr({ 'data-date': $(this).attr('data-date'), 'data-month': $(this).attr('data-month'), 'data-year': $(this).attr('data-year') });
        let html = '';
        if (userSession.employee_designation_id == '3') {
            if (employeeList) {
                $('.add').modal('show');
                $.each(employeeList, function(index, value) {
                    html += `<tr>
                    <td class="emp-id" data-value="${value.employee_id}">${value.employee_id}</td>
                    <td >${value.employee_name}</td>
                    <td ><input type="checkbox" class="form-control present"></td>
                    <td class="in-time"><input type="time" class="form-control form-status"></td>
                    <td class="out-time"><input type="time" class="form-control form-status"></td>
                    <td class="ot"><input type="number" class="form-control form-status"></td>            
                </tr>`;
                });
                $('.add-attendance-list tbody').html(html);
                $('.add-attendance-list tbody tr').each(function() {
                    if (!$(this).find('.present').is(':checked'))
                        $(this).find('.form-status').prop('readonly', true);
                });
                let data = { "list_key": "getAttendenceDatewise", "branch_id": userSession.branch_id, "department_id": userSession.department_id, "attendence_date": $("#year").html() + '-' + $(this).attr('data-month').toString().padStart(2, '0') + '-' + $(this).attr('data-date').toString().padStart(2, '0') }
                commonAjax('', 'POST', data, '', '', '', {
                    "functionName": "getAttendenceDatewise"
                });
            } else
                showToast("No Employee Found.", "error");
        } else
            showToast("Only Manager can add attendance", "error");
    }
});

function getAttendenceDatewise(res) {
    if (typeof(res.result) != 'undefined') {
        $.each(res.result.attendence, function(i, v) {
            let findDom = $(".emp-id[data-value='" + v.employee_id + "']").closest('tr');
            if (v.attendence_leave == '1')
                findDom.find('.present').trigger('click');
            findDom.find('.in-time input').val(v.attendence_in);
            findDom.find('.out-time input').val(v.attendence_out);
            findDom.find('.ot input').val(v.attendence_ot);
        });

        $.each(res.result.leave, function(i, v) {
            let findDom = $(".emp-id[data-value='" + v.employee_id + "']").closest('tr');
            findDom.find('.present').prop({ "checked": false, "disabled": true });
            findDom.find('.in-time input').val(" ");
            findDom.find('.out-time input').val(" ");
            findDom.find('.ot input').val(" ");
        });
    }
}

/** Make readonly or remove */
$(document).on('click', '.present', function() {
    (!$(this).is(':checked')) ? $(this).closest('tr').find('.form-status').prop({ 'readonly': true, 'required': false }).removeClass('is-invalid').val(' '): $(this).closest('tr').find('.form-status').prop({ 'readonly': false, 'required': true })
});

/**
 * Add Leave Master
 */

$('.attendance-add').click(function() {
    if (checkRequired('#attendance-add')) {
        let listData = [];
        $('.add-attendance-list tbody tr').each(function() {
            let checkboxValue = '2';
            if ($(this).find('.present').is(':checked'))
                checkboxValue = '1';
            listData.push({
                "employee_id": $(this).find('.emp-id').text(),
                "attendence_leave": checkboxValue,
                "attendence_in": $(this).find('.in-time input').val(),
                "attendence_out": $(this).find('.out-time input').val(),
                "attendence_ot": $(this).find('.ot input').val(),
            });
        });
        var data = {
            "list_key": 'attendence_insert',
            "attendence_date": $(this).attr('data-year') + '-' + $(this).attr('data-month') + '-' + $(this).attr('data-date'),
            "attendencelist": listData
        }

        console.log(JSON.stringify(data));
        commonAjax('', 'POST', data, '.add', 'Attendance added successfully', '', {
            "functionName": "modalClose"
        });
    }
});

function modalClose() {
    $('.add').modal('hide');
}

/**
 * To delete a row
 */

$(document).on('click', '.btn-outline-danger', function() {
    if ($(this).closest('table').find("#button-add-item").attr('count') != '1') {
        $(this).closest('tr').remove();
        $(this).closest('table').find("#button-add-item").attr('count', parseInt($(this).closest('table').find("#button-add-item").attr('count')) - 1);
    }
});