import {useEffect, useRef} from 'react';
import {Loader} from '@googlemaps/js-api-loader';
import React from "react";
import locations from '../locations.json';
const Maps = ({mapObject}) => {

  const googlemap = useRef(null);
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      version: 'weekly',
    });
    let map; 
    loader.load().then(() => {
      const google = window.google;
      map = new google.maps.Map(googlemap.current, {
        center: {lat: 52.520008, lng: 13.404954},
        zoom: 13, mapId: '8ee3dc81b152ef98'
        ,fullscreenControl: false, 
        mapTypeControl: false, 
        streetViewControl: false, 
        zoomControl: false, 
      }
      );
    
    
    for (let i = 0; i < locations.places.length; i++) {
        const userPlace = locations.places[i];
        new google.maps.Marker({
          map: map,
          position: {
            lat: userPlace.latitude,
            lng: userPlace.longitude,
          },
          title: userPlace.name,
        });
      }
      function success(pos) {
        const crd = pos.coords;
      
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        map
      };
    navigator.geolocation.getCurrentPosition(success);
    
    });
  });
  return (
    <div id="map" ref={googlemap} />

  );
};
export default Maps;