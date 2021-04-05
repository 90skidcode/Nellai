$(document).ready(function() {
    displayProductListInit();
});

var button = ``;

function displayProductListInit() {
    let data = { "list_key": "ListPriceOutlet" }

    commonAjax('', 'POST', data, '', '', '', { "functionName": "displayProductList" });
}
var html = ``;

function displayProductList(response) {
    $.each(response.result, function(i, v) {
        html += `<tr>
                    <td class="product-code">${v.product_code}</td>
                    <td>${v.product_name}</td>
                    <td><input type="text" class="product-price text-right" value="${v.outlet_price}"></td>
                </tr>`
    });
    $('#table-product-list tbody').html(html);
}

$('.product-outlet-price-add').click(function() {
    var data = {};
    data['list_key'] = 'updatePriceOutlet';
    var price = {};
    $('#table-product-list tbody tr').each(function() {
        if ($(this).find('.product-code').text())
            price[$(this).find('.product-code').text()] = $(this).find('.product-price').val();
    });
    data['product_price'] = price;
    console.log(data);
    commonAjax('', 'POST', data, '', 'Product Price Updated successfully', '', { "functionName": "locationReload" })
});