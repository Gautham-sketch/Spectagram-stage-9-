import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import firebase from 'firebase';

export default class DashBoardScreen extends React.Component {
  render() {
    return (
      <View
      style={{
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
      }}>
        <Text>I am Gautham ! :D</Text>
      </View>
    );
  }
}