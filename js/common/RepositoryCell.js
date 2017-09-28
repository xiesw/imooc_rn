/**
 * Created by xieshangwu on 2017/9/26.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class RepositoryCell extends Component {
  render() {
    let data = this.props.data;
    return (
      <TouchableOpacity
        style={styles.container}
      >
        <View style={styles.cell_container}>
          <Text style={styles.title}>{data.full_name}</Text>
          <Text style={styles.desc}>{data.description}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>Author : </Text>
              <Image
                style={{height: 22, width: 22}}
                source={{uri: data.owner.avatar_url}}/>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>Stars : </Text>
              <Text>{data.stargazers_count}</Text>
            </View>
            <Image style={{height: 22, width: 22}} source={require('../../res/images/ic_star.png')}/>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 16,
    marginBottom: 3,
    color: '#212121'
  },
  desc: {
    fontSize: 14,
    marginBottom: 3,
    color: '#757575'
  },
  cell_container: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#dddddd',
    borderWidth: 0.5,
    borderRadius: 3,
    //ios
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    //android
    elevation: 2
  }
});