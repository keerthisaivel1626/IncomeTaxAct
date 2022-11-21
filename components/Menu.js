import React from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import * as RootNavigation from "../RootNavigation";

import MenuCard from "./MenuCard";
import {
  Animated,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from "react-native";

import { connect } from "react-redux";

const screenHeight = Dimensions.get("window").height;

function mapStateToProps(state) {
  return {
    menu: state.menu,
  };
}

function mapsDispatchToProps(dispatch) {
  return {
    closeMenu: () =>
      dispatch({
        type: "CLOSEMENU",
      }),
  };
}

class Menu extends React.Component {
  state = {
    top: new Animated.Value(screenHeight + 900),
  };

  componentDidMount() {
    this.menu();
  }
  componentDidUpdate() {
    this.menu();
  }
  menu = () => {
    if (this.props.menu == "openMenu") {
      Animated.spring(this.state.top, {
        toValue: 150,
        useNativeDriver: false,
      }).start();
    }

    if (this.props.menu == "closeMenu") {
      Animated.spring(this.state.top, {
        toValue: screenHeight + 900,
        useNativeDriver: false,
      }).start();
    }
  };

  render() {
    return (
      <AnimatedContainer
        style={{ position: "absolute", top: this.state.top, zIndex: 100 }}
      >
        <Cover>
          <MenuTexts>Menu</MenuTexts>
        </Cover>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            marginLeft: -22,
          }}
          onPress={this.props.closeMenu}
        >
          <CloseView>
            <Ionicons name="chevron-down-sharp" size={24} color="black" />
          </CloseView>
        </TouchableOpacity>
        <Content>
          <TouchableOpacity onPress={console.log("gello")}>
            <MenuCard
              icon="md-newspaper"
              text="ITAT Judgments"
              caption="welcome"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={console.log("gello")}>
            <MenuCard icon="ios-arrow-redo" text="Jump To" caption="welcome" />
          </TouchableOpacity>

          <TouchableOpacity onPress={console.log("gello")}>
            <MenuCard icon="settings" text="Settings" caption="welcome" />
          </TouchableOpacity>
          <TouchableOpacity onPress={console.log("gello")}>
            <MenuCard icon="ios-people" text="About Us" caption="welcome" />
          </TouchableOpacity>
          <TouchableOpacity onPress={console.log("gello")}>
            <MenuCard
              icon="ios-phone-portrait-sharp"
              text="Contact Us"
              caption="welcome"
            />
          </TouchableOpacity>
        </Content>
      </AnimatedContainer>
    );
  }
}

const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 30px;
  overflow: hidden;
`;

const Cover = styled.View`
  width: 100%;
  height: 75px;
`;
const CloseView = styled.View`
  width: 60px;
  height: 35px;
  border-radius: 24px;
  background: #ffffff;

  justify-content: center;
  align-items: center;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Content = styled.View`
  width: 100%;
  height: 100%;
  padding: 30px;
`;
const MenuTexts = styled.Text`
  position: absolute;
  font-size: 25px;
  font-weight: 600;
  color: black;
  top: 55px;
  left: 44%;
`;
export default connect(mapStateToProps, mapsDispatchToProps)(Menu);
