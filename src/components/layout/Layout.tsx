import { Link, useLocation } from 'react-router-dom';
import {
    Home,
    BookOpen,
    CheckSquare,
    FileQuestion,
    BarChart3,
    Timer,
    MessageCircle,
    Settings,
} from 'lucide-react';
import styles from './Layout.module.css';

const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/notebooks', icon: BookOpen, label: 'Cuadernos' },
    { path: '/tasks', icon: CheckSquare, label: 'Tareas' },
    { path: '/quizzes', icon: FileQuestion, label: 'Cuestionarios' },
    { path: '/progress', icon: BarChart3, label: 'Progreso' },
    { path: '/sessions', icon: Timer, label: 'Sesiones' },
    { path: '/mentor', icon: MessageCircle, label: 'Mentor IA' },
    { path: '/settings', icon: Settings, label: 'Ajustes' },
];

export function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();

    return (
        <div className={styles.layout}>
            {/* Desktop Sidebar */}
            <nav className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logo}>
                        📚 IB Study
                    </div>
                </div>

                <div className={styles.navLinks}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                            >
                                <Icon />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {children}
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className={styles.mobileNav}>
                <div className={styles.mobileNavLinks}>
                    {navItems.slice(0, 5).map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`${styles.mobileNavLink} ${isActive ? styles.active : ''}`}
                            >
                                <Icon />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
