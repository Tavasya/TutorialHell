import React from "react";

function QuestionList({questions}) {
    
    return(
        <div>
            <h2>Generated Questions</h2>
            <ul>
                {questions.map((questions, index) => (
                    <li key = {index}>{questions}</li>
                ))}
            </ul>
        </div>
    );
}

export default QuestionList