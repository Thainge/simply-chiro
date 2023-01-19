import ReactBigCalendar from '../DatePicker/picker';
import Fade from 'react-reveal/Fade';
import styles from './step1.module.css';
import { GetInformation } from '../../Hooks/Information';
import { useEffect, useRef, useState } from 'react';
import PuffLoader from "react-spinners/PuffLoader";

function Step1({ formData, setFormData, currentAppointment, selectAppointment, appDate, setAppDate, setSelectedApp, NextStep, setSelectedTime, selectedTime }) {
    const [loading, setLoading] = useState(false);

    const [appointmentsInfo, setAppointmentsInfo] = useState([]);

    const pageLoadInformation = async () => {
        setLoading(() => true);
        const data = await GetInformation();
        setAppointmentsInfo(() => data);
        setLoading(() => false);
    }

    const scrollRef = useRef();

    const scrollToProjects = () => {
        window.scrollTo({
            top: scrollRef.current.offsetTop,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        pageLoadInformation();
        scrollToProjects();
    }, [])

    return (
        <div className={styles.media123}>
            <div className={styles.contentContainer2}>
                <div className={styles.appointmentTitle}>Select an appointment</div>
                <div className={styles.appointmentContainer}>
                    <div className={loading ? styles.dim : styles.nothing}>
                        {
                            appointmentsInfo.map((item, index) => (
                                <div key={index} className={`${styles.appointment} ${currentAppointment === index ? styles.activeAppointment : styles.nothing}`} onClick={() => {
                                    selectAppointment(index);
                                    setFormData((prev) => {
                                        let newData = { ...prev, time: item.time, cost: item.cost, type: item.title };
                                        return newData;
                                    });
                                }}>
                                    <div className={styles.appointmentHeader}>
                                        {item.title}
                                    </div>
                                    <div className={styles.extra}>
                                        <div className={styles.appointmentTime}>
                                            {item.time}
                                        </div>
                                        <div className={styles.extraDash}>
                                            -
                                        </div>
                                        <div className={styles.appointmentCost}>
                                            ${item.cost}
                                        </div>
                                    </div>
                                    <div className={styles.appointmentText}>
                                        {item.description}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {
                        loading ? <div className={styles.centerLoader}>
                            <PuffLoader color="#1e2438" />
                        </div> : <></>
                    }
                </div>
            </div>

            <div className={styles.contentContainer} ref={scrollRef}>
                <div className={styles.calendarContainer}>
                    <div className={styles.calendar}>
                        {
                            currentAppointment !== null
                                ? <ReactBigCalendar firstStep={true} appDate={appDate} setAppDate={setAppDate} setSelectedApp={setSelectedApp} setSelectedTime={setSelectedTime} />
                                : <div className={styles.empty}>
                                    <div className={styles.emptyText}>Select an appointment from the list to view available appointment times.</div>
                                    <img src={require('../../Assets/empty.png')} className={styles.emptyImage} />
                                </div>
                        }
                    </div>
                </div>
                <div className={`${loading ? styles.dim : styles.nothing} ${styles.buttonBottom}}`}>
                    <div className={styles.button} onClick={NextStep}>Next ➔</div>
                </div>
            </div>
        </div>
    )
}

export default Step1;