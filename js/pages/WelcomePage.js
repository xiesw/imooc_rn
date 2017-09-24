/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';
import CustomerComponents, {Navigator}
  from 'react-native-deprecated-custom-components';
import NavigationBar from "../../NavigationBar";
import HomePage from "./HomePage";

export default class WelcomePage extends Component {

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.navigator.resetTo({
        component: HomePage
      })
    }, 2000);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View>
        <NavigationBar
          title={'欢迎'}/>
        <Text>欢迎</Text>
      </View>
    )

  }

}