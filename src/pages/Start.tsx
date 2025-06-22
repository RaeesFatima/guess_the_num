import React, { useState, useEffect } from 'react';

const Start: React.FC = () => {
    const [input, setInput] = useState("");
    const [randomNum, setRandomNum] = useState(0);
    const [retries, setRetries] = useState(0);
    const [message, setMessage] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [guesses, setGuesses] = useState<{ value: number; correct: boolean }[]>([]);

    useEffect(() => {
        generateRandomNumber();
        // console.log("Actual num: ",randomNum)
    }, []);

    const generateRandomNumber = () => {
        setRandomNum(Math.floor(Math.random() * 100) + 1);
        setRetries(0);
        setInput("");
        setMessage("");
        setGameOver(false);
        setGuesses([]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (gameOver) return;

        const guess = parseInt(input);
        setInput("");

        if (isNaN(guess)) {
            setMessage("Please enter a valid number.");
            return;
        }

        if (guess < 1 || guess > 100) {
            setMessage("Enter a number between 1 and 100.");
            return;
        }

        const isCorrect = guess === randomNum;
        const updatedGuesses = [...guesses, { value: guess, correct: isCorrect }];
        setGuesses(updatedGuesses);

        if (isCorrect) {
            setMessage(`🎉 Correct! The number was ${randomNum}.`);
            setGameOver(true);
        } else {
            const newRetries = retries + 1;
            setRetries(newRetries);
            if (newRetries >= 5) {
                setMessage(`❌ You lost! The number was ${randomNum}.`);
                setGameOver(true);
            } else {
                setMessage(`❌ Incorrect. You have ${5 - newRetries} tries left.`);
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-200 via-yellow-300 to-orange-400 p-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full space-y-6">
                <h1 className="text-2xl font-bold text-center text-orange-700">
                    🎯 Guess the Number (1–100)
                </h1>
                {!gameOver && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Enter your guess..."
                        />
                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition duration-200"
                        >
                            Submit Guess
                        </button>
                    </form>
                )}
                {gameOver && (
                    <button
                        onClick={generateRandomNumber}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200"
                    >
                        🔄 Play Again
                    </button>
                )}
                <p className={`text-center text-lg ${message.includes('Correct') ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </p>
            </div>

            {/* Guess Cards */}
            {guesses.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4 max-w-2xl mt-4">
                    {guesses.map((g, index) => (
                        <div
                            key={index}
                            className={`px-6 py-3 text-xl font-bold rounded-2xl shadow-md transition duration-300
                                ${g.correct
                                    ? 'bg-green-100 text-green-700 border border-green-300'
                                    : 'bg-red-100 text-red-700 border border-red-300 line-through rotate-[2deg]'
                                }
                            `}
                        >
                            {g.value}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Start;
