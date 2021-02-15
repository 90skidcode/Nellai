$(document).ready(function() {
    displayLeaveListInit();
    listLevaeType();
    listEmployee();
});

var button = `<div class="text-sm-right">
<button type="button" data-toggle="modal" data-target=".add" class="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2"><i class="mdi mdi-plus mr-1"></i> Add Leave </button>
</div>`;


/**
 * List Levae Type in select 2
 */

function listLevaeType() {
    let data = {
        "query": 'fetch',
        "databasename": 'leave_master',
        "column": {
            "leave_master_id": "leave_master_id",
            "leave_name": "leave_name"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "[name='leave_master_id']", "param2": "leave_name", "param3": "leave_master_id" })
}



/**
 * List Employee in select 2
 */

function listEmployee() {
    let data = {
        "query": 'fetch',
        "databasename": 'employee_master',
        "column": {
            "employee_id": "employee_master_id",
            "employee_name": "employee_name"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "[name='employee_id']", "param2": "employee_name", "param3": "employee_id" })
}

/**
 * List Leave 
 */

function displayLeaveListInit() {
    let data = {
        "query": 'fetch',
        "databasename": ' leave_management',
        "column": {
            "*": "*",
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "displayLeaveList", "param1": "table-leave-list" }, { "functionName": "displayLeaveList", "param1": "table-leave-list" });
}

function displayLeaveList(response, dataTableId) {
    var tableHeader = [{
        "data": "leave_management_id"
    }, {
        "data": "employee_id"
    }, {
        "data": "leave_master_id"
    }, {
        "data": "no_of_days"
    }, {
        "data": "start_date"
    }, {
        "data": "end_date"
    }, {
        "data": "remarks"
    }, /* EDIT */ /* DELETE */ {
        "data": "created_at",
        mRender: function(data, type, row) {
            return `<td class="text-right">
                     <a class="mr-3 text-info edit-row" title="Edit" data-toggle="modal" data-id="${row.leave_management_id}" data-target=".add"><i class="mdi mdi-pencil font-size-14"></i></a>
                    <a class="text-danger delete-row" title="Delete" data-toggle="modal" data-id="${row.leave_management_id}" data-target=".delete"><i class="mdi mdi-close font-size-14"></i></a>
                </td>`;
        }
    }];
    dataTableDisplay(response, tableHeader, false, dataTableId, button);
}

/**
 * To Add Leave
 */

$(document).on('click', '[data-target=".add"]', function() {
    $(".leave-add").removeAttr('data-id');
    $("#leave-add")[0].reset();
});

/**
 * To Edit Leave
 */

$(document).on('click', ".edit-row", function() {
    $(".leave-add").attr('data-id', $(this).attr('data-id'));
    $("#leave-add")[0].reset();
    let data = {
        "query": "fetch",
        "databasename": "leave_management",
        "column": {
            "*": "*"
        },
        'condition': {
            'leave_management_id': $(this).attr('data-id')
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
        'databasename': 'leave_management',
        'condition': {
            'leave_management_id': $(".btn-delete").attr('data-detete')
        },
        'values': {
            'status': '0'
        }
    }
    $("#delete").modal('hide');
    commonAjax('database.php', 'POST', data, '', 'Record Deleted Sucessfully', '', { "functionName": "locationReload" })
});


/**
 * Add Leave Master
 */

$('.leave-add').click(function() {
    if (checkRequired('#leave-add')) {
        var id = $(this).attr('data-id');
        if (isEmptyValue(id)) {
            // Add New
            var data = {
                "query": 'add',
                "databasename": 'leave_management',
                "values": $("#leave-add").serializeObject()
            }
            commonAjax('database.php', 'POST', data, '.add', 'Leave added successfully', '', { "functionName": "locationReload" })
            $("#table-leave-list").dataTable().fnDraw();
        } else {
            // Edit
            var data = {
                "query": 'update',
                "databasename": 'leave_management',
                "values": $("#leave-add").serializeObject(),
                "condition": {
                    "leave_management_id": id
                }
            }
            commonAjax('database.php', 'POST', data, '.add', 'Leave updated successfully', '', { "functionName": "locationReload" })
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