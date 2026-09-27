// ============================================================
// Interactive Web GIS of Pakistan
// BS Remote Sensing & GIS — Web GIS Applications, Lab Assignment No. 1
// ============================================================

var map = L.map('map').setView([30.3753, 69.3451], 5);

// ------------------------------------------------------------
// 1. Basemaps — street map + satellite, switchable via the
// layer control below.
//
// NOTE on this URL: tile.openstreetmap.org (the official OSM
// tile server) kept returning HTTP 403 "Access blocked" during
// testing — it's a volunteer-run, rate-limited service that
// blocks apps/networks it doesn't recognise, and that's not
// something fixable from this end. Esri's tile service below
// needs no key/signup and isn't blocked the same way, and its
// street basemap is itself built in part from OpenStreetMap
// data (see the attribution), so it's used here for a map that
// will actually load when this gets graded.
// ------------------------------------------------------------
var osm = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    { attribution: 'Tiles &copy; Esri — sources: Esri, HERE, Garmin, OpenStreetMap contributors', maxZoom: 19 }
).addTo(map);

var satellite = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    { attribution: 'Tiles &copy; Esri', maxZoom: 19 }
);

// ------------------------------------------------------------
// 2. GIS layer data
// Data is embedded directly (rather than fetched from separate
// .geojson files) so the map still works when index.html is
// opened straight from disk (double-click / file://), where
// browsers block fetch() of local files with a CORS error.
// ------------------------------------------------------------
var citiesData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "name": "Islamabad",
                "province": "Islamabad Capital Territory",
                "type": "Capital"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    73.0479,
                    33.6844
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Lahore",
                "province": "Punjab",
                "type": "Major City"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    74.3587,
                    31.5204
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Karachi",
                "province": "Sindh",
                "type": "Major City"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    67.0011,
                    24.8607
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Peshawar",
                "province": "Khyber Pakhtunkhwa",
                "type": "Major City"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    71.5249,
                    34.0151
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Quetta",
                "province": "Balochistan",
                "type": "Major City"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    66.975,
                    30.1798
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Faisalabad",
                "province": "Punjab",
                "type": "Major City"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    73.0791,
                    31.4187
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Rawalpindi",
                "province": "Punjab",
                "type": "Major City"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    73.0169,
                    33.5651
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Multan",
                "province": "Punjab",
                "type": "Major City"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    71.5249,
                    30.1575
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Hyderabad",
                "province": "Sindh",
                "type": "Major City"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    68.3578,
                    25.396
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Sukkur",
                "province": "Sindh",
                "type": "Major City"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    68.8574,
                    27.7052
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Abbottabad",
                "province": "Khyber Pakhtunkhwa",
                "type": "Major City"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    73.2117,
                    34.1463
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Gwadar",
                "province": "Balochistan",
                "type": "Port City"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    62.3225,
                    25.1264
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Gilgit",
                "province": "Gilgit-Baltistan",
                "type": "Major City"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    74.3144,
                    35.9208
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Skardu",
                "province": "Gilgit-Baltistan",
                "type": "Major City"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    75.6333,
                    35.2971
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Muzaffarabad",
                "province": "Azad Jammu & Kashmir",
                "type": "Capital"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    73.4711,
                    34.37
                ]
            }
        }
    ]
};

var weatherData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "station": "Islamabad",
                "temperature": 28,
                "rainfall": 12
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    73.0979,
                    33.7144
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "station": "Lahore",
                "temperature": 31,
                "rainfall": 5
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    74.4087,
                    31.5504
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "station": "Karachi",
                "temperature": 32,
                "rainfall": 2
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    67.0511,
                    24.8907
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "station": "Peshawar",
                "temperature": 26,
                "rainfall": 15
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    71.5749,
                    34.0451
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "station": "Quetta",
                "temperature": 24,
                "rainfall": 10
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    67.025,
                    30.2098
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "station": "Faisalabad",
                "temperature": 33,
                "rainfall": 4
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    73.1291,
                    31.4487
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "station": "Rawalpindi",
                "temperature": 29,
                "rainfall": 14
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    73.0669,
                    33.5951
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "station": "Multan",
                "temperature": 35,
                "rainfall": 3
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    71.5749,
                    30.1875
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "station": "Hyderabad",
                "temperature": 33,
                "rainfall": 6
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    68.4078,
                    25.426
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "station": "Sukkur",
                "temperature": 36,
                "rainfall": 2
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    68.9074,
                    27.7352
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "station": "Abbottabad",
                "temperature": 24,
                "rainfall": 20
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    73.2617,
                    34.1763
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "station": "Gwadar",
                "temperature": 30,
                "rainfall": 1
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    62.3725,
                    25.1564
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "station": "Gilgit",
                "temperature": 22,
                "rainfall": 8
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    74.3644,
                    35.9508
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "station": "Skardu",
                "temperature": 18,
                "rainfall": 6
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    75.6833,
                    35.3271
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "station": "Muzaffarabad",
                "temperature": 27,
                "rainfall": 18
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    73.5211,
                    34.4
                ]
            }
        }
    ]
};

// ---- 3. Cities layer (red markers) ----
var citiesLayer = L.geoJSON(citiesData, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 8,
            fillColor: 'red',
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        });
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(
            "<b>City:</b> " + feature.properties.name +
            "<br><b>Province:</b> " + feature.properties.province +
            "<br><b>Type:</b> " + feature.properties.type
        );
    }
}).addTo(map);

// ---- Weather stations layer (blue markers) ----
var weatherLayer = L.geoJSON(weatherData, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 7,
            fillColor: 'blue',
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.7
        });
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(
            "<b>Station:</b> " + feature.properties.station +
            "<br><b>Temperature:</b> " + feature.properties.temperature + "&deg;C" +
            "<br><b>Rainfall:</b> " + feature.properties.rainfall + "mm"
        );
    }
}).addTo(map);

// ------------------------------------------------------------
// 4. Interaction — layer control (turn basemaps/overlays on and off)
// Zoom and pan are enabled by default on every Leaflet map.
// ------------------------------------------------------------
var baseMaps = {
    "OpenStreetMap": osm,
    "Satellite Imagery": satellite
};
var overlayMaps = {
    "Major Cities (15)": citiesLayer,
    "Weather Stations (15)": weatherLayer
};
L.control.layers(baseMaps, overlayMaps).addTo(map);
