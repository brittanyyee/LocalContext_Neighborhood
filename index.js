let map;
let localContextMapView;


function initMap() {
    localContextMapView = new google.maps.localContext.LocalContextMapView({
        element: document.getElementById("map"),
        placeTypePreferences: [{
                type: "bakery",
                weight: 1
            },
            {
                type: "bank",
                weight: 1
            },
            {
                type: "cafe",
                weight: 2
            },
            {
                type: "department_store",
                weight: 1
            },
            {
                type: "drugstore",
                weight: 1
            },
            {
                type: "park",
                weight: 3
            },
            {
                type: "restaurant",
                weight: 2
            },
            {
                type: "primary_school",
                weight: 3
            },
            {
                type: "secondary_school",
                weight: 3
            },
            {
                type: "supermarket",
                weight: 2
            },
        ],
        maxPlaceCount: 24,
    });
    map = localContextMapView.map;
    map.setOptions({
        center: {
            lat: 41.48544,
            lng: -81.81556
        },
        zoom: 15,
        mapId: '7011a32f091a5cbc',
        gestureHandling: 'greedy'
    });
    const input = document.getElementById("input");
    const options = {
        types: ["address"],
        componentRestrictions: {
            country: "us",
        },
    };
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.setFields(["address_components", "geometry", "name"]);
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place || !place.geometry) {
            window.alert("No address available for that input.");
            return;
        }
        map.setOptions({
            center: place.geometry.location,
            zoom: 14,
        });
        localContextMapView.directionsOptions = {
            origin: place.geometry.location,
        };
        new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAbUlEQVR4Ae3LoQ2AMAAF0TMYPJoV2IApGIJtmIMtmIAVqutraj6IiqZpmyYoCO/08R7bXbOOHSF2Ohr0HCh00EPdwImiTgYqRgxKMowUTFiUyTKRMeNQIcdMYsGjSp6FyIoaWkmoUuLxEPzDh1xIaLFFuTyHMgAAAABJRU5ErkJggg==",
            zIndex: 30,
        });
        localContextMapView.search();
    });
}