import { useState } from 'react';
import styles from './EditAppointmentItem.module.css';

function EditAppointmentItem({ item, index, saveItem, deleteItem }) {

    const [title, setTitle] = useState(item.title);
    const [duration, setDuration] = useState(item.time);
    const [cost, setCost] = useState(item.cost);
    const [description, setDescription] = useState(item.description);

    const [changed, setChanged] = useState(false);

    const SaveFunction = () => {
        let newObj = {
            ...item,
            title: title,
            time: duration,
            cost: cost,
            description: description,
        }

        saveItem(newObj);
        setChanged(() => false);
    }

    const updateValue = (value, setFunction) => {
        setFunction(() => value);
        setChanged(() => true);
    }

    return (
        <div className={styles.appointment}>
            <h3 className={styles.h3}>{index + 1}.</h3>
            <div className={styles.container}>
                <div className={styles.remove} onClick={() => deleteItem(item.id)}>✕</div>
                <label className={styles.label}>
                    Title
                    <input className={styles.input} value={title} onChange={(e) => updateValue(e.target.value, setTitle)} type="text" />
                </label>
                <label className={styles.label}>
                    Duration
                    <input className={styles.input} value={duration} onChange={(e) => updateValue(e.target.value, setDuration)} type="text" />
                </label>
                <label className={styles.label}>
                    Cost
                    <input className={styles.input} value={cost} onChange={(e) => updateValue(e.target.value, setCost)} type="number" />
                </label>
                <label className={styles.label}>
                    Description
                    <textarea className={`${styles.input} ${styles.textBox}`} value={description} onChange={(e) => updateValue(e.target.value, setDescription)} />
                </label>
                <div className={styles.save}>
                    <div className={`${styles.button} ${changed ? styles.nothing : styles.disabled}`} onClick={SaveFunction}>
                        Save
                    </div>
                </div>
            </div>
        </div >
    )
}

export default EditAppointmentItem;