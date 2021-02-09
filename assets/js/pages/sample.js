var lang = eval(langjson[$('#locale').val()]);
$(document).ready(function () {
    $("#myselect").change(function () {
        $("#locale").val($("#myselect").val());
        updateLanguageInfo();
    });
    updateQueryStringParameter(location.href, "language", lang);
    openDialog(false);
});

function updateLanguageInfo() {
    var language = $('#locale').val();
    $.ajax({
        type: "GET",
        url: appOptions_name + "/updateLanguageInfo",
        data: {
            "language": language
        },
        success: function (data) {
            if (language == 'ar') {
                localStorage.setItem("align", "rtl");
            } else {
                localStorage.setItem("align", "ltr");
            }
            if (localStorage.getItem('align') == 'rtl') {
                $('.theme-purple').addClass('rtl');
            }
            window.location.href = updateQueryStringParameter(location.href, "language", language);
        },
        error: function (err) {
            //console.log('error>>>>'+err);
        }
    })
}

function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
        return uri + separator + key + "=" + value;
    }
}

$(function () {
    $('#smbody').trumbowyg({
        btns: [
            ['viewHTML'],
            ['undo', 'redo'], // Only supported in Blink browsers
            ['formatting'],
            ['strong', 'em', 'del'],
            ['superscript', 'subscript'],
            ['link'],
            'table',
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
            ['unorderedList', 'orderedList'],
            ['horizontalRule'],
            ['removeformat'],
            ['fullscreen']
        ],
        autogrow: true
    });
});