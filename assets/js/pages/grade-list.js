$(document).ready(function() {

    displayGradeListInit();
});

var button = `<div class="text-sm-right">
<button type="button" data-toggle="modal" data-target=".add" class="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2"><i class="mdi mdi-plus mr-1"></i> Add Grade </button>
</div>`;

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
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "displayGradeList", "param1": "table-grade-list" });
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
    $("#grade-add")[0].reset();
});

/**
 * To Edit Grade
 */

$(document).on('click', ".edit-row", function() {
    $(".grade-add").attr('data-id', $(this).attr('data-id'));
    $("#grade-add")[0].reset();
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
 * Add Leave Master
 */

$('.grade-add').click(function() {
    if (checkRequired('#grade-add')) {
        var id = $(this).attr('data-id');
        if (isEmptyValue(id)) {
            // Add New
            var data = {
                "query": 'add',
                "databasename": 'employee_grade',
                "values": $("#grade-add").serializeObject()
            }
            commonAjax('database.php', 'POST', data, '.add', 'Grade added successfully', '', { "functionName": "locationReload" })
            $("#table-grade-list").dataTable().fnDraw();
        } else {
            // Edit
            var data = {
                "query": 'update',
                "databasename": 'employee_grade',
                "values": $("#grade-add").serializeObject(),
                "condition": {
                    "employee_grade_id": id
                }
            }
            commonAjax('database.php', 'POST', data, '.add', 'Grade updated successfully', '', { "functionName": "locationReload" })
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