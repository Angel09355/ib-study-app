import { useState } from 'react';
import { StreakCounter } from '../components/dashboard/StreakCounter';
import { UpcomingExams } from '../components/dashboard/UpcomingExams';
import { QuickAddButton, QuickAddHours } from '../components/dashboard/QuickAddHours';
import { MentorMessage } from '../components/dashboard/MentorMessage';
import styles from './Dashboard.module.css';

export function Dashboard() {
    const [showAddHours, setShowAddHours] = useState(false);

    return (
        <div className={styles.dashboard}>
            <div className={styles.pageHeader}>
                <h1>Dashboard</h1>
                <p className={styles.pageSubtitle}>Tu resumen de estudio y actividades</p>
            </div>

            <div className={styles.dashboardGrid}>
                <div className={styles.fullWidth}>
                    <StreakCounter />
                </div>

                <div className={styles.fullWidth}>
                    <MentorMessage />
                </div>

                <div className={styles.fullWidth}>
                    <UpcomingExams />
                </div>

                <div className={styles.fullWidth}>
                    <QuickAddButton onClick={() => setShowAddHours(true)} />
                </div>
            </div>

            <QuickAddHours isOpen={showAddHours} onClose={() => setShowAddHours(false)} />
        </div>
    );
}
