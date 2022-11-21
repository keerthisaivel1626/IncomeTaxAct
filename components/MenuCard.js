import React from "react";
import { Ionicons } from "@expo/vector-icons";

import styled from "styled-components";

const MenuCard = (props) => (
  <Container>
    <IconView>
      <Ionicons name={props.icon} size={25} color="black" />
    </IconView>
    <Content>
      <MenuButton>{props.text}</MenuButton>
      <MenuText>{props.caption}</MenuText>
    </Content>
  </Container>
);

const Container = styled.View`
  flex-direction: row;
  margin: 15px 0;
`;
const IconView = styled.View`
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
`;
const Content = styled.View`
  padding-left: 20px;
`;

const MenuButton = styled.Text`
  font-size: 20px;
  color: black;
  font-weight: 600;
`;

const MenuText = styled.Text`
  font-size: 15px;
  color: black;
  margin-top: 5px;
  opacity: 0.6;
`;
export default MenuCard;
