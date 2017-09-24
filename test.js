import React, {Component} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class test extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style ={styles.view1}/>
        <View style ={styles.view2}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  view1: {
    flex: 1,
    backgroundColor: 'red'
  },
  view2: {
    flex: 4,
    backgroundColor: 'green'
  },
  text: {
    fontSize: 20,
    color: 'red',
  }
})