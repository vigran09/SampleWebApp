import {useEffect, useRef} from 'react';
import {Loader} from '@googlemaps/js-api-loader';
import React from "react";
import locations from '../locationsChennai.json';

const Maps = () => {

  const googlemap = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyAqJUf7ZdKXNZO8KG8mC6VHDv-tiHy_QhI',
    });
    let map; 
    loader.load().then(() => {
      const google = window.google;
      map = new google.maps.Map(googlemap.current, {
        center: {lat: 12.8996,  lng: 80.2209},
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
      //   marker.addListener("click", () => {
      //     console.log(userPlace.name);  
      //     map.setZoom(16);
      //     map.setCenter(marker.getPosition());         
      //  });
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
      function success(pos) {
        const crd = pos.coords;
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        const marker = new google.maps.Marker({
            map: map,
            position: {
              lat: crd.latitude,
              lng: crd.longitude,
            },
            title: "Current Location",
            icon: icon,
            animation:google.maps.Animation.BOUNCE,
          }); 
          marker.addListener("click", () => {
             console.log("Current Location"); 
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