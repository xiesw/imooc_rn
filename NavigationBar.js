import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  Images,
  StatusBar,
  Platform,
  StyleSheet,
} from 'react-native';


const NAVBAR_HEIGHT_ANDROID = 50;
const NAVBAR_HEIGHT_IOS = 44;
const STATUS_BAR_HEIGHT = 20;
const StatusBarShape = {
  backgroundColor: PropTypes.string,
  barStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
  hidden: PropTypes.boolean
};
export default class NavigationBar extends Component {
  static propTypes = {
    style: View.propTypes.style,
    title: PropTypes.string,
    titleView: PropTypes.element,
    hide: PropTypes.boolean,
    leftButton: PropTypes.element,
    rightButton: PropTypes.element,
    statusBar: PropTypes.shape()
  };

  static defaultProps = {
    statusBar: {
      barStyle: 'light-content',
      hidden: false
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      hidden: false
    };
  }

  render() {
    let status = <View style={[styles.statusBar, this.props.statusBar]}>
      <StatusBar {...this.props.statusBar}/>
    </View>;
    let titleView = this.props.titleView ? this.props.titleView :
      <Text style={styles.title}>{this.props.title}</Text>;
    let content = <View style={styles.navBar}>
      {this.props.leftButton}
      <View style={styles.titleViewContainer}>
        {titleView}
      </View>
      {this.props.rightButton}
    </View>;
    return (
      <View style={[styles.container, this.props.style]}>
        {status}
        {content}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray'
  },
  navBar: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Platform.OS === 'iso' ? NAVBAR_HEIGHT_IOS : NAVBAR_HEIGHT_ANDROID,
    flexDirection: 'row'
  },
  titleViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    left: 40,
    right: 40,
    top: 0,
    bottom: 0
  },
  title: {
    fontSize: 20,
    color: 'white'
  },
  statusBar: {
    height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
  }

})