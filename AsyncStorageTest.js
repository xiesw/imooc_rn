/**
 * Created by xieshangwu on 2017/9/27.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  RefreshControl,
  AsyncStorage,
  TextInput
} from 'react-native';
import NavigationBar from "./js/common/NavigationBar";
import Toast, {DURATION} from 'react-native-easy-toast';

const Key = 'text';
export default class AsyncStorageTest extends Component {
  constructor(props) {
    super(props)
  }

  onSave() {
    AsyncStorage.setItem(Key, this.text, (error) => {
      if (!error) {
        this.toast.show('保存成功', DURATION.LENGTH_LONG);
      } else {
        this.toast.show('保存失败', DURATION.LENGTH_LONG);
      }
    })
  }

  onRemove() {
    AsyncStorage.removeItem(Key, error => {
      if (!error) {
        this.toast.show('移除成功', DURATION.LENGTH_LONG);
      } else {
        this.toast.show('移除失败', DURATION.LENGTH_LONG);
      }
    })
  }

  onFetch() {
    AsyncStorage.getItem(Key, (error, result) => {
      if (!error) {
        if(result !== '' && result !== null) {
          this.toast.show('取出成功' +  result, DURATION.LENGTH_LONG);
        } else {
          this.toast.show('取出内容不存在', DURATION.LENGTH_LONG);

        }
      } else {
        this.toast.show('取出失败', DURATION.LENGTH_LONG);
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title="AsyncStorage存储测试"
          statusBar={{
            backgroundColor: '#2196F3'
          }}
          style={{backgroundColor: '#2196F3'}}
        />
        <TextInput style={{borderWidth: 1, height: 40, margin: 6}}
                   onChangeText={text => this.text = text}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={styles.tips}
                onPress={() => this.onSave()}
          >保存</Text>
          <Text style={styles.tips}
                onPress={() => this.onRemove()}
          >移除</Text>
          <Text style={styles.tips}
                onPress={() => this.onFetch()}
          >取出</Text>
        </View>
        <Toast ref={toast => this.toast = toast}/>
      </View>
    );
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