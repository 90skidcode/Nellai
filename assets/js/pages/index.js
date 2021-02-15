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
    }
}