$(document).ready(function() {
    $(".select2").select2();
    listCountry();
    listState($('#country').val());
    $('#country').select2().on('change', function() {
        listState($(this).val());
    });
    $('#state').select2().on('change', function() {
        listCity($(this).val());
    });
    displayEmployeeListInit();
    listQualification();
    listDesignation();
    listGrade();
    listDepartment();
    listConsultancy();
    $("[name='department_id']").select2().on('change', function() {
        listBranch();
    });
    listAllowence();
    listDeductions();
});

/**
 * List Qualification in select 2
 */

function listQualification() {
    let data = {
        "query": 'fetch',
        "databasename": 'employee_qualification',
        "column": {
            "employee_qualification_id": "employee_qualification_id",
            "employee_qualification": "employee_qualification"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "[name='employee_qualification_id']", "param2": "employee_qualification", "param3": "employee_qualification_id" })
}

/**
 * List Designation in select 2
 */

function listDesignation() {
    let data = {
        "query": 'fetch',
        "databasename": 'employee_designation',
        "column": {
            "employee_designation_id": "employee_designation_id",
            "employee_designation": "employee_designation"
        },
        "condition": "",
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "[name='employee_designation_id']", "param2": "employee_designation", "param3": "employee_designation_id" })
}

/**
 * List Grade in select 2
 */

function listGrade() {
    let data = {
        "query": 'fetch',
        "databasename": 'employee_grade',
        "column": {
            "employee_grade_id": "employee_grade_id",
            "employee_grade": "employee_grade"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "[name='employee_grade_id']", "param2": "employee_grade", "param3": "employee_grade_id" })
}

/**
 * List Department in select 2
 */

function listDepartment() {
    let data = {
        "query": 'fetch',
        "databasename": 'department_master',
        "column": {
            "department_master_id": "department_master_id",
            "department_name": "department_name"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "[name='department_id']", "param2": "department_name", "param3": "department_master_id" }, { "functionName": "listSelect2", "param1": "[name='department_id']", "param2": "department_name", "param3": "department_master_id" })
    setTimeout(function() {
        listBranch();
    }, 2000);
}

/**
 * List Branch in select 2
 * 
 */

function listBranch() {
    let data = {
        "query": 'fetch',
        "databasename": 'branch_master',
        "column": {
            "branch_master_id": "branch_master_id",
            "branch_name": "branch_name"
        },
        "condition": {
            "status": '1',
            "department_master_id": $("[name='department_id']").val()
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "[name='branch_id']", "param2": "branch_name", "param3": "branch_master_id" }, { "functionName": "listSelect2", "param1": "[name='branch_id']", "param2": "branch_name", "param3": "branch_master_id" });
}


/**
 * List Employee in select 2
 */

function listConsultancy(val) {
    let data = {
        "query": 'fetch',
        "databasename": 'consultancy_master',
        "column": {
            "consultancy_master_id": "consultancy_master_id",
            "consultancy_name": "consultancy_name"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "[name='employee_type']", "param2": "consultancy_name", "param3": "consultancy_master_id" }, { "functionName": "listSelect2", "param1": "[name='employee_type']", "param2": "consultancy_name", "param3": "consultancy_master_id" })
}

var button = `<div class="text-sm-right">
                    <button type="button" data-toggle="modal" data-target=".add" class="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2 btn-add-employee"><i class="mdi mdi-plus mr-1"></i> Add Employee </button>
                </div>`;


function displayEmployeeListInit() {
    let data = { "list_key": "getEmployee", "condition": { "employee_master.status": "1" } };
    commonAjax('', 'POST', data, '', '', '', { "functionName": "displayEmployeeList", "param1": "table-employee-list" }, { "functionName": "displayEmployeeList", "param1": "table-employee-list" });
}

function displayEmployeeList(response, dataTableId) {
    var tableHeader = [{
        "data": "employee_id"
    }, {
        "data": "employee_name"
    }, {
        "data": "department_name"
    }, {
        "data": "branch_name"
    }, {
        "data": "employee_mobile"
    }, {
        "data": "employee_designation_name"
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
            if (row.status == '1') {
                return `<td class="text-right">
                     <a class="mr-3 text-info edit-row" title="Edit" data-toggle="modal" data-id="${row.employee_master_id}" data-target=".add"><i class="mdi mdi-pencil font-size-14"></i></a>
                     <a class="mr-3 text-info salary-row" title="CTC" data-toggle="modal" data-id="${row.employee_id}" data-target=".salary"><i class="fa fa-dollar-sign font-size-14"></i></a>
                     <a class="mr-3 text-info login-row" title="Add Login" data-toggle="modal" data-id="${row.employee_id}" data-target=".login"><i class="fa fa-key font-size-14"></i></a>
                     <a class="text-danger delete-row" title="Delete" data-toggle="modal" data-id="${row.employee_master_id}" data-target=".delete"><i class="mdi mdi-close font-size-14"></i></a>
                </td>`;
            } else
                return ``;
        }
    }];
    dataTableDisplay(response.result, tableHeader, false, dataTableId, button);
}

$(document).on('click', '#button-add-item', function() {
    let c = $(this).attr('count');
    $(this).attr('count', parseInt($(this).attr('count')) + 1);
    $(this).closest('table').find('#addItem').before(`<tr>
    <td class="text-center"><button type="button" title="Reject" class="btn btn-icon btn-outline-danger btn-lg">
        <i class="fa fa-trash"></i>
    </button></td>
    <td scope="row">
        <input type="text" name="company_name" class="form-control">
    </td>
    <td>
        <input type="date" name="joined_date" class="form-control">
    </td>
    <td>
        <input type="date" name="relieved_date" class="form-control">
    </td>
    <td scope="row">
        <input type="text" name="company_designation" class="form-control">
    </td>
</tr>`);
});


/**
 * To Add Employye
 */

$(document).on('click', '.btn-add-employee', function() {
    $(".employee-add").removeAttr('data-id');
    employeeReset();
});

/**
 * To Edit Employee
 */

$(document).on('click', ".edit-row", function() {
    $(".employee-add").attr('data-id', $(this).attr('data-id'));
    employeeReset();
    let data = {
        "query": "fetch",
        "databasename": "employee_master",
        "column": {
            "*": "*"
        },
        'condition': {
            'employee_master_id': $(this).attr('data-id')
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "employeeSetValue" });
});

/***
 * Employee Set Value
 */

function employeeSetValue(response) {
    multipleSetValue(response);
    if (response[0].employee_experience) {
        let employeeExperience = JSON.parse(response[0].employee_experience);
        $.each(employeeExperience, function(index, value) {
            if (index)
                $('#button-add-item').trigger('click');
            $.each(value, function(i, v) {
                $('tbody tr:nth-child(' + (index + 1) + ') [name="' + i + '"]').val(v);
            })
        })
    }
    if (response[0].employee_documents)
        docShow('employee_documents');
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
        'databasename': 'employee_master',
        'condition': {
            'employee_master_id': $(".btn-delete").attr('data-detete')
        },
        'values': {
            'status': '0'
        }
    }
    $("#delete").modal('hide');
    commonAjax('database.php', 'POST', data, '', 'Record Deleted Sucessfully', '', { "functionName": "locationReload" })
});


/**
 * Add Employee
 */

$('.employee-add').click(function() {
    if (checkRequired('#employee-add')) {
        var id = $(this).attr('data-id');
        var values = $("#employee-add").serializeObject();
        values['employee_experience'] = tableRowTOArrayOfObjects('#employee-table tbody tr:not(#addItem)');
        delete values['company_name'];
        delete values['joined_date'];
        delete values['relieved_date'];
        delete values['company_designation'];
        if (isEmptyValue(id)) {
            values['list_key'] = 'employee_insert';
            commonAjax('', 'POST', values, '#employee-add', 'Employee added successfully', '', { "functionName": "locationReload" });
        } else {
            values['list_key'] = 'employee_update';
            commonAjax('', 'POST', values, '', 'Employee updated successfully', '', { "functionName": "locationReload" });
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
})


/**
 * File Upload
 */
var uploadData = $('[name=employee_documents]').val().split(",");
$(document).ready(function() {
    uploadData = $('[name=employee_documents]').val().split(",");
    $('input[type="file"]').change(function() {
        $(".btn-save").prop('disabled', true);
        var formData = new FormData();
        formData.append('file', $('#upload')[0].files[0]);
        let randomClass = randomString(16, 'aA');
        let html = ` <div class="col-md-3 ${randomClass}" data-val="">
                        <span class="badge-danger float-right border-radius-round position-absolute pointer remove-img" title="remove">
                            <span class="icon-holder d-none">
                                <i class="bx bx-x"></i>
                            </span>
                        </span>
                        <img class="w-100" src="" alt="">
                        <div class="progress">
                            <div class="progress-bar progress-bar-animated bg-success" role="progressbar" style="width: 0%"></div>
                        </div>
                    </div>`;
        $(".image-prev-area").append(html);
        $(".image-prev-area").removeClass('d-none');
        readURL(this, randomClass);
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        $("." + randomClass + " .progress-bar").css({
                            width: percentComplete + "%"
                        })
                        if (percentComplete === 100) {

                        }
                    }
                }, false);
                return xhr;
            },
            url: 'https://nellaikrishnafoods.in//api/upload.php',
            type: 'POST',
            data: formData,
            success: function(data) {
                $(".btn-save").prop('disabled', false);
                let dataResult = JSON.parse(data);
                $("#upload").val(null);
                $("." + randomClass + " .icon-holder").removeClass('d-none');
                if (dataResult.status_code == 200) {
                    showToast(dataResult.message, 'success');
                    uploadData.push(dataResult.result);
                    $("." + randomClass).attr('data-val', dataResult.result);
                } else {
                    showToast(dataResult.message, 'error');
                }
                uploadData = uploadData.filter(function(e) { return e });
                $('[name=employee_documents]').val(uploadData.toString());
            },
            error: function(data) {
                $(".btn-save").prop('disabled', false);
            },
            cache: false,
            contentType: false,
            processData: false
        });
    });
});

$(document).on('click', '.image-prev-area .remove-img', function() {
    var value = $(this).closest('div').attr('data-val');
    uploadData = $('[name=employee_documents]').val().split(",");
    if (value) {
        uploadData = removeItemOnce(uploadData, value);
        uploadData = uploadData.filter(function(e) { return e });
        $('[name=employee_documents]').val(uploadData.toString());
    }
    $(this).closest('div').remove();
    showToast("File removed successfully", 'success');
});

/**
 * Employee Form Reset
 */

function employeeReset() {
    $("#employee-add")[0].reset();
    $(".image-prev-area").html('');
    $("#v-pills-gen-ques-tab").trigger('click');
    $('.table-employee .btn-outline-danger').closest('.table-employee').find("tbody tr:not('#addItem')").remove();
    $('.table-employee .btn-outline-danger').closest('.table-employee').find("tbody tr:not('#addItem')").remove();
    $('#button-add-item').trigger('click');
}



/*********************************************************************************
 * *******************************************************************************
 * CTC Details
 * *******************************************************************************
 */

$(document).on('click', '.salary-row', function() {
    formReset();
    $(".ctc-add").attr('data-id', $(this).attr('data-id'));
    let data = {
        "query": "fetch",
        "databasename": "ctc_master",
        "column": {
            "*": "*"
        },
        'condition': {
            'employee_id': $(this).attr('data-id')
        },
        "like": ""
    };
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "ctcSetValue" });
});



/*********************************************************************************
 * *******************************************************************************
 * Login Details
 * *******************************************************************************
 */

$(document).on('click', '.login-row', function() {
    formReset();
    $("[name='login_username']").val($(this).attr('data-id'));
    $('.save-login').attr('data-id', $(this).attr('data-id'))
    let data = {
        "query": "fetch",
        "databasename": "login_master",
        "column": {
            "*": "*"
        },
        'condition': {
            'login_username': $(this).attr('data-id')
        },
        "like": ""
    };
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "loginSetValue" }, { "functionName": "removeSaveLogin" });
});

$(document).on('click', "[name='login_status']", function() {
    ($(this).prop("checked")) ? $(this).val(1): $(this).val(2);
});

function loginSetValue(responce) {
    if (JSON.stringify(responce) != '{}') {
        $("[name='login_username']").val(responce[0].login_username);
        $("[name='login_password']").val(responce[0].login_password);
        (responce[0].login_status == '1') ? $("[name='login_status']").prop('checked', true).val(1): $("[name='login_status']").prop('checked', false).val(0);
    }
}

function removeSaveLogin() {
    $('.save-login').attr('data-id', '');
}

$(document).on('click', '.save-login', function() {
    if (checkRequired('#login-add')) {
        var id = $(this).attr('data-id');
        var values = $("#login-add").serializeObject();
        if (isEmptyValue(id)) {
            var data = {
                "query": 'add',
                "databasename": 'login_master',
                "values": values
            }
            commonAjax('database.php', 'POST', data, '#login-add', 'Login added successfully', '', { "functionName": "locationReload" });
        } else {
            var data = {
                "query": 'update',
                "databasename": 'login_master',
                "values": values,
                "condition": {
                    "login_username": id
                }
            }
            commonAjax('database.php', 'POST', data, '', 'Login updated successfully', '', { "functionName": "locationReload" });
        }
    } else
        showToast("Please fill the fields", 'error');
});

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

/***
 * CTC Set Value
 */

function ctcSetValue(response) {
    multipleSetValue(response);
    if (response[0].allowance) {
        let ctcAllowance = JSON.parse(response[0].allowance);
        $.each(ctcAllowance, function(index, value) {
            if (index)
                $('#button-add-allowance').trigger('click');
            $.each(value, function(i, v) {
                $('tbody tr:nth-child(' + (index + 1) + ') [name="' + i + '"]').val(v);
            })
        })
    }
    if (response[0].deductions) {
        let ctcDeductions = JSON.parse(response[0].deductions);
        $.each(ctcDeductions, function(index, value) {
            if (index)
                $('#button-add-deductions').trigger('click');
            $.each(value, function(i, v) {
                $('tbody tr:nth-child(' + (index + 1) + ') [name="' + i + '"]').val(v);
            })
        })
    }
    totalCalculation();
}

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
    <td class="display-none">
        <input type="hidden" name="deductions_name" class="form-control text-right">
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
    $("#ctc-add")[0].reset();
    $("#login-add")[0].reset();
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

/**
 * Update CTC Master
 */

$('.ctc-add').click(function() {
    if (checkRequired('#ctc-add')) {
        var id = $(this).attr('data-id');
        var values = $("#ctc-add").serializeObject();
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
            // Edit
            var data = {
                "query": 'update',
                "databasename": 'ctc_master',
                "values": values,
                "condition": {
                    "employee_id": id
                }
            }
            commonAjax('database.php', 'POST', data, '.add', 'CTC updated successfully', '', { "functionName": "locationReload" })

        } else
            showToast("Check Duplicate Allowance and Deductions", 'error');
    }
});