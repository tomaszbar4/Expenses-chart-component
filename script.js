
const additionalInfoEls = document.querySelectorAll('.additional-info')
const columns = document.querySelectorAll('.column')
const totalAmountEl = document.getElementById('total-amount')
const weekDays = document.querySelectorAll('.day-of-week')

let finalData = {}

loadData()
updateColumnColor()

async function getData() {
    const response = await fetch('data.json')
    const data = await response.json()
    finalData = data
}

async function loadData() {
    await getData()
    let total = 0

    additionalInfoEls.forEach((el, index) => {
        const amount = finalData[index].amount
        el.textContent = '$' + amount
        total += amount
    })
    totalAmountEl.textContent = '$' + total.toFixed(2)

    setColumnHeight()

    function setColumnHeight() {
        columns.forEach((column, index) => {
            const amount = finalData[index].amount
            column.style.height = amount * 2.75 + 'px'
        })
    }
}

function updateColumnColor() {
    const day = new Date()
    const dayOfWeek = day.toString().substring(0, 3).toLowerCase()
    console.log(dayOfWeek)
    weekDays.forEach(day => {
        if (day.textContent == dayOfWeek) {
            columns.forEach(column => {
                column.classList.remove('blue')
            })
            const column = day.parentElement.querySelector('.column')
            column.classList.add('blue')

        }
    })
}

