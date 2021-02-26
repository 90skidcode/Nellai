$(document).ready(function() {
    listProduct();
    onScan.attachTo(document, {
        suffixKeyCodes: [13],
        reactToKeydown: true,
        onScan: function(sCode) {
            $('input:focus').prop("disable", true);
            let selectdObject = findInArrayOfObject(sCode.toUpperCase(), 'product_code', listBranchProductArray);
            let trcount = $('table tr.add-row').length - 1;

            let lastauto = $('tr.add-row').eq(trcount).find('.select2').val();
            let quantity = $('tr.add-row').eq(trcount).find('.quantity').val();
            if (!lastauto || !quantity) {
                let flag = true;
                $('tr.add-row select.select2').each(function() {
                    if ($(this).val() == sCode) {
                        $(this).closest('tr').find('.quantity').val(Number($(this).closest('tr').find('.quantity').val()) + 1).focus();
                        flag = false;
                        return false;
                    }
                });
                if (flag && typeof(selectdObject) != 'undefined') {
                    $('table tr.add-row').eq(trcount).find('.select2').attr('data-id', sCode).val(sCode).trigger("change");;
                    $('tr.add-row').eq(trcount).find('.quantity').val(1).focus();
                    $('tr.add-row').eq(trcount).find('.costperunit').val(selectdObject.price);
                }
            } else {
                let flag = true;
                $('tr.add-row select.select2').each(function() {
                    if ($(this).val() == sCode) {
                        $(this).closest('tr').find('.quantity').val(Number($(this).closest('tr').find('.quantity').val()) + 1).focus();
                        flag = false;
                        return false;
                    }
                });
                if (flag && typeof(selectdObject) != 'undefined') {
                    $('#button-add-item').trigger('click');
                    let trcount = $('table tr.add-row').length - 1;
                    $('table tr.add-row').eq(trcount).find('.select2').val(sCode).trigger("change");
                    $('tr.add-row').eq(trcount).find('.quantity').val(1).focus();
                    $('tr.add-row').eq(trcount).find('.costperunit').val(selectdObject.price);
                }
            }
            billCalculation();
        }
    });
});

document.addEventListener('scan', function(sScancode, iQuantity) {
    var focus = $(':focus');
    focus.prop("readonly", true);
});

$('[name="quantity"]').on('click', function() {
    $(this).prop("readonly", false);
})

/**
 * List Product in select 2
 */
function listProduct() {
    let data = { "list_key": "getBillingavalablity", "branch_id": userSession.branch_id }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "dataBranchProduct" })
}

var dataBranchProductlist = '<option value="">Select</option>';
var listBranchProductArray = '';

function dataBranchProduct(responce) {
    listBranchProductArray = responce.result;
    $.each(responce.result, function(i, v) {
        dataBranchProductlist += `<option value='${v.product_code}'>${v.product_code} - ${v.product_name}</option>`
    });
    $('#button-add-item').trigger('click');
}

/**
 * Bill Calculation
 */

function billCalculation() {
    var totalCost = 0;
    $('tr.add-row').each(function() {
        let quantity = $(this).find('.quantity').val();
        let costperunit = $(this).find('.costperunit').val();
        if (quantity && costperunit) {
            let cost = Number(quantity) * Number(costperunit);
            $(this).find('.row-cost').val(cost);
            totalCost += Number(cost);
        }

        let cgst = $('.cgst').val();
        let sgst = $('.sgst').val();
        let percentage = Number(cgst) + Number(sgst);
        let billamount = ((totalCost / 100) * percentage) + totalCost;
        $('.total').val(billamount);
        ($('.customer-given').val() > billamount) ? $('.need-to-return').val($('.customer-given').val() - billamount): $('.need-to-return').val(0);
    })
}


/**
 * ShortCut
 */

$(window).keydown(function(event) {
    if (event.keyCode == 113) {
        $('.order-by').focus();
        event.preventDefault();
    }
    if (event.keyCode == 114) {
        $('.gst-no').focus();
        event.preventDefault();
    }
    if (event.keyCode == 115) {
        $('.payment-type').focus();
        event.preventDefault();
    }
    if (event.keyCode == 117) {
        $('.customer-given').focus();
        event.preventDefault();
    }
    if (event.keyCode == 119) {
        $('.btn-save').trigger('click');
        event.preventDefault();
    }
});

$(document).on('click', '#button-add-item', function() {
    let that = $(this)
    let flag = true;
    $('tr.add-row select.select2').each(function() {
        if (!$(this).val()) {
            flag = false;
            return false;
        }
    });

    if (flag) {
        that.closest('table').find('#addItem').before(`   <tr class="add-row">
                                                        <td class="text-center">
                                                            <button type="button" title="Reject" class="btn btn-icon btn-outline-danger btn-lg">
                                                                <i class="fa fa-trash"></i>
                                                            </button>
                                                        </td>
                                                        <td scope="row">
                                                                <select name="product_id" class="form-control select2 select2">${dataBranchProductlist}</select>
                                                            </td>
                                                        <td><input type="number" name="quantity" id="" onkeyup="billCalculation()" class="form-control quantity"  required><span class="count badge-primary"> </td>
                                                        <td> <input type="number" name="costperunit" id="" class="form-control costperunit" readonly tabindex='-1' required> </td>
                                                        <td> <input type="number" name="cost" id="" class="form-control row-cost" readonly tabindex='-1' required> </td>
                                                    </tr>`);

        wheelRoll();
        $('.select2').select2().on("select2:select", function(e) {
            $(this).closest('tr').find('[name="quantity"]').focus();
            try {
                let productdata = findInArrayOfObject($(this).val(), 'product_code', listBranchProductArray);
                $(this).closest('tr').find('[name="costperunit"]').val(productdata.price);
                $(this).closest('tr').find('[name="quantity"]').attr('max', productdata.available_quantity);
            } catch (err) {
                console.log(err);
            }
        });

    } else
        showToast("Please fill all the fields", "error");
});

/**
 * To delete a row
 */

$(document).on('click', '.btn-outline-danger', function() {
    if ($(this).closest('table').find("tr.add-row ").length != '1') {
        $(this).closest('tr').remove();
    }
});

$(document).on('keyup blur keypress', 'table tr input,table tr select', function() {
    billCalculation();
});

$(document).on('click', '.btn-save', function() {
    if (checkRequired('#outlet-product') && checkRequired('#outlet-bill')) {
        var data = $("#outlet-bill").serializeObject();
        data["list_key"] = 'outletBill';
        data["bill_details"] = JSON.stringify(tableRowTOArrayOfObjects('table tbody tr:not(#addItem)'));
        data["branch_id"] = userSession.branch_id;
        data["department_id"] = userSession.department_id;
        console.log(JSON.stringify(data));
        commonAjax('', 'POST', data, '.add', 'Bill added successfully', '', { "functionName": "printPreview" })
    }
});

function printPreview(responce) {

    // let res = { "message": "success", "status_code": 200, "result": 
    //[{ "outlet_billing_id": "11", "bill_no": "INV10011", "branch_id": "6", "department_id": "4", 
    //"orderby": "Direct", "gst_no": "dfsf", "payment_type": "Online", "cgst": "2.5", "sgst": "2.5", 
    //"total": "105", "customer_given": "200", "need_to_return": "95", "bill_details": "[{\"product_id\":\"ITE001\",\"quantity\":\"2\",\"costperunit\":\"50\",\"cost\":\"100\"}]", "status": "1", "created_by": "10011", "created_at": "2021-02-26 02:22:56", "updated_at": "0000-00-00 00:00:00", "branch_name": "Outlet Avadi", "department_name": "Outlet", "employee_name": "outlet employee" }] };
    let html = `<h5 class="text-center">Nellai Krishna Food PVT LTD</h5>
    <p class="text-center mb-0">1st Guindy</p>
    <p class="text-center mb-0">Chennai - 600001.</p>
    <p class="text-center mb-0">Ph: +91 94353 56783</p>
    <p class="text-center mb-0">email: foods@nkf.com</p>

    <p class="text-center mb-0">Bill No: ${responce.result[0].bill_no}</p>
    <p class="text-center mb-0">******************************</p>
    <table class="w-100">
        <thead>
            <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>`;

    $.each(JSON.parse(responce.result[0].bill_details), function(i, v) {
        html += `
                    <tr>
                        <td>${findInArrayOfObject(v.product_id, 'product_code', listBranchProductArray).product_name}</td>
                        <td class="text-right mb-0">${v.quantity}</td>
                        <td class="text-right mb-0">${v.cost}</td>
                    </tr>
        `;
    });
    html += `</tbody>
                    </table>
                    <p class="text-center mb-0">******************************</p>
                    <p class="text-right mb-0">CGSt: ${responce.result[0].cgst}</p>
                    <p class="text-right mb-0">SGST: ${responce.result[0].sgst}</p>
                    <p class="text-center mb-0">******************************</p>
                    <p class="text-right mb-0">Total: ${numberWithCommas(responce.result[0].total)}</p>
                    <p class="text-right mb-0">SGST: ${numberWithCommas(responce.result[0].customer_given)}</p>
                    <p class="text-right mb-0">SGST: ${numberWithCommas(responce.result[0].need_to_return)}</p>

                    <p class="text-center mb-0">******************************</p>

                    <p class="text-center mb-0">Thank You </p>
                    <p class="text-center mb-0">******************************</p>
  
                    `;
    $('.print-bill').printThis({
        importCSS: false,
        loadCSS: "assets/css/app.min.css",
        header: html
    });
}