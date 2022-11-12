import React, {useState, useEffect, useCallback} from 'react';
import {
  TouchableOpacity,
  View,
  Dimensions,
  StatusBar,
  Image,
  Text,
  TextInput,
  ScrollView,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import {HomeStyles} from './styles';
import {
  Twitter,
  Facebook,
  Instagram,
  TikTok,
  YouTube,
} from 'social-downloader-cherry';
import twitterGetUrl from "twitter-url-direct"
import tiktok from "tiktok-scraper-without-watermark"
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {UIActivityIndicator} from 'react-native-indicators';
import {List} from './List';
import LinearGradient from 'react-native-linear-gradient';
const {height, width} = Dimensions.get('window');
import RNFetchBlob from 'rn-fetch-blob';
import GradientText from './Text';
const HEADER_HEIGHT = width * 0.114;

export default function Search({navigation}) {

  return (
    <LinearGradient
      start={{x: 0.8, y: 0}}
      colors={['#000000', '#000000']}
      style={[HomeStyles.container, {alignItems: 'center'}]}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <Icon
        onPress={() => navigation.navigate('Home')}
        style={HomeStyles.backIcon}
        size={height * 0.035}
        color="white"
        name="arrow-back"
      />
      <View style={[HomeStyles.logoView, {alignSelf: 'center'}]}>
        <GradientText
          colors={['#fb8817', '#ff4b01', '#c12127', '#e02aff']}
          style={[HomeStyles.text, {fontSize: width * 0.05}]}>
          MagikBoxx
        </GradientText>
      </View>

    </LinearGradient>
  );
}
