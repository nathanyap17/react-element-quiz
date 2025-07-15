import './App.css';
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
import UserProvider from "./components/UserContext.jsx";
import Header from "./components/Header.jsx";
import UserForm from "./components/UserForm.jsx";
import Question from "./components/Question.jsx";
import Results from "./components/Results.jsx";

// Feature 1: Protected Routes to redirect to the home page if the userName is not submitted
const ProtectedRoute = ({ userName, children }) => {
  return userName ? children : <Navigate to="/" />;
}

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);
  // New states
  const [artworkTitle, setArtworkTitle] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Static data compiled as key-value pairs
  const questions = [
    {
      question: "What's your favourite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
    {
      question: "Pick an ideal vacation spot:",
      options: ["Volcano 🌋", "Beach 🏖️", "Forest 🌳", "Mountains 🏔️"],
    },
    {
      question: "Choose a trait you value most:",
      options: ["Passion ❤️", "Peace 🕊️", "Stability 🪨", "Freedom 🕊️"],
    }
  ];

  const keywords = useMemo(() => ({
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  }), []);

  const elements = useMemo(() => ({
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",
    "Volcano 🌋": "Fire",
    "Beach 🏖️": "Water",
    "Forest 🌳": "Earth",
    "Mountains 🏔️": "Air",
    "Passion ❤️": "Fire",
    "Peace 🕊️": "Water",
    "Stability 🪨": "Earth",
    "Freedom 🕊️": "Air"
  }), []);
  
  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1); 
  }
  
  const handleUserFormSubmit = (name) => {
    setUserName(name);
    navigate('/quiz');
  }

  // Feature 2.1: Define resetQuiz function 
  const resetQuiz = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setElement("");
    setArtwork(null);
    setArtworkTitle("");
  };

  // Modified determineElement function
  const determineElement = useCallback(
    (answers) => {
      if (answers.length === 0) return 'Fire';
      const counts = { Fire: 0, Water: 0, Earth: 0, Air: 0 };
      answers.forEach((answer) => {
        const element = elements[answer] || 'Fire';
        counts[element]++;
      });

      const priority = { Fire: 4, Water: 3, Earth: 2, Air: 1 };
      let maxCount = 0;
      let selectedElement = 'Fire';

      Object.keys(counts).forEach((element) => {
        if (
          counts[element] > maxCount ||
          (counts[element] === maxCount && priority[element] > priority[selectedElement])
        ) {
          maxCount = counts[element];
          selectedElement = element;
        }
      });
      return selectedElement;
    },
    [elements]
  );

  // Modified fetchArtwork function in accordance with determineElement
  const fetchArtwork = useCallback(
    async (element) => {
      try {
        // This line stays the same - you are still calling your own backend
        const searchUrl = `http://localhost:3001/api/artwork?element=${keywords[element]}`;
        const response = await fetch(searchUrl);

        if (!response.ok) {
          throw new Error('Failed to fetch from backend server');
        }

        // The backend now sends back a simple object: { artworkUrl: '...' }
        const data = await response.json();

        // --- THIS IS THE MODIFIED PART ---
        // Instead of processing a 'photos' array, we just get the URL directly.
        if (data.artworkUrl) {
          setArtwork(data.artworkUrl);
          setArtworkTitle(data.artworkTitle); // Set the artwork's title
        } else {
          console.warn(`No artwork URL found for ${keywords[element]}`);
          setArtwork(null);
          setArtworkTitle("");
        }

      } catch (error) {
        console.error('Error fetching artwork:', error);
        setArtwork(null);
        setArtworkTitle("");
      }
    },
    [keywords] // Dependencies do not need to change
  );
  
  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      const selectedElement = determineElement(answers);
      setElement(selectedElement);
      fetchArtwork(selectedElement);
    }
  }, [currentQuestionIndex, questions.length, answers, keywords, determineElement, fetchArtwork]);

  // Feature 2.2: Reset Quiz state when navigating to home page
  useEffect(() => {
    if (location.pathname === "/") {
      resetQuiz();
    }
  }, [location.pathname]);

  return (
    <div>
      <UserProvider>
      <Header onReset={resetQuiz}/>
      {/* Added <main> wrapper to enclose the routes*/}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} /> }/>
          <Route
            path="/quiz"
            element={
              <ProtectedRoute userName={userName}>
                {currentQuestionIndex < questions.length ? (
                  <div className="question-container" key={currentQuestionIndex}>
                    <Question 
                      question={questions[currentQuestionIndex].question} 
                      options={questions[currentQuestionIndex].options} 
                      onAnswer={handleAnswer} 
                      />
                    </div>
                ) : (
                  <Results 
                    element={element} 
                    artwork={artwork}
                    artworkTitle={artworkTitle}
                    onReset={resetQuiz} 
                    />
                )}
              </ProtectedRoute>
            }>
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      </UserProvider>
    </div>
  );
}