$(function () {
  const amenitiesDict = {};
  $('input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      amenitiesDict[$(this).data('id')] = $(this).data('name');
    } else if ($(this).is(':not(:checked)')) {
      delete amenitiesDict[$(this).data('id')];
    }
    $('div.amenities > h4').text(Object.values(amenitiesDict).join(', '));
    if (Object.keys(amenitiesDict).length === 0) {
      $('div.amenities > h4').html('&nbsp;');
    }
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
    if (status === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify({ }),
    success: function (data) {
      data.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      for (const room of Object.values(data)) {
        $('SECTION.places').append(
          '<article> <div class="title">' +
              '<h2>' + room.name + '</h2>' +
              '<div class="price_by_night">' + room.price_by_night + '</div> </div>' +
              '<div class="information"> <div class="max_guest">' +
              '<i class="fa fa-users fa-3x" aria-hidden="true"></i>' +
              '<br />' + room.max_guest + ' Guests' + '</div>' +
              '<div class="number_rooms">' +
              '<i class="fa fa-bed fa-3x" aria-hidden="true"></i>' +
              '<br />' + room.number_rooms + ' Bedrooms' + '</div>' +
              '<div class="number_bathrooms">' +
              '<i class="fa fa-bath fa-3x" aria-hidden="true"></i>' +
              '<br />' + room.number_bathrooms + ' Bathroom' + '</div>' +
              '</div>' + '<div class="description">' + room.description + '</div>' + '</article>'
        );
      }
    }
  });

  $('button').click(function () {
    $('.places article').remove();
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: Object.keys(amenitiesDict) }),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        data.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        for (const room of Object.values(data)) {
          $('SECTION.places').append(
            '<article> <div class="title">' +
                '<h2>' + room.name + '</h2>' +
                '<div class="price_by_night">' + room.price_by_night + '</div> </div>' +
                '<div class="information"> <div class="max_guest">' +
                '<i class="fa fa-users fa-3x" aria-hidden="true"></i>' +
                '<br />' + room.max_guest + ' Guests' + '</div>' +
                '<div class="number_rooms">' +
                '<i class="fa fa-bed fa-3x" aria-hidden="true"></i>' +
                '<br />' + room.number_rooms + ' Bedrooms' + '</div>' +
                '<div class="number_bathrooms">' +
                '<i class="fa fa-bath fa-3x" aria-hidden="true"></i>' +
                '<br />' + room.number_bathrooms + ' Bathroom' + '</div>' +
                '</div>' + '<div class="description">' + room.description + '</div>' + '</article>'
          );
        }
      }
    });
  });
});
