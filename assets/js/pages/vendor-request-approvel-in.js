$(document).ready(function() {
    displayVendorRequestListInit();
    listVendor();
    listBranch();
    listProduct();
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

/**
 * List Product in select 2
 */

function listProduct() {
    let data = {
        "query": 'fetch',
        "databasename": 'product_master',
        "column": {
            "product_code": "product_code",
            "product_name": "product_name"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "dataProduct" })
}

var productDataList = '<option value="">Select</option>';

function dataProduct(responce) {
    $.each(responce, function(i, v) {
        productDataList += `<option value='${v.product_code}'>${v.product_name}</option>`
    });
}

function displayVendorRequestListInit() {
    let data = {
        "list_key": "getRequest",
        "condition": { 'request_management.tracking_status': "5" }
    }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "displayVendorRequestList", "param1": "table-vendor-request-list" }, { "functionName": "displayVendorRequestList", "param1": "table-vendor-request-list" });
}

function displayVendorRequestList(response, dataTableId) {
    var tableHeader = [{
        "data": "bill_no"
    }, {
        "data": "created_at"
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
            if (data == '5')
                return `<span class="badge badge-pill badge-warning font-size-12">CEO Approval Pending</span>`;
            if (data == '3')
                return `<span class="badge badge-pill badge-warning font-size-12">Waiting For Stocks</span>`;
            if (data == '6')
                return `<span class="badge badge-pill badge-warning font-size-12">Partial Pending</span>`;
            else
                return `<span class="badge badge-pill badge-success font-size-12">Order recived</span>`;
        }
    }, /* EDIT */ /* DELETE */ {
        "data": "created_at",
        mRender: function(data, type, row) {
            return `<td class="text-right">
                        <a class="mr-3 text-success edit-row" title="Check Approve"  data-toggle="modal" data-target=".add"  data-id="${row.request_code}"><i class="mdi mdi-check-decagram font-size-18"></i></a>
                        <a class="text-danger" title="Delete" data-toggle="modal" data-target=".delete"  data-id="${row.request_code}"><i class="mdi mdi-close font-size-18"></i></a>                
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
    totalVendorCalculation();
});
/**
 * To Edit VendorRequest
 */

$(document).on('click', ".edit-row", function() {
    $(".employee-add").attr('data-id', $(this).attr('data-id'));
    let data = {
        "list_key": "getRequest",
        "request_branch_id_from": JSON.parse(sessionStorage.getItem("employee")).result[0].branch_id,
        "condition": { 'request_management.request_code': $(this).attr('data-id') }
    }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "VendorRequestSetValue" });
});

/***
 * VendorRequest Set Value
 */

function VendorRequestSetValue(response) {
    $(".remove-row").remove();
    multipleSetValue(response.result);
    if (response.result[0].request_product_details) {
        let requestProductDetails = JSON.parse(response.result[0].request_product_details);
        $.each(requestProductDetails, function(index, value) {
            $('#button-add-item').trigger('click');
            $.each(value, function(i, v) {
                $('#request-vendor-list tbody tr:nth-child(' + (index + 1) + ') [name="' + i + '"]').val(v);
            });
        })
    }
    $(".vendor-full-total").html(response.result[0].product_total);
    $(".remarks-past").html("<b> Remarks: </b> " + response.result[0].remarks);
    $('[name="remarks"]').val(" ");
}


/**
 * Add Leave Master
 */

$('.vendor-request-add').click(function() {
    if (checkRequired('#add-vendor-request')) {
        var id = $(this).attr('data-id');
        if (isEmptyValue(id)) {
            // Add New
            var data = {
                "list_key": "createrequest",
                "vendor_id": $("[name='vendor_id']").val(),
                "request_code": $("[name='request_code']").val(),
                "tracking_status": "3",
                "employee_id": JSON.parse(sessionStorage.getItem("employee")).result[0].login_username,
                "remarks": $("[name='remarks']").val(),
                "product_total": $(".vendor-full-total").html(),
                "request_product_details": JSON.stringify(tableRowTOArrayOfObjects('#request-vendor-list tbody tr:not(#addItem)'))
            }
            console.log(JSON.stringify(data));
            commonAjax('', 'POST', data, '.add', 'Vendor Request Approved successfully', '', { "functionName": "locationReload" })
        }
    }
});


$(document).on('keyup keypress', '[name="quantity"], [name="cost"]', function() {
    totalVendorCalculation();
});

function totalVendorCalculation() {
    let t = 0
    $("#request-vendor-list tbody tr:not(#addItem)").each(function() {
        let q = $(this).find('[name="quantity"]').val();
        let c = $(this).find('[name="cost"]').val();
        let qc = 0;
        if (q && c)
            qc = q * c;
        $(this).find('[name="total"]').val(qc);
        t += qc;
    });
    $(".vendor-full-total").html(t);

}

/**
 * To delete a row
 */

$(document).on('click', '.btn-outline-danger', function() {
    if ($(this).closest('table').find("#button-add-item").attr('count') != '1') {
        $(this).closest('tr').remove();
        $(this).closest('table').find("#button-add-item").attr('count', parseInt($(this).closest('table').find("#button-add-item").attr('count')) - 1);
    }
});