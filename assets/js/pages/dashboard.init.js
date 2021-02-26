listDashboard();
/**
 * List listDashboard
 */

function listDashboard() {
    let data = { "list_key": "getDashboardDetails" };
    commonAjax('', 'POST', data, '', '', '', { "functionName": "dashboard" });
}

function dashboard(response) {
    console.log(response);
    let res = response.result;

    $('.department-count').html(`<li class="py-1 outlet-count">${res.department[0].outlet_count} Outlet</li>
    <li class="py-1 pulverizing-count">${res.department[0].department_count} Pulverizing</li>
    <li class="py-1 kitchen-count">${res.department[0].kitchen_count} Kitchen</li>
    <li class="py-1 store-count">${res.department[0].store_count} Store</li>`);

    $('.order-count').html(`${res.orders[0].current_sales_date} <i class="mdi mdi-chevron-up ml-1 text-success"></i>`)
    $('.order-details').html(`<span class="badge badge-soft-success font-size-12"> + ${((Number(res.orders[0].current_sales_date)/Number(res.orders[0].previous_date_sales))*100)}% </span> <span class="ml-2 text-truncate">From previous Day</span>`);
    $('.revenue-count').html(`${res.revenue[0].current_sales_date} <i class="mdi mdi-chevron-up ml-1 text-success"></i>`)
    $('.revenue-details').html(`<span class="badge badge-soft-success font-size-12"> + ${((Number(res.revenue[0].current_sales_date)/Number(res.revenue[0].previous_date_sales))*100).toFixed(2)}% </span> <span class="ml-2 text-truncate">From previous Day</span>`);
    $('.average-count').html(`${res.earning[0].current_month_sales} <i class="mdi mdi-chevron-up ml-1 text-success"></i>`)
    $('.average-details').html(`<span class="badge badge-soft-success font-size-12"> + ${((Number(res.earning[0].current_month_sales)/emptySetToZero(res.earning[0].previous_month_sales))*100).toFixed(2)}% </span> <span class="ml-2 text-truncate">From previous Month</span>`);

}