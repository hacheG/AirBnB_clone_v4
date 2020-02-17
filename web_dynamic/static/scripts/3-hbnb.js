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

    $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available')
        } else {
            $('#api_status').removeClass('available')
        }      
    });

    /*$.get('http://0.0.0.0:5001/api/v1/places_search/', function(data) {

    });*/
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify({}),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
      for(var i = 0; i < data.length; i++) {
        var place = data[i];
    $('section.places').append('<article>' +

          '<div class="title">' +

        '<h2>' + place.name + '</h2>' +

        '<div class="price_by_night">' +

             place.price_by_night  +

        '</div>' +
    '</div>' +
    '<div class="information">' +
        '<div class="max_guest">' +
            '<i class="fa fa-users fa-3x" aria-hidden="true"></i>' +

            '<br />' +

             place.max_guest + 'Guests' +

        '</div>' +
        '<div class="number_rooms">' +
            '<i class="fa fa-bed fa-3x" aria-hidden="true"></i>' +

            '<br />' +

            place.number_rooms + 'Bedrooms' +
        '</div>' +
        '<div class="number_bathrooms">' +
            '<i class="fa fa-bath fa-3x" aria-hidden="true"></i>' +

            '<br />' +

             place.number_bathrooms + 'Bathroom' +

        '</div>' +
    '</div>' +

  

    '<div class="user">' +

        '<strong>Owner:  users[' + place.user_id + '] </strong>' +

    '</div>' +
    '<div class="description">' +

         place.description  +

    '</div>' +

'</article>');
        }
      }
    });        
  });
