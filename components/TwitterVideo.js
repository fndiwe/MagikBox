import React, {useState, useEffect, useCallback} from 'react';
import {
  TouchableOpacity,
  View,
  Dimensions,
  Text,
  ToastAndroid,
} from 'react-native';
import {HomeStyles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
const {height, width} = Dimensions.get('window');
import RNFetchBlob from 'rn-fetch-blob';
import {useInterstitialAd, TestIds} from 'react-native-google-mobile-ads';

  const InterstitialadUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-6558254583092184/9961359428";
export default function TwitterVideo(props) {
  const video = props.video
  const videoHD = props.videoHD 
  const { isLoaded, isClosed, load, show } = useInterstitialAd(
    InterstitialadUnitId,
    {
      requestNonPersonalizedAdsOnly: false,
    }
  );

  useEffect(() => {
    load();
  }, [load]);

  const handleDownload = props => {
    RNFetchBlob.config({
      addAndroidDownloads: {
        // Show notification when response data transmitted
        notification: true,
        useDownloadManager: true,
        description: 'Downloading file...',
        // Title of download notification
        title: `Twitter Video(MagikBoxx) ${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
        mime: 'video/mp4',
      },
    })
      .fetch('GET', props.url)
      .then(res => {})
      // Something went wrong:
      .catch((errorMessage, statusCode) => {
        // error handling
      });
    ToastAndroid.show('Downloading✔', ToastAndroid.LONG);
    if(isLoaded){
      show()
    }
  };
  return (
    <>
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => handleDownload({url: video})}
        activeOpacity={0.9}
        style={[HomeStyles.downloadButton, {marginTop: height * 0.2}]}>
        <LinearGradient
          style={HomeStyles.downloadButton}
          colors={['#fb8817', '#ff4b01', '#c12127', '#e02aff']}>
          <Text style={HomeStyles.resultTitle}>Download SD Video</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDownload({url: videoHD})}
        activeOpacity={0.9}
        style={HomeStyles.downloadButton}>
        <LinearGradient
          style={[HomeStyles.downloadButton, {marginTop: height * 0.05}]}
          colors={['#fb8817', '#ff4b01', '#c12127', '#e02aff']}>
          <Text style={HomeStyles.resultTitle}>Download HD Video</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
</>
  );
}
