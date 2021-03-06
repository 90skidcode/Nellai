$(document).ready(function() {
    displayStoreInListInit();
    listVendor();
    listBranch();
    $("[name='request_mode']").select2({ 'disabled': 'readonly' });
});

var button = ``;

/**
 * List Vendor in select 2
 */

function listVendor() {
    let data = {
        "query": 'fetch',
        "databasename": 'vendor_master',
        "column": {
            "vendor_master_id": "vendor_master_id",
            "vendor_name": "vendor_name"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "[name='vendor_id']", "param2": "vendor_name", "param3": "vendor_master_id" });
    $("[name='vendor_id']").select2({ 'disabled': 'readonly' });
}


/**
 * List Vendor in select 2
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
            "department_master_id": "1",
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "[name='request_branch_id_to']", "param2": "branch_name", "param3": "branch_master_id" })
    $("[name='request_branch_id_to']").select2({ 'disabled': 'readonly' });
}


function displayStoreInListInit() {
    let data = {
        "list_key": "getRequest",
        "condition_in": { 'request_management.tracking_status': "3,4,6", 'request_management.request_branch_id_to': userSession.branch_id },
        "condition_not_in": { 'request_management.vendor_id': "0" }
    }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "displayStoreInList", "param1": "store-in-list" }, { "functionName": "displayStoreInList", "param1": "store-in-list" });
}

function displayStoreInList(response, dataTableId) {
    var tableHeader = [{
        "data": "bill_no"
    }, {
        "data": "created_at",
        mRender: function(data, type, row) {
            return formatDate(data);
        }
    }, {
        "data": "vendor_name"
    }, {
        "data": "product_total",
        mRender: function(data, type, row) {
            return numberWithCommas(data);
        }
    }, {
        "data": "request_mode"
    }, {
        "data": "tracking_status",
        mRender: function(data, type, row) {
            return trackingStatus(data);
        }
    }, /* EDIT */ /* DELETE */ {
        "data": "created_at",
        mRender: function(data, type, row) {
            if (row.tracking_status != '4') {
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
 * To Edit StoreIn
 */

$(document).on('click', ".edit-row", function() {
    let data = {
        "list_key": "getRequest",
        "condition": { 'request_management.request_code': $(this).attr('data-id') }
    }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "StoreInSetValue" });
});

/***
 * StoreIn Set Value
 */

function StoreInSetValue(response) {
    multipleSetValue(response.result);
    if (response.result[0].request_product_details) {
        let requestProductDetails = JSON.parse(response.result[0].request_product_details);
        $(".remove-row").remove();
        $.each(requestProductDetails, function(index, value) {
            var bg = '';
            if (value.status == '2')
                bg = 'bg-soft-success'
            $('#store-in').find('#addItem').before(`<tr class="remove-row ${bg}">
                        <td scope="row">
                            <input type="checkbox" name="status"  class="form-control text-right" >
                        </td>
                        <td scope="row">
                            <select name="product_code" class="form-control select2">${productDataList}</select>
                        </td>
                        <td> <input type="number" name="quantity" class="form-control text-right" required readonly> </td>
                        <td> <input type="number" name="cost" class="form-control text-right" required readonly> </td>
                        <td> <input type="number" name="total" class="form-control text-right" readonly>
                        </td></tr>
                    `);
            $.each(value, function(i, v) {
                $('#store-in tbody tr:nth-child(' + (index + 1) + ') [name="' + i + '"]').val(v);
            });
            $('[name="status"][value="2"]').prop('checked', true);
            $('[name="status"][value="2"]').attr({ 'readonly': true, tabIndex: "-1" });
            $('[name="product_code"]').select2({ 'disabled': 'readonly' });
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
 * Add to Store
 */

$('.store-in-add').click(function() {
    if (checkRequired('#add-store-in')) {
        var id = $(this).attr('data-id');
        let tracking_status = 4;
        $('#store-in tbody [name="status"]').each(function() {
            if ($(this).val() == '1')
                tracking_status = 6;
        });
        if (isEmptyValue(id)) {
            // Add New
            var data = {
                "list_key": "createrequest",
                "vendor_id": $("[name='vendor_id']").val(),
                "request_code": $("[name='request_code']").val(),
                "tracking_status": tracking_status,
                "employee_id": userSession.login_username,
                "remarks": $("[name='remarks']").val(),
                "product_total": $(".vendor-full-total").html(),
                "request_product_details": JSON.stringify(tableRowTOArrayOfObjects('#store-in tbody tr:not(#addItem)'))
            }
            commonAjax('', 'POST', data, '.add', 'Store In successfully', '', { "functionName": "locationReload" })
        }
    }
});