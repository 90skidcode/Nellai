$(document).ready(function() {
    $(".select2").select2();
    listCountry();
    listState($('#country').val());
    $('#country').select2().on('change', function() {
        listState($(this).val());
    })
    $('#state').select2().on('change', function() {
        listCity($(this).val());
    });
    displayVendorListInit();
});

var button = `<div class="text-sm-right">
                    <button type="button" data-toggle="modal" data-target=".add" class="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2 btn-add-vendor"><i class="mdi mdi-plus mr-1"></i> Add Vendor </button>
                </div>`;

function displayVendorListInit() {
    let data = {
        "query": "fetch",
        "databasename": "vendor_master",
        "column": {
            "vendor_master_id": "vendor_master_id",
            "vendor_name": "vendor_name",
            "gst_no": "gst_no",
            "vendor_phone": "vendor_phone",
            "vendor_address": "vendor_address",
            "status": "status",
            "created_at": "created_at",
        },
        'condition': {},
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "displayVendorList", "param1": "table-vendor-list" }, { "functionName": "displayVendorList", "param1": "table-vendor-list" });
}

function displayVendorList(response, dataTableId) {
    var tableHeader = [{
        "data": "vendor_master_id"
    }, {
        "data": "vendor_name"
    }, {
        "data": "gst_no"
    }, {
        "data": "vendor_phone"
    }, {
        "data": "vendor_address"
    }, {
        "data": "status",
        mRender: function(data, type, row) {
            if (row.status == '1')
                return `<span class="badge badge-pill badge-success font-size-12">Active</span>`;
            else
                return `<span class="badge badge-pill badge-danger font-size-12">In Active</span>`;
        }
    }, /* EDIT */ /* DELETE */ {
        "data": "status",
        mRender: function(data, type, row) {
            if (row.status == '1') {
                return `<td class="text-right">
                     <a class="mr-3 text-info edit-row" title="Edit" data-toggle="modal" data-id="${row.vendor_master_id}" data-target=".add"><i class="mdi mdi-pencil font-size-14"></i></a>
                     <a class="text-danger delete-row" title="Delete" data-toggle="modal" data-id="${row.vendor_master_id}" data-target=".delete"><i class="mdi mdi-close font-size-14"></i></a>
                     </td>`;
            } else
                return `<td class="text-right"> <a class="text-success delete-row" title="Active" data-toggle="modal" data-id="${row.vendor_master_id}" data-target=".actived"><i class="mdi mdi-spellcheck font-size-14"></i></a></td>`;
        }
    }];
    dataTableDisplay(response, tableHeader, false, dataTableId, button);
}

/**
 * To Add Vendor
 */

$(document).on('click', '.btn-add-vendor', function() {
    $(".vendor-add").removeAttr('data-id');
    $("#vendor-add")[0].reset();
});

/**
 * To Edit Vendor
 */

$(document).on('click', ".edit-row", function() {
    $(".vendor-add").attr('data-id', $(this).attr('data-id'));
    $("#vendor-add")[0].reset();
    let data = {
        "query": "fetch",
        "databasename": "vendor_master",
        "column": {
            "*": "*"
        },
        'condition': {
            'vendor_master_id': $(this).attr('data-id')
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
        'databasename': 'vendor_master',
        'condition': {
            'vendor_master_id': $(".btn-delete").attr('data-detete')
        },
        'values': {
            'status': '0'
        }
    }
    $("#delete").modal('hide');
    commonAjax('database.php', 'POST', data, '', 'Record Deleted Sucessfully', '', { "functionName": "locationReload" })
});


/**
 * To active row
 */

$(document).on('click', ".active-row", function() {
    $(".active .btn-active").attr('data-detete', $(this).attr('data-id'));
});

$(document).on('click', ".btn-active", function() {
    var data = {
        'query': 'update',
        'databasename': 'vendor_master',
        'condition': {
            'vendor_master_id': $(".btn-active").attr('data-detete')
        },
        'values': {
            'status': '1'
        }
    }
    $("#actived").modal('hide');
    commonAjax('database.php', 'POST', data, '', 'Record Status updated Sucessfully', '', { "functionName": "locationReload" })
});


/**
 * Add Vendor
 */

$('.vendor-add').click(function() {
    if (checkRequired('#vendor-add')) {
        var id = $(this).attr('data-id');
        var values = $("#vendor-add").serializeObject();
        if (isEmptyValue(id)) {
            // Add New
            var data = {
                "query": 'add',
                "databasename": 'vendor_master',
                "values": values
            }
            commonAjax('database.php', 'POST', data, '.add', 'Vendor added successfully', '', { "functionName": "locationReload" });
        } else {
            // Edit
            var data = {
                "query": 'update',
                "databasename": 'vendor_master',
                "values": values,
                "condition": {
                    "vendor_master_id": id
                }
            }
            commonAjax('database.php', 'POST', data, '.add', 'Vendor updated successfully', '', { "functionName": "locationReload" })
        }
    }
});