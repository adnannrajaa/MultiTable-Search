//let filterdata = [];
//let showingrecordcount=0;
//let sortbycountrystatus="none",sortbycitystatus="none",sortbycountrycodestatus="none"
//let data = [
//    {
//        country: 'Pakistan',
//        city: 'Karachi',
//        countrycode:'PK'
//    },
//    {
//        country: 'Saudi Arabia',
//        city: 'Makkah',
//        countrycode: 'KSA'

//    },
//    {
//        country: 'Pakistan',
//        city: 'Rawalpindi',
//        countrycode: 'PK'
//    },
//    {
//        country: 'Russia',
//        city: 'Mascow',
//        countrycode: 'RS'
//    }
//]
//showingRecordCount = data.length
//filterData = data

//let loadData = (arg_data) => {
//    clearTable()
//    hideFilters()

//    arg_data.map(row => {
//        renderRow(row)
//    })
//    if(showingRecordCount>0)
//    {
//        showRecordCount()
//    }
//    showFilter()
//}
//let showRecordCount= ()=>{
//    $(".record-containing-label").removeClass('invisible')
//    $("#total-records").text(data.length)
//    $("#total-record-showing").text(showingRecordCount)
//}
//let clearTable = () => {
//    $("#TableFilter tbody").empty()
//}
//let renderRow = (row) => {
//    const {country, city, countrycode } = row;
//    let dataRow = $("#dataRow").clone();
//    dataRow.removeAttr('hidden')
//    dataRow.removeAttr('id')
//    dataRow.find('#country').text(country)
//    dataRow.find('#city').text(city)    
//    dataRow.find('#countrycode').text(countrycode)
//    $("#tbody").append(dataRow)

//}

//let handleTextBoxChange = () => {
//    $("#input-country,#input-city,#input-countrycode").on('keyup', (e) => {
//        applyFilter($("#input-country").val(), $("#input-city").val(), $("#input-countrycode").val());
//        //
//    })
//}
//let applyFilter = (country, city, code) => {
//    hideFilters()
//    filterData = data.filter(x => (country == '' || x.country.toLowerCase().includes(country.toLowerCase()))
//        && (city == '' || x.city.toLowerCase().includes(city.toLowerCase()))
//        && (code == '' || x.countrycode.toLowerCase().includes(code.toLowerCase()))
//    )
//    showingRecordCount=filterData.length
//    loadData(filterData)
//    showFilter()
//}
//let hideFilters = () => {
//    $("#filter-country,#filter-city,#filter-code").addClass('invisible')
//}
//let showFilter = () => {
//    if ($("#input-country").val()) {
//        $("#filter-country").removeClass('invisible')
//        $("#filter-country").text($("#input-country").val())
//    }
//    if ($("#input-city").val()) {
//        $("#filter-city").removeClass('invisible')
//        $("#filter-city").text($("#input-city").val())
//    }
//    if ($("#input-countrycode").val()) {
//        $("#filter-code").removeClass('invisible')
//        $("#filter-code").text($("#input-countrycode").val())
//    }
//}

//let sortData=(column,type)=>{
//    filterData.sort((a,b)=>{
//        if(type=="asc"){
//            return a[column]<b[column]
//        }else return a[column]>b[column]
//    })
//    loadData(filterData)
//}

//let sortByCountry=(param)=>{

//    if(sortByCountryStatus=='none'){
//        sortByCountryStatus="asc"
//    }
//   else if(sortByCountryStatus=="asc"){
//        sortByCountryStatus="desc"
//    }
//    else if(sortByCountryStatus=="desc"){
//        sortByCountryStatus="asc"
//    }
//    sortData("country",sortByCountryStatus)
//}
//let sortByCity=(param)=>{

//    if(sortByCityStatus=='none'){
//        sortByCityStatus="asc"
//    }
//    else if(sortByCityStatus=="asc"){
//        sortByCityStatus="desc"
//    }
//    else if(sortByCityStatus=="desc"){
//        sortByCityStatus="asc"
//    }
//    sortData("city",sortByCityStatus)
//}
//let sortByCountryCode=(param)=>{

//    if(sortByCountrycodeStatus=='none'){
//        sortByCountrycodeStatus="asc"
//    }
//    else if(sortByCountrycodeStatus=="asc"){
//        sortByCountrycodeStatus="desc"
//    }
//    else if(sortByCountrycodeStatus=="desc"){
//        sortByCountrycodeStatus="asc"
//    }
//    sortData("countrycode",sortByCountrycodeStatus)
//}
//$(() => {
//    loadData(data)
//    handleTextBoxChange()
   
//})
let filterData = [];
let showingRecordCount=0;
let data = []
let sortByCountryStatus="none",sortByCityStatus="none",sortByCountryCodeStatus="none"

let readTextFile = (file, result) => {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            result(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
let loadFileData = () => {
    readTextFile("/JsonDataFile/DataFile.json",text => {
        data = JSON.parse(text)
        loadData(data)
        filterData = data
        showingRecordCount = filterData.length
        showRecordCount(showingRecordCount)
    })
}
let loadData = (arg_data) => {
    clearTable()
    hideFilters()

    arg_data.map(row => {
        renderRow(row)
    })
    if(data.length != 0)
    {
        showRecordCount(filterData.length)
    }
    showFilter()
}
let showRecordCount= (showingRecordCount)=>{
    $(".record-containing-label").removeClass('invisible')
    $("#total-records").text(data.length)
    $("#total-record-showing").text(showingRecordCount)
}
let clearTable = () => {
    $("#TableFilter tbody").empty()
}
let renderRow = (row) => {
    const {CountryName, City, CountryCode } = row;
    let dataRow = $("#dataRow").clone();
    dataRow.removeAttr('hidden')
    dataRow.removeAttr('id')
    dataRow.find('#country').text(CountryName)
    dataRow.find('#city').text(City)    
    dataRow.find('#countrycode').text(CountryCode)
    $("#tbody").append(dataRow)

}
let handleTextBoxChange = () => {
    $("#input-country,#input-city,#input-countrycode").on('keyup', (e) => {
        applyFilter($("#input-country").val(), $("#input-city").val(), $("#input-countrycode").val());
    })
   
}
let textBoxChangeOnClick=()=>{
    applyFilter($("#input-country").val(), $("#input-city").val(), $("#input-countrycode").val());
}
let applyFilter = (country, city, code) => {
    hideFilters()
    filterData = data.filter(x => (country == '' || x.CountryName.toLowerCase().includes(country.toLowerCase()))
        && (city == '' || x.City.toLowerCase().includes(city.toLowerCase()))
        && (code == '' || x.CountryCode.toLowerCase().includes(code.toLowerCase()))
    )
    showingRecordCount=filterData.length
    loadData(filterData)
    showFilter()
}
let hideFilters = () => {
    $("#filter-country,#filter-city,#filter-code").addClass('invisible')
}
let showFilter = () => {
    if ($("#input-country").val()) {
        $("#filter-country").removeClass('invisible')
        $("#filter-country").text($("#input-country").val())
    }
    if ($("#input-city").val()) {
        $("#filter-city").removeClass('invisible')
        $("#filter-city").text($("#input-city").val())
    }
    if ($("#input-countrycode").val()) {
        $("#filter-code").removeClass('invisible')
        $("#filter-code").text($("#input-countrycode").val())
    }
}
let sortData=(column,type)=>{
    filterData.sort((a,b)=>{
        if(type=="asc"){
            return a[column]<b[column] ? 1 : -1
        }else return a[column]>b[column] ? 1 : -1
    })
    loadData(filterData)
}
let sortByCountry=()=>{
    switch(sortByCountryStatus)
    {
        case "none":
            sortByCountryStatus="asc"
            break
        case "asc":
            sortByCountryStatus="desc"
            break
        case "desc":
            sortByCountryStatus="asc"
            break
    }
    sortData("country",sortByCountryStatus)
}
let sortByCity=()=>{
    switch(sortByCityStatus)
    {
        case "none":
            sortByCityStatus="asc"
            break
        case "asc":
            sortByCityStatus="desc"
            break
        case "desc":
            sortByCityStatus="asc"
            break
    }
    sortData("city",sortByCityStatus)
}
let sortByCountryCode=()=>{
    switch(sortByCountryCodeStatus)
    {
        case "none":
            sortByCountryCodeStatus="asc"
            break
        case "asc":
            sortByCountryCodeStatus="desc"
            break
        case "desc":
            sortByCountryCodeStatus="asc"
            break
    }
    sortData("countrycode",sortByCountryCodeStatus)
}
let hideFiltersLabel = () => {
    $("#filter-country,#filter-city,#filter-code").on('click', (e) => {
        switch(e.target.id)
        {
            case "filter-country":
                $("#filter-country").addClass("invisible")
                $("#input-country").val("")
                textBoxChangeOnClick()
                break
            case "filter-city":
                $("#filter-city").addClass("invisible")
                $("#input-city").val("")
                textBoxChangeOnClick()
                break
            case "filter-code":
                $("#filter-code").addClass("invisible")
                $("#input-countrycode").val("")
                textBoxChangeOnClick()
                break
        }
    })
}


$(() => {
    loadFileData()
    handleTextBoxChange()
    hideFiltersLabel()
})


