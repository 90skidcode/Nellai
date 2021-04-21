function display360Init() {
    let data = {
        "list_key": "Report360",
        "from_date": $("#from_date").val(),
        "to_date": $("#to_date").val()
    }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "displayAllProductsLists" }, { "functionName": "displayAllProductsLists" });
}


function displayAllProductsLists(response) {
    let html = ``;
    let fte = 0;
    let fti = 0;
    $.each(response.result, function(i, v) {
        let te = 0;
        let ti = 0;
        if (typeof(v.department_id) != 'undefined') {
            $.each(v.details, function(inx, val) {
                te += Number(val.details.expenses);
                ti += Number(val.details.income);
            });
        } else {
            te = Number(v.details.expenses);
            ti = Number(v.details.income);
        }
        html += `<tr>
                    <td class="showBranch" data-json='${JSON.stringify(v)}'>${i}</td>
                    <td class="text-right">${numberWithCommas(ti)}</td> 
                    <td class="text-right">${numberWithCommas(te)}</td>                           
                </tr>`;
        fte += Number(te);
        fti += Number(ti);
    });
    $(".list-result-type tbody").html(html);
    $(".t-income").html(numberWithCommas(fti));
    $(".t-expences").html(numberWithCommas(fte));
    let c = ((fti - fte) > 0) ? "text-success" : "text-danger";
    $(".t-final").html(numberWithCommas((fte - fti))).addClass(c);

}

$(document).on('click', '.view-bill-details', function() {
    let data = JSON.parse($(this).attr('data-json'));
    let html = ` <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addStoreOutLabel">Bill Details</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                    </div>
                    <div class="modal-body">
                   
                    <div class="row">                    
                            <div class="col-md-8">   
                            <div class="card">
                            <div class="card-header">   
                                Bill Details
                            </div> 
                            <div class="card-body">                  
                            <table class="table table-striped table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                            <thead>
                                <tr >
                                    <th>Item Code</th>
                                    <th class="text-right">Quantity</th>                                  
                                    <th class="text-right">Cost per Unit</th>
                                    <th class="text-right">Cost</th>
                                </tr>
                            </thead>
                            <tbody>`;
    $.each(JSON.parse(data.bill_details), function(i, v) {
        let product = findInArrayOfObject(v.product_id, 'product_code', listProductArray);
        html += `<tr>
                    <td>${product.product_code} - ${capitalizeFirstLetter(product.product_name)}</td>
                    <td class="text-right">${v.quantity}</td>
                    <td  class="text-right">${numberWithCommas(v.costperunit)}</td>
                    <td  class="text-right">${numberWithCommas(v.cost)}</td>
                </tr>`;
    });

    html += `</tbody> 
                        </table>
                       
                        </div>
                        </div></div>
                            <div class="col-md-4">
                                <div class="card">
                                <div class="card-header">   
                                    Calculation Details
                                </div>
                                    <div class="row p-3">
                                        <div class="col-md-6 border-right-1 border-bottom-1 p-2">
                                            <div class="form-group m-0">
                                                <label for="formrow-firstname-input">Bill No</label><br>
                                                <b>${data.bill_no}</b>
                                            </div>
                                        </div>
                                        <div class="col-md-6 border-bottom-1 p-2">
                                            <div class="form-group m-0">
                                                <label for="formrow-email-input">Order By </label>
                                                <br>
                                                <b>${data.orderby}</b>
                                            </div>
                                        </div>
                                        <div class="col-md-6  border-right-1 border-bottom-1 p-2">
                                            <div class="form-group m-0">
                                                <label for="formrow-password-input">GST No </label>
                                                <br>
                                                <b>${data.gst_no} </b>
                                            </div>
                                        </div>
                                        <div class="col-md-6 border-bottom-1 p-2">
                                            <div class="form-group m-0">
                                                <label for="formrow-password-input">Payment Type </label>
                                                <br>
                                                <b>${data.payment_type}</b>
                                            </div>
                                        </div>
                                        <div class="col-md-6  border-right-1 border-bottom-1 p-2">
                                            <div class="form-group m-0">
                                                <label for="formrow-password-input">CGST (${data.cgst}%)</label>
                                                <br>
                                                <b>${numberWithCommas(((data.total*2.5)/100).toFixed(2))}</b>   </div>
                                        </div>
                                        <div class="col-md-6  border-bottom-1 p-2">
                                            <div class="form-group m-0">
                                                <label for="formrow-password-input">SGST (${data.sgst}%)</label>
                                                <br>
                                                <b>${numberWithCommas(((data.total*2.5)/100).toFixed(2))}</b>   </div>
                                        </div>
                                        <div class="col-md-12  border-right-1 border-bottom-1 p-2">
                                            <div class="form-group m-0">
                                                <label for="formrow-password-input">Total</label>
                                                <br>
                                                <b class="font-size-24 text-success">${numberWithCommas(data.total)}</b>  </div>
                                        </div>
                                    
                                        <div class="col-md-6  border-right-1  p-2">
                                            <div class="form-group m-0">
                                                <label for="formrow-password-input">Customer Given </label>
                                                <br>
                                                <b>${numberWithCommas(data.customer_given)}</b>   </div>
                                        </div>
                                        <div class="col-md-6   p-2">
                                            <div class="form-group m-0">
                                                <label for="formrow-password-input">Need to return</label>
                                                <br>
                                                <b>${numberWithCommas(data.need_to_return)}</b>    </div>
                                        </div>
                                    </div>
                                </div>
                            <div>
                                
                            </div>
                    </div>                    
                    </div>
                    <button type="button" class="btn btn-secondary pull-right ml-1" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary pull-right " onclick='printPreview(${$(this).attr('data-json')},"Outside")'>Print</button>
                </div>`;
    $(".view-bill .modal-dialog").html(html);
    $(".view-bill").modal('show');
})

$(document).on('click', '.showBranch', function() {
    let data = JSON.parse($(this).attr('data-json'));
    if (!$(this).closest('tr').hasClass('sub-table')) {
        if (typeof(data.department_id) != 'undefined') {
            $('.sub-table').remove();
            $('tr').removeClass('selected');
            let html = ``;
            $.each(data.details, function(inx, val) {
                html += `<tr class="sub-table" onclick="displayAllProductsListInit(${data.department_id},${val.branch_master_id})" data-deparment="${data.department_id}" data-branch="${val.branch_master_id}" >
                        <td class="showBranch" data-json='${JSON.stringify(val)}'>${inx}</td>
                        <td class="text-right">${numberWithCommas(val.details.income)}</td> 
                        <td class="text-right">${numberWithCommas(val.details.expenses)}</td>                           
                    </tr>`;
            });
            $(this).closest('tr').after(html);
            $(this).closest('tr').addClass('selected');
        } else {
            listSalaryReport('03', '2021');
        }
    }
});

function listSalaryReport(m, y) {
    let data = { "list_key": "salaryList", "salary_month": m, "salary_year": y, "department_id": "", "branch_id": "", }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "displaySalaryList" }, { "functionName": "displaySalaryList" });
}

function displaySalaryList(responce) {
    let html = ` <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Department</th>
                        <th>Branch</th>
                        <th>Consultancy Name</th>
                        <th class="text-right">Salary Amount</th>
                    </tr>
                </thead>
                <tbody>`;
    let total = 0;

    $.each(responce.result, function(i, v) {
        html += `<tr>
                    <td>${v.employee_id}</td>
                    <td>${v.employee_name}</td>
                    <td>${v.department_name}</td>
                    <td>${v.branch_name}</td>
                    <td>${v.consultancy_name}</td>                    
                    <td class="text-right">${numberWithCommas(v.salary_total)}</td>
                </tr>`;
        total += Number(v.salary_total);
    });
    html += `<tr>
                <td colspan="5" class="text-right font-weight-bolder font-size-20 text-success">Total Salary</td>
                <td class="text-right font-weight-bolder font-size-20 text-success">${numberWithCommas(total)}</td>
            </tr></tbody>`;

    $(".table-list").html(html);
}







$(document).ready(function() {
    listProduct();
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

function displayAllProductsListInit(department_id, branch_master_id) {
    let data = {
        "list_key": "getProductReport",
        "from_date": $("#from_date").val(),
        "to_date": $("#to_date").val(),
        "condition": {
            "stock_master_details.branch_master_id": branch_master_id,
            "stock_master_details.department_id": department_id
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
    html = `<thead>
        <tr>
            <th>Sr.No</th>
            <th>Bill No</th>
            <th>Date/Time</th>
            <th>From Branch</th>
            <th>To Branch</th>
            <th>Product</th>
            <th>Credit (QTY)</th>
            <th>Credit Total</th>
            <th>Debit (QTY)</th>
            <th>Debit Total</th>
        </tr>
    </thead><tbody>`
    $.each(responce.result, function(i, v) {
        html += `<tr class='${(!v.damage_images)? (v.tracking_status == '9')? "text-danger font-weight-bold": "" : "text-danger font-weight-bold"}'>
                    <td>${i+1}</td>
                    <td class="info-row" title="Info" data-toggle="modal" data-id="${v.stock_master_details_id}" data-target=".info">${v.bill_no}</td>
                    <td>${formatDate(v.stock_date)}</td>
                    <td>${(Number(v.stock_quantity_in))? v.from_branch : v.to_branch}</td>
                    <td>${(Number(v.stock_quantity_in))? v.to_branch : v.from_branch}</td>
                    <td>${(Number(v.stock_quantity_in))? " IN ": (v.damage_images)? " Damage " : (v.tracking_status == "9")? " Stock Cleared " : " OUT "  } - ${v.product_code} - ${v.product_name}</td>
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
    html += `</tbody>`;
    $(".table-list").html(html);
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