/**
 * TypeScript types and interfaces for API requests and responses
 */

// Subject/Course Types
export interface Subject {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  totalQuizzes?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

// Question Types
export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'code-output' | 'fill-blank';
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
}

// Quiz Types
export interface Quiz {
  id: string;
  title: string;
  description?: string;
  subjectId: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  totalQuestions: number;
  duration?: number; // in minutes
  questions: Question[];
  createdAt?: string;
  updatedAt?: string;
}

// Submission/Answer Types
export interface QuizSubmission {
  quizId: string;
  userId: string;
  answers: Record<string, string | string[]>;
  score: number;
  totalScore: number;
  submittedAt: string;
  timeTaken?: number; // in seconds
}

// Test Format Types
export interface TestFormat {
  id: string;
  name: string;
  description: string;
  quizCount?: number;
}

// API Response Types
export interface SubjectsResponse {
  subjects: Subject[];
  total: number;
  page: number;
  pageSize: number;
}

export interface QuizzesResponse {
  quizzes: Quiz[];
  total: number;
  page: number;
  pageSize: number;
}

export interface QuizDetailResponse {
  quiz: Quiz;
}

export interface SubmissionResponse {
  submission: QuizSubmission;
  message: string;
}

// Common API Error Response
export interface ApiErrorResponse {
  error: string;
  message: string;
  status: number;
  timestamp?: string;
}
