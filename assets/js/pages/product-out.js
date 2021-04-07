$(document).ready(function() {
    displayProductInListInit();
    listBranch();
    $("[name='request_mode']").select2({ 'disabled': 'readonly' });
});

var button = ``;

if (userSession.employee_designation_id == '4') {
    if (userSession.department_id == '4')
        button = `<div class="text-sm-right">
                <button type="button" data-toggle="modal" data-target=".damage" class="btn btn-danger btn-rounded waves-effect waves-light mb-2 mr-2 clear-list"><i class="mdi mdi-plus mr-1"></i> Add Stock Clear </button>
            </div>`;
}

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
        "condition": { 'request_management.damage_images': "" },
        "condition_in": { 'request_management.tracking_status': "11,3,4,6,7,9", 'request_management.vendor_id': "0", 'request_management.request_branch_id_to': userSession.branch_id }
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
            }
            if (row.tracking_status == '11' && userSession.employee_designation_id == '3') {
                return `<td class="text-right">
                        <a class="mr-3 text-success clear-row" data-toggle="modal" data-target=".damage"  title="Check Approve" data-id="${row.request_code}"><i class="mdi mdi-check-decagram font-size-18"></i></a>       
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

$(document).on('click', ".clear-row", function() {
    let data = {
        "list_key": "getRequest",
        "condition": { 'request_management.request_code': $(this).attr('data-id') }
    }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "ProductInSetValue" });
});

/***
 * ProductRequest Set Value
 */

function ProductInSetValue(response) {
    $(".remove-row").remove();
    multipleSetValue(response.result);
    if (response.result[0].request_product_details) {
        let requestProductDetails = JSON.parse(response.result[0].request_product_details);
        $.each(requestProductDetails, function(index, value) {
            $('#product-clear-table #button-add-item').trigger('click');
            $.each(value, function(i, v) {
                $('#product-clear-table tbody tr:nth-child(' + (index + 1) + ') [name="' + i + '"]').val(v).trigger("change");
            });
        })
    }

    $('#product-clear-table .select2').select2({ "disabled": "readonly" })

    $(".past-remarks").html("Last Remarks : " + response.result[0].remarks);
    $("[name='remarks']").val(" ");
}


/**
 * To Add Product Out Request
 */

$(document).on('click', '.clear-list', function() {
    $(".product-clear-add").removeAttr('data-id');
    $('#product-clear-add')[0].reset();
    $(".remove-row").remove();
    let data = { "list_key": "getBillingavalablity", "branch_id": userSession.branch_id };
    commonAjax('', 'POST', data, '', '', '', { "functionName": "ProductRequestSetValue" });
});

/***
 * ProductRequest Set Value
 */

function ProductRequestSetValue(response) {
    if (response.result[0].available_quantity) {
        let requestProductDetails = response.result;
        $.each(requestProductDetails, function(index, value) {
            if (value.available_quantity) {
                $('#button-add-item').trigger('click');
                $('tbody tr:nth-child(' + (index + 1) + ') [name="product_code"]').val(value.product_code).select2({ "disabled": "readonly" }).trigger("change");
                $('tbody tr:nth-child(' + (index + 1) + ') [name="quantity"]').val(value.available_quantity);
                $('tbody tr:nth-child(' + (index + 1) + ') [name="costperkg"]').val(value.price);
            }
        })
    }
    $(".past-remarks").html("Last Remarks : " + response.result[0].remarks);
    $("[name='remarks']").val(" ");
    calculateRow();
}

function calculateRow() {
    let total = 0;
    $(".remove-row").each(function() {
        let rowTotal = Number($(this).find('[name="quantity"]').val()) * Number($(this).find('[name="costperkg"]').val())
        $(this).find('[name="total"]').val((rowTotal));
        total += rowTotal;
    });
    $('[name="product-total"]').val(total);
}

$(document).on('keyup', 'input', function() {
    calculateRow();
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
    <td> <input type="number" name="costperkg" class="form-control text-right" required readonly> </td>
    <td> <input type="number" name="total" class="form-control text-right" required readonly> </td>
    <input type="hidden" name="status" value="1" class="form-control text-right" > </td></tr>
`);
    $('[name="product_code"]').select2();
    calculateRow();
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



/**
 * Add to Product
 */

$('.product-clear-add').click(function() {
    if (checkRequired('#product-clear-add')) {
        $(".product-clear-add").prop('disabled', true);
        var data = {
            "list_key": "createrequestsame",
            "request_code": $("[name='request_code']").val(),
            "tracking_status": (userSession.employee_designation_id == '3') ? "9" : "11",
            "request_branch_id_from": userSession.branch_id,
            "request_branch_id_to": userSession.branch_id,
            "department_id": userSession.department_id,
            "employee_id": userSession.login_username,
            "remarks": $("[name='remarks']").val(),
            "request_product_details": JSON.stringify(tableRowTOArrayOfObjects('#product-clear-table tbody tr:not(.not-include)'))
        }
        commonAjax('', 'POST', data, '.add', 'Cleared Product Request Approved', '', { "functionName": "locationReload" })
        $(".product-clear-add").prop('disabled', false);
    }
});



/**
 * To Edit ProductIn
 */

$(document).on('click', ".edit-row", function() {
    let data = {
        "list_key": "getRequest",
        "condition": { 'request_management.request_code': $(this).attr('data-id') }
    }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "ProductInSetValues" });
});

/***
 * ProductIn Set Value
 */

function ProductInSetValues(response) {
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
});

/**
 * Add to Product
 */

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