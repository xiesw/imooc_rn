/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import HomePage from "./HomePage";
import BaseComponent from "./BaseComponent";

export default class WelcomePage extends BaseComponent {

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.navigator.resetTo({
        component: HomePage
      })
    }, 500);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.tips}>欢迎</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tips: {
    fontSize: 36,
  }
})