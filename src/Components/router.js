import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "../Pages/home";
import Header from "./Header/header";
import Dashboard from '../Pages/dashboard';
import Schedule from '../Pages/schedule';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import { ContextFunction } from "../Context/contextProvider";
import Pricing from "../Pages/Pricing";
import Contact from "../Pages/Contact";
import styles from './router.module.css';
import AdminPanel from "../Pages/AdminPanel";
import ColorBlend from "./ColorBlend/colorBlend";

function RouterComponent() {
    const obj = ContextFunction();
    const { user } = obj;

    let location = useLocation();
    let isOnlineSchedule = location.pathname.includes('online');

    return (
        <div className={styles.relative}>
            {
                isOnlineSchedule ? <></> : <Header />
            }
            <div className={styles.colorsContainer}>
                <ColorBlend />
            </div>
            {/* All possible routes */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/schedule/online" element={<Schedule />} />
                {/* Protected routes with children inside*/}
                <Route element={<ProtectedRoute user={user} />}>
                    <Route path="/dashboard" element={user.email === '1leanbone' ? <AdminPanel /> : <Dashboard />} />
                    <Route path="/schedule" element={<Schedule />} />
                </Route>
                <Route path="*" element={<HomePage />} />
            </Routes>
        </div>
    );
}

export default RouterComponent;