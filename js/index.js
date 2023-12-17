let btnSubmit = document.getElementById("btnSubmit")
let tableContent = document.getElementById("tableContent")
let namebtn = document.getElementById("name")
let urlbtn = document.getElementById("url")
let btnupdate = document.getElementById("btnupdate")
let arrayBookmark;
if (localStorage.getItem("objectadd") == null) {
    arrayBookmark = []
} else {

    arrayBookmark = JSON.parse(localStorage.getItem("objectadd"))
    showdata()
}

function add() {
    let objadd = {
        nameBtn: namebtn.value,
        urlBtn: urlbtn.value
    }
    if (objadd.nameBtn.length > 3 && /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(urlbtn.value)) {

        arrayBookmark.push(objadd)
    }
    showdata()
    btnupdate.classList.add('d-none')
    localStorage.setItem("objectadd", JSON.stringify(arrayBookmark))
}

function showdata() {
    let table = ""
    for (let i = 0; i < arrayBookmark.length; i++) {


        table += ` <tr id="trow">
        <td class="">${i+1}</td>
        <td class="">${ arrayBookmark[i].nameBtn}</td>
            <td class=""><button onclick="updatelink(${i})" class="btn btn-primary" >update</button></td>
            <td class=""><a href="${arrayBookmark[i].urlBtn} " target="_blank" class="btn btn-info">Visit</a></td>
            <td class=""><button class="btn btn-danger" onclick="deleteLink(${i})">Delete</button></td>
            </tr>`

    }
    tableContent.innerHTML = table
    clearinput()
}

function clearinput() {
    namebtn.value = ""
    urlbtn.value = ""
}
namebtn.addEventListener("keyup", () => {
    if (namebtn.value.length < 3) {
        namebtn.classList.remove("greenshado")
        namebtn.classList.add("redshado")
    } else {
        namebtn.classList.add("greenshado")
        namebtn.classList.remove("redshado")
    }
})
urlbtn.addEventListener("keyup", () => {
    if (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(urlbtn.value)) {
        urlbtn.classList.add("greenshado")
        urlbtn.classList.remove("redshado")
    } else {
        urlbtn.classList.remove("greenshado")
        urlbtn.classList.add("redshado")
    }
})

function deleteLink(e) {
    arrayBookmark.splice(e, 1)
    localStorage.setItem("objectadd", JSON.stringify(arrayBookmark))

    showdata()
}


function updatelink(e) {
    let tableRow = document.getElementsByTagName("tr")
    for (let i = 0; i < tableRow.length; i++) {
        tableRow[i].style.opacity = 1
    }
    tableRow[e + 1].style.opacity = .5
    btnupdate.classList.remove('d-none')
    btnSubmit.classList.add('d-none')
    namebtn.value = arrayBookmark[e].nameBtn
    urlbtn.value = arrayBookmark[e].urlBtn
    btnupdate.onclick = () => {
        arrayBookmark[e].nameBtn = namebtn.value
        arrayBookmark[e].urlBtn = urlbtn.value
        showdata()
        btnupdate.classList.add('d-none')
        btnSubmit.classList.remove('d-none')
        localStorage.setItem("objectadd", JSON.stringify(arrayBookmark))

    }
}