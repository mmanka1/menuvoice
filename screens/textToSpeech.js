import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import {getChosenMenuItem, convertTextToSpeech} from '../controller/chatBotController';
import * as Speech from 'expo-speech';
import { AntDesign } from '@expo/vector-icons'; 

const TextToSpeech = ({steps}) => {
    useEffect(() => {
        (async() => {
            if (steps.measurement_options.value == 'pack') {
                console.log('text');
                const text = `Hi, can I please order a ${steps.pack_options.value} ${steps.measurement_options.value} of ${getChosenMenuItem()}s?`
                Speech.speak(text, {
                    language: 'en',
                    pitch: 1,
                    rate: 1
                }); 
            } else {
                console.log('text');
                const text = `Hi, can I please order a ${steps.cup_options.value} ${steps.measurement_options.value} of ${getChosenMenuItem()}?`
                Speech.speak(text, {
                    language: 'en',
                    pitch: 5,
                    rate: 1
                });
            }
        })();
    }, []);
    
    return(
        <View>
            <AntDesign name="sound" size={24} color="black" />
            {
                steps.measurement_options.value == 'pack' ? <Text>Hi, can I please order a {steps.pack_options.value} {steps.measurement_options.value} of {getChosenMenuItem()}s?</Text> :
                <Text>Hi, can I please order a {steps.cup_options.value} {steps.measurement_options.value} of {getChosenMenuItem()}?</Text>
            }
        </View>
    )
}

export default TextToSpeech

