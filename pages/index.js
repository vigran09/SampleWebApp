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
      map.moveCamera({
        heading: (time / 1000) * 5
      });
      requestAnimationFrame(animateCamera);
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
        const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
        "sandstone rock formation in the southern part of the " +
        "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
        "south west of the nearest large town, Alice Springs; 450&#160;km " +
        "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
        "features of the Uluru - Kata Tjuta National Park. Uluru is " +
        "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
        "Aboriginal people of the area. It has many springs, waterholes, " +
        "rock caves and ancient paintings. Uluru is listed as a World " +
        "Heritage Site.</p>" +
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
        "(last visited June 22, 2009).</p>" +
        "</div>" +
        "</div>";
        var infowindow = new google.maps.InfoWindow({
          content: contentString,
        });
        marker.addListener("click", event => {
          console.log(userPlace.name);  
          const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
          map.panTo(location); 
          infowindow.open({
            anchor: marker,
            map,
          });
          infowindow.addListener('closeclick', ()=>{
            LoadMap();
            AddMarkers(map);
            map.setHeading(0);
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