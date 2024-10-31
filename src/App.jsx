import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Questions from './pages/Questions';
import { QuestionsProvider } from './context/QuestionsContext';

function App() {

  return (
    <>
      <QuestionsProvider>
        <Router>
          
            <Routes>

              <Route path ="/" element={<Home/>}/>
              <Route path ="/questions" element={<Questions/>}/>


            </Routes>
          
        </Router>
        
      </QuestionsProvider>
    
    </>
  )
}

export default App  
