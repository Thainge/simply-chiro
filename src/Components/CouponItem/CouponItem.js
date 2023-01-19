import { useEffect, useState } from 'react';
import styles from './CouponItem.module.css';

function CouponItem({ item, deleteFunctionCoupon, saveCouponData }) {
    const discountNumber = Math.abs(item.discount - 100);

    const [editText, setEditText] = useState(false);
    const [editDiscount, setEditDiscount] = useState(false);

    const [text, setText] = useState(item.code);
    const [percentText, setPercentText] = useState(discountNumber);

    const saveDiscount = async () => {
        let newPercent = Number(percentText) + 100;
        let newObj = {
            ...item,
            discount: newPercent,
        }
        saveCouponData(newObj);
    }

    const saveText = async () => {
        let newObj = {
            ...item,
            code: text,
        }
        saveCouponData(newObj);
    }

    useEffect(() => {
        const delayCouponText = setTimeout(() => {
            if (text.length > 0) {
                saveText();
            }

            if (percentText.length > 0) {
                saveDiscount();
            }
        }, 300)

        return () => clearTimeout(delayCouponText)
    }, [editText, editDiscount])

    return (
        <div className={styles.couponItem}>
            {
                editText || editDiscount ? <div className={styles.overlay} onClick={() => {
                    setEditDiscount(() => false);
                    setEditText(() => false);
                }}></div> : <></>
            }

            <div className={styles.couponText}>
                {
                    editText
                        ? <input onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                saveText();
                                setEditText(() => false);
                            }
                        }} className={styles.input} value={text} onChange={(e) => setText(() => e.target.value)} type={'text'} />
                        : item.code
                }
                <div className={styles.editIcon} onClick={() => setEditText((prev) => !prev)}>✎</div>
            </div>
            <div className={styles.couponNumbers}>
                {
                    editDiscount
                        ? <input onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                saveDiscount();
                                setEditDiscount(() => false);
                            }
                        }} className={styles.inputPercent} min={0} value={percentText} onChange={(e) => setPercentText(() => e.target.value)} type={'number'} />
                        : `${discountNumber}%`
                }
                <div className={styles.editIcon} onClick={() => setEditDiscount((prev) => !prev)}>✎</div>
            </div>
            <div className={styles.button} onClick={() => deleteFunctionCoupon(item.id)}>Delete</div>
        </div>
    )
}

export default CouponItem;