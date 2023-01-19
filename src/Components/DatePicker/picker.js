import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './picker.css';
import { dbGetAvailability } from '../../Hooks/Availability';
import moment from 'moment';
import { dbGetExclusions } from '../../Hooks/Exclusions';
import PuffLoader from "react-spinners/PuffLoader";

function checkExclusions(item, exclusionsArr) {
    let equal = false;
    exclusionsArr.forEach((childItem) => {
        const isSame = compareTwoDates(item, childItem);
        if (isSame === true) {
            equal = true;
        }
    })
    return equal;
}

function compareTwoDates(date1, date2) {
    let oneDate = new Date(date1);
    let twoDate = new Date(date2);

    let oneSeconds = oneDate.getSeconds();
    let oneMinutes = oneDate.getMinutes();
    let oneHours = oneDate.getHours();
    let oneDay = oneDate.getDate();
    let oneYear = oneDate.getFullYear();

    let twoSeconds = twoDate.getSeconds();
    let twoMinutes = twoDate.getMinutes();
    let twoHours = twoDate.getHours();
    let twoDay = twoDate.getDate();
    let twoYear = twoDate.getFullYear();

    if (
        oneSeconds === twoSeconds
        && oneMinutes === twoMinutes
        && oneHours === twoHours
        && oneDay === twoDay
        && oneYear === twoYear
    ) {
        return true;
    }
    return false;
}

function intervals(startString, endString) {
    var start = moment(startString, 'YYYY-MM-DD hh:mm a');
    var end = moment(endString, 'YYYY-MM-DD hh:mm a');

    // round starting minutes up to nearest 15 (12 --> 15, 17 --> 30)
    // note that 59 will round up to 60, and moment.js handles that correctly
    start.minutes(Math.ceil(start.minutes() / 15) * 15);

    var result = [];

    var current = moment(start);

    while (current <= end) {
        result.push(current.format('YYYY-MM-DD HH:mm'));
        current.add(15, 'minutes');
    }

    return result;
}

function getRealTimes(data) {
    let newData = [];

    data.forEach((item) => {
        let newObj = intervals(item.start, item.end);
        newObj.forEach((childItem) => {
            let newDate = new Date(childItem);
            newData.push(newDate);
        })
    });

    return newData;
}

function ReactBigCalendar({ appDate, setAppDate, setSelectedApp, setSelectedTime }) {

    const [loading, setLoading] = useState(false);
    const [times, setTimes] = useState([]);
    const [available, setAvailable] = useState([]);

    const fetchData = async () => {
        setLoading(() => true);
        const exclusionsDB = await dbGetExclusions();
        let readyArr = [];
        exclusionsDB.forEach((item) => {
            let givenDate = new Date(item.date);
            readyArr.push(givenDate);
        })

        const availableTimes = await dbGetAvailability();
        const pulledData = getRealTimes(availableTimes);

        let readyData = [];

        pulledData.forEach((item) => {
            let equal = checkExclusions(item, readyArr);

            if (!equal || equal === false) {
                readyData.push(item);
            }
        });

        setAvailable(() => readyData);
        setLoading(() => false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const filterPassedTime = (date) => {
        let curDate = new Date(date);

        let selectedTimes = [];

        available.forEach((item, index) => {
            const differenceDates = (curDate.getDate() - item.getDate());

            if (differenceDates === 0) {
                selectedTimes.push(item);
            }
        });

        setTimes(() => selectedTimes);
    }

    const filterTimeData = (date) => {
        let now = new Date();
        let other = new Date(date);

        let difference = now.getTime() - other.getTime();

        if (difference < 0) {
            return date;
        }
    }

    return (
        <div className={'relative123 mediaquery123'}>
            <div className={loading ? 'dim123' : 'nothing123'}>
                <DatePicker
                    inline
                    forceShowMonthNavigation
                    selected={appDate}
                    custom
                    minDate={new Date()}
                    filterDate={filterTimeData}
                    onChange={date => {
                        setAppDate(() => date);
                        filterPassedTime(date);
                        const total = date.getSeconds() + date.getMinutes() + date.getHours();
                        let currentDate = new Date();

                        const differenceDates = (((((date.getTime() - currentDate.getTime()) / 1000) / 60) / 60) / 24);
                        if (total > 0 && differenceDates > 0) {
                            setSelectedTime(() => true);
                        }
                        if (differenceDates > 0) {
                            setSelectedApp(() => true);
                        }
                    }}
                    showTimeSelect
                    calendarClassName="calendarClass"
                    includeDates={available}
                    timeIntervals={15}
                    dayClassName={() => "dayClass"}
                    timeClassName={() => "timeClass"}
                    time
                    includeTimes={times}
                />
            </div>
            {
                loading ? <div className={'centerLoader123'}>
                    <PuffLoader color="#1e2438" />
                </div> : <></>
            }
        </div>
    )
}

export default ReactBigCalendar;