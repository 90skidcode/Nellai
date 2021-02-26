$(document).ready(function() {
    listProduct();
    listDepartment();
    $("[name='department_id']").select2().on('change', function() {
        listBranch();
    });
    displayAllProductsListInit();
});

/**
 * List Product in select 2
 */

function listProduct() {
    let data = {
        "query": 'fetch',
        "databasename": 'product_master',
        "column": {
            "product_code": "product_code",
            "product_name": "product_name"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "[name='product_code']", "param2": "product_name", "param3": "product_code" })

}

/**
 * List Department in select 2
 */

function listDepartment() {
    let data = {
        "query": 'fetch',
        "databasename": 'department_master',
        "column": {
            "department_master_id": "department_master_id",
            "department_name": "department_name"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "[name='department_id']", "param2": "department_name", "param3": "department_master_id" }, { "functionName": "listSelect2", "param1": "[name='department_id']", "param2": "department_name", "param3": "department_master_id" })
    setTimeout(function() {
        listBranch();
    }, 2000);
}

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
            "department_master_id": $("[name='department_id']").val()
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "[name='branch_id']", "param2": "branch_name", "param3": "branch_master_id" }, { "functionName": "listSelect2", "param1": "[name='branch_id']", "param2": "branch_name", "param3": "branch_master_id" });
}



function displayAllProductsListInit() {
    let data = {
        "list_key": "getBillingReport",
        "from_date": $("#from_date").val(),
        "to_date": $("#to_date").val(),
        "condition": {
            "outlet_billing.branch_id": ($("[name='branch_id']").val()),
            "outlet_billing.department_id": ($("[name='department_id']").val()),
            "outlet_billing.orderby": ($("[name='orderby']").val())
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