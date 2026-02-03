import { useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { BannerAd as GoogleBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { AD_CONFIG } from '@/constants/ads';

interface BannerAdProps {
  style?: object;
}

export function BannerAd({ style }: BannerAdProps) {
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);

  // Don't render on web
  if (Platform.OS === 'web') {
    return null;
  }

  if (adError) {
    return null;
  }

  return (
    <View style={[styles.container, !adLoaded && styles.hidden, style]}>
      <GoogleBannerAd
        unitId={AD_CONFIG.BANNER_ID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdLoaded={() => setAdLoaded(true)}
        onAdFailedToLoad={(error) => {
          console.log('Banner ad failed to load:', error);
          setAdError(true);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  hidden: {
    height: 0,
    overflow: 'hidden',
  },
});
