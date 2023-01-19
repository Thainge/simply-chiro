import styles from './Card.module.css';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

function Card({ disableButton, showInfo }) {
    return (
        <Fade left distance='3em' delay={100}>
            <div className={styles.cardContainer}>
                <div className={`${styles.card} ${disableButton ? styles.min : styles.nothing} ${showInfo ? styles.extra : styles.nothingaa}`}>
                    <div className={styles.cardRow}>
                        <div>
                            <img className={styles.cardImage} src={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngkey.com%2Fpng%2Ffull%2F73-730477_first-name-profile-image-placeholder-png.png&f=1&nofb=1&ipt=4ff3b0ab0eb089367bf0efd8ff3488be3c4f51249792342e7b9eec70a9df2439&ipo=images'} />
                        </div>
                        <div className={styles.cardColumn}>
                            <div className={styles.cardHeader}>Dr. James Atkins</div>
                            <div className={styles.cardText}>Doctor Atkins is a professional back doctor and master herbalist, he can get you back and running in no time.</div>
                        </div>
                    </div>
                    {
                        showInfo
                            ? <ul className={styles.list}>
                                <li className={styles.email}><span className={styles.no}>Email: </span>doc@simplychiro.net</li>
                                <li className={styles.contact}><span className={styles.no}>Phone: </span>919-762-5034</li>
                            </ul>
                            : <></>
                    }
                    {
                        disableButton ? <></> : <div className={styles.footerContainer}>
                            <Link to='/schedule' className={styles.bookButton}>Create Appointment</Link>
                        </div>
                    }
                </div>
            </div>
        </Fade>
    )
}

export default Card;