function checkForEnterKey(event){
	
	'use strict';
	
	if(event.keyCode === 13){
		searchWeatherData();	
	}
	
}

function getTime() {
	
	'use strict';

	var now = new Date();
	var time = [now.getDate(), (now.getMonth()+1), now.getHours(), now.getMinutes()];

	for(var i=0; i<time.length; i++){
		if(time[i]<10){
			time[i] = "0"+time[i].toString();	
		}
	}
	
	var time = time[0] + "." + time[1] + "." + now.getFullYear() + "  " + time[2] + ":" + time[3];
	return time;
	
}


function searchWeatherData(){
	
    'use strict';
	
	document.getElementById("200okay").innerHTML = "Loading...";
	document.getElementById("5XXError").innerHTML = "";

    var searchFor = document.getElementById("citysearch").value;
	
	if(searchFor === " " || searchFor === "" || searchFor === null ){
		document.getElementById("200okay").innerHTML = "";
		document.getElementById("5XXError").innerHTML = "Error: Empty Search Field";
		return;
	} else {
		sendXmlhttpRequest(searchFor);
	}

	   
}

function sendXmlhttpRequest(searchFor){
	
	'use strict';

	var url = "http://api.openweathermap.org/data/2.5/weather?q="+searchFor+"&units=metric&APPID=6f1c49057f0099faadbbfdf7e7abb50c";
    var xmlhttp = new XMLHttpRequest();
       
   xmlhttp.open("GET", url, true);
   xmlhttp.send();



      // document.getElementById("weatherData").innerHTML = "";
       
    xmlhttp.onreadystatechange = function() {
		   
		   if(xmlhttp.status === 502 || xmlhttp.status === 500){
				document.getElementById("200okay").innerHTML = "";
			   	document.getElementById("5XXError").innerHTML = "Error: City Not Found";
				return;
		   }
		   else if((xmlhttp.readyState === 0 ||xmlhttp.readyState === 1 || xmlhttp.readyState === 2|| xmlhttp.readyState === 3) && xmlhttp.status === 200){
			   document.getElementById("5XXError").innerHTML = "";
			   document.getElementById("200okay").innerHTML = "Loading...";
		   }
           else if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
               	document.getElementById("200okay").innerHTML = "";
                var data = JSON.parse(xmlhttp.responseText);
			   	displayWeatherData(data);
		   } else {
			   document.getElementById("200okay").innerHTML = "";
			   document.getElementById("5XXError").innerHTML = "Error: City Not Found";
		   }
	   }
		   
		document.getElementById("citysearch").value="";
   				   
}
	   
function displayWeatherData(data){
			
		'use strict';
	
		var cityName = data.name; 
		var cityCountry = data.sys.country; 
		var temperature = data.main.temp;
		var pressure = data.main.pressure;
		var humidity = data.main.humidity;
		var windSpeed = data.wind.speed;
		var windDirection = data.wind.deg;
		var weatherConditionName = data.weather[0].main; 
		var weatherIcon = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";

		document.getElementById("city").innerHTML = cityName+", "+cityCountry+"<br>"+getTime();
	   	document.getElementById("temperature").innerHTML = temperature+"&#8451";
	   	document.getElementById("icon").innerHTML = weatherConditionName+"<img src="+weatherIcon+">";

		document.getElementById("pressure").innerHTML="Pressure<br>"+pressure+" hPa";
		document.getElementById("humidity").innerHTML = "Humidity<br>"+humidity+"%";
		document.getElementById("windSpeed").innerHTML = "Wind Speed<br>"+windSpeed+" m/s";
	   	document.getElementById("windDirection").innerHTML = "Wind Direction<br>"+windDirection+"&deg";
	
}

function clear5XXError(){
	document.getElementById("5XXError").innerHTML = "";
}


