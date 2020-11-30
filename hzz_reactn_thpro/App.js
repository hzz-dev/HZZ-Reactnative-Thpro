import React, { Component } from 'react';
import { View,SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Nav from "./src/nav";
import RootStore from "./src/mobx";
import UserStore from "./src/mobx/userStore";
import { Provider } from "mobx-react";
import JMessage from "./src/utils/JMessage";

class App extends Component {
  state = {
    isInitGeo: false
  }
  async componentDidMount() {
    // 获取缓存中的用户数据
    const strUserInfo = await AsyncStorage.getItem("userinfo");
    const userinfo = strUserInfo ? JSON.parse(strUserInfo) : {};
    // 判断 有没有token
    if (userinfo.token) {
      // 把缓存中的数据 存一份到mobx中
      RootStore.setUserInfo(userinfo.mobile, userinfo.token, userinfo.userId);
      JMessage.init();

    }
    this.setState({ isInitGeo: true });
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 ,  backgroundColor: '#ddd'}}>
        <Provider RootStore={RootStore} UserStore={UserStore} >
          {this.state.isInitGeo ? <Nav></Nav> : <></>}
        </Provider>
      </SafeAreaView>
    );
  }
}

export default App;