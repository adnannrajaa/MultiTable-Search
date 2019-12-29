var bindKeyUp = () => {
    $("#input-country").on('keyup', (e) => {
        console.log({ [e.target.id]: e.target.value })
    })
    $("#input-city").on('keyup', (e) => {
        console.log({ [e.target.id]: e.target.value })
    })
    $("#input-countrycode").on('keyup', (e) => {
        console.log({ [e.target.id]: e.target.value })
    })
} 

$(() => {
    bindKeyUp()

})