$(document).ready(function() {
    displayAllowenceListInit();
});

var button = `<div class="text-sm-right">
<button type="button" data-toggle="modal" data-target=".add" class="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2"><i class="mdi mdi-plus mr-1"></i> Add Allowence </button>
</div>`;

function displayAllowenceListInit() {
    let data = {
        "query": "fetch",
        "databasename": "allowence_master",
        "column": {
            "*": "*"
        },
        'condition': {
            'status': '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "displayAllowenceList", "param1": "table-allowence-list" }, { "functionName": "displayAllowenceList", "param1": "table-allowence-list" });
}

function displayAllowenceList(response, dataTableId) {
    var tableHeader = [{
        "data": "allowence_master_id"
    }, {
        "data": "allowence_name"
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
                        <a class="mr-3 text-info edit-row" title="Edit" data-toggle="modal" data-id="${row.allowence_master_id}" data-target=".add"><i class="mdi mdi-pencil font-size-14"></i></a>
                        <a class="text-danger delete-row" title="Delete" data-toggle="modal" data-id="${row.allowence_master_id}" data-target=".delete"><i class="mdi mdi-close font-size-14"></i></a>
                          </td>`;
        }
    }];
    dataTableDisplay(response, tableHeader, false, dataTableId, button);
}

/**
 * To Add Allowence
 */

$(document).on('click', '[data-target=".add"]', function() {
    $(".allowence-add").removeAttr('data-id');
    $("#allowence-add")[0].reset();
});

/**
 * To Edit Allowence
 */

$(document).on('click', ".edit-row", function() {
    $(".allowence-add").attr('data-id', $(this).attr('data-id'));
    $("#allowence-add")[0].reset();
    let data = {
        "query": "fetch",
        "databasename": "allowence_master",
        "column": {
            "*": "*"
        },
        'condition': {
            'allowence_master_id': $(this).attr('data-id')
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
        'databasename': 'allowence_master',
        'condition': {
            'allowence_master_id': $(".btn-delete").attr('data-detete')
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

$('.allowence-add').click(function() {
    if (checkRequired('#allowence-add')) {
        var id = $(this).attr('data-id');
        if (isEmptyValue(id)) {
            // Add New
            var data = {
                "query": 'add',
                "databasename": 'allowence_master',
                "values": $("#allowence-add").serializeObject()
            }
            commonAjax('database.php', 'POST', data, '.add', 'Allowence added successfully', '', { "functionName": "locationReload" })
            $("#table-allowence-list").dataTable().fnDraw();
        } else {
            // Edit
            var data = {
                "query": 'update',
                "databasename": 'allowence_master',
                "values": $("#allowence-add").serializeObject(),
                "condition": {
                    "allowence_master_id": id
                }
            }
            commonAjax('database.php', 'POST', data, '.add', 'Allowence updated successfully', '', { "functionName": "locationReload" })
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