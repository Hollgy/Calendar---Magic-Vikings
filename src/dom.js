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


// Vi behöver en  funktion som 'lägger ut' rätt antal dagar för varje månad beroende på vilka värden vi stoppar i våra variabler.

function renderCalendar() {

    for (let year = 2020; year <= 2025; year++) {
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

const dateformat = ['YYYY-M-D', 'YYYY-MM-DD']


// Jämför ett inkommande year- månads-ID med ett års- och månadsobjekt och ta bort hidden på den som matchar. 

function toggleMonthVisibility(showYear, showMonthID, hideMonthID) {
    let showYearObject = testArray.find(element => element.year == showYear)
    let showMonthObject = showYearObject.months.find(element => element.id == showMonthID)

    let monthToShow = document.querySelector(`#${showMonthID}`)
    let monthToHide = document.querySelector(`#${hideMonthID}`)

    monthToHide.classList.add('hidden')
    monthToShow.classList.remove('hidden')
    calendar.year.innerText = showYearObject.year
    calendar.month.innerText = showMonthObject.month

    // Lägger till eller tar bort .hidden på veckonummer-divarna beroende på månaden som ska synas och vilken som ska gömmas
    function showHideWeeks(year) {
        let allWeekNumbers = document.querySelectorAll('.week-number')
        allWeekNumbers.forEach(element => element.classList.add('hidden'))

        // Lägger till de aktuella veckonumren i en array.
        let weekNumberArray = []
        let newWeek = 0
        for (let index = 1; index <= showMonthObject.days; index++) {
            let week = moment(`${year}-${showMonthObject.index}-${index}`, dateformat).week()
            if (newWeek != week) {
                weekNumberArray.push(week)
                newWeek = week
            }
        }

        // Ser till att veckorna visas i rätt ordning om det är januari eller december. Och tar bort klassen hidden på de aktuella veckorna.
        weekNumberArray.forEach(element => {
            let weekElement = document.querySelector(`#w-${element}`)
            let firstWeekElement = document.querySelector(`#w-1`)
            let secondWeekElement = document.querySelector(`#w-2`)
            let weekBeforeElement = document.querySelector(`#w-${element - 1}`)
            let week52Element = document.querySelector(`#w-52`)
            let week53Element = document.querySelector(`#w-53`)

            if (showMonthObject.index == 12 && element == 1) {
                console.log('första veckan är 1');
                if (week53Element) {
                    week53Element.after(weekElement)
                } else {
                    week52Element.after(weekElement)
                }
            } else if (showMonthObject.index != 12 && element == 1) {
                console.log('första veckan är inte 1');
                secondWeekElement.before(weekElement)
            }
            else if (showMonthObject.index == 1 && element == 52 || element == 53) {
                firstWeekElement.before(weekElement)

            } else if (showMonthObject.index != 1 && element == 52 || element == 53) {
                weekBeforeElement.after(weekElement)

            }

            let week = document.querySelector(`#w-${element}`)
            week.classList.remove('hidden')
        })
    }

    showHideWeeks(showYearObject.year)
}

// Ger ett nytt månadsID beroende på vilken knapp som klickats på
function changeBetweenMonths(currentMonthID, button) {
    let currentMonth = document.querySelector(`#${currentMonthID}`)
    let nextMonth = currentMonth.nextElementSibling
    let previousMonth = currentMonth.previousElementSibling

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
    let monthIndex = month.index
    monthWrapper.setAttribute('id', `y${year}-m${monthIndex}`)

    let firstDateOfMonth = moment(`${year}-${monthIndex}-1`, dateformat)
    let lastDateOfMonth = moment(`${year}-${monthIndex}-${month.days}`, dateformat)
    let firstDateOfFirstWeek = moment(firstDateOfMonth.startOf('isoWeek'), dateformat)
    let lastDateOfLastWeek = moment(lastDateOfMonth.endOf('isoWeek'), dateformat)

    let diffBetweenFirstAndLastDay = lastDateOfLastWeek.diff(firstDateOfFirstWeek, 'days')

    let daysInMonthView = []

    // Loop som använder diffen mellan startdatum och slutdatum för att lägga in månadsvyns datum (Alltså datumet från första dagen i första veckan till och med datumet för sista dagen i sista veckan) i daysInMonthView-arrayen.
    for (let i = 0; i < diffBetweenFirstAndLastDay + 1; i++) {
        let date = moment(firstDateOfFirstWeek, dateformat).add(i, 'day')
        daysInMonthView.push(date)
    }
    // console.log(daysInMonthView);


    for (let index = 0; index < daysInMonthView.length; index++) {

        // Skapar div med datum
        let newDay = document.createElement('div')

        let year = daysInMonthView[index].format('YYYY')
        let month = daysInMonthView[index].format('M')
        let day = daysInMonthView[index].format('D')

        newDay.innerText = day
        newDay.classList.add('day__card')
        if (month != monthIndex) {
            newDay.classList.add('day__card--gray')
        }

        let currentDay = moment().format("D")
        let currentMonth = moment().format("M")
        let currentYear = moment().format("YYYY")

        if (day == currentDay && monthIndex == currentMonth && year == currentYear) {
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
    calendar.days.append(monthWrapper)
}

// Går igenom testarray och skapar en månadsvy för varje månad i varje år
testArray.forEach(yearObject => {
    yearObject.months.forEach(month => {
        createMonth(yearObject.year, month)
    })
})

let currentYearStart = moment().format('Y')
let currentMonthStart = moment().format('M')
let previousMonth = null
if (currentMonthStart == 1) {
    previousMonth = `y${currentYearStart - 1}-m12`
} else {
    previousMonth = `y${currentYearStart}-m${currentMonthStart - 1}`
}

// Månaden som är just nu som startsida
toggleMonthVisibility(currentYearStart, `y${currentYearStart}-m${currentMonthStart}`, previousMonth)

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
    toggleMonthVisibility(newYear, newMonthID, monthVisibleID)
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
