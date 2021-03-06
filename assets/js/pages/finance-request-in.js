$(document).ready(function() {
    listFinance();
    listBranch();
    displayFinanceRequestListInit();
});

var button = ``;

/**
 * List Finance in select 2
 */

function listFinance() {
    let data = {
        "query": 'fetch',
        "databasename": 'finance_master',
        "column": {
            "finance_master_id": "finance_master_id",
            "finance_name": "finance_name"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "[name='finance_id']", "param2": "finance_name", "param3": "finance_master_id" });
}


/**
 * List Finance in select 2
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
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "[name='request_branch_id_to']", "param2": "branch_name", "param3": "branch_master_id" })
}


function displayFinanceRequestListInit() {
    let data = {
        "list_key": "getRequest",
        "condition_in": { 'request_management.tracking_status': "2,3,4,7", 'request_management.vendor_id': 0 }
    }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "displayFinanceRequestList", "param1": "table-finance-request-list" }, { "functionName": "displayFinanceRequestList", "param1": "table-finance-request-list" });
}

function displayFinanceRequestList(response, dataTableId) {
    var tableHeader = [{
        "data": "bill_no"
    }, {
        "data": "created_at",
        mRender: function(data, type, row) {
            return formatDate(data);
        }
    }, {
        "data": "product_total",
        mRender: function(data, type, row) {
            return numberWithCommas(data);
        }
    }, {
        "data": "tracking_status",
        mRender: function(data, type, row) {
            return trackingStatus(data);
        }
    }, /* EDIT */ /* DELETE */ {
        "data": "created_at",
        mRender: function(data, type, row) {
            if (row.tracking_status == '2')
                return `<td class="text-right">
                        <a class="mr-3 text-info edit-row" title="Edit" data-toggle="modal" data-target=".add"  data-id="${row.request_code}"><i class="mdi mdi-pencil font-size-18"></i></a>
                        <a class="text-danger mr-3" title="Delete" data-toggle="modal" data-target=".delete"  data-id="${row.request_code}"><i class="mdi mdi-close font-size-18"></i></a>                
                        <a class="mr-3 text-success info-row" title="Info" data-toggle="modal" data-id="${row.request_code}" data-target=".info"><i class="mdi mdi-comment-alert-outline font-size-18"></i></a>
            
                        </td>`;
            else
                return `<td class="text-right"><a class="mr-3 text-success info-row" title="Info" data-toggle="modal" data-id="${row.request_code}" data-target=".info"><i class="mdi mdi-comment-alert-outline font-size-18"></i></a>
            </td>`;
        }
    }];
    dataTableDisplay(response.result, tableHeader, false, dataTableId, button);
}

/**
 * To Add FinanceRequest
 */

$(document).on('click', '[data-target=".add"]', function() {
    $(".finance-request-add").removeAttr('data-id');
    $("#add-finance-request")[0].reset();
    $(".remove-row").remove();
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
        'databasename': 'employee_qualification',
        'condition': {
            'employee_qualification_id': $(".btn-delete").attr('data-detete')
        },
        'values': {
            'status': '0'
        }
    }
    $("#delete").modal('hide');
    commonAjax('database.php', 'POST', data, '', 'Record Deleted Sucessfully', '', { "functionName": "locationReload" })
});


$(document).on('click', '#button-add-item', function() {
    let c = $(this).attr('count');
    $(this).attr('count', parseInt($(this).attr('count')) + 1);
    $(this).closest('table').find('#addItem').before(`<tr class="remove-row">
    <td class="text-center"><button type="button" title="Reject" class="btn btn-icon btn-outline-danger btn-lg">
    <i class="fa fa-trash"></i>
        </button></td>
    <td scope="row">
        <select name="product_code" class="form-control select2" required>${productDataList}</select>
    </td>
    <td> <input type="number" name="quantity" class="form-control text-right" required> </td>
    <td> <input type="number" name="cost" class="form-control text-right" required> </td>
    <td> <input type="number" name="total" class="form-control text-right" readonly>
    <input type="hidden" name="status" value="1" class="form-control text-right" > </td></tr>
`);
    totalFinanceCalculation();
});

/**
 * To Edit FinanceRequest
 */

$(document).on('click', ".edit-row", function() {
    $(".employee-add").attr('data-id', $(this).attr('data-id'));
    let data = {
        "list_key": "getRequest",
        "condition": { 'request_management.request_code': $(this).attr('data-id') }
    }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "FinanceRequestSetValue" });
});

/***
 * FinanceRequest Set Value
 */

function FinanceRequestSetValue(response) {
    $(".remove-row").remove();
    multipleSetValue(response.result);
    if (response.result[0].request_product_details) {
        let requestProductDetails = JSON.parse(response.result[0].request_product_details);
        $.each(requestProductDetails, function(index, value) {
            $('#button-add-item').trigger('click');
            $.each(value, function(i, v) {
                $('#request-finance-list tbody tr:nth-child(' + (index + 1) + ') [name="' + i + '"]').val(v);
            });
        })
    }
    $(".remarks-past").html("<b> Remarks: </b> " + response.result[0].remarks);
    $('[name="remarks"]').val(" ");
    $(".finance-full-total").html(numberWithCommas(response.result[0].product_total));
}


/**
 * Add Leave Master
 */

$('.finance-request-add').click(function() {
    if (checkRequired('#add-finance-request')) {
        var id = $(this).attr('data-id');
        if (isEmptyValue(id)) {
            // Add New
            var data = {
                "list_key": "createrequest",
                "request_code": $("[name='request_code']").val(),
                "tracking_status": "3",
                "request_branch_id_to": $("[name='request_branch_id_to']").val(),
                "employee_id": userSession.login_username,
                "remarks": $("[name='remarks']").val(),
                "product_total": removeCommas($(".finance-full-total").html()),
                "request_product_details": JSON.stringify(tableRowTOArrayOfObjects('#request-finance-list tbody tr:not(#addItem)'))
            }
            commonAjax('', 'POST', data, '.add', 'Finance Request added successfully', '', { "functionName": "locationReload" })
        }
    }
});


$(document).on('keyup keypress blur', '[name="quantity"], [name="cost"]', function() {
    totalFinanceCalculation();
});

function totalFinanceCalculation() {
    let t = 0
    $("#request-finance-list tbody tr:not(#addItem)").each(function() {
        let q = $(this).find('[name="quantity"]').val();
        let c = $(this).find('[name="cost"]').val();
        let qc = 0;
        if (q && c)
            qc = q * c;
        $(this).find('[name="total"]').val(qc);
        t += qc;
    });
    $(".finance-full-total").html(numberWithCommas(t));

}

/**
 * To delete a row
 */

$(document).on('click', '.btn-outline-danger', function() {
    if ($(this).closest('table').find("#button-add-item").attr('count') != '1') {
        $(this).closest('tr').remove();
        $(this).closest('table').find("#button-add-item").attr('count', parseInt($(this).closest('table').find("#button-add-item").attr('count')) - 1);
    }
    totalFinanceCalculation();
});