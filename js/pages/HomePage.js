/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import BaseComponent from "./BaseComponent";
import PopularPage from './PopularPage'
import AsyncStorageTest from "../../AsyncStorageTest";
import MyPage from "./my/MyPage";
import SortKeyPage from "./my/SortKeyPage";

export default class HomePage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'tb_popular',
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_popular'}
            selectedTitleStyle={{color: '#2196F3'}}
            title="最热"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')}/>}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#2196F3'}]}
                                             source={require('../../res/images/ic_polular.png')}/>}
            onPress={() => this.setState({selectedTab: 'tb_popular'})}>
            <PopularPage/>
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_trending'}
            selectedTitleStyle={{color: '#2196F3'}}
            title="趋势"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')}/>}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#2196F3'}]}
                                             source={require('../../res/images/ic_trending.png')}/>}
            onPress={() => this.setState({selectedTab: 'tb_trending'})}>
            <AsyncStorageTest/>
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_favorite'}
            selectedTitleStyle={{color: '#2196F3'}}
            title="收藏"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')}/>}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#2196F3'}]}
                                             source={require('../../res/images/ic_polular.png')}/>}
            onPress={() => this.setState({selectedTab: 'tb_favorite'})}>
            <View/>
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_my'}
            selectedTitleStyle={{color: '#2196F3'}}
            title="我的"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')}/>}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#2196F3'}]}
                                             source={require('../../res/images/ic_trending.png')}/>}
            onPress={() => this.setState({selectedTab: 'tb_my'})}>
            <MyPage {...this.props}/>
          </TabNavigator.Item>
        </TabNavigator>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  page: {
    flex: 1,
    backgroundColor: '#f5fcff'
  },
  image: {
    height: 22,
    width: 22
  }
});

