let scrollUp = document.querySelector(".up");
let checkbox = document.querySelector("#che");
let checkBox = document.querySelector("#chec");
let nav = document.querySelector("nav");
let icon = document.querySelector(".icon");
let run = document.querySelector(".none");
let Stop = document.querySelector(".stop");
let audio = document.querySelector(".aud audio");
let li = document.querySelectorAll(".active");
let sura = document.querySelector(".surahs");
let inc = document.querySelector(".inc");
let font = document.querySelector(".font");
let dic = document.querySelector(".dic");
let nameOf = document.querySelector(".name");
let sur = document.querySelector(".sura");
let sel = document.querySelector(".sel");
let read = document.querySelector(".read");
let number = document.querySelector(".number");
let go = document.querySelector(".go");
let back = document.querySelector(".back");
let forward = document.querySelector(".forward");
let explain = document.querySelector(".explain");
let NameOfS = document.querySelector(".name");

// dark mode
if(window.localStorage.getItem("mode")){
    document.body.classList.add("dark");
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

// navbar style
let check = false;
checkbox.addEventListener("change",function(e){
    check = e.target.checked;
    if(check){
        nav.style.left = "0px";
        icon.style.left = "300px"
    }
    else{
        nav.style.left = "-300px";
        icon.style.left = "0px"
    }
});

// audio style
let Check = false;
checkBox.addEventListener("change",function(e){
    Check = e.target.checked;
    if(Check){
        run.style.display = "inline-block";
        Stop.style.display = "none";
    }
    else{
        run.style.display = "none";
        Stop.style.display = "inline-block";
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

// change backgroundColor to div of surah
for(let i=0;i<li.length;i++){
    li[i].onclick = function(){
        sura.style.backgroundColor = li[i].getAttribute("color");
        if(li[i].getAttribute("color")!=="black"){
            sura.style.color = "black";
        }
        else{
            sura.style.color = "white";
        }
        window.localStorage.back = li[i].getAttribute("color");
        window.localStorage.color = sura.style.color;
    }
}
if(window.localStorage.getItem("back")|| window.localStorage.getItem("color")){
    sura.style.backgroundColor = window.localStorage.getItem("back");
    sura.style.color = window.localStorage.getItem("color");
}

// increase size of font of div of surah
inc.onclick = function(){
    if(font.innerHTML==="25"){
        inc.style.opacity ="0.7";
    }
    else{
        inc.style.opacity ="1";
        dic.style.opacity ="1";
        if(window.innerWidth <= 560){
            if(font.innerHTML==="20"){
                sur.style.fontSize = "2rem";
                nameOf.style.fontSize = "2rem";
            }
            else{
                sur.style.fontSize = "1.5rem";
                nameOf.style.fontSize = "1.5rem";
            }
        }
        else{
            if(font.innerHTML==="20"){
                sur.style.fontSize = "2.5rem";
                nameOf.style.fontSize = "2.5rem";
            }
            else{
                sur.style.fontSize = "2rem";
                nameOf.style.fontSize = "2rem";
            }
        }
        for(let i=0;i<5;i++){
            font.innerHTML++;
        }
    }
}

// decrease size of font of div of surah
dic.onclick = function(){
    if(font.innerHTML==="15"){
        dic.style.opacity ="0.7";
    }
    else{
        inc.style.opacity ="1";
        dic.style.opacity ="1";
        if(window.innerWidth <= 560){
            if(font.innerHTML==="25"){
                sur.style.fontSize = "1.5rem";
                nameOf.style.fontSize = "1.5rem";
            }
            else{
                sur.style.fontSize = "1rem";
                nameOf.style.fontSize = "1rem";
            }
        }
        else{
            if(font.innerHTML==="25"){
                sur.style.fontSize = "2rem";
                nameOf.style.fontSize = "2rem";
            }
            else{
                sur.style.fontSize = "1.5rem";
                nameOf.style.fontSize = "1.5rem";
            }
        }
        font.innerHTML -=5;
    }
}

// take ayahs of surah and put them in div explain
async function getSurah(){
    let number = window.localStorage.getItem("numOfSurah");
    try{
        let myData = await fetch(`https://quran-api-id.vercel.app/surahs/${number}`);
        let result = await myData.json();
        if(number != "1"){
            let spanP = document.createElement("p");
            spanP.style.textAlign = "center";
            spanP.style.marginBottom = "5px"
            let spanPText = document.createTextNode(`${result.bismillah.arab}`);
            spanP.appendChild(spanPText)
            explain.appendChild(spanP);
        }
        for(let i=0;i<result.ayahs.length;i++){
            let span = document.createElement("span");
            let spanText = document.createTextNode(`${result.ayahs[i].arab}`);
            span.id = `text`;
            span.className = `${result.ayahs[i].number.inSurah}`;
            span.appendChild(spanText);
            let spanAll = document.createElement("span");
            spanAll.className = "spanAll";
            spanAll.id = `${i}`;
            let aya = document.createElement("span");
            aya.className = "ayaNum";
            let ayaText = document.createTextNode(`${result.ayahs[i].number.inSurah}`);
            aya.appendChild(ayaText);
            spanAll.appendChild(aya);
            explain.appendChild(span);
            explain.appendChild(spanAll);
        }
    }catch(rej){
        console.log(rej);
    }
}
getSurah();

// take name of surah and put him in div NameOfS
async function nameOfSurah(){
    let numberOfSur = window.localStorage.getItem("numOfSurah");
    try{
        let sound = await fetch("https://quran-endpoint.vercel.app/quran");
        let result = await sound.json();
        for(let i=0;i<result.data.length;i++){
            if(+numberOfSur === result.data[i].number){
                NameOfS.innerHTML = result.data[i].asma.ar.long;
            }
        }
    }catch(rej){
        console.log(rej);
    }
}
nameOfSurah();

// read of ayahs 
let nameOfRead = "ahmedajamy";
let arrayAyas =[];
let Chec = false;
checkBox.addEventListener("change",function(e){
    Chec = e.target.checked;
    if(Chec){
        let numberOfSur = window.localStorage.getItem("numOfSurah");
        fetch(`https://quran-api-id.vercel.app/surahs/${numberOfSur}/ayahs`).then((res)=>{
            let sound = res.json();
            return sound;
        }).then((full)=>{
            arrayAyas=[];
            for(let i=0;i<full.length;i++){
                arrayAyas.push(full[i].audio);
            }
            let index=0;
            for(let j=0;j<arrayAyas.length-1;j++){
                if(audio.src === arrayAyas[j][nameOfRead]){
                    index = j;
                }
            }
            changeAya(index);
            audio.addEventListener("ended",function(){
                index++;
                if(index < arrayAyas.length){
                    changeAya(index);
                }
                else{
                    e.target.checked = false;
                    index=0;
                    audio.pause();
                }
            })
            function changeAya(num){
                audio.src = arrayAyas[num][nameOfRead];
                let spanId = document.querySelectorAll("#text");
                let SpanAll = document.querySelectorAll(".spanAll");
                for(let i=0;i<spanId.length;i++){
                    if(i===num){
                        spanId[i].style.backgroundColor = "#8b4d169b";
                        SpanAll[i].style.backgroundColor = "#8b4d169b";
                    }
                    else{
                        spanId[i].style.backgroundColor = "inherit";
                        SpanAll[i].style.backgroundColor = "inherit";
                    }
                }
            }
            back.onclick = function(){
                let spanId = document.querySelectorAll("#text");
                let SpanAll = document.querySelectorAll(".spanAll");
                for(let i=0;i<arrayAyas.length;i++){
                    if(audio.src === arrayAyas[i][nameOfRead]){
                        audio.src = arrayAyas[i-1][nameOfRead];
                        spanId[i-1].style.backgroundColor = "#8b4d169b";
                        SpanAll[i-1].style.backgroundColor = "#8b4d169b";
                        spanId[i].style.backgroundColor = "inherit";
                        SpanAll[i].style.backgroundColor = "inherit";
                        index--;
                    }
                }
            }
            forward.onclick = function(){
                let spanId = document.querySelectorAll("#text");
                let SpanAll = document.querySelectorAll(".spanAll");
                for(let i=0;i<arrayAyas.length;i++){
                    if(audio.src === arrayAyas[i][nameOfRead]){
                        audio.src = arrayAyas[i+1][nameOfRead];
                        spanId[i+1].style.backgroundColor = "#8b4d169b";
                        SpanAll[i+1].style.backgroundColor = "#8b4d169b";
                        spanId[i].style.backgroundColor = "inherit";
                        SpanAll[i].style.backgroundColor = "inherit";
                        index++;
                        break;
                    }
                }
            }
        })
    }
    else{
        audio.pause();
    }
})

// choose reader and change name of reader in div read
sel.onchange = function(){
    nameOfRead = sel.value;
    for(let i=0;i<sel.children.length;i++){
        if(sel.children[i].getAttribute("value")===sel.value){
            read.innerHTML = sel.children[i].innerHTML;
        }
    }
}

// go to ayah and listen
go.onclick = function(){
    let numberOfSur = window.localStorage.getItem("numOfSurah");
    fetch(`https://quran-api-id.vercel.app/surahs/${numberOfSur}/ayahs/${number.value}`).then((res)=>{
        let sound = res.json();
        return sound;
    }).then((full)=>{
        audio.src = full.audio[nameOfRead];
        let spanId = document.querySelectorAll("#text");
        let SpanAll = document.querySelectorAll(".spanAll");
        for(let i=0;i<spanId.length;i++){
            if(i===(full.number.inSurah)-1){
                spanId[i].style.backgroundColor = "#8b4d169b";
                SpanAll[i].style.backgroundColor = "#8b4d169b";
            }
            else{
                spanId[i].style.backgroundColor = "inherit";
                SpanAll[i].style.backgroundColor = "inherit";
            }
        }
    })
    number.value = "";
}

// click on ayah to listen
document.addEventListener("click",function(e){
    if(e.target.id === "text"){
        let numberOfSur = window.localStorage.getItem("numOfSurah");
        fetch(`https://quran-api-id.vercel.app/surahs/${numberOfSur}/ayahs/${e.target.className}`).then((res)=>{
            let sound = res.json();
            return sound;
        }).then((full)=>{
            audio.src = full.audio[nameOfRead];
            let spanId = document.querySelectorAll("#text");
            let SpanAll = document.querySelectorAll(".spanAll");
            for(let i=0;i<spanId.length;i++){
                if(i===(full.number.inSurah)-1){
                    spanId[i].style.backgroundColor = "#8b4d169b";
                    SpanAll[i].style.backgroundColor = "#8b4d169b";
                }
                else{
                    spanId[i].style.backgroundColor = "inherit";
                    SpanAll[i].style.backgroundColor = "inherit";
                }
            }
        })
    }
})