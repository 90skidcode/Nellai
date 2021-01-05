$(document).ready(function() {
    $(".select2").select2();
    listCountry();
    listState($('#country').val());
    $('#country').select2().on('change', function() {
        listState($(this).val());
    })
    $('#state').select2().on('change', function() {
        listCity($(this).val());
    });

    displayEmployeeListInit();
    listQualification();
    listDesignation();
    listGrade();
    listDepartment();
    listEmployee();
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
        "condition": {
            "status": '1'
        },
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
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "[name='department_id']", "param2": "department_name", "param3": "department_master_id" })
}


/**
 * List Employee in select 2
 */

function listEmployee() {
    let data = {
        "query": 'fetch',
        "databasename": 'employee_master',
        "column": {
            "employee_master_id": "employee_master_id",
            "employee_name": "employee_name"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "[name='employee_reporting_to']", "param2": "employee_name", "param3": "employee_master_id" })
}



var button = `<div class="text-sm-right">
                    <button type="button" data-toggle="modal" data-target=".add" class="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2"><i class="mdi mdi-plus mr-1"></i> Add Employee </button>
                </div>`;


function displayEmployeeListInit() {
    let data = { "list_key": "getEmployee", "condition": { "employee_master.status": "1" } }
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
        "data": "employee_mobile"
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
                     <a class="mr-3 text-info edit-row" title="Edit" data-toggle="modal" data-id="${row.employee_master_id}" data-target=".add"><i class="mdi mdi-pencil font-size-14"></i></a>
                    <a class="text-danger delete-row" title="Delete" data-toggle="modal" data-id="${row.employee_master_id}" data-target=".delete"><i class="mdi mdi-close font-size-14"></i></a>
                </td>`;
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
 * To Add Allowence
 */

$(document).on('click', '[data-target=".add"]', function() {
    $(".employee-add").removeAttr('data-id');
    $("#employee-add")[0].reset();
});

/**
 * To Edit Allowence
 */

$(document).on('click', ".edit-row", function() {
    $(".employee-add").attr('data-id', $(this).attr('data-id'));
    $("#employee-add")[0].reset();
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
            // Add New
            var data = {
                "query": 'add',
                "databasename": 'employee_master',
                "values": values
            }
            console.log(data);
            commonAjax('', 'POST', data, '#employee-add', 'Employee added successfully', '', { "functionName": "locationReload" });
        } else {
            // Edit
            var data = {
                "query": 'update',
                "databasename": 'employee_master',
                "values": values,
                "condition": {
                    "employee_master_id": id
                }
            }
            console.log(data);
            commonAjax('database.php', 'POST', data, '', 'Employee updated successfully', '', { "functionName": "locationReload" });
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
            url: 'http://glowmedia.in/nellai/api/upload.php',
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
})