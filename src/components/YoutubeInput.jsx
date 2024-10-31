import { useState, createContext, useContext ,useEffect } from "react";
import styles from './YoutubeInput.module.css';
import { useNavigate } from "react-router-dom";
import { QuestionsContext } from "../context/QuestionsContext";





function YoutubeInput() {
    const navigate = useNavigate();
    const { ytLink, setytLink } = useContext(QuestionsContext);
    const [ transcript, setTranscript ] = useState(null);
    const { questions, setQuestions } = useContext(QuestionsContext);
    const [buttonStates, setButtonStates] = useState([false, false, false]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        if(transcript && questions.length){
            navigate("/questions");
        }
    }, [transcript, questions, navigate]);




    const generateQuestions = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:5000/api/transcript`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: ytLink,
                    parameters: buttonStates
                })
            });


            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();

            setTranscript(data.transcript); // Set the transcript data here


            const sanitizedQuestions = data.questions.replace(/```json|```/g, "").trim();
            const questionsArray = JSON.parse(sanitizedQuestions); // Now parse the 

            setQuestions(questionsArray); // Assuming questions are part of the response




            
            


            

            
            


            setLoading(false);
        } catch (error) {
            console.error("Error fetching transcript:", error);
            setError("Failed to fetch transcript. Please check the YouTube link and try again.");
            setLoading(false);
        }
    };



    const handleToggle = (index) => {
        setButtonStates((prevStates) => prevStates.map((state, i) => (i === index ? !state : state)));
    };

    return (
        <div className={styles.container}>
            <input
                className={styles.input}
                placeholder="YouTube link"
                value={ytLink}
                onChange={(e) => setytLink(e.target.value)}
            />
            
            <button className={styles.button} type="button" onClick={generateQuestions} disabled={loading || !ytLink}>
                {loading ? "Loading..." : "Make Questions"}
            </button>
            
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.options}>
                <button
                    type="button"
                    className={`${styles.choice} ${buttonStates[0] ? styles.clicked : ''}`}
                    onClick={() => handleToggle(0)}
                >
                    True or False
                </button>

                <button
                    type="button"
                    className={`${styles.choice} ${buttonStates[1] ? styles.clicked : ''}`}
                    onClick={() => handleToggle(1)}
                >
                    Multiple Choice
                </button>

                <button
                    type="button"
                    className={`${styles.choice} ${buttonStates[2] ? styles.clicked : ''}`}
                    onClick={() => handleToggle(2)}
                >
                    Free Response
                </button>
            </div>

            

            
        </div>
    );
}

export default YoutubeInput;
