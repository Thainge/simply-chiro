import React, { useEffect, useState } from "react";
import Fade from 'react-reveal/Fade';
import styles from './schedule.module.css';
import Step1 from "../Components/Steps/step1";
import Step2 from "../Components/Steps/step2";
import Step3 from "../Components/Steps/step3";
import Step4 from "../Components/Steps/step4";
import StepComplete from "../Components/Steps/stepComplete";
import Card from '../Components/Card/Card';
import { useLocation } from "react-router-dom";

function Schedule() {
    // const obj = ContextFunction();
    // const { user } = obj;

    const [appDate, setAppDate] = useState('');
    const [selectedApp, setSelectedApp] = useState(false);
    const [selectedTime, setSelectedTime] = useState(false);
    const [showError, setShowError] = useState('');

    const [shownStep, setShownStep] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);

    const [currentAppointment, setCurrentAppointment] = useState(null);
    const [checked, setChecked] = useState(false);
    const [formData, setFormData] = useState({
        userID: '',
        date: '',
        realDate: '',

        type: '',
        time: '',
        cost: 0,

        name: '',
        email: '',
        phone: '',

        initalTotal: 0,
        total: 0,
        tax: 0,

        couponText: '',
        coupon: {
            name: '',
            applied: false,
            discount: 100,
        },
        finished: false,
    });

    const stepItems = [
        'Schedule',
        'Contact',
        'Payment',
        'Confirm',
    ]

    const selectAppointment = (index) => {
        setCurrentAppointment(() => index)
    }

    const NextStep = () => {
        if (currentAppointment === null) {
            setShowError(() => 'Please select an appointment');
            if (showError.length < 1) {
                setTimeout(() => {
                    setShowError(() => '');
                }, 3000);
            }
            return;
        }

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
            return;
        }

        if (selectedApp && selectedTime && currentAppointment !== null) {
            if (currentStep === shownStep) {
                setShownStep((prev) => {
                    let newStep = prev + 1;
                    setCurrentStep(() => newStep);
                    return newStep;
                });
                setShowError(() => '');
            } else {
                setShownStep((prev) => {
                    let newStep = prev + 1;
                    return newStep;
                });
                setShowError(() => '');
            }
        }

    }

    const backStep = () => {
        setShownStep((prev) => prev - 1);
    }

    let location = useLocation();
    let isOnlineSchedule = location.pathname.includes('online');

    return (
        <div className={styles.container}>
            <div className={`${styles.cardContainer} ${isOnlineSchedule ? styles.extraCard : styles.nothing}`}>
                <Card disableButton={true} showInfo={isOnlineSchedule} />
            </div>
            <div className={styles.childContainer}>
                <div className={styles.headerContainer}>
                    <div className={styles.header}>
                        Book an Appointment
                    </div>
                    <div className={styles.progressBar}>
                        <div className={styles.bar}>
                            <div className={styles.overlayBar} style={{ width: `${currentStep === 0 ? '0' : currentStep === 1 ? '33' : currentStep === 2 ? '66' : '100'}%` }}></div>
                            {
                                stepItems.map((item, index) => (
                                    <div key={index} className={`${currentStep === index || currentStep > index ? styles.doneActive : styles.nothing} ${index === 0 ? styles.progressItem1 : index === 1 ? styles.progressItem2 : index === 2 ? styles.progressItem3 : styles.progressItem4} ${shownStep === 4 ? styles.finished : styles.nothing}`} onClick={() => {
                                        if (currentStep === index || currentStep > index) {
                                            setShownStep(() => index);
                                        }
                                    }}>
                                        <div className={`${styles.circle} ${currentStep === index ? styles.currentCircle : currentStep > index ? styles.doneCircle : styles.nothing}`}>
                                            <div className={styles.number}>{index + 1}</div>
                                        </div>
                                        <div className={`${styles.text} ${currentStep === index ? styles.currentText : currentStep > index ? styles.doneText : styles.nothing}`}>
                                            {item}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className={`${styles.overAllContainer} ${shownStep === 4 ? styles.overFinished : styles.nothing} ${shownStep === 0 ? styles.firstStep : styles.nothing}`}>
                    {
                        shownStep === 0
                            ? <Step1 selectedTime={selectedTime} setSelectedTime={setSelectedTime} NextStep={NextStep} selectAppointment={selectAppointment} appDate={appDate} currentAppointment={currentAppointment} setAppDate={setAppDate} setSelectedApp={setSelectedApp} showError={showError} formData={formData} setFormData={setFormData} />
                            : shownStep === 1 ? <Step2 checked={checked} setChecked={setChecked} NextStep={NextStep} selectAppointment={selectAppointment} appDate={appDate} currentAppointment={currentAppointment} setAppDate={setAppDate} setSelectedApp={setSelectedApp} showError={showError} BackStep={backStep} formData={formData} setFormData={setFormData} />
                                : shownStep === 2 ? <Step3 NextStep={NextStep} selectAppointment={selectAppointment} appDate={appDate} currentAppointment={currentAppointment} setAppDate={setAppDate} setSelectedApp={setSelectedApp} showError={showError} BackStep={backStep} formData={formData} setFormData={setFormData} />
                                    : shownStep === 3 ? <Step4 NextStep={NextStep} selectAppointment={selectAppointment} appDate={appDate} currentAppointment={currentAppointment} setAppDate={setAppDate} setSelectedApp={setSelectedApp} showError={showError} BackStep={backStep} formData={formData} setFormData={setFormData} />
                                        : <StepComplete NextStep={NextStep} selectAppointment={selectAppointment} appDate={appDate} currentAppointment={currentAppointment} setAppDate={setAppDate} setSelectedApp={setSelectedApp} showError={showError} BackStep={backStep} formData={formData} setFormData={setFormData} />
                    }
                    {
                        showError.length > 0 ? <Fade up duration={500} distance={'2em'}>
                            <div className={styles.error}>
                                <div className={styles.errorIcon}>!</div>
                                <div className={styles.errorText}>{showError}</div>
                            </div>
                        </Fade> : <></>
                    }
                </div>
            </div>
        </div >
    )
}

export default Schedule;