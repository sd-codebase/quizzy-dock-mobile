import { View, ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientBackground } from '@/components/home/gradient-background';
import { Logo } from '@/components/home/logo';
import { TestTitle } from '@/components/test/mcq/test-title';
import { TestBadge } from '@/components/test/mcq/test-badge';
import { ProgressCounter } from '@/components/test/mcq/progress-counter';
import { QuestionText } from '@/components/test/mcq/question-text';
import { GoBackButton } from '@/components/test/mcq/go-back-button';
import { NextButton } from '@/components/test/mcq/next-button';
import { SampleAnswerCard } from '@/components/test/interview/sample-answer-card';
import { AdditionalNotesCard } from '@/components/test/interview/additional-notes-card';
import { InterviewResults } from '@/components/test/interview/interview-results';
import { fetchInterviewQuestions } from '@/services/quizService';
import { useRewardedAd } from '@/hooks/use-rewarded-ad';
import type { InterviewQuestion } from '@/types/api';

export default function InterviewTestScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    subtopicId: string;
    subtopicName: string;
    topicName: string;
    subject: string;
  }>();

  // Rewarded ad
  const { showAd, canShowAd, isLoaded: adLoaded } = useRewardedAd();
  const hasShownStartAd = useRef(false);
  const [adSkipMessage, setAdSkipMessage] = useState<string | null>(null);

  // State management
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testStarted, setTestStarted] = useState(false);

  // Load questions on mount
  useEffect(() => {
    loadQuestions();
  }, []);

  // Show interstitial ad on test start (wait for ad to load)
  useEffect(() => {
    if (loading || questions.length === 0) return;
    if (testStarted) return;
    if (hasShownStartAd.current) return;

    if (canShowAd && adLoaded) {
      hasShownStartAd.current = true;
      showAd((rewarded) => {
        if (rewarded) {
          setTestStarted(true);
        } else {
          setAdSkipMessage('Please watch the full ad to start the test');
          setTimeout(() => router.back(), 2000);
        }
      });
      return;
    }

    if (!canShowAd) {
      hasShownStartAd.current = true;
      setTestStarted(true);
      return;
    }

    // Wait up to 3 seconds for ad to load
    const timeout = setTimeout(() => {
      if (!hasShownStartAd.current) {
        hasShownStartAd.current = true;
        setTestStarted(true);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [loading, canShowAd, adLoaded, showAd, questions.length, testStarted]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!params.subtopicId) {
        throw new Error('Subtopic ID is required');
      }
      const data = await fetchInterviewQuestions(params.subtopicId);
      if (data.length === 0) {
        throw new Error('No questions found for this subtopic');
      }
      setQuestions(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load questions';
      setError(errorMessage);
      console.error('Error loading interview questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowAnswer = () => {
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      // Move to next question
      setCurrentIndex(currentIndex + 1);
      setShowExplanation(false);
    } else {
      // Test complete
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setShowExplanation(false);
    setShowResult(false);
  };

  const handleChooseNewTopic = () => {
    router.back();
  };

  if (loading || !testStarted) {
    return (
      <GradientBackground>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>
            {adSkipMessage ? adSkipMessage : loading ? 'Loading Interview Questions...' : 'Starting Test...'}
          </Text>
        </View>
      </GradientBackground>
    );
  }

  if (error) {
    return (
      <GradientBackground>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <Text style={styles.errorSubtext}>Unable to load questions</Text>
        </View>
      </GradientBackground>
    );
  }

  if (showResult) {
    return (
      <GradientBackground>
        <InterviewResults
          total={questions.length}
          onRestart={handleRestart}
          onChooseNewTopic={handleChooseNewTopic}
        />
      </GradientBackground>
    );
  }

  // Testing state
  const currentQuestion = questions[currentIndex];

  return (
    <GradientBackground>
      <View style={styles.mainContainer}>
        {/* Sticky Logo */}
        <View style={[styles.logoContainer, { paddingTop: insets.top }]}>
          <Logo />
        </View>

        {/* Scrollable Content */}
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.headerContainer}>
              <View>
                <TestTitle
                  topicName={params.topicName || 'Topic'}
                  subtopicName={params.subtopicName || 'Subtopic'}
                />
              </View>
              <View style={styles.badgesRow}>
                <TestBadge testType="interview" />
                <ProgressCounter current={currentIndex + 1} total={questions.length} />
              </View>
            </View>

            {/* Question */}
            <QuestionText text={currentQuestion.question} />

            {/* Sample Answer and Additional Notes (shown after Show Answer) */}
            {showExplanation && (
              <>
                <SampleAnswerCard answer={currentQuestion.answer} />
                {currentQuestion.explanation && (
                  <AdditionalNotesCard notes={currentQuestion.explanation} />
                )}
              </>
            )}
          </View>
        </ScrollView>

        {/* Fixed Buttons */}
        <View style={[styles.buttonContainer, { paddingBottom: 16 + insets.bottom }]}>
          <View style={styles.buttonRow}>
            <GoBackButton
              onPress={handleChooseNewTopic}
            />
            <NextButton
              onPress={showExplanation ? handleNext : handleShowAnswer}
              disabled={false}
              isLastQuestion={showExplanation && currentIndex === questions.length - 1}
              label={showExplanation ? (currentIndex === questions.length - 1 ? 'Finish' : 'Next') : 'Show Answer'}
            />
          </View>
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  logoContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2d45',
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 32,
  },
  headerContainer: {
    flexDirection: 'column',
    marginBottom: 16,
    gap: 12,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#9ca3af',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
  },
  errorSubtext: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#2a2d45',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
});
