sessionStorage.clear();
$(document).on('click', '.login', function() {
    if (checkRequired('#login-form')) {
        let data = {
            "list_key": "loginMaster",
            "login_username": $("#username").val(),
            "login_password": $("#userpassword").val()
        }
        commonAjax('', 'POST', data, '', '', '', { "functionName": "login" });
    }
});

function login(res) {
    if (!res.result.length)
        showToast(res.message, 'error');
    else {
        sessionStorage.setItem("employee", JSON.stringify(res));
        $.getJSON("assets/json/menu.json", function(data) {
            let html = '';
            $.each(data, function(i, v) {
                if (v.menuid == JSON.parse(sessionStorage.getItem("employee")).result[0].employee_designation_id) {
                    window.open(v.menulink, "_self");

                }
            });
        });
    }
}