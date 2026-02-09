import { TestIds } from 'react-native-google-mobile-ads';
import { Platform } from 'react-native';

const IS_DEV = __DEV__;

// Platform-specific ad unit IDs
const ANDROID_ADS = {
  REWARDED: 'ca-app-pub-6093200167963107/7280720335',
};

const IOS_ADS = {
  REWARDED: 'ca-app-pub-6093200167963107/5201351903',
};

const ADS = Platform.OS === 'ios' ? IOS_ADS : ANDROID_ADS;

export const AD_CONFIG = {
  REWARDED_ID: IS_DEV ? TestIds.REWARDED : ADS.REWARDED,
  COOLDOWN_MS: 60 * 1000, // 60 seconds between rewarded ads
};
