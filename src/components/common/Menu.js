import React, { Component } from 'react';
import {FlatList, ScrollView, View, Animated, Text} from "react-native";
import styled from "styled-components";
import metrics from "../../metrics";
import {colors, fonts} from "../../theme";
import MenuItem from "./MenuItems";

type Props = {
    menu: Array,
    photo: String,
}

const DishTitle = styled(Text).attrs({
    ellipsizeMode: 'tail',
    numberOfLines: 1
})`
    margin-bottom: ${() => metrics.extraSmallSize}px;
    margin-top: ${() => metrics.getWidthFromDP("0.5%")}px;
    color: ${() => colors.black};
    font-size : ${() => metrics.getWidthFromDP("4.5%")}px;
    font-family: ${() => fonts.bold}
`;

export default class Menu extends Component<Props, {}> {

    state = {
        foodCategories: []
    };

    componentDidMount(): void {
        let categoryArray = [];
        this.props.menu.map(item =>{
            categoryArray.push(item.foodCategory.name);
        })

        let uniqueArray = [...new Set(categoryArray)];
        this.setState({
            foodCategories: uniqueArray
        })
    }


    render() {
        const { menu, photo } = this.props;

    }
}