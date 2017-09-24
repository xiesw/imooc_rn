import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import NavigationBar from './NavigationBar';

export default class Girl extends Component {
  renderButton(image) {
    return (
    <TouchableOpacity onPress={
      ()=>{this.props.navigator.pop();}
    }>
      <Image style={{width:22, height:22,margin:5}} source={image}/>
    </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'girl'}
          style={{
            backgroundColor: '#EE6363'
          }}

          leftButton={
            this.renderButton(require('./res/images/ic_arrow_back_white_36pt.png'))
          }

          rightButton={
           this.renderButton(require('./res/images/ic_star.png'))
          }
        />
        <Text sytle={styles.tips}>I am girl</Text>
        <Text style={styles.tips}>shoudao{this.props.word}</Text>
        <Text style={styles.tips}
              onPress={() => {
                this.props.onCallBack('yi he 巧克力')
                this.props.navigator.pop()
              }}
        >回赠巧克力</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tips: {
    fontSize: 22
  }
});