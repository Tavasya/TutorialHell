const express = require('express');                             //handles http
const cors = require('cors');                                   //to request youtube        
const { YoutubeTranscript } = require('youtube-transcript');
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");






//Configuration and set port
const app = express();                                          
const PORT = 5000;

// Enable CORS (for development only)
//This is used when frontend and backend are runnign on different ports
app.use(cors());



const generateQuestions = async(transcript) => {

    const singleTranscript = transcript.map(segment => segment.text).join(' ');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});
    console.log("Model Initzlized:", model)

    const prompt = `generate me 3 questions based on this transcript: ${singleTranscript}`;

    try{
        const result = await model.generateContent(prompt);
        const questionText = result.response.candidates[0].content.parts[0].text;
        console.log("Question Text: ", questionText);
        return result;
    }
    catch(error){
        console.error("Error generative questions: ", error);
        throw error;
    }

}


//Creates a GET route at api/trasncript(could be named anything)
//Async means that it will run the some code event when the ytURL hasnt processed yet
//2 paraementer which are objects, request and response
//request contains data of incoming request like, query paramenters, headers, etc
//response is what we send to the frontend(the transcrpt) after processsing the request
//THINK OF THE BACKEND AS OUR OWN API
//so we are making a request to our backend with the youtube url
app.get('/api/transcript', async (req, res) => {


    //bascially after selecting make questions, the url would be something like 
    //http://localhost:5000/api/transcript?url=VIDEO_ID
    //req.queru.url grabs everythign after the question mark so specifcally the url
    const ytUrl = req.query.url; // YouTube video ID or URL

    //Check for missing url
    if (!ytUrl) {
        return res.status(400).json({ error: 'Missing YouTube URL' });
    }


    
    try {
        // Fetch the transcript from YouTube
        const transcript = await YoutubeTranscript.fetchTranscript(ytUrl);
        
        const questions = await generateQuestions(transcript);
        console.log("Questions: ", questions);
        // Send the transcript back to the frontend
        res.json({transcript, questions});
    } catch (error) {
        console.error('Error fetching transcript:', error);
        res.status(500).json({ error: 'Error fetching transcript' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});