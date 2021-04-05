$(document).ready(function() {
    listBranch();
    displayAllProductsListInit();
    if (userSession.department_id != 5)
        $('.branch').hide();
});


/**
 * List Branch in select 2
 * 
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
            "status": '1',
            "department_master_id": 4
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "[name='branch_id']", "param2": "branch_name", "param3": "branch_master_id" }, { "functionName": "listSelect2", "param1": "[name='branch_id']", "param2": "branch_name", "param3": "branch_master_id" });
}

function displayAllProductsListInit() {
    let data = {
        "list_key": "getInvoiceReport",
        "from_date": $("#from_date").val(),
        "to_date": $("#to_date").val(),
        "condition": {
            "outlet_billing.branch_id": (userSession.department_id != 5) ? userSession.branch_id : $("[name='branch_id']").val(),
            "outlet_billing.department_id": '4',
            "outlet_billing.orderby": $("[name='orderby']").val()
        }
    }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "displayAllProductsList" }, { "functionName": "displayAllProductsList" });
}


function displayAllProductsList(response) {
    let html = ``;
    let total = 0;
    let stockOut = 0;
    $.each(response.result, function(i, v) {
        html += `<tr>
                    <td>${v.bill_no}</td>
                    <td>${formatDate(v.created_at)}</td>  
                    <td>${v.department_name}</td>                 
                    <td>${v.branch_name}</td>
                    <td>${v.orderby}</td>
                    <td class="text-right">${numberWithCommas(v.total)}</td>
                </tr>`;
        total += Number(v.total);
    });

    html += `<tr>
                    <td colspan="5"></td>
                    <td class="text-success text-right font-weight-bolder font-size-20">${numberWithCommas(total)}</td>
                </tr>`;

    $("tbody").html(html);
}