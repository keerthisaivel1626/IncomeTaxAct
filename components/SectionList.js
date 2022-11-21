import React, { Component } from "react";
import styled from "styled-components";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as RootNavigation from "../RootNavigation";
import {
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Dimensions,
  Animated,
} from "react-native";
let deviceWidth = Dimensions.get("window").width;
deviceWidth = deviceWidth - 30;

let db;
let chap;
let data;

export default class SectionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chapterList: [],
      chapterIds: "",
    };
    this.openDatabase();
    db = SQLite.openDatabase("db.db");

    console.log(data);
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM IT_SECTION WHERE chapterid=?",
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
    data = await AsyncStorage.getItem("chapter");
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
      await AsyncStorage.setItem("section", itemindex.sectionid);
      RootNavigation.navigate("SectionDetail");
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <Box>
        {this.state.chapterList.map((item, index) => (
          <TouchableOpacity
            onPress={() => this.directtoscreen(item)}
            activeOpacity={1}
            key={item._id}
          >
            <BoxContainer
              key={item._id}
              style={{
                flexShrink: 1,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.9,
                shadowRadius: 3,
                elevation: 15,
              }}
            >
              <SectionNo style={{ fontWeight: "bold" }}>
                {item.sectionid}
              </SectionNo>
              <SectionTitle numberOfLines={2}>{item.title}</SectionTitle>
            </BoxContainer>
          </TouchableOpacity>
        ))}
        <Gap></Gap>
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
  margin-bottom: 1px;

  background: #ffffff;
  /* border-radius: 10px; */
`;
const SectionNo = styled.Text`
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
const SectionTitle = styled.Text`
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
const Gap = styled.View`
  flex: 1;
  margin-top: 5px;
`;
