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