import type { Subject, Task, Quiz, QuizAttempt, Grade, StudySession, UserData, UserSettings } from '../types';

// Default subjects for IB student
export const DEFAULT_SUBJECTS: Subject[] = [
    { id: '1', name: 'Matemáticas', level: 'HL', priority: 1, color: 'var(--color-math)' },
    { id: '2', name: 'Química', level: 'HL', priority: 2, color: 'var(--color-chemistry)' },
    { id: '3', name: 'Historia', level: 'SL', priority: 3, color: 'var(--color-history)' },
    { id: '4', name: 'Lengua', level: 'SL', priority: 4, color: 'var(--color-language)' },
    { id: '5', name: 'Física', level: 'SL', priority: 5, color: 'var(--color-physics)' },
    { id: '6', name: 'Inglés', level: 'SL', priority: 6, color: 'var(--color-english)' },
    { id: '7', name: 'TDC', level: 'OTHER', priority: 7, color: 'var(--color-tok)' },
    { id: '8', name: 'Educación Física', level: 'OTHER', priority: 8, color: 'var(--color-pe)' },
    { id: '9', name: 'Dibujo Técnico', level: 'OTHER', priority: 9, color: 'var(--color-drawing)' },
];

const DEFAULT_SETTINGS: UserSettings = {
    theme: 'dark',
    notifications: true,
    mentorFrequency: 'medium',
    defaultQuizDifficulty: 'medium',
    inactivityTimeout: 300000, // 5 minutes in ms
};

// Storage keys
const STORAGE_KEYS = {
    USER_DATA: 'ib_study_app_user_data',
    TASKS: 'ib_study_app_tasks',
    QUIZZES: 'ib_study_app_quizzes',
    QUIZ_ATTEMPTS: 'ib_study_app_quiz_attempts',
    GRADES: 'ib_study_app_grades',
    STUDY_SESSIONS: 'ib_study_app_study_sessions',
};

// Helper to safely parse JSON from localStorage
function getFromStorage<T>(key: string, defaultValue: T): T {
    try {
        const item = localStorage.getItem(key);
        if (!item) return defaultValue;

        const parsed = JSON.parse(item);

        // Convert date strings back to Date objects
        return reviveDates(parsed);
    } catch (error) {
        console.error(`Error reading ${key} from storage:`, error);
        return defaultValue;
    }
}

// Helper to save to localStorage
function saveToStorage<T>(key: string, value: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error saving ${key} to storage:`, error);
    }
}

// Revive Date objects from JSON
function reviveDates(obj: any): any {
    if (obj === null || obj === undefined) return obj;

    if (typeof obj === 'string') {
        // Check if string looks like ISO date
        const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
        if (dateRegex.test(obj)) {
            return new Date(obj);
        }
    }

    if (Array.isArray(obj)) {
        return obj.map(reviveDates);
    }

    if (typeof obj === 'object') {
        const result: any = {};
        for (const key in obj) {
            result[key] = reviveDates(obj[key]);
        }
        return result;
    }

    return obj;
}

// Initialize user data if not exists
export function initializeUserData(): UserData {
    const existing = getFromStorage<UserData | null>(STORAGE_KEYS.USER_DATA, null);

    if (existing) {
        return existing;
    }

    const newUserData: UserData = {
        subjects: DEFAULT_SUBJECTS,
        lastActiveDate: new Date(),
        streakCount: 1,
        settings: DEFAULT_SETTINGS,
        createdAt: new Date(),
    };

    saveToStorage(STORAGE_KEYS.USER_DATA, newUserData);
    return newUserData;
}

// User Data operations
export const userDataStorage = {
    get: (): UserData => getFromStorage(STORAGE_KEYS.USER_DATA, initializeUserData()),
    save: (data: UserData) => saveToStorage(STORAGE_KEYS.USER_DATA, data),
    updateLastActive: () => {
        const data = userDataStorage.get();
        data.lastActiveDate = new Date();
        userDataStorage.save(data);
    },
    updateStreak: (streak: number) => {
        const data = userDataStorage.get();
        data.streakCount = streak;
        userDataStorage.save(data);
    },
};

// Tasks operations
export const tasksStorage = {
    getAll: (): Task[] => getFromStorage(STORAGE_KEYS.TASKS, []),
    save: (tasks: Task[]) => saveToStorage(STORAGE_KEYS.TASKS, tasks),
    add: (task: Task) => {
        const tasks = tasksStorage.getAll();
        tasks.push(task);
        tasksStorage.save(tasks);
    },
    update: (id: string, updates: Partial<Task>) => {
        const tasks = tasksStorage.getAll();
        const index = tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...updates };
            tasksStorage.save(tasks);
        }
    },
    delete: (id: string) => {
        const tasks = tasksStorage.getAll().filter(t => t.id !== id);
        tasksStorage.save(tasks);
    },
};

// Quizzes operations
export const quizzesStorage = {
    getAll: (): Quiz[] => getFromStorage(STORAGE_KEYS.QUIZZES, []),
    save: (quizzes: Quiz[]) => saveToStorage(STORAGE_KEYS.QUIZZES, quizzes),
    add: (quiz: Quiz) => {
        const quizzes = quizzesStorage.getAll();
        quizzes.push(quiz);
        quizzesStorage.save(quizzes);
    },
    delete: (id: string) => {
        const quizzes = quizzesStorage.getAll().filter(q => q.id !== id);
        quizzesStorage.save(quizzes);
    },
};

// Quiz Attempts operations
export const quizAttemptsStorage = {
    getAll: (): QuizAttempt[] => getFromStorage(STORAGE_KEYS.QUIZ_ATTEMPTS, []),
    save: (attempts: QuizAttempt[]) => saveToStorage(STORAGE_KEYS.QUIZ_ATTEMPTS, attempts),
    add: (attempt: QuizAttempt) => {
        const attempts = quizAttemptsStorage.getAll();
        attempts.push(attempt);
        quizAttemptsStorage.save(attempts);
    },
    update: (id: string, updates: Partial<QuizAttempt>) => {
        const attempts = quizAttemptsStorage.getAll();
        const index = attempts.findIndex(a => a.id === id);
        if (index !== -1) {
            attempts[index] = { ...attempts[index], ...updates };
            quizAttemptsStorage.save(attempts);
        }
    },
};

// Grades operations
export const gradesStorage = {
    getAll: (): Grade[] => getFromStorage(STORAGE_KEYS.GRADES, []),
    save: (grades: Grade[]) => saveToStorage(STORAGE_KEYS.GRADES, grades),
    add: (grade: Grade) => {
        const grades = gradesStorage.getAll();
        grades.push(grade);
        gradesStorage.save(grades);
    },
    delete: (id: string) => {
        const grades = gradesStorage.getAll().filter(g => g.id !== id);
        gradesStorage.save(grades);
    },
};

// Study Sessions operations
export const studySessionsStorage = {
    getAll: (): StudySession[] => getFromStorage(STORAGE_KEYS.STUDY_SESSIONS, []),
    save: (sessions: StudySession[]) => saveToStorage(STORAGE_KEYS.STUDY_SESSIONS, sessions),
    add: (session: StudySession) => {
        const sessions = studySessionsStorage.getAll();
        sessions.push(session);
        studySessionsStorage.save(sessions);
    },
};

// Export function for backing up all data
export function exportAllData() {
    return {
        userData: userDataStorage.get(),
        tasks: tasksStorage.getAll(),
        quizzes: quizzesStorage.getAll(),
        quizAttempts: quizAttemptsStorage.getAll(),
        grades: gradesStorage.getAll(),
        studySessions: studySessionsStorage.getAll(),
        exportedAt: new Date().toISOString(),
    };
}

// Import function for restoring data
export function importAllData(data: any) {
    try {
        if (data.userData) userDataStorage.save(data.userData);
        if (data.tasks) tasksStorage.save(data.tasks);
        if (data.quizzes) quizzesStorage.save(data.quizzes);
        if (data.quizAttempts) quizAttemptsStorage.save(data.quizAttempts);
        if (data.grades) gradesStorage.save(data.grades);
        if (data.studySessions) studySessionsStorage.save(data.studySessions);
        return true;
    } catch (error) {
        console.error('Error importing data:', error);
        return false;
    }
}
