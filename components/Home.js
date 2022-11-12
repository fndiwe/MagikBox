import React, {useState, useEffect, useCallback} from 'react';
import {
  TouchableOpacity,
  View,
  Dimensions,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  Text,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import {HomeStyles} from './styles';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {List} from './List';
import RNFetchBlob from 'rn-fetch-blob';
import {UIActivityIndicator} from 'react-native-indicators';
import {Facebook, Instagram, YouTube} from 'social-downloader-cherry';
import twitterGetUrl from 'twitter-url-direct';
import tiktok from 'tiktok-scraper-without-watermark';
import LinearGradient from 'react-native-linear-gradient';
import FacebookVideo from './Facebook';
import YouTubeVideo from './YouTube';
const {height, width} = Dimensions.get('window');
const HEADER_HEIGHT = width * 0.114;
import GradientText from './Text';
import TwitterVideo from './TwitterVideo';
import {
  useInterstitialAd,
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-6558254583092184/5024140780';

const InterstitialadUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-6558254583092184/9961359428';

export default function Home({navigation}) {
  const [animation, setAnimation] = useState('slideInUp');
  const [showView, setShowView] = useState(true);
  const [duration1, setDuration1] = useState(2000);
  const [greeting, setGreeting] = useState(null);
  const [showView1, setShowView1] = useState(false);
  const [title, setTitle] = useState(null);
  const [urls, setUrls] = useState(null);
  const [duration, setDuration] = useState('');
  const [source, setSource] = useState('');
  const [image, setImage] = useState('');
  const [url360, setUrl360] = useState(null);
  const [url480, setUrl480] = useState(null);
  const [url720, setUrl720] = useState(null);
  const [url1080, setUrl1080] = useState(null);
  const [isTwitter, setIsTwitter] = useState(false);
  const [isFb, setIsFb] = useState(false);
  const [isYouTube, setYouTube] = useState(false);
  const [audio, setAudio] = useState(null);
  const [twitterVideo, setTwitterVideo] = useState(null);
  const [twitterVideoHD, setTwitterVideoHD] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');

  const {isLoaded, isClosed, load, show} = useInterstitialAd(
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
        // Show notification when response data transmitted
        notification: true,
        useDownloadManager: true,
        description: 'Downloading file...',
        // Title of download notification
        title: props.title,
        mime: mime,
      },
    })
      .fetch('GET', props.url)
      .then(res => {})
      // Something went wrong:
      .catch((errorMessage, statusCode) => {});
    ToastAndroid.show('Downloading✔', ToastAndroid.LONG);
    if (isLoaded) {
      show();
    }
  };
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    handleClick();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (new Date().getHours() >= 0 && new Date().getHours() <= 12) {
      setGreeting('Good Morning 🌹');
    } else if (new Date().getHours() >= 12 && new Date().getHours() <= 15) {
      setGreeting('Good Afternoon 🌞');
    } else {
      setGreeting('Good Evening 🌙');
    }
  }, []);
  const handleClick = async () => {
    setIsFb(false);
    setYouTube(false);
    setLoading(true);
    if (value.includes('https://') && value.includes('facebook')) {
      try {
        const res = await Facebook.getVideo(value);
        if (res.data.body) {
          setLoading(false);
          setUrls(res.data.body);
          setShowView1(true);
          setYouTube(false);
          setIsFb(true);
        }
      } catch (error) {
        ToastAndroid.show("An error occured", ToastAndroid.LONG);
        setLoading(false);
        console.log('error :>> ', error.message);
      }
    } else if (value.includes('https://') && value.includes('instagram')) {
      try {
        const res = await Instagram.getAny(value);
        if (res.data.body) {
          setLoading(false);
          handleDownload({
            url: res.data.body.link,
            title: `Instagram Video(MagikBoxx) ${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
          });
        }
      } catch (error) {
        ToastAndroid.show("An error occured", ToastAndroid.LONG);
        setLoading(false);
        console.log('error :>> ', error.message);
      }
    } else if (value.includes('https://') && value.includes('tiktok')) {
      try {
        const res = await tiktok.tiktokdownload(value);
        if (res) {
          setLoading(false);
          handleDownload({
            url: res.nowm,
            title: `TikTok Video(MagikBoxx) ${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
          });
        }
      } catch (error) {
        ToastAndroid.show("An error occured", ToastAndroid.LONG);
        setLoading(false);
        console.log('error :>> ', error.message);
      }
    } else if (
      (value.includes('https://') && value.includes('youtube')) ||
      value.includes('youtu.be')
    ) {
      try {
        const res = await YouTube.getVideo(value);
        if (res.data.body) {
          /* ###### YouTube Specific ####### */
          setLoading(false);
          setIsFb(false);
          setTitle(res.data.body.meta.title);
          setDuration(res.data.body.meta.duration);
          setSource(res.data.body.meta.source);
          setImage(res.data.body.thumb);
          setUrl360(
            res.data.body.url.filter(
              item =>
                item.ext === 'mp4' &&
                item.quality === '360' &&
                item.no_audio === false
            )[0]
          );
          setUrl480(
            res.data.body.url.filter(
              item =>
                item.ext === 'mp4' &&
                item.quality === '480' &&
                item.no_audio === false
            )[0]
          );
          setUrl720(
            res.data.body.url.filter(
              item =>
                item.ext === 'mp4' &&
                item.quality === '720' &&
                item.no_audio === false
            )[0]
          );
          setUrl1080(
            res.data.body.url.filter(
              item =>
                item.ext === 'mp4' &&
                item.quality === '1080' &&
                item.no_audio === false
            )[0]
          );
          setAudio(
            res.data.body.url.filter(
              item => item.audio === true && item.ext === 'm4a'
            )[0]
          );
          setShowView1(true);
          setYouTube(true);
        }
      } catch (error) {
        ToastAndroid.show("An error occured", ToastAndroid.LONG);
        setLoading(false);
        console.log('error :>> ', error.message);
      }
    } else if (value.includes('https://') && value.includes('twitter')) {
      try {
        const res = await twitterGetUrl(value);
        if (res) {
          setLoading(false);
          console.log(res);
          setTwitterVideo(res.download[0].url);
          setTwitterVideoHD(res.download[1].url);
          setYouTube(false);
          setIsFb(false);
          setShowView1(true);
          setIsTwitter(true);
        }
      } catch (error) {
        ToastAndroid.show("An error occured", ToastAndroid.LONG);
        setLoading(false);
        console.log('error :>> ', error.message);
      }
    } else {
      ToastAndroid.show(value + " is not a valid link", ToastAndroid.LONG);
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      start={{x: 0.8, y: 0}}
      colors={['#000000', '#000000']}
      style={HomeStyles.container}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      {/* <View style={{position: 'absolute', bottom: 0}}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: false,
          }}
        />
      </View> */}
      {!showView && (
        <Animatable.View
          duration={2000}
          useNativeDriver
          animation="slideInDown">
          <View style={HomeStyles.logoView}>
            <GradientText
              colors={['#fb8817', '#ff4b01', '#c12127', '#e02aff']}
              style={HomeStyles.text}>
              MagikBoxx
            </GradientText>
          </View>
        </Animatable.View>
      )}
      {showView && (
        <Animatable.View
          useNativeDriver
          onAnimationEnd={() => {
            setDuration1(300);
            setAnimation('slideOutUp');
            setTimeout(() => {
              setShowView(false);
            }, 300);
          }}
          animation={animation}
          duration={duration1}
          style={HomeStyles.goodMorning}>
          <GradientText
            colors={['#fb8817', '#ff4b01', '#c12127', '#e02aff']}
            style={HomeStyles.goodMorningText}>
            {greeting}
          </GradientText>
        </Animatable.View>
      )}
      {!showView && (
        <Animatable.View
          animation="fadeInLeft"
          useNativeDriver
          style={{
            elevation: 100,
            backgroundColor: 'transparent',
            marginTop: height * 0.02,
            alignSelf: 'center',
          }}>
          <LinearGradient
            colors={['#fb8817', '#ff4b01', '#c12127', '#e02aff']}
            style={{padding: 3, borderRadius: 50}}>
            <TextInput
              value={value}
              cursorColor="#7303c0"
              spellCheck={false}
              autoCorrect={false}
              placeholderTextColor="white"
              placeholder="Enter the copied link"
              style={HomeStyles.input}
              onChangeText={text => setValue(text)}
              onSubmitEditing={() => handleClick()}
            />
          </LinearGradient>
          {value !== '' && (
            <TouchableOpacity
              style={HomeStyles.iconWrapper}
              activeOpacity={0.9}
              onPress={() => handleClick()}>
              <Icon
                onPress={() => handleClick()}
                name="search"
                color="white"
                size={height * 0.045}
              />
            </TouchableOpacity>
          )}
          {loading && (
            <UIActivityIndicator
              hidesWhenStopped={true}
              size={height * 0.035}
              color="white"
              style={{
                position: 'absolute',
                top: height * 0.4,
                left: width * 0.45,
              }}
              animating={loading}
            />
          )}
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}>
            {showView1 && isFb && <FacebookVideo urls={urls} />}
            {showView1 && isYouTube && (
              <YouTubeVideo
                title={title}
                duration={duration}
                image={image}
                audio={audio}
                url360={url360}
                url480={url480}
                url720={url720}
                url1080={url1080}
              />
            )}
            {showView1 && isTwitter && (
              <TwitterVideo video={twitterVideo} videoHD={twitterVideoHD} />
            )}
          </ScrollView>
        </Animatable.View>
      )}
    </LinearGradient>
  );
}
