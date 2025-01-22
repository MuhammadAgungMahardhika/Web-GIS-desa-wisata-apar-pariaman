<div class="card-header">
    <div class="row align-items-center">
        <div class="col-md-auto">
            <h5 class="card-title">Google Maps with Location</h5>
        </div>
        <div class="col-md-auto">
            <a id="manualLocation" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Current Location" class="btn icon btn-primary mx-1" id="current-position" onclick="currentLocation()">
                <span class="material-symbols-outlined">my_location</span>
            </a>
            <a id="currentLocation" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Set Manual Location" class="btn icon btn-primary mx-1" id="manual-position" onclick="manualLocation()">
                <span class="material-symbols-outlined">pin_drop</span>
            </a>
            <span id="legendButton">
                <a data-bs-toggle="tooltip" data-bs-placement="bottom" title="Show Legend" class="btn icon btn-primary mx-1" id="legend-map" onclick="legend();">
                    <span class="material-symbols-outlined">visibility</span>
                </a>
            </span>
            <span>
                <button id="howToReachButton" data-bs-toggle="tooltip" data-bs-placement="bottom" title="How to reach Apar" class="btn icon btn-primary mx-1" onclick="howToReachApar();">
                    <i style="height:1.72rem;width:1.5rem" class="fa-solid fa-person-walking-luggage"></i>
                </button>
            </span>

        </div>
        <div class="col-md-auto" id="weather-info">
            <span style="margin-right: 10px;">Apar, ID</span>
            <img src="http://openweathermap.org/img/wn/04d.png" alt="Weather Icon" style="margin-right: 10px; filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));">
            <span style="margin-right: 10px;" id="weatherTemp"></span>
            <span style="margin-right: 10px;" id="weatherCloud"></span>
            <span style="margin-right: 10px;" id="weatherHumidity"></span>
            <span style="margin-right: 10px;" id="weatherWind"></span>

        </div>
        <div class="col-md-auto">
            <div class="input-group">
                <label class="input-group-text" for="area_geom">Area Level</label>
                <select class="form-select" id="area_geom" onchange="changeAreaGeom()">
                    <option value="country">Country</option>
                    <option value="province" selected>Province</option>
                    <option value="city">City/Regency</option>
                    <option value="subdistrict">Sub District</option>
                    <option value="village">Tourism Village</option>
                </select>
            </div>
        </div>

    </div>
</div>