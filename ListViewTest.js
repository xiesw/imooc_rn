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
import Toast, {DURATION} from 'react-native-easy-toast';
import NavigationBar from "./NavigationBar";

let data = {
  "result": [
    {
      "email": "f.lee@taylor.edu",
      "fullName": "张三张三张三张三"
    },
    {
      "email": "g.jackson@hall.net",
      "fullName": "张三张三张三张三张三"
    },
    {
      "email": "l.hall@rodriguez.com",
      "fullName": "张三张三张三张三"
    },
    {
      "email": "q.lopez@davis.io",
      "fullName": "张三张三张三张三"
    },
    {
      "email": "c.gonzalez@perez.net",
      "fullName": "张三张三张三"
    },
    {
      "email": "a.johnson@williams.net",
      "fullName": "张三张三"
    },
    {
      "email": "i.anderson@lopez.edu",
      "fullName": "张三张三"
    },
    {
      "email": "r.lee@davis.org",
      "fullName": "张三张三"
    },
    {
      "email": "o.young@lee.edu",
      "fullName": "张三张三张三张三张三"
    },
    {
      "email": "j.wilson@williams.org",
      "fullName": "张三张三张三张三张三"
    },
    {
      "email": "z.walker@jackson.io",
      "fullName": "张三张三"
    },
    {
      "email": "j.martinez@brown.gov",
      "fullName": "张三张三张三张三"
    },
    {
      "email": "y.martin@lewis.io",
      "fullName": "张三张三张三张三"
    },
    {
      "email": "w.taylor@gonzalez.org",
      "fullName": "张三张三"
    },
    {
      "email": "j.thomas@garcia.org",
      "fullName": "张三张三张三张三"
    }
  ],
  "statusCode": 0
};
export default class ListViewTest extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r1 !== r2;
      }
    });
    this.state = {
      dataSource: ds.cloneWithRows(data.result),
      isLoading: true
    };
  }

  renderRow(rowData) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.toast.show('你单击了,' + rowData.fullName, DURATION.LENGTH_LONG);
        }}>
        <View>
          <Text style={styles.item}>{rowData.fullName}</Text>
          <Text style={styles.item}>{rowData.email}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderSepatator(sectionID, rowID, adjacentRowHighlighted) {
    return <View key={rowID} style={{height: 1, backgroundColor: 'grey'}}/>;
  }

  renderHeader() {
    return (
      <View>
        <Image style={{width: 300, height: 100}}
               source={{uri: 'http://121.42.181.106:8080/examples/business/rn.png'}}
        />
      </View>
    )
  }

  onReload() {
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title="ListView"
        />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)}
          renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>
            this.renderSepatator(sectionID, rowID, adjacentRowHighlighted)}
          renderHeader={() => this.renderHeader()}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={this.onReload()}
            />
          }

        />
        <Toast ref={(toast) => {
          this.toast = toast
        }}/>
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
  },
  item: {
    height: 40,
    padding: 5
  }
})