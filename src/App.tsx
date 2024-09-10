import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { DIFFICULTY_LEVEL, DifficultyLevel, leetProblem } from './types';
import { getTodaysProblems } from './util.ts/generateProblems';
import Problem from './components/Problem';

function App() {
    const [isPremium, setIsPremium] = useState(false);
    const [todaysProblems, setTodaysProblems] = useState<leetProblem[]>([]);

    const togglePremium = () => setIsPremium((prev) => !prev);

    const setProblems = () => {
        const newProblems = getTodaysProblems();
        setTodaysProblems(newProblems);
        localStorage.setItem('date', JSON.stringify(new Date().toDateString()));
        localStorage.setItem('problems', JSON.stringify(newProblems));
    };

    useEffect(() => {
        const doesListNotUpdate =
            new Date().toDateString() ===
            JSON.parse(localStorage.getItem('date')!);

        if (doesListNotUpdate) {
            setTodaysProblems(JSON.parse(localStorage.getItem('problems')!));
        } else {
            setProblems();
        }
    }, []);

    return (
        <>
            <div className="mt-20 h-[100%]">
                <div className="flex flex-col items-center justify-center ">
                    <p className=" text-sm hover:bg-red-200">
                        {isPremium ? 'True' : 'False'}
                    </p>
                    <div className="flex w-[80%] items-center justify-center gap-5">
                        <div>
                            <label className=" text-base">Is Premium </label>
                            <input
                                type="checkbox"
                                name="isPremium"
                                id="isPremium"
                                onChange={togglePremium}
                            />
                        </div>
                        <button className="text-sm" onClick={setProblems}>
                            Refresh Problems
                        </button>
                    </div>
                    <div className=" w-[40%] align-middle font-mono">
                        <table className="w-[100%]">
                            <tbody>
                                {todaysProblems.map((problem, i) => {
                                    return (
                                        ((isPremium && problem.isPremium) ||
                                            !problem.isPremium) && (
                                            <Problem
                                                key={i}
                                                problem={problem}
                                                toggleProblem={isPremium}
                                            ></Problem>
                                        )
                                    );
                                })}
                            </tbody>

                        </table>
                    </div>
                    <div className=" flex justify-between"></div>
                </div>
            </div>
        </>
    );
}

export default App;
