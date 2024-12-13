import { useEffect, useState } from 'react';
import './App.css';
import { leetProblem } from './types';
import { getTodaysProblems } from './util.ts/generateProblems';
import Problem from './components/Problem';
import { Checkbox } from '@mui/material';

function App() {
    const [isPremium, setIsPremium] = useState(false);
    const [todaysProblems, setTodaysProblems] = useState<leetProblem[]>([]);
    const [completeProblems, setCompleteProblems] = useState<boolean[]>([]);
    // const [complete, setComplete] = useState<Set<number>>(new Set())

    const togglePremium = () => setIsPremium((prev) => !prev);

    const setProblems = () => {
        const newProblems = getTodaysProblems();
        setTodaysProblems(newProblems);
        localStorage.setItem('date', JSON.stringify(new Date().toDateString()));
        localStorage.setItem('problems', JSON.stringify(newProblems));
        localStorage.setItem(
            'complete',
            JSON.stringify(new Array(newProblems.length).fill(false))
        );
        setCompleteProblems(new Array(newProblems.length).fill(false));
    };

    const toggleComplete = (idx: number) => {
        console.log(idx);
        const completion = JSON.parse(
            localStorage.getItem('complete')!
        ) as boolean[];
        completion[idx] = !completion[idx];
        setCompleteProblems(completion);
        localStorage.setItem('complete', JSON.stringify(completion));
    };

    // const getProblemCompletion = (idx: number) => {
    //     return completeProblems[idx];
    // };

    useEffect(() => {
        const doesListNotUpdate =
            new Date().toDateString() ===
            JSON.parse(localStorage.getItem('date')!);

        if (doesListNotUpdate) {
            setTodaysProblems(JSON.parse(localStorage.getItem('problems')!));
            setCompleteProblems(JSON.parse(localStorage.getItem('complete')!));
        } else {
            setProblems();
        }
    }, []);

    useEffect(() => {
        console.log(completeProblems);
    }, [completeProblems]);

    useEffect(() => {
        console.log(todaysProblems);
    }, [todaysProblems]);

    return (
        <>
            <div className="bg">
                <div className="h-[100vh] pt-40">
                    <div className="flex-start flex flex-col items-center gap-4 ">
                        <p className=" mb-5 text-5xl font-semibold">NeetDraw</p>
                        <div className="flex w-[80%] items-center justify-center gap-20">
                            <div className="flex items-center ">
                                <Checkbox
                                    name="isPremium"
                                    id="isPremium"
                                    onChange={togglePremium}
                                    // color="default"
                                    // size="medium"
                                    style={{
                                        backgroundColor: 'transparent',
                                        borderRadius: 0,
                                        paddingRight: '8px',
                                        transform: 'scale(1.25)'

                                        // padding: 0
                                    }}
                                    sx={{
                                        '&.Mui-checked': {
                                            color: '#ffe893'
                                        }
                                    }}
                                />
                                {/* Add tooltip */}
                                <label className=" text-base">Premium </label>
                            </div>
                            <button
                                className="bg-[#2a2a2b] text-sm"
                                onClick={setProblems}
                            >
                                Refresh Problems
                            </button>
                        </div>
                        <div className="flex w-[35%] flex-col gap-2 align-middle font-mono">
                            {/* <table className="w-[100%] border-separate ">
                            <tbody> */}
                            {todaysProblems.map((problem, i) => {
                                return (
                                    ((isPremium && problem.isPremium) ||
                                        !problem.isPremium) && (
                                        <Problem
                                            key={i}
                                            problem={problem}
                                            toggleProblem={isPremium}
                                            solved={completeProblems[i]}
                                            toggleComplete={toggleComplete}
                                            idx={i}
                                        ></Problem>
                                    )
                                );
                            })}
                            {/* </tbody> */}
                            {/* </table> */}
                        </div>
                        <div className=" flex justify-between"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
