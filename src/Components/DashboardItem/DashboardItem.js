import { useState } from 'react';
import Fade from 'react-reveal/Fade';
import styles from './DashboardItem.module.css';

function DashboardItem({ setCurrentID, item, setDatePickerIsOpen, setDeleteIsOpen }) {
    const [editOpen, setEditOpen] = useState(false);

    let realFinished = item.finished
    let canceled = false;

    let nowDate = new Date();
    let otherDate = new Date(item.realDate)

    const differenceDates = (((((nowDate.getTime() - otherDate.getTime()) / 1000) / 60) / 60) / 24);
    if (differenceDates > 0) {
        realFinished = true;
    }

    if (differenceDates < 0 && realFinished) {
        realFinished = false;
        canceled = true;
    }

    return (
        <div className={styles.listItem}>
            <div className={styles.itemHeader}>{item.type}</div>
            <div className={styles.item}>{item.time}</div>
            <div className={styles.item}>{item.date}</div>
            <div className={styles.item}>
                <div className={styles.itemStatus}>
                    <div>
                        <div className={`${styles.circle} ${realFinished || canceled ? styles.red : styles.green}`}></div>
                    </div>
                    <div>{realFinished ? 'Complete' : canceled ? 'Canceled' : 'Scheduled'}</div>
                </div>
            </div>
            {
                realFinished ? <div className={styles.editContainer}></div> : <div className={styles.editContainer}>
                    <div className={`${styles.itemEdit} ${editOpen ? styles.zindex : styles.nothing}`} onClick={() => { setEditOpen((prev) => !prev); setCurrentID(item.id) }}>•••</div>
                    <div className={styles.absoluteEdit}>
                        <Fade collapse duration={200} when={editOpen}>
                            <div className={styles.absoluteText}>
                                <div className={styles.change} onClick={() => { setDatePickerIsOpen(true); setEditOpen(false); setCurrentID(item.id) }}>Change Appointment Date</div>
                                <div className={styles.cancel} onClick={() => { setDeleteIsOpen(true); setEditOpen(false); setCurrentID(item.id) }}>Cancel Appointment</div>
                            </div>
                        </Fade>
                    </div>
                </div>
            }
            {
                editOpen ? <div className={styles.absoluteCover} onClick={() => setEditOpen(() => false)}></div> : <></>
            }
        </div>
    )
}

export default DashboardItem;