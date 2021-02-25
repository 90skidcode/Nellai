$(document).ready(function() {
    listVendor();
    listVendorReport();
});

/**
 * List Vendor in select 2
 */

function listVendor() {
    let data = {
        "query": 'fetch',
        "databasename": 'vendor_master',
        "column": {
            "vendor_master_id": "vendor_master_id",
            "vendor_name": "vendor_name"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "[name='vendor_id']", "param2": "vendor_name", "param3": "vendor_master_id" });
}

function listVendorReport() {
    let data = { "list_key": "getRequest", "from_date": $("[name='from_date']").val(), "to_date": $("[name='to_date']").val(), "condition": { "request_management.vendor_id": $("[name='vendor_id']").val(), "request_management.department_id": "5" } }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "displayVendorList" }, { "functionName": "displayVendorList" });
}

function displayVendorList(responce) {
    let html = '';
    let total = 0;
    $.each(responce.result, function(i, v) {
        html += `<tr>
                    <td>${v.bill_no}</td>
                    <td>${formatDate(v.created_at)}</td>
                    <td>${v.vendor_name}</td>
                    <td>${v.request_mode}</td>
                    <td>${trackingStatus(v.request_status)}</td>                    
                    <td class="text-right">${numberWithCommas(v.product_total)}</td>
                </tr>`;
        total += Number(v.product_total);
    });
    html += `<tr>
                <td colspan="5" class="text-right font-weight-bolder font-size-20">Total Vendor</td>
                <td class="text-right font-weight-bolder font-size-20">${numberWithCommas(total)}</td>
            </tr>`;

    $("tbody").html(html);
}