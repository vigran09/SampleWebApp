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

    // function initWebglOverlayView(map){
    //   let scene, renderer, camera, loader;
    //   const webglOverlayView = new google.maps.WebGLOverlayView();
    
    //   webglOverlayView.onAdd = () => {
    //     // Set up the scene.
    
    //     scene = new Scene();
    
    //     camera = new PerspectiveCamera();
    
    //     const ambientLight = new AmbientLight(0xffffff, 0.75); // Soft white light.
    //     scene.add(ambientLight);
    
    //     const directionalLight = new DirectionalLight(0xffffff, 0.25);
    //     directionalLight.position.set(0.5, -1, 0.5);
    //     scene.add(directionalLight);
    
    //     // Load the model.
    //     loader = new GLTFLoader();
    //     const source =
    //       "https://raw.githubusercontent.com/googlemaps/js-samples/main/assets/pin.gltf";
    //     loader.load(source, (gltf) => {
    //       gltf.scene.scale.set(7, 7, 7);
    //       gltf.scene.rotation.x = Math.PI; // Rotations are in radians.
    //       scene.add(gltf.scene);
    //     });
    //   };
    
    //   webglOverlayView.onContextRestored = ({ gl }) => {
    //     // Create the js renderer, using the
    //     // maps's WebGL rendering context.
    //     renderer = new WebGLRenderer({
    //       canvas: gl.canvas,
    //       context: gl,
    //       ...gl.getContextAttributes(),
    //     });
    //     renderer.autoClear = false;
    
    //     // Wait to move the camera until the 3D model loads.
    //     loader.manager.onLoad = () => {
    //       renderer.setAnimationLoop(() => {
    //         webglOverlayView.requestRedraw();
    //         const { tilt, heading, zoom } = mapOptions;
    //         map.moveCamera({ tilt, heading, zoom });
    
    //         // Rotate the map 360 degrees.
    //         if (mapOptions.tilt < 67.5) {
    //           mapOptions.tilt += 0.5;
    //         } else if (mapOptions.heading <= 360) {
    //           mapOptions.heading += 0.2;
    //           mapOptions.zoom -= 0.0005;
    //         } else {
    //           renderer.setAnimationLoop(null);
    //         }
    //       });
    //     };
    //   };
    
    //   webglOverlayView.onDraw = ({ gl, transformer })=> {
    //     const latLngAltitudeLiteral= {
    //       lat: 52.498013281042056,
    //       lng: 13.351595043107444,
    //       altitude: 50,
    //     };
    
    //     // Update camera matrix to ensure the model is georeferenced correctly on the map.
    //     const matrix = transformer.fromLatLngAltitude(latLngAltitudeLiteral);
    //     camera.projectionMatrix = new Matrix4().fromArray(matrix);
    
    //     webglOverlayView.requestRedraw();
    //     renderer.render(scene, camera);
    
    //     // Sometimes it is necessary to reset the GL state.
    //     renderer.resetState();
    //   };
    //   webglOverlayView.setMap(map);
    // }

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