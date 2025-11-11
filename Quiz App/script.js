const question= [
    {
        question:"Which is larget animal in the world?",
        answers:[
            
                {text:"Shark",correct:false},
                {text:"Blue Whale",correct:true},

                {text:"Elephant",correct:false},

                {text:"Giraffe",correct:false},

            
        ]
    },
    {
        question:"Which is the smallest country in the world?",
        answers:[
            
                {text:"Vatican City",correct:true},
                {text:"Bhutan",correct:false},

                {text:"Nepal",correct:false},

                {text:"Shri Lanka",correct:false},

            
        ]
    },
    {
        question:"Which is the largest desert in the world?",
        answers:[
            
                {text:"Kalahari",correct:false},
                {text:"Gobi",correct:false},

                {text:"Sahara",correct:false},

                {text:"Antarctica",correct:true},

            
        ]
    },
    {
        question:"Which is the smallest continent in the world?",
        answers:[
            
                {text:"Asia",correct:false},
                {text:"Australia",correct:true},

                {text:"Arctic",correct:false},

                {text:"Africa",correct:false},

            
        ]
    },
    
];

const questionsElement= document.getElementById('question')
const AnswerButton= document.getElementById('answer_btn')
const NextButton= document.getElementById('next_btn')

let questionIndex=0;
let score=0;
function startQuiz(){
    questionIndex=0;
    score=0;
    NextButton.innerHTML="Next";
    showquestion()
}

function showquestion(){
    resetState();
    let currentQuestion=question[questionIndex];
    let questionNo=questionIndex +1;
    questionsElement.innerHTML=questionNo + "."+currentQuestion.question;
    currentQuestion.answers.forEach(Answer =>{
        const button=document.createElement('button');
        button.innerHTML=Answer.text;
        button.classList.add("btn");
        AnswerButton.appendChild(button);
        if(Answer.correct){
            button.dataset.correct=Answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function  resetState(){
    NextButton.style.display="none";
    while(AnswerButton.firstChild){
        AnswerButton.removeChild(AnswerButton.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;

    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(AnswerButton.children).forEach(button => {
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    NextButton.style.display="block";

}

function showScore(){
    resetState();
    questionsElement.innerHTML=`you scored ${score} out of ${question.length}!`;
    NextButton.innerHTML="Play Again";
    NextButton.style.display="block";

}
function handleNextBtn(){
    questionIndex++;
    if(questionIndex<question.length){
        showquestion();
    }else{
        showScore();
    }
}

NextButton.addEventListener("click",()=>{
    if(questionIndex<question.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
});
startQuiz();

