import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useEffect } from 'react';
import mobileAds, { AdsConsent, AdsConsentDebugGeography } from 'react-native-google-mobile-ads';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { Platform } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';


export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    const initAds = async () => {
      if (Platform.OS === 'ios') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await requestTrackingPermissionsAsync();
      }
      try {
        await AdsConsent.requestInfoUpdate(__DEV__ ? {
          debugSettings: {
            geography: AdsConsentDebugGeography.EEA,
          },
        } : undefined);
        await AdsConsent.loadAndShowConsentFormIfRequired();
      } catch (e) {
        // Consent errors should not block ads
      } finally {
        mobileAds().initialize();
      }
    };
    initAds();
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="test" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
