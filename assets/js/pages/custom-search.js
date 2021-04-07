$(document).ready(function() {
    listProduct();
    if (userSession.department_id != 5)
        $(".department,.branch").hide();
    else {
        listDepartment();
        $("[name='department_id']").select2().on('change', function() {
            listBranch();
        });
    }
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
    let defaultValue = (getParameter('item_code')) ? getParameter('item_code') : "";
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "[name='product_code']", "param2": "product_name", "param3": "product_code", "param4": defaultValue })

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
        "list_key": "getProductReport",
        "from_date": $("#from_date").val(),
        "to_date": $("#to_date").val(),
        "condition": {
            "stock_master_details.branch_master_id": (userSession.department_id == 5) ? $("[name='branch_id']").val() : userSession.branch_id,
            "stock_master_details.department_id": (userSession.department_id == 5) ? $("[name='department_id']").val() : userSession.department_id,
            "stock_master_details.product_code": ($('[name="product_code"]').val()) ? $('[name="product_code"]').val() : ""
        }
    }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "displayAllProductsList" }, { "functionName": "displayAllProductsList" });

}



function displayAllProductsList(responce) {
    let html = ``;
    let stockIn = 0;
    let stockOut = 0;
    let creditTotal = 0;
    let debitTotal = 0;

    $.each(responce.result, function(i, v) {
        html += `<tr class='${(!v.damage_images)? "" : "text-danger font-weight-bold"}'>
                    <td>${i+1}</td>
                    <td class="info-row" title="Info" data-toggle="modal" data-id="${v.stock_master_details_id}" data-target=".info">${v.bill_no}</td>
                    <td>${formatDate(v.stock_date)}</td>
                    <td>${(Number(v.stock_quantity_in))? v.from_branch : v.to_branch}</td>
                    <td>${(Number(v.stock_quantity_in))? v.to_branch : v.from_branch}</td>
                    <td>${(Number(v.stock_quantity_in))? " IN ": (v.damage_images)? " Damage " : " OUT "  } - ${v.product_code} - ${v.product_name}</td>
                    <td class="text-success text-right">${(Number(v.stock_quantity_in))?  v.stock_quantity_in : ""}</td>
                    <td class="text-danger text-right">${(Number(v.stock_quantity_in))? numberWithCommas(Number(v.stock_quantity_in) * Number(v.product_price)): ""}</td>
                    <td class="text-danger text-right">${(Number(v.stock_quantity_out))? v.stock_quantity_out: ""}</td>
                    <td class="text-success text-right">${(Number(v.stock_quantity_out))? numberWithCommas(Number(v.stock_quantity_out) * Number(v.product_price)): ""}</td>
                </tr>`;
        stockIn += Number(v.stock_quantity_in);
        stockOut += Number(v.stock_quantity_out);
        creditTotal += Number(v.stock_quantity_in) * Number(v.product_price);
        debitTotal += Number(v.stock_quantity_out) * Number(v.product_price);
    });

    let CheckValue = debitTotal - creditTotal;
    if (!$('[name="product_code"]').val()) {
        $(".stock-view").hide();
        html += `<tr>
        <td colspan="6" ></td>
        <td class="text-success text-right font-weight-bolder font-size-20"></td>
        <td class="text-danger text-right font-weight-bolder font-size-20">${numberWithCommas(creditTotal)}</td>
        <td class="text-danger text-right font-weight-bolder font-size-20"></td>
        <td class="text-success text-right font-weight-bolder font-size-20">${numberWithCommas(debitTotal)}</td>
    </tr>
    <tr>
        <td colspan="6" ></td>
        <td colspan="3" class="${(CheckValue > 0)? "text-success" : "text-danger"} text-right font-weight-bolder font-size-20">${(CheckValue > 0)? "" : ""}</td>
        <td class="${(CheckValue > 0)? "text-success" : "text-danger"} text-right font-weight-bolder font-size-20">${numberWithCommas(CheckValue.toString().replace("-",""))}</td>
    </tr>`;
    } else {
        $(".stock-view").show();
        $(".stock-details").html(stockIn - stockOut);
        html += `<tr>
                    <td colspan="8" ></td>
                    <td class="text-success text-right font-weight-bolder font-size-20">${stockIn}</td>
                    <td class="text-danger text-right font-weight-bolder font-size-20">${stockOut}</td>
                </tr>`;
    }
    $("tbody").html(html);
}

function compare(a, b) {
    if (a.stock_date < b.stock_date) {
        return -1;
    }
    if (a.stock_date > b.stock_date) {
        return 1;
    }
    return 0;
}