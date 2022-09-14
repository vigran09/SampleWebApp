import {useEffect, useRef} from 'react';
import {Loader} from '@googlemaps/js-api-loader';
import React from "react";
import * as THREE from 'three';
import locations from '../locations.json';
 
const Maps = () => {

  const googlemap = useRef(null);
  const apiOptions = {
    apiKey: 'AIzaSyAqJUf7ZdKXNZO8KG8mC6VHDv-tiHy_QhI',
    version: "beta"
  };

  const mapOptions = {
    "zoom": 17,
    "center": { lat: 52.498013281042056,  lng: 13.351595043107444 },
    "fullscreenControl": false, 
    "mapTypeControl": false, 
    "streetViewControl": false, 
  }

  useEffect(() => {
    const loader = new Loader(apiOptions);
    loader.load().then(() => {
      const google = window.google;
      const map = new google.maps.Map(googlemap.current,  {
        center: { lat: 52.498013281042056,  lng: 13.351595043107444 },
        zoom: 17,
        heading: 320,
        tilt: 47.5,
        mapId:"d78e050a3a97c54b",
        mapTypeControl: false,
        streetViewControl: false, 
      }
      );   
      AddMarkers();
    });
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
        marker.addListener("click", event => {
          console.log(userPlace.name);  
          const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
          map.panTo(location);         
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