let far = document.querySelector(".fajr")
let sun = document.querySelector(".sun")
let duh = document.querySelector(".duh")
let asr = document.querySelector(".asr")
let mug = document.querySelector(".mug")
let ash = document.querySelector(".ash")
let time = document.querySelector(".time")
let readers = document.querySelector(".readers");
let search = document.querySelector(".search");
let checkbox = document.querySelector("#che");
let checkBox = document.querySelector("#check");
let nav = document.querySelector("nav");
let icon = document.querySelector(".icon");
let run = document.querySelector(".none");
let Stop = document.querySelector(".stop");
let audio = document.querySelector(".aud audio");
let listOfSurahs = document.querySelector(".listOfSurahs");
let aud = document.querySelector(".aud");
let read = document.querySelector(".read");
let scrollUp = document.querySelector(".up");
let back = document.querySelector(".back");
let forward = document.querySelector(".forward");
let mode = document.querySelector("#mode");
let light = document.querySelector(".light");
let moon = document.querySelector(".moon");

// dark mode
let myMode = false;
mode.addEventListener("change",function(e){
    myMode = e.target.checked;
    if(myMode){
        document.body.classList.add("dark");
        window.localStorage.mode = "dark";
        light.style.display = "inline-block";
        moon.style.display = "none";
    }
    else{
        document.body.classList.remove("dark");
        light.style.display = "none";
        moon.style.display = "inline-block";
        window.localStorage.removeItem("mode");
    }
})
if(window.localStorage.getItem("mode")){
    document.body.classList.add("dark");
    light.style.display = "inline-block";
    moon.style.display = "none";
    mode.checked = true;
}
// scroll 
window.onscroll = function(){
    if(this.scrollY>20){
        scrollUp.style.display = "block";
    }
    else{
        scrollUp.style.display = "none";
    }
}
scrollUp.onclick = function(){
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
}

// time style
function myTime(){
    let date = new Date();
    let hour = `${date.getHours()}`;
    let minut = `${date.getMinutes()}`;
    let second = `${date.getSeconds()}`;
    if(minut.length===1){
        minut = `0${minut}`;
    }
    if(second.length===1){
        second = `0${second}`;
    }
    if(hour >=12){
        let n=0;
        for(let i=13;i<=23;i++){
            n++;
            if(+hour === i){
                hour = `${n}`;
            }
        }
        time.innerHTML = `${second} : ${minut} : ${hour} م`;
    }
    else{
        if(+hour===0){
            hour = "12";
        }
        time.innerHTML = `${second} : ${minut} : ${hour} ص`;
    }
}
setInterval(myTime,5);

// pray time style
window.onload = function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSucc,onErro);
    }
    else{
        console.log("Not Found Location");
    }
}
function onSucc(p){
    let {latitude,longitude} = p.coords
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=862c0220519a470584efd4527386c219`).then((res)=>{
        let data = res.json();
        return data;
    }).then((full)=>{
        return full.results[0].components;
    }).then((infor)=>{
        // console.log(infor);
        let city = infor.state.split(" ");
        fetch(`http://api.aladhan.com/v1/timingsByCity?city=${city.join("-")}&country=${infor.country}&method=8`).then((resolve)=>{
            let myTime = resolve.json();
            return myTime;
        }).then((pray)=>{
            // console.log(pray);
            far.innerHTML = pray.data.timings.Fajr;
            sun.innerHTML = pray.data.timings.Sunrise;
            duh.innerHTML = pray.data.timings.Dhuhr;
            asr.innerHTML = pray.data.timings.Asr;
            mug.innerHTML = pray.data.timings.Maghrib;
            ash.innerHTML = pray.data.timings.Isha;
        })
    })
}
function onErro(erro){
    if(erro.code===1){
        alert("عذرًا، لا يمكننا تحديد موقعك و بالتالي لا يمكن تحديد اوقات الصلاة، قم بالسماح الوصول للموقعك و قم بإغلاق الصفحة ثم فتحها مرة أخرى")
    }
}

// list of readers in navbar style
async function getReaders(){
    try{
        let data = await fetch("https://abdoahmed26.github.io/api/arabic.json");
        let read = await data.json();
        for(let i=0;i<read.reciters.length;i++){
            let li = document.createElement("li");
            li.id = read.reciters[i].id;
            li.className = "liChild";
            li.setAttribute("value",read.reciters[i].Server);
            li.setAttribute("Name",read.reciters[i].name);
            let textF = document.createTextNode(read.reciters[i].name);
            let textL = document.createTextNode(`(${read.reciters[i].rewaya})`);
            li.appendChild(textF)
            li.appendChild(textL);
            readers.appendChild(li);
        }
    }catch(rej){
        console.log(rej);
    }
}
getReaders();

// search in navbar style
search.oninput = function(){
    for(let i=0;i<readers.children.length;i++){
        if(readers.children[i].innerHTML.includes(search.value)){
            readers.children[i].style.display = "block";
        }
        else{
            readers.children[i].style.display = "none";
        }
    }
}

// navbar style
let check = false;
checkbox.addEventListener("change",function(e){
    check = e.target.checked;
    if(check){
        nav.style.left = "0px";
        icon.style.left = "100%";
    }
    else{
        nav.style.left = "-300px";
        icon.style.left = "0px !important";
    }
});

// audio style
let Check = false;
checkBox.addEventListener("change",function(e){
    Check = e.target.checked;
    if(Check){
        run.style.display = "inline-block";
        Stop.style.display = "none";
        audio.play();
    }
    else{
        run.style.display = "none";
        Stop.style.display = "inline-block";
        audio.pause();
    }
});
audio.onplay = function(){
    run.style.display = "inline-block";
    Stop.style.display = "none";
}
audio.onpause = function(){
    run.style.display = "none";
    Stop.style.display = "inline-block";
}

// list of surahs
async function surahs(){
    try{
        let mysur = await fetch("https://raw.githubusercontent.com/penggguna/QuranJSON/master/quran.json");
        let result = await mysur.json();
        for(let i=0;i<result.length;i++){
            let divAll = document.createElement("div");
            divAll.className = "all";
            let divP = document.createElement("div");
            divP.className = "surah";
            let spanS = document.createElement("span");
            let nameOfSur = document.createTextNode(`سورة ${result[i].name_translations.ar}`);
            spanS.appendChild(nameOfSur);
            divP.appendChild(spanS);
            if(result[i].place==="Mecca"){
                let spanType = document.createElement("span");
                let typeOfSur = document.createTextNode(`مكة`);
                spanType.appendChild(typeOfSur);
                divP.appendChild(spanType);
            }
            else{
                let spanType = document.createElement("span");
                let typeOfSur = document.createTextNode(`مدينة`);
                spanType.appendChild(typeOfSur);
                divP.appendChild(spanType);
            }
            let ayah = document.createElement("span");
            let numsOfAyah = document.createTextNode(`اياتها ${result[i].number_of_ayah}`);
            let number = document.createElement("span");
            number.className="num";
            let numsOfSurah = document.createTextNode(`${result[i].number_of_surah}`);
            ayah.appendChild(numsOfAyah);
            divP.appendChild(ayah);
            number.appendChild(numsOfSurah);
            divP.appendChild(number);
            divAll.appendChild(divP);
            let divS = document.createElement("div");
            divS.className = "lisArea";
            let aRead = document.createElement("a");
            aRead.className="linkRead";
            aRead.setAttribute("href","project8.html");
            aRead.setAttribute("id",`${result[i].number_of_surah}`);
            let aReadText = document.createTextNode("قراءه");
            aRead.appendChild(aReadText);
            divS.appendChild(aRead);
            let aLis = document.createElement("a");
            aLis.className="linkListen"
            if(`${(i+1)}`.length===1){
                aLis.setAttribute("data",`http://server11.mp3quran.net/shatri/00${i+1}.mp3`);
            }
            else if(`${(i+1)}`.length===2){
                aLis.setAttribute("data",`http://server11.mp3quran.net/shatri/0${i+1}.mp3`);
            }
            else if(`${(i+1)}`.length===3){
                aLis.setAttribute("data",`http://server11.mp3quran.net/shatri/${i+1}.mp3`);
            }
            let aLisText = document.createTextNode("استماع");
            aLis.appendChild(aLisText);
            divS.appendChild(aLis);
            divAll.appendChild(divS);
            listOfSurahs.appendChild(divAll);
        }
    }catch(rej){
        console.log(rej);
    }
}
surahs();

// click on listen key
document.addEventListener("click",function(e){
    if(e.target.className === "linkListen"){
        audio.src = e.target.getAttribute("data");
        audio.play();
        checkBox.checked = true;
    }
});

// choose reader and click on and update on listen key
document.addEventListener("click",function(e){
    if(e.target.className === "liChild"){
        read.innerHTML = e.target.getAttribute("Name");
        let linkListen = document.querySelectorAll(".linkListen");
        audio.src = "";
        for(let i=0;i<linkListen.length;i++){
            if(`${(i+1)}`.length===1){
                linkListen[i].setAttribute("data",`${e.target.getAttribute("value")}/00${i+1}.mp3`);
            }
            else if(`${(i+1)}`.length===2){
                linkListen[i].setAttribute("data",`${e.target.getAttribute("value")}/0${i+1}.mp3`);
            }
            else if(`${(i+1)}`.length===3){
                linkListen[i].setAttribute("data",`${e.target.getAttribute("value")}/${i+1}.mp3`);
            }
        }
    }
});

// click on back key to back to surah which before
back.onclick = function(){
    let linkListen = document.querySelectorAll(".linkListen");
    for(let i=0;i<linkListen.length;i++){
        if(audio.src === linkListen[i].getAttribute("data")){
            audio.src = linkListen[i-1].getAttribute("data");
            audio.play();
        }
    }
}

// click on forward key to forward to surah which after
forward.onclick = function(){
    let linkListen = document.querySelectorAll(".linkListen");
    for(let i=0;i<linkListen.length;i++){
        if(audio.src === linkListen[i].getAttribute("data")){
            audio.src = linkListen[i+1].getAttribute("data");
            audio.play();
            break;
        }
    }
}

// click on read key
document.addEventListener("click",function(e){
    if(e.target.className === "linkRead"){
        window.localStorage.numOfSurah = +e.target.id;
    }
})