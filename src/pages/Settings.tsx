import { useAppStore } from '../store';
import { Moon, Sun } from 'lucide-react';

export function Settings() {
    const { theme, toggleTheme } = useAppStore();

    return (
        <div>
            <h1>Ajustes</h1>
            <p>Configura tu aplicación.</p>

            <div className="card" style={{ marginTop: 'var(--spacing-lg)' }}>
                <h3>Tema</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                    Cambia entre modo oscuro y claro
                </p>

                <button className="btn btn-primary" onClick={toggleTheme}>
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    {theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
                </button>
            </div>

            <div className="card" style={{ marginTop: 'var(--spacing-lg)' }}>
                <p style={{ color: 'var(--text-muted)' }}>Más opciones en desarrollo - Fase 4</p>
            </div>
        </div>
    );
}
