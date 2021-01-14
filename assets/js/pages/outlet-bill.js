let data = [{
    "value": "1001",
    "text": "Idly",
    "price": "20"
}, {
    "value": "1004",
    "text": "Pongal",
    "price": "50"
}];
$(document).ready(function() {


    horsey(document.querySelector('.autoComplete'), {
        source: [{
            list: data
        }],
        getText: 'text',
        getValue: 'value',
    });

    $('.autoComplete').focus();

    onScan.attachTo(document, {
        suffixKeyCodes: [13],
        reactToPaste: true,
        onScan: function(sCode, iQty) {
            console.log('Scanned: ' + sCode);
            let selectdObject = data.find(o => o.value === sCode);
            let trcount = $('table tr.add-row').length - 1;
            $('input').each(function() {
                console.log($(this).val());
                $(this).val($(this).val().replace(sCode, ''));
            });
            let lastauto = $('tr.add-row').eq(trcount).find('.autoComplete').val();
            let quantity = $('tr.add-row').eq(trcount).find('.quantity').val();
            if (!lastauto || !quantity) {
                $('table tr.add-row').eq(trcount).find('.autoComplete').attr('data-id', sCode).val(selectdObject.text);
                $('tr.add-row').eq(trcount).find('.quantity').val(1).focus();
                $('tr.add-row').eq(trcount).find('.costperunit').val(selectdObject.price);
                $('tr.add-row').eq(trcount).find('.row-cost').val(selectdObject.price);
            } else {
                let flag = true;
                $('table tr.add-row .autoComplete').attr('data-id');
                $('tr.add-row .autoComplete').each(function() {
                    if ($(this).attr('data-id').trim() == sCode) {
                        $(this).closest('tr').find('.quantity').val(Number($(this).closest('tr').find('.quantity').val()) + 1).focus();
                        flag = false;
                        return false;
                    }
                });
                if (flag) {
                    $('#button-add-item').trigger('click');
                    let trcount = $('table tr.add-row').length - 1;
                    $('table tr.add-row').eq(trcount).find('.autoComplete').attr('data-id', sCode).val(selectdObject.text);
                    $('tr.add-row').eq(trcount).find('.quantity').val(1).focus();
                    $('tr.add-row').eq(trcount).find('.costperunit').val(selectdObject.price);
                    $('tr.add-row').eq(trcount).find('.row-cost').val(selectdObject.price);
                    1004
                }
            }
        }
    });
});


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
        if (!$(this).val().trim()) {
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
                                                            <input type="text" type="text" class="form-control autoComplete" name="">
                                                        </td>
                                                        <td><input type="number" name="" id="" class="form-control quantity"> </td>
                                                        <td> <input type="number" name="" id="" class="form-control costperunit" readonly tabindex='-1'> </td>
                                                        <td> <input type="number" name="" id="" class="form-control row-cost" readonly tabindex='-1'> </td>
                                                    </tr>`);
        $('.autoComplete').each(function() {
            horsey($(this)[0], {
                source: [{
                    list: data
                }],
                getText: 'text',
                getValue: 'value',
            });
        })

    } else
        showToast("Please fill all the fields", "error");
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