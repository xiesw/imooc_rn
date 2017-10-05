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
import LanguageDao, {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";

export default class PopularPage extends BaseComponent {

  constructor(props) {
    super(props);
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.state = {
      languages: []
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.languageDao.fetch()
      .then(result => {
        this.setState({
            languages: result
          }
        )
      })
      .catch(error => {
        console.log(error);
      });
  }


  render() {
    let content = this.state.languages.length > 0 ?
      <ScrollableTabView
        tabBarBackgroundColor='#2196F3'
        tabBarInactiveTextColor='mintcream'
        tabBarActiveTextColor="white"
        tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
        renderTabBar={() => <ScrollableTabBar/>}>

        {this.state.languages.map((result, i, arr) => {
          let lan = arr[i];
          return lan.checked ? <PopularTab key={i} tabLabel={lan.name}>{lan.name}</PopularTab> : null;
        })}

      </ScrollableTabView> : null;
    return (
      <View style={styles.container}>
        <NavigationBar
          title='最热'
          statusBar={{
            backgroundColor: '#2196F3'
          }}
          style={{backgroundColor: '#2196F3'}}/>
        {content}
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
        });
        alert("dfd");
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
          enableEmptySections = {true}
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