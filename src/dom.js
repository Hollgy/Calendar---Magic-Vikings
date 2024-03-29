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
                if (week53Element) {
                    week53Element.after(weekElement)
                } else {
                    week52Element.after(weekElement)
                }
            } else if (showMonthObject.index != 12 && element == 1) {
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
    let monthName = month.month
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
        let newDayNumber = document.createElement('p')
        newDayNumber.textContent = index

        let year = daysInMonthView[index].format('YYYY')
        let month = daysInMonthView[index].format('M')
        let day = daysInMonthView[index].format('D')

        const controlsUl = document.createElement('ul')
        controlsUl.classList.add('day__list')

        newDayNumber.textContent = moment(daysInMonthView[index]).format('D')
        newDay.classList.add('day__card')
        if (month != monthIndex) {
            newDay.classList.add('day__card--gray')
        }

        newDay.append(newDayNumber, controlsUl)

        let currentDay = moment().format("D")
        let currentMonth = moment().format("M")
        let currentYear = moment().format("YYYY")

        if (day == currentDay && monthIndex == currentMonth && year == currentYear) {
            newDay.classList.add("current-day")
        }
        // Och en knapp för att kunna lägga till aktivitet
        const showAddInfoModalBtn = document.createElement('button')
        const showAddTasksModalBtn = document.createElement('button')

        showAddInfoModalBtn.innerHTML = `<span class="material-symbols-outlined">
        add
        </span>`
        showAddInfoModalBtn.title = 'Lägg till aktivitet'
        showAddInfoModalBtn.id = index
        showAddInfoModalBtn.classList.add('day__add-button')

        showAddInfoModalBtn.addEventListener('click', () => {

            modal.innerHTML = ''
            addNewInfoToDay(newDay, controlsUl, monthName, index)
        })

        showAddTasksModalBtn.title = 'Lägg till kategori'
        showAddTasksModalBtn.id = index
        showAddTasksModalBtn.classList.add('day__add-task-button')
        showAddTasksModalBtn.innerHTML = `<span class="material-symbols-outlined">
        radio_button_unchecked
        </span>`

        showAddTasksModalBtn.addEventListener('click', () => {
            modal.innerHTML = ''
            addTaskToDate(showAddTasksModalBtn, monthName, index)
        })


        newDay.append(showAddInfoModalBtn, showAddTasksModalBtn)
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
const addNewInfoToDay = (date, controls, month, index) => {

    // Gör specifika input fält för rätt aktivitet skapande
    console.log(date);
    console.log(month);
    let p = date.querySelector('p').innerText

    const titleForTheDate = document.createElement('h1')
    const titleInput = document.createElement('input')
    titleInput.placeholder = 'Skriv in titel'
    titleInput.type = 'text'

    const textForTitleInput = document.createElement('p')
    textForTitleInput.textContent = 'Titel'

    const textForTextInput = document.createElement('p')
    textForTextInput.textContent = 'Beskrivning'

    const infoTextArea = document.createElement('textarea')
    infoTextArea.placeholder = 'Skriv in info om dagen'

    const addInfoForm = document.createElement('form')

    const finishedAddingInfoBtn = document.createElement('button')
    finishedAddingInfoBtn.textContent = 'Klar'

    addInfoForm.append(titleForTheDate, textForTitleInput, titleInput, textForTextInput, infoTextArea, finishedAddingInfoBtn)


    // Container för tillagda aktiviteter
    const controlsLi = document.createElement('li')


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

        titleInfo = document.createElement('span')

        if (titleInput.value != '') {
            titleInfo.textContent = titleFromForm.textContent = titleInput.value;

            controls.append(controlsLi)

            controlsLi.append(titleInfo, showMoreInfoBtn, editActivityBtn, deleteActivityBtn)

            textFromForm.textContent = infoTextArea.value

            ClickedOutsideOrTriggeredOverlayModal()

            titleInput.value = ''
            infoTextArea.value = ''
            addInfoForm.innerHTML = ''
        }
    })

    let textFromForm = document.createElement('p')
    let titleFromForm = document.createElement('h1')

    // Visar vad man har skrivit för text i textarea efter tilläggningen av aktivitet
    showMoreInfoBtn.addEventListener('click', () => {
        modal.innerHTML = ''
        modal.append(titleFromForm, textFromForm)

        ClickedOutsideOrTriggeredOverlayModal()
    })

    // Ta bort aktivitet
    deleteActivityBtn.addEventListener('click', () => {
        controlsLi.remove()
    })

    // Redigera aktivitet
    editActivityBtn.addEventListener('click', () => {
        editInfoToDay(titleInfo, textFromForm)
        ClickedOutsideOrTriggeredOverlayModal()
    })

    // Visar månaden och datumet i tillägningen av aktivitet i form

    titleForTheDate.textContent = p + ' - ' + month


    modal.append(addInfoForm)

    ClickedOutsideOrTriggeredOverlayModal()

}

const editInfoToDay = (title, textFrom,) => {
    modal.innerHTML = ''


    // Allt som finns till redigiering av aktivitet
    const editInfoForm = document.createElement('form')
    const finishedEditingInfoBtn = document.createElement('button')
    finishedEditingInfoBtn.textContent = 'Klar'

    const editTitleInfo = document.createElement('input')
    editTitleInfo.type = 'text'
    editTitleInfo.placeholder = 'Skriv in ny titel'
    editTitleInfo.value = title.textContent

    const editInfoTextarea = document.createElement('textarea')
    editInfoTextarea.placeholder = 'Skriv in ny beskrivning'
    editInfoTextarea.value = textFrom.textContent

    editInfoForm.append(editTitleInfo, editInfoTextarea, finishedEditingInfoBtn)

    finishedEditingInfoBtn.addEventListener('click', event => {
        event.preventDefault()

        if (editTitleInfo.value !== '') {
            title.textContent = editTitleInfo.value
            textFrom.textContent = editInfoTextarea.value

            ClickedOutsideOrTriggeredOverlayModal()
        }
    })

    modal.append(editInfoForm)
}

const addTaskToDate = (button, month, index) => {
    const taskForm = document.createElement('form')

    // Select & Options

    const selectContainer = document.createElement('select')

    selectContainer.classList.add('select')

    const selectMethod0 = document.createElement('option')
    selectMethod0.textContent = 'Välj kategori'
    selectMethod0.value = 0

    const selectMethod1 = document.createElement('option')
    selectMethod1.textContent = 'Träning'
    selectMethod1.value = 1
    selectMethod1.style.backgroundColor = "#119e1d"
    selectMethod1.style.color = '#f1f1f1'

    const selectMethod2 = document.createElement('option')
    selectMethod2.textContent = 'Arbete'
    selectMethod2.value = 2
    selectMethod2.style.backgroundColor = "#28aed7"
    selectMethod2.style.color = '#f1f1f1'

    const selectMethod3 = document.createElement('option')
    selectMethod3.textContent = 'Studier'
    selectMethod3.value = 3
    selectMethod3.style.backgroundColor = "#f93806"
    selectMethod3.style.color = '#f1f1f1'

    const selectMethod4 = document.createElement('option')
    selectMethod4.textContent = 'Möten'
    selectMethod4.value = 4
    selectMethod4.style.backgroundColor = "#faf805"
    selectMethod4.style.color = '#000'

    const selectMethod5 = document.createElement('option')
    selectMethod5.textContent = 'Ta bort'
    selectMethod5.value = 5

    selectContainer.append(selectMethod0, selectMethod1, selectMethod2, selectMethod3, selectMethod4, selectMethod5)

    // Buttons & Text
    const title = document.createElement('h1')
    title.textContent = `${index} - ${month} `

    const acceptTask = document.createElement('button')
    acceptTask.textContent = 'Klar'

    taskForm.append(title, selectContainer, acceptTask)

    modal.append(taskForm)

    acceptTask.addEventListener('click', event => {
        event.preventDefault()

        if (selectContainer.selectedIndex == 0) {

        } else if (selectContainer.selectedIndex == 1) {
            button.innerHTML = `<span class="material-symbols-outlined">
            radio_button_checked
            </span>`
            button.style.color = "#119e1d"
        } else if (selectContainer.selectedIndex == 2) {
            button.innerHTML = `<span class="material-symbols-outlined">
            radio_button_checked
            </span>`
            button.style.color = "#28aed7"
        } else if (selectContainer.selectedIndex == 3) {
            button.innerHTML = `<span class="material-symbols-outlined">
        radio_button_checked
        </span>`
            button.style.color = "#f93806"
        } else if (selectContainer.selectedIndex == 4) {
            button.innerHTML = `<span class="material-symbols-outlined">
            radio_button_checked
            </span>`
            button.style.color = "#faf805"
        } else if (selectContainer.selectedIndex == 5) {
            button.innerHTML = `<span class="material-symbols-outlined">
        radio_button_unchecked
        </span>`
            button.style.color = '#fff'
        }

        ClickedOutsideOrTriggeredOverlayModal()
    })

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


