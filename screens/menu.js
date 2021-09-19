import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import {searchMenuItems, setChosenMenuItem} from '../controller/chatBotController';

const Menu = ({steps, triggerNextStep, restaurantName}) => {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState('');
    const [trigger, setTrigger] = useState(false);
  
    useEffect(() => {
      (async () => {
        let menuItems = await searchMenuItems(steps.search.value, restaurantName)
        if (menuItems){
          setResult(menuItems);
          setLoading(false);
        } else {
          setResult('No menu items found');
          setLoading(false);
        }
      })();
    }, [])
  
    const triggerNext = (item_name) => {
      setChosenMenuItem(item_name);
      setTrigger(true); 
      triggerNextStep();
    }
  
    return (
      <View>
        { 
          loading ? <Text>Loading..</Text> : 
          <FlatList
              keyExtractor = {(item) => item.food_name}
              data = {result}
              renderItem = {({ item }) => (
                  <ListItem 
                      id = {item.food_name} bottomDivider
                      onPress = {() => triggerNext(item.food_name)}
                      >
                      <Avatar size = 'medium' source={item.photo.thumb !== undefined ?{ uri: item.photo.thumb}: {uri: ''}} />
                      <ListItem.Content style = {{flex: 0.6}}>
                          <ListItem.Title>{item.food_name !== undefined ? item.food_name : ''}</ListItem.Title>
                          <ListItem.Subtitle>{item.brand_name !== undefined ? item.brand_name: '' }</ListItem.Subtitle>
                          <ListItem.Subtitle>{item.nf_calories !== undefined ? `${item.nf_calories} calories`: '' }</ListItem.Subtitle>
                      </ListItem.Content>
                  </ListItem>
              )}
          /> 
        }
      </View>
    );
  }

export default Menu