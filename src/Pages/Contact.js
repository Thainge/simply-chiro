import { useState } from 'react';
import Card from '../Components/Card/Card';
import { sendEmail } from '../Hooks/AppointmentHooks';
import PuffLoader from "react-spinners/PuffLoader";
import styles from './Contact.module.css';
import Fade from 'react-reveal/Fade';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const sendForm = async (e) => {
        e.preventDefault();
        setLoading(() => true);
        await sendEmail(formData);
        setLoading(() => false);
        setSent(() => true);
    }

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
                    <form className={styles.form} onSubmit={sendForm}>
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
                        {
                            sent ? <Fade up><div>Message Sent!</div></Fade> : <div className={styles.buttonBox}>
                                <input className={styles.button} type={'submit'} value={'Send Email'}></input>
                            </div>
                        }
                        {
                            loading ? <div className={styles.centerLoader}>
                                <PuffLoader color="#1e2438" />
                            </div> : <></>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact;