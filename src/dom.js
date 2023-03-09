 
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

for (let element of testArray) {
	calendar.month.innerText = element.month

	for (let index = 1; index <= element.days; index++) {
		let newDay = document.createElement('div')
		newDay.innerText = index

        let newActivityBtn = document.createElement('button')

        newActivityBtn.textContent = '+'

        newActivityBtn.addEventListener('click', () => {
            const modal = document.querySelector('.modal')

            const text = document.createElement('h1')

            const input = document.createElement('input')

            input.placeholder = 'Skriv in info om dagen'
            input.type = 'text'

            input.addEventListener('keyup', event => {
                if(event.key == 'Enter') {
                    let info = document.createElement('p')

                    info.textContent = input.value

                    newDay.append(info)
                }
            })

            const hideOptionsBtn = document.createElement('button')
            hideOptionsBtn.textContent = 'Hide'

            hideOptionsBtn.addEventListener('click', () => {

                if (input.style.display == 'inline-block') {
                    input.style.display = 'none'
                    hideOptionsBtn.textContent = 'Show'
                } else {
                    input.style.display = 'inline-block'
                    hideOptionsBtn.textContent = 'Hide'
                }
                
            })

            text.textContent = index

            modal.append(text, input, hideOptionsBtn)

            newDay.append(modal)
        })





        newDay.append(newActivityBtn)

		calendar.days.append(newDay)
	}
}
