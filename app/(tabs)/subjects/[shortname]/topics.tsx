import { ScrollView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { GradientBackground } from '@/components/home/gradient-background';
import { Logo } from '@/components/home/logo';
import { TopicsList } from '@/components/topics/topics-list';

function TopicsScreen() {
  const { shortname } = useLocalSearchParams<{ shortname: string }>();

  if (!shortname) {
    return (
      <GradientBackground>
        <View style={styles.wrapper}>
          <View style={styles.stickyLogo}>
            <Logo />
          </View>
          <View style={styles.errorContainer}>
            <View style={styles.errorMessage}>
              <p>Invalid subject</p>
            </View>
          </View>
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <View style={styles.wrapper}>
        <View style={styles.stickyLogo}>
          <Logo />
        </View>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.spacer} />
            <TopicsList shortname={shortname} />
          </View>
        </ScrollView>
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
    paddingBottom: 80,
  },
  spacer: {
    height: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  errorMessage: {
    fontSize: 16,
    color: '#ef4444',
  },
});

export default TopicsScreen;
