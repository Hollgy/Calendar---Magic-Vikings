 
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

        showAddInfoModalBtn.addEventListener('click', () => {
            addNewInfoToDay(newDay, element.month, index)
        })

        newDay.append(showAddInfoModalBtn, modal)

		calendar.days.append(newDay)
	}
}

const addNewInfoToDay = (date, month, index) => {
    const text = document.createElement('h1')

    const input = document.createElement('input')

    input.placeholder = 'Skriv in info om dagen'
    input.type = 'text'

    input.addEventListener('keyup', event => {
        if(event.key == 'Enter') {
            let info = document.createElement('p')

            if (input.value != '')  {
                info.textContent = '! ' + input.value

                date.append(info)
            }
        }
    })

    text.textContent = month + ' - ' + index

    modal.append(text, input)

    date.append(modal)
}