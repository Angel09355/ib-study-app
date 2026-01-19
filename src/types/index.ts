// Core data types for the IB Study App

export type SubjectLevel = 'HL' | 'SL' | 'OTHER';
export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskType = 'homework' | 'exam' | 'ia' | 'ee' | 'event';
export type QuestionType = 'multiple-choice' | 'true-false' | 'short-answer' | 'open';
export type QuizSource = 'manual' | 'ai-generated';

export interface Subject {
    id: string;
    name: string;
    level: SubjectLevel;
    priority: number;
    color: string;
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    subjectId: string;
    dueDate: Date;
    priority: TaskPriority;
    completed: boolean;
    completedAt?: Date;
    tags: string[];
    type: TaskType;
    createdAt: Date;
}

export interface Question {
    id: string;
    type: QuestionType;
    question: string;
    options?: string[];
    correctAnswer: string | string[];
    explanation: string;
    relatedMaterial?: string;
}

export interface Quiz {
    id: string;
    title: string;
    subjectId: string;
    topicId?: string;
    questions: Question[];
    estimatedTime: number;
    createdAt: Date;
    source: QuizSource;
}

export interface QuizAnswer {
    questionId: string;
    answer: string | string[];
    timeSpent: number;
}

export interface QuizAttempt {
    id: string;
    quizId: string;
    startedAt: Date;
    completedAt?: Date;
    timeSpent: number;
    answers: QuizAnswer[];
    score: number;
    pausedAt?: Date;
    pausedDuration?: number;
}

export interface Grade {
    id: string;
    subjectId: string;
    value: number;
    type: string;
    date: Date;
    weight?: number;
    topic?: string;
}

export interface StudySession {
    id: string;
    subjectId: string;
    startTime: Date;
    duration: number;
    description?: string;
    type: 'manual' | 'timer' | 'quiz';
    relatedExamId?: string;
}

export interface Goal {
    id: string;
    type: 'daily' | 'weekly' | 'subject' | 'exam';
    target: number;
    subjectId?: string;
    examId?: string;
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt?: Date;
}

export interface UserSettings {
    theme: 'dark' | 'light';
    notifications: boolean;
    mentorFrequency: 'high' | 'medium' | 'low';
    defaultQuizDifficulty: 'easy' | 'medium' | 'hard';
    inactivityTimeout: number;
}

export interface UserData {
    subjects: Subject[];
    lastActiveDate: Date;
    streakCount: number;
    settings: UserSettings;
    createdAt: Date;
}

export interface NotebookTopic {
    id: string;
    subjectId: string;
    name: string;
    order: number;
    createdAt: Date;
}

export interface NotebookFile {
    id: string;
    topicId: string;
    name: string;
    type: string;
    size: number;
    uploadedAt: Date;
    url?: string;
}
