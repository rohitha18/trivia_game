export const styles = {
    paper: {
      padding: "20px",
      marginTop: "20px",
      marginBottom: "20px",
      borderRadius: "20px",
     
    },
    mainTitle: {
        fontSize: "50px",
        marginBottom: "50px",
        textAlign: "center",
    },
    submitButton: {
      marginTop: "40px",
      borderRadius: "999px",
      background: "#9c27b0",
      "&:hover": {
        backgroundColor: "#9c27b0",
        
      },
    },
    question: {
      fontSize: "24px",
      marginBottom: "30px",
      fontWeight: "500",
      lineHeight: "40px",
    },
    answer: {
      fontSize: "18px",
      marginBottom: "10px",
      fontWeight: "500",
      lineHeight: "25px",
      marginLeft: "10px",
      display: "flex",
    },
    correctAnswer: {
      color: "green",
    },
    results: {
      display: "flex",
      margin: "0 auto",
      maxWidth: "200px",
      textAlign: "center",
      flexDirection: "column",
    },
  };
  
  export const difficulties = [
    { id: "total_easy_question_count", name: "Go easy on me pls" },
    { id: "total_medium_question_count", name: "Medium" },
    { id: "total_hard_question_count", name: "😳 Hard 😳" },
  ];
  
  export const createMarkup = (text) => {
    return { __html: text };
  };