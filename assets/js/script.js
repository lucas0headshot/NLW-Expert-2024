function setupQuiz(quizData) {
    if (quizData && typeof quizData === "object") { //Ensure that the data recieved valid and a object
        //Get elements
        const quizElement = document.querySelector('#quiz');
        const templateElement = document.querySelector('template');

        const quiz = quizData;

        document.querySelector('h1').textContent = quiz.name; //Set the quiz name

        if (quiz.questions.length > 0) { //Ensure that quiz have questions
            const hits = new Set(); 
            const questionsQuantity = quiz.questions.length;
            const resultElement = document.querySelector('#result span');
            function updateResult() {
                resultElement.textContent = `${hits.size} de ${questionsQuantity}`; //Set the result content
            }

            updateResult();


            for (const question of quiz.questions) { 
                const quizQuestionElement = templateElement.content.cloneNode(true); //Clone the question from template

                quizQuestionElement.querySelector('h3').textContent = question.title; //Set the question title

                if (question.answers.length > 0) { //Ensure that question have answer
                    for (let answer of question.answers) {
                        const answerElement = quizQuestionElement.querySelector('dl dt').cloneNode(true); //Clone the answer from question

                        answerElement.querySelector('span').textContent = answer.title; //Set the answer tile
                        answerElement.querySelector('input').setAttribute('name', `question-${quiz.questions.indexOf(question)}`); //Set the name of input radio to question index                        
                        answerElement.querySelector('input').value = question.answers.indexOf(answer); //Set the value of input radio to answer index 
                        answerElement.querySelector('input').addEventListener('change', (event) => {
                            const correctAnswer = event.target.value == question.correctAnswer;

                            hits.delete(question); //Check that question is already in hits
                            if (correctAnswer) {
                                hits.add(question); //Increments the result
                            }

                            updateResult();
                        });

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