import React, { useContext } from 'react';
import QuestionList from '../components/QuestionList';
import { QuestionsContext } from '../context/QuestionsContext';

function Questions() {
    const { ytLink } = useContext(QuestionsContext);

    const getEmbedURL = (url) => {
        const videoID = url.includes("v=") ? url.split("v=")[1].split("&")[0] : null;
        return videoID ? `https://www.youtube.com/embed/${videoID}` : url;
    };

    // Determine if the link needs to be converted to embed format
    const embedUrl = ytLink.includes("embed") ? ytLink : getEmbedURL(ytLink);

    return (
        <>
            <iframe 
                width="560" 
                height="315" 
                src={embedUrl}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
            ></iframe>

            <div>
                <QuestionList/>
            </div>
        </>
    );
}

export default Questions;
