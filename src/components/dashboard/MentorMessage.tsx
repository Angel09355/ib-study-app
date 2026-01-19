import { useMemo } from 'react';
import { useAppStore } from '../../store';
import styles from './MentorMessage.module.css';

export function MentorMessage() {
    const { userData, tasks, grades } = useAppStore();

    const message = useMemo(() => {
        const streak = userData.streakCount;
        const now = new Date();
        const pendingTasks = tasks.filter(t => !t.completed && t.dueDate > now).length;

        // Check if it's morning, afternoon, or evening
        const hour = now.getHours();
        let greeting = '¡Hola!';
        if (hour < 12) greeting = '¡Buenos días!';
        else if (hour < 20) greeting = '¡Buenas tardes!';
        else greeting = '¡Buenas noches!';

        // Generate contextual message
        if (streak === 1) {
            return `${greeting} Bienvenido de vuelta. ¿Listo para comenzar una nueva racha de estudio?`;
        }

        if (streak >= 7 && streak < 30) {
            return `${greeting} ¡${streak} días de racha! Estás construyendo un hábito sólido. Sigue así.`;
        }

        if (streak >= 30) {
            return `${greeting} ¡${streak} días de racha! Eres un ejemplo de constancia. ¡Impresionante!`;
        }

        if (pendingTasks > 5) {
            return `${greeting} Tienes ${pendingTasks} tareas pendientes. ¿Comenzamos por la más urgente?`;
        }

        if (pendingTasks === 0) {
            return `${greeting} ¡Genial! No tienes tareas pendientes. Es un buen momento para repasar o hacer cuestionarios.`;
        }

        return `${greeting} ¿Qué te gustaría estudiar hoy? Estoy aquí para ayudarte.`;
    }, [userData.streakCount, tasks]);

    return (
        <div className={styles.mentorContainer}>
            <div className={styles.mentorAvatar}>🤖</div>
            <div className={styles.mentorContent}>
                <div className={styles.mentorLabel}>Tu Mentor IA</div>
                <p className={styles.mentorMessage}>{message}</p>
            </div>
        </div>
    );
}
