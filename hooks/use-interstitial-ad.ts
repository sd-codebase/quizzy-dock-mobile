import { useEffect, useState, useCallback, useRef } from 'react';
import { Platform } from 'react-native';
import {
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';
import { AD_CONFIG } from '@/constants/ads';

// Global state to track cooldown across all hook instances
let lastShownTime = 0;

export function useInterstitialAd() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const adRef = useRef<InterstitialAd | null>(null);
  const unsubscribeLoadedRef = useRef<(() => void) | null>(null);
  const unsubscribeClosedRef = useRef<(() => void) | null>(null);
  const onCloseCallbackRef = useRef<(() => void) | null>(null);

  const canShowAd = useCallback(() => {
    if (Platform.OS === 'web') return false;
    return Date.now() - lastShownTime >= AD_CONFIG.COOLDOWN_MS;
  }, []);

  const loadAd = useCallback(() => {
    if (Platform.OS === 'web') return;

    // Clean up previous ad if exists
    if (unsubscribeLoadedRef.current) {
      unsubscribeLoadedRef.current();
    }
    if (unsubscribeClosedRef.current) {
      unsubscribeClosedRef.current();
    }

    const interstitial = InterstitialAd.createForAdRequest(AD_CONFIG.INTERSTITIAL_ID);
    adRef.current = interstitial;

    unsubscribeLoadedRef.current = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setIsLoaded(true);
    });

    unsubscribeClosedRef.current = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      setIsShowing(false);
      setIsLoaded(false);
      // Call the onClose callback if set
      if (onCloseCallbackRef.current) {
        onCloseCallbackRef.current();
        onCloseCallbackRef.current = null;
      }
      // Preload next ad
      loadAd();
    });

    interstitial.load();
  }, []);

  useEffect(() => {
    loadAd();

    return () => {
      if (unsubscribeLoadedRef.current) {
        unsubscribeLoadedRef.current();
      }
      if (unsubscribeClosedRef.current) {
        unsubscribeClosedRef.current();
      }
    };
  }, [loadAd]);

  const showAd = useCallback(async (onClose?: () => void): Promise<boolean> => {
    if (Platform.OS === 'web') {
      onClose?.();
      return false;
    }
    if (!isLoaded || isShowing) {
      onClose?.();
      return false;
    }
    if (!canShowAd()) {
      onClose?.();
      return false;
    }

    try {
      setIsShowing(true);
      lastShownTime = Date.now();
      onCloseCallbackRef.current = onClose || null;
      await adRef.current?.show();
      return true;
    } catch (error) {
      console.log('Failed to show interstitial ad:', error);
      setIsShowing(false);
      onClose?.();
      return false;
    }
  }, [isLoaded, isShowing, canShowAd]);

  return {
    isLoaded,
    isShowing,
    showAd,
    canShowAd: canShowAd(),
  };
}
