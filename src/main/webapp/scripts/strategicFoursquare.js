var overlays = []
var recs = []
var currPos;
var map;

var infowindow = new google.maps.InfoWindow({disableAutoPan: false})
/*
google.maps.event.addListener(marker, 'click', function() {
  infowindow.open(map, marker);
});
*/


// Sticky Options
var stickyDefaults = {
  strokeColor: "#FF0000",
  strokeOpacity: 1.0,
  strokeWeight: 0,
  fillColor: "#000000",
  fillOpacity: 1.0,
  zIndex: 0
}


function toBounds(r) {
  var swl = r.b; var swg = r.l; var nel = r.t; var neg = r.r;
  return new google.maps.LatLngBounds(new google.maps.LatLng(swl, swg), new google.maps.LatLng(nel, neg))
}

function defaultOptions(map, rectBounds) {
  return {
    strokeColor: stickyDefaults.strokeColor,
    strokeOpacity: stickyDefaults.strokeOpacity,
    strokeWeight: stickyDefaults.strokeWeight,
    fillColor: stickyDefaults.fillColor,
    fillOpacity: stickyDefaults.fillOpacity,
    map: map,
    zIndex: stickyDefaults.zIndex,
    bounds: rectBounds
  }
}

function updateOpacity(opacity) {
  stickyDefaults.fillOpacity = opacity
  updateRects()
}

function showBorders(show) {
  if (show) {
    stickyDefaults.strokeWeight = 2
  } else {
    stickyDefaults.strokeWeight = 0
  }
  updateRects()
}

function updateRects() {
  for (var i = 0; i < overlays.length; i++) {
    var bounds = overlays[i].getBounds()
    var opts = defaultOptions(map, bounds)
    overlays[i].setOptions(opts)
  }
}

function updateLocation(lat, lng) {
  if (!currPos) {
  }
}

function renderMap(rects, inRecs, pos, center, zoom, opacity, redrawOverlays) {

  if (redrawOverlays) {
  // Clear existing overlays
    for (var i = 0; i < overlays.length; i++)
      overlays[i].setMap(null)
    overlays.length = 0

    for (var i = 0; i < rects.length; i++) {
      var r = rects[i]
      var rectBounds = toBounds(r)
      var rect = new google.maps.Rectangle();

      var opts = defaultOptions(map, rectBounds)

      rect.setOptions(opts)
      google.maps.event.addListener(rect, 'click', function() {
        infowindow.close()
      });

      overlays.push(rect)
    }
  }

  // Clear existing recommendations
  for (var i = 0; i < recs.length; i++)
    recs[i].setMap(null)
  recs.length = 0

  for (var i = 0; i < inRecs.length; i++) {
    var r = inRecs[i]
    var generateMarker = function(r) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(r.lat, r.lng),
        map: map,
        icon: r.catIcon
      })
      var eventFn = function() {
        var content = document.createElement("div")
        var addLine = function(header, body, parent) {
          if (body) {
            var subdiv = document.createElement("div")
            parent.appendChild(subdiv)
            subdiv.appendChild(document.createTextNode(header + ": " + body))
          }
        }
        addLine("Name", r.name, content)
        addLine("Type", r.catName, content)
        addLine("Address", r.address, content)
        infowindow.setContent(content)
        infowindow.open(map, marker);
      }
      google.maps.event.addListener(marker, 'click', eventFn);
      recs.push(marker)
    }
    generateMarker(inRecs[i])
  }

  if (pos) {
    if (!currPos) {
      currPos = new google.maps.Marker({
        position: new google.maps.LatLng(pos[0], pos[1]),
        map: map,
        clickable: true,
        draggable: true
      })
      google.maps.event.addListener(currPos, 'dragstart', function() {
        infowindow.close()
      });
      google.maps.event.addListener(currPos, 'click', function() {
        infowindow.close()
      });
      google.maps.event.addListener(currPos, 'dragend', function() {
        var p = currPos.getPosition()
        $('#currentLatLng').val(p.lat() + ',' + p.lng()).blur()
      });
    }
    else currPos.setPosition(new google.maps.LatLng(pos[0], pos[1]))
  }

  if (center) {
    map.setZoom(zoom)
    map.panTo(new google.maps.LatLng(center[0], center[1]))
  }
}

function setupMap() {
  // TODO: cover initially, center somewhere better in case you can see past cover
  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(40, -74),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  google.maps.event.addListener(map, 'click', function() {
    infowindow.close()
  });
  google.maps.event.addListener(map, 'dragstart', function() {
    infowindow.close()
  });

}
