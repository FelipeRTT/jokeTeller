// 8aee19fa725e4bfa923aed305c9dd869
// VoiceRSS Javascript SDK text to speech api
const buttonText =document.getElementById('buttonText')
const button = document.getElementById('button')
const audioElement = document.getElementById('audio')
const jokeText = document.getElementById('jokeText')
// speech api
const VoiceRSS={speech:function(e){this._validate(e),this._request(e)},_validate:function(e){if(!e)throw"The settings are undefined";if(!e.key)throw"The API key is undefined";if(!e.src)throw"The text is undefined";if(!e.hl)throw"The language is undefined";if(e.c&&"auto"!=e.c.toLowerCase()){var a=!1;switch(e.c.toLowerCase()){case"mp3":a=(new Audio).canPlayType("audio/mpeg").replace("no","");break;case"wav":a=(new Audio).canPlayType("audio/wav").replace("no","");break;case"aac":a=(new Audio).canPlayType("audio/aac").replace("no","");break;case"ogg":a=(new Audio).canPlayType("audio/ogg").replace("no","");break;case"caf":a=(new Audio).canPlayType("audio/x-caf").replace("no","")}if(!a)throw"The browser does not support the audio codec "+e.c}},_request:function(e){var a=this._buildRequest(e),t=this._getXHR();t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){if(0==t.responseText.indexOf("ERROR"))throw t.responseText;audioElement.src=t.responseText,audioElement.play()}},t.open("POST","https://api.voicerss.org/",!0),t.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),t.send(a)},_buildRequest:function(e){var a=e.c&&"auto"!=e.c.toLowerCase()?e.c:this._detectCodec();return"key="+(e.key||"")+"&src="+(e.src||"")+"&hl="+(e.hl||"")+"&r="+(e.r||"")+"&c="+(a||"")+"&f="+(e.f||"")+"&ssml="+(e.ssml||"")+"&b64=true"},_detectCodec:function(){var e=new Audio;return e.canPlayType("audio/mpeg").replace("no","")?"mp3":e.canPlayType("audio/wav").replace("no","")?"wav":e.canPlayType("audio/aac").replace("no","")?"aac":e.canPlayType("audio/ogg").replace("no","")?"ogg":e.canPlayType("audio/x-caf").replace("no","")?"caf":""},_getXHR:function(){try{return new XMLHttpRequest}catch(e){}try{return new ActiveXObject("Msxml3.XMLHTTP")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}throw"The browser does not support HTTP request"}};

// get the jokes from joke api 

async function getJokes(){
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming'
    let joke = ''
    try{
        const response = await fetch(apiUrl)
        const data = await response.json()
        // if the joke have two parts
        if(data.joke === undefined){
            joke = `${data.setup} ... ${data.delivery}`
            jokeText.innerHTML = joke
            console.log(joke);
        }
        // if its a normal joke
        else{
            joke = data.joke
            jokeText.innerHTML = joke
            console.log(joke);
        }
    }catch(err){
        // catch errors
        console.log('whoops', err);
    }
    // calling the function that will call the api
    readJokes(joke)
}
 // read jokes 
function readJokes(joke){
    VoiceRSS.speech({
        key:'8aee19fa725e4bfa923aed305c9dd869',
        src:joke,
        hl:'en-us',
        r:0,
        c:'mp3',
        f:'44khz_16bit_stereo',
        ssml:false,
    })
}




button.addEventListener('click', getJokes)
// making the joke text apear and disappear
let showingText = false
buttonText.addEventListener('click', ()=>{
    if(showingText === false){
        jokeText.classList.remove('hidden')
        buttonText.innerHTML = 'Hide Text'
        showingText = true
        console.log('mostrando');
    }else{
        jokeText.classList.add('hidden')
        buttonText.innerHTML = 'Show Text'
        showingText = false
        console.log('escondendo');
    }
})



