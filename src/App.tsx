import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Notebooks } from './pages/Notebooks';
import { Tasks } from './pages/Tasks';
import { Quizzes } from './pages/Quizzes';
import { Progress } from './pages/Progress';
import { StudySessions } from './pages/StudySessions';
import { Mentor } from './pages/Mentor';
import { Settings } from './pages/Settings';
import { useAppStore } from './store';
import './styles/globals.css';

function App() {
    const initializeApp = useAppStore(state => state.initializeApp);

    useEffect(() => {
        initializeApp();
    }, [initializeApp]);

    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/notebooks" element={<Notebooks />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/quizzes" element={<Quizzes />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/sessions" element={<StudySessions />} />
                    <Route path="/mentor" element={<Mentor />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
