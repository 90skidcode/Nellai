$(document).ready(function() {
    displayConsultancyListInit();
});

var button = `<div class="text-sm-right">
<button type="button" data-toggle="modal" data-target=".add" class="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2"><i class="mdi mdi-plus mr-1"></i> Add Consultancy </button>
</div>`;

function displayConsultancyListInit() {
    let data = {
        "query": "fetch",
        "databasename": "consultancy_master",
        "column": {
            "*": "*"
        },
        'condition': {
            'status': '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "displayConsultancyList", "param1": "table-consultancy-list" }, { "functionName": "displayConsultancyList", "param1": "table-consultancy-list" });
}

function displayConsultancyList(response, dataTableId) {
    var tableHeader = [{
        "data": "consultancy_master_id"
    }, {
        "data": "consultancy_name"
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
                     <a class="mr-3 text-info edit-row" title="Edit" data-toggle="modal" data-id="${row.consultancy_master_id}" data-target=".add"><i class="mdi mdi-pencil font-size-14"></i></a>
                    <a class="text-danger delete-row" title="Delete" data-toggle="modal" data-id="${row.consultancy_master_id}" data-target=".delete"><i class="mdi mdi-close font-size-14"></i></a>
                </td>`;
        }
    }];
    dataTableDisplay(response, tableHeader, false, dataTableId, button);
}

/**
 * To Add Consultancy
 */

$(document).on('click', '[data-target=".add"]', function() {
    $(".consultancy-add").removeAttr('data-id');
    $("#consultancy-add")[0].reset();
});

/**
 * To Edit Consultancy
 */

$(document).on('click', ".edit-row", function() {
    $(".consultancy-add").attr('data-id', $(this).attr('data-id'));
    $("#consultancy-add")[0].reset();
    let data = {
        "query": "fetch",
        "databasename": "consultancy_master",
        "column": {
            "*": "*"
        },
        'condition': {
            'consultancy_master_id': $(this).attr('data-id')
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
        'databasename': 'consultancy_master',
        'condition': {
            'consultancy_master_id': $(".btn-delete").attr('data-detete')
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

$('.consultancy-add').click(function() {
    if (checkRequired('#consultancy-add')) {
        var id = $(this).attr('data-id');
        if (isEmptyValue(id)) {
            // Add New
            var data = {
                "query": 'add',
                "databasename": 'consultancy_master',
                "values": $("#consultancy-add").serializeObject()
            }
            commonAjax('database.php', 'POST', data, '.add', 'Consultancy added successfully', '', { "functionName": "locationReload" })
            $("#table-consultancy-list").dataTable().fnDraw();
        } else {
            // Edit
            var data = {
                "query": 'update',
                "databasename": 'consultancy_master',
                "values": $("#consultancy-add").serializeObject(),
                "condition": {
                    "consultancy_master_id": id
                }
            }
            commonAjax('database.php', 'POST', data, '.add', 'Consultancy updated successfully', '', { "functionName": "locationReload" })
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