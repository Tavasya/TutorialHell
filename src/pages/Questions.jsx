import React, { useContext } from 'react';
import { QuestionsContext } from '../context/QuestionsContext';

function Questions() {
    const { questions } = useContext(QuestionsContext);

    return (
        <div>
            <h1>Questions</h1>
            <ul>
                {questions && questions.length > 0 ? (
                    questions.map((questionItem, index) => (
                        <li key={index} style={{ marginBottom: "20px" }}>
                            <p><strong>Question:</strong> {questionItem.question || "No question text available"}</p>

            

                            {/* Display the answer if available */}
                            <p><strong>Answer:</strong> {questionItem.answer || "No answer available"}</p>
                        </li>
                    ))
                ) : (
                    <p>No questions available</p>
                )}
            </ul>
        </div>
    );
}

export default Questions;
