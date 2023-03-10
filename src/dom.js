 
const calendar = {
	year: document.querySelector('.header__year'),
	month: document.querySelector('.header__month'),
	days: document.querySelector('.aside__days'),
	weekNumber: document.querySelector('.aside__weeks')
}

const testArray = [
    {   month: 'Januari',
        days: 31
    },
    {   month: 'Februari',
        days: 28
    },
    {   month: 'Mars',
        days: 31
    },
    {   month: 'April',
        days: 30
    },
    {   month: 'Maj',
        days: 31
    },
    {   month: 'Juni',
        days: 30
    }
]

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

            if (titleInput.value != '')  {
                titleInfo.textContent = '! ' + titleInput.value;

                    date.append(titleInfo)
                    
                ClickedOutsideOrTriggered()

                titleInput.value = ''
                infoTextArea.value = ''
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