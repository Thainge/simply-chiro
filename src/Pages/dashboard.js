import React, { useEffect, useState } from "react";
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';
import ReactBigCalendar from '../Components/DatePicker/picker';
import { CancelAppointment, ChangeAppointmentDate, GetAppointments } from "../Hooks/AppointmentHooks";
import { ContextFunction } from '../Context/contextProvider';
import styles from './dashboard.module.css';
import DashboardItem from "../Components/DashboardItem/DashboardItem";
import { dbGetAvailability, dbSetAvailability } from "../Hooks/Availability";
import { dbGetExclusions, dbUpdateExclusions } from "../Hooks/Exclusions";
import Card from "../Components/Card/Card";
import PuffLoader from "react-spinners/PuffLoader";

function compareTwoDates(date1, date2) {
    let oneDate = new Date(date1);
    let twoDate = new Date(date2);

    let oneSeconds = oneDate.getSeconds();
    let oneMinutes = oneDate.getMinutes();
    let oneHours = oneDate.getHours();
    let oneDay = oneDate.getDate();
    let oneYear = oneDate.getFullYear();

    let twoSeconds = twoDate.getSeconds();
    let twoMinutes = twoDate.getMinutes();
    let twoHours = twoDate.getHours();
    let twoDay = twoDate.getDate();
    let twoYear = twoDate.getFullYear();

    if (
        oneSeconds === twoSeconds
        && oneMinutes === twoMinutes
        && oneHours === twoHours
        && oneDay === twoDay
        && oneYear === twoYear
    ) {
        return true;
    }
    return false;
}

function Dashboard() {
    const obj = ContextFunction();
    const { user } = obj;

    const [loading, setLoading] = useState(false);

    const [appDate, setAppDate] = useState('');
    const [selectedApp, setSelectedApp] = useState(false);
    const [selectedTime, setSelectedTime] = useState(false);

    const [datePickerIsOpen, setDatePickerIsOpen] = useState(false);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);

    const [showError, setShowError] = useState('');

    const [currentID, setCurrentID] = useState(0);

    const [appointments, setAppointments] = useState([]);

    const submitFunction = async () => {
        if (!selectedApp) {
            setShowError(() => 'Please select an appointment date');
            if (showError.length < 1) {
                setTimeout(() => {
                    setShowError(() => '');
                }, 3000);
            }
            return;
        }

        if (!selectedTime) {
            setShowError(() => 'Please select an appointment time');
            if (showError.length < 1) {
                setTimeout(() => {
                    setShowError(() => '');
                }, 3000);
            }
        }

        let newDate = appDate;
        let appointmentDate = newDate.toLocaleString();
        let AmPm = appointmentDate.slice(-2);
        let finishedDate = appointmentDate.slice(0, appointmentDate.length - 6);
        let readyDate = `${finishedDate} ${AmPm}`;

        let foundObj = appointments.find((item, index) => {
            if (item.id === currentID) {
                return item;
            }
        });
        let readyItem = { ...foundObj, date: readyDate, realDate: appDate };

        // Change appointment date
        await ChangeAppointmentDate(currentID, readyItem);

        let foundItem = appointments.find((item, index) => {
            if (item.id === currentID) {
                return item;
            }
        });
        const exclusionsDB = await dbGetExclusions();
        let exclusionArray = [];

        // Check for same dates as newly
        exclusionsDB.forEach((item) => {
            const isSame = compareTwoDates(foundItem.realDate, item.date);
            if (!isSame) {
                exclusionArray.push(item)
            }
        });
        let newItem = {
            date: new Date(appDate),
        };
        exclusionArray.push(newItem);

        await dbUpdateExclusions(exclusionArray);
        window.location.reload();
    }

    const cancelAppointment = async () => {
        await CancelAppointment(currentID);
        let foundItem = appointments.find((item, index) => {
            if (item.id === currentID) {
                return item;
            }
        });

        const exclusionsDB = await dbGetExclusions();
        let exclusionArray = [];
        exclusionsDB.forEach((item) => {
            const isSame = compareTwoDates(foundItem.realDate, item.date);
            if (!isSame) {
                exclusionArray.push(item)
            }
        });
        await dbUpdateExclusions(exclusionArray);
        window.location.reload();
    }

    const getAppointmentsData = async () => {
        setLoading(() => true);
        const response = await GetAppointments(user.email);

        let readyData = response.sort((a, b) =>
            a.realDate.localeCompare(b.realDate)
        );

        setAppointments(readyData);
        setLoading(() => false);
    }

    useEffect(() => {
        if (user.success) {
            getAppointmentsData();
        }
    }, [user])

    return (
        <>
            <div className={styles.container}>
                <div className={styles.childContainer}>
                    <h2 className={styles.h2}>Schedule New</h2>
                    <Card />

                    <div className={styles.header}>
                        <h2 className={styles.h22}>Appointments</h2>
                    </div>
                    <ul className={styles.list}>
                        <li className={styles.listHeader}>
                            <div className={styles.itemBold}>Appointment Type</div>
                            <div className={styles.itemBold}>Duration</div>
                            <div className={styles.itemBold}>Date & Time</div>
                            <div className={styles.itemBold}>Status</div>
                            <div className={styles.itemBold}>Edit</div>
                        </li>
                        <li className={styles.itemsContainer}>
                            {
                                loading ? <div className={styles.centerLoader}>
                                    <PuffLoader color="#1e2438" />
                                </div> : <>
                                    {
                                        appointments.map((item, index) => (
                                            <DashboardItem setCurrentID={setCurrentID} item={item} setDatePickerIsOpen={setDatePickerIsOpen} setDeleteIsOpen={setDeleteIsOpen} key={index} />
                                        ))
                                    }
                                </>
                            }
                        </li>
                        <div className={styles.showing}>
                            Sorted by time, showing {appointments.length} out of {appointments.length} appointments
                        </div>
                    </ul>

                </div>
            </div>
            {
                datePickerIsOpen ? <div className={styles.overlay} onClick={() => setDatePickerIsOpen(false)}>
                    <div className={styles.CalendarContainer} onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}>
                        <ReactBigCalendar appDate={appDate} setAppDate={setAppDate} setSelectedTime={setSelectedTime} setSelectedApp={setSelectedApp} />
                        {
                            showError.length > 0 ? <Fade up duration={500} distance={'2em'}>
                                <div className={styles.error}>
                                    <div className={styles.errorIcon}>!</div>
                                    <div className={styles.errorText}>{showError}</div>
                                </div>
                            </Fade> : <></>
                        }
                        <div className={styles.closeButton} onClick={() => setDatePickerIsOpen(false)}>✕</div>
                        <div className={styles.submitButton} onClick={() => setDatePickerIsOpen(false)}>Cancel</div>
                        <div className={styles.cancelButton} onClick={submitFunction}>Submit</div>
                    </div>
                </div> : <></>
            }
            {
                deleteIsOpen ? <div className={styles.overlay} onClick={() => setDeleteIsOpen(false)}>
                    <div className={styles.cancelContainer} onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}>
                        <div>Are you sure you want to cancel your appointment?</div>
                        <div className={styles.cancelText}>WARNING: This is irreversible</div>
                        <div className={styles.cancelRow}>
                            <div className={styles.no} onClick={() => setDeleteIsOpen(false)}>No, take me back</div>
                            <div className={styles.yes} onClick={cancelAppointment}>Cancel Appointment</div>
                        </div>
                    </div>

                </div>
                    : <></>
            }
        </>
    )
}

export default Dashboard;