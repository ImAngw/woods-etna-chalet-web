import React, { useState, useEffect, useRef, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import {supabase} from "./mySupabaseClient";
import { it, enUS } from "date-fns/locale";
import { useContext } from "react";
import {BookedDatesContext} from "./BookedDatesContext";



async function myGetDates(supabase) {
    const { data, error } = await supabase.functions.invoke('get-booking-dates', {
        body: { name: 'Functions' },
    })
    return data
}

async function myGetPrices(supabase, rowName) {
    const { data, error } = await supabase.from('common_prices').select('name, one_guest, two_guest, three_guest, four_guest, pet_tax');
    const prices = data.find(r => r["name"] === rowName);
    const pricesDict = {"1": prices["one_guest"], "2": prices["two_guest"], "3": prices["three_guest"], "4": prices["four_guest"]};
    const pet_tax = prices["pet_tax"]

    return [pricesDict, pet_tax];
}

async function myGetSpecialPrices(supabase) {
    const { data, error } = await supabase.from('special_prices').select('*');
    const result = data.reduce((acc, item) => {
        const { date, ...prices } = item;

        // sostituiamo i nomi con "1", "2", ...
        const newPrices = {};
        Object.values(prices).forEach((val, idx) => {
            newPrices[(idx + 1).toString()] = val;
        });

        acc[date] = newPrices;
        return acc;
    }, {});
    return result
}


const MyCalendar = ({width}) => {
    const { t } = useTranslation();
    const [selectedDate, setSelectedDate] = useState(null);
    // const [bookedDates, setBookedDates] = useState(new Set());
    const { bookedDates, setBookedDates } = useContext(BookedDatesContext);
    const [numGuests, setNumGuests] = useState(1);
    const [bring_pets, setBringPets] = useState(false);

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const yes_str = t("yes")
    const no_str = t("no")


    const [specialPrices, setSpecialPrices] = useState({});
    const [baseWeekPrice, setWeekPrice] = useState({});
    const [baseWeekendPrice, setWeekendPrice] = useState({});
    const [pet_tax, setPetTax] = useState(0);

    const { i18n } = useTranslation();

    const localeMap = {
        it,
        en: enUS,
    };

    const memoizedExcludeDates = useMemo(() => {
        return [...bookedDates]
            .filter(dateString => {
                const date = new Date(dateString);
                const before = new Date(date);
                before.setDate(before.getDate() - 1);
                return bookedDates.has(before.toISOString().split('T')[0]);
            })
            .map(d => new Date(d));
    }, [bookedDates]);


    useEffect(() => {
        if (bookedDates.size === 0) {
            (async () => {
                const booked = await myGetDates(supabase);
                setBookedDates(new Set(booked));
            })();
        }
    }, [supabase, setBookedDates]);


    /*
    useEffect(() => {(
            async () => {
            const booked = await myGetDates(supabase);
            setBookedDates(new Set(booked));


            const sPrices = await myGetSpecialPrices(supabase);
            const [weekPrices, weekPetTax] = await myGetPrices(supabase, "baseWeekPrices");
            const [weekEndPrices, weekEndPetTax] = await myGetPrices(supabase, "baseWeekendPrices");

            setSpecialPrices(sPrices);
            setWeekPrice(weekPrices);
            setPetTax(weekPetTax);
            setWeekendPrice(weekEndPrices);


        })();
    }, []);

     */





    function getPriceForDate(date, numGuests) {
        const key = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
        const month = String(date.getMonth()+1).padStart(2,'0')

        if (key in specialPrices) return specialPrices[key][numGuests]

        // 1. Se data speciale nel tuo prices.json → priorità massima
        // if (prices[0][month][key]) return prices[0][month][key][numGuests];

        // 2. Controllo weekend
        const dayOfWeek = date.getDay(); // 0=Dom, 6=Sab
        if (dayOfWeek === 0 || dayOfWeek === 6) return baseWeekendPrice[numGuests];

        // 3. Altrimenti infrasettimanale
        return baseWeekPrice[numGuests];
    }

    function calculateTotal(startDate, endDate, numGuests) {
        if (!startDate || !endDate) return 0;

        let total = bring_pets ? pet_tax : 0;
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            total += getPriceForDate(currentDate, numGuests);

            // passa al giorno successivo
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return total;
    }

    function formatDate(date) {
        if (!date) return null
        const day = String(date.getDate()).padStart(2, '0');       // gg
        const month = String(date.getMonth() + 1).padStart(2, '0'); // mm (i mesi partono da 0)
        const year = date.getFullYear();                            // aaaa

        return `${day}-${month}-${year}`;
    }

    function formatDateNextDay(date) {
        if (!date) return null;

        const nextDay = new Date(date);       // crea una copia
        nextDay.setDate(nextDay.getDate() + 1); // aggiungi 1 giorno

        const day = String(nextDay.getDate()).padStart(2, '0');
        const month = String(nextDay.getMonth() + 1).padStart(2, '0');
        const year = nextDay.getFullYear();

        return `${day}-${month}-${year}`;
    }

    function formatDateDayBefore(date) {
        if (!date) return null;

        const beforeDay = new Date(date);       // crea una copia
        beforeDay.setDate(beforeDay.getDate() - 1); // togli 1 giorno

        const day = String(beforeDay.getDate()).padStart(2, '0');
        const month = String(beforeDay.getMonth() + 1).padStart(2, '0');
        const year = beforeDay.getFullYear();

        return `${year}-${month}-${day}`;
    }

    function isRangeValid(start, end, bookedDatesSet) {
        if (!start || !end) return true;

        const current = new Date(start);
        while (current <= end) {
            const key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2,"0")}-${String(current.getDate()).padStart(2,"0")}`;

            // Se è il giorno finale, posso permettere che sia già booked → è checkout
            if (current.getTime() === end.getTime()) {
                current.setDate(current.getDate() + 1);
                continue;
            }

            if (bookedDatesSet.has(key)) return false;
            current.setDate(current.getDate() + 1);
        }
        return true;
    }

    const handleDateChange = (dates) => {
        const [start, end] = dates;

        if (end && !isRangeValid(start, end, bookedDates)) {
            setDateRange([start, null]);
            return;
        }

        if (endDate) {
            setDateRange([null, null]);
            return;
        }

        setDateRange(dates);
    };


    const bill = calculateTotal(startDate, endDate, numGuests);
    const required_for_book = Math.max((bill / 10).toFixed(0), 50);

    let book_string_first = t("book_message_1") + `${formatDate(startDate)}` + t("to")+ `${formatDate(endDate)}.\n`
    let book_string_second = "\nCheck in: " + `${formatDate(startDate)} ` + t("check_in") +'\n'
    let book_string_third = "Check out: " + `${formatDate(endDate)} ` + t("check_out") +'\n'
    let book_string_fourth = t("book_message_2") + `${numGuests}`;

    let bp = bring_pets ? t("yes") : t(" no");
    let book_string_fifth = t("book_message_3") + bp;

    const whatsapp_string = "https://wa.me/3476852413?text=" +encodeURIComponent(book_string_first + book_string_second + book_string_third + book_string_fourth + book_string_fifth)
    const whatsappRef = useRef(null);

    const business_size = 11


    // Funzione per stilizzare ogni giorno
    const renderDayContents = (day, date) => {

        const checkOutAvailable = !bookedDates.has(formatDateDayBefore(date));
        const key = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;

        // const today = new Date();
        const today = !startDate ? new Date() : startDate;
        today.setHours(0,0,0,0);
        const isPast = date < today;


        let isBooked;

        if (!startDate) {
            isBooked = bookedDates.has(key);
        } else {
            isBooked = !checkOutAvailable && !isPast;
        }

        const price = getPriceForDate(date, numGuests);
        // const isBooked = bookedDates.has(key);



        const isInRange = startDate && endDate && date >= startDate && date <= endDate;
        // let string_price = isBooked ? 'booked':`${price}€`;
        let string_price = isBooked ? 'booked':`available`;
        string_price = isPast ? '---': string_price;

        if (startDate) {
            string_price = startDate.getTime() === date.getTime() ? <small style={{fontSize:'7px'}}>CHECK IN</small> : string_price
        }

        if (endDate) {
            string_price = endDate.getTime() === date.getTime() ? <small style={{fontSize:'7px'}}>CHECK OUT</small> : string_price
        }



        let color = isBooked || isPast ? 'darkred' : 'green';

        let bckColor;

        if (startDate) {
            if (startDate.getTime() === date.getTime()){
                bckColor = 'lightgreen'
                color = 'green'
            } else {
                if (isPast) {
                    bckColor = '#f9f9f9'
                } else {
                    bckColor = isBooked ? '#ccc' : (isInRange ? 'lightgreen' : '#f9f9f9')
                }
            }
        } else {
            bckColor = isPast ? '#f9f9f9' : (isBooked ? '#ccc' : (isInRange ? 'lightgreen' : '#f9f9f9'))
        }


        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '3px',
                    borderRadius: '6px',
                    backgroundColor: bckColor,
                    color: isBooked ? '#666' : '#333',
                    transition: 'all 0.2s',
                    cursor: isBooked ? 'not-allowed' : 'pointer',
                }}
                className={isBooked ? '' : 'day-hover'}
            >
                <span>{day}</span>
                { <small style={{ fontWeight: 'bold', color: color, fontSize: '9px' }}>{string_price}</small>}
            </div>
        );
    };

    return (
        <div style={{paddingBottom:'35px'}}>
            <div style={{paddingBottom: '15px', display: "flex", flexDirection: 'column'}} className={'myFont'}>

                <div style={{display: "flex", alignItems: "center", gap: "20px",}}>
                    <span className="title-font">{t("guests")}:</span>
                    <div style={{display: "flex", gap: "10px"}}>
                        {[1, 2, 3, 4].map(n => (
                            <button
                                key={n}
                                onClick={() => setNumGuests(n)}
                                style={{
                                    padding: "10px 18px",
                                    borderRadius: "9999px",
                                    border: numGuests === n ? "2px solid black" : "1px solid #ccc",
                                    background: numGuests === n ? "black" : "white",
                                    color: numGuests === n ? "white" : "black",
                                    cursor: "pointer",
                                    fontSize: "25px"
                                }}
                                className="myFont"
                            >
                                {n}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{display: "flex", alignItems: "center", gap: "20px", paddingTop: '15px'}}>
                    <span className="title-font">{t("pets")}:</span>
                    <div style={{display: "flex", gap: "12px"}}>
                        {[true, false].map(val => (
                            <button
                                key={val ? yes_str : no_str}
                                onClick={() => setBringPets(val)}
                                style={{
                                    padding: "10px 18px",
                                    borderRadius: "9999px",
                                    border: bring_pets === val ? "2px solid black" : "1px solid #ccc",
                                    background: bring_pets === val ? "black" : "white",
                                    color: bring_pets === val ? "white" : "black",
                                    cursor: "pointer",
                                    fontSize: "25px"
                                }}
                            >
                                {val ? yes_str : no_str}
                            </button>
                        ))}
                    </div>
                </div>
            </div>


            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: width < 500 ? '10px' : '100px',
                    justifyContent: 'center',
                    paddingTop: '35px',
                }}
            >
                <div>
                    <div style={{
                        display: 'flex',
                        justifyContent: "center",
                        paddingBottom: '5px',
                        width: '100%',
                    }}>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange={true}
                            inline
                            minDate={startDate ? new Date(startDate.getTime() + 24*60*60*1000) : new Date()}
                            maxDate={new Date(new Date().setMonth(new Date().getMonth() + 6))}
                            excludeDates={memoizedExcludeDates}
                            renderDayContents={renderDayContents}
                            calendarClassName="my-custom-calendar"
                            showDateSelect={true}
                            onClickOutside={() => {
                                if (whatsappRef.current && whatsappRef.current.contains(event.target)) return;
                                setDateRange([null, null]);
                            }}
                            locale={localeMap[i18n.language] || it}

                        />
                    </div>

                    <h4 className={'myFont'} style={{fontSize: '21px', paddingBottom: '20px'}}>
                        {t("book_par_3")}
                    </h4>
                </div>


                <div style={{justifyContent: 'flex-start', width: '100%', maxWidth: '500px'}}>
                    <h4 className={'title-font'} style={{textAlign: 'left'}}>{t("your_selection")}</h4>

                    <h5 className={'myFont'}>Check in: <b>{formatDate(startDate)}</b> {startDate && t("check_in")}</h5>
                    <h5 className={'myFont'}>Check out: <b>{formatDate(endDate)}</b> {endDate && t("check_out")}</h5>

                    {/*
                    <h5 className={'myFont'}> {t("bill")} <b>{bill}</b> €</h5>
                    */}


                    <h4 className={'title-font'} style={{paddingTop:'50px'}}> {t("wanna_conf")}</h4>

                    {bill !== 0 ? (
                        <h5 className={'myFont'}>
                            {t("book_inst_1")}
                            <a href={whatsapp_string}
                               target="_blank"
                               ref={whatsappRef}
                               rel="noopener noreferrer"
                               onClick={(e) => e.stopPropagation()}
                            >
                                whatsapp.
                            </a>
                            <div style={{paddingBottom:'20px'}}>
                                {t("book_inst_2")}
                            </div>


                            <div style={{
                                backgroundColor:"white",
                                scrollBehavior:'',
                                height:'500px',
                                overflow: "auto",
                                paddingLeft:'4px',
                                paddingRight:'4px',
                                borderRadius:7,
                                border: "2px solid black"
                            }} className={'google-sans-code'}>
                                <h1 style={{fontSize:business_size}}><b>{t("cond_title")}</b></h1>
                                <h5 style={{fontSize:business_size}}>
                                    {t("cond_1")}
                                </h5>

                                <h1 style={{fontSize:business_size}}>
                                    <b>{t("cond_2")}</b>
                                </h1>

                                <h5 style={{fontSize:business_size}}>
                                    {t("cond_2_1")} <br />
                                    {t("cond_2_2")} <br />
                                    {t("cond_2_3")} <br />
                                </h5>

                                <h1 style={{fontSize:business_size}}>
                                    <b>{t("cond_3")}</b>
                                </h1>

                                <h5 style={{fontSize:business_size}}>
                                    {t("cond_3_1")} <br />
                                    {t("cond_3_2")} <br />
                                    {t("cond_3_3")} <br />
                                </h5>

                                <h1 style={{fontSize:business_size}}>
                                    <b>{t("cond_4")}</b>
                                </h1>

                                <h2 style={{fontSize:business_size}}>
                                    <b>{t("cond_4_1")}</b>
                                </h2>

                                <h5 style={{fontSize:business_size}}>
                                    {t("cond_4_2")} <br />
                                    {t("cond_4_3")} <br />
                                    {t("cond_4_4")} <br />
                                    {t("cond_4_5")} <br />
                                    {t("cond_4_6")} <br />
                                    {t("cond_4_7")} <br />
                                </h5>

                                <h1 style={{fontSize:business_size}}>
                                    <b>{t("cond_5")}</b>
                                </h1>

                                <h2 style={{fontSize:business_size}}>
                                    {t("cond_5_1")}
                                </h2>

                                <h2 style={{fontSize:business_size}}>
                                    <b>{t("cond_5_2")}</b>
                                </h2>

                                <h5 style={{fontSize:business_size}}>
                                    {t("cond_5_3")}<br />
                                    {t("cond_5_4")}<br />
                                </h5>

                                <h2 style={{fontSize:business_size}}>
                                    {t("cond_5_5")}
                                </h2>


                                <h1 style={{fontSize:business_size}}>
                                    <b>{t("cond_6")}</b>
                                </h1>

                                <h2 style={{fontSize:business_size}}>
                                    {t("cond_6_1")}<br />
                                    {t("cond_6_2")}<br />
                                </h2>

                                <h1 style={{fontSize:business_size}}>
                                    <b>{t("cond_7")}</b>
                                </h1>

                                <h5 style={{fontSize:business_size}}>
                                    {t("cond_7_1")} <br />
                                    {t("cond_7_2")}<br />
                                    {t("cond_7_3")}<br />
                                    {t("cond_7_4")}<br />
                                </h5>

                                <h1 style={{fontSize:business_size}}>
                                    <b>{t("cond_8")}</b>
                                </h1>

                                <h5 style={{fontSize:business_size}}>
                                    {t("cond_8_1")}
                                </h5>

                                <h1 style={{fontSize:business_size}}>
                                    <b>{t("cond_9")}</b>
                                </h1>

                                <h5 style={{fontSize:business_size}}>
                                    {t("cond_9_1")}
                                </h5>

                                <h1 style={{fontSize:business_size}}>
                                    <b>{t("cond_10")}</b>
                                </h1>

                                <h5 style={{fontSize:business_size}}>
                                    {t("cond_10_1")}
                                </h5>


                                <h1 style={{fontSize:business_size}}>
                                    <b>{t("cond_11")}</b>
                                </h1>

                                <h5 style={{fontSize:business_size}}>
                                    {t("cond_11_1")}
                                </h5>


                                <h1 style={{fontSize:business_size}}>
                                    <b>{t("cond_12")}</b>
                                </h1>

                                <h5 style={{fontSize:business_size}}>
                                    {t("cond_12_1")}<br />
                                    {t("cond_12_2")}<br />
                                    {t("cond_12_3")}<br />
                                    {t("cond_12_4")}<br />
                                    {t("cond_12_5")}<br />
                                </h5>


                                <h1 style={{fontSize:business_size}}>
                                    <b>{t("cond_13")}</b>
                                </h1>

                                <h5 style={{fontSize:business_size}}>
                                    {t("cond_13_1")}<br />
                                    {t("cond_13_2")}<br />
                                    {t("cond_13_3")}<br />
                                    {t("cond_13_4")}<br />
                                </h5>















































                            </div>

                        </h5>
                    ) : (
                        <h5 className={'myFont'}>
                            {t("date_before")}
                        </h5>
                    )}
                </div>
            </div>


        </div>

    );
};

export default MyCalendar;