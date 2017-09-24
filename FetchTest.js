import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ListView,
  StyleSheet,
  RefreshControl,
  Image
} from 'react-native';
import NavigationBar from "./NavigationBar";
import HttpUtils from './HttpUtils';

export default class FetchTest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: ''
    }
  }

  onLoad(url) {
    // fetch(url)
    //   .then(response => response.json())
    //   .then(result => {
    //       this.setState({
    //         result: JSON.stringify(result)
    //       })
    //     }
    //   )
    //   .catch(error => {
    //     this.setState({
    //       result: JSON.stringify(error)
    //     })
    //   })
    HttpUtils.get(url)
      .then(result => {
        this.setState({
          result: JSON.stringify(result)
        })
      })
      .catch(error => {
        this.setState({
          result: JSON.stringify(error)
        })
      })
  }


  onSubmit(url, data) {
    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // })
    //   .then(response => response.json())
    //   .then(result => {
    //     this.setState({
    //       result: JSON.stringify(result)
    //     })
    //   })
    //   .catch(error => {
    //     this.setState({
    //       result: JSON.stringify(error)
    //     })
    //   })
    HttpUtils.post(url, data)
      .then(result => {
        this.setState({
          result: JSON.stringify(result)
        })
      })
      .catch(error => {
        this.setState({
          result: JSON.stringify(error)
        })
      })
  }

  fetchTest() {
    fetch('http://121.42.181.106:8080/examples/data/about.json').then((response) => {
      this.setState({
        result: response.json()
      });
    }).catch(() => {
      this.setState({
        result: "dff"
      })
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title="FetchTest"
        />
        <Text
          onPress={() => this.fetchTest()}
        >get获取数据</Text>

        <Text
          onPress={() => this.onSubmit('http://rapapi.org/mockjsdata/11793/submit', {
            userName: 'xiaoming',
            password: '123456'
          })}
        >post获取数据</Text>
        <Text>返回结果:{this.state.result}</Text>
      </View>
    );
  }
}

const
  styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  })