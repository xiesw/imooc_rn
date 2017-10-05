/**
 * Created by xieshangwu on 2017/10/4.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  TouchableHighlight,
} from 'react-native';
import NavigationBar from "../../common/NavigationBar";
import LanguageDao, {FLAG_LANGUAGE} from "../../expand/dao/LanguageDao";
import ArrayUtils from "../../util/ArrayUtils";
import SortableListView from 'react-native-sortable-listview';
import ViewUtil from "../../util/ViewUtil";

export default class SortKeyPage extends Component {
  constructor(props) {
    super(props);
    this.dataArray = [];
    this.sortResultArray = [];
    this.originalCheckedArray = [];
    this.state = {
      checkedArray: [],
    }
  }

  componentDidMount() {
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.loadData();
  }

  loadData() {
    this.languageDao.fetch()
      .then(result => {
        this.getCheckedItems(result);
      })
      .catch(error => {

      });
  }

  getCheckedItems(result) {
    this.dataArray = result;
    let checkedArray = result.filter((item, index, arr) => {
      return item.checked;
    });
    this.setState({
      checkedArray: checkedArray
    });
    this.originalCheckedArray = ArrayUtils.clone(checkedArray);
  }

  onBack() {
    if (ArrayUtils.isEuqal(this.originalCheckedArray, this.state.checkedArray)) {
      this.props.navigator.pop();
      return;
    }
    Alert.alert(
      '提示',
      '需要保存修改吗',
      [
        {
          text: 'Cancel', onPress: () => {
          this.props.navigator.pop();
        }, style: 'cancel'
        },
        {text: 'OK', onPress: () => this.onSave()},
      ],
      {cancelable: false}
    )
  }

  onSave() {
    if (ArrayUtils.isEuqal(this.originalCheckedArray, this.state.checkedArray)) {
      this.props.navigator.pop();
    } else {
      this.getSortResult();
      this.languageDao.save(this.sortResultArray);
      this.props.navigator.pop();
    }
  }

  getSortResult() {
    this.sortResultArray = ArrayUtils.clone(this.dataArray);
    for (let i = 0, len = this.originalCheckedArray.length; i < len; i++) {
      let item = this.originalCheckedArray[i];
      let index = this.dataArray.indexOf(item);
      this.sortResultArray.splice(index, 1, this.state.checkedArray[i]);
    }
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
          title="排序"
          style={{backgroundColor: "#2196F3"}}
          statusBar={{
            backgroundColor: '#2196F3'
          }}
          leftButton={ViewUtil.getLeftButton(() => this.onBack())}
          rightButton={rightButton}
        />
        <SortableListView
          style={{flex: 1}}
          data={this.state.checkedArray}
          order={Object.keys((this.state.checkedArray))}

          onRowMoved={e => {
            this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
            this.forceUpdate()
          }}
          renderRow={row => <SortCell data={row}/>}
        />
      </View>
    );
  }
}

class SortCell extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        style={styles.item}
        {...this.props.sortHandlers}>
        <View style={styles.row}>
          <Image style={styles.image} source={require('../../../res/images/ic_sort.png')}/>
          <Text style={{marginLeft: 15}}>{this.props.data.name}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tips: {
    fontSize: 20
  },
  item: {
    padding: 15,
    backgroundColor: '#F6F6F6',
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    tintColor: '#2196F3',
    width: 16,
    height: 16,
  },
  title: {
    fontSize: 16,
    color: 'white',
  },
});
