//사용변수
//typing 결과와 제시된 단어가 같을 경우 점수 올려주기
//점수는 변경이 일어나는 변수이기 때문에 score 변수에 0점을 주어 초기화
const GAME_TIME = 9;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];
const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

init();

function init(){
    buttonChange('게임 로딩중...');
    getWords();
    wordInput.addEventListener('input',checkMatch)
}

//게임 실행
function run(){
    if(isPlaying){
        return;
    }
    isPlaying = true;
    time = GAME_TIME;
    wordInput.focus();
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countDown,1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange('게임중');
}

function checkStatus(){
    if(!isPlaying && time === 0){
        buttonChange("게임시작...")
        clearInterval(checkInterval)
    }
}

//단어 불러오기
    function getWords(){
        // user에게 할당된 id 값과 함께 요청을 합니다.
    axios.get('https://random-word-api.herokuapp.com/all')
    .then(function (response) {
    // 성공했을 때
    response.data.forEach((word) => {
        if(word.length < 10){
            words.push(word);
        }
    });
    buttonChange('게임시작');
    })
    .catch(function (error) {
    // 에러가 났을 때
    console.log(error);
    })
    }

//단어 일치 체크
function checkMatch (){
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
        wordInput.value = "";
        if(!isPlaying){
            return;
        }
        score++;
        scoreDisplay.innerText = score;
        time = GAME_TIME;
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex];
    }
}


//typing하면 출력 , innerText = 공백 없애기 , toLowerCacC = 소문자로 변환해줘서 소문자로 쳐도 true

//삼항연산자 (조건) ? 참일 경우 : 거짓말일 경우
function countDown(){
    time > 0 ? time-- : isPlaying = false;
    if(!isPlaying){
        clearInterval(timeInterval)
    }
    timeDisplay.innerText = time;
}



function buttonChange(text){
    button.innerText = text;
    text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading')
}