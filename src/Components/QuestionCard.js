import React from 'react';
import Radio from './Inputs/Radio'

export const QuestionCard = () => {
  const [currentAnswer, setCurrentAnswer] = React.useState('');
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
  const [questions, setQuestions] = React.useState(null)
  const [finished, setFinished] = React.useState(false);

  const checkAnswer = () => {
    if (currentAnswer === questions[currentQuestion].resposta) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    checkAnswer();

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinished(true)
    }
  }

  const getQuestions = () => {
    fetch('questions.json')
      .then(response => response.json())
      .then(data => setQuestions(data.questions));
  }

  React.useEffect(() => {
    getQuestions();
  }, [])

  return (
    <>
      {!finished ?
        <form onSubmit={handleSubmit} className="questions-card">
          {questions &&
            <div>
              <p><strong>{questions[currentQuestion].pergunta}</strong></p>
              {questions[currentQuestion].options.map((option) => {
                return (
                  <Radio
                    option={option}
                    checked={option === currentAnswer}
                    key={option}
                    onChange={({ target }) => setCurrentAnswer(target.value)}
                  />
                )
              })}
              <button>Próxima questão</button>
            </div>
          }
        </form>
        : <p>Você teve um total de {correctAnswers} acertos</p>}
    </>
  )
}

export default QuestionCard;
