/**
 * Quiz Service - API endpoints for quiz-related operations
 * Centralized module for all quiz data fetching and submissions
 */

import { apiGet, apiPost, apiPut, apiDelete } from './api';
import type {
  Subject,
  Quiz,
  QuizSubmission,
  SubjectsResponse,
  QuizzesResponse,
  QuizDetailResponse,
  SubmissionResponse,
  SubjectWithTopics,
  MCQQuestion,
  MCQQuestionsResponse,
  OutputQuestion,
  OutputQuestionsResponse,
  InterviewQuestion,
  InterviewQuestionsResponse,
} from '@/types/api';

// ============================================================================
// SUBJECTS ENDPOINTS
// ============================================================================

/**
 * Fetch all subjects/courses
 * @param page - Page number (default: 1)
 * @param pageSize - Number of items per page (default: 10)
 * @returns List of subjects
 */
export async function fetchSubjects(
  page: number = 1,
  pageSize: number = 10
): Promise<SubjectsResponse> {
  const endpoint = `/api/subjects?page=${page}&pageSize=${pageSize}`;
  return apiGet<SubjectsResponse>(endpoint);
}

/**
 * Fetch a single subject by ID
 * @param subjectId - The subject ID
 * @returns Subject details
 */
export async function fetchSubjectById(subjectId: string): Promise<Subject> {
  const endpoint = `/api/subjects/${subjectId}`;
  return apiGet<Subject>(endpoint);
}

/**
 * Fetch active subjects only
 * @returns List of active subjects
 */
export async function fetchActiveSubjects(): Promise<Subject[]> {
  const endpoint = '/api/subjects?status=active';
  const response = await apiGet<any>(endpoint);
  return response.data || [];
}

/**
 * Fetch subject by shortname including topics and subtopics
 * @param shortname - The subject shortname (e.g., 'javascript')
 * @returns Subject with topics and subtopics
 */
export async function fetchSubjectByShortname(shortname: string): Promise<SubjectWithTopics> {
  const endpoint = `/api/subjects/by-shortname?shortname=${shortname}`;
  const response = await apiGet<any>(endpoint);
  return response.data;
}

/**
 * Search subjects by name or keyword
 * @param query - Search query
 * @returns List of matching subjects
 */
export async function searchSubjects(query: string): Promise<SubjectsResponse> {
  const endpoint = `/api/subjects/search?q=${encodeURIComponent(query)}`;
  return apiGet<SubjectsResponse>(endpoint);
}

// ============================================================================
// QUIZZES ENDPOINTS
// ============================================================================

/**
 * Fetch all quizzes, optionally filtered by subject
 * @param subjectId - Optional subject ID to filter quizzes
 * @param page - Page number (default: 1)
 * @param pageSize - Number of items per page (default: 10)
 * @returns List of quizzes
 */
export async function fetchQuizzes(
  subjectId?: string,
  page: number = 1,
  pageSize: number = 10
): Promise<QuizzesResponse> {
  let endpoint = `/api/quizzes?page=${page}&pageSize=${pageSize}`;
  if (subjectId) {
    endpoint += `&subjectId=${subjectId}`;
  }
  return apiGet<QuizzesResponse>(endpoint);
}

/**
 * Fetch a single quiz with all questions
 * @param quizId - The quiz ID
 * @returns Quiz details including questions
 */
export async function fetchQuizById(quizId: string): Promise<Quiz> {
  const endpoint = `/api/quizzes/${quizId}`;
  return apiGet<Quiz>(endpoint);
}

/**
 * Fetch quizzes by difficulty level
 * @param difficulty - 'beginner', 'intermediate', or 'advanced'
 * @returns List of quizzes matching difficulty
 */
export async function fetchQuizzesByDifficulty(
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): Promise<QuizzesResponse> {
  const endpoint = `/api/quizzes/difficulty/${difficulty}`;
  return apiGet<QuizzesResponse>(endpoint);
}

// ============================================================================
// SUBMISSION ENDPOINTS
// ============================================================================

/**
 * Submit quiz answers and get results
 * @param quizId - The quiz ID
 * @param userId - The user ID
 * @param answers - Object with question ID as key and answer as value
 * @param timeTaken - Time taken to complete quiz in seconds (optional)
 * @returns Submission result with score
 */
export async function submitQuiz(
  quizId: string,
  userId: string,
  answers: Record<string, string | string[]>,
  timeTaken?: number
): Promise<QuizSubmission> {
  const endpoint = '/api/submissions';
  const payload = {
    quizId,
    userId,
    answers,
    timeTaken,
    submittedAt: new Date().toISOString(),
  };
  const response = await apiPost<SubmissionResponse>(endpoint, payload);
  return response.submission;
}

/**
 * Fetch user's quiz submission history
 * @param userId - The user ID
 * @param page - Page number (default: 1)
 * @returns List of user's submissions
 */
export async function fetchUserSubmissions(
  userId: string,
  page: number = 1
): Promise<QuizSubmission[]> {
  const endpoint = `/api/submissions/user/${userId}?page=${page}`;
  return apiGet<QuizSubmission[]>(endpoint);
}

/**
 * Fetch a specific submission
 * @param submissionId - The submission ID
 * @returns Submission details
 */
export async function fetchSubmissionById(submissionId: string): Promise<QuizSubmission> {
  const endpoint = `/api/submissions/${submissionId}`;
  return apiGet<QuizSubmission>(endpoint);
}

// ============================================================================
// MCQ QUESTIONS ENDPOINTS
// ============================================================================

/**
 * Fetch MCQ questions for a specific subtopic
 * @param subtopicId - The subtopic ID
 * @returns List of MCQ questions
 */
export async function fetchMCQQuestions(subtopicId: string): Promise<MCQQuestion[]> {
  const endpoint = `/api/questions/mcq?topicId=${subtopicId}`;
  const response = await apiGet<MCQQuestionsResponse>(endpoint);
  return response.data || [];
}

// ============================================================================
// TEST FORMAT ENDPOINTS
// ============================================================================

/**
 * Fetch different test format options
 * @returns Available test formats
 */
export async function fetchTestFormats(): Promise<any> {
  const endpoint = '/api/test-formats';
  return apiGet<any>(endpoint);
}

/**
 * Fetch output/code-based questions for a specific subtopic
 * @param subtopicId - The subtopic ID
 * @returns List of output questions
 */
export async function fetchOutputQuestions(subtopicId: string): Promise<OutputQuestion[]> {
  const endpoint = `/api/questions/output?topicId=${subtopicId}`;
  const response = await apiGet<OutputQuestionsResponse>(endpoint);
  return response.data || [];
}

/**
 * Fetch interview questions for a specific subtopic
 * @param subtopicId - The subtopic ID
 * @returns List of interview questions
 */
export async function fetchInterviewQuestions(subtopicId: string): Promise<InterviewQuestion[]> {
  const endpoint = `/api/questions/interview?topicId=${subtopicId}`;
  const response = await apiGet<InterviewQuestionsResponse>(endpoint);
  return response.data || [];
}

/**
 * Fetch interview preparation quizzes
 * @param page - Page number
 * @returns Interview prep quizzes
 */
export async function fetchInterviewQuizzes(page: number = 1): Promise<QuizzesResponse> {
  const endpoint = `/api/quizzes/type/interview?page=${page}`;
  return apiGet<QuizzesResponse>(endpoint);
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Calculate quiz result percentage
 * @param score - User's score
 * @param totalScore - Total possible score
 * @returns Percentage as number (0-100)
 */
export function calculatePercentage(score: number, totalScore: number): number {
  if (totalScore === 0) return 0;
  return Math.round((score / totalScore) * 100);
}

/**
 * Get difficulty level badge color
 * @param difficulty - Difficulty level
 * @returns Color string for UI
 */
export function getDifficultyColor(
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): string {
  const colors = {
    beginner: '#10b981',
    intermediate: '#f59e0b',
    advanced: '#ef4444',
  };
  return colors[difficulty] || '#6b7280';
}
