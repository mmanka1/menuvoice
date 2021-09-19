import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-native-chatbot-expo';
import Menu from './menu';
import TextToSpeech from './textToSpeech';

const ChatScreen = ({restaurantName}) => {
  const [chosenMenuItem, setChosenMenuItem] = useState('');
  const [steps, setSteps] = useState([
      {
        id: 'welcome_1',
        message: `You are currently at ${restaurantName}.`,
        trigger: 'welcome_2',
      },

      {
        id: 'welcome_2',
        message: 'Type a keyword(s) to choose a menu item.',
        trigger: 'search',
      }, 
      {
        id: 'search', 
        user: true,
        trigger: 'retrieve'
      },
      {
        id: 'retrieve',
        component: <Menu restaurantName = {restaurantName} onMenuItemUpdate = {setChosenMenuItem} />,
        waitAction: true,
        trigger: 'measurement_type'
      },
      {
        id: 'measurement_type',
        message: 'What is the measurement type?',
        trigger: 'measurement_options',
      },
      {
        id: 'measurement_options',
        options: [
          { value: 'cup', label: 'Cup', trigger: 'cup_message' },
          { value: 'pack', label: 'Pack', trigger: 'pack_message' },
        ],
      },

      {
        id: 'pack_message',
        message: 'Pack size?',
        trigger: 'pack_options'
      },
      {
        id: 'pack_options',
        options: [
          { value: '5', label: '5', trigger: 'text_to_speech' },
          { value: '6', label: '6', trigger: 'text_to_speech' },
          { value: '10', label: '10', trigger: 'text_to_speech' },
          { value: '12', label: '12', trigger: 'text_to_speech' },
          { value: '20', label: '20', trigger: 'text_to_speech' },
          { value: '40', label: '40', trigger: 'text_to_speech' },
          { value: '50', label: '50', trigger: 'text_to_speech' },
        ],
      },
      {
        id: 'cup_message',
        message: 'Cup size?',
        trigger: 'cup_options'
      },
      {
        id: 'cup_options',
        options: [
          { value: 'small', label: 'small', trigger: 'text_to_speech' },
          { value: 'medium', label: 'medium', trigger: 'text_to_speech' },
          { value: 'large', label: 'large', trigger: 'text_to_speech' },
        ],

      },
      {
        id: 'text_to_speech',
        component: <TextToSpeech chosenMenuItem = {chosenMenuItem} />,
        waitAction: true,
        end: true
      }
  ]);

    useEffect(() => {
        setSteps(steps.slice(-1));
        setSteps(steps => [...steps, 
          {
            id: 'text_to_speech',
            component: <TextToSpeech chosenMenuItem = {chosenMenuItem} />,
            waitAction: true,
            end: true
          }
      ])
    }, [chosenMenuItem])

    return (
      <ThemeProvider theme={theme}>
          { steps.length !== 0?
            <ChatBot 
              headerTitle="Chat"
              steps={steps} />:
            <></>
          }
        </ThemeProvider>
    );
  }

  const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#EF6C00',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#EF6C00',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
      fontSize: 30,
      fontFamily: 'Helvetica Neue',
      justifyContent: 'flex-start',
    }
  });

  export default ChatScreen
  