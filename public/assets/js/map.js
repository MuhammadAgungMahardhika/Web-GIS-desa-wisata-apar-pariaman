let base_url = "http://localhost:8080"; //untuk php spark serve
// let base_url = 'http://192.168.100.172:80/Codeigniter4-Framework/desa-wisata-apar-pariaman/public/' //Untuk mobile
let userPosition, userMarker, directionsRenderer, infoWindow, circle, map;
let markerArray = [];
let markerNearby;
let geomArray = [];
let geomAparArray = [];
let geomNearby;
let atData, evData, cpData, spData, wpData, fData, detailData;
let atUrl, evUrl, cpUrl, spUrl, wpUrl, fUrl, detailUrl;
let selectedShape, selectedMarker, drawingManager, dataLayer;
let mapStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

aparWeather();
function initMap() {
  showMap(); //show map , polygon, legend
  directionsRenderer = new google.maps.DirectionsRenderer(); //render route
  if (datas && url) {
    loopingAllMarker(datas, url);
  } // detail object
  mata_angin(); // mata angin compas on map
  highlightCurrentManualLocation(); //highligth when button location not clicked
  showUpcoming(); //showing upcoming
}
function showMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latApar, lng: lngApar },
    zoom: 16,
    clickableIcons: false,
    styles: mapStyles,
  });
  addAparPolygon(geomApar, "#ffffff");
  // remove unecessary button when in mobile
  if (window.location.pathname.split("/").pop() == "mobile") {
    map.setOptions({ mapTypeControl: false });
  }
}
function panTo(lat, lng) {
  map.panTo(lat, lng);
}

//show atraction gallery when url is in home
function showUpcoming() {
  $("#panel")
    .html(`<div class="card-header"><h5 class="card-title text-center">UNIQE ATRACTION</h5></div><div class="card-body">
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"></li>
            <li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" class=""></li>
        </ol>
        <div class="carousel-inner">
            <div class="carousel-item active"><img src="${base_url}/assets/images/dashboard-images/mangrove.jpg" onclick="showObject('atraction','01')" style="cursor: pointer;" width="100%"></div>
            <div class="carousel-item"><img src="${base_url}/assets/images/dashboard-images/turtle.jpg" onclick="showObject('atraction','02')" style="cursor: pointer;" width="100%"></div>
        </div>
        <a class=" carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </a>
    </div></div>`);
}
//show info on map
function showInfoOnMap(data, url) {
  const objectMarker = new google.maps.Marker({
    position: { lat: parseFloat(data.lat), lng: parseFloat(data.lng) },
    icon: checkIcon(url),
    opacity: 0.8,
    title: "info marker",
    map: map,
  });
  markerArray.push(objectMarker);
  objectMarker.addListener("click", () => {
    openInfoWindow(objectMarker, infoMarkerData(data, url));
  }); //open infowindow when click
  openInfoWindow(objectMarker, infoMarkerData(data, url));
}

function showSupportModal(data, url) {
  let id = data.id;
  $.ajax({
    url: base_url + "/" + "list_object" + "/" + url + "/" + id,
    method: "get",
    dataType: "json",
    success: function (response) {
      let no = 0;
      let data = response.objectData[0];
      let gallery = response.galleryData;
      // let menu = response.menuData
      // let product = response.productData
      $("#supportTitle").html(data.name);
      $("#supportData").html(`
                ${(() => {
                  if (data.owner) {
                    return `<tr><td class="fw-bold">owner </td><td>: ${data.owner}</td></tr>`;
                  } else {
                    return "";
                  }
                })()}
                ${(() => {
                  if (data.category) {
                    return `<tr><td class="fw-bold">category</td><td>: ${data.category}</td></tr>`;
                  } else {
                    return "";
                  }
                })()}
                ${(() => {
                  if (data.employe) {
                    return `<tr><td class="fw-bold">employe</td><td>: ${data.employe}</td></tr>`;
                  } else {
                    return "";
                  }
                })()}
                ${(() => {
                  if (data.area_size) {
                    return `<tr><td class="fw-bold">area size</td><td>: ${data.area_size} m<sup>2</sup></td></tr>`;
                  } else {
                    return "";
                  }
                })()}
                ${(() => {
                  if (data.open) {
                    return `<tr><td class="fw-bold">open</td><td>: ${data.open}</td></tr>`;
                  } else {
                    return "";
                  }
                })()}
                ${(() => {
                  if (data.close) {
                    return `<tr><td class="fw-bold">close</td><td>: ${data.close}</td></tr>`;
                  } else {
                    return "";
                  }
                })()}
                ${(() => {
                  if (data.contact_person) {
                    return `<tr><td class="fw-bold">contact</td><td>: ${data.contact_person}</td></tr>`;
                  } else {
                    return "";
                  }
                })()}
                ${(() => {
                  if (data.building_size) {
                    return `<tr><td class="fw-bold">Building</td><td>: ${data.building_size} m<sup>2</sup></td></tr>`;
                  } else {
                    return "";
                  }
                })()}
                ${(() => {
                  if (data.capacity) {
                    return `<tr><td class="fw-bold">capacity</td><td>: ${data.capacity}</td></tr>`;
                  } else {
                    return "";
                  }
                })()}
                ${(() => {
                  if (data.description) {
                    return `<tr><td class="fw-bold">description</td><td>: ${data.description}</td></tr>`;
                  } else {
                    return "";
                  }
                })()}
                `);
      if (gallery.length != 0) {
        $("#carouselSupportIndicator").html("");
        $("#carouselSupportInner").html("");
        for (i in gallery) {
          $("#carouselSupportIndicator").append(
            `<li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${no}" class="${(() => {
              if (no == 0) {
                return `active`;
              } else {
                return "";
              }
            })()}"></li>`
          );
          $("#carouselSupportInner").append(
            `<div class="carousel-item ${(() => {
              if (no == 0) {
                return `active`;
              } else {
                return "";
              }
            })()}"><img class="d-block w-100" src="${base_url}/media/photos/${
              gallery[i].url
            }" style="cursor: pointer;"></div>`
          );
          no++;
        }
      } else {
        $("#carouselSupportInner").html(
          `<div class="carousel-item text-center active">no photo found!</div>`
        );
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
    },
  });
}
//loping all marker
function loopingAllMarker(datas, url) {
  showPanelList(datas, url); // show list panel
  for (let i = 0; i < datas.length; i++) {
    addMarkerToMap(datas[i], url);
  }
}
//user manual marker
function manualLocation() {
  Swal.fire({
    text: "Select your position on map",
    icon: "success",
    showClass: { popup: "animate__animated animate__fadeInUp" },
    timer: 1200,
    confirmButtonText: "Oke",
  });

  google.maps.event.addListener(map, "click", (event) => {
    clearSlider();
    clearRadius();
    clearRoute();
    addUserMarkerToMap(event.latLng);
  });
}

// add geom on map
function addMarkerGeom(geoJson, color = null, pass = null) {
  // Construct the polygon.
  const a = { type: "Feature", geometry: geoJson };
  const geom = new google.maps.Data();
  geom.addGeoJson(a);
  geom.setStyle({
    fillColor: color,
    strokeWeight: 0.3,
    strokeColor: "#00b300",
    fillOpacity: 0.3,
    clickable: false,
  });
  if (!pass) {
    geomArray.push(geom);
  } else {
    geomNearby = geom;
  }
  geom.setMap(map);
}
// clear geom on map
function clearGeom(pass = null) {
  if (!pass) {
    for (i in geomArray) {
      geomArray[i].setMap(null);
    }
    geomArray = [];
  }
}
// clear apar geom on map
function clearAparGeom(pass = null) {
  if (geomAparArray) {
    for (i in geomAparArray) {
      geomAparArray[i].setMap(null);
      geomAparArray = null;
    }
  }
}
// Construct the polygon.
function addAparPolygon(geoJson, color, opacity) {
  const a = { type: "Feature", geometry: geoJson };
  const geom = new google.maps.Data();
  geom.addGeoJson(a);
  geom.setStyle({
    fillColor: "#00b300",
    strokeWeight: 0.5,
    strokeColor: color,
    fillOpacity: 0.1,
    clickable: false,
  });
  geomAparArray.push(geom);
  geom.setMap(map);
}

// move camera
function moveCamera(z = 16) {
  map.moveCamera({ zoom: z });
}
// add callroute
function calcRoute(lat, lng) {
  let destinationCord = { lat: lat, lng: lng };
  let directionsService = new google.maps.DirectionsService();
  if (!userPosition) {
    Swal.fire({
      text: "Please determine your position first!",
      icon: "warning",
      showClass: {
        popup: "animate__animated animate__fadeInUp",
      },
      timer: 1500,
      confirmButtonText: "Oke",
    });
    return setTimeout(() => {
      $("#currentLocation").addClass("highligth");
      $("#manualLocation").addClass("highligth");
      setTimeout(() => {
        $("#currentLocation").removeClass("highligth");
        $("#manualLocation").removeClass("highligth");
      }, 1000);
    }, 1400);
  }
  var request = {
    origin: userPosition,
    destination: destinationCord,
    travelMode: "WALKING",
  };

  directionsService.route(request, function (response, status) {
    if (status == "OK") {
      directionsRenderer.setMap(map);
      directionsRenderer.setDirections(response);
    } else {
      return Swal.fire({
        text: "Sorry, Cannot recognize your rute! :( ",
        icon: "error",
        confirmButtonText: "Oke",
      });
    }
  });
  //Show detail rute at element you want
  // display.setPanel(document.getElementById());
}
// clear route
function clearRoute() {
  if (directionsRenderer) {
    return directionsRenderer.setMap(null);
  }
}
//check object marker icon
function checkIcon(icon) {
  if (icon == "apar") {
    return (icon = { url: base_url + "/assets/images/marker-icon/focus.png" });
  }
  if (icon == "atraction") {
    return (icon = {
      url: base_url + "/assets/images/marker-icon/marker-atraction.png",
    });
  }
  if (icon == "event") {
    return (icon = {
      url: base_url + "/assets/images/marker-icon/marker_ev.png",
    });
  }
  if (icon == "culinary_place") {
    return (icon = {
      url: base_url + "/assets/images/marker-icon/marker_cp.png",
    });
  }
  if (icon == "worship_place") {
    return (icon = {
      url: base_url + "/assets/images/marker-icon/marker_wp.png",
    });
  }
  if (icon == "souvenir_place") {
    return (icon = {
      url: base_url + "/assets/images/marker-icon/marker_sp.png",
    });
  }
  if (icon == "facility") {
    return (icon = { url: base_url + "/assets/images/marker-icon/f.png" });
  }
}

function infoMarkerData(data, url) {
  let id = data.id;
  let name = data.name;
  let category = data.category;
  let dateStart = data.date_start;
  // let dateEnd = data.date_end
  let lat = data.lat;
  let lng = data.lng;
  let infoMarker;

  if (window.location.pathname.split("/").pop() == "mobile") {
    infoMarker = `<div class="text-center mb-1">${name}</div>${(() => {
      if (url == "event") {
        return `<div class="text-center mb-1"><i class="fa fa-calendar"></i> ${dateStart}</div>`;
      } else {
        return "";
      }
    })()}${(() => {
      if (url == "atraction") {
        return `<div class="text-center mb-1">${category}</div>`;
      } else {
        return "";
      }
    })()}<div class="col-md text-center" id="infoWindowDiv" >${(() => {
      if (url == "event" || url == "atraction") {
        return `<a role ="button" title ="route here" class="btn btn-outline-primary" onclick ="calcRoute(${lat},${lng})"> <i class ="fa fa-road"> </i></a>`;
      } else {
        return "";
      }
    })()}</div>`;
  } else {
    infoMarker = `<div class="text-center mb-1">${name}</div>${(() => {
      if (url != "atraction") {
        return `<div class="text-center"><button title="detail" onclick="showSupportModal(${JSON.stringify(
          data
        )
          .split('"')
          .join("&quot;")},${JSON.stringify(url)
          .split('"')
          .join(
            "&quot;"
          )})" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#supportModal"><i class="fa fa-eye fa-xs"></i></button></div>`;
      } else {
        return "";
      }
    })()}${(() => {
      if (url == "event") {
        return `<div class="text-center mb-1"><i class="fa fa-calendar"></i> ${dateStart}</div>`;
      } else {
        return "";
      }
    })()}${(() => {
      if (url == "atraction") {
        return `<div class="text-center mb-1">${category}</div>`;
      } else {
        return "";
      }
    })()}<div class="col-md text-center" id="infoWindowDiv" >${(() => {
      if (url == "event" || url == "atraction") {
        return `<a role ="button" title ="route here" class="btn btn-outline-primary" onclick ="calcRoute(${lat},${lng})"> <i class ="fa fa-road"> </i></a > <a href="${base_url}/detail_object/${url}/${id}" target="_blank" role="button" class="btn btn-outline-primary" title="detail information"> <i class="fa fa-info"></i></a>`;
      } else {
        return "";
      }
    })()} ${(() => {
      if (url == "atraction" || url == "event") {
        return `<a onclick = "setNearby(${JSON.stringify(data)
          .split('"')
          .join("&quot;")},${JSON.stringify(url)
          .split('"')
          .join(
            "&quot;"
          )})" target="_blank" role = "button" class="btn btn-outline-primary" title="object arround you"><i class="fa fa-compass"></i></a >`;
      } else {
        return "";
      }
    })()} </div>`;
  }
  return infoMarker;
}

// show list panel
function showPanelList(datas, url) {
  $("#panel").css("max-height", "40vh");
  let listPanel = [];
  // if object is empty
  if (datas.length == 0) {
    listPanel.push(
      `<tr colspan="3"><td></td><td class="text-center">object not found!</td><td></td></tr>`
    );
  }
  for (let i = 0; i < datas.length; i++) {
    let data = datas[i];
    let id = datas[i].id;
    let name = datas[i].name;
    let lat = datas[i].lat;
    let lng = datas[i].lng;
    listPanel.push(
      `<tr><td>${i + 1}</td><td>${name} ${(() => {
        if (url == "event") {
          return `<br>${data.date_start}`;
        } else {
          return "";
        }
      })()}</td><td class="text-center"><button title="info on map" onclick="showInfoOnMap(${JSON.stringify(
        data
      )
        .split('"')
        .join("&quot;")},${JSON.stringify(url)
        .split('"')
        .join(
          "&quot;"
        )})" class="btn btn-primary btn-sm"><i class="fa fa-info fa-xs"></i></button> <button title="route" onclick="calcRoute(${lat},${lng})" class="btn btn-primary btn-sm"><i class="fa fa-road fa-xs"></i></button>${(() => {
        if (url != "atraction" && url != "event") {
          return ` <button title="detail" onclick="showSupportModal(${JSON.stringify(
            data
          )
            .split('"')
            .join("&quot;")},${JSON.stringify(url)
            .split('"')
            .join(
              "&quot;"
            )})" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#supportModal"><i class="fa fa-eye fa-xs"></i></button>`;
        } else {
          return "";
        }
      })()}</td></tr>`
    );
  }
  listPanel = listPanel.join("");
  if (url == "atraction") {
    $("#panel").html(
      `<div class="card-header"><h5 class="card-title text-center">Atraction</h5></div><div class="card-body"><table class="table table-border overflow-auto" width="100%"><thead><tr><th>#</th><th>Name</th><th class="text-center">Action</th></tr></thead><tbody id="tbody">${listPanel}</tbody></table></div>`
    );
  }
  if (url == "event") {
    $("#panel").html(
      `<div class="card-header"><h5 class="card-title text-center">List event</h5></div><div class="card-body"><table class="table table-border overflow-auto" width="100%"><thead><tr><th>#</th><th>Name</th><th class="text-center">Action</th></tr></thead><tbody id="tbody">${listPanel}</tbody></table></div>`
    );
  }
  if (url == "culinary_place") {
    $("#panel").append(
      `<div class="card-header"><h5 class="card-title text-center">List culinary place</h5></div><div class="card-body"><table class="table table-border overflow-auto shadow" width="100%"><thead><tr><th>#</th><th>Name</th><th class="text-center">Action</th></tr></thead><tbody id="tbody">${listPanel}</tbody></table></div>`
    );
  }
  if (url == "souvenir_place") {
    $("#panel").append(
      `<div class="card-header"><h5 class="card-title text-center">List souvenir place</h5></div><div class="card-body"><table class="table table-border overflow-auto shadow" width="100%"><thead><tr><th>#</th><th>Name</th><th class="text-center">Action</th></tr></thead><tbody id="tbody">${listPanel}</tbody></table></div>`
    );
  }
  if (url == "worship_place") {
    $("#panel").append(
      `<div class="card-header"><h5 class="card-title text-center">List worship place</h5></div><div class="card-body"><table class="table table-border overflow-auto shadow" width="100%"><thead><tr><th>#</th><th>Name</th><th class="text-center">Action</th></tr></thead><tbody id="tbody">${listPanel}</tbody></table></div>`
    );
  }
  if (url == "facility") {
    $("#panel").append(
      `<div class="card-header"><h5 class="card-title text-center">List facility</h5></div><div class="card-body"><table class="table table-border overflow-auto shadow" width="100%"><thead><tr><th>#</th><th>Name</th><th class="text-center">Action</th></tr></thead><tbody id="tbody">${listPanel}</tbody></table></div>`
    );
  }
}

// add Object Marker on Map
function addMarkerToMap(data, url = null, pass = null) {
  let lat = parseFloat(data.lat);
  let lng = parseFloat(data.lng);
  let geoJSON, color;
  let anim;

  if (!pass) {
    anim = google.maps.Animation.DROP;
  } else {
    anim = null;
  }
  const objectMarker = new google.maps.Marker({
    position: { lat: lat, lng: lng },
    icon: checkIcon(url),
    opacity: 0.8,
    title: "info object",
    animation: anim,
    map: map,
  });
  // add geom to map
  if (data.geoJSON) {
    geoJSON = JSON.parse(data.geoJSON);
    if (url == "atraction") {
      color = "#C45A55";
    }
    if (url == "event") {
      color = "#8EFFCD";
    }
    if (url == "culinary_place") {
      color = "#FA786D";
    }
    if (url == "souvenir_place") {
      color = "#ED90C4";
    }
    if (url == "worship_place") {
      color = "#42CB6F";
    }
    if (url == "facility") {
      color = "#3f76f2";
    }
  }
  if (!pass) {
    markerArray.push(objectMarker);
    addMarkerGeom(geoJSON, color);
  } else {
    markerNearby = objectMarker;
    addMarkerGeom(geoJSON, color, "pass");
  }
  objectMarker.addListener("click", () => {
    if (window.location.pathname.split("/").pop() == "list_object") {
      openInfoWindow(objectMarker, infoMarkerData(data, url));
    } else if (window.location.pathname.split("/").pop() == "mobile") {
      openInfoWindow(objectMarker, infoMarkerData(data, url));
    } else {
      openInfoWindow(objectMarker, data.name);
    }
  });
}
// clear object marker on map
function clearMarker(pass = null) {
  for (i in markerArray) {
    markerArray[i].setMap(null);
  }
  markerArray = [];
  clearGeom();
  if (!pass) {
    clearMarkerNearby();
  }
}
function clearMarkerNearby() {
  if (markerNearby) {
    markerNearby.setMap(null);
    markerNearby = null;
  }
  if (geomNearby) {
    geomNearby.setMap(null);
    geomNearby = null;
  }
}

//open infowindow
function openInfoWindow(marker, content = "Info Window") {
  if (infoWindow != null) {
    infoWindow.close();
  }
  infoWindow = new google.maps.InfoWindow({ content: content });
  infoWindow.open({ anchor: marker, map, shouldFocus: false });
}
//close infowindow
function clearInfoWindow() {
  if (infoWindow) {
    infoWindow.close();
  }
}
//CurrentLocation on Map
function currentLocation() {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        clearRadius();
        clearRoute();
        addUserMarkerToMap(pos);
        userPosition = pos;
        panTo(userPosition);
      },
      () => {
        handleLocationError(true, currentWindow, map.getCenter());
      }
    );
  } else {
    handleLocationError(false, currentWindow, map.getCenter());
  } // Browser doesn't support Geolocation
}
//Browser doesn't support Geolocation
function handleLocationError(browserHasGeolocation, currentWindow, pos) {
  currentWindow.setPosition(pos);
  currentWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  currentWindow.open(map);
}
// Add user marker
function addUserMarkerToMap(location) {
  if (userMarker) {
    userPosition = location;
    userMarker.setPosition(userPosition);
  } else {
    userPosition = location;
    userMarker = new google.maps.Marker({
      position: userPosition,
      opacity: 0.8,
      title: "your location",
      animation: google.maps.Animation.DROP,
      draggable: false,
      map: map,
    });

    content = `Your Location <div class="text-center"></div>`;
    userMarker.addListener("click", () => {
      openInfoWindow(userMarker, content);
    });
  }
}
// delete user marker
function clearUser() {
  if (userMarker) {
    userMarker.setMap(null);
    userMarker = null;
  }
}

// fit zoom to radius
function boundToRadius(userPosition, rad) {
  let userBound = new google.maps.LatLng(userPosition);
  const radiusCircle = new google.maps.Circle({
    center: userBound,
    radius: Number(rad),
  });
  map.fitBounds(radiusCircle.getBounds());
}
//function radius
function radius(radius = null) {
  if (circle) {
    circle.setMap(null);
  }
  circle = new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.4,
    strokeWeight: 1.5,
    fillColor: "#FF0000",
    fillOpacity: 0.15,
    map: map,
    center: userPosition,
    radius: radius,
  });
  boundToRadius(userPosition, radius);
}

function clearRadius() {
  if (circle) {
    return circle.setMap(null);
  }
}
function clearSlider() {
  $("#atSlider").val("0");
  $("#evSlider").val("0");
  $("#atSliderVal").html("0" + " m");
  $("#evSliderVal").html("0" + " m");
  $("#radiusSlider").val("0");
  $("#sliderVal").html("0" + " m");
}
function setMainSliderToZero() {
  $("#atSliderVal").html("0" + " m");
  $("#atSlider").val("0");
  $("#evSliderVal").html("0" + " m");
  $("#evSlider").val("0");
}
function mainNearby(val, object) {
  if (!userMarker) {
    Swal.fire({
      text: "Please determine your position first!",
      icon: "warning",
      showClass: {
        popup: "animate__animated animate__fadeInUp",
      },
      timer: 1500,
      confirmButtonText: "Oke",
    });
    return setMainSliderToZero();
  }
  hideObjectArroundPanel();
  let distance = parseInt(val);
  const url = "list_object/search_main_nearby";
  $.ajax({
    url: base_url + "/" + url + "/" + distance,
    method: "get",
    data: { main: object, lng: userPosition.lng, lat: userPosition.lat },
    dataType: "json",
    success: function (response) {
      if (response) {
        if (response.atData && response.atUrl) {
          atData = response.atData;
          atUrl = response.atUrl;
          $("#atSliderVal").html(distance + " m");
          radius(distance);
          clearMarker();
          clearRoute();
          activeMenu("atraction");
          return loopingAllMarker(atData, atUrl);
        }
        if (response.evData && response.evUrl) {
          evData = response.evData;
          evUrl = response.evUrl;
          $("#evSliderVal").html(distance + " m");
          radius(distance);
          clearMarker();
          clearRoute();
          activeMenu("event");
          return loopingAllMarker(evData, evUrl);
        }
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
    },
  });
}

function setSupportSliderToZero() {
  $("#sliderVal").html("0" + " m");
  $("#radiusSlider").val("0");
}
//function slidervalue
function supportNearby(val = null) {
  let distance = parseFloat(val);
  let cp = $("#cpCheck").prop("checked") == true;
  let wp = $("#wpCheck").prop("checked") == true;
  let sp = $("#spCheck").prop("checked") == true;
  let f = $("#fCheck").prop("checked") == true;
  $("#panel").html("");
  clearRadius();
  clearRoute();
  clearMarker("pass");
  if (cp == false && wp == false && sp == false && f == false) {
    Swal.fire({
      position: "top-end",
      text: "Please check the box!",
      icon: "warning",
      showClass: { popup: "animate__animated animate__fadeInDown" },
      timer: 1200,
      confirmButtonText: "Oke",
    });
    return setSupportSliderToZero();
  }
  const url = "list_object/search_support_nearby";
  $.ajax({
    url: base_url + "/" + url + "/" + distance,
    method: "get",
    data: {
      cp: cp,
      wp: wp,
      sp: sp,
      f: f,
      lng: userPosition.lng,
      lat: userPosition.lat,
    },
    dataType: "json",
    success: function (response) {
      if (response) {
        // Add support marker
        if (response.cpData && response.cpUrl) {
          cpData = response.cpData;
          cpUrl = response.cpUrl;
          loopingAllMarker(cpData, cpUrl);
        }
        if (response.spData && response.spUrl) {
          spData = response.spData;
          spUrl = response.spUrl;
          loopingAllMarker(spData, spUrl);
        }
        if (response.wpData && response.wpUrl) {
          wpData = response.wpData;
          wpUrl = response.wpUrl;
          loopingAllMarker(wpData, wpUrl);
        }
        if (response.fData && response.fUrl) {
          fData = response.fData;
          fUrl = response.fUrl;
          loopingAllMarker(fData, fUrl);
        }
        radius(distance);
        let pos = new google.maps.LatLng(userPosition.lat, userPosition.lng);
        panTo(pos);
        $("#sliderVal").html(distance + " m");
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
    },
  });
}
function setNearby(data, url) {
  userPosition = { lat: parseFloat(data.lat), lng: parseFloat(data.lng) };
  let pos = new google.maps.LatLng(parseFloat(data.lat), userPosition.lng);
  panTo(pos);
  setSupportSliderToZero();
  setMainSliderToZero();
  clearUser();
  clearRoute();
  clearMarker();
  clearRadius();
  showObjectArroundPanel();
  return addMarkerToMap(data, url, "pass");
}
// add mata angin
function mata_angin() {
  const legendIcon = `${base_url}/assets/images/marker-icon/`;
  const centerControlDiv = document.createElement("div");
  centerControlDiv.style.marginLeft = "10px";
  centerControlDiv.style.marginBottom = "-10px";
  centerControlDiv.innerHTML = `<div class="mb-4"><img src="${legendIcon}mata_angin.png" width="25"></img><div>`;
  map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(centerControlDiv);
}

//add legend to map
function legend() {
  const legendIcon = `${base_url}/assets/images/marker-icon/`;
  $("#legendButton").empty();
  $("#legendButton").append(
    '<a data-bs-toggle="tooltip" data-bs-placement="bottom" title="Hide Legend" class="btn icon btn-primary mx-1" id="legend-map" onclick="hideLegend()"><span class="material-symbols-outlined">visibility_off</span></a>'
  );

  let legend = document.createElement("div");
  legend.id = "legendPanel";
  let content = [];
  content.push('<h6 class="text-center">Legend</h6>');
  content.push(
    `<p><img src="https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png" width="15"></img> User</p>`
  );
  content.push(
    `<p><img src="${legendIcon}marker-atraction.png" width="15"></img> Atraction</p>`
  );
  // content.push(`<p><img src="${legendIcon}marker_ev.png" width="15"></img> Event</p>`)
  content.push(
    `<p><img src="${legendIcon}marker_cp.png" width="15"></img> Culinary place</p>`
  );
  content.push(
    `<p><img src="${legendIcon}marker_wp.png" width="15"></img> Worship place</p>`
  );
  content.push(
    `<p><img src="${legendIcon}marker_sp.png" width="15"></img> Souvenir place</p>`
  );
  content.push(
    `<p><img src="${legendIcon}f.png" width="15"></img> Facility</p>`
  );
  legend.innerHTML = content.join("");
  legend.index = 1;
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(legend);
}
//Hide legend
function hideLegend() {
  $("#legendPanel").remove();
  $("#legendButton").empty();
  $("#legendButton").append(
    '<a data-bs-toggle="tooltip" data-bs-placement="bottom" title="show legend" class="btn icon btn-primary mx-1" id="legend"  onclick="legend()"><span class="material-symbols-outlined">visibility</span></a>'
  );
}
// highlight current and manual location before click the button
function highlightCurrentManualLocation() {
  google.maps.event.addListener(map, "click", (event) => {
    if (userPosition == null) {
      $("#currentLocation").addClass("highligth");
      $("#manualLocation").addClass("highligth");
      setTimeout(() => {
        $("#currentLocation").removeClass("highligth");
        $("#manualLocation").removeClass("highligth");
      }, 400);
    }
  });
}
function showObjectArroundPanel() {
  $("#panel").html("");
  $("#rowObjectArround").css("display", "block");
  $("#cpCheck").prop("checked", false);
  $("#wpCheck").prop("checked", false);
  $("#spCheck").prop("checked", false);
  $("#fCheck").prop("checked", false);
  $("#sliderVal").val("0");
}
function hideObjectArroundPanel() {
  $("#rowObjectArround").css("display", "none");
}
// search fitur, show list object on map
function showObject(object, id = null) {
  let url;
  if (id != null) {
    url = base_url + "/" + "list_object" + "/" + object + "/" + id;
  } else {
    url = base_url + "/" + "list_object" + "/" + object;
  }

  $.ajax({
    url: url,
    method: "get",
    dataType: "json",
    success: function (response) {
      moveCamera();
      panTo({ lat: latApar, lng: lngApar });
      $("#rowObjectArround").css("display", "none");
      clearMarker();
      clearRadius();
      clearRoute();
      if (response.objectData && response.url) {
        if (response.objectData[0].id == "01") {
          activeMenu("mangrove");
        } else if (response.objectData[0].id == "02") {
          activeMenu("turtle");
        }
        return loopingAllMarker(response.objectData, response.url);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
    },
  });
}
// set object name with ajax when sidemenu by name is clicked
function setObjectByName(object) {
  $.ajax({
    url: base_url + "/" + "list_object" + "/" + object,
    method: "get",
    dataType: "json",
    success: function (response) {
      let listObject = [];
      let url = response.url;
      if (url == "atraction") {
        atData = response.objectData;
        for (let i = 0; i < atData.length; i++) {
          let name = atData[i].name;
          listObject.push(`<option>${name}</option>`);
        }
        return $("#basicSelect").html(
          `<option value="">Select ${url}</option>${listObject}`
        );
      } else if (url == "event") {
        evData = response.objectData;
        for (let i = 0; i < evData.length; i++) {
          let name = evData[i].name;
          listObject.push(`<option>${name}</option>`);
        }
        return $("#basicSelect2").html(
          `<option value="">Select ${url}</option>${listObject}`
        );
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
    },
  });
}
// search fitur, Show object on map by name
function getObjectByName(val = null, url) {
  let name = val;
  if (!name) {
    return;
  }

  let urlNow;
  if (url == "atraction") {
    urlNow = "atraction_by_name";
  } else if (url == "event") {
    urlNow = "event_by_name";
  }

  $("#rowObjectArround").css("display", "none");
  $.ajax({
    url: base_url + "/" + "list_object" + "/" + urlNow + "/" + name,
    method: "get",
    dataType: "json",
    success: function (response) {
      panTo({ lat: latApar, lng: lngApar });
      clearMarker();
      clearRadius();
      clearRoute();
      loopingAllMarker(response.objectData, response.url);
      if (url == "atraction") {
        activeMenu("atraction");
      } else if (url == "event") {
        activeMenu("event");
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
    },
  });
}
// search fitur, show object on map by rate
function getObjectByRate(val, url) {
  let urlNow;
  $("#rowObjectArround").css("display", "none");
  if (url == "atraction") {
    urlNow = "atraction_by_rate";
  } else if (url == "event") {
    urlNow = "event_by_rate";
  }

  $.ajax({
    url: base_url + "/" + "list_object" + "/" + urlNow + "/" + val,
    method: "get",
    dataType: "json",
    success: function (response) {
      panTo({ lat: latApar, lng: lngApar });
      clearMarker();
      clearRadius();
      clearRoute();
      loopingAllMarker(response.objectData, response.url);
      if (url == "atraction") {
        setStar(val);
        activeMenu("atraction");
      } else if (url == "event") {
        setStar2(val);
        activeMenu("event");
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
    },
  });
}
// Set star by user input
function setStar(star) {
  switch (star) {
    case "1":
      $("#star-1").addClass("star-checked");
      $("#star-2,#star-3,#star-4,#star-5").removeClass("star-checked");
      break;
    case "2":
      $("#star-1,#star-2").addClass("star-checked");
      $("#star-3,#star-4,#star-5").removeClass("star-checked");
      break;
    case "3":
      $("#star-1,#star-2,#star-3").addClass("star-checked");
      $("#star-4,#star-5").removeClass("star-checked");
      break;
    case "4":
      $("#star-1,#star-2,#star-3,#star-4").addClass("star-checked");
      $("#star-5").removeClass("star-checked");
      break;
    case "5":
      $("#star-1,#star-2,#star-3,#star-4,#star-5").addClass("star-checked");
      break;
  }
}

// Set star by user input
function setStar2(star) {
  switch (star) {
    case "1":
      $("#sstar-1").addClass("star-checked");
      $("#sstar-2,#sstar-3,#sstar-4,#sstar-5").removeClass("star-checked");
      break;
    case "2":
      $("#sstar-1,#sstar-2").addClass("star-checked");
      $("#sstar-3,#sstar-4,#sstar-5").removeClass("star-checked");
      break;
    case "3":
      $("#sstar-1,#sstar-2,#sstar-3").addClass("star-checked");
      $("#sstar-4,#sstar-5").removeClass("star-checked");
      break;
    case "4":
      $("#sstar-1,#sstar-2,#sstar-3,#sstar-4").addClass("star-checked");
      $("#sstar-5").removeClass("star-checked");
      break;
    case "5":
      $("#sstar-1,#sstar-2,#sstar-3,#sstar-4,#sstar-5").addClass(
        "star-checked"
      );
      break;
  }
}
function removeAllStar() {
  return $(
    "#sstar-1,#sstar-2,#sstar-3,#sstar-4,#sstar-5,#star-1,#star-2,#star-3,#star-4,#star-5"
  ).removeClass("star-checked");
}

function setRating(user_id, object_id, val, url) {
  let urlN = base_url + "/" + "review" + "/" + url;
  let data = { user_id: user_id, rating: val };
  if (url == "atraction") {
    data.atraction_id = object_id;
  } else if (url == "event") {
    data.event_id = object_id;
  }
  $.ajax({
    url: urlN,
    method: "post",
    data: data,
    dataType: "json",
    success: function (response) {
      if (response) {
        let text;
        currentObjectRating();
        setStar(val);
        if (val <= 3) {
          text = "Thanks for rated , We will imporove it!";
        } else {
          text = "Thanks for rated, Hope you enjoy it!";
        }
        return Swal.fire({
          text: text,
          icon: "success",
          showClass: { popup: "animate__animated animate__fadeInUp" },
          timer: 5000,
          confirmButtonText: "Oke",
        });
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
    },
  });
}

//  set object category with ajax when sidemenu by category is clicked
function setObjectByCategory() {
  $.ajax({
    url: base_url + "/" + "list_object" + "/" + "atraction_by_category",
    method: "get",
    dataType: "json",
    success: function (response) {
      let listObject = [];
      atData = response.objectData;
      for (i in atData) {
        let category = atData[i].category;
        listObject.push(`<option>${category}</option>`);
      }
      return $("#categorySelect").html(
        `<option value="">Select category </option>${listObject}`
      );
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
    },
  });
}
// search fitur, Show object on map by name
function getObjectByCategory(val = null) {
  let category = val;
  if (!category) {
    return;
  }
  $("#rowObjectArround").css("display", "none");
  $.ajax({
    url:
      base_url +
      "/" +
      "list_object" +
      "/" +
      "atraction_by_category" +
      "/" +
      category,
    method: "get",
    dataType: "json",
    success: function (response) {
      panTo({ lat: latApar, lng: lngApar });
      clearMarker();
      clearRadius();
      clearRoute();
      activeMenu("atraction");
      loopingAllMarker(response.objectData, response.url);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
    },
  });
}
// search fitur, Show event on map by date
function getObjectByDate(date_start = null, date_end = null) {
  $("#rowObjectArround").css("display", "none");
  let date_1 = $("#date_1").val();
  let date_2 = $("#date_2").val();

  if (date_start && date_end) {
    console.log(date_start);
    date_1 = date_start;
    date_2 = date_end;
  }

  if (date_1 && date_2) {
    $.ajax({
      url:
        base_url +
        "/" +
        "list_object" +
        "/" +
        "event_by_date" +
        "/" +
        date_1 +
        "/" +
        date_2,
      method: "get",
      dataType: "json",
      success: function (response) {
        panTo({ lat: latApar, lng: lngApar });
        clearMarker();
        clearRadius();
        clearRoute();
        activeMenu("event");
        loopingAllMarker(response.objectData, response.url);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
      },
    });
  }
}
function activeMenu(url) {
  $("#indexMenu").removeClass("active");
  $("#mangroveMenu").removeClass("active");
  $("#turtleMenu").removeClass("active");
  $("#adminMenu").removeClass("active");
  if (url == "index") {
    $("#indexMenu").addClass("active");
  } else if (url == "mangrove") {
    $("#mangroveMenu").addClass("active");
  } else if (url == "turtle") {
    $("#turtleMenu").addClass("active");
  } else if (url == "admin") {
    $("#adminMenu").addClass("active");
  }
}

//---------------------------------------------admin drawing manager------------------------------------------------
// Remove selected shape on maps
function clearGeomArea() {
  document.getElementById("geo-json").value = "";
  if (selectedShape) {
    selectedShape.setMap(null);
    selectedShape = null;
  } else {
    clearGeom();
  }
}

// Initialize drawing manager on maps
function initDrawingManager(url = null) {
  drawingManager = new google.maps.drawing.DrawingManager();
  let color;
  if (url == "atraction") {
    color = "#C45A55";
  }
  if (url == "event") {
    color = "#8EFFCD";
  }
  if (url == "culinary_place") {
    color = "#FA786D";
  }
  if (url == "souvenir_place") {
    color = "#ED90C4";
  }
  if (url == "worship_place") {
    color = "#42CB6F";
  }
  if (url == "facility") {
    color = "#3b6af9";
  }
  const drawingManagerOpts = {
    // drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.MARKER,
        google.maps.drawing.OverlayType.POLYGON,
      ],
    },
    markerOptions: { icon: checkIcon(url) },
    polygonOptions: {
      fillColor: color,
      strokeWeight: 2,
      strokeColor: color,
      editable: true,
    },
    map: map,
  };
  drawingManager.setOptions(drawingManagerOpts);
  if (url) {
    google.maps.event.addListener(
      drawingManager,
      "overlaycomplete",
      function (event) {
        switch (event.type) {
          case google.maps.drawing.OverlayType.MARKER:
            drawingMarker = event;
            setMarker(event.overlay, url);
            break;
          case google.maps.drawing.OverlayType.POLYGON:
            setPolygon(event.overlay);
            break;
        }
      }
    );
  }
}

function setMarker(shape, url = null) {
  let lat = shape.getPosition().lat().toFixed(8);
  let lng = shape.getPosition().lng().toFixed(8);
  //clear marker
  for (i in markerArray) {
    markerArray[i].setMap(null);
  }
  if (selectedMarker) {
    selectedMarker.setMap(null);
    selectedMarker = null;
  }
  selectedMarker = shape;
  document.getElementById("latitude").value = lat;
  document.getElementById("longitude").value = lng;
}

// Construct the polygon.
function addAreaPolygon(geoJson, color, clear = true) {
  if (clear) {
    clearAreaGeom();
  }
  // Load GeoJSON.
  map.data.addGeoJson(geoJson);
  map.data.setStyle({
    fillColor: "#00b300",
    strokeWeight: 0.5,
    strokeColor: color,
    fillOpacity: 0.1,
    clickable: false,
  });
  var bounds = new google.maps.LatLngBounds();

  // Loop through features
  map.data.forEach(function (feature) {
    var geo = feature.getGeometry();

    geo.forEachLatLng(function (LatLng) {
      bounds.extend(LatLng);
    });
  });
  map.fitBounds(bounds);
}

// clear Apar geom on map
function clearAreaGeom() {
  if (map.data) {
    map.data.forEach(function (feature) {
      map.data.remove(feature);
    });
  }
}
function changeAreaGeom() {
  let areaLevel = $("#area_geom").val();
  if (areaLevel == "country") {
    addAreaPolygon(indonesiaGeom, "#000000");
  } else if (areaLevel == "province") {
    addAreaPolygon(sumbarGeom, "#000000");
  } else if (areaLevel == "city") {
    addAreaPolygon(pariamanGeom, "#000000");
  } else if (areaLevel == "subdistric") {
    addAreaPolygon(kecamatanParianganGeom, "#000000");
  } else {
    let latlng = new google.maps.LatLng(latApar, lngApar);
    map.setCenter(latlng);
    map.panTo(latlng);
    moveCamera(15);
  }
}

function setPolygon(shape) {
  clearGeom();
  if (selectedShape) {
    selectedShape.setMap(null);
    selectedShape = null;
  }
  selectedShape = shape;
  dataLayer = new google.maps.Data();
  dataLayer.add(
    new google.maps.Data.Feature({
      geometry: new google.maps.Data.Polygon([
        selectedShape.getPath().getArray(),
      ]),
    })
  );
  dataLayer.toGeoJson(function (object) {
    document.getElementById("geo-json").value = JSON.stringify(
      object.features[0].geometry
    );
  });
}

// weather
function aparWeather() {
  const apiWeather = "2390a9743ed947a7ab68238ae3039af1";
  const lat = latApar;
  const lng = lngApar;

  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiWeather}`,
    method: "get",
    dataType: "json",
    success: function (response) {
      let data = response;

      const tempInCelsius = (data.main.temp - 273.15).toFixed(2); // Konversi dari Kelvin ke Celsius
      const weatherDescription = data.weather[0].description;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

      console.log(
        tempInCelsius,
        weatherDescription,
        humidity,
        windSpeed,
        iconUrl
      );
      // Mengupdate elemen HTML

      document.getElementById("weatherTemp").textContent = `${tempInCelsius}°C`;
      document.getElementById("weatherCloud").textContent =
        weatherDescription.charAt(0).toUpperCase() +
        weatherDescription.slice(1);
      document.getElementById(
        "weatherHumidity"
      ).textContent = `Humidity: ${humidity}%`;
      document.getElementById(
        "weatherWind"
      ).textContent = `Wind: ${windSpeed} m/s`;
      document.querySelector("#weather-info img").src = iconUrl;
    },
    error: function (err) {},
  });
}

// how to reach

// how to reach
let overlays = [];
let airplaneMarkers = [];
let carMarkers = [];

function clearTextOverlay() {
  // Loop through all overlays and remove them from the map
  for (let i = 0; i < overlays.length; i++) {
    overlays[i].setMap(null); // Remove overlay from map
  }
  overlays = []; // Clear the array
}
function clearAirplaneMarkers() {
  for (i in airplaneMarkers) {
    airplaneMarkers[i].setMap(null);
  }
  airplaneMarkers = [];
}
function clearCarMarkers() {
  for (i in carMarkers) {
    carMarkers[i].setMap(null);
  }
  carMarkers = [];
}
function howToReachApar() {
  clearAirplaneMarkers();
  clearCarMarkers();
  clearTextOverlay();
  clearMarker();
  clearRoute();
  clearRadius();

  // objectMarker("SUM01", -0.52210813, 100.49432448);

  // Coordinates
  const singapore = { lat: 1.2854190117401771, lng: 103.8198 }; // Singapore
  const malaysia = { lat: 3.1503614007038454, lng: 101.97940881384584 }; // Kuala Lumpur
  const jakarta = { lat: -6.204170461185947, lng: 106.82277186754867 }; // Jakarta
  const padang = { lat: -0.9478502987473912, lng: 100.3628232695202 }; // Padang
  const bandaAceh = { lat: 5.537368838813003, lng: 95.50780215398227 }; // Banda Aceh
  const nagariSumpu = { lat: latApar, lng: lngApar }; // Apar

  // Animate flight
  function animateFlight(map, fromLatLng, toLatLng) {
    const airplaneIcon = {
      url: base_url + "/media/icon/airplane.png", // Airplane icon path
      scaledSize: new google.maps.Size(60, 60), // Icon size
      anchor: new google.maps.Point(25, 25), // Center the icon
    };

    const airplaneMarker = new google.maps.Marker({
      position: fromLatLng,
      map: map,
      icon: airplaneIcon,
      title: "Flight",
    });

    airplaneMarkers.push(airplaneMarker); // Store marker for later clearing

    let step = 0;
    const totalSteps = 100; // Number of animation steps
    const interval = setInterval(() => {
      if (step <= totalSteps) {
        const lat =
          fromLatLng.lat +
          (toLatLng.lat - fromLatLng.lat) * (step / totalSteps);
        const lng =
          fromLatLng.lng +
          (toLatLng.lng - fromLatLng.lng) * (step / totalSteps);
        const newPosition = { lat, lng };
        airplaneMarker.setPosition(newPosition);
        step++;
      } else {
        clearInterval(interval); // Stop animation when complete
      }
    }, 50); // Animation speed (50ms per step)
  }

  // Animate car
  function animateCar(map, fromLatLng, toLatLng) {
    const carIcon = {
      url: base_url + "/media/icon/car.png", // Airplane icon path
      scaledSize: new google.maps.Size(50, 50), // Icon size
      anchor: new google.maps.Point(20, 20), // Center the icon
    };

    const carMarker = new google.maps.Marker({
      position: fromLatLng,
      map: map,
      icon: carIcon,
      title: "Car Journey",
      zIndex: 1000,
    });
    carMarkers.push(carMarker); // Store marker for later clearing

    let step = 0;
    const totalSteps = 100;
    const interval = setInterval(() => {
      if (step <= totalSteps) {
        const lat =
          fromLatLng.lat +
          (toLatLng.lat - fromLatLng.lat) * (step / totalSteps);
        const lng =
          fromLatLng.lng +
          (toLatLng.lng - fromLatLng.lng) * (step / totalSteps);
        const newPosition = { lat, lng };
        carMarker.setPosition(newPosition);
        step++;
      } else {
        clearInterval(interval);
      }
    }, 50);
  }

  // Add text overlays
  function createTextOverlay(map, position, steps) {
    const overlay = new google.maps.OverlayView();

    overlay.onAdd = function () {
      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style.fontSize = "14px";
      div.style.fontWeight = "bold";
      div.style.color = "#4a2f13";
      div.style.backgroundColor = "#ffe6cc";
      div.style.padding = "10px";
      div.style.borderRadius = "5px";
      div.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.3)";
      div.style.zIndex = "9999";
      div.innerHTML = steps;

      const panes = this.getPanes();
      panes.overlayLayer.appendChild(div);

      this.draw = function () {
        const projection = this.getProjection();
        const positionPixel = projection.fromLatLngToDivPixel(position);
        div.style.left = `${positionPixel.x}px`;
        div.style.top = `${positionPixel.y}px`;
      };

      overlay.div = div; // Simpan referensi ke elemen DOM
    };

    overlay.onRemove = function () {
      if (overlay.div) {
        overlay.div.parentNode.removeChild(overlay.div);
        overlay.div = null;
      }
    };

    overlay.setMap(map);
    overlays.push(overlay); // Simpan overlay dalam array
    return overlay;
  }

  // Map animations
  animateFlight(map, singapore, padang);
  animateFlight(map, malaysia, padang);
  animateCar(map, bandaAceh, nagariSumpu);
  animateFlight(map, jakarta, padang);

  setTimeout(() => {
    animateCar(map, padang, nagariSumpu);
  }, 6000); // Delay of 6 seconds before car animation

  // Add overlays
  createTextOverlay(
    map,
    singapore,
    `
    <div style="display: flex; align-items: center;">
      
      <div>
        <b>From Singapore <img src="${base_url}/media/icon/singapore.png" alt="Singapore Flag" style="width: 24px; height: 16px; margin-right: 4px;">(SIN):</b><br>
        1. Take a flight from Singapore (SIN) to Padang (PDG), Indonesia.<br>
        2. Rent a car or take a taxi to Apar.
      </div>
    </div>
  `
  );

  createTextOverlay(
    map,
    malaysia,
    `
    <div style="display: flex; align-items: center;">
      
      <div>
        <b>From Kuala Lumpur <img src="${base_url}/media/icon/malaysia.png" alt="Malaysia Flag" style="width: 24px; height: 16px; margin-right: 4px;">(KUL):</b><br>
        1. Take a flight from Kuala Lumpur (KUL) to Padang (PDG), Indonesia.<br>
        2. Rent a car or take a taxi to Apar.
      </div>
    </div>
  `
  );

  createTextOverlay(
    map,
    jakarta,
    `
    <div style="display: flex; align-items: center;">
      
      <div>
        <b>From Jakarta <img src="${base_url}/media/icon/indonesia.png" alt="Indonesia Flag" style="width: 24px; height: 16px; margin-right: 4px;">:</b><br>
        1. Take a domestic flight to Padang (PDG), Indonesia.<br>
        2. Rent a car or take a taxi to Apar.
      </div>
    </div>
  `
  );

  createTextOverlay(
    map,
    bandaAceh,
    `
    <div style="display: flex; align-items: center;">      
      <div>
        <b>From anywhere in Sumatra <img src="${base_url}/media/icon/indonesia.png" alt="Indonesia Flag" style="width: 24px; height: 16px; margin-right: 4px;">:</b><br>
        1. Travel by land directly to Apar.<br>
        2. Alternatively, fly to Padang (PDG) and take a car or taxi to Apar.
      </div>
    </div>
  `
  );
  map.setZoom(6);

  setTimeout(function () {
    clearAirplaneMarkers();
    clearCarMarkers();
    clearTextOverlay();
  }, 18000);
}
