import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ChatScreen from './screens/chatScreen';

export default App = () => {
  return (
    <View style={styles.container}>
      <ChatScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 75,
    marginBottom: 50,
  },
});
