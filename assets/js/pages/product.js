$(document).ready(function() {
    displayProductListInit();
});

var button = `<div class="text-sm-right">
<button type="button" data-toggle="modal" data-target=".add" class="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2"><i class="mdi mdi-plus mr-1"></i> Add Product </button>
</div>`;



function displayProductListInit() {
    let data = {
        "query": "fetch",
        "databasename": "product_master",
        "column": {
            "*": "*"
        },
        'condition': {
            'status': '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "displayProductList", "param1": "table-product-list" }, { "functionName": "displayProductList", "param1": "table-product-list" });
}

function displayProductList(response, dataTableId) {
    var tableHeader = [{
        "data": "product_code"
    }, {
        "data": "product_name"
    }, /* EDIT */ /* DELETE */ {
        "data": "created_at",
        mRender: function(data, type, row) {
            return `<td class="text-right">    
                        <a class="mr-3 text-info" title="Report" href="product-report.html?id=${row.product_code}"><i class="mdi mdi-clipboard-list-outline font-size-18"></i></a>
                        <a class="mr-3 text-info edit-row" title="Edit" data-toggle="modal" data-id="${row.product_code}" data-target=".add"><i class="mdi mdi-pencil font-size-14"></i></a>
                        <a class="mr-3 text-info barcode-row" title="BarCode Print" data-toggle="modal" data-id="${row.product_code}" data-target=".barcode-print"><i class="mdi mdi-barcode-scan font-size-14"></i></a>
                        <a class="text-danger delete-row" title="Delete" data-toggle="modal" data-id="${row.product_code}" data-target=".delete"><i class="mdi mdi-close font-size-14"></i></a>
                    </td>`;
        }
    }];
    dataTableDisplay(response, tableHeader, false, dataTableId, button);
}

/**
 * To Add Product
 */

$(document).on('click', '[data-target=".add"]', function() {
    formReset();
});

/**
 * To Barcode Preview
 */

$(document).on('click', '[data-target=".barcode-print"]', function() {
    JsBarcode("#barcode", $(this).attr('data-id'));
    $('#barcode').attr('data-id', $(this).attr('data-id'));
    $("#no_of_labels").val('');
});

/**
 * To print Barcode
 */

$(document).on('click', '.print-barcode', function() {
    var mywindow = window.open('', 'my div', 'height=400,width=600');
    mywindow.document.write('<html><head><title>my div</title>');
    mywindow.document.write('<script src="assets/libs/jquery/jquery.min.js"></script><script src="assets/libs/JsBarcode/JsBarcode.all.min.js"></script>');
    mywindow.document.write('</head><body >');
    for (let i = 0; i < $("#no_of_labels").val(); i++) {
        mywindow.document.write('<svg class="barcode"></svg>');
    }
    mywindow.document.write("</body><script>JsBarcode('.barcode', '1004');window.print();</script></html>");
    mywindow.print();
    // mywindow.close();

    return true;
});

/**
 * To Edit Product
 */

$(document).on('click', ".edit-row", function() {
    $(".product-add").attr('data-id', $(this).attr('data-id'));
    formReset();
    let data = {
        "query": "fetch",
        "databasename": "employee_product",
        "column": {
            "*": "*"
        },
        'condition': {
            'employee_product_id': $(this).attr('data-id')
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "productSetValue" });
});

/***
 * Product Set Value
 */

function productSetValue(response) {
    multipleSetValue(response);
    if (response[0].allowance) {
        let productAllowance = JSON.parse(response[0].allowance);
        $.each(productAllowance, function(index, value) {
            if (index)
                $('#button-add-allowance').trigger('click');
            $.each(value, function(i, v) {
                $('tbody tr:nth-child(' + (index + 1) + ') [name="' + i + '"]').val(v);
            })
        })
    }
    if (response[0].deductions) {
        let productDeductions = JSON.parse(response[0].deductions);
        $.each(productDeductions, function(index, value) {
            if (index)
                $('#button-add-deductions').trigger('click');
            $.each(value, function(i, v) {
                $('tbody tr:nth-child(' + (index + 1) + ') [name="' + i + '"]').val(v);
            })
        })
    }
    totalCalculation();
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
        'databasename': 'employee_product',
        'condition': {
            'employee_product_id': $(".btn-delete").attr('data-detete')
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

$('.product-add').click(function() {
    if (checkRequired('#product-add')) {
        var id = $(this).attr('data-id');
        var values = $("#product-add").serializeObject();
        values['allowance'] = tableRowTOArrayOfObjects('#allowance-table tbody tr:not(#addAllowance)');
        values['deductions'] = tableRowTOArrayOfObjects('#deductions-table tbody tr:not(#addDeductions)');
        if (!hasDuplicates(values['allowance_type']) && !hasDuplicates(values['deductions_type'])) {
            delete values['allowance_type'];
            delete values['allowance_amount'];
            delete values['deductions_type'];
            delete values['deductions_amount'];
            if (isEmptyValue(id)) {
                // Add New
                var data = {
                    "query": 'add',
                    "databasename": 'employee_product',
                    "values": values
                }
                commonAjax('database.php', 'POST', data, '.add', 'Product added successfully', '', { "functionName": "locationReload" })
                $("#table-product-list").dataTable().fnDraw();
            } else {
                // Edit
                var data = {
                    "query": 'update',
                    "databasename": 'employee_product',
                    "values": values,
                    "condition": {
                        "employee_product_id": id
                    }
                }
                commonAjax('database.php', 'POST', data, '.add', 'Product updated successfully', '', { "functionName": "locationReload" })
            }
        } else
            showToast("Check Duplicate Allowance and Deductions", 'error');
    }
});

$(document).on('click', '#button-add-allowance', function() {
    let c = $(this).attr('count');
    $(this).attr('count', parseInt($(this).attr('count')) + 1);
    $(this).closest('table').find('#addAllowance').before(`  <tr>
    <td class="text-center">
        <button type="button" title="Reject" class="btn btn-icon btn-outline-danger btn-lg">
        <i class="fa fa-trash"></i>
    </button>
    </td>
    <td scope="row">
        <select name="allowance_type" class="form-control">${allowenceDataList}</select>
    </td>
    <td>
        <input type="number" name="allowance_amount" class="form-control text-right" required>
    </td>
</tr>`);
});

$(document).on('click', '#button-add-deductions', function() {
    let c = $(this).attr('count');
    $(this).attr('count', parseInt($(this).attr('count')) + 1);
    $(this).closest('table').find('#addDeductions').before(`<tr>
    <td class="text-center">
        <button type="button" title="Reject" class="btn btn-icon btn-outline-danger btn-lg">
        <i class="fa fa-trash"></i>
    </button>
    </td>
    <td scope="row">
        <select name="deductions_type" class="form-control">${deductionsDataList}</select>
    </td>
    <td>
        <input type="number" name="deductions_amount" class="form-control text-right" required>
    </td>
</tr>`);
});


/**
 * To delete a row
 */

$(document).on('click', '#allowance-table .btn-outline-danger', function() {
    if ($('#allowance-table .btn-outline-danger').closest('table').find("tbody tr:not('#addAllowance')").length != '1') {
        $(this).closest('tr').remove();
    }
});

/**
 * To delete a row
 */

$(document).on('click', '#deductions-table .btn-outline-danger', function() {
    if ($('#deductions-table .btn-outline-danger').closest('table').find("tbody tr:not('#addDeductions')").length != '1') {
        $(this).closest('tr').remove();
    }
});

/**
 * For Total Calculation
 */

$(document).on('click keyup blur', '#deductions-table .btn-outline-danger, #allowance-table .btn-outline-danger, [name="allowance_amount"], [name="deductions_amount"]', function() {
    totalCalculation();
});

function totalCalculation() {
    var allowanceTotal = 0;
    $('[name="allowance_amount"]').each(function() {
        allowanceTotal += Number($(this).val());
    })
    $('.allowance-total').html('<b>Rs.' + allowanceTotal + '</b>');
    var deductionsTotal = 0;
    $('[name="deductions_amount"]').each(function() {
        deductionsTotal += Number($(this).val());
    })
    $('.deductions-total').html('<b> Rs.' + deductionsTotal + '</b>');
    var ctcTotal = allowanceTotal - deductionsTotal;
    $('.ctc-total').html('<b class="font-size-18">Rs.' + ctcTotal + '</b>');
}

/**
 * To reset form while clicking the Add or Edit
 */

function formReset() {
    $("#product-add")[0].reset();
    $('#allowance-table .btn-outline-danger').closest('table').find("tbody tr:not('#addAllowance')").remove();
    $('#deductions-table .btn-outline-danger').closest('table').find("tbody tr:not('#addDeductions')").remove();
    $('#button-add-allowance').trigger('click');
    $('#button-add-deductions').trigger('click');
    $('.allowance-total').html('');
    $('.deductions-total').html('');
    $('.ctc-total').html('');
}