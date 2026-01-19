import { create } from 'zustand';
import type { Task, Quiz, QuizAttempt, Grade, StudySession, UserData, Subject } from '../types';
import {
    userDataStorage,
    tasksStorage,
    quizzesStorage,
    quizAttemptsStorage,
    gradesStorage,
    studySessionsStorage,
} from '../utils/storage';
import { calculateStreak } from '../utils/streak';

interface AppState {
    // User data
    userData: UserData;
    subjects: Subject[];

    // Data collections
    tasks: Task[];
    quizzes: Quiz[];
    quizAttempts: QuizAttempt[];
    grades: Grade[];
    studySessions: StudySession[];

    // UI state
    currentPage: string;
    theme: 'dark' | 'light';

    // Actions
    initializeApp: () => void;
    toggleTheme: () => void;
    setCurrentPage: (page: string) => void;

    // Task actions
    addTask: (task: Task) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    deleteTask: (id: string) => void;
    toggleTaskComplete: (id: string) => void;

    // Quiz actions
    addQuiz: (quiz: Quiz) => void;
    deleteQuiz: (id: string) => void;

    // Quiz attempt actions
    addQuizAttempt: (attempt: QuizAttempt) => void;
    updateQuizAttempt: (id: string, updates: Partial<QuizAttempt>) => void;

    // Grade actions
    addGrade: (grade: Grade) => void;
    deleteGrade: (id: string) => void;

    // Study session actions
    addStudySession: (session: StudySession) => void;

    // Streak
    updateStreak: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
    // Initial state
    userData: userDataStorage.get(),
    subjects: userDataStorage.get().subjects,
    tasks: [],
    quizzes: [],
    quizAttempts: [],
    grades: [],
    studySessions: [],
    currentPage: 'dashboard',
    theme: userDataStorage.get().settings.theme,

    // Initialize app - load all data from storage
    initializeApp: () => {
        const userData = userDataStorage.get();
        const streak = calculateStreak();

        set({
            userData: { ...userData, streakCount: streak },
            subjects: userData.subjects,
            tasks: tasksStorage.getAll(),
            quizzes: quizzesStorage.getAll(),
            quizAttempts: quizAttemptsStorage.getAll(),
            grades: gradesStorage.getAll(),
            studySessions: studySessionsStorage.getAll(),
            theme: userData.settings.theme,
        });

        // Apply theme to document
        document.documentElement.setAttribute('data-theme', userData.settings.theme);
    },

    // Toggle theme
    toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        const userData = get().userData;
        userData.settings.theme = newTheme;
        userDataStorage.save(userData);

        document.documentElement.setAttribute('data-theme', newTheme);

        set({ theme: newTheme, userData });
    },

    // Set current page
    setCurrentPage: (page: string) => {
        set({ currentPage: page });
    },

    // Task actions
    addTask: (task: Task) => {
        tasksStorage.add(task);
        set({ tasks: tasksStorage.getAll() });
    },

    updateTask: (id: string, updates: Partial<Task>) => {
        tasksStorage.update(id, updates);
        set({ tasks: tasksStorage.getAll() });
    },

    deleteTask: (id: string) => {
        tasksStorage.delete(id);
        set({ tasks: tasksStorage.getAll() });
    },

    toggleTaskComplete: (id: string) => {
        const tasks = get().tasks;
        const task = tasks.find(t => t.id === id);
        if (task) {
            const updates: Partial<Task> = {
                completed: !task.completed,
                completedAt: !task.completed ? new Date() : undefined,
            };
            tasksStorage.update(id, updates);
            set({ tasks: tasksStorage.getAll() });
        }
    },

    // Quiz actions
    addQuiz: (quiz: Quiz) => {
        quizzesStorage.add(quiz);
        set({ quizzes: quizzesStorage.getAll() });
    },

    deleteQuiz: (id: string) => {
        quizzesStorage.delete(id);
        set({ quizzes: quizzesStorage.getAll() });
    },

    // Quiz attempt actions
    addQuizAttempt: (attempt: QuizAttempt) => {
        quizAttemptsStorage.add(attempt);
        set({ quizAttempts: quizAttemptsStorage.getAll() });

        // Also add study session
        const quiz = get().quizzes.find(q => q.id === attempt.quizId);
        if (quiz && attempt.completedAt) {
            const session: StudySession = {
                id: `session_${Date.now()}`,
                subjectId: quiz.subjectId,
                startTime: attempt.startedAt,
                duration: Math.floor(attempt.timeSpent / 60), // Convert to minutes
                description: `Cuestionario: ${quiz.title}`,
                type: 'quiz',
            };
            get().addStudySession(session);
        }
    },

    updateQuizAttempt: (id: string, updates: Partial<QuizAttempt>) => {
        quizAttemptsStorage.update(id, updates);
        set({ quizAttempts: quizAttemptsStorage.getAll() });
    },

    // Grade actions
    addGrade: (grade: Grade) => {
        gradesStorage.add(grade);
        set({ grades: gradesStorage.getAll() });
    },

    deleteGrade: (id: string) => {
        gradesStorage.delete(id);
        set({ grades: gradesStorage.getAll() });
    },

    // Study session actions
    addStudySession: (session: StudySession) => {
        studySessionsStorage.add(session);
        set({ studySessions: studySessionsStorage.getAll() });
    },

    // Update streak
    updateStreak: () => {
        const streak = calculateStreak();
        const userData = get().userData;
        userData.streakCount = streak;
        set({ userData: { ...userData } });
    },
}));
