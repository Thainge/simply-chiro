import styles from './AdminPanel.module.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useEffect, useMemo, useState } from 'react';
import moment from 'moment'
import CalendarTemplate from '../Components/AvailableCalendar/AvailableCalendar';
import EditAppointmentItem from '../Components/EditAppointmentItem/EditAppointmentItem';
import { GetAllAppointments } from '../Hooks/AppointmentHooks';
import { GetCoupons, AddCoupon, DeleteCoupon, updateCoupon } from '../Hooks/Coupons';
import { addInformation, deleteInformation, GetInformation, updateInformation } from '../Hooks/Information';
import CouponItem from '../Components/CouponItem/CouponItem';
import { dbGetAvailability, dbSetAvailability } from '../Hooks/Availability';
import PuffLoader from "react-spinners/PuffLoader";

const localizer = momentLocalizer(moment)

function AdminPanel() {

    const [loading, setLoading] = useState(false);

    const [availability, setAvailability] = useState([])
    const CalendarEdit = CalendarTemplate({
        availability,
        setAvailability
    })

    const [appointmentsInfo, setAppointmentsInfo] = useState([]);

    const saveItem = (newItems) => {
        updateInformation(newItems);
        setAppointmentsInfo((prev) => {
            let newArr = [...prev];
            let foundIndex = prev.findIndex(item => item.id === newItems.id);
            newArr[foundIndex] = newItems;
            return newArr;
        });
    }

    const deleteItem = (id) => {
        deleteInformation(id);
        setAppointmentsInfo((prev) => {
            let newArr = [...prev];
            let foundIndex = prev.findIndex(item => item.id === id);
            newArr.splice(foundIndex, 1)
            return newArr;
        });
    }

    const addNewItem = () => {
        let newItem = {
            title: 'Title',
            time: 'Duration',
            cost: 9.99,
            description: 'Description',
        }
        addInformation(newItem);
        setAppointmentsInfo((prev) => {
            let newArr = [...prev];
            newArr.push(newItem);
            return newArr;
        });
    }

    const [appointmentsData, setAppointmentsData] = useState([]);
    const [couponData, setCouponData] = useState([]);

    const deleteFunctionCoupon = async (id) => {
        DeleteCoupon(id);

        setCouponData((prev) => {
            let newArr = [...prev];
            let foundIndex = prev.findIndex(item => item.id === id);
            newArr.splice(foundIndex, 1)
            return newArr;
        });
    }

    const addFunctionCoupon = async () => {
        let newObj = {
            code: 'INSERT_CODE',
            discount: 100,
        }
        AddCoupon(newObj);
        setCouponData((prev) => {
            let newArr = [...prev];
            newArr.push(newObj);
            return newArr;
        });
    }

    const pageLoadInformation = async () => {
        setLoading(() => true);
        const data = await GetInformation();
        setAppointmentsInfo(() => data);
        const appData = await GetAllAppointments();
        let readyAppointments = [];
        appData.forEach((item, index) => {
            let d = item.realDate;
            let newDate = new Date(d);
            let endDate = newDate;
            endDate.setMinutes(newDate.getMinutes() + 15);
            let newItem = {
                id: index,
                title: `${item.phone} - ${item.name} - ${item.email}`,
                start: newDate,
                end: endDate,
                allDay: true,
            }
            readyAppointments.push(newItem);
        });
        setAppointmentsData(() => readyAppointments);
        const returnedCoupons = await GetCoupons();
        const currTimes = await dbGetAvailability();
        setAvailability(() => currTimes);
        setCouponData(() => returnedCoupons);
        setLoading(() => false);
    }

    useEffect(() => {
        pageLoadInformation();
    }, [])

    const saveCouponData = async (newItems) => {
        updateCoupon(newItems);
        setCouponData((prev) => {
            let newArr = [...prev];
            let foundIndex = prev.findIndex(item => item.id === newItems.id);
            newArr[foundIndex] = newItems;
            return newArr;
        });
    }

    const updateDatabaseAvailability = async () => {
        let newData = []

        availability.forEach((item, index) => {
            let newItem = {
                id: index,
                start: item.start,
                end: item.end,
            }
            newData.push(newItem);
        })

        await dbSetAvailability(newData);
    }

    useEffect(() => {
        if (availability.length > 0) {
            updateDatabaseAvailability();
        }
    }, [availability])

    return (
        <div className={styles.container}>
            <div className={styles.childContainer}>
                <h2 className={styles.edith2}>Edit Availability</h2>
                <div className={styles.relative}>
                    <div className={loading ? styles.dim : styles.nothing}>
                        <CalendarEdit />
                    </div>
                    {
                        loading ? <div className={styles.centerLoader}>
                            <PuffLoader color="#1e2438" />
                        </div> : <></>
                    }
                </div>
                <h2 className={styles.h2}>Active Appointments</h2>
                <div className={styles.relative}>
                    <div className={loading ? styles.dim : styles.nothing}>
                        <Calendar
                            localizer={localizer}
                            events={appointmentsData}
                            startAccessor="start"
                            endAccessor="end"
                            step={7.5}
                            style={{ height: 500 }}
                        />
                    </div>
                    {
                        loading ? <div className={styles.centerLoader}>
                            <PuffLoader color="#1e2438" />
                        </div> : <></>
                    }
                </div>
                <h2 className={styles.edith2}>Edit Scheduling Page</h2>
                <div className={styles.editContainer}>
                    <div className={styles.contentContainer}>
                        <div className={styles.appointmentTitle}>Edit</div>
                        <div className={`${styles.appointmentContainer} ${loading ? styles.dim : styles.nothing}`}>
                            {
                                appointmentsInfo.map((item, index) => (
                                    <EditAppointmentItem deleteItem={deleteItem} saveItem={saveItem} index={index} item={item} key={index} />
                                ))
                            }
                            {
                                loading ? <></> : <div className={styles.addNew}>
                                    <div className={styles.button} onClick={addNewItem}>
                                        Add Item
                                    </div>
                                </div>
                            }
                            {
                                loading ? <div className={styles.centerLoader}>
                                    <PuffLoader color="#1e2438" />
                                </div> : <></>
                            }
                        </div>
                    </div>
                    <div className={styles.contentContainer2}>
                        <div className={styles.appointmentTitle}>Preview</div>
                        <div className={`${styles.appointmentContainer2} ${loading ? styles.dim : styles.nothing}`}>
                            {
                                appointmentsInfo.map((item, index) => (
                                    <div key={index} className={styles.appointment}>
                                        <div className={styles.appointmentHeader}>
                                            {item.title}
                                        </div>
                                        <div className={styles.extra}>
                                            <div className={styles.appointmentTime}>
                                                {item.time}
                                            </div>
                                            <div className={styles.extraDash}>
                                                -
                                            </div>
                                            <div className={styles.appointmentCost}>
                                                ${item.cost}
                                            </div>
                                        </div>
                                        <div className={styles.appointmentText}>
                                            {item.description}
                                        </div>
                                    </div>
                                ))
                            }
                            {
                                loading ? <div className={styles.centerLoader}>
                                    <PuffLoader color="#1e2438" />
                                </div> : <></>
                            }
                        </div>
                    </div>
                </div>
                <h2 className={styles.edith2}>Coupon Codes</h2>
                <div className={`${styles.couponContainer} ${loading ? styles.dim : styles.nothing}`}>
                    <div className={`${styles.couponItem} ${styles.bold}`}>
                        <div className={styles.couponText}>Coupon Code</div>
                        <div className={styles.couponNumbers}>Discount</div>
                    </div>
                    {
                        couponData.map((item, index) => (
                            <CouponItem saveCouponData={saveCouponData} key={index} item={item} deleteFunctionCoupon={deleteFunctionCoupon} />
                        ))
                    }
                    {
                        loading ? <div className={styles.centerLoader}>
                            <PuffLoader color="#1e2438" />
                        </div> : <></>
                    }
                </div>
                <div className={`${styles.buttonContainer} ${loading ? styles.dim : styles.nothing}`}>
                    <div className={styles.button} onClick={addFunctionCoupon}>Add Coupon</div>
                </div>
            </div>
        </div>
    )
}

export default AdminPanel;