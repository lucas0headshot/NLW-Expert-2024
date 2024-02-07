function setupQuiz(quizData) {
    if (quizData && typeof quizData === "object") { //Ensure that the data recieved valid and a object
        //Get elements
        const quizElement = document.querySelector('main');
        const templateElement = document.querySelector('template');

        const quiz = quizData;

        document.querySelector('h1').textContent = quiz.name; //Set the quiz name

        if (quiz.questions.length > 0) { //Ensure that quiz have questions
            for (const question of quiz.questions) { 
                const quizQuestionElement = templateElement.content.cloneNode(true); //Clone the question from template

                quizQuestionElement.querySelector('h3').textContent = question.title; //Set the question title

                if (question.answers.length > 0) { //Ensure that question have answer
                    for (let answer of question.answers) {
                        const answerElement = quizQuestionElement.querySelector('dl dt').cloneNode(true); //Clone the answer from question

                        answerElement.querySelector('span').textContent = answer.title; //Set the answer tile

                        quizQuestionElement.querySelector('dl').appendChild(answerElement); //Append answer into question
                    }
 
                    quizQuestionElement.querySelector('dl dt').remove();
                }

                quizElement.appendChild(quizQuestionElement); //Append question into quiz
            }
        }
    }
};



fetch('data/quiz.json')
    .then(response => response.json())
    .then(data => setupQuiz(data))
    .catch(error => console.error('Error fetching JSON', error));