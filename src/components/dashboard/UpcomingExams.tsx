import { useMemo } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { formatDistanceToNow, format, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAppStore } from '../../store';
import styles from './UpcomingExams.module.css';

export function UpcomingExams() {
    const { tasks, subjects } = useAppStore();

    const upcomingExams = useMemo(() => {
        const now = new Date();

        return tasks
            .filter(task => !task.completed && task.dueDate > now)
            .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
            .slice(0, 5)
            .map(task => {
                const subject = subjects.find(s => s.id === task.subjectId);
                const daysUntil = differenceInDays(task.dueDate, now);

                return {
                    ...task,
                    subjectName: subject?.name || 'Sin asignatura',
                    subjectColor: subject?.color,
                    daysUntil,
                    isUrgent: daysUntil <= 3,
                };
            });
    }, [tasks, subjects]);

    return (
        <div className={styles.upcomingContainer}>
            <div className={styles.header}>
                <h3>
                    <Calendar size={24} />
                    Próximos Exámenes y Entregas
                </h3>
            </div>

            {upcomingExams.length === 0 ? (
                <div className={styles.emptyState}>
                    <Clock />
                    <p>No hay exámenes próximos</p>
                </div>
            ) : (
                <div className={styles.examList}>
                    {upcomingExams.map(exam => (
                        <div
                            key={exam.id}
                            className={`${styles.examItem} ${exam.isUrgent ? styles.urgent : ''}`}
                            style={{ borderLeftColor: exam.subjectColor }}
                        >
                            <div className={styles.examInfo}>
                                <div className={styles.examTitle}>{exam.title}</div>
                                <div className={styles.examSubject}>{exam.subjectName}</div>
                            </div>

                            <div className={styles.examDeadline}>
                                <div className={`${styles.countdown} ${exam.isUrgent ? styles.urgent : ''}`}>
                                    {exam.daysUntil === 0 ? '¡HOY!' : `${exam.daysUntil}d`}
                                </div>
                                <div className={styles.deadlineDate}>
                                    {format(exam.dueDate, 'dd MMM', { locale: es })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
