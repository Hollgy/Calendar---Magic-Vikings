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


// console.log('yolo', moment())
// let x = moment().format('MMMM Do YYYY')
// console.log(x)
// console.log(moment().startOf('day').fromNow())
// console.log(moment("2023-02", "YYYY-MM").daysInMonth())
// console.log(moment("2023-01", "YYYY-MM").daysInMonth())



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
    // console.log(`${element.month} har ${element.days} dagar`);
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

        showAddInfoModalBtn.innerHTML = `<span class="material-symbols-outlined">
        add
        </span>`
        showAddInfoModalBtn.title = 'Lägg till aktivitet'
        showAddInfoModalBtn.id = index

        showAddInfoModalBtn.addEventListener('click', () => {

            modal.innerHTML = ''

            addNewOrEditInfoToDay(newDay, element.month, index)
        })

        newDay.append(showAddInfoModalBtn)

        monthWrapper.append(newDay)
    }
    calendar.days.append(monthWrapper)
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
        titleInfo = document.createElement('p');
        titleInfo.textContent = '! ' + titleInput.value;
        if (titleInput.value != '') {
            titleInfo.textContent = '! ' + titleInput.value;

            date.append(titleInfo)
            date.append(showMoreInfoBtn)
            date.append(editActivityBtn)
            date.append(deleteActivityBtn)

            textFromForm.textContent = infoTextArea.value

            // Sparar input i ett objekt.
            const data = {
                event: titleInput.value,
                info: infoTextArea.value,
                month: month,
                date: index,
            };

            // Hämtar existerande data från LS, skapar ny array om det är tomt.
            const existingData = JSON.parse(localStorage.getItem(`-${month}-${index}`)) || [];
            existingData.push(data);

            // Lagrar all data i en key i LS, enligt date/month.
            localStorage.setItem(`-${month}-${index}`, JSON.stringify(existingData));

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
        console.log("removed");
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

        if (editTitleInfo.value == '') {
            titleInfo.textContent = editTitleInfo.value;
            textFromForm.textContent = editInfoTextarea.value

            ClickedOutsideOrTriggeredOverlayModal()
        }
    })

    // Redigera aktivitet
    editActivityBtn.addEventListener('click', () => {
        modal.innerHTML = ''
        modal.append(editInfoForm)
        console.log("edit made");

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