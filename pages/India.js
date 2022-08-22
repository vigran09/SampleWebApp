import {useEffect, useRef} from 'react';
import {Loader} from '@googlemaps/js-api-loader';
import React from "react";
import locations from '../locationsChennai.json';

const Maps = () => {

  const googlemap = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyAqJUf7ZdKXNZO8KG8mC6VHDv-tiHy_QhI',
      version: 'weekly',
    });
    let map; 
    loader.load().then(() => {
      const google = window.google;
      map = new google.maps.Map(googlemap.current, {
        center: {lat: 12.8996,  lng: 80.2209},
        // 12.8996,80.2209
        // 52.517411641651194,13.394634445240385
        zoom: 13, mapId: '8ee3dc81b152ef98'
        ,fullscreenControl: false, 
        mapTypeControl: false, 
        streetViewControl: false, 
        zoomControl: false, 
      }
      );

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
        marker.addListener("click", () => {
          map.setZoom(16);
          map.setCenter(marker.getPosition());         
       });
      }
      const icon = {
        url: 'https://i.imgur.com/9v6uW8U.png', 
        scaledSize: new google.maps.Size(40,40), 
        origin: new google.maps.Point(0,0), 
        anchor: new google.maps.Point(0, 0) 
    };
      function success(pos) {
        const crd = pos.coords;
        const marker = new google.maps.Marker({
            map: map,
            position: {
              lat: crd.latitude,
              lng: crd.longitude,
            },
            title: "Current Location",
            icon: icon
          }); 
          marker.addListener("click", () => {
             map.setZoom(16);
             map.setCenter(marker.getPosition());          
          });
      };
    navigator.geolocation.getCurrentPosition(success);
    
    });
  });
  return (
    <div id="map" ref={googlemap} />

  );
};
export default Maps;