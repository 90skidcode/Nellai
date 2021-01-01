$(document).ready(function() {
    $(".select2").select2();

    listCountry();
    listState($('#country').val());
    $('#country').select2().on('change', function() {
        listState($(this).val());
    })
    $('#state').select2().on('change', function() {
        listCity($(this).val());
    });

    $("#datatable-buttons").DataTable({
        lengthChange: !1,
        buttons: ["excel", "pdf"],
        "initComplete": function(settings, json) {
            $(".dataTables_filter").parent().append(`<div class="text-sm-right">
                <button type="button" data-toggle="modal" data-target=".add" class="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2"><i class="mdi mdi-plus mr-1"></i> Add Employee </button>
            </div>`);
            $(".dataTables_filter").addClass('search-box pull-left');
            $(".dataTables_filter label").addClass('position-relative').append(`<i class="bx bx-search-alt search-icon"></i>`);
            $(".dataTables_filter label input").attr('placeholder', 'Search...').removeClass('form-control-sm');
            $(".paging_simple_numbers > .pagination").addClass('pagination-rounded justify-content-end mb-2"');
            $(".dataTables_info").addClass('text-dark');
        },
        "drawCallback": function(settings) {
            $(".paging_simple_numbers > .pagination").addClass('pagination-rounded justify-content-end mb-2"');
        }
    }).buttons().container().appendTo("#datatable-buttons_wrapper .col-md-6:eq(0)");
});

$(document).on('click', '#button-add-item', function() {
    let c = $(this).attr('count');
    $(this).attr('count', parseInt($(this).attr('count')) + 1);
    $(this).closest('table').find('#addItem').before(` <tr>
    <td class="text-center"><button type="button" title="Reject" class="btn btn-icon btn-outline-danger btn-lg">
        <i class="fa fa-trash"></i>
    </button></td>
    <td scope="row">
        <input type="text" name="company_name" class="form-control">
    </td>
    <td>
        <input type="date" name="joined_date" class="form-control">
    </td>
    <td>
        <input type="date" name="relieved_date" class="form-control">
    </td>
    <td scope="row">
        <input type="text" name="company_designation" class="form-control">
    </td>
</tr>`);
});

/**
 * Add Employee
 */

$('.employee-add').click(function() {
    if (checkRequired('#employee-add')) {
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");
        if (isEmptyValue(id)) {
            // Add New
            var data = {
                "query": 'add',
                "databasename": 'employee_master',
                "values": $("#employee-add").serializeObject()
            }
            commonAjax('', 'POST', data, '#employee-add', 'Employee added successfully');
        } else {
            // Edit
            var data = {
                "query": 'update',
                "databasename": 'employee_master',
                "values": $("#employee-add").serializeObject(),
                "condition": {
                    "employee_id": id
                }
            }
            commonAjax('database.php', 'POST', data, '', 'Employee updated successfully');
        }
    }
});


/**
 * To delete a row
 */

$(document).on('click', '.btn-outline-danger', function() {
    if ($(this).closest('table').find("#button-add-item").attr('count') != '1') {
        $(this).closest('tr').remove();
        $(this).closest('table').find("#button-add-item").attr('count', parseInt($(this).closest('table').find("#button-add-item").attr('count')) - 1);
    }
})


/**
 * File Upload
 */
var uploadData = $('[name=employee_documents]').val().split(",");
$(document).ready(function() {
    uploadData = $('[name=employee_documents]').val().split(",");
    $('input[type="file"]').change(function() {
        $(".btn-save").prop('disabled', true);
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
            url: 'http://glowmedia.in/frontoffice/admin/api/upload.php',
            type: 'POST',
            data: formData,
            success: function(data) {
                $(".btn-save").prop('disabled', false);
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
                $('[name=employee_documents]').val(uploadData.toString());
            },
            error: function(data) {
                $(".btn-save").prop('disabled', false);
            },
            cache: false,
            contentType: false,
            processData: false
        });
    });
});

$(document).on('click', '.image-prev-area .remove-img', function() {
    var value = $(this).closest('div').attr('data-val');
    uploadData = $('[name=employee_documents]').val().split(",");
    if (value) {
        uploadData = removeItemOnce(uploadData, value);
        uploadData = uploadData.filter(function(e) { return e });
        $('[name=employee_documents]').val(uploadData.toString());
    }
    $(this).closest('div').remove();
    showToast("File removed successfully", 'success');
})