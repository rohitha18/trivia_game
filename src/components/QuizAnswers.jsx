import {
    Grid,
    Paper,
    Select,
    Button,
    MenuItem,
    Typography,
    InputLabel,
    FormControl,
  } from "@material-ui/core";
  import { useState, useEffect } from "react";
  import { createMarkup } from "../style";
  import TotalResults from "./TotalResults";
  
  const QuizAnswers = ({
    classes,
    quizData,
    resetQuiz,
    currentQuizStep,
    setCurrentQuizStep,
  }) => {
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [admittedAnswers, setProcessedAnswers] = useState([]);
  
    const handleResult = (e) => {
      e.preventDefault();
  
      const admittedAnswers = selectedAnswers.map(({ answer, question }) => {
        const relatedQuestion = quizData.find(
          (category) => category.question === question
        );
        if (relatedQuestion.correct_answer === answer) {
          return { correctAnswer: answer, isCorrect: true, question };
        }
        return {
          correctAnswer: relatedQuestion.correct_answer,
          wrongAnswer: answer,
          isCorrect: false,
          question,
        };
      });
  
      setProcessedAnswers(admittedAnswers);
    };
  
    const handleAnswerChange = (e, selectedQuestion) => {
      e.preventDefault();
      const { value } = e.target;
  
      const isExistQuestion =
        selectedAnswers.length &&
        selectedAnswers.find((answer) => answer.question === selectedQuestion);
  
      if (isExistQuestion && isExistQuestion.answer) {
        const updatedAnswers = selectedAnswers.map((answer) => {
          if (answer.question === selectedQuestion) {
            return { question: selectedQuestion, answer: value };
          }
          return answer;
        });
        setSelectedAnswers(updatedAnswers);
      } else {
        setSelectedAnswers([
          ...selectedAnswers,
          { question: selectedQuestion, answer: value },
        ]);
      }
    };
  
    const relatedAnswer = (question, selectedAnswers) => {
      if (selectedAnswers && selectedAnswers.length) {
        const relatedQuestion = selectedAnswers.find(
          (answer) => answer.question === question
        );
        return (relatedQuestion && relatedQuestion.answer) || "";
      }
      return "";
    };
  
    useEffect(() => {
      window.scrollTo(0, "20px");
    }, []);
  
    return !admittedAnswers || !admittedAnswers.length ? (
      <>
    
        <form onSubmit={handleResult}>
          
            <Grid item xs={12}>
              {quizData.map((quiz) => (
                <Paper key={quiz.question} className={classes.paper}>
                 
                    <span dangerouslySetInnerHTML={createMarkup(quiz.question)} />
             
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="answer-select-label">
                      Choose Answer:
                    </InputLabel>
                    <Select
                      required
                      name="answer"
                      id="answer-select"
                      label="Select answer"
                      value={relatedAnswer(quiz.question, selectedAnswers) || ""}
                      labelId="answer-select-label"
                      onChange={(e) => handleAnswerChange(e, quiz.question)}
                    >
                      {quiz.answers.map((answer) => (
                        <MenuItem key={answer} value={answer}>
                          <span dangerouslySetInnerHTML={createMarkup(answer)} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Paper>
              ))}
              <Button
                className={classes.submitButton}
                variant="contained"
                type="submit"
              >
                Result
              </Button>
            </Grid>
        
        </form>
      </>
    ) : (
      <TotalResults
        classes={classes}
        resetQuiz={resetQuiz}
        currentQuizStep={currentQuizStep}
        admittedAnswers={admittedAnswers}
        setCurrentQuizStep={setCurrentQuizStep}
      />
    );
  };
  
  export default QuizAnswers;