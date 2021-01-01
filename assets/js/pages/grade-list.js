$(document).ready(function() {

});


displayGradeListInit()

function displayGradeListInit() {
    let data = {
        "query": "fetch",
        "databasename": "employee_grade",
        "column": {
            "*": "*"
        },
        "condition": "",
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "displayGradeList", "param1": "table-expenses-list" });
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
                return `<span class="badge badge-pill badge-success">Active</span>`;
            else
                return `<span class="badge badge-pill badge-danger">In Active</span>`;
        }
    }, /* EDIT */ /* DELETE */ {
        "data": "status",
        mRender: function(data, type, row) {
            return `<td class="text-right">
                    <a href="expenses-add.html?id=${row.expenses_id}" class="btn btn-icon btn-hover btn-sm btn-rounded pull-right">
                        <i class="anticon anticon-edit text-primary"></i>
                    </a>
                    <button class="btn btn-icon btn-hover btn-sm btn-rounded btn-delete-table" data-delete="${row.expenses_id}" data-toggle="modal" data-target="#delete">
                        <i class="anticon anticon-delete text-danger"></i>
                    </button>
                </td>`;
        }
    }];
    dataTableDisplay(response.result, tableHeader, false, dataTableId)
}

$(document).on('click', ".btn-delete", function() {
    var data = {
        'query': 'update',
        'databasename': 'expenses_master',
        'condition': {
            'expenses_id': $(".btn-delete").attr('data-detete')
        },
        'values': {
            'status': '0'
        }
    }
    $("#delete").modal('hide');
    commonAjax('database.php', 'POST', data, '', 'Record Deleted Sucessfully', '', { "functionName": "locationReload" })

})

/**
 * Add Leave Master
 */

$('.grade-add').click(function() {
    if (checkRequired('#grade-add')) {
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");
        if (isEmptyValue(id)) {
            // Add New
            var data = {
                "query": 'add',
                "databasename": 'employee_grade',
                "values": $("#grade-add").serializeObject()
            }
            commonAjax('database.php', 'POST', data, '.add', 'Grade added successfully');
        } else {
            // Edit
            var data = {
                "query": 'update',
                "databasename": 'employee_grade',
                "values": $("#grade-add").serializeObject(),
                "condition": {
                    "grade_id": id
                }
            }
            commonAjax('database.php', 'POST', data, '.add', 'Grade updated successfully');
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