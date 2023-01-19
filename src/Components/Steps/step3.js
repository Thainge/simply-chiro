import { useEffect, useState } from 'react';
import { QueryCoupons } from '../../Hooks/Coupons';
import styles from './step3.module.css';
import PuffLoader from "react-spinners/PuffLoader";

function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
    if (n < 0) {
        negative = true;
        n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(digits);
    if (negative) {
        n = (n * -1).toFixed(digits);
    }
    return n;
}

function Step3({ formData, setFormData, currentAppointment, selectAppointment, appDate, setAppDate, setSelectedApp, showError, NextStep, BackStep }) {

    const [loading, setLoading] = useState(false);
    const [couponText, setCouponText] = useState(formData.couponText);

    let discountCost = roundTo((formData.cost - (formData.cost * (formData.coupon.discount / 100))), 2);
    let tax = roundTo((formData.cost * .07), 2);
    let total = roundTo((parseFloat(tax) + parseFloat(formData.cost)), 2);

    if (discountCost > 0) {
        tax = roundTo((discountCost * .07), 2);
        total = roundTo((parseFloat(tax) + parseFloat(discountCost)), 2);
    }

    const fetchCouponData = async () => {
        const response = await QueryCoupons(couponText);
        if (response && couponText.length > 1) {
            let newObj = {
                name: response.code,
                applied: true,
                discount: response.discount,
            }
            setFormData((prev) => {
                let newPrev = { ...prev, coupon: newObj, couponText: couponText, total: total, tax: tax, initalTotal: discountCost }
                return newPrev;
            });
        } else {
            let newObj = {
                name: '',
                applied: false,
                discount: 100,
            }
            setFormData((prev) => {
                let newPrev = { ...prev, coupon: newObj, couponText: '', total: total, tax: tax, initalTotal: discountCost }
                return newPrev;
            });
        }
    }

    useEffect(() => {
        if (couponText.length > 0) {
            const delayCouponText = setTimeout(() => {
                fetchCouponData();
            }, 300)

            return () => clearTimeout(delayCouponText)
        }
    }, [couponText])

    const goToNext = async () => {
        setLoading(() => true);
        await fetchCouponData();
        setLoading(() => false);
        NextStep();
    }

    const goToBack = async () => {
        setLoading(() => true);
        await fetchCouponData();
        setLoading(() => false);
        BackStep();
    }

    return (
        <>

            <div className={`${styles.button} ${styles.left}`} onClick={goToBack}>🡐 Back</div>
            <div className={`${styles.button} ${styles.right}`} onClick={goToNext}>Next ➔</div>


            <div className={styles.container}>
                <div className={styles.payment}>
                    <h2 className={styles.h2}>Choose your Payment Option</h2>
                    <div className={`${styles.paypal} ${styles.paymentButton}`}>
                        <img src={require('../../Assets/paypal.png')} className={styles.img} />
                    </div>
                    <div className={`${styles.credit} ${styles.paymentButton}`}>
                        <img src={require('../../Assets/credit.png')} className={styles.img2} />
                    </div>
                    <div className={`${styles.card} ${styles.paymentButton}`}>
                        <img src={require('../../Assets/card.png')} className={styles.img3} />
                    </div>
                    <img className={styles.powered} src={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftechtolia.com%2FPayPal%2Fassets%2Fimages%2Fpowered_by_paypal.png&f=1&nofb=1&ipt=19f164d767394e3b5171e48458398bc0d6290ebd32e5b9c656a7c554b08f54a4&ipo=images'} />
                </div>
                <div className={styles.total}>
                    <h3 className={styles.h2}>Order Summary</h3>

                    <div className={styles.column}>
                        {
                            formData.coupon.applied ? <>
                                <div className={`${styles.row} ${styles.rowCross}`}>
                                    <div>{formData.type}</div>
                                    <div>${formData.cost}</div>
                                </div>
                                <div className={styles.row}>
                                    <div>{formData.type}</div>
                                    <div>${discountCost}</div>
                                </div>
                            </> : <div className={styles.row}>
                                <div>{formData.type}</div>
                                <div>${formData.cost}</div>
                            </div>
                        }
                        <div className={styles.row}>
                            <div>Tax</div>
                            <div>${tax}</div>
                        </div>
                    </div>
                    <div className={styles.totalHeader}>
                        <div className={styles.rowHeader}>
                            <div>Grand Total:</div>
                            <div>${total}</div>
                        </div>
                    </div>
                    <div className={styles.discount}>
                        <label className={styles.discountLabel}>
                            Coupon Code
                            <div className={styles.loadingInput}>
                                <input type='text' value={couponText} onChange={(e) => setCouponText(e.target.value)} className={styles.discountInput} />
                                {
                                    loading ? <div className={styles.centerLoader}>
                                        <PuffLoader color="#1e2438" />
                                    </div> : <></>
                                }
                            </div>
                        </label>
                        {
                            formData.coupon.applied ? <div>Coupon code {formData.coupon.name} applied.</div> : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Step3;