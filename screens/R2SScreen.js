import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import * as Location from "expo-location"
import  MapView, {Marker, Polyline}  from 'react-native-maps'
import {decode} from '@mapbox/polyline'
import { GoogleDirections } from 'react-native-google-maps-directions';

const R2SScreen = (props) => {
  const [location, setLocation] = useState(null)
  const [route, setRoute] = useState([])
  const mapRef = useRef(null)
  const point2 = {
    latitude:  3.8513579263639155,
    longitude: 11.493556816130877, 
  }
  const getDirection = async (startLocaion, destinationLocation)=>{
    try {
      const key = "AIzaSyCNJXjPNJI96OQs2Qfin46-Ow7sSeXx8nA"
      let resp = await fetch (
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLocaion}&destination=${destinationLocation}&key=${key}`
      )
      console.log('papa',resp);
      let resJson = await resp.json()
      console.log('res',resJson);
      let points = decode(resJson.routes[0].overview_polyline.points)
      console.log('point', points);
      let coords = points.map((point,index)=>{
        return {
          latitude : point[0],
          longitude: point[1]
        }
      })
      return coords
    } catch (error) {
      console.log('err',error);
      return error
    }
  }
  useEffect(()=>{
    getDirection(`${location.latitude},${location.longitude}`, `${point2.latitude},${point2.longitude}`)
      .then(coords=>setRoute(coords))
      .catch(error=>console.log(error))
  },[])
  useEffect(()=>{
    (async ()=>{
      const {status} = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted'){
        alert('Permission refusé')
        return
      }

      const {coords} = await Location.getCurrentPositionAsync();
      setLocation(coords);
    })();
  },[])

  if(!location){
    return <Text> Chargement</Text>
  }
  // console.log(location);
  const goToMyLocation = ()=>{
    mapRef.current.animateToRegion(location, 3*1000)
  }

  console.log(route);
  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      ref={mapRef}
      // onRegionChange={(region)=>console.log(region)}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta:0.0922,
            longitudeDelta:0.0421
          }}
        />
        <Marker
          coordinate={{
            latitude:  3.8513579263639155,
            longitude: 11.493556816130877,
          }}
          pinColor="green"
        />
        <Marker
          coordinate={{
            latitude:  3.825619323076536,
            longitude: 11.49760091677308,
          }}
          pinColor="green"
        />
        { route.length >0 && <Polyline coordinates={route}/>}
        
        {/* <Button onPress={()=>goToMyLocation()} title="Go To My Location" /> */}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default R2SScreen;
