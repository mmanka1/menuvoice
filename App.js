import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import * as Location from 'expo-location';
import ChatScreen from './screens/chatScreen';
import {getNearbyRestaurant} from './controller/chatBotController';

console.disableYellowBox = true;

const App = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [restaurantName, setRestaurantName] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      if (!errorMsg) {
        if (location) {
           if (location.coords)
             var restaurantName = await getNearbyRestaurant(location.coords.latitude, location.coords.longitude);
             setRestaurantName(restaurantName)
        }
     }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {
        restaurantName !== null?
          <ChatScreen restaurantName = {restaurantName}/>:
          <></>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50
  },
});

export default App
