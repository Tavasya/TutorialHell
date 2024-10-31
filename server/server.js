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
app.use(express.json());



const generateQuestions = async(transcript, parameters) => {

    //turn transcript array into single string
    const singleTranscript = transcript.map(segment => segment.text).join(' ');

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

    const prompt = `generate me 3 questions based on the parameters given. If true generate a question like that, if false dont generate a question of that paramenter. If all false, make all true. with answers in JSON format based on this transcript: ${singleTranscript} 
                    using these paramenters: 
                    True or False: ${parameters[0]}
                    Multiple Choice: ${parameters[1]}
                    Free Response: ${parameters[2]}`;

    try{
        const result = await model.generateContent(prompt);

        //Questions
        const questionText = result.response.candidates[0].content.parts[0].text;
        console.log("Generated Questions Text: ", questionText)

        //Turn into JSON object
        //const parsedQuestions = JSON.parse(questionText);


        return questionText;
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
app.post('/api/transcript', async (req, res) => {



    //bascially after selecting make questions, the url would be something like 
    //http://localhost:5000/api/transcript?url=VIDEO_ID
    //req.queru.url grabs everythign after the question mark so specifcally the url
    const {url, parameters} = req.body; // YouTube video ID or URL

    //Check for missing url
    if (!url) {
        return res.status(400).json({ error: 'Missing YouTube URL' });
    }

    console.log("Choice Button States: ", parameters);


    
    try {
        // Fetch the transcript from YouTube
        const transcript = await YoutubeTranscript.fetchTranscript(url);
        
        const questions = await generateQuestions(transcript, parameters);

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