$(document).ready(function() {
    displayAllProductsListInit();
});
var button = '';
/**
 * List Report 
 */

function displayAllProductsListInit() {
    let data = { "list_key": "SumProducts", "condition": { "stock_master_details.branch_master_id": userSession.branch_id } };
    commonAjax('', 'POST', data, '', '', '', { "functionName": "displayAllProductsList", "param1": "all-product-report-list" }, { "functionName": "displayAllProductsList", "param1": "all-product-report-list" });
}

function displayAllProductsList(response, dataTableId) {
    var tableHeader = [{
        "data": "product_code"
    }, {
        "data": "product_name"
    }, {
        "data": "availabilty"
    }, /* EDIT */ /* DELETE */ {
        "data": "product_code",
        mRender: function(data, type, row) {
            return `<td class="text-right">
            <a class="mr-3 text-info" title="Report" href="product-report.html?item_code=${row.product_code}"><i class="mdi mdi-clipboard-list-outline font-size-18"></i></a>
            </td>`;
        }
    }];
    dataTableDisplay(response.result, tableHeader, false, dataTableId, button);
}