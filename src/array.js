import { getDaysInMonth, getDay, getISOWeek, eachWeekendOfMonth, format, isToday } from "../node_modules/date-fns/esm/index.js";

// under "format" finns alla sökord
// månader 0-11, 0 = januari
// veckodagar 0-6, 0 = söndag.
function app() {
    // dagens datum, {veckodag,månad,datum,år,hh:mm:ss,tidzon}
    const date = new Date();
    // hur många dagar är det i mars?
    const daysInMonth = getDaysInMonth(new Date(2023, 2))
    // Vad är dagens datum?
    const dateFormatted = format(date, 'dd/MM/yyyy')
    // vilken veckodag är det den 10e mars?
    const todaysDay = getDay(new Date(2023, 2, 10))
    // vilken vecka är det den 10e mars?
    const whatWeek = getISOWeek(new Date(2023, 2, 10))
    const today = isToday(new Date(2023, 2, 10))


    console.log(date);
    console.log(daysInMonth);
    console.log(dateFormatted);
    console.log(todaysDay);
    console.log(whatWeek);
    console.log(today);


}

app()


// const normalYear = [
//     { month: "January", days: 31 },
//     { month: "February", days: 28 },
//     { month: "March", days: 31 },
//     { month: "April", days: 30 },
//     { month: "May", days: 31 },
//     { month: "June", days: 30 },
//     { month: "July", days: 31 },
//     { month: "August", days: 31 },
//     { month: "September", days: 30 },
//     { month: "October", days: 31 },
//     { month: "November", days: 30 },
//     { month: "December", days: 31 }
//   ];
// const leapYear = [
//     { month: "January", days: 31 },
//     { month: "February", days: 29 },
//     { month: "March", days: 31 },
//     { month: "April", days: 30 },
//     { month: "May", days: 31 },
//     { month: "June", days: 30 },
//     { month: "July", days: 31 },
//     { month: "August", days: 31 },
//     { month: "September", days: 30 },
//     { month: "October", days: 31 },
//     { month: "November", days: 30 },
//     { month: "December", days: 31 }
//   ];

