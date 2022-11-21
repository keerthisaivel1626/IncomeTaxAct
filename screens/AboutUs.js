import React from 'react';
import styled from 'styled-components';
import {StatusBar, ScrollView, ActivityIndicator} from 'react-native';

import IonIcon from 'react-native-vector-icons/Ionicons';
import {WebView} from 'react-native-webview';
import {TouchableOpacity, Dimensions, Animated} from 'react-native';
import Menu from '../components/Menu';
import {connect} from 'react-redux';
import BoxList from '../components/BoxList';

const screenHeight = Dimensions.get('window').height;
function mapStateToProps(state) {
  return {menu: state.menu};
}

function mapsDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: 'OPENMENU',
      }),
  };
}

class AboutUs extends React.Component {
  state = {
    left: 10,
    top: new Animated.Value(screenHeight + 900),
    opacity: new Animated.Value(1),
  };
  componentDidUpdate() {
    this.blackScreen();
  }
  blackScreen() {
    if (this.props.menu == 'openMenu') {
      Animated.timing(this.state.top, {
        toValue: 0,
        duration: 10,
        useNativeDriver: false,
      }).start();
      Animated.timing(this.state.opacity, {
        toValue: 0.6,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    if (this.props.menu == 'closeMenu') {
      Animated.timing(this.state.top, {
        toValue: screenHeight + 900,
        duration: 10,
        useNativeDriver: false,
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  }
  render() {
    return (
      <Root>
        <StatusBar backgroundColor="white" barStyle="dark-content" />

        <Main>
          <Header>
            <TouchableOpacity
              onPress={this.props.openMenu}
              style={{
                position: 'absolute',
                top: 13,
                left: 15,
                zIndex: 100,
              }}>
              <IonIcon name="menu-sharp" size={30} color="black"></IonIcon>
            </TouchableOpacity>

            <AppName>Income Tax Act (India)</AppName>
            <TouchableOpacity
              onPress={console.log('hello')}
              style={{
                position: 'absolute',
                top: 15,
                right: 15,
                zIndex: 100,
              }}>
              <IonIcon name="search-sharp" size={24} color="black" />
            </TouchableOpacity>
          </Header>

          <WebView
            originWhitelist={['*']}
            source={{uri: 'file:///android_asset/Files/aboutus.htm'}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            style={{resizeMode: 'cover', flex: 1}}
            injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
            scalesPageToFit={false}
            onLoadEnd={this._onLoadEnd}
          />
        </Main>

        <AnimatedBlack
          style={{top: this.state.top, opacity: this.state.opacity}}
        />

        <Menu />
      </Root>
    );
  }
}

const Main = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const BlackMain = styled.View``;

const Header = styled.View`
  height: 70px;
  margin-top: 0px;
  margin-left: 11px;
  margin-right: 10px;
`;

const AppName = styled.Text`
  text-align: center;
  padding-top: 14px;
  padding-left: 18px;

  color: black;
  font-size: 21px;
  font-family: 'sans-serif';
`;

const PageTitle = styled.Text`
  padding: 2px 15px;
  color: black;
  font-size: 15px;
  font-family: 'sans-serif';
`;
const Root = styled.View`
  flex: 1;
`;
const Black = styled.View`
  position: absolute;
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.6;
`;
const AnimatedBlack = Animated.createAnimatedComponent(Black);
export default connect(mapStateToProps, mapsDispatchToProps)(AboutUs);
