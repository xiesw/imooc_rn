/**
 * Created by xieshangwu on 2017/9/25.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  RefreshControl
} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import RepositoryCell from "../common/RepositoryCell";
import BaseComponent from "./BaseComponent";
import DataRepository from "../expand/dao/DataRepository";
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'

export default class PopularPage extends BaseComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title='最热'
          statusBar={{
            backgroundColor: '#2196F3'
          }}
          style={{backgroundColor: '#2196F3'}}/>
        <ScrollableTabView
          tabBarBackgroundColor='#2196F3'
          tabBarInactiveTextColor='mintcream'
          tabBarActiveTextColor="white"
          tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
          renderTabBar={() => <ScrollableTabBar/>}>
          <PopularTab tabLabel="Java">Java</PopularTab>
          <PopularTab tabLabel="iOS">iOS</PopularTab>
          <PopularTab tabLabel="Android">Android</PopularTab>
          <PopularTab tabLabel="JavaScript">JavaScript</PopularTab>
        </ScrollableTabView>
      </View>
    )
  }

}

class PopularTab extends Component {

  constructor(props) {
    super(props);
    this.dataRepositoty = new DataRepository();
    this.state = {
      result: '',
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      isLoading: false
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setState({
      isLoading: true
    });
    let url = this.getUrl(this.props.tabLabel);
    this.dataRepositoty.fetchNetRepository(url)
      .then(result => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(result.items),
          isLoading: false,
        })
      })
      .catch(error => {
        this.setState({
          result: '网络错误'
        })
      })
  }

  getUrl(key) {
    return `https://api.github.com/search/repositories?q=${key}#sort=stars`;
  }

  renderRow(data) {
    return <RepositoryCell data={data}/>
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data) => this.renderRow(data)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={() => this.loadData()}
              colors={['#2196F3']}
              thiColor={'#2196F3'}
              title={'Loading...'}
              titleColor={'#2196F3'}
            />
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tips: {
    fontSize: 29
  }
});