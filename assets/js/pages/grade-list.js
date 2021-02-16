$(document).ready(function() {
    displayGradeListInit();
    listAllowence();
    listDeductions();
});

var button = `<div class="text-sm-right">
<button type="button" data-toggle="modal" data-target=".add" class="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2"><i class="mdi mdi-plus mr-1"></i> Add Grade </button>
</div>`;


/**
 * List Allowence in select 2
 */

function listAllowence() {
    let data = {
        "query": 'fetch',
        "databasename": 'allowence_master',
        "column": {
            "allowence_master_id": "allowence_master_id",
            "allowence_name": "allowence_name"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "dataAllowence" })
}

var allowenceDataList = '<option value="">Select</option>';

function dataAllowence(responce) {
    $.each(responce, function(i, v) {
        allowenceDataList += `<option value='${v.allowence_master_id}'>${v.allowence_name}</option>`
    });
}

/**
 * List Deductions in select 2
 */

function listDeductions() {
    let data = {
        "query": 'fetch',
        "databasename": 'deductions_master',
        "column": {
            "deductions_master_id": "deductions_master_id",
            "deductions_name": "deductions_name"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "dataDeductions" })
}

var deductionsDataList = '<option value="">Select</option>';

function dataDeductions(responce) {
    $.each(responce, function(i, v) {
        deductionsDataList += `<option value='${v.deductions_master_id}'>${v.deductions_name}</option>`
    });
}

function displayGradeListInit() {
    let data = {
        "query": "fetch",
        "databasename": "employee_grade",
        "column": {
            "*": "*"
        },
        'condition': {
            'status': '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "displayGradeList", "param1": "table-grade-list" }, { "functionName": "displayGradeList", "param1": "table-grade-list" });
}

function displayGradeList(response, dataTableId) {
    var tableHeader = [{
        "data": "employee_grade_id"
    }, {
        "data": "employee_grade"
    }, {
        "data": "status",
        mRender: function(data, type, row) {
            if (row.status == '1')
                return `<span class="badge badge-pill badge-success font-size-12">Active</span>`;
            else
                return `<span class="badge badge-pill badge-danger font-size-12">In Active</span>`;
        }
    }, /* EDIT */ /* DELETE */ {
        "data": "created_at",
        mRender: function(data, type, row) {
            return `<td class="text-right">
                     <a class="mr-3 text-info edit-row" title="Edit" data-toggle="modal" data-id="${row.employee_grade_id}" data-target=".add"><i class="mdi mdi-pencil font-size-14"></i></a>
                    <a class="text-danger delete-row" title="Delete" data-toggle="modal" data-id="${row.employee_grade_id}" data-target=".delete"><i class="mdi mdi-close font-size-14"></i></a>
                </td>`;
        }
    }];
    dataTableDisplay(response, tableHeader, false, dataTableId, button);
}

/**
 * To Add Grade
 */

$(document).on('click', '[data-target=".add"]', function() {
    $(".grade-add").removeAttr('data-id');
    formReset();
});

/**
 * To Edit Grade
 */

$(document).on('click', ".edit-row", function() {
    $(".grade-add").attr('data-id', $(this).attr('data-id'));
    formReset();
    let data = {
        "query": "fetch",
        "databasename": "employee_grade",
        "column": {
            "*": "*"
        },
        'condition': {
            'employee_grade_id': $(this).attr('data-id')
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "gradeSetValue" });
});

/***
 * Grade Set Value
 */

function gradeSetValue(response) {
    multipleSetValue(response);
    if (response[0].allowance) {
        console.log(typeof(response[0].allowance), response[0].allowance);
        let gradeAllowance = JSON.parse(response[0].allowance);
        $.each(gradeAllowance, function(index, value) {
            if (index)
                $('#button-add-allowance').trigger('click');
            $.each(value, function(i, v) {
                $('tbody tr:nth-child(' + (index + 1) + ') [name="' + i + '"]').val(v);
            })
        })
    }
    if (response[0].deductions) {
        let gradeDeductions = JSON.parse(response[0].deductions);
        $.each(gradeDeductions, function(index, value) {
            if (index)
                $('#button-add-deductions').trigger('click');
            $.each(value, function(i, v) {
                $('tbody tr:nth-child(' + (index + 1) + ') [name="' + i + '"]').val(v);
            })
        })
    }
    totalCalculation();
}

/**
 * To detele row
 */

$(document).on('click', ".delete-row", function() {
    $(".delete .btn-delete").attr('data-detete', $(this).attr('data-id'));
});

$(document).on('click', ".btn-delete", function() {
    var data = {
        'query': 'update',
        'databasename': 'employee_grade',
        'condition': {
            'employee_grade_id': $(".btn-delete").attr('data-detete')
        },
        'values': {
            'status': '0'
        }
    }
    $("#delete").modal('hide');
    commonAjax('database.php', 'POST', data, '', 'Record Deleted Sucessfully', '', { "functionName": "locationReload" })
});


/**
 * Add Grade Master
 */

$('.grade-add').click(function() {
    if (checkRequired('#grade-add')) {
        var id = $(this).attr('data-id');
        var values = $("#grade-add").serializeObject();
        values['allowance'] = JSON.stringify(tableRowTOArrayOfObjects('#allowance-table tbody tr:not(#addAllowance)'));
        values['deductions'] = JSON.stringify(tableRowTOArrayOfObjects('#deductions-table tbody tr:not(#addDeductions)'));
        if (!hasDuplicates(values['allowance_type']) && !hasDuplicates(values['deductions_type'])) {
            delete values['allowance_type'];
            delete values['allowance_amount_monthly'];
            delete values['allowance_amount_yearly'];
            delete values['deductions_type'];
            delete values['deductions_amount_monthly'];
            delete values['deductions_amount_yearly'];
            delete values['deductions_name'];
            delete values['allowance_name'];
            console.log(values);
            if (isEmptyValue(id)) {
                // Add New
                var data = {
                    "query": 'add',
                    "databasename": 'employee_grade',
                    "values": values
                }
                commonAjax('database.php', 'POST', data, '.add', 'Grade added successfully', '', { "functionName": "locationReload" })
                $("#table-grade-list").dataTable().fnDraw();
            } else {
                // Edit
                var data = {
                    "query": 'update',
                    "databasename": 'employee_grade',
                    "values": values,
                    "condition": {
                        "employee_grade_id": id
                    }
                }
                commonAjax('database.php', 'POST', data, '.add', 'Grade updated successfully', '', { "functionName": "locationReload" })
            }
        } else
            showToast("Check Duplicate Allowance and Deductions", 'error');
    }
});

$(document).on('click', '#button-add-allowance', function() {
    let c = $(this).attr('count');
    $(this).attr('count', parseInt($(this).attr('count')) + 1);
    $(this).closest('table').find('#addAllowance').before(`  <tr>
    <td class="text-center">
        <button type="button" title="Reject" class="btn btn-icon btn-outline-danger btn-lg">
        <i class="fa fa-trash"></i>
    </button>
    </td>
    <td scope="row">
        <select name="allowance_type" class="form-control">${allowenceDataList}</select>
    </td>
    <td class="display-none">
        <input type="hidden" name="allowance_name" class="form-control text-right">
    </td>
    <td>
        <input type="number" name="allowance_amount_monthly" class="form-control text-right" required>
    </td>
    <td>
        <input type="number" name="allowance_amount_yearly" class="form-control text-right" required readonly>
    </td>
</tr>`);
});

$(document).on('click', '#button-add-deductions', function() {
    let c = $(this).attr('count');
    $(this).attr('count', parseInt($(this).attr('count')) + 1);
    $(this).closest('table').find('#addDeductions').before(`<tr>
    <td class="text-center">
        <button type="button" title="Reject" class="btn btn-icon btn-outline-danger btn-lg">
        <i class="fa fa-trash"></i>
    </button>
    </td>
    <td scope="row">
        <select name="deductions_type" class="form-control">${deductionsDataList}</select>
    </td>
    <td class="display-none">
        <input type="hidden" name="deductions_name" class="form-control text-right">
    </td>
    <td>
        <input type="number" name="deductions_amount_monthly" class="form-control text-right" required>
    </td>
    <td>
        <input type="number" name="deductions_amount_yearly" class="form-control text-right" required readonly>
    </td>
</tr>`);
});


/**
 * To delete a row
 */

$(document).on('click', '#allowance-table .btn-outline-danger', function() {
    if ($('#allowance-table .btn-outline-danger').closest('table').find("tbody tr:not('#addAllowance')").length != '1') {
        $(this).closest('tr').remove();
    }
});

/**
 * To delete a row
 */

$(document).on('click', '#deductions-table .btn-outline-danger', function() {
    if ($('#deductions-table .btn-outline-danger').closest('table').find("tbody tr:not('#addDeductions')").length != '1') {
        $(this).closest('tr').remove();
    }
});

/**
 * For Total Calculation
 */

$(document).on('click keyup blur', '#deductions-table .btn-outline-danger, #allowance-table .btn-outline-danger, [name="allowance_amount_monthly"], [name="allowance_amount_yearly"], [name="deductions_amount_monthly"], [name="deductions_amount_yearly"]', function() {
    totalCalculation();
});

function totalCalculation() {
    var allowanceTotalMonthly = 0;
    $('[name="allowance_amount_monthly"]').each(function() {
        allowanceTotalMonthly += Number($(this).val());
    })
    $('.allowance-total-monthly').html('<b>Rs.' + allowanceTotalMonthly + '</b>');
    var deductionsTotalMonthly = 0;
    $('[name="deductions_amount_monthly"]').each(function() {
        deductionsTotalMonthly += Number($(this).val());
    })
    $('.deductions-total-monthly').html('<b> Rs.' + deductionsTotalMonthly + '</b>');
    var ctcTotalMonthly = allowanceTotalMonthly - deductionsTotalMonthly;
    $('.ctc-total-monthly').html('<b class="font-size-18">Rs.' + ctcTotalMonthly + '</b>');


    var allowanceTotalYearly = 0;
    $('[name="allowance_amount_yearly"]').each(function() {
        allowanceTotalYearly += Number($(this).val());
    })
    $('.allowance-total-yearly').html('<b>Rs.' + allowanceTotalYearly + '</b>');
    var deductionsTotalYearly = 0;
    $('[name="deductions_amount_yearly"]').each(function() {
        deductionsTotalYearly += Number($(this).val());
    })
    $('.deductions-total-yearly').html('<b> Rs.' + deductionsTotalYearly + '</b>');
    var ctcTotalYearly = allowanceTotalYearly - deductionsTotalYearly;
    $('.ctc-total-yearly').html('<b class="font-size-18">Rs.' + ctcTotalYearly + '</b>');

}

/**
 * To reset form while clicking the Add or Edit
 */

function formReset() {
    $("#grade-add")[0].reset();
    $('#allowance-table .btn-outline-danger').closest('table').find("tbody tr:not('#addAllowance')").remove();
    $('#deductions-table .btn-outline-danger').closest('table').find("tbody tr:not('#addDeductions')").remove();
    $('#button-add-allowance').trigger('click');
    $('#button-add-deductions').trigger('click');
    $('.allowance-total-monthly').html('');
    $('.allowance-total-yearly').html('');
    $('.deductions-total-monthly').html('');
    $('.deductions-total-yearly').html('');
    $('.ctc-total-monthly').html('');
    $('.ctc-total-yearly').html('');
}

$(document).on('keyup', '[name="deductions_amount_monthly"]', function() {
    $(this).closest('tr').find('[name="deductions_amount_yearly"]').val(Number($(this).val()) * Number(12));
    totalCalculation();
});

$(document).on('keyup', '[name="allowance_amount_monthly"]', function() {
    $(this).closest('tr').find('[name="allowance_amount_yearly"]').val(Number($(this).val()) * Number(12));
    totalCalculation();
});

$(document).on('change', '[name="allowance_type"]', function() {
    $(this).closest('tr').find('[name="allowance_name"]').val($(this).find('option:selected').text());
});

$(document).on('change', '[name="deductions_type"]', function() {
    $(this).closest('tr').find('[name="deductions_name"]').val($(this).find('option:selected').text());
});