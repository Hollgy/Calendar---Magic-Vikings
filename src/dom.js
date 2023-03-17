import moment from './moment.js'

moment.locale('sv')

const calendar = {
    year: document.querySelector('.header__year'),
    month: document.querySelector('.header__month'),
    days: document.querySelector('.calendar__days'),
    weekNumber: document.querySelector('.calendar__weeks'),
    previousBtn: document.querySelector('#previous'),
    nextBtn: document.querySelector('#next')
}

const testArray = []


// console.log('yolo', moment())
// let x = moment().format('Y-M')
// console.log(x)
// console.log(moment().startOf('day').fromNow())
// console.log(moment("2023-02", "YYYY-MM").daysInMonth())
// console.log(moment("2023-01", "YYYY-MM").daysInMonth())
// console.log(moment()._locale._months)
// console.log(moment("2023-01").format('WW'))
// console.log(moment().month())
// console.log(moment("2023-03-13").weekday())
// console.log(moment("2023-3-1").week())
// console.log(moment("2023-3-31").week())



// Vi behöver en  funktion som 'lägger ut' rätt antal dagar för varje månad beroende på vilka värden vi stoppar i våra variabler.

function renderCalendar() {

    for (let year = 2018; year <= 2028; year++) {
        let yearObject = {}
        yearObject.year = year
        yearObject.months = []
        let monthCounter = 1

        for (let index = 0; index < 12; index++) {
            let monthObject = {}
            let month = moment(`${year}-${monthCounter}`, `YYYY-MM`)._locale._months[index]
            let daysInMonth = moment(`${year}-${monthCounter}`, `YYYY-MM`).daysInMonth()
            monthObject.month = month
            monthObject.days = daysInMonth
            monthObject.index = index + 1
            monthObject.id = `y${year}-m${monthCounter}`
            yearObject.months.push(monthObject)
            monthCounter++
        }
        testArray.push(yearObject)
    }
}
renderCalendar()
console.log(testArray);

const dateformat = ['YYYY-M-D', 'YYYY-MM-DD']

function writeWeekNumber(year, month) {

    let firstWeekInMonth = moment(`${year}-${month.index}-1`, dateformat).week()
    let lastWeekInMonth = moment(`${year}-${month.index}-${month.days}`, dateformat).week()

    // Loopar igenom månadens veckor och lägger ut div:ar med veckonumret
    for (let currentWeek = firstWeekInMonth; currentWeek <= lastWeekInMonth; currentWeek++) {

        let newWeek = document.createElement('div')
        newWeek.classList.add('weekNumber', 'hidden')
        newWeek.setAttribute('id', `y${year}-w${currentWeek}`)
        newWeek.innerText = currentWeek
        calendar.weekNumber.append(newWeek)
    }
}


// Jämför ett inkommande year- månads-ID med ett års- och månadsobjekt och ta bort hidden på den som matchar. 

function toggleMonthVisibility(showYear, showMonthID, hideYear, hideMonthID) {
    let hideYearObject = testArray.find(element => element.year == hideYear)
    let hideMonthObject = hideYearObject.months.find(element => element.id == hideMonthID)
    let showYearObject = testArray.find(element => element.year == showYear)
    let showMonthObject = showYearObject.months.find(element => element.id == showMonthID)

    // lägga till en input som ger ett ID som kan jämföras med ett ID i DOM.
    function getWeekNumber(year, monthIndex, day) {
        return moment(`${year}-${monthIndex}-${day}`, dateformat).week()
    }

    // Hämtar första och sista veckan i månaden som ska visas
    let firstWeekInShowMonth = getWeekNumber(showYearObject.year, showMonthObject.index, '1')
    let lastWeekInShowMonth = getWeekNumber(showYearObject.year, showMonthObject.index, showMonthObject.days)

    // Hämtar första och sista veckan i månaden som ska gömmas
    let firstWeekInHideMonth = getWeekNumber(hideYearObject.year, hideMonthObject.index, '1')
    let lastWeekInHideMonth = getWeekNumber(hideYearObject.year, hideMonthObject.index, hideMonthObject.days)

    let monthToShow = document.querySelector(`#${showMonthID}`)
    let monthToHide = document.querySelector(`#${hideMonthID}`)

    monthToHide.classList.add('hidden')
    monthToShow.classList.remove('hidden')
    calendar.year.innerText = showYearObject.year
    calendar.month.innerText = showMonthObject.month
    let week = null

    // Lägger till eller tar bort .hidden på veckonummer-divarna beroende på månaden som ska synas och vilken som ska gömmas
    function showHideWeeks(firstWeek, lastWeek, year) {
        for (let weekNumber = firstWeek; weekNumber <= lastWeek; weekNumber++) {
            let weekID = `#y${year}-w${weekNumber}`
            week = document.querySelector(weekID)
            if (firstWeek === firstWeekInShowMonth && lastWeek === lastWeekInShowMonth) {
                week.classList.remove('hidden')
            }
            else {
                week.classList.add('hidden')
            }
        }
    }
    showHideWeeks(firstWeekInShowMonth, lastWeekInShowMonth, showYearObject.year)
    showHideWeeks(firstWeekInHideMonth, lastWeekInHideMonth, hideYearObject.year)

}

// Ger ett nytt månadsID beroende på vilken knapp som klickats på
function changeBetweenMonths(currentMonthID, button) {
    let currentMonth = document.querySelector(`#${currentMonthID}`)
    let nextMonth = currentMonth.nextElementSibling
    let previousMonth = currentMonth.previousElementSibling

    // currentMonth.classList.add('.hidden')

    if (button === 'next') {
        currentMonth = nextMonth
    } else if (button === 'previous') {
        currentMonth = previousMonth
    }
    let newMonthID = currentMonth.getAttribute('id')
    return newMonthID
}


function createMonth(year, month) {
    const monthWrapper = document.createElement('div')
    monthWrapper.classList.add('month', 'hidden')
    monthWrapper.setAttribute('id', `y${year}-m${month.index}`)
    // writeWeekNumber(year, month.index, month.days)


    for (let index = 1; index <= month.days; index++) {

        // Skapar div med datum
        let newDay = document.createElement('div')
        newDay.innerText = index
        newDay.classList.add('day__card')

        let currentDay = moment().format("D")
        let currentMonth = moment().format("MMMM")
        let currentYear = moment().format("YYYY")
        if (index == currentDay && month.month == currentMonth && year == currentYear) {
            newDay.classList.add("current-day")
        }
        // Och en knapp för att kunna lägga till aktivitet
        const showAddInfoModalBtn = document.createElement('button')

        showAddInfoModalBtn.innerHTML = `<span class="material-symbols-outlined">
        add
        </span>`
        showAddInfoModalBtn.title = 'Lägg till aktivitet'
        showAddInfoModalBtn.id = index

        showAddInfoModalBtn.addEventListener('click', () => {

            modal.innerHTML = ''
            addNewOrEditInfoToDay(newDay, month.month, index)
        })

        newDay.append(showAddInfoModalBtn)
        monthWrapper.append(newDay)
    }
    // }
    calendar.days.append(monthWrapper)
}

// Går igenom testarray och skapar en månadsvy för varje månad i varje år
testArray.forEach(yearObject => {
    yearObject.months.forEach(month => {
        createMonth(yearObject.year, month)
        writeWeekNumber(yearObject.year, month)
    })
})

let currentYearStart = moment().format('Y')
let currentMonthStart = moment().format('M')

// Månaden som är just nu som startsida
toggleMonthVisibility(currentYearStart, `y${currentYearStart}-m${currentMonthStart}`, '2023', 'y2023-m2')

// Eventlyssnare för bakåt-knapp
calendar.previousBtn.addEventListener('click', () => {
    onClick('previous')
})

// Eventlyssnare för framåt-knapp
calendar.nextBtn.addEventListener('click', () => {
    onClick('next')
})

// Kollar vilken månad som syns just nu, använder changeBetweenMonths för att byta till ny månad och stoppar sen in den nya månaden i funktionen toggleMonthVisibility
function onClick(button) {
    let monthVisible = document.querySelector(".month:not(.hidden)")
    let monthVisibleID = monthVisible.getAttribute('id')
    let oldYear = monthVisibleID.substring(1, 5)
    let newMonthID = changeBetweenMonths(monthVisibleID, button)
    let newYear = newMonthID.substring(1, 5)
    toggleMonthVisibility(newYear, newMonthID, oldYear, monthVisibleID)
}

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')

// Modal för att lägga in information om aktivitet
const addNewOrEditInfoToDay = (date, month, index) => {

    // Gör specifika input fält för rätt aktivitet skapande

    const titleForTheDate = document.createElement('h1')
    const titleInput = document.createElement('input')
    titleInput.placeholder = 'Skriv in titel'
    titleInput.type = 'text'

    const infoTextArea = document.createElement('textarea')
    infoTextArea.placeholder = 'Skriv in info om dagen'

    const addInfoForm = document.createElement('form')

    const finishedAddingInfoBtn = document.createElement('button')
    finishedAddingInfoBtn.textContent = 'Klar'

    addInfoForm.append(titleForTheDate, titleInput, infoTextArea, finishedAddingInfoBtn)

    const controlsContainer = document.createElement('div')
    controlsContainer.classList.add('day__controls')

    // Knappar för redigering och visning av aktiviteter
    const showMoreInfoBtn = document.createElement('button')
    showMoreInfoBtn.innerHTML = `<span class="material-symbols-outlined">
    fullscreen
    </span>`
    showMoreInfoBtn.title = 'Visa info om aktiviteten'

    const deleteActivityBtn = document.createElement('button')
    deleteActivityBtn.innerHTML = `<span class="material-symbols-outlined">
    delete
    </span>`
    deleteActivityBtn.title = 'Ta bort aktiviteten'

    const editActivityBtn = document.createElement('button')
    editActivityBtn.innerHTML = `<span class="material-symbols-outlined">
    reply
    </span>`
    editActivityBtn.title = 'Ändra info om aktivitet'

    let titleInfo

    // Vad som händer när man har tryckt på "klar" knappen
    finishedAddingInfoBtn.addEventListener('click', event => {
        event.preventDefault()

        titleInfo = document.createElement('p')

        if (titleInput.value != '') {
            titleInfo.textContent = '! ' + titleInput.value;

            date.append(controlsContainer)

            controlsContainer.append(titleInfo, showMoreInfoBtn, editActivityBtn, deleteActivityBtn)

            textFromForm.textContent = infoTextArea.value

            ClickedOutsideOrTriggeredOverlayModal()

            titleInput.value = ''
            infoTextArea.value = ''
            addInfoForm.innerHTML = ''
        }
    })

    let textFromForm = document.createElement('p')

    // Visar vad man har skrivit för text i textarea efter tilläggningen av aktivitet
    showMoreInfoBtn.addEventListener('click', () => {
        modal.innerHTML = ''
        modal.append(textFromForm)

        ClickedOutsideOrTriggeredOverlayModal()
    })

    // Ta bort aktivitet
    deleteActivityBtn.addEventListener('click', () => {
        controlsContainer.remove()
    })

    // Allt som finns till redigiering av aktivitet
    const editInfoForm = document.createElement('form')
    const finishedEditingInfoBtn = document.createElement('button')
    finishedEditingInfoBtn.textContent = 'Klar'

    const editTitleInfo = document.createElement('input')
    editTitleInfo.type = 'text'
    editTitleInfo.placeholder = 'Skriv in ny titel'

    const editInfoTextarea = document.createElement('textarea')
    editInfoTextarea.placeholder = 'Skriv in ny beskrivning'

    editInfoForm.append(editTitleInfo, editInfoTextarea, finishedEditingInfoBtn)

    finishedEditingInfoBtn.addEventListener('click', event => {
        event.preventDefault()

        if (editTitleInfo.value !== '') {
            titleInfo.textContent = editTitleInfo.value
            textFromForm.textContent = editInfoTextarea.value

            ClickedOutsideOrTriggeredOverlayModal()
        }
    })

    // Redigera aktivitet
    editActivityBtn.addEventListener('click', () => {
        modal.innerHTML = ''
        modal.append(editInfoForm)

        ClickedOutsideOrTriggeredOverlayModal()
    })


    // Visar månaden och datumet i tillägningen av aktivitet i form
    titleForTheDate.textContent = month + ' - ' + index

    modal.append(addInfoForm)

    ClickedOutsideOrTriggeredOverlayModal()

}

modal.addEventListener('click', event => {
    event.stopPropagation()
})


// Denna gör så att underliggande i overlayen gömms
const ClickedOutsideOrTriggeredOverlayModal = () => {
    const selectModal = overlay.children
    selectModal[0].classList.toggle('hidden')
    overlay.classList.toggle('hidden')
}

overlay.addEventListener('click', () => {
    ClickedOutsideOrTriggeredOverlayModal()
})
