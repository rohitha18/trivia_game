import {
  Grid,
  Paper,
  Select,
  Button,
  MenuItem,
  TextField,
  Container,
  Typography,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { styles, difficulties, createMarkup } from "../style";
import QuizAnswers from "./QuizAnswers";
import { borders } from '@material-ui/system';
import React from 'react';
import { render } from 'react-dom';

class newLevels extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { random: 0};
  }

  handleClick() {
    const min = 1;
    const max = 200;
    const randomize = min + Math.random() / (max - min);
    this.setState({ random: this.state.random + randomize });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick.bind(this)}>Click</button>
        <div>The number is: {this.state.random}</div>
      </div>
    );
  }
}
const useStyles = makeStyles((theme) => {
  return styles;
});

const QuizCategories = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ id: "", name: "" });

  const [quizNumber, setQuizNumber] = useState(null);
  const [difficulty, setDifficulty] = useState({ id: "", name: "" });
  

  const [quizData, setQuizData] = useState([]);
  const classes = useStyles();

  const [currentQuizStep, setCurrentQuizStep] = useState("start");

  const fetchQuizData = async () => {
    try {
      const url = `https://opentdb.com/api.php?amount=${quizNumber}&category=${
        category.id
      }&difficulty=${difficulty.name.toLowerCase()}`;
      const { data } = await axios.get(url);

      const formattedCategory = data.results.map((cat) => {

        const incorrectAnswersIndexes = cat.incorrect_answers.length;
        const randomIndex = Math.round(
          Math.random() * (incorrectAnswersIndexes - 0) + 0
        );

        cat.incorrect_answers.splice(randomIndex, 0, cat.correct_answer);
        
        return {
          ...cat,
          answers: cat.incorrect_answers,
        };
      });

      setQuizData(formattedCategory);
      setCurrentQuizStep("results");
    } catch (error) {
      console.log("Fetch quiz error =====>>>>", error);
    }
  };

  const fetchCategories = async () => {
    const { data } = await axios.get(`https://opentdb.com/api_category.php`);
    setCategories(data.trivia_categories);
  };

  useEffect(() => {
    fetchCategories();
    window.scrollTo(0, "20px");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quizData.length && quizNumber && category.id && difficulty) {
      fetchQuizData();
    }
  };

  const handleSelectChange = (e) => {
    e.preventDefault();
    const selectedCategory = categories.find(
      (cat) => cat.id === e.target.value
    );
    setCategory(selectedCategory);
  };
  

  const handleDifficultyChange = (e) => {
    e.preventDefault();
    const selectedDifficulty = difficulties.find(
      (diff) => diff.id === e.target.value
    );
    setDifficulty(selectedDifficulty);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setQuizNumber(e.target.value);
  };

  const resetQuiz = (e) => {
    e.preventDefault();
    setQuizData([]);
    setCategory("");
    setQuizNumber("");
    setDifficulty("");
    setCurrentQuizStep("start");
    window.scrollTo(0, "20px");
  };

  if (!categories.length) {
    return null;
  }

  return (
    
    <Grid>
     
        {currentQuizStep === "start" ? (
          <>
          
            <Typography variant="h1" className={classes.mainTitle}>
              <b>TRIVIA GAME 😈</b>
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                <Grid item xs={12}></Grid>
                <Typography variant="h5" className={classes.title}>
        <b>Category:</b>
      </Typography>
      
                  <FormControl fullWidth variant="outlined">
                  <Grid item xs={12}></Grid>
                 
                    <InputLabel id="category-select-label">
                    <b>Click here!</b>
                    </InputLabel>
                    <Select
                      required
                    
                      value={category.id || ""}
                      id="category-select"
                      label="Select category"
                    
                      onChange={handleSelectChange}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          <span
                            dangerouslySetInnerHTML={createMarkup(
                              category.name
                            )}
                          />
                        </MenuItem>
                        
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}>
                <Typography variant="h5" className={classes.title}>
        <b>Difficulty:</b>
      </Typography>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="difficulty-select-label">
                      <b>Click here!</b>
                    </InputLabel>
                    <Select
                      required
                      name="difficulty"
                      
                      id="difficulty-select"
                      label="Select Difficulty"
                    
                     
                    >
                      {difficulties.map((difficulty) => (
                        <MenuItem key={difficulty.id} value={difficulty.id}>
                          {difficulty.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                
                
                </Grid>
                <Grid item xs={12}></Grid>
               
                <Grid item xs={12}>
                <Typography variant="h5" className={classes.title}>
        <b>How many questions would you like? (1-10)*</b>
      </Typography>
                  <TextField
                    inputProps={{ min: 1, max: 10 }}
                    required
                    fullWidth
                    type="number"
                    id="quiz-number"
                    variant="outlined"
                    name="quiz-number"
                    
                    value={quizNumber || ""}
                   
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h5" className={classes.title}>
       
      </Typography>
                  <TextField
                    inputProps={{ min: 5, max: 12 }}
                   
                    
                    type="number"
                    id="quiz-number"
                   
                    name="quiz-number"
                    
                    value={quizNumber && ""}
                   
                    onChange={handleSubmit}
                  />
                </Grid>
              
              <Button
                className={classes.submitButton}
                type="submit"
                variant="contained"
               
              >
                Let's Start!
              </Button>
            </form>
          </>
        ) : (
          <QuizAnswers
            classes={classes}
            quizData={quizData}
            resetQuiz={resetQuiz}
            categories={categories}
            currentQuizStep={currentQuizStep}
            setCurrentQuizStep={setCurrentQuizStep}
          />
        )}
  
   
    </Grid>
  );
};

export default QuizCategories;
