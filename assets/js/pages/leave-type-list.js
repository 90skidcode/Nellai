$(document).ready(function() {
    $("#datatable-buttons").DataTable({
        lengthChange: !1,
        buttons: ["excel", "pdf"],
        "initComplete": function(settings, json) {
            $(".dataTables_filter").parent().append(`<div class="text-sm-right">
                <button type="button" data-toggle="modal" data-target=".add" class="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2"><i class="mdi mdi-plus mr-1"></i> Add Leave Type </button>
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
 * Add Leave Master
 */

$('.allowence-add').click(function() {
    if (checkRequired('#allowence-add')) {
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");
        if (isEmptyValue(id)) {
            // Add New
            var data = {
                "query": 'add',
                "databasename": 'allowence_master',
                "values": $("#allowence-add").serializeObject()
            }
            commonAjax('', 'POST', data, '#allowence-add', 'Leave Master added successfully');
        } else {
            // Edit
            var data = {
                "query": 'update',
                "databasename": 'allowence_master',
                "values": $("#allowence-add").serializeObject(),
                "condition": {
                    "allowence_id": id
                }
            }
            commonAjax('database.php', 'POST', data, '', 'Leave Master updated successfully');
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
});