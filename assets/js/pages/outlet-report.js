$(document).ready(function() {
    listBranch();
    (userSession.department_id == 5 || userSession.department_id == 6) ? $('.branch').show(): $('.branch').hide();

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
    var paymentTypeAmount = {
        "Cash": 0,
        "Online": 0,
        "Amazon Pay": 0,
        "Paytm": 0,
        "Google Pay": 0,
        "PhonePe": 0,
        "Other Wallet": 0,
        "Card": 0
    }

    var paymentTypeCount = {
        "Cash": 0,
        "Online": 0,
        "Amazon Pay": 0,
        "Paytm": 0,
        "Google Pay": 0,
        "PhonePe": 0,
        "Other Wallet": 0,
        "Card": 0
    }
    let html = ``;
    let total = 0;
    let count = 0;
    $.each(response.result, function(i, v) {
        html += `<tr>
                    <td class="text-primary view-bill-details cursor-pointer" data-json='${JSON.stringify(v)}'>${v.bill_no}</td>
                    <td>${formatDate(v.created_at)}</td> 
                    <td >${v.orderby}</td>
                    <td class="text-right">${numberWithCommas(v.total)}</td>
                </tr>`;
        total += Number(v.total);
        count++;
        paymentTypeAmount[v.payment_type] += Number(v.total);
        paymentTypeCount[v.payment_type] += 1;
    });

    html += `<tr>
                    <td colspan="3"></td>
                    <td class="text-success text-right font-weight-bolder font-size-20">${numberWithCommas(total)}</td>
                </tr>`;

    $(".table-list tbody").html(html);

    let htmlPayment = ``;
    $.each(paymentTypeAmount, function(i, v) {
        htmlPayment += `<tr>
                            <td>${i}</td>
                            <td class="text-right">${paymentTypeCount[i]}</td> 
                            <td class="text-right">${numberWithCommas(v)}</td>                           
                        </tr>`;

    });



    $(".payment-type tbody").html(htmlPayment);
    $(".t-amount").text(numberWithCommas(total));
    $(".t-orders").text(count);
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