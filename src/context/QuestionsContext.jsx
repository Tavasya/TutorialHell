import React from 'react'
import { createContext, useState } from 'react'

export const QuestionsContext = createContext();

export const QuestionsProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [ytLink, setytLink ] = useState("");

    return(
        <QuestionsContext.Provider value={{ questions, setQuestions, ytLink, setytLink}}>
            {children}
        </QuestionsContext.Provider>
    );
};

