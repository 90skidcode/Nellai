$(document).ready(function() {
    $(".select2").select2();
    $("#datatable-buttons").DataTable({
        lengthChange: !1,
        buttons: ["excel", "pdf"],
        "initComplete": function(settings, json) {
            $(".dataTables_filter").parent().append(`<div class="text-sm-right">
                <button type="button" data-toggle="modal" data-target=".add" class="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2"><i class="mdi mdi-plus mr-1"></i> Add New </button>
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
    }).buttons().container().appendTo("#datatable-buttons_wrapper .col-md-6:eq(0)")
});

$(document).on('click', '#button-add-item', function() {


    let c = $(this).attr('count');
    $(this).attr('count', parseInt($(this).attr('count')) + 1);

    $(this).closest('table').find('#addItem').before(`<tr>
            <td class="text-center"><button type="button" title="Reject" class="btn btn-icon btn-outline-danger btn-lg">
                <i class="fa fa-trash"></i>
            </button></td>
            <td>
                <select class="form-control select2">
                    <option>Select</option>
                    <option value="ITE0001">ITE0001 - Rice</option>
                    <option value="ITE0002">ITE0002 - Sunflower Oil</option>
                </select>
            </td>
            <td> <select class="form-control select2">
                <option>Select</option>
                <option value="VEN0001">VEN0001 - Kumar Rice Mill</option>
                <option value="VEN0002">VEN0002 - KMS wholesale</option>
            </select></td>
            <td> <input type="number" name="" id="" class="form-control"> </td>
            <td> <input type="number" name="" id="" class="form-control"> </td>
            <td> <input type="number" name="" id="" class="form-control" readonly> </td>
        </tr>`);
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