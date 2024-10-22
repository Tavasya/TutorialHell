import { useState } from "react";
import styles from './YoutubeInput.module.css';

function YoutubeInput() {
    const [ytLink, setytLink] = useState("");

    const generateQuestions = async () => {
        try {
            // Replace 'localhost:5000' with your backend server's address
            const response = await fetch(`http://localhost:5000/api/transcript?url=${ytLink}`);
            const transcript = await response.json();
            console.log(transcript); // Handle the transcript data here
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
