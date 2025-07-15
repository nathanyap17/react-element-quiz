import React, { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Results({ element, artwork, artworkTitle, onReset }) {
    // reference the context for the "name".
    const { name } = useContext(UserContext);
    return (
        <div>
        <p>
            <strong>{name}</strong>, your element is: {element}
        </p>
        <div className="artwork-container">
            {artwork ? (
                <div className="artwork">
                    <img src={artwork} alt={`An artwork representing ${element}`} />
                    <p><strong>Your elemental spirit animal:</strong> {artworkTitle}</p>
                </div>
            ) : (
                <p>Loading artwork...</p>
            )}
        </div>
        {/* Reset button */}
            <div className="reset-btn-ctn">
                <button onClick={onReset}>Restart Quiz</button>
            </div>
        </div>
    );
    }