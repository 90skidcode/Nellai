$(document).ready(function() {
    listBranch();
    listProduct();
    displayPulverizingRequestListInit();
});

if (sessionStorage.getItem("employee"))
    userSession = JSON.parse(sessionStorage.getItem("employee")).result[0];

var button = ``;

if (userSession.employee_designation_id == '4') {
    button = ` <div class="text-sm-right">
    <button type="button" data-toggle="modal" data-target=".add" class="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2"><i class="mdi mdi-plus mr-1"></i> Add Pulverizing Request IN </button>
    <button type="button" data-toggle="modal" data-target=".add-in" class="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2"><i class="mdi mdi-plus mr-1"></i> Add Product Request IN </button>
               </div>`;
}

/**
 * List Pulverizing in select 2
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
        productDataList += `<option value='${v.product_code}'>${v.product_code} - ${v.product_name}</option>`
    });
    $('[name="item_code"]').html(productDataList);
}



function displayPulverizingRequestListInit() {
    let data = {
        "list_key": "getRequest",
        "condition": {
            "request_branch_id_from": userSession.branch_id
        }
    }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "displayPulverizingRequestList", "param1": "table-pulverizing-list" }, { "functionName": "displayPulverizingRequestList", "param1": "table-pulverizing-list" });
}

function displayPulverizingRequestList(response, dataTableId) {
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
            if (row.tracking_status == '1' && JSON.parse(sessionStorage.getItem('employee')).result[0].employee_designation_id == '3' && !row.item_code) {
                return `<td class="text-right">
                        <a class="mr-3 text-info edit-row" title="Edit" data-toggle="modal" data-target=".add"  data-id="${row.request_code}"><i class="mdi mdi-pencil font-size-18"></i></a>
                        <a class="text-danger" title="Delete" data-toggle="modal" data-target=".delete"  data-id="${row.request_code}"><i class="mdi mdi-close font-size-18"></i></a>                
                    </td>`;
            }
            if (row.tracking_status == '1' && JSON.parse(sessionStorage.getItem('employee')).result[0].employee_designation_id == '3' && row.item_code) {
                return `<td class="text-right">
                        <a class="mr-3 text-info self-approve-row" title="Edit" data-toggle="modal" data-target=".add-in"  data-id="${row.request_code}"><i class="mdi mdi-pencil font-size-18"></i></a>
                        <a class="text-danger" title="Delete" data-toggle="modal" data-target=".delete"  data-id="${row.request_code}"><i class="mdi mdi-close font-size-18"></i></a>                
                    </td>`;
            }
            if (row.tracking_status == '7') {
                return `<td class="text-right">
                <a class="mr-3 text-info approve-row" title="Approve" data-toggle="modal" data-target=".approve"  data-id="${row.request_code}"><i class="mdi mdi-check-decagram font-size-18"></i></a>
            </td>`;
            } else
                return ``;
        }
    }];
    dataTableDisplay(response.result, tableHeader, false, dataTableId, button);
}

/**
 * To Add PulverizingRequest
 */

$(document).on('click', '[data-target=".add"]', function() {
    $(".pulverizing-add").removeAttr('data-id');
    $("#add-pulverizing")[0].reset();
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
    <input type="hidden" name="status" value="1" class="form-control text-right" > </td></tr>
`);
    $('[name="product_code"]').select2();
});

/**
 * To Edit PulverizingRequest
 */

$(document).on('click', ".edit-row", function() {
    $(".employee-add").attr('data-id', $(this).attr('data-id'));
    let data = {
        "list_key": "getRequest",
        "condition": { 'request_management.request_code': $(this).attr('data-id'), "request_branch_id_from": userSession.branch_id }
    }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "PulverizingRequestSetValue" });
});

/***
 * PulverizingRequest Set Value
 */

function PulverizingRequestSetValue(response) {
    $(".remove-row").remove();
    multipleSetValue(response.result);
    if (response.result[0].request_product_details) {
        let requestProductDetails = JSON.parse(response.result[0].request_product_details);
        $.each(requestProductDetails, function(index, value) {
            $('#request-vendor-list #button-add-item').trigger('click');
            $.each(value, function(i, v) {
                $('#request-vendor-list tbody tr:nth-child(' + (index + 1) + ') [name="' + i + '"]').val(v).trigger("change");
            });
        })
    }
}


/**
 * Add Pulverizing Master
 */

$('.pulverizing-add').click(function() {
    if (checkRequired('#add-pulverizing')) {
        var id = $(this).attr('data-id');
        if (isEmptyValue(id)) {
            // Add New
            var data = {
                "list_key": "createrequest",
                "request_code": $("#add-pulverizing [name='request_code']").val(),
                "tracking_status": (JSON.parse(sessionStorage.getItem('employee')).result[0].employee_designation_id) ? "2" : "1",
                "request_branch_id_from": userSession.branch_id,
                "request_branch_id_to": $("#add-pulverizing [name='request_branch_id_to']").val(),
                "department_id": userSession.department_id,
                "employee_id": userSession.login_username,
                "remarks": $("#add-pulverizing [name='remarks']").val(),
                "request_product_details": JSON.stringify(tableRowTOArrayOfObjects('#request-vendor-list tbody tr:not(#addItem)'))
            }
            commonAjax('', 'POST', data, '.add', 'Pulverizing Request added successfully', '', { "functionName": "locationReload" })
        }
    }
});


$(document).on('keyup', '[name="quantity"], [name="cost"]', function() {
    totalPulverizingCalculation();
});

function totalPulverizingCalculation() {
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


/**
 * To Approve Pulverizing Request
 */

$(document).on('click', ".approve-row", function() {
    $(".store-in-approve").attr('data-id', $(this).attr('data-id'));
    let data = {
        "list_key": "getRequest",
        "condition": { 'request_management.request_code': $(this).attr('data-id'), "request_branch_id_from": userSession.branch_id }
    }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "StoreInApproveSetValue" });
});

/***
 * StoreIn Set Value
 */

function StoreInApproveSetValue(response) {
    multipleSetValue(response.result);
    if (response.result[0].request_product_details) {
        let requestProductDetails = JSON.parse(response.result[0].request_product_details);
        $(".remove-row").remove();
        $.each(requestProductDetails, function(index, value) {
            $('#approve-store-in').find('#addItem').before(`<tr class="remove-row">                       
                <td scope="row">
                    <select name="product_code" class="form-control select2">${productDataList}</select>
                </td>
                <td> <input type="number" name="quantity" class="form-control text-right" required readonly> </td>
                <td> <input type="number" name="cost" class="form-control text-right" required readonly> </td>
                <td> <input type="number" name="total" class="form-control text-right" readonly>
                
                </td>
                <td class="d-none"><input type="hidden" name="status" class="form-control" value="2" ></td></tr>
            `);
            $.each(value, function(i, v) {
                $('#approve-store-in tbody tr:nth-child(' + (index + 1) + ') [name="' + i + '"]').val(v);
            });
        });
        $(".approve-remarks-past").html("<b> Remarks: </b> " + response.result[0].remarks);
        $(".approve-vendor-full-total").html(numberWithCommas(response.result[0].product_total));
        $('[name="remarks"]').val(" ");
        $('.select2').select2({ 'disabled': 'readonly' });
    }
}

/**
 * Add Pulverizing Master
 */

$('.store-in-approve').click(function() {
    if (checkRequired('#approve-vendor-request')) {
        var data = {
            "list_key": "createrequest",
            "request_code": $("#approve-vendor-request [name='request_code']").val(),
            "tracking_status": "4",
            "request_branch_id_to": $("#approve-vendor-request [name='request_branch_id_to']").val(),
            "employee_id": userSession.login_username,
            "remarks": $("#approve-vendor-request [name='remarks']").val(),
            "request_product_details": JSON.stringify(tableRowTOArrayOfObjects('#approve-store-in tbody tr:not(#addItem)'))
        }
        commonAjax('', 'POST', data, '.add', 'Pulverizing Request added successfully', '', { "functionName": "locationReload" })
    }
});

/**
 * Add Product With IN
 */

$(document).on('click', ".self-approve-row", function() {
    let data = {
        "list_key": "getRequest",
        "condition": { 'request_management.request_code': $(this).attr('data-id'), "request_branch_id_from": userSession.branch_id }
    }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "pulverizingApproveSetValue" });
});

/***
 * PulverizingRequest Set Value
 */

function pulverizingApproveSetValue(response) {
    $(".remove-row").remove();
    multipleSetValue(response.result);
    if (response.result[0].request_product_details) {
        let requestProductDetails = JSON.parse(response.result[0].request_product_details);
        $.each(requestProductDetails, function(index, value) {
            $('#add-within-pulverizing-list #button-add-item').trigger('click');
            $.each(value, function(i, v) {
                $('#add-within-pulverizing-list tbody tr:nth-child(' + (index + 1) + ') [name="' + i + '"]').val(v).trigger("change");
            });
        })
    }
}


/**
 * Add Pulverizing Master
 */

$('.add-within-pulverizing').click(function() {
    if (checkRequired('#add-within-pulverizing')) {
        var data = {
            "list_key": "createrequestsame",
            "request_code": $("#add-within-pulverizing [name='request_code']").val(),
            "item_code": $("#add-within-pulverizing [name='item_code']").val(),
            "item_quantity": $("#add-within-pulverizing [name='item_quantity']").val(),
            "tracking_status": (userSession.employee_designation_id == '3') ? "4" : "1",
            "request_branch_id_from": userSession.branch_id,
            "request_branch_id_to": userSession.branch_id,
            "department_id": userSession.department_id,
            "employee_id": userSession.login_username,
            "remarks": $("#add-within-pulverizing [name='remarks']").val(),
            "request_product_details": JSON.stringify(tableRowTOArrayOfObjects('#add-within-pulverizing-list tbody tr:not(#addItem)'))
        }
        commonAjax('', 'POST', data, '.add', 'Pulverizing Request added successfully', '', { "functionName": "locationReload" })
    }
});