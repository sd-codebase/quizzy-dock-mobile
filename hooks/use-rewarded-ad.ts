import { useEffect, useState, useCallback, useRef } from 'react';
import { Platform } from 'react-native';
import {
  RewardedAd,
  RewardedAdEventType,
  AdEventType,
} from 'react-native-google-mobile-ads';
import { AD_CONFIG } from '@/constants/ads';

// Global state to track cooldown across all hook instances
let lastShownTime = 0;

export function useRewardedAd() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const adRef = useRef<RewardedAd | null>(null);
  const unsubscribeLoadedRef = useRef<(() => void) | null>(null);
  const unsubscribeEarnedRef = useRef<(() => void) | null>(null);
  const unsubscribeClosedRef = useRef<(() => void) | null>(null);
  const onCloseCallbackRef = useRef<((rewarded: boolean) => void) | null>(null);
  const earnedRewardRef = useRef(false);

  const canShowAd = useCallback(() => {
    if (Platform.OS === 'web') return false;
    return Date.now() - lastShownTime >= AD_CONFIG.COOLDOWN_MS;
  }, []);

  const loadAd = useCallback(() => {
    if (Platform.OS === 'web') return;

    // Clean up previous listeners
    if (unsubscribeLoadedRef.current) {
      unsubscribeLoadedRef.current();
    }
    if (unsubscribeEarnedRef.current) {
      unsubscribeEarnedRef.current();
    }
    if (unsubscribeClosedRef.current) {
      unsubscribeClosedRef.current();
    }

    const rewarded = RewardedAd.createForAdRequest(AD_CONFIG.REWARDED_ID);
    adRef.current = rewarded;

    unsubscribeLoadedRef.current = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setIsLoaded(true);
    });

    unsubscribeEarnedRef.current = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
      earnedRewardRef.current = true;
    });

    unsubscribeClosedRef.current = rewarded.addAdEventListener(AdEventType.CLOSED, () => {
      setIsShowing(false);
      setIsLoaded(false);
      // Call the onClose callback with whether reward was earned
      if (onCloseCallbackRef.current) {
        onCloseCallbackRef.current(earnedRewardRef.current);
        onCloseCallbackRef.current = null;
      }
      earnedRewardRef.current = false;
      // Preload next ad
      loadAd();
    });

    rewarded.load();
  }, []);

  useEffect(() => {
    loadAd();

    return () => {
      if (unsubscribeLoadedRef.current) {
        unsubscribeLoadedRef.current();
      }
      if (unsubscribeEarnedRef.current) {
        unsubscribeEarnedRef.current();
      }
      if (unsubscribeClosedRef.current) {
        unsubscribeClosedRef.current();
      }
    };
  }, [loadAd]);

  const showAd = useCallback((onClose?: (rewarded: boolean) => void) => {
    if (Platform.OS === 'web') {
      onClose?.(true);
      return;
    }
    if (!isLoaded || isShowing) {
      onClose?.(true);
      return;
    }
    if (!canShowAd()) {
      onClose?.(true);
      return;
    }

    try {
      setIsShowing(true);
      lastShownTime = Date.now();
      earnedRewardRef.current = false;
      onCloseCallbackRef.current = onClose || null;
      adRef.current?.show();
    } catch (error) {
      console.log('Failed to show rewarded ad:', error);
      setIsShowing(false);
      onClose?.(true);
    }
  }, [isLoaded, isShowing, canShowAd]);

  return {
    isLoaded,
    isShowing,
    showAd,
    canShowAd: canShowAd(),
  };
}
