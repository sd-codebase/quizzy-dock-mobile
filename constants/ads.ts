import { TestIds } from 'react-native-google-mobile-ads';

const IS_DEV = __DEV__;

export const AD_CONFIG = {
  BANNER_ID: IS_DEV ? TestIds.BANNER : 'ca-app-pub-6093200167963107/9379829128',
  INTERSTITIAL_ID: IS_DEV ? TestIds.INTERSTITIAL : 'ca-app-pub-6093200167963107/4127502445',
  COOLDOWN_MS: 60 * 1000, // 60 seconds between interstitial ads
};
