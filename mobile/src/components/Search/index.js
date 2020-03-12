import React, {useState} from 'react';
import {Platform} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export default function Search({onSelectedLocation}) {
  const [focusedSearch, setFocusedSearch] = useState(false);
  return (
    <GooglePlacesAutocomplete
      placeholder="Para onde ?"
      placeholderTextColor="#333"
      onPress={onSelectedLocation}
      query={{
        key: 'AIzaSyB6gRSYKw7Gaxr4PlA1WGjUFASzvfxmLWY',
        language: 'pt',
      }}
      textInputProps={{
        onFocus: () => {
          setFocusedSearch(true);
        },
        onBlur: () => {
          setFocusedSearch(false);
        },
        autoCapitalize: 'none',
        autoCorrect: false,
      }}
      listViewDisplayed={focusedSearch}
      fetchDetails
      enablePoweredByContainer={false}
      styles={{
        container: {
          position: 'absolute',
          top: Platform.select({ios: 60, android: 40}),
          width: '100%',
        },
        textInputContainer: {
          flex: 1,
          backgroundColor: 'transparent',
          height: 54,
          marginHorizontal: 20,
          borderTopWidth: 0,
          borderBottomWidth: 0,
        },
        textInput: {
          height: 54,
          borderRadius: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 20,
          paddingRight: 20,
          marginTop: 0,
          marginLeft: 0,
          marginRight: 0,
          elevation: 5,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: {x: 0, y: 0},
          shadowRadius: 15,
          borderWidth: 1,
          borderColor: '#ddd',
          fontSize: 18,
        },
        listView: {
          borderWidth: 1,
          borderColor: '#ddd',
          backgroundColor: '#fff',
          marginHorizontal: 20,
          elevation: 5,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: {x: 0, y: 0},
          shadowRadius: 15,
          marginTop: 10,
        },
        description: {
          fontSize: 16,
        },
        row: {
          padding: 20,
          height: 58,
        },
      }}
    />
  );
}
