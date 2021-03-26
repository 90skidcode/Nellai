$(document).ready(function() {
    displayProductInListInit();
    listBranch();
    $("[name='request_mode']").select2({ 'disabled': 'readonly' });
});

var button = ``;


/**
 * List Branch in select 2
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
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "[name='request_branch_id_from']", "param2": "branch_name", "param3": "branch_master_id" })
    $("[name='request_branch_id_to']").select2({ 'disabled': 'readonly' });
}



function displayProductInListInit() {
    let data = {
        "list_key": "getRequest",
        "condition_in": { 'request_management.tracking_status': "3,4,6,7", 'request_management.vendor_id': "0", 'request_management.request_branch_id_to': userSession.branch_id }
    }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "displayProductInList", "param1": "product-in-list" }, { "functionName": "displayProductInList", "param1": "product-in-list" });
}

function displayProductInList(response, dataTableId) {
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
            if (row.tracking_status == '3') {
                return `<td class="text-right">
                        <a class="mr-3 text-success edit-row" title="Check Approve"  data-toggle="modal" data-target=".add"  data-id="${row.request_code}"><i class="mdi mdi-check-decagram font-size-18"></i></a>       
                        <a class="mr-3 text-success info-row" title="Info" data-toggle="modal" data-id="${row.request_code}" data-target=".info"><i class="mdi mdi-comment-alert-outline font-size-18"></i></a>
                        </td>`;
            } else
                return `<td class="text-right"><a class="mr-3 text-success info-row" title="Info" data-toggle="modal" data-id="${row.request_code}" data-target=".info"><i class="mdi mdi-comment-alert-outline font-size-18"></i></a>
            </td>`;
        }
    }];
    dataTableDisplay(response.result, tableHeader, false, dataTableId, button);
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

/**
 * To Edit ProductIn
 */

$(document).on('click', ".edit-row", function() {
    let data = {
        "list_key": "getRequest",
        "condition": { 'request_management.request_code': $(this).attr('data-id') }
    }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "ProductInSetValue" });
});

/***
 * ProductIn Set Value
 */

function ProductInSetValue(response) {
    multipleSetValue(response.result);
    if (response.result[0].request_product_details) {
        let requestProductDetails = JSON.parse(response.result[0].request_product_details);
        $(".remove-row").remove();
        $.each(requestProductDetails, function(index, value) {
            var bg = '';
            if (value.status == '2')
                bg = 'bg-soft-success'
            $('#product-in').find('#addItem').before(`<tr class="remove-row ${bg}">
                       
                        <td scope="row">
                            <select name="product_code" class="form-control select2">${productDataList}</select>
                        </td>
                        <td> <input type="number" name="quantity" class="form-control text-right" required readonly> </td>
                        <td> <input type="number" name="cost" class="form-control text-right" required readonly> </td>
                        <td> <input type="number" name="total" class="form-control text-right" readonly>
                        <input type="hidden" name="status" value="2" >
                        </td></tr>
                    `);
            $.each(value, function(i, v) {
                $('#product-in tbody tr:nth-child(' + (index + 1) + ') [name="' + i + '"]').val(v);
            });
            $('.select2').select2({ 'disabled': 'readonly' });
        });
        $(".remarks-past").html("<b> Remarks: </b> " + response.result[0].remarks);
        $(".vendor-full-total").html(numberWithCommas(response.result[0].product_total));
        $('[name="remarks"]').val(" ");
    }
}

$(document).on('click', '[name="status"]', function() {
    ($(this).prop("checked")) ? $(this).val(2): $(this).val(1);
})

/**
 * Add to Product
 */

$('.product-in-add').click(function() {
    $('.product-in-add').click(function() {
        if (checkRequired('#add-product-in')) {
            var id = $(this).attr('data-id');
            if (isEmptyValue(id)) {
                // Add New
                var data = {
                    "list_key": "createrequest",
                    "vendor_id": $("[name='vendor_id']").val(),
                    "request_code": $("[name='request_code']").val(),
                    "tracking_status": 7,
                    "employee_id": userSession.login_username,
                    "remarks": $("[name='remarks']").val(),
                    "product_total": $(".vendor-full-total").html(),
                    "request_product_details": JSON.stringify(tableRowTOArrayOfObjects('#product-in tbody tr:not(#addItem)'))
                }
                commonAjax('', 'POST', data, '.add', 'Product In successfully', '', { "functionName": "locationReload" })
            }
        }
    });
})