import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientBackground } from '@/components/home/gradient-background';
import { Logo } from '@/components/home/logo';
import { HeaderBadge } from '@/components/home/header-badge';
import { HeroSection } from '@/components/home/hero-section';
import { DescriptionText } from '@/components/home/description-text';
import { CTAButton } from '@/components/home/cta-button';
import { FeatureCard } from '@/components/home/feature-card';
import { BannerAd } from '@/components/ads/banner-ad';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleCTAPress = () => {
    router.push('/(tabs)/explore');
  };

  return (
    <GradientBackground>
      <View style={styles.wrapper}>
        <View style={[styles.stickyLogo, { paddingTop: insets.top }]}>
          <Logo />
        </View>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.spacer} />
            <HeaderBadge />
            <HeroSection />
            <DescriptionText />
            <CTAButton onPress={handleCTAPress} />

            <View style={styles.featureContainer}>
              <FeatureCard title="3 Test Formats" icon="assignment.fill" />
              <FeatureCard title="Output Questions" icon="code.brackets.fill" />
              <FeatureCard title="Interview Prep" icon="lightbulb.fill" />
            </View>
          </View>
        </ScrollView>
        <BannerAd />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  stickyLogo: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  spacer: {
    height: 60,
  },
  featureContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    gap: 20,
    marginTop: 24,
  },
});
