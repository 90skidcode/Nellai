var button = '';
$(document).ready(function() {
    var d = new Date();
    var m = (d.getMonth() + 1).toString().padStart(2, '0');
    var y = d.getFullYear();
    var ym = y + "-" + m;
    button = `<div class="text-sm-right">
<input type="month" id="month-year" value="${ym}">
</div>`;
    displaySalaryListInit(m, y);
});


/**
 * List Salary 
 */

function displaySalaryListInit(m, y) {
    let data = { "list_key": "salaryList", "salary_month": m, "salary_year": y }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "displaySalaryList", "param1": "table-salary-list" }, { "functionName": "displaySalaryList", "param1": "table-salary-list" });
}

function displaySalaryList(response, dataTableId) {
    var tableHeader = [{
        "data": "employee_id"
    }, {
        "data": "employee_name"
    }, {
        "data": "department_name"
    }, {
        "data": "branch_name"
    }, {
        "data": "salary_total"
    }, {
        "data": "salary_process_status",
        mRender: function(row) {
            let status = "Not Processed";
            let statusBadge = "badge-warning";
            if (row != "0") {
                status = "Processed";
                statusBadge = "badge-success";
            }
            return `<td class="text-right">
                        <span class="badge badge-pill ${statusBadge} font-size-12">${status}</span>
                    </td>`;
        }
    }, /* EDIT */ /* DELETE */ {
        "data": "salary_process_status",
        mRender: function(data, type, row) {
            return `<td class="text-right">
                     <a class="mr-3 text-info salary-row" title="Edit" data-toggle="modal" data-id="${row.employee_id}" data-target=".salary"><i class="mdi mdi-pencil font-size-14"></i></a>
                    <a class="text-danger delete-row" title="Delete" data-toggle="modal" data-id="${row.employee_id}" data-target=".delete"><i class="mdi mdi-close font-size-14"></i></a>
                </td>`;
        }
    }];
    dataTableDisplay(response.result, tableHeader, false, dataTableId, button);

}


/**
 * Change date
 */

$(document).on('change', '#month-year', function() {
    let date = $(this).val().split("-");
    $('#table-salary-list').dataTable().fnClearTable();
    $('#table-salary-list').dataTable().fnDestroy();
    displaySalaryListInit(date[1], date[0]);
});



/**
 * To Edit Salary
 */

$(document).on('click', ".edit-row", function() {
    $(".salary-add").attr('data-id', $(this).attr('data-id'));
    $("#salary-add")[0].reset();
    let data = {
        "query": "fetch",
        "databasename": "salary_management",
        "column": {
            "*": "*"
        },
        'condition': {
            'salary_management_id': $(this).attr('data-id')
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "multipleSetValue" });
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
        'databasename': 'salary_management',
        'condition': {
            'salary_management_id': $(".btn-delete").attr('data-detete')
        },
        'values': {
            'status': '0'
        }
    }
    $("#delete").modal('hide');
    commonAjax('database.php', 'POST', data, '', 'Record Deleted Sucessfully', '', { "functionName": "locationReload" })
});


/**
 * Add Salary Master
 */

$('.salary-add').click(function() {
    if (checkRequired('#salary-add')) {
        var id = $(this).attr('data-id');
        if (isEmptyValue(id)) {
            // Add New
            var data = {
                "query": 'add',
                "databasename": 'salary_management',
                "values": $("#salary-add").serializeObject()
            }
            commonAjax('database.php', 'POST', data, '.add', 'Salary added successfully', '', { "functionName": "locationReload" })
            $("#table-salary-list").dataTable().fnDraw();
        } else {
            // Edit
            var data = {
                "query": 'update',
                "databasename": 'salary_management',
                "values": $("#salary-add").serializeObject(),
                "condition": {
                    "salary_management_id": id
                }
            }
            commonAjax('database.php', 'POST', data, '.add', 'Salary updated successfully', '', { "functionName": "locationReload" })
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

/**
 * Validation for From Date
 */

$(document).on('blur change', '[name="no_of_days"], [name="start_date"]', function() {
    let fromDate = $('[name="start_date"]').val();
    let noofDays = $('[name="no_of_days"]').val();
    if (noofDays && fromDate) {
        addDays(fromDate, (noofDays - 1), '[name="end_date"]');
    }
});


/*********************************************************************************
 * *******************************************************************************
 * Add Salary
 * *******************************************************************************
 */

$(document).on('click', '.salary-row', function() {
    let date = $("#month-year").val().split("-");
    $(".salary-add").removeAttr('data-id');
    $(".ctc-add").attr('data-id', $(this).attr('data-id'));
    let data = { "list_key": "getsalaryProceesing", "salary_year": date[0], "salary_month": date[1], "employee_id": $(this).attr('data-id') };
    commonAjax('', 'POST', data, '', '', '', { "functionName": "salaryDOMbuild" });
});

function salaryDOMbuild(responce) {
    console.log(responce);
    let attendanceTable = '';
    let attendanceData = responce.result.attendence[0];
    $.each(attendanceData, function(i, v) {
        attendanceTable += `<tr>
                                <td>${i.toString().replace(/_/g, " ").capitalize()}</td>
                                <td>${v}</td>
                            </tr>`;
    })
    $("#attendance-table tbody").html(attendanceTable);

    let allowanceTable = '';
    let allowanceData = JSON.parse(responce.result.grade[0].allowance);
    $.each(allowanceData, function(i, v) {
        allowanceTable += `<tr>
                                <td>${v.allowance_type.toString().replace(/_/g, " ").capitalize()}</td>
                                <td><input type="text" class="form-control text-right" name="${v.allowance_type}" value=${v.allowance_amount}></td>
                            </tr>`;
    });

    allowanceTable += `
        <tr>
            <td class="text-right font-weight-bold">Total Allowance</td>
            <td class="text-right font-weight-bold allowance-total"></td>
        </tr>
    `;
    $("#allowance-table tbody").html(allowanceTable);

    let deductionsTable = '';
    let deductionsData = JSON.parse(responce.result.grade[0].deductions);
    $.each(deductionsData, function(i, v) {
        deductionsTable += `<tr>
                                <td>${v.deductions_type.toString().replace(/_/g, " ").capitalize()}</td>
                                <td><input type="text"  class="form-control text-right" name="${v.deductions_type}" value=${v.deductions_amount}></td>
                            </tr>`;
    });

    deductionsTable += `<tr>
                            <td class="text-right font-weight-bold">Total Deductions</td>
                            <td class="text-right font-weight-bold deductions-total"></td>
                        </tr>
                        <tr>
                            <td class="text-right font-weight-bold">Total Salary</td>
                            <td class="text-right font-weight-bold font-size-20 salary-total"></td>
                        </tr>`;

    $("#deductions-table tbody").html(deductionsTable);
    $('#allowance-table input').trigger('blur');
}

$(document).on('blur', '.modal.salary input', function() {
    let allowanceTotal = 0;
    $('#allowance-table input').each(function() {
        allowanceTotal += Number($(this).val());
    });
    $(".allowance-total").html(allowanceTotal);
    let deductionsTotal = 0;
    $('#deductions-table input').each(function() {
        deductionsTotal += Number($(this).val());
    });
    $(".deductions-total").html(deductionsTotal);
    $(".salary-total").html(allowanceTotal + deductionsTotal);
});