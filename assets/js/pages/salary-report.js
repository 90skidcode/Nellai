$(document).ready(function() {
    listDepartment();
    $("[name='department_id']").select2().on('change', function() {
        listBranch();
        setTimeout(function() {
            $("[name='branch_id']").val('').trigger('change');
        }, 1000);
    });
    listConsultancy();
    setTimeout(function() {
        $("[name='department_id']").val('').trigger('change');
        $("[name='employee_type']").val('').trigger('change');
    }, 1000);



    var d = new Date();
    var m = (d.getMonth() + 1).toString().padStart(2, '0');
    var y = d.getFullYear();
    var ym = y + "-" + m;
    $('[name="month"]').val(ym);
    listSalaryReport(m, y);
});

function listSalaryReport(m, y) {
    let data = { "list_key": "salaryList", "salary_month": m, "salary_year": y, "department_id": "", "branch_id": "", }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "displaySalaryList" }, { "functionName": "displaySalaryList" });
}

function displaySalaryList(responce) {
    let html = '';
    let total = 0;
    $.each(responce.result, function(i, v) {
        html += `<tr>
                    <td>${v.employee_id}</td>
                    <td>${v.employee_name}</td>
                    <td>${v.department_name}</td>
                    <td>${v.branch_name}</td>
                    <td class="text-right">${numberWithCommas(v.salary_total)}</td>
                </tr>`;
        total += Number(v.salary_total);
    });
    html += `<tr>
                <td colspan="4" class="text-right font-weight-bolder">Total Salary</td>
                <td class="text-right font-weight-bolder font-size-20">${numberWithCommas(total)}</td>
            </tr>`;

    $("#table-salary-list tbody").html(html);
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
    }, 1000);
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

/**
 * List Employee in select 2
 */

function listConsultancy() {
    let data = {
        "query": 'fetch',
        "databasename": 'consultancy_master',
        "column": {
            "consultancy_master_id": "consultancy_master_id",
            "consultancy_name": "consultancy_name"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "[name='employee_type']", "param2": "consultancy_name", "param3": "consultancy_master_id" }, { "functionName": "listSelect2", "param1": "[name='employee_type']", "param2": "consultancy_name", "param3": "consultancy_master_id" })
}

$(document).on("click", ".search", function() {
    let date = $('[name="month"]').val().split("-");
    let data = { "list_key": "salaryList", "salary_month": date[1], "salary_year": date[0], "condition": { "employee_master.branch_id": $('[name="branch_id"]').val(), "employee_master.department_id": $('[name="department_id"]').val(), "employee_master.employee_type": "1", "employee_master.status": $('[name="employee_type"]').val() } }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "displaySalaryList" }, { "functionName": "displaySalaryList" });

});