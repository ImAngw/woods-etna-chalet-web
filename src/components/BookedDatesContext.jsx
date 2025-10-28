import { createContext } from "react";

export const BookedDatesContext = createContext({
    bookedDates: new Set(),
    setBookedDates: () => {}
});