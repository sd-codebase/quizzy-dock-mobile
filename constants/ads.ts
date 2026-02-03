import { TestIds } from 'react-native-google-mobile-ads';
import { Platform } from 'react-native';

const IS_DEV = __DEV__;

// Platform-specific ad unit IDs
const ANDROID_ADS = {
  BANNER: 'ca-app-pub-6093200167963107/9379829128',
  INTERSTITIAL: 'ca-app-pub-6093200167963107/4127502445',
};

const IOS_ADS = {
  BANNER: 'ca-app-pub-6093200167963107/6159603566',
  INTERSTITIAL: 'ca-app-pub-6093200167963107/6347305822',
};

const ADS = Platform.OS === 'ios' ? IOS_ADS : ANDROID_ADS;

export const AD_CONFIG = {
  BANNER_ID: IS_DEV ? TestIds.BANNER : ADS.BANNER,
  INTERSTITIAL_ID: IS_DEV ? TestIds.INTERSTITIAL : ADS.INTERSTITIAL,
  COOLDOWN_MS: 60 * 1000, // 60 seconds between interstitial ads
};
