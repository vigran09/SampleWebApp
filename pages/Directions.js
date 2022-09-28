import React from 'react'; 
import{useEffect, useRef, Component} from 'react';
import {Loader} from '@googlemaps/js-api-loader';
import locations from '../locations.json';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";
 
   

const Maps = () => {

  const googlemap = useRef(null);
  const apiOptions = {
    apiKey: 'AIzaSyAqJUf7ZdKXNZO8KG8mC6VHDv-tiHy_QhI',
    version: "beta"
  };
  const mapOptions = {
    "zoom": 18,
    "heading": 320,
    "tilt": 47.5,
  }
  let map;
  let isAnimating = false;

  useEffect(() => {
    const loader = new Loader(apiOptions);
    loader.load().then(() => {
      LoadMap();
    AddMarkers(map);
    Directions();
    });

    function Directions(){
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer(
      {
        preserveViewport: true,
        suppressMarkers: true
    }
    );
    directionsRenderer.setMap(map);
    var start = new google.maps.Marker({
        position: {
            lat:52.498013281042056,
            lng:13.351595043107444
        },
        map: map,
      });
  
      var end = new google.maps.Marker({
        position: {
          lat: 52.49902692990726, 
          lng: 13.354799235506542
        },
        map: map,
      });

    directionsService.route({
        origin: start.position,
        destination: end.position,
        travelMode: 'WALKING'
      }, function(response, status) {
        console.log(status);
        if (status === 'OK') {
            console.log('Ok');
            new google.maps.DirectionsRenderer({
                suppressMarkers: true,
                directions: response,
                map: map,
              });
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
}

    function LoadMap(){
      const google = window.google;
      map = new google.maps.Map(googlemap.current,  {
        center: { lat: 52.498013281042056,  lng: 13.351595043107444 },
        zoom: 13,
        mapId:"d78e050a3a97c54b",
        mapTypeControl: false,
        streetViewControl: false, 
      }
      ); 
    }

    function LocateStation(marker, event){
      map.setCenter(event.latLng.lat(),event.latLng.lng());
      marker.setAnimation(google.maps.Animation.BOUNCE);
      const { tilt, heading, zoom } = mapOptions;
      map.moveCamera({tilt, heading, zoom });
      requestAnimationFrame(animateCamera);
    }

    function animateCamera(time) {
      if(isAnimating){
        map.moveCamera({
          heading: (time / 1000) * 5
        });
        requestAnimationFrame(animateCamera);
      }
    }

    function AddMarkers(){
      for (let i = 0; i < locations.places.length; i++) {
        const userPlace = locations.places[i];
        const marker = new google.maps.Marker({
          map: map,
          position: {
            lat: userPlace.latitude,
            lng: userPlace.longitude,
          },
          title: userPlace.name,
        });
        var contentBtn = '<p><button id="Test" class="ui-button">Click Me for directions!</button></p>';
        const contentString =
        '<div>' +
        '<h1>Sample Web App</h1>'+
        "<p><b>New contents to be added from JSON or CMS.....</b></p>" +
        "</div>";
        var infowindow = new google.maps.InfoWindow({
          content: contentString + contentBtn,
        });

        /* Code for mouse hover
        google.maps.event.addListener(marker, 'mouseover', function(){
          console.log("Hovered");
         });
        End */
        marker.addListener("click", event => {
          isAnimating = true;
          const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
          map.panTo(location); 
          infowindow.open({
            anchor: marker,
            map,
          });
          infowindow.addListener('closeclick', ()=>{
            isAnimating = false;
            LoadMap();
            AddMarkers(map);
          });
          LocateStation(marker, event);  
       });
      }
      const icon = {
        url: 'https://i.imgur.com/9v6uW8U.png', 
        scaledSize: new google.maps.Size(40,40), 
        origin: new google.maps.Point(0,0), 
        anchor: new google.maps.Point(0, 0) 
    };
    }
  });
  return (
    <div id="map" ref={googlemap} />
  );
};
export default Maps;