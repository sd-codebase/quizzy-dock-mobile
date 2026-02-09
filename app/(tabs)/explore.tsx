import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientBackground } from '@/components/home/gradient-background';
import { Logo } from '@/components/home/logo';
import { SubjectsList } from '@/components/home/subjects-list';
import type { Subject } from '@/types/api';
import { useRouter } from 'expo-router';

export default function SubjectsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleSubjectPress = (subject: Subject) => {
    if (subject.shortName) {
      router.push({
        pathname: `/subjects/${subject.shortName}/topics`,
        params: {
          subjectStatus: subject.status || 'active',
          subjectName: subject.name,
          subjectQuestions: subject.questions || 0,
        },
      });
    }
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
            <SubjectsList onSubjectPress={handleSubjectPress} />
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
    paddingBottom: 32,
  },
  spacer: {
    height: 20,
  },
});
