import { getDaysInMonth } from "../node_modules/date-fns/esm/index.js";
// getDaysInMonth tar två parametrar, (år, månad), vi behöver ha variabler för parametrarna som vi kan ändra på.

const calendar = {
    year: document.querySelector('.header__year'),
    month: document.querySelector('.header__month'),
    days: document.querySelector('.aside__days'),
    weekNumber: document.querySelector('.aside__weeks')
}

const testArray = [
    {
        month: 'Januari',
    },
    {
        month: 'Februari',
    },
    {
        month: 'Mars',
    },
    {
        month: 'April',
    },
    {
        month: 'Maj',
    },
    {
        month: 'Juni',
    },
    {
        month: 'Juli',
    },
    {
        month: 'Augusti',
    },
    {
        month: 'September',
    },
    {
        month: 'Oktober',
    },
    {
        month: 'November',
    },
    {
        month: 'December',
    }
]

// Vi behöver en  funktion som 'lägger ut' rätt antal dagar för varje månad beroende på vilka värden vi stoppar i våra variabler.

let year = 2023
let month = 0
function renderCalendar() {

    for (let index = 0; index <= 11; index++) {
        let daysInMonth = getDaysInMonth(new Date(year, month))
        // console.log(testArray[index]);
        testArray[index].days = daysInMonth
        month++
        // console.log(testArray[index]);
    }

}
renderCalendar()
testArray.forEach(element => {
    console.log(`Månad ${element.month} har ${element.days} dagar`);
})
// console.log(`Våran månadsarray: ${testArray}`);

// function checkIfToday() {
//     dagArray.forEach(element => {
//         const dateFormatted = format(element, 'dd/MM/yyyy')
//         let day = dateFormatted.slice(0, 1)
//         let month = dateFormatted.slice(3, 4)
//         let year = dateFormatted.slice(6, 9)
//         if (isToday(new Date(year, month, day)) == true) {

//         }
//     });
// }

// isToday(new Date(2023, 2, 10))


const modal = document.querySelector('.modal')

for (let element of testArray) {
    calendar.month.innerText = element.month

    for (let index = 1; index <= element.days; index++) {
        let newDay = document.createElement('div')
        newDay.innerText = index

        const showAddInfoModalBtn = document.createElement('button')

        showAddInfoModalBtn.textContent = '+'
        showAddInfoModalBtn.id = index

        showAddInfoModalBtn.addEventListener('click', () => {
            addNewInfoToDay(newDay, element.month, index, showAddInfoModalBtn.id)

            console.log('newDay', newDay, 'index', index, 'showAddInfoModalBtn', showAddInfoModalBtn.id);
        })

        newDay.append(showAddInfoModalBtn)

        calendar.days.append(newDay)
    }
}

const overlay = document.querySelector('.overlay')

const addNewInfoToDay = (date, month, index, btnID) => {

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

    finishedAddingInfoBtn.addEventListener('click', event => {
        event.preventDefault()
        let titleInfo = document.createElement('p')

        if (titleInput.value != '') {
            titleInfo.textContent = '! ' + titleInput.value;

            date.append(titleInfo)

            ClickedOutsideOrTriggered()

            titleInput.value = ''
            infoTextArea.value = ''
            addInfoForm.innerHTML = ''
        }
    })

    titleForTheDate.textContent = month + ' - ' + index

    modal.append(addInfoForm)

    modal.classList.toggle('hidden')

    overlay.classList.toggle('hidden')

}

modal.addEventListener('click', event => {
    event.stopPropagation()
})

const ClickedOutsideOrTriggered = () => {
    const selectModal = overlay.children
    selectModal[0].classList.add('hidden')
    overlay.classList.toggle('hidden')
}

overlay.addEventListener('click', () => {
    ClickedOutsideOrTriggered()
})