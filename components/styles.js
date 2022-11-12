import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

export const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoView: {
    elevation: 50,
    flexDirection: 'row',
    marginTop: height * 0.02,
    marginLeft: width * 0.029,
  },
  image: {
    width: width * 0.07,
    height: height * 0.04,
    marginRight: width * 0.02,
    marginTop: height * 0.01,
  },
  text: {
    fontFamily: 'montserrat-bold',
    fontSize: height * 0.027,
    color: 'white',
    marginTop: height * 0.01,
  },
  goodMorning: {
    alignSelf: 'center',
    marginTop: height * 0.25,
  },
  goodMorningText: {
    textAlign: 'justify',
    color: 'white',
    fontFamily: 'montserrat-light',
    fontSize: height * 0.085,
  },
  topText: {
    elevation: 50,
    fontFamily: 'montserrat',
    textAlign: 'center',
    marginBottom: height * 0.02,
    color: 'white',
    fontSize: height * 0.026,
  },
  button: {
    margin: width * 0.02,
    height: height * 0.068,
    flexDirection: 'row',
    borderRadius: width * 0.02,
  },
  buttonImage: {
    width: width * 0.09,
    height: height * 0.05,
    marginTop: height * 0.005,
    marginRight: width * 0.02,
    marginLeft: width * 0.009,
  },
  buttonText: {
    fontFamily: 'verdana',
    textAlign: 'center',
    marginBottom: height * 0.02,
    color: 'white',
    marginTop: height * 0.013,
    fontSize: height * 0.023,
    paddingRight: 7,
  },
  input: {
    color: 'white',
    fontFamily: 'verdana',
    fontSize: height * 0.023,
    width: width * 0.9,
    alignSelf: 'center',
    height: height * 0.055,
    backgroundColor: 'black',
    borderRadius: 50,
  },
  resultView: {
    alignItems: 'center',
  },
  resultTitle: {
    textAlign: 'center',
    fontFamily: 'montserrat',
    color: 'white',
    padding: height * 0.012,
    fontSize: height * 0.023,
  },
  resultImage: {
    width: width * 0.95,
    height: height * 0.3,
    borderRadius: width * 0.02,
  },
  play: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 100,
    zIndex: 1,
    top: height * 0.16,
    // opacity: 0.4
  },
  backIcon: {
    position: 'absolute',
    top: height * 0.05,
    left: width * 0.03,
  },
  iconWrapper: {
    backgroundColor: 'black',
    borderRadius: 100,
    right: width * 0.012,
    position: 'absolute',
    top: height * 0.01,
  },
  table: {
    flexDirection: 'row',
    marginBottom: height * 0.03,
  },
  downloadButton: {
    borderRadius: 100,
  },
  youtubeButton: {
    marginLeft: width * 0.4,
  },
  durationWrapper: {
    backgroundColor: 'black',
    right: width * 0.01,
  },
});
