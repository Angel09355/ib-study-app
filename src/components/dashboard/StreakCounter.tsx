import { useEffect } from 'react';
import { useAppStore } from '../../store';
import { getStreakMessage, getStreakEmoji } from '../../utils/streak';
import styles from './StreakCounter.module.css';

export function StreakCounter() {
    const { userData, updateStreak } = useAppStore();

    useEffect(() => {
        updateStreak();
    }, [updateStreak]);

    const streak = userData.streakCount;
    const message = getStreakMessage(streak);
    const emoji = getStreakEmoji(streak);

    return (
        <div className={styles.streakContainer}>
            <div className={styles.streakEmoji}>{emoji}</div>
            <div className={styles.streakCount}>{streak}</div>
            <div className={styles.streakLabel}>
                {streak === 1 ? 'Día de racha' : 'Días de racha'}
            </div>
            <div className={styles.streakMessage}>{message}</div>
        </div>
    );
}
