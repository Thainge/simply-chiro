import { useEffect, useState } from 'react';
import { AddAppointment } from '../../Hooks/AppointmentHooks';
import { dbGetExclusions, dbUpdateExclusions } from '../../Hooks/Exclusions';
import styles from './step4.module.css';
import PuffLoader from "react-spinners/PuffLoader";

function Step4({ formData, setFormData, currentAppointment, selectAppointment, appDate, setAppDate, setSelectedApp, showError, NextStep, BackStep }) {

    const [loading, setLoading] = useState(false);

    let newDate = appDate;
    let appointmentDate = newDate.toLocaleString();
    let AmPm = appointmentDate.slice(-2);
    let finishedDate = appointmentDate.slice(0, appointmentDate.length - 6);
    let readyDate = `${finishedDate} ${AmPm}`;

    const removeAppointmentTime = async (date) => {
        let exclusions = await dbGetExclusions();

        let newArr = [...exclusions];
        let newItem = {
            date: date,
        };

        newArr.push(newItem);
        console.log(newArr);
        await dbUpdateExclusions(newArr);
    }

    const submitForm = async () => {
        setLoading(() => true);
        let readyData = {
            ...formData,
            realDate: appDate,
            date: readyDate,
        }
        await AddAppointment(readyData);
        setLoading(() => false);
        removeAppointmentTime(appDate);
        NextStep();
    }

    return (
        <div className={styles.papa}>
            {
                loading ? <div className={styles.centerLoader}>
                    <PuffLoader color="#1e2438" />
                </div> : <></>
            }

            <div className={styles.container}>

                <div className={loading ? styles.dim : styles.nothing}>
                    <div className={`${styles.button} ${styles.left}`} onClick={BackStep}>🡐 Back</div>
                    <div className={`${styles.button} ${styles.right}`} onClick={submitForm}>Next ➔</div>
                </div>

                <h1 className={styles.header}>Order Confirmation</h1>
                {/* Step 1 */}
                <h2 className={styles.sectionHeader}>Appointment Information</h2>
                <div className={styles.section}>
                    <div className={styles.item}><i className={styles.obj}>Appointment:</i> {formData.type}</div>
                    <div className={styles.item}><i className={styles.obj}>Duration:</i> {formData.time}</div>
                    <div className={styles.item}><i className={styles.obj}>Date:</i> {readyDate}</div>
                </div>

                {/* Step 2 */}
                <h2 className={styles.sectionHeader}>Contact Information</h2>
                <div className={styles.section}>
                    <div className={styles.item}><i className={styles.obj}>Name:</i> {formData.name}</div>
                    <div className={styles.item}><i className={styles.obj}>Email:</i> {formData.email}</div>
                    <div className={styles.item}><i className={styles.obj}>Phone:</i> {formData.phone}</div>
                </div>

                {/* Step 3 */}
                <h2 className={styles.sectionHeader}>Payment Information</h2>
                <div className={styles.section}>
                    <div className={styles.item}><i className={styles.obj}>Coupons Applied:</i> {formData.coupon.name}</div>
                    <div className={styles.item}><i className={styles.obj}>Total:</i> ${formData.total}</div>
                    <div className={styles.item}>
                        {
                            formData.coupon.applied ? <div>{formData.type} - $<i className={styles.crossed}>{formData.cost}</i> ${formData.initalTotal}</div> : <div>{formData.type} - ${formData.cost}</div>
                        }
                        <div>Tax - ${formData.tax}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Step4;