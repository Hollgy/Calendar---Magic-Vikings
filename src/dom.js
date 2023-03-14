import moment from './moment.js'


const calendar = {
    year: document.querySelector('.header__year'),
    month: document.querySelector('.header__month'),
    days: document.querySelector('.calendar__days'),
    weekNumber: document.querySelector('.aside__weeks')
}

const testArray = [
    {
        month: 'Januari'
    },
    {
        month: 'Februari'
    },
    {
        month: 'Mars'
    },
    {
        month: 'April'
    },
    {
        month: 'Maj'
    },
    {
        month: 'Juni'
    },
    {
        month: 'Juli'
    },
    {
        month: 'Augusti'
    },
    {
        month: 'September'
    },
    {
        month: 'Oktober'
    },
    {
        month: 'November'
    },
    {
        month: 'December'
    }
]


console.log('yolo', moment())
let x = moment().format('MMMM Do YYYY')
console.log(x)
console.log(moment().startOf('day').fromNow())
console.log(moment("2023-02", "YYYY-MM").daysInMonth())
console.log(moment("2023-01", "YYYY-MM").daysInMonth())



// Vi behöver en  funktion som 'lägger ut' rätt antal dagar för varje månad beroende på vilka värden vi stoppar i våra variabler.

let year = 2023
let month = 1
function renderCalendar() {

    for (let index = 0; index <= 11; index++) {
        let daysInMonth = moment(`${year}-${month}`, `YYYY-MM`).daysInMonth()
        testArray[index].days = daysInMonth
        month++
    }
}
renderCalendar()
testArray.forEach(element => {
    console.log(`${element.month} har ${element.days} dagar`);
})

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


for (let element of testArray) {
    calendar.year.innerText = year
    calendar.month.innerText = element.month
    const monthWrapper = document.createElement('div')
    monthWrapper.classList.add('month')

    for (let index = 1; index <= element.days; index++) {
        // Använd funktion från date.fns för att kontrollera vilken vecka det är för att bestämma vilken siffra som ska skrivas ut i aside.

        // Skapar div med datum
        let newDay = document.createElement('div')
        newDay.innerText = index
        newDay.classList.add('day__card')

        // Och en knapp för att kunna lägga till aktivitet
        const showAddInfoModalBtn = document.createElement('button')

        showAddInfoModalBtn.textContent = '+'
        showAddInfoModalBtn.id = index

        showAddInfoModalBtn.addEventListener('click', () => {

            modal.innerHTML = ''

            addNewInfoToDay(newDay, element.month, index, showAddInfoModalBtn.id)

            console.log('newDay', newDay, 'index', index, 'showAddInfoModalBtn', showAddInfoModalBtn.id);

        })

        newDay.append(showAddInfoModalBtn)

        monthWrapper.append(newDay)
    }
    calendar.days.append(monthWrapper)
}

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')

// Overlay för att lägga in information om aktivitet
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

    const showMoreInfoBtn = document.createElement('button')
    showMoreInfoBtn.textContent = '?'

    addInfoForm.append(titleForTheDate, titleInput, infoTextArea, finishedAddingInfoBtn)

    finishedAddingInfoBtn.addEventListener('click', event => {
        event.preventDefault()
        let titleInfo = document.createElement('p')

        if (titleInput.value != '') {
            titleInfo.textContent = '! ' + titleInput.value;

            date.append(titleInfo)
            date.append(showMoreInfoBtn)

            textFromForm.textContent = infoTextArea.value

            ClickedOutsideOrTriggered()

            titleInput.value = ''
            infoTextArea.value = ''
            addInfoForm.innerHTML = ''
        }
    })

    let textFromForm = document.createElement('p')


    showMoreInfoBtn.addEventListener('click', () => {
        modal.innerHTML = ''
        modal.append(textFromForm)

        modal.classList.toggle('hidden')

        overlay.classList.toggle('hidden')
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