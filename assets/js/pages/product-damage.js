$(document).ready(function() {
    displayProductInListInit();
    $("[name='request_mode']").select2({ 'disabled': 'readonly' });
});

var button = ``;

if (userSession.employee_designation_id == '4') {
    button = `<div class="text-sm-right">
                <button type="button" data-toggle="modal" data-target=".damage" class="btn btn-danger btn-rounded waves-effect waves-light mb-2 mr-2"><i class="mdi mdi-plus mr-1"></i> Add Damage </button>
            </div>`;
}

function displayProductInListInit() {
    let data = {
        "list_key": "getRequest",
        "condition_in": { 'request_management.request_branch_id_to': userSession.branch_id, 'request_management.request_branch_id_from': userSession.branch_id },
        "condition_not_in": { 'request_management.damage_images': "0" }
    }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "displayProductInList", "param1": "product-in-list" }, { "functionName": "displayProductInList", "param1": "product-in-list" });
}

function displayProductInList(response, dataTableId) {
    var tableHeader = [{
        "data": "bill_no"
    }, {
        "data": "created_at",
        mRender: function(data, type, row) {
            return formatDate(data);
        }
    }, {
        "data": "tracking_status",
        mRender: function(data, type, row) {
            return trackingStatus(data);
        }
    }, /* EDIT */ /* DELETE */ {
        "data": "created_at",
        mRender: function(data, type, row) {
            if (userSession.employee_designation_id == '3' && row.tracking_status == '12') {
                return `<td class="text-right">
                        <a class="mr-3 text-success edit-row" title="Check Approve"  data-toggle="modal" data-target=".damage"  data-id="${row.request_code}"><i class="mdi mdi-check-decagram font-size-18"></i></a>       
                        <a class="mr-3 text-success info-row" title="Info" data-toggle="modal" data-id="${row.request_code}" data-target=".info"><i class="mdi mdi-comment-alert-outline font-size-18"></i></a>
                        <a class="text-danger delete-row" title="Delete" data-toggle="modal" data-id="${row.request_code}" data-target="#delete"><i class="mdi mdi-close font-size-14"></i></a>
                         </td>`;
            } else
                return `<td class="text-right"><a class="mr-3 text-success info-row" title="Info" data-toggle="modal" data-id="${row.request_code}" data-target=".info"><i class="mdi mdi-comment-alert-outline font-size-18"></i></a>
            </td>`;
        }
    }];
    dataTableDisplay(response.result, tableHeader, false, dataTableId, button);
}


/**
 * To detele row
 */

$(document).on('click', ".delete-row", function() {
    $("#delete .btn-delete").attr('data-detete', $(this).attr('data-id'));
});

$(document).on('click', "#delete .btn-delete", function() {
    var data = { "list_key": "deleteRequest", "request_status": "2", "request_code": $(this).attr('data-detete') }
    $("#delete").modal('hide');
    commonAjax('', 'POST', data, '', 'Record Deleted Sucessfully', '', { "functionName": "locationReload" })
});

/**
 * Add to Product
 */

$('.product-damage-add').click(function() {
    if (checkRequired('#product-damage-add')) {
        $(".product-damage-add").prop('disabled', true);
        var data = {
            "list_key": "createrequestsame",
            "request_code": $("[name='request_code']").val(),
            "damage_images": $("[name='damage_images']").val(),
            "tracking_status": (userSession.employee_designation_id == '3') ? "8" : "12",
            "request_branch_id_from": userSession.branch_id,
            "request_branch_id_to": userSession.branch_id,
            "department_id": userSession.department_id,
            "employee_id": userSession.login_username,
            "remarks": $("[name='remarks']").val(),
            "request_product_details": JSON.stringify(tableRowTOArrayOfObjects('#product-damage-table tbody tr:not(#addItem)'))
        }
        commonAjax('', 'POST', data, '.add', 'Damages Approved', '', { "functionName": "locationReload" })
        $(".product-damage-add").prop('disabled', false);
    }
});


/**
 * To Add ProductRequest
 */

$(document).on('click', '[data-target=".damage"]', function() {
    $(".product-damage-add").removeAttr('data-id');
    $(".image-prev-area").html(" ");
    $('#product-damage-add')[0].reset();
    $(".remove-row").remove();
    $(".product-damage-add").prop('disabled', false);
});

$(document).on('click', '#button-add-item', function() {
    let c = $(this).attr('count');
    $(this).attr('count', parseInt($(this).attr('count')) + 1);
    $(this).closest('table').find('#addItem').before(`<tr class="remove-row">
    <td class="text-center"><button type="button" title="Reject" class="btn btn-icon btn-outline-danger btn-lg">
    <i class="fa fa-trash"></i>
        </button></td>
    <td scope="row">
        <select name="product_code" class="form-control select2" required>${productDataList}</select>
    </td>
    <td> <input type="number" name="quantity" class="form-control text-right" required> </td>
    <input type="hidden" name="status" value="1" class="form-control text-right" > </td></tr>
`);
    $('[name="product_code"]').select2();
});


/**
 * To Edit ProductRequest
 */

$(document).on('click', ".edit-row", function() {
    $(".product-damage-add").attr('data-id', $(this).attr('data-id'));
    let data = {
        "list_key": "getRequest",
        "condition": { 'request_management.request_code': $(this).attr('data-id'), "request_branch_id_from": userSession.branch_id }
    }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "ProductRequestSetValue" });
});

/***
 * ProductRequest Set Value
 */

function ProductRequestSetValue(response) {
    $(".remove-row").remove();
    multipleSetValue(response.result, 'damage_images');
    if (response.result[0].request_product_details) {
        let requestProductDetails = JSON.parse(response.result[0].request_product_details);
        $.each(requestProductDetails, function(index, value) {
            $('#button-add-item').trigger('click');
            $.each(value, function(i, v) {
                $('tbody tr:nth-child(' + (index + 1) + ') [name="' + i + '"]').val(v).trigger("change");
            });
        })
    }
    $(".past-remarks").html("Last Remarks : " + response.result[0].remarks);
    $("[name='remarks']").val(" ");
}

/**
 * To delete a row
 */

$(document).on('click', '.btn-outline-danger', function() {
    if ($(this).closest('table').find("#button-add-item").attr('count') != '1') {
        $(this).closest('tr').remove();
        $(this).closest('table').find("#button-add-item").attr('count', parseInt($(this).closest('table').find("#button-add-item").attr('count')) - 1);
    }
});

/**
 * File Upload
 */
var uploadData = '';
$(document).ready(function() {
    uploadData = $('[name=damage_images]').val().split(",");
    $('input[type="file"]').change(function() {
        $(".product-damage-add").prop('disabled', true);
        var formData = new FormData();
        formData.append('file', $('#upload')[0].files[0]);
        let randomClass = randomString(16, 'aA');
        let html = ` <div class="col-md-3 ${randomClass}" data-val="">
                         <span class="badge-danger float-right border-radius-round position-absolute pointer remove-img" title="remove">
                             <span class="icon-holder d-none">
                                 <i class="bx bx-x"></i>
                             </span>
                         </span>
                         <img class="w-100" src="" alt="">
                         <div class="progress">
                             <div class="progress-bar progress-bar-animated bg-success" role="progressbar" style="width: 0%"></div>
                         </div>
                     </div>`;
        $(".image-prev-area").append(html);
        $(".image-prev-area").removeClass('d-none');
        readURL(this, randomClass);
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        $("." + randomClass + " .progress-bar").css({
                            width: percentComplete + "%"
                        })
                        if (percentComplete === 100) {

                        }
                    }
                }, false);
                return xhr;
            },
            url: 'https://nellaikrishnafoods.in//api/upload.php',
            type: 'POST',
            data: formData,
            success: function(data) {
                $(".product-damage-add").prop('disabled', false);
                let dataResult = JSON.parse(data);
                $("#upload").val(null);
                $("." + randomClass + " .icon-holder").removeClass('d-none');
                if (dataResult.status_code == 200) {
                    showToast(dataResult.message, 'success');
                    uploadData.push(dataResult.result);
                    $("." + randomClass).attr('data-val', dataResult.result);
                } else {
                    showToast(dataResult.message, 'error');
                }
                uploadData = uploadData.filter(function(e) { return e });
                $('[name=damage_images]').val(uploadData.toString());
            },
            error: function(data) {
                $(".product-damage-add").prop('disabled', false);
            },
            cache: false,
            contentType: false,
            processData: false
        });
    });
});

$(document).on('click', '.image-prev-area .remove-img', function() {
    var value = $(this).closest('div').attr('data-val');
    uploadData = $('[name=damage_images]').val().split(",");
    if (value) {
        uploadData = removeItemOnce(uploadData, value);
        uploadData = uploadData.filter(function(e) { return e });
        $('[name=damage_images]').val(uploadData.toString());
    }
    $(this).closest('div').remove();
    showToast("File removed successfully", 'success');
});