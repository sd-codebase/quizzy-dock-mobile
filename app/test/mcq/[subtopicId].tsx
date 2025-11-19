import { View, ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { GradientBackground } from '@/components/home/gradient-background';
import { Logo } from '@/components/home/logo';
import { TestTitle } from '@/components/test/mcq/test-title';
import { TestBadge } from '@/components/test/mcq/test-badge';
import { ProgressCounter } from '@/components/test/mcq/progress-counter';
import { ProgressBar } from '@/components/test/mcq/progress-bar';
import { QuestionText } from '@/components/test/mcq/question-text';
import { OptionsContainer } from '@/components/test/mcq/options-container';
import { NextButton } from '@/components/test/mcq/next-button';
import { GoBackButton } from '@/components/test/mcq/go-back-button';
import { ScoreDisplay } from '@/components/test/mcq/score-display';
import { ResultSummary } from '@/components/test/mcq/result-summary';
import { ResultActions } from '@/components/test/mcq/result-actions';
import { fetchMCQQuestions } from '@/services/quizService';
import type { MCQQuestion } from '@/types/api';

const TIME_LIMIT = 15; // 15 seconds per question
const LOADER_DELAY = 1000; // 1 second loader between questions

interface UserAnswer {
  questionId: string;
  selectedIndex: number | null;
  isCorrect: boolean;
}

type ScreenState = 'testing' | 'results' | 'review';

export default function MCQScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    subtopicId: string;
    subtopicName: string;
    topicName: string;
    subject: string;
  }>();

  // State management
  const [questions, setQuestions] = useState<MCQQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(TIME_LIMIT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [screenState, setScreenState] = useState<ScreenState>('testing');
  const [showingLoader, setShowingLoader] = useState(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const loaderTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate score
  const correctCount = userAnswers.filter((a) => a.isCorrect).length;
  const incorrectCount = userAnswers.filter((a) => !a.isCorrect).length;

  // Load questions on mount
  useEffect(() => {
    loadQuestions();

    // Cleanup function
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (loaderTimeoutRef.current) clearTimeout(loaderTimeoutRef.current);
    };
  }, []);

  // Timer effect
  useEffect(() => {
    if (screenState !== 'testing' || !questions.length || showingLoader) return;

    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleAutoAdvance();
          return TIME_LIMIT;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [screenState, questions.length, currentIndex, showingLoader]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!params.subtopicId) {
        throw new Error('Subtopic ID is required');
      }
      const data = await fetchMCQQuestions(params.subtopicId);
      if (data.length === 0) {
        throw new Error('No questions found for this subtopic');
      }
      setQuestions(data);
      // Initialize user answers array
      setUserAnswers(
        data.map((q) => ({
          questionId: q._id || q.id || '',
          selectedIndex: null,
          isCorrect: false,
        }))
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load questions';
      setError(errorMessage);
      console.error('Error loading MCQ questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAnswer = (index: number) => {
    if (selectedAnswer !== null) return; // Prevent changing selection

    const currentQuestion = questions[currentIndex];
    const isCorrect = index === currentQuestion.correct_answer;

    setSelectedAnswer(index);
    setUserAnswers((prev) => {
      const updated = [...prev];
      updated[currentIndex] = {
        ...updated[currentIndex],
        selectedIndex: index,
        isCorrect,
      };
      return updated;
    });
  };

  const handleAutoAdvance = () => {
    if (selectedAnswer === null) {
      // Mark as incorrect if no answer selected
      setUserAnswers((prev) => {
        const updated = [...prev];
        updated[currentIndex] = {
          ...updated[currentIndex],
          selectedIndex: null,
          isCorrect: false,
        };
        return updated;
      });
    }
    handleNext();
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      // Show loader before moving to next question
      setShowingLoader(true);
      loaderTimeoutRef.current = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setTimeRemaining(TIME_LIMIT);
        setShowingLoader(false);
      }, LOADER_DELAY);
    } else {
      // Test complete
      setScreenState('results');
    }
  };

  const handleReview = () => {
    setScreenState('review');
    setCurrentIndex(0);
  };

  const handleRetake = () => {
    setScreenState('testing');
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setUserAnswers(
      questions.map((q) => ({
        questionId: q._id || q.id || '',
        selectedIndex: null,
        isCorrect: false,
      }))
    );
    setTimeRemaining(TIME_LIMIT);
  };

  const handleGoToTopics = () => {
    router.back();
  };

  if (loading) {
    return (
      <GradientBackground>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Loading MCQ Test...</Text>
        </View>
      </GradientBackground>
    );
  }

  if (error) {
    return (
      <GradientBackground>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <NextButton
            onPress={handleGoToTopics}
            disabled={false}
          />
        </View>
      </GradientBackground>
    );
  }

  if (screenState === 'results') {
    return (
      <GradientBackground>
        <View style={styles.mainContainer}>
          {/* Sticky Logo */}
          <View style={styles.logoContainer}>
            <Logo />
          </View>

          {/* Scrollable Content */}
          <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              <Text style={styles.resultTitle}>Test Complete</Text>
              <ScoreDisplay score={correctCount} total={questions.length} />
              <ResultSummary
                correct={correctCount}
                incorrect={incorrectCount}
                total={questions.length}
              />
              <ResultActions
                onReview={handleReview}
                onRetake={handleRetake}
                onGoToTopics={handleGoToTopics}
              />
            </View>
          </ScrollView>
        </View>
      </GradientBackground>
    );
  }

  if (screenState === 'review') {
    const currentQuestion = questions[currentIndex];
    const currentAnswer = userAnswers[currentIndex];

    return (
      <GradientBackground>
        <View style={styles.mainContainer}>
          {/* Sticky Logo */}
          <View style={styles.logoContainer}>
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
                  <TestBadge testType="mcq" />
                  <ProgressCounter current={currentIndex + 1} total={questions.length} />
                </View>
              </View>

              <QuestionText text={currentQuestion.question} />

            <OptionsContainer
              options={currentQuestion.options}
              selectedIndex={currentAnswer.selectedIndex}
              correctIndex={currentQuestion.correct_answer}
              showResults={true}
              onSelectOption={() => {}}
            />

            {currentQuestion.explanation && (
              <View style={styles.explanationBox}>
                <Text style={styles.explanationLabel}>Explanation</Text>
                <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
              </View>
            )}

            </View>
          </ScrollView>

          {/* Fixed Navigation Buttons */}
          <View style={styles.buttonContainer}>
            <View style={styles.buttonRow}>
              <GoBackButton
                onPress={handleGoToTopics}
              />
              <NextButton
                onPress={() => {
                  if (currentIndex < questions.length - 1) {
                    setCurrentIndex(currentIndex + 1);
                  } else {
                    handleGoToTopics();
                  }
                }}
                isLastQuestion={currentIndex === questions.length - 1}
              />
            </View>
          </View>
        </View>
      </GradientBackground>
    );
  }

  // Testing state
  const currentQuestion = questions[currentIndex];
  const currentAnswer = userAnswers[currentIndex];

  if (showingLoader) {
    return (
      <GradientBackground>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#6366f1" />
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <View style={styles.mainContainer}>
        {/* Sticky Logo */}
        <View style={styles.logoContainer}>
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
                <TestBadge testType="mcq" />
                <ProgressCounter current={currentIndex + 1} total={questions.length} />
              </View>
            </View>

            {/* Progress Bar */}
            <ProgressBar
              current={currentIndex + 1}
              total={questions.length}
              timeRemaining={timeRemaining}
              timeLimit={TIME_LIMIT}
            />

            {/* Question */}
            <QuestionText text={currentQuestion.question} />

            {/* Options */}
            <OptionsContainer
              options={currentQuestion.options}
              selectedIndex={selectedAnswer}
              correctIndex={currentQuestion.correct_answer}
              showResults={false}
              onSelectOption={handleSelectAnswer}
            />
          </View>
        </ScrollView>

        {/* Fixed Buttons */}
        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            <GoBackButton
              onPress={handleGoToTopics}
            />
            <NextButton
              onPress={handleNext}
              disabled={selectedAnswer === null}
              isLastQuestion={currentIndex === questions.length - 1}
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
    paddingBottom: 16,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#2a2d45',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  headerContainer: {
    flexDirection: 'column',
    marginBottom: 16,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerRight: {
    gap: 12,
    alignItems: 'flex-end',
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
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  explanationBox: {
    backgroundColor: '#e0e7ff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  explanationLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366f1',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  explanationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4f46e5',
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  reviewNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
});
