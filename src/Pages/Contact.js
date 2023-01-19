import { useState } from 'react';
import Card from '../Components/Card/Card';
import styles from './Contact.module.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    return (
        <div className={styles.container}>
            <div className={styles.cardContainer}>
                <Card />
            </div>
            <div className={styles.childContainer}>
                <div className={styles.fixedLines}>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.papa}>
                    <h1 className={styles.contentHeader}>Get In Touch</h1>
                    <h2 className={styles.contentHeadText}>Contact me by phone</h2>
                    <h3 className={styles.contentChildText}>919-762-5034</h3>


                    <h2 className={styles.contentHeadText}>Email Me</h2>
                    <form className={styles.form}>
                        <label className={styles.label}>
                            Name *
                            <input placeholder='Your Name' value={formData.name} onChange={(e) => setFormData((prev) => {
                                let newObj = { ...prev, name: e.target.value }
                                return newObj;
                            })} required type="text" className={styles.input} />
                        </label>
                        <label className={styles.label}>
                            Email *
                            <input placeholder='Email Address' value={formData.email} onChange={(e) => setFormData((prev) => {
                                let newObj = { ...prev, email: e.target.value }
                                return newObj;
                            })} required type="email" className={styles.input} />
                        </label>
                        <label className={styles.label}>
                            Phone
                            <input placeholder='Phone Number' value={formData.phone} onChange={(e) => setFormData((prev) => {
                                let newObj = { ...prev, phone: e.target.value }
                                return newObj;
                            })} type="tel" className={styles.input} />
                        </label>
                        <label className={styles.label}>
                            Message
                            <textarea className={`${styles.input} ${styles.textBox}`} value={formData.message} onChange={(e) => setFormData((prev) => {
                                let newObj = { ...prev, message: e.target.value }
                                return newObj;
                            })} />
                        </label>
                        <div className={styles.buttonBox}>
                            <input className={styles.button} type={'submit'} value={'Send Email'}></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact;