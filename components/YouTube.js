import React, {useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  Text,
  ToastAndroid,
} from 'react-native';
import {HomeStyles} from './styles';
import {YouTube} from 'social-downloader-cherry';
import LinearGradient from 'react-native-linear-gradient';
const {height, width} = Dimensions.get('window');
import RNFetchBlob from 'rn-fetch-blob';
import {useInterstitialAd, TestIds} from 'react-native-google-mobile-ads';

  const InterstitialadUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-6558254583092184/9961359428";
export default function YouTubeVideo(props) {
  const title = props.title
  const duration = props.duration
  const image = props.image
  const url360 = props.url360
  const url480 = props.url480
  const url720 = props.url720
  const url1080 = props.url1080
  const audio = props.audio
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
    const mime = props.type !== 'audio' ? 'video/mp4' : 'audio/m4a';
    RNFetchBlob.config({
      addAndroidDownloads: {
        notification: true,
        useDownloadManager: true,
        description: 'Downloading file...',
        title: title,
        mime: mime,
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
    <View style={HomeStyles.resultView}>
      <Text style={[HomeStyles.resultTitle, {marginTop: height * 0.01}]}>
        {title}
      </Text>
      <Image style={HomeStyles.resultImage} source={{uri: image}} />
      <View style={HomeStyles.durationWrapper}>
        <Text style={[HomeStyles.resultTitle]}>{duration}</Text>
      </View>
      {url360 &&  (
        <View style={HomeStyles.table}>
          <Text style={[HomeStyles.resultTitle, HomeStyles.textShift]}>
            360p
          </Text>
          {/* {url360.filesize &&
          <Text style={[HomeStyles.resultTitle, {marginRight: width * 0.1}]}>
            {Math.floor(url360.filesize / 1000000) >= 950
              ? (url360.filesize / 1000000000).toFixed(2) + 'GB'
              : (url360.filesize / 1000000).toFixed(2) + 'MB'}
          </Text>} */}
          <TouchableOpacity
            onPress={() => handleDownload({url: url360.url})}
            activeOpacity={0.9}
            style={[HomeStyles.downloadButton, HomeStyles.youtubeButton]}>
            <LinearGradient
              style={HomeStyles.downloadButton}
              colors={['#fb8817', '#ff4b01', '#c12127', '#e02aff']}>
              <Text style={HomeStyles.resultTitle}>Download</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
      {url480 &&  (
        <View style={HomeStyles.table}>
          <Text style={[HomeStyles.resultTitle, HomeStyles.textShift]}>
            480p
          </Text>
          {/* {url480.filesize &&
          <Text style={[HomeStyles.resultTitle, {marginRight: width * 0.1}]}>
            {Math.floor(url480.filesize / 1000000) >= 950
              ? (url480.filesize / 1000000000).toFixed(2) + 'GB'
              : (url480.filesize / 1000000).toFixed(2) + 'MB'}
          </Text>} */}
          <TouchableOpacity
            onPress={() => handleDownload({url: url480.url})}
            activeOpacity={0.9}
            style={[HomeStyles.downloadButton, HomeStyles.youtubeButton]}>
            <LinearGradient
              style={HomeStyles.downloadButton}
              colors={['#fb8817', '#ff4b01', '#c12127', '#e02aff']}>
              <Text style={HomeStyles.resultTitle}>Download</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
      {url720 &&  (
        <View style={HomeStyles.table}>
          <Text style={[HomeStyles.resultTitle, HomeStyles.textShift]}>
            720p
          </Text>
          {/* {url720.filesize &&
          <Text style={[HomeStyles.resultTitle, {marginRight: width * 0.1}]}>
            {Math.floor(url720.filesize / 1000000) >= 950
              ? (url720.filesize / 1000000000).toFixed(2) + 'GB'
              : (url720.filesize / 1000000).toFixed(2) + 'MB'}
          </Text>} */}
          <TouchableOpacity
            onPress={() => handleDownload({url: url720.url})}
            activeOpacity={0.9}
            style={[HomeStyles.downloadButton, HomeStyles.youtubeButton]}>
            <LinearGradient
              style={HomeStyles.downloadButton}
              colors={['#fb8817', '#ff4b01', '#c12127', '#e02aff']}>
              <Text style={HomeStyles.resultTitle}>Download</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
      {url1080 && (
        <View style={HomeStyles.table}>
          <Text style={[HomeStyles.resultTitle, HomeStyles.textShift]}>
            1080p
          </Text>
          {/* {url1080.filesize && 
          <Text style={[HomeStyles.resultTitle, {marginRight: width * 0.1}]}>
            {Math.floor(url1080.filesize / 1000000) >= 950
              ? (url1080.filesize / 1000000000).toFixed(2) + 'GB'
              : (url1080.filesize / 1000000).toFixed(2) + 'MB'}
          </Text>} */}
          <TouchableOpacity
            onPress={() => handleDownload({url: url1080.url})}
            activeOpacity={0.9}
            style={[HomeStyles.downloadButton, HomeStyles.youtubeButton]}>
            <LinearGradient
              style={HomeStyles.downloadButton}
              colors={['#fb8817', '#ff4b01', '#c12127', '#e02aff']}>
              <Text style={HomeStyles.resultTitle}>Download</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
      {audio && (
        <View style={HomeStyles.table}>
          <Text style={[HomeStyles.resultTitle, HomeStyles.textShift]}>
            Audio
          </Text>
          {/* {audio.filesize && 
          <Text style={[HomeStyles.resultTitle, HomeStyles.textShift1]}>
            {Math.floor(audio.filesize / 1000000) >= 950
              ? (audio.filesize / 1000000000).toFixed(2) + 'GB'
              : (audio.filesize / 1000000).toFixed(2) + 'MB'}
          </Text>} */}
          <TouchableOpacity
            onPress={() => handleDownload({url: audio.url, type: 'audio'})}
            activeOpacity={0.9}
            style={[HomeStyles.downloadButton, HomeStyles.youtubeButton]}>
            <LinearGradient
              style={HomeStyles.downloadButton}
              colors={['#fb8817', '#ff4b01', '#c12127', '#e02aff']}>
              <Text style={HomeStyles.resultTitle}>Download</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
