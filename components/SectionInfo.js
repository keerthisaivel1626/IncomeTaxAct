import React, { Component } from "react";
import styled from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as RootNavigation from "../RootNavigation";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { Image } from "react-native";

import {
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import { WebView } from "react-native-webview";
import { StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native";
let deviceWidth = Dimensions.get("window").width;
deviceWidth = deviceWidth;

let db;
let chap;
let data;
let htmllink;
const WebURL = require("../assets/Files/section1.html");
export default class SectionInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chapterList: [],
      chapterIds: "",
    };
    this.openDatabase();

    console.log(data);
    console.log(db);
    db = SQLite.openDatabase("db.db");
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM IT_SECTION WHERE sectionid=?",
        [data],
        (tx, results) => {
          let dataLength = results.rows.length;
          if (dataLength > 0) {
            let helperArray = [];
            for (let i = 0; i < results.rows.length; i++) {
              helperArray.push(results.rows.item(i));
            }

            this.setState({
              chapterList: helperArray,
            });
          }
        },
        (error) => console.log("error")
      );
    });
  }
  openDatabase = async () => {
    data = await AsyncStorage.getItem("section");
    const indexHtml = Asset.fromModule(
      require("../assets/Files/section1.html")
    );
    await indexHtml.downloadAsync();
    this.HTMLFile = await FileSystem.readAsStringAsync(indexHtml.localUri);
    if (
      !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
        .exists
    ) {
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + "SQLite"
      );
    }
    const [{ uri }] = await Asset.loadAsync(require("../assets/db.db"));
    await FileSystem.downloadAsync(
      uri,
      FileSystem.documentDirectory + "SQLite/db.db"
    );
    return SQLite.openDatabase("//db.db");
  };

  render() {
    return (
      this.state.chapterList.map((item, index) => (htmllink = item.link)),
      (
        <WebView
          // source={{ uri: "file:///android_asset/section1.html" }}
          // javaScriptEnabled={true}
          // domStorageEnabled={true}
          // style={{ resizeMode: "cover", flex: 1 }}
          // injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
          // scalesPageToFit={false}
          // onLoadEnd={this._onLoadEnd}
          useWebKit
          onLoad={this.sendDataToWebView}
          onLoadEnd={this.injectFont}
          onMessage={this.receiveDataFromWebView}
          originWhitelist={["*"]}
          ref={(ref) => {
            this.webview = ref;
          }}
          source={this.HTMLFile}
          domStorageEnabled
          style={{ resizeMode: "cover", flex: 1 }}
          injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
          allowUniversalAccessFromFileURLs
          allowFileAccessFromFileURLs
          allowFileAccess
        />
      )
    );
  }
}
