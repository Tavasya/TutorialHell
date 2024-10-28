import { useState } from "react";
import styles from './YoutubeInput.module.css';



function YoutubeInput() {
    const [ytLink, setytLink] = useState("");
    const [transcript, setTranscript] = useState("null");
    const [questions, setQuestions] = useState([]);
 
    const generateQuestions = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/transcript?url=${ytLink}`);
            const data = await response.json();

            console.log("Data: ", data); // Handle the transcript data here
            //console.log(questions);
        } catch (error) {
            console.error("Error fetching transcript:", error);
        }
    };

    return (
        <div className={styles.container}>
            <input
                className={styles.input}
                placeholder="YouTube link"
                value={ytLink}
                onChange={(e) => setytLink(e.target.value)}
            />
            <button className={styles.button} type="submit" onClick={generateQuestions}>
                Make Questions
            </button>
        </div>
    );
}

export default YoutubeInput;