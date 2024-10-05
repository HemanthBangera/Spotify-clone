let currentsong = new Audio();
let play = document.getElementById("play")
let pause = document.getElementById("pause")
let previous = document.getElementById("previous");
let next = document.getElementById("next")
let songs;
let currFolder;
let songUL;

function secondsToMinutesSeconds(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);
    var result = minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
    return result;
}

async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:5500/${folder}/`)
    let response = await a.text()
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
        
    }
    songUl = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songUl.innerHTML="";
    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML + `<li> <img class="music invert" src="img/music.svg" alt="music"><div class="info">${song.replaceAll("%20", " ")}</div><div class="playnow"><img
        src="img/playnow.svg" alt="playnow" class="playnowicon"></div> </li>`
    }
   
    
    
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener('click', element => {
            console.log(e.querySelector(".info").innerHTML)
            playMusic(e.querySelector(".info").innerHTML)
            
        })
    })
    return songs
    
}
const playMusic = (track,pause = false) => {
    currentsong.src = `/${currFolder}/` +track;
    if (!pause) {
        currentsong.play()
        play.src = "img/pause.svg"
        
        
    }
    
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}
async function displayalbums(){
    let b = await fetch(`http://127.0.0.1:5500/songs/`)
    let response = await b.text()
    let div = document.createElement("div")
    let cardContainer = document.querySelector(".cardContainer")
    div.innerHTML = response;
    console.log(div)
    let anchors = div.getElementsByTagName("a")
    let array = Array.from(anchors)
        for (let index = 0; index < array.length; index++) {
            const a = array[index];
            
        
        if(a.href.includes('/songs/')){
            console.log(a.href.split('/').slice(-1)[0])
            let folder = a.href.split('/').slice(-1)[0]
            //get the metadata of the folder
            let c = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`)
            let response = await c.json();
            console.log(response)
            cardContainer.innerHTML = cardContainer.innerHTML+` <div class="card" data-folder="${folder}">
            <div class="play"><svg id="playimage" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path
                        d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                </svg></div>
            <img src="songs/${folder}/cover.jpg" class="cardimage">
            <h3>${response.title}</h3>
            <p style="color:#a2a2a2">${response.description}</p>
            </div>`
        }
        
        
        Array.from(document.getElementsByClassName("card")).forEach(e=>{
            console.log(e)
            e.addEventListener("click",async item=>{
                console.log(item,item.target.dataset)
                songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
                playMusic(songs[0]);
            })
        })
        
    }return songs

}

async function main() {
    await getSongs("songs/Trending")
    playMusic(songs[0], true)
    
    
    
    await displayalbums()
    play.addEventListener('click', () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "img/pause.svg"
        }
        else {
            currentsong.pause();
            play.src = "img/play.svg"
        }
        
    })
    currentsong.addEventListener('timeupdate', () => {
        console.log(currentsong.currentTime, currentsong.duration)
        document.querySelector('.songtime').innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)}/${secondsToMinutesSeconds(currentsong.duration)}`
        document.querySelector('.circle').style.left = ((currentsong.currentTime/currentsong.duration))*100+"%"
    })
    document.querySelector('.seekbar').addEventListener('click',e=>{
        console.log(e.offsetX,e.target.getBoundingClientRect().width)
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector('.circle').style.left =percent+ "%";
        currentsong.currentTime = (currentsong.duration*percent)/100;
    })
    document.querySelector('.hamburger').addEventListener('click',()=>{
        document.querySelector('.left').style.left = 0;
    })
    document.querySelector('.close').addEventListener('click',()=>{
        document.querySelector('.left').style.left = '-130%'
    })
    //add an event listener for previous
    previous.addEventListener('click',()=>{
        console.log("Previous clicked!")
        console.log(currentsong.src.split("/").slice(-1)[0])
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
        if(index>0){
            playMusic(songs[index-1])
        }
        
    })
    //add an event listener for next
    next.addEventListener('click',()=>{
        currentsong.pause();
        console.log("Next clicked!")
        console.log(currentsong.src.split('/').slice(-1)[0])
        let index = songs.indexOf(currentsong.src.split('/').slice(-1)[0])
        if(index+1<songs.length){
            playMusic(songs[index+1])
        }
    })
    document.querySelector(".volume").getElementsByTagName("input")[0].addEventListener('change',(e)=>{
        console.log(e,e.target,e.target.value)
        currentsong.volume = (e.target.value)/100;
        if(currentsong.volume >0){
            document.querySelector(".volimg").src = document.querySelector(".volimg").src.replace("img/mute.svg","img/volume.svg")
        }
    })
    document.querySelector(".volimg").addEventListener('click',e=>{
        if(e.target.src.includes("img/volume.svg")){
            e.target.src = e.target.src.replace("img/volume.svg","img/mute.svg")
            currentsong.volume = 0;
            document.querySelector(".volume").getElementsByTagName("input")[0].value = 0;
        }
        else{
            e.target.src = e.target.src.replace("img/mute.svg","img/volume.svg")
            currentsong.volume = 0.10;
            document.querySelector(".volume").getElementsByTagName("input")[0].value = 0.1;

        }
    })
    
}
main();