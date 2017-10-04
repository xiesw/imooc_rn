/**
 * Created by xieshangwu on 2017/9/28.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import ViewUtil from "../../util/ViewUtil";
import NavigationBar from "../../common/NavigationBar";
import LanguageDao, {FLAG_LANGUAGE} from "../../expand/dao/LanguageDao";
import CheckBox from 'react-native-check-box';
import ArrayUtils from "../../util/ArrayUtils";
import Toast, {DURATION} from 'react-native-easy-toast';


export default class CustomKeyPage extends Component {
  constructor(props) {
    super(props);
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.state = {
      dataArray: []
    };
    this.changeValues = [];
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.languageDao.fetch()
      .then(result => {
        this.setState({
            dataArray: result
          }
        )
      })
      .catch(error => {
        console.log(error);
      });
  }

  onSave() {
    if (this.changeValues.length === 0) {
      this.props.navigator.pop();
      return;
    }
    this.languageDao.save(this.state.dataArray);
    this.props.navigator.pop();
  }

  renderView() {
    if (!this.state.dataArray || this.state.dataArray.length === 0) {
      return null;
    }
    let len = this.state.dataArray.length;
    let views = [];
    for (var i = 0, l = len - 2; i < l; i += 2) {
      views.push(
        <View key={i}>
          <View style={styles.item}>
            {this.renderCheckBox(this.state.dataArray[i])}
            {this.renderCheckBox(this.state.dataArray[i + 1])}
          </View>
          <View style={styles.line}/>
        </View>
      )
    }
    views.push(
      <View key={len - 1}>
        <View style={styles.item}>
          {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]) : null}
          {this.renderCheckBox(this.state.dataArray[len - 1])}
        </View>
        <View style={styles.line}/>
      </View>
    );
    return views;
  }

  renderCheckBox(data) {
    let leftText = data.name;
    return (
      <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={() => this.onClick(data)}
                leftText={leftText}
                isChecked={data.checked}
                checkedImage={<Image style={{tintColor: '#6495ED'}}
                                     source={require('../../../res/images/ic_check_box.png')}/>}
                unCheckedImage={<Image style={{tintColor: '#6495ED'}}
                                       source={require('../../../res/images/ic_check_box_outline_blank.png')}/>}
      />
    )
  }

  onClick(data) {
    let arrs = this.state.dataArray;
    data.checked = !data.checked;
    this.setState({
      dataArray:arrs
    });
    ArrayUtils.updateArray(this.changeValues, data);
    //this.toast.show(data.name + ":" + data.checked,DURATION.LENGTH_SHORT);
  }

  onBack() {
    if(this.changeValues.length === 0){
      this.props.navigator.pop();
      return;
    }
    Alert.alert(
      '提示',
      '需要保存修改吗',
      [
        {text: 'Cancel', onPress: () => {this.props.navigator.pop();}, style: 'cancel'},
        {text: 'OK', onPress: () => this.onSave()},
      ],
      { cancelable: false }
    )
  }

  render() {
    let rightButton =
      <TouchableOpacity
        onPress={() => this.onSave()}>
        <View style={{margin: 10}}>
          <Text style={styles.title}>保存</Text>
        </View>
      </TouchableOpacity>;

    return (
      <View style={styles.container}>
        <NavigationBar
          title="自定义标签"
          style={{backgroundColor: "#2196F3"}}
          statusBar={{
            backgroundColor: '#2196F3'
          }}
          leftButton={ViewUtil.getLeftButton(() => this.onBack())}
          rightButton={rightButton}
        />

        <ScrollView>
          {this.renderView()}
        </ScrollView>
        <Toast ref={(toast) => {
          this.toast = toast}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: 'white',
  },
  line: {
    height: 0.3,
    backgroundColor: 'darkgray'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});