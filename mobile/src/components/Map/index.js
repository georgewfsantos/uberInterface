import React, {useEffect, useState, useRef} from 'react';
import {Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import GeoCoder from 'react-native-geocoding';
import {getPixelSize} from '../../utils';

import Search from '../Search';
import Directions from '../Directions';
import Details from '../Details';

import markerImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';

import {
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
  Back,
} from './styles';

import {View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

GeoCoder.init('AIzaSyB6gRSYKw7Gaxr4PlA1WGjUFASzvfxmLWY');

export default function Map() {
  const [region, setRegion] = useState(null);
  const [destination, setDestination] = useState(null);
  const [duration, setDuration] = useState(null);
  const [location, setLocation] = useState(null);

  const mapViewRef = useRef();

  useEffect(() => {
    async function loadInitalPosition() {
      Geolocation.getCurrentPosition(
        async ({coords: {latitude, longitude}}) => {
          const response = await GeoCoder.from({latitude, longitude});
          const address = response.results[0].formatted_address;
          const arrival = address.substring(0, address.indexOf(','));

          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          });
          setLocation(arrival);
        }, //sucesso
        () => {}, //erro
        {
          timeout: 2000,
          enableHighAccuracy: true,
          maximumAge: 1000,
        },
      );
    }
    loadInitalPosition();
  }, []);

  function handleSelectedLocation(data, {geometry}) {
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;

    setDestination({
      latitude,
      longitude,
      title: data.structured_formatting.main_text,
    });
  }

  function handleBack() {
    setDestination(null);
  }

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        region={region}
        showsUserLocation
        loadingEnabled
        ref={mapViewRef}>
        {destination && (
          <>
            <Directions
              origin={region}
              destination={destination}
              onReady={result => {
                setDuration(Math.floor(result.duration));
                mapViewRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: getPixelSize(50),
                    left: getPixelSize(50),
                    top: getPixelSize(50),
                    bottom: getPixelSize(350),
                  },
                });
              }}
            />
            <Marker coordinate={destination} anchor={{x: 0, y: 0}}>
              <LocationBox>
                <LocationText>{destination.title}</LocationText>
              </LocationBox>
              <Image source={markerImage} />
            </Marker>

            <Marker coordinate={region} anchor={{x: 0, y: 0}}>
              <LocationBox>
                <LocationTimeBox>
                  <LocationTimeText>{duration}</LocationTimeText>
                  <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                </LocationTimeBox>
                <LocationText>{location}</LocationText>
              </LocationBox>
            </Marker>
          </>
        )}
      </MapView>
      {destination ? (
        <>
          <Back onPress={handleBack}>
            <Image source={backImage} />
          </Back>
          <Details />
        </>
      ) : (
        <Search onSelectedLocation={handleSelectedLocation} />
      )}
    </View>
  );
}
