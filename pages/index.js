import {useEffect, useRef} from 'react';
import {Loader} from '@googlemaps/js-api-loader';
import React from "react";
import locations from '../locations.json';
 
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
    });

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

        // google.maps.event.addListener(infowindow, 'domready', () => {
        //   const someButton = document.getElementById('Test');
        //   if (someButton) {
        //     google.maps.listener.addDomListener(someButton, 'click',    
        //     () => {
        //           console.log()
        //           })
        //   }
        //  });

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