import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-native-chatbot-expo';
import Menu from './menu';

const ChatScreen = ({restaurantName}) => {
    console.log(restaurantName)
    const [steps, setSteps] = useState([]);
    const [keywords, setKeywords] = useState([]);

    useEffect(() => {
        setSteps(steps => [...steps, 
          {
            id: '0',
            message: `Welcome to ${restaurantName}.`,
            trigger: '1',
          },
          {
            id: '1',
            message: 'Type a keyword(s) relating to your order or a menu item.',
            trigger: 'search',
          }, 
          {
            id: 'search', 
            user: true,
            trigger: '3'
          },
          {
            id: '3',
            component: <Menu restaurantName = {restaurantName} />
          }
      ])
    }, [])

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
  