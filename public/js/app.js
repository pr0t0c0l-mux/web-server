console.log('Client side javascript file is loaded.')

fetch('http://localhost:3000/weather?address=!'). then ((response) => {
    response.json().then((data) => {
        console.log(data)
        if (data.error) {
            console.log(data.error)

        }else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    console.log(location)
})