import { userDataStorage } from './storage';

/**
 * Calculate the current streak based on last active date
 * A streak continues if user was active yesterday or today
 */
export function calculateStreak(): number {
    const userData = userDataStorage.get();
    const now = new Date();
    const lastActive = new Date(userData.lastActiveDate);

    // Reset time to midnight for comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastActiveDay = new Date(
        lastActive.getFullYear(),
        lastActive.getMonth(),
        lastActive.getDate()
    );

    const diffTime = today.getTime() - lastActiveDay.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        // Same day - maintain streak
        return userData.streakCount;
    } else if (diffDays === 1) {
        // One day passed - increment streak
        const newStreak = userData.streakCount + 1;
        userDataStorage.updateStreak(newStreak);
        userDataStorage.updateLastActive();
        return newStreak;
    } else {
        // Streak broken - reset to 1
        userDataStorage.updateStreak(1);
        userDataStorage.updateLastActive();
        return 1;
    }
}

/**
 * Check if the user should be considered active today
 */
export function updateDailyActivity(): void {
    calculateStreak();
}

/**
 * Get a motivational message based on streak
 */
export function getStreakMessage(streak: number): string {
    if (streak === 1) {
        return '¡Bienvenido! Comienza tu racha de estudio hoy.';
    } else if (streak < 7) {
        return `¡Vas bien! ${streak} días seguidos estudiando.`;
    } else if (streak < 30) {
        return `¡Impresionante! ${streak} días de racha. Sigue así.`;
    } else if (streak < 100) {
        return `¡Increíble! ${streak} días de racha. Eres imparable.`;
    } else {
        return `¡LEGENDARIO! ${streak} días de racha. Eres un ejemplo.`;
    }
}

/**
 * Get streak emoji based on count
 */
export function getStreakEmoji(streak: number): string {
    if (streak < 3) return '🔥';
    if (streak < 7) return '🔥🔥';
    if (streak < 30) return '🔥🔥🔥';
    if (streak < 100) return '💪🔥🔥🔥';
    return '👑🔥🔥🔥';
}
