import React, { Component } from "react";
import styled from "styled-components";
import * as RootNavigation from "../RootNavigation";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Dimensions,
  Animated,
} from "react-native";
import SectionList from "./SectionList";
let deviceWidth = Dimensions.get("window").width;
deviceWidth = deviceWidth - 30;

let db;

class BoxList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chapterList: [],
      chapterIds: "",
    };
    this.openDatabase();
    db = SQLite.openDatabase("db.db");

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM IT_CHAPTER",
        [],
        (tx, results) => {
          let dataLength = results.rows.length;
          console.log(dataLength);
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
    console.log("called");
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

  directtoscreen = async (itemindex) => {
    try {
      await AsyncStorage.setItem("chapter", itemindex.chapterid);
      RootNavigation.navigate("Section");
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <Box>
        {this.state.chapterList.map((item, index) => (
          <TouchableOpacity
            activeOpacity={1}
            key={item._id}
            onPress={() => this.directtoscreen(item)}
          >
            <BoxContainer
              style={{
                flexShrink: 1,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.9,
                shadowRadius: 3,
                elevation: 15,
              }}
              name={item.chapterid}
            >
              <ChapterNo style={{ fontWeight: "bold" }}>
                {item.chapterid}
              </ChapterNo>
              <ChapterTitle numberOfLines={2}>{item.title}</ChapterTitle>
              <Section style={{ fontWeight: "bold" }}>{item.section}</Section>
            </BoxContainer>
          </TouchableOpacity>
        ))}
      </Box>
    );
  }
}

const Box = styled.View`
  flex: 1;
`;

const BoxContainer = styled.View`
  height: 80px;
  margin-top: 3px;
  /* margin-left: 9px;
  margin-right: 8px; */

  background: #ffffff;
  /* border-radius: 10px; */
`;
const ChapterNo = styled.Text`
  position: absolute;
  width: 150px;
  height: 30px;
  margin-left: 8px;
  margin-top: 10px;

  font-style: normal;
  font-weight: 100;
  font-size: 15px;
  line-height: 25px;
`;
const ChapterTitle = styled.Text`
  position: absolute;

  height: 53px;
  margin-left: 8px;
  margin-top: 35px;
  margin-bottom: 20px;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 19px;
  color: #000000;
`;
const Section = styled.Text`
  position: absolute;
  width: 100%;
  height: 23px;
  text-align: right;
  margin-top: 15px;
  padding-right: 15px;

  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 20px;
  color: #000000;
`;
export default BoxList;
