 
const calendar = {
	year: document.querySelector('.header__year'),
	month: document.querySelector('.header__month'),
	days: document.querySelector('.aside__days'),
	weekNumber: document.querySelector('.aside__weeks')
}

const array = [
    {year: {
        2023: {
            month: {
                1: {
                    week: {
                        1: {

                        }
                    }
                },
                2: {
                    week: {
                        5:  {

                        }
                    }
                }
            }
        }
    }
} 
]

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

		calendar.days.append(newDay)
	}
}
