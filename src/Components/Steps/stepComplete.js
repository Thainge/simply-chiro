import { Link } from 'react-router-dom';
import styles from './stepComplete.module.css';
import { useLocation } from "react-router-dom";

function StepComplete({ formData, setFormData, currentAppointment, selectAppointment, appDate, setAppDate, setSelectedApp, showError, NextStep, BackStep }) {

    let location = useLocation();
    let isOnlineSchedule = location.pathname.includes('online');

    return (
        <div className={styles.container}>
            <h2>Order Confirmed</h2>
            <div className={styles.section}>
                <div>Your order has been successfully placed!</div>
                {
                    isOnlineSchedule
                        ? <></>
                        : <>
                            <div>You can view and modify your appointments at the <i><Link className={styles.link} to={'/dashboard'}>Dashboard</Link></i></div>
                            <Link to={'/dashboard'} className={styles.button}>Go To Dashboard</Link></>
                }
            </div>
            <div className={styles.text}><span className={styles.email}>✉</span> A confirmation email will be sent to {formData.email}</div>
        </div>
    )
}

export default StepComplete;