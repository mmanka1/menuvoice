import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import {getChosenMenuItem} from '../controller/chatBotController';

const TextToSpeech = ({steps}) => {
    console.log(steps)
    return(
        <View>
            <Text>{getChosenMenuItem()}</Text>
            <Text>{steps.measurement_options.value}</Text>
            {
                steps.measurement_options.value == 'pack' ?
                    <Text>{steps.pack_options.value}</Text> :
                    <Text>{steps.cup_options.value}</Text>
            }
        </View>
    )
}

export default TextToSpeech

