var count=0;
$(document).ready(function () {
    $("#CountrySearch").on("keyup", SearchbyCountry);
    $("#CapitalSearch").on("keyup", SearchbyCapital);
    $("#CitySearch").on("keyup", SearchbyCity);

    $("#FilerCountry").hide();
    $("#FilerCapital").hide();
    $("#FilerCity").hide();

});

function SearchIndividulColumn(n,textBoxId)
{
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(textBoxId);
    filter = input.value.toUpperCase();
    table = document.getElementById("TableFilter");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[n];
        if (td) {

            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                count++;

            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function envokeMultiSearch(n,textBoxId)
{
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(textBoxId);
    filter = input.value.toUpperCase();
    table = document.getElementById("TableFilter");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[n];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                if (tr[i].style.display != "none")
                {
                    tr[i].style.display = "";
                    count++;
                }
               
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function SearchbyCountry() {
    count = 0;
   if ($("#CountrySearch").val() != "")
   {
       $("#FilerCountry").show();
       $("#FilerCountry").text($("#CountrySearch").val());
   }
   else
   {
       $("#FilerCountry").hide();
   }
   if ($("#CitySearch").val() == "" && $("#CapitalSearch").val() == "") {
       SearchIndividulColumn(0, "CountrySearch");
       $("#totalShowing").text(count);
   }
   
}
function SearchbyCapital() {
    count = 0;
    if ($("#CapitalSearch").val() != "")
    {
        $("#FilerCapital").show();
        $("#FilerCapital").text($("#CapitalSearch").val());
    }
    else
    {
        $("#FilerCapital").hide();
    }
    if ($("#CitySearch").val() == "" && $("#CountrySearch").val() == "") {
        SearchIndividulColumn(1, "CapitalSearch");
        $("#totalShowing").text(count);
    }
    else if ($("#CountrySearch").val() != "" && $("#CapitalSearch").val() != "") {
        envokeMultiSearch(1, "CapitalSearch");
        $("#totalShowing").text(count);
    }
    else if ($("CapitalSearch").val() == "")
    {
        SearchIndividulColumn(0, "CountrySearch");
    }
}
function SearchbyCity() {
    count = 0;
    if ($("#CitySearch").val() != "") {
        $("#FilerCity").show();
        $("#FilerCity").text($("#CitySearch").val());
    }
    else
    {
        $("#FilerCity").hide();
    }
    if($("#CapitalSearch").val() == "" && $("#CountrySearch").val() == "")
    {
        SearchIndividulColumn(2, "CitySearch");
        $("#totalShowing").text(count);
    }

}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile("/JsonDataFile/DataFile.json", function (text) {
    var data = JSON.parse(text);
    var HtmlTr = "";
    for (var i = 0; i < data.length; i++) {
        HtmlTr += "<tr><td>" + data[i].CountryName + "</td><td>" + data[i].City + "</td><td>" + data[i].CountryCode + "</td></tr>";
    }
    $("#LoadJsonRow").append(HtmlTr);
    $("#totalRecords").text(data.length);
    $("#totalShowing").text(data.length);

});

function sortTable(n)
{
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("TableFilter");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1) ; i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
