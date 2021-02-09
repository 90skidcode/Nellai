$(document).ready(function() {
    displayAttendanceListInit();
    var currentDate = new Date();

    function generateCalendar(d) {
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
                    cal[i].push('<td>&nbsp;</td>');
                } else {
                    if (i === 1 && j < start) {
                        cal[i].push('<td>&nbsp;</td>');
                    } else {
                        cal[i].push('<td class="day">' + day++ + '</td>');
                    }
                }
            }
            cal[i].push('</tr>');
        }
        cal = cal.reduce(function(a, b) {
            return a.concat(b);
        }, []).join('');
        $('table').append(cal);
        let lastCount = true;
        $('table tr:last-child td').each(function() {
            if ($(this).text())
                lastCount = false;
        });
        if (lastCount)
            $('table tr:last-child').remove();
        $('#month').text(details.months[d.getMonth()]);
        $('#year').text(d.getFullYear());
        $('td.day').mouseover(function() {
            $(this).addClass('hover');
        }).mouseout(function() {
            $(this).removeClass('hover');
        });
    }
    $('#left').click(function() {
        $('table').text('');
        if (currentDate.getMonth() === 0) {
            currentDate = new Date(currentDate.getFullYear() - 1, 11);
            generateCalendar(currentDate);
        } else {
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
            generateCalendar(currentDate);
        }
    });
    $('#right').click(function() {
        $('table').html('<tr></tr>');
        if (currentDate.getMonth() === 11) {
            currentDate = new Date(currentDate.getFullYear() + 1, 0);
            generateCalendar(currentDate);
        } else {
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
            generateCalendar(currentDate);
        }
    });
    generateCalendar(currentDate);
});

var button = `<div class="text-sm-right">
<button type="button" data-toggle="modal" data-target=".add" class="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2"><i class="mdi mdi-plus mr-1"></i> Add Attendance </button>
</div>`;

function displayAttendanceListInit() {
    let data = {
        "query": "fetch",
        "databasename": "attandance_master",
        "column": {
            "*": "*"
        },
        'condition': {
            'created_by': $('[name="created_by"]').val()
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', {
        "functionName": "displayAttendanceList",
        "param1": "table-attendance-list"
    }, {
        "functionName": "displayAttendanceList",
        "param1": "table-attendance-list"
    });
}

function displayAttendanceList(response, dataTableId) {
    var tableHeader = [{
        "data": "attendence_date"
    }, /* EDIT */ /* DELETE */ {
        "data": "created_at",
        mRender: function(data, type, row) {
            return `<td class="text-right">
                     <a class="mr-3 text-info edit-row" title="Edit" data-toggle="modal" data-id="${row.attendance_master_id}" data-target=".add"><i class="mdi mdi-pencil font-size-14"></i></a>
                    <a class="text-danger delete-row" title="Delete" data-toggle="modal" data-id="${row.attendance_master_id}" data-target=".delete"><i class="mdi mdi-close font-size-14"></i></a>
                </td>`;
        }
    }];
    dataTableDisplay(response, tableHeader, false, dataTableId, button);
}

/**
 * To Add Attendance
 */

$(document).on('click', '[data-target=".add"]', function() {
    $(".attendance-add").removeAttr('data-id');
    $("#attendance-add")[0].reset();
});

/**
 * To Edit Attendance
 */

$(document).on('click', ".edit-row", function() {
    $(".attendance-add").attr('data-id', $(this).attr('data-id'));
    $("#attendance-add")[0].reset();
    let data = {
        "query": "fetch",
        "databasename": "attendance_master",
        "column": {
            "*": "*"
        },
        'condition': {
            'attendance_master_id': $(this).attr('data-id')
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', {
        "functionName": "multipleSetValue"
    });
});

/**
 * To detele row
 */

$(document).on('click', ".delete-row", function() {
    $(".delete .btn-delete").attr('data-detete', $(this).attr('data-id'));
});

$(document).on('click', ".btn-delete", function() {
    var data = {
        'query': 'update',
        'databasename': 'attendance_master',
        'condition': {
            'attendance_master_id': $(".btn-delete").attr('data-detete')
        },
        'values': {
            'status': '0'
        }
    }
    $("#delete").modal('hide');
    commonAjax('database.php', 'POST', data, '', 'Record Deleted Sucessfully', '', {
        "functionName": "locationReload"
    })
});


/**
 * Add Leave Master
 */

$('.attendance-add').click(function() {
    if (checkRequired('#attendance-add')) {
        var id = $(this).attr('data-id');
        if (isEmptyValue(id)) {
            // Add New
            var data = {
                "query": 'add',
                "databasename": 'attendance_master',
                "values": $("#attendance-add").serializeObject()
            }
            commonAjax('database.php', 'POST', data, '.add', 'Attendance added successfully', '', {
                "functionName": "locationReload"
            })
            $("#table-attendance-list").dataTable().fnDraw();
        } else {
            // Edit
            var data = {
                "query": 'update',
                "databasename": 'attendance_master',
                "values": $("#attendance-add").serializeObject(),
                "condition": {
                    "attendance_master_id": id
                }
            }
            commonAjax('database.php', 'POST', data, '.add', 'Attendance updated successfully', '', {
                "functionName": "locationReload"
            })
        }
    }
});


/**
 * To delete a row
 */

$(document).on('click', '.btn-outline-danger', function() {
    if ($(this).closest('table').find("#button-add-item").attr('count') != '1') {
        $(this).closest('tr').remove();
        $(this).closest('table').find("#button-add-item").attr('count', parseInt($(this).closest('table').find("#button-add-item").attr('count')) - 1);
    }
});