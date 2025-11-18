import { ScrollView, StyleSheet, View } from 'react-native';
import { GradientBackground } from '@/components/home/gradient-background';
import { Logo } from '@/components/home/logo';
import { SubjectsList } from '@/components/home/subjects-list';
import type { Subject } from '@/types/api';
import { useRouter } from 'expo-router';

export default function SubjectsScreen() {
  const router = useRouter();

  const handleSubjectPress = (subject: Subject) => {
    console.log('Selected subject:', subject.name);
    // Navigate to quizzes page for this subject
    // router.push(`/quiz/${subject._id}`);
  };

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
