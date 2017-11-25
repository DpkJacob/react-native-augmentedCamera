import React from 'react';
import { StyleSheet,StatusBar,Button, Text, View,TouchableHighlight,Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MainPage from '../components/mainPage';
import ImageView from '../components/imageView'

export const Stack=StackNavigator({
 MainPage:{
        screen:MainPage
    },
ImageView:{
  screen:ImageView
}
},{
  headerMode:'none'
});