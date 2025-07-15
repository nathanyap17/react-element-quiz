# Elemental Quiz - What's Your Personality?

Welcome to **Elemental Quiz**, a captivating React-based personality quiz crafted as the final project for Codédex's Framework Valley: React course. Dive into a journey of self-discovery to uncover your elemental affinity—Fire, Water, Earth, or Air—through a series of thought-provoking questions. Each result is paired with a charming dog image from TheDogAPI, reflecting your element’s essence, wrapped in a sleek, responsive interface powered by Tailwind CSS and custom styling. Built with modern React practices, a robust Node.js backend, and an enhanced element determination algorithm, this project showcases both technical prowess and creative flair.

## 🌟 Features

- **Interactive Personality Quiz**: Answer three engaging questions to discover your elemental persona, with a compulsory name input for a personalized experience.
- **DogsAPI Integration**: Fetches delightful dog images tailored to your element (e.g., Huskies for Fire, Labradors for Water) via a Node.js/Express proxy, ensuring seamless API calls.
- **Enhanced Element Determination**: A sophisticated weighted scoring system prioritizes user preferences, ensuring accurate and meaningful element assignments.
- **Modern React Hooks**: Leverages `useState`, `useEffect`, `useCallback`, `useNavigate`, and `memo` for optimized performance and navigation.
- **Custom Restart Button**: A dedicated `RestartButton` component, memoized for efficiency, allows users to reset the quiz with a single click.
- **Personalized Styling**: Combines Tailwind CSS with custom CSS variables and animations (e.g., fade-in effects) for a polished, responsive UI.
- **Robust Backend**: Uses Express.js and Axios to handle API requests, bypassing CORS issues for reliable image fetching.
- **Local Storage**: Persists user names for a seamless experience across sessions.
- **Fallback Images**: Ensures graceful degradation with local dog images when API calls fail.

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Tailwind CSS, Custom CSS
- **Backend**: Node.js, Express.js, Axios
- **API**: TheDogAPI for dog images
- **Hooks**: `useState`, `useEffect`, `useCallback`, `useNavigate`, `memo`
- **Tools**: Vite, ESLint, Git

## 📸 Screenshots

| Home Page | Quiz Question | Results Page |
|-----------|---------------|--------------|
| ![Home Page](screenshots/home.png) | ![Quiz Question](screenshots/quiz.png) | ![Results Page](screenshots/results.png) |

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or Yarn
- A valid DogsAPI key from [TheDogAPI](https://thedogapi.com)

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/<your-username>/elemental-quiz.git
   cd elemental-quiz
   ```

2. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**:
   ```bash
   cd server
   npm install express axios
   ```

4. **Set Up Environment Variables**:
   Create a `.env` file in the root directory:
   ```
   VITE_DOGS_API_KEY=your-dogs-api-key
   ```
   Create a `.env` file in the `server` directory:
   ```
   DOGS_API_KEY=your-dogs-api-key
   ```

5. **Add Fallback Images**:
   Place dog images (`husky.jpg`, `labrador.jpg`, `bulldog.jpg`, `greyhound.jpg`) in `public/images/`.

6. **Run the Backend**:
   ```bash
   cd server
   node server.js
   ```
   The proxy runs on `http://localhost:3001`.

7. **Run the Frontend**:
   ```bash
   cd ..
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

### Usage
1. Enter your name on the home page (required).
2. Answer three questions about your preferences (color, vacation spot, valued trait).
3. Discover your element and view a dog image reflecting your result.
4. Click the “Restart Quiz” button to start over, resetting all states.

## 🧠 How It Works

- **Compulsory Name Input**: A `ProtectedRoute` ensures users enter a name before accessing the quiz.
- **Weighted Element Determination**: Each question option has weights (e.g., Red 🔴 gives Fire +2, Air +1), tallied to select the highest-scoring element with priority tiebreakers.
- **DogsAPI Integration**: A Node.js/Express proxy fetches dog images (e.g., Huskies for Fire) using Axios, with fallback images for robustness.
- **Performance Optimization**: `useCallback` wraps `fetchArtwork`, `determineElement`, and `handleAnswer` to prevent unnecessary renders; `memo` optimizes `RestartButton`.
- **Responsive Design**: Tailwind CSS and custom styles (`App.css`) ensure a sleek, animated UI across devices.

## 🐶 DogsAPI Integration

The quiz uses TheDogAPI to fetch dog images matching each element:
- **Fire**: Husky (energetic, fiery)
- **Water**: Labrador (water-loving)
- **Earth**: Bulldog (sturdy, grounded)
- **Air**: Greyhound (swift, airy)

A Node.js/Express proxy (`server.js`) handles requests to bypass CORS, using Axios for reliable API calls. Fallback images ensure the UI remains engaging if the API fails.

## 🎨 Personalized Styling

The UI combines Tailwind CSS for rapid development with custom CSS (`App.css`):
- **CSS Variables**: Defines `--primary-color`, `--primary-gradient`, etc., for consistent theming.
- **Animations**: Fade-in effects (`@keyframes fadeIn`) for questions and results.
- **Responsive Layout**: Card-based design (`max-w-md mx-auto`) with fixed header and centered content.

## 🔄 Enhanced Element Determination

The `determineElement` function uses a weighted scoring system:
- Each question option assigns weights to elements (e.g., Red 🔴: Fire +2, Air +1).
- Scores are tallied across answers, with priority tiebreakers (Fire > Water > Earth > Air).
- Ensures accurate, preference-driven results compared to simple vote counting.

## 📈 Future Improvements

- Add more questions for deeper personality insights.
- Integrate additional APIs (e.g., Unsplash) for varied visuals.
- Implement user profiles to save quiz results.
- Enhance animations with Framer Motion.

## 🙌 Acknowledgments

- **Codédex**: For the Framework Valley: React course and inspiration.
- **TheDogAPI**: For providing delightful dog images.
- **Tailwind CSS**: For streamlined, responsive styling.

## 📬 Contact

For feedback or inquiries, reach out to [Your Name] via [your.email@example.com] or [GitHub profile](https://github.com/<your-username>).

---

*Built with 🐶 and ⚛️ for Codédex Framework Valley: React*