$(document).ready(function () {
    const dictAmenities = {};
    $('input').on("click", function() {
        if ($(this).is(':checked')) {
            let key = $(this).attr('data-id')
            let value = $(this).attr('data-name')
            dictAmenities[key] = value
        } else {
          delete dictAmenities[($(this).attr('data-id'))];
        }
        $('div.amenities h4').html(Object.values(dictAmenities).join(', '));
      });
  });
