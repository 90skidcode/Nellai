$(document).ready(function() {
    displayProductListInit();
});

var button = `<div class="text-sm-right">
<button type="button" data-toggle="modal" data-target=".add" class="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2"><i class="mdi mdi-plus mr-1"></i> Add Product </button>
</div>`;
var productDataList = '';

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
                       <a class="mr-3 text-info edit-row" title="Edit" data-toggle="modal" data-id="${row.product_code}" data-target=".add"><i class="mdi mdi-pencil font-size-14"></i></a>
                    </td>`;
            /** <a class="mr-3 text-info barcode-row" title="BarCode Print" data-toggle="modal" data-id="${row.product_code}" data-target=".barcode-print"><i class="mdi mdi-barcode-scan font-size-14"></i></a>
                        <a class="text-danger delete-row" title="Delete" data-toggle="modal" data-id="${row.product_code}" data-target=".delete"><i class="mdi mdi-close font-size-14"></i></a> */
        }
    }];

    $.each(response, function(i, v) {
        productDataList += `<option value='${v.product_code}'>${v.product_name}</option>`
    });

    dataTableDisplay(response, tableHeader, false, dataTableId, button);
}

/**
 * To Add Product
 */

$(document).on('click', '[data-target=".add"]', function() {
    formReset();
    $("#deductions-table table tbody tr:not(#addIngredients)").remove();
    var id = $(this).attr('data-id');
    if (!isEmptyValue(id)) {
        let data = { "list_key": "getProducts", "condition": { "product_master.product_code": id } };
        commonAjax('', 'POST', data, '', '', '', { "functionName": "productSetValue", "param1": id });
        $(".product-add").attr('data-id', id);
        $("[name='product_code']").prop('readonly', true);
    } else {
        $("[name='product_code']").prop('readonly', false);
        $(".product-add").removeAttr('data-id', id);
    }
});

function productSetValue(response, id) {
    multipleSetValue(response.result);
    let data = { "list_key": "getIngredient", "condition": { "product_code": id } };
    commonAjax('', 'POST', data, '', '', '', { "functionName": "ingredientSetValue" });
}

function ingredientSetValue(response) {
    if (response.result) {
        $.each(response.result, function(index, value) {
            $('#button-add-ingredients').trigger('click');
            $.each(value, function(i, v) {
                $('tbody tr:nth-child(' + (index + 1) + ') [name="' + i + '"]').val(v);
            })
        })
    }
}

/**
 * To Barcode Preview
 */

$(document).on('click', '[data-target=".barcode-print"]', function() {
    JsBarcode("#barcode", $(this).attr('data-id'));
    $('#barcode').attr('data-id', $(this).attr('data-id'));
    $("#no_of_labels").val('');
});



$('.product-add').click(function() {
    if (checkRequired('#product-add')) {
        var id = $(this).attr('data-id');
        if (isEmptyValue(id)) {
            // Add New
            var data = $("#product-add").serializeObject();
            if (typeof(data['ingredient_product_code']) == "string") {
                data['ingredient_product_code'] = data['ingredient_product_code'].split(" ");
                data['ingredient_quantity'] = data['ingredient_quantity'].split(" ");
                data['ingredient_quantity_type'] = data['ingredient_quantity_type'].split(" ");
            }
            data['list_key'] = 'insertProduct';
            commonAjax('', 'POST', data, '.add', 'Product added successfully', '', { "functionName": "locationReload" })
        } else {
            // Edit
            var data = $("#product-add").serializeObject();
            data['list_key'] = 'ProductUpdate';
            if (typeof(data['ingredient_product_code']) == "string") {
                data['ingredient_product_code'] = data['ingredient_product_code'].split(" ");
                data['ingredient_quantity'] = data['ingredient_quantity'].split(" ");
                data['ingredient_quantity_type'] = data['ingredient_quantity_type'].split(" ");
            }
            commonAjax('', 'POST', data, '.add', 'Product updated successfully', '', { "functionName": "locationReload" })
        }
    }
});


/**
 * To detele row
 */

$(document).on('click', ".delete-row", function() {
    $(".delete").attr('data-detete', $(this).attr('data-id'));
});

$(document).on('click', ".btn-delete", function() {
    var data = {
        'query': 'update',
        'databasename': 'product_master',
        'condition': {
            'product_code': $(".btn-delete").attr('data-detete')
        },
        'values': {
            'status': '0'
        }
    }
    $("#delete").modal('hide');
    commonAjax('database.php', 'POST', data, '', 'Record Deleted Sucessfully', '', { "functionName": "locationReload" })
});


$(document).on('click', '#button-add-ingredients', function() {
    let c = $(this).attr('count');
    $(this).attr('count', parseInt($(this).attr('count')) + 1);
    $(this).closest('table').find('#addIngredients').before(`  <tr>
    <td class="text-center">
        <button type="button" title="Reject" class="btn btn-icon btn-outline-danger btn-lg">
        <i class="fa fa-trash"></i>
    </button>
    </td>
    <td scope="row">
        <select name="ingredient_product_code" class="form-control">${productDataList}</select>
    </td>
    <td>
        <input type="number" name="ingredient_quantity" class="form-control" required>
    </td>
    <td> 
        <select name="ingredient_quantity_type" class="form-control" required>
            <option value="">Select</option>
            <option value="kg">Kg</option>
            <option value="g">Grams</option>
        </select>
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
 * To reset form while clicking the Add or Edit
 */

function formReset() {
    $("#product-add")[0].reset();
}