$(document).ready(function() {

});

$(document).on('click', '#button-add-item', function() {
    let c = $(this).attr('count');
    $(this).attr('count', parseInt($(this).attr('count')) + 1);

    $(this).closest('table').find('#addItem').before(`  <tr>
    <td class="text-center"><button type="button" title="Reject" class="btn btn-icon btn-outline-danger btn-lg">
        <i class="fa fa-trash"></i>
    </button></td>
    <td scope="row">
        <select class="form-control select2">
            <option>Select</option>
            <option value="ITE0001">ITE0001 - Veg Rice</option>
            <option value="ITE0002">ITE0002 - Non Veg Rice</option>
        </select>
    </td>
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