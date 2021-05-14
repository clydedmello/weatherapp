
console.log('client side js')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const rsp = document.querySelector('#response')
const error = document.querySelector('#error')
rsp.textContent = ''
weatherform.addEventListener('submit', (e) => {
    rsp.textContent = 'Loading..'
    error.textContent = ''
    e.preventDefault()
    fetch('http://localhost:3000/weather?address=' + search.value).then(response => {
        response.json().then(data => {
            if (data.error) {
                rsp.textContent = ''
                error.textContent = 'error ==> [' + search.value + '] is ' + data.error
            }
            else {

                rsp.textContent = 'Location >>>>>>' + data.location + '===========\n' +
                    "Weather Summary >>>>>>" + data.description + '\n'
                error.textContent = "Currently it is " +
                    data.temprature +
                    " degrees but out there it feels like " +
                    data.feels +
                    " degrees"
            }
        })
    })

})