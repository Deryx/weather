$(function() {
	
	if (navigator.geolocation) {
		
		navigator.geolocation.getCurrentPosition(function(position) {
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;
			
			var jsonText = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=2de143494c0b295cca9337e1e96b00e0';
			$.getJSON(jsonText, function(json) {
				var measurementSystem = "imperial";
				var cityName = json.name;
				var condition = json.weather[0].main;
				var kelvin = json.main.temp;
				var windGust = json.wind.gust;
				var humidity = json.main.humidity;
				
				$('#city').html(cityName);
				$('#weather').html(condition);
				$('#humidity').html(humidity);
				
				if (condition === "Clear")
					$('body').css({'background-size': 'cover', 'background-image': 'url(images/clear.jpg)', 'background-repeat': 'no-repeat'});
				else if (condition === "Clouds")
					$('body').css({'background-size': 'cover', 'background-image': 'url(images/cloudy.jpg)', 'background-repeat': 'no-repeat'});
				else if (condition === "Rain")
					$('body').css({'background-size': 'cover', 'background-image': 'url(images/rain.jpg)', 'background-repeat': 'no-repeat'});
				else if (condition === "Snow")
					$('body').css({'background-size': 'cover', 'background-image': 'url(images/snow.jpg)', 'background-repeat': 'no-repeat'});
				else if (condition === "Extreme")
					$('body').css({'background-size': 'cover', 'background-image': 'url(images/extreme.jpg)', 'background-repeat': 'no-repeat'});
				
				var fahrenheit = ((kelvin * 9) / 5) - 459.67;
				var celsius = kelvin - 273.15;
				
				var imperialGust = windGust * 2.2369;
				var metricGust = windGust * 3.6;

				$('#temp').html(fahrenheit.toFixed() + "&#176; F");
				$('#wind').html(imperialGust.toFixed() + " mph");
				
				$('#system').on("click", function() {
					if (measurementSystem === "metric") {
						$('#system').text('to imperial');
						measurementSystem = "imperial";
						$('#temp').html(celsius.toFixed() + "&#176; C");
						$('#wind').html(metricGust.toFixed() + " kmh");
					} else {
						$('#system').text('to metric');
						measurementSystem = "metric";
						$('#temp').html(fahrenheit.toFixed() + "&#176; F");
						$('#wind').html(imperialGust.toFixed() + " mph");
					}
				});
			});
		});
	}
});