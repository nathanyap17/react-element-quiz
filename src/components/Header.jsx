import { Link } from "react-router-dom";

// Landing page displaying links and heading of the WebDev
export default function Header() {
    return (
        <header>
            <h1>Which Element Are You?</h1>
            <p>(based on completely random things)</p>
            <div className="nav">
                <Link to="/">Home</Link>
                <Link to="/quiz">Quiz</Link>
            </div>
        </header>
    );
}