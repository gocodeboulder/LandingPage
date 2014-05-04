//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// leaflet.js Map
//	get url paramaters for the address serach function		 
	function getURLParameter(name) {
	    return decodeURI(
	        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,])[1]
	    );
	}

	var regionParameter = getURLParameter('region');
	var region = (regionParameter === 'undefined') ? '' : regionParameter;


	var cmAttr = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
		cmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

    var attribution = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';

//	Base Maps
	var googleLayer = new L.Google('ROADMAP');

	var mapnik = L.tileLayer(
	        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
	        , {attribution: attribution}
	)

//	Layers
	var clouds = L.tileLayer('http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png', {
	    attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
	    , opacity: 0.5
	})
	var wind = L.tileLayer('http://{s}.tile.openweathermap.org/map/wind/{z}/{x}/{y}.png', {
	    attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
	    , opacity: 0.1
	})
	var temperature = L.tileLayer('http://{s}.tile.openweathermap.org/map/temp/{z}/{x}/{y}.png', {
	    attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
	    , opacity: 0.5
	})

	var cycle = L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
	    attribution: '© OpenCycleMap contributors - © OpenStreetMap contributors'
	    , opacity: 1
	})

	var cities = new L.LayerGroup();
	  		L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.').addTo(cities),
		L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.').addTo(cities),
		L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.').addTo(cities),
		L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.').addTo(cities);

	var restaurants = new L.LayerGroup();
	    L.marker([39.69, -104.85]).bindPopup('<p>What I am reading: , Behavioural economics and public policy – FT.com, http://www.ft.com/cms/s/2/9d7d31a4-aea8-11e3-aaa6-00144feab7de.html, http://www.instapaper.com/rss/238947/i35BSjISqVKnAGF4lqMOZltq2L0, Instapaper: Unread, ,</p>A <a href="http://scottbrenner.com">fake</a> restaurant').addTo(restaurants);
	    L.marker([39.69, -105.12]).bindPopup('A fake restaurant').addTo(restaurants);

//	Create the map
	var map = L.map('map', {
           center: new L.LatLng(39.73, -104.99), zoom: 10, layers: [mapnik, cities]
	});

// center the map on user's location
	map.locate({setView: true, maxZoom: 16});


//	Create the basemaps
	var baseMaps = {
		"Mapnik": mapnik,
		"Google": googleLayer
	};

//Create the overlayed layers
	var overlayMaps = {
		"Clouds": clouds,
		"Wind": wind,
		"Cities": cities,
		"Cycle": cycle,
		"Temperature": temperature,
		"Restaurants": restaurants
	};

//	Create the layers control
	var control = L.control.layers(baseMaps, overlayMaps)
	control.addTo(map);

	//	Create the search field/control
		   new L.Control.GeoSearch({
	            provider: new L.GeoSearch.Provider.Google({
	            	region: region
	            })
	        }).addTo(map);

	//	Add the locate control
			L.control.locate({strings: {
			        title: "Show me where I am",  // title of the locate control
			        popup: "You are within {distance} {unit} from this point",  // text to appear if user clicks on circle
			        outsideMapBoundsMsg: "You seem located outside the boundaries of the map" // default message for onLocationOutsideMapBounds
			    }}).addTo(map);
