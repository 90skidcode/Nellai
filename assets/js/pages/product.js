$(document).ready(function() {
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
                    <td class="text-center border-right-0 border-bottom-0">
                        <button type="button"  title="Delete" class="btn btn-icon btn-outline-danger btn-lg">
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                    <td>
                        <select class="select2 room_category" id="room_${c}_category" name="room_type" required>
                            <option  value="">Select a Room Type</option>
                        </select>
                    </td>
                    <td>
                        <input type="number" name="no_of_nights" data-getdate="current_date${c}" data-setdate="set_date${c}" autocomplete="off" required="required" data-item="no_of_night" class="no_of_night form-control text-right">
                    </td>
                    <td>
                        <input type="datetime-local" name="from_date" autocomplete="off" required="required" data-item="from_date" class="from_date current_date${c} form-control text-right">
                        <input type="datetime-local" name="to_date" tabindex="-1" autocomplete="off" readonly required="required" data-item="to_date" class="to_date set_date${c} form-control text-right">
                    </td>
                    <td>
                        <input type="number" name="no_of_rooms" autocomplete="off" required="required" data-item="no_of_rooms" class="no_of_rooms form-control text-right">
                    </td>
                    <td>
                        <input type="number" name="adults" autocomplete="off" required="required" data-item="no_of_adults" class="no_of_adults form-control text-right  float-left">
                        <input type="number" name="infant" autocomplete="off" required="required" data-item="no_of_childs" class="no_of_childs form-control text-right  float-left">
                    </td>
                    <td>
                        <input type="checkbox" name="no_extra_bed" value="0" required="required" data-item="charges_for_extra_bed" class="charges_for_extra_bed form-control text-right">
                    </td>
                    <td>
                        <input type="number" name="price" autocomplete="off" required="required" data-item="price" class="price form-control text-right">
                    </td>
                    <td>
                        <input type="number" name="discount_percentage" autocomplete="off" value="0" required="required" data-item="discount" class="discount form-control text-right">
                        <input type="text" name="discount_amount" autocomplete="off" value="0" readonly data-item="discount-amount" class="discount-amount form-control text-right">
                    </td>
                    <td>
                        <input type="text" readonly name="room_total" class="total form-control text-right border-0">
                    </td>
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