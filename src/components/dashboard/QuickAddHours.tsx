import { useState } from 'react';
import { X, Clock, Plus } from 'lucide-react';
import { useAppStore } from '../../store';
import type { StudySession } from '../../types';
import styles from './QuickAddHours.module.css';

interface QuickAddHoursProps {
    isOpen: boolean;
    onClose: () => void;
}

export function QuickAddHours({ isOpen, onClose }: QuickAddHoursProps) {
    const { subjects, addStudySession } = useAppStore();
    const [subjectId, setSubjectId] = useState(subjects[0]?.id || '');
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(30);
    const [description, setDescription] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const totalMinutes = hours * 60 + minutes;
        if (totalMinutes === 0) return;

        const session: StudySession = {
            id: `session_${Date.now()}`,
            subjectId,
            startTime: new Date(Date.now() - totalMinutes * 60 * 1000),
            duration: totalMinutes,
            description: description || undefined,
            type: 'manual',
        };

        addStudySession(session);

        // Reset form
        setHours(0);
        setMinutes(30);
        setDescription('');
        onClose();
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>
                        <Clock size={24} />
                        Añadir Horas Estudiadas
                    </h3>
                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="subject">Asignatura</label>
                        <select
                            id="subject"
                            value={subjectId}
                            onChange={(e) => setSubjectId(e.target.value)}
                            required
                        >
                            {subjects.map(subject => (
                                <option key={subject.id} value={subject.id}>
                                    {subject.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Tiempo Estudiado</label>
                        <div className={styles.timeInputs}>
                            <div className={styles.timeInput}>
                                <input
                                    type="number"
                                    min="0"
                                    max="23"
                                    value={hours}
                                    onChange={(e) => setHours(parseInt(e.target.value) || 0)}
                                />
                                <span>horas</span>
                            </div>
                            <div className={styles.timeInput}>
                                <input
                                    type="number"
                                    min="0"
                                    max="59"
                                    step="5"
                                    value={minutes}
                                    onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                                />
                                <span>minutos</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description">¿Qué estudiaste? (opcional)</label>
                        <textarea
                            id="description"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Ej: Repasé ecuaciones diferenciales..."
                        />
                    </div>

                    <div className={styles.formActions}>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            <Plus size={18} />
                            Añadir
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export function QuickAddButton({ onClick }: { onClick: () => void }) {
    return (
        <button className={styles.quickButton} onClick={onClick}>
            <Plus size={24} />
            Añadir Horas Estudiadas
        </button>
    );
}
