// 8aee19fa725e4bfa923aed305c9dd869
// VoiceRSS Javascript SDK text to speech api
const buttonText =document.getElementById('buttonText')
const button = document.getElementById('button')
const audioElement = document.getElementById('audio')
const jokeText = document.getElementById('jokeText')
const jokeTextSpan = document.getElementById('jokeTextSpan')

// inputs programing and any 
const any = document.getElementById('any')
const programing = document.getElementById('programing')
const noSensitive = document.getElementById('noSensitive')
const twitter = document.getElementById('twitter')

// the github pages site 
const githubPages = 'https://felipertt.github.io/jokeTeller/'


// removing the tweet icon if the text is the default

if(jokeTextSpan.textContent == 'Click In: Tell Me A Joke. '){
    twitter.style.display = 'none'
}

// the speek api is in voiceAPI.js

// get the jokes from joke api 
async function getJokes(){
    // https://sv443.net/jokeapi/v2/
    let apiUrl = 'https://v2.jokeapi.dev/joke/Programming'
    if(any.checked){
        apiUrl = 'https://v2.jokeapi.dev/joke/Any';
    }
    
    let joke = ''
    try{
        const response = await fetch(apiUrl)
        const data = await response.json()
        // if the joke have two parts
        if(data.joke === undefined){
            joke = `${data.setup} ... ${data.delivery}`
            jokeTextSpan.innerHTML = `${joke} `
            console.log(joke);
            // adding a display again to twitter button when generate a joke
            twitter.style.display = ''
        }
        // if its a normal joke
        else{
            joke = data.joke
            jokeTextSpan.innerHTML = `${joke} `
            console.log(joke);
            // adding a display again to twitter button when generate a joke
            twitter.style.display = ''
        }
    }catch(err){
        // catch errors
        console.log('whoops', err);
    }
    // calling the function that will call the api
    readJokes(joke)
    // disabling the button until audio ends 
    toggleButton()
    // tweeting the joke 


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


/* disabling the tell me a joke until the current joke ends */
audioElement.addEventListener('ended', toggleButton)


// The button gets enabled and disabled every time the function gets called.
function toggleButton(){
    button.disabled = !button.disabled
}




twitter.addEventListener('click', twittar )

function twittar(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${jokeText.textContent} -- Joke from: ${githubPages}`
    window.open(twitterUrl , '_blank')
}