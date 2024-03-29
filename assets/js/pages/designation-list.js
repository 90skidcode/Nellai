$(document).ready(function() {
    displayDesignationListInit();
});

var button = `<div class="text-sm-right">
<button type="button" data-toggle="modal" data-target=".add" class="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2"><i class="mdi mdi-plus mr-1"></i> Add Designation </button>
</div>`;

function displayDesignationListInit() {
    let data = {
        "query": "fetch",
        "databasename": "employee_designation",
        "column": {
            "*": "*"
        },
        'condition': "",
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "displayDesignationList", "param1": "table-designation-list" }, { "functionName": "displayDesignationList", "param1": "table-designation-list" });
}

function displayDesignationList(response, dataTableId) {
    var tableHeader = [{
        "data": "employee_designation_id"
    }, {
        "data": "employee_designation"
    }, {
        "data": "status",
        mRender: function(data, type, row) {
            if (row.status == '1')
                return `<span class="badge badge-pill badge-success font-size-12">Active</span>`;
            if (row.status == '2')
                return `<span class="badge badge-pill badge-warning font-size-12">Admin</span>`;
            if (row.status == '3')
                return `<span class="badge badge-pill badge-warning font-size-12">Super Admin</span>`;
            else
                return `<span class="badge badge-pill badge-danger font-size-12">In Active</span>`;
        }
    }, /* EDIT */ /* DELETE */ {
        "data": "status",
        mRender: function(data, type, row) {
            if (row.status == '2')
                return ``;
            else
                return `<td class="text-right">
                            <a class="mr-3 text-info edit-row" title="Edit" data-toggle="modal" data-id="${row.employee_designation_id}" data-target=".add"><i class="mdi mdi-pencil font-size-14"></i></a>
                            <a class="text-danger delete-row" title="Delete" data-toggle="modal" data-id="${row.employee_designation_id}" data-target=".delete"><i class="mdi mdi-close font-size-14"></i></a>
                        </td>`;
        }
    }];
    dataTableDisplay(response, tableHeader, false, dataTableId, button);
}

/**
 * To Add Designation
 */

$(document).on('click', '[data-target=".add"]', function() {
    $(".designation-add").removeAttr('data-id');
    $("#designation-add")[0].reset();
});

/**
 * To Edit Designation
 */

$(document).on('click', ".edit-row", function() {
    $(".designation-add").attr('data-id', $(this).attr('data-id'));
    $("#designation-add")[0].reset();
    let data = {
        "query": "fetch",
        "databasename": "employee_designation",
        "column": {
            "*": "*"
        },
        'condition': {
            'employee_designation_id': $(this).attr('data-id')
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
        'databasename': 'employee_designation',
        'condition': {
            'employee_designation_id': $(".btn-delete").attr('data-detete')
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

$('.designation-add').click(function() {
    if (checkRequired('#designation-add')) {
        var id = $(this).attr('data-id');
        if (isEmptyValue(id)) {
            // Add New
            var data = {
                "query": 'add',
                "databasename": 'employee_designation',
                "values": $("#designation-add").serializeObject()
            }
            commonAjax('database.php', 'POST', data, '.add', 'Designation added successfully', '', { "functionName": "locationReload" })
            $("#table-designation-list").dataTable().fnDraw();
        } else {
            // Edit
            var data = {
                "query": 'update',
                "databasename": 'employee_designation',
                "values": $("#designation-add").serializeObject(),
                "condition": {
                    "employee_designation_id": id
                }
            }
            commonAjax('database.php', 'POST', data, '.add', 'Designation updated successfully', '', { "functionName": "locationReload" })
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