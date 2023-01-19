import { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import { ContextFunction } from '../../Context/contextProvider';
import styles from './step2.module.css';

function Step2({ checked, setChecked, formData, setFormData, NextStep, BackStep }) {
    const obj = ContextFunction();
    const { user } = obj;

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (formData.name.length > 1 && formData.email.length > 1 && checked && formData.phone.length > 8) {
            setFormData((prev) => {
                let newData = { ...prev, name: formData.name, email: formData.email, phone: formData.phone, userID: user.email };
                return newData;
            });
            NextStep();
        }

        if (formData.name.length > 1 && formData.email.length > 1 && !checked) {
            setFormData((prev) => {
                let newData = { ...prev, name: formData.name, email: formData.email, userID: user.email };
                return newData;
            });
            NextStep();
        }
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.h2}>Contact Information</h2>
            <form onSubmit={onSubmitForm} className={styles.form}>
                <label className={styles.label}>
                    Name *
                    <input value={formData.name} onChange={(e) => setFormData((prev) => {
                        let newObj = { ...prev, name: e.target.value }
                        return newObj;
                    })} required type="text" className={styles.input} />
                </label>
                <label className={styles.label}>
                    Email *
                    <input value={formData.email} onChange={(e) => setFormData((prev) => {
                        let newObj = { ...prev, email: e.target.value }
                        return newObj;
                    })} required type="email" className={styles.input} />
                </label>
                <div>
                    <label className={`${styles.label} ${styles.checkboxLabel}`}>
                        Text message reminders?
                        <input value={checked} checked={checked} onChange={() => setChecked((prev) => !prev)} type='checkbox' className={styles.checkBox} />
                    </label>
                    {
                        <Fade up collapse when={checked} duration={300} distance={'1em'}>
                            <label className={styles.label}>
                                Phone *
                                <input value={formData.phone} onChange={(e) => setFormData((prev) => {
                                    let newObj = { ...prev, phone: e.target.value }
                                    return newObj;
                                })} required={checked} type="tel" className={styles.input} />
                            </label>
                        </Fade>
                    }
                </div>
                <div className={styles.end}>* marks required fields</div>
                <div className={`${styles.button} ${styles.left}`} onClick={BackStep}>🡐 Back</div>
                <input type={'submit'} className={`${styles.button} ${styles.right}`} value={'Next ➔'}></input>
            </form>
        </div>
    )
}

export default Step2;