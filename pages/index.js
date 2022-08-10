import {useEffect, useRef} from 'react';
import {Loader} from '@googlemaps/js-api-loader';
import React from "react";
import locations from '../locations.json';

const Maps = () => {

  const googlemap = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyAqJUf7ZdKXNZO8KG8mC6VHDv-tiHy_QhI',
    });
    let map; 
    loader.load().then(() => {
      const google = window.google;
      navigator.geolocation.getCurrentPosition(success);

      function success(pos) {
        const crd = pos.coords;

        map = new google.maps.Map(googlemap.current, {
          center: {lat: crd.latitude, lng: crd.longitude},
          zoom: 13, mapId: '8ee3dc81b152ef98'
          ,fullscreenControl: false, 
          mapTypeControl: false, 
          streetViewControl: false, 
          zoomControl: false, 
        }
        );
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
             console.log("marker");           
          });
      
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
      };
      const icon = {
        url: 'https://i.imgur.com/9v6uW8U.png', 
        scaledSize: new google.maps.Size(40,40), 
        origin: new google.maps.Point(0,0), 
        anchor: new google.maps.Point(0, 0) 
    };
    });
  });
  return (
    <div id="map" ref={googlemap} />

  );
};
export default Maps;