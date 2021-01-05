$(document).ready(function() {
    displayBranchListInit();
    $(".select2").select2();

    listCountry();
    listState($('#country').val());
    $('#country').select2().on('change', function() {
        listState($(this).val());
    })
    $('#state').select2().on('change', function() {
        listCity($(this).val());
    });
    listDepartment();
});

/**
 * List Department in select 2
 */

function listDepartment() {
    let data = {
        "query": 'fetch',
        "databasename": 'department_master',
        "column": {
            "department_master_id": "department_master_id",
            "department_shortname": "department_shortname"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "#department_master_id", "param2": "department_shortname", "param3": "department_master_id" })
}

var button = `<div class="text-sm-right">
<button type="button" data-toggle="modal" data-target=".add" class="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2"><i class="mdi mdi-plus mr-1"></i> Add Branch </button>
</div>`;

function displayBranchListInit() {
    let data = { "list_key": "getBranch", "condition": { "branch_master.status": "1" } }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "displayBranchList", "param1": "table-branch-list" }, { "functionName": "displayBranchList", "param1": "table-branch-list" });
}

function displayBranchList(response, dataTableId) {
    var tableHeader = [{
        "data": "branch_master_id"
    }, {
        "data": "branch_name"
    }, {
        "data": "department_name"
    }, {
        "data": "branch_phone"
    }, {
        "data": "branch_address"
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
                     <a class="mr-3 text-info edit-row" title="Edit" data-toggle="modal" data-id="${row.branch_master_id}" data-target=".add"><i class="mdi mdi-pencil font-size-14"></i></a>
                    <a class="text-danger delete-row" title="Delete" data-toggle="modal" data-id="${row.branch_master_id}" data-target=".delete"><i class="mdi mdi-close font-size-14"></i></a>
                </td>`;
        }
    }];
    dataTableDisplay(response.result, tableHeader, false, dataTableId, button);
}

/**
 * To Add Branch
 */

$(document).on('click', '[data-target=".add"]', function() {
    $(".branch-add").removeAttr('data-id');
    $("#branch-add")[0].reset();
});

/**
 * To Edit Branch
 */

$(document).on('click', ".edit-row", function() {
    $(".branch-add").attr('data-id', $(this).attr('data-id'));
    $("#branch-add")[0].reset();
    let data = {
        "query": "fetch",
        "databasename": "branch_master",
        "column": {
            "*": "*"
        },
        'condition': {
            'branch_master_id': $(this).attr('data-id')
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
        'databasename': 'branch_master',
        'condition': {
            'branch_master_id': $(".btn-delete").attr('data-detete')
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

$('.branch-add').click(function() {
    if (checkRequired('#branch-add')) {
        var id = $(this).attr('data-id');
        if (isEmptyValue(id)) {
            // Add New
            var data = {
                "query": 'add',
                "databasename": 'branch_master',
                "values": $("#branch-add").serializeObject()
            }
            commonAjax('database.php', 'POST', data, '.add', 'Branch added successfully', '', { "functionName": "locationReload" })
            $("#table-branch-list").dataTable().fnDraw();
        } else {
            // Edit
            var data = {
                "query": 'update',
                "databasename": 'branch_master',
                "values": $("#branch-add").serializeObject(),
                "condition": {
                    "branch_master_id": id
                }
            }
            commonAjax('database.php', 'POST', data, '.add', 'Branch updated successfully', '', { "functionName": "locationReload" })
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