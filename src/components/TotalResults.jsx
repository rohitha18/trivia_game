import { Button, Typography } from "@material-ui/core";

import { useEffect } from "react";

const TotalResults = ({
  classes,
  resetQuiz,
  currentQuizStep,
  admittedAnswers,
  
}) => {
  useEffect(() => {
    window.scrollTo(0, "30px");
  }, []);
  return currentQuizStep === "results" ? (
    <div className={classes.results}>
      <Typography variant="h4" className={classes.header}>
        Results: {admittedAnswers.filter(({ isCorrect }) => isCorrect).length} out of{" "}{admittedAnswers.length}
      </Typography>
      <Typography variant="h4" className={classes.Title}>
       
      </Typography>
      <Typography variant="h3" className={classes.Title}>
        
      </Typography>
      
      <Typography variant="h9">
       
      </Typography>
      <Typography variant="h9">
        Do you want to play again? Click Reset below!
      </Typography>
      
      <Button
        onClick={resetQuiz}
        className={classes.submitButton}
        variant='outlined'
        color="white"
      >
        Reset
      </Button>
    </div>
  ) : (
   <checkCode
    />
  );
};

export default TotalResults;
