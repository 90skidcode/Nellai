$(document).ready(function() {
    onScan.attachTo(document, {
        suffixKeyCodes: [13],
        reactToPaste: true,
        onScan: function(sCode) {
            let selectdObject = data.find(o => o.value === sCode);
            let trcount = $('table tr.add-row').length - 1;
            $('input').each(function() {
                $(this).val($(this).val().replace(sCode, ''));
            });
            let lastauto = $('tr.add-row').eq(trcount).find('.autoComplete').val();
            let quantity = $('tr.add-row').eq(trcount).find('.quantity').val();
            if (!lastauto || !quantity) {
                let flag = true;
                $('tr.add-row .autoComplete').each(function() {
                    if ($(this).attr('data-id') == sCode) {
                        $(this).closest('tr').find('.quantity').val(Number($(this).closest('tr').find('.quantity').val()) + 1).focus();
                        flag = false;
                        return false;
                    }
                });
                if (flag) {
                    $('table tr.add-row').eq(trcount).find('.autoComplete').attr('data-id', sCode).val(selectdObject.text);
                    $('tr.add-row').eq(trcount).find('.quantity').val(1).focus();
                    $('tr.add-row').eq(trcount).find('.costperunit').val(selectdObject.price);
                }
            } else {
                let flag = true;
                $('tr.add-row .autoComplete').each(function() {
                    if ($(this).attr('data-id') == sCode) {
                        $(this).closest('tr').find('.quantity').val(Number($(this).closest('tr').find('.quantity').val()) + 1).focus();
                        flag = false;
                        return false;
                    }
                });
                if (flag) {
                    $('#button-add-item').trigger('click');
                    let trcount = $('table tr.add-row').length - 1;
                    $('table tr.add-row').eq(trcount).find('.autoComplete').attr('data-id', sCode).val(selectdObject.text)
                    const displaySelect = new SlimSelect({
                        select: '.' + $('table tr.add-row').eq(trcount).find('.autoComplete').attr('data-class')
                    });
                    displaySelect.set(selectdObject.text);
                    $('tr.add-row').eq(trcount).find('.quantity').val(1).focus();
                    $('tr.add-row').eq(trcount).find('.costperunit').val(selectdObject.price);
                }
            }
            billCalculation();
        }
    });
});

let data = [{
    "value": "1005",
    "text": "Idly",
    "price": "20"
}, {
    "value": "1004",
    "text": "Pongal",
    "price": "50"
}];

function itemdata() {
    return data;
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
    $('tr.add-row .autoComplete').each(function() {
        if (!$(this).val()) {
            flag = false;
            return false;
        }
    });

    if (flag) {
        var autoCompleteCount = Number($('tr.add-row input.autoComplete').length) + 1;
        var className = "autoComplete-" + autoCompleteCount;
        that.closest('table').find('#addItem').before(`   <tr class="add-row">
                                                        <td class="text-center">
                                                            <button type="button" title="Reject" class="btn btn-icon btn-outline-danger btn-lg">
                                                                <i class="fa fa-trash"></i>
                                                            </button>
                                                        </td>
                                                        <td scope="row">
                                                        <select name="" id=""  data-id="" data-class="${className}" class="autoComplete ${className}"></select>
                                                        </td>
                                                        <td><input type="number" name="" id="" onkeyup="billCalculation()" class="form-control quantity"> </td>
                                                        <td> <input type="number" name="" id="" class="form-control costperunit" readonly tabindex='-1'> </td>
                                                        <td> <input type="number" name="" id="" class="form-control row-cost" readonly tabindex='-1'> </td>
                                                    </tr>`);
        const displaySelect = new SlimSelect({
            select: '.' + className
        });
        displaySelect.setData(itemdata());

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