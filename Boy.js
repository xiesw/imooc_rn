import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Girl from './Girl';
import NavigationBar from './js/common/NavigationBar';

export default class Boy extends Component {

  constructor(props) {
    super(props);
    this.state = {
      word: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'Boy'}
          style={{
            backgroundColor: 'red',
          }}/>
        <Text style={styles.tips}
              onPress={() => {
                this.props.navigator.push({
                  component: Girl
                })
              }}>I am boy</Text>
        <Text style={styles.tips}
              onPress={() => {
                this.props.navigator.push({
                  component: Girl,
                  params: {
                    word: '一只玫瑰',
                    onCallBack: (word) => {
                      this.setState({
                        word: word
                      })
                    }
                  }
                })
              }}>送女孩一朵玫瑰</Text>
        <Text style={styles.tips}>{this.state.word}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tips: {
    fontSize: 20,
  }
});
