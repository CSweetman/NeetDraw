import { DIFFICULTY_LEVEL, DifficultyLevel, leetProblem } from '../types';
import leetProblems from '../data/neetCode150Problems.json';

const getProblems = (difficulty: DifficultyLevel): leetProblem[] => {
    let problems = leetProblems.filter(
        (p) => p.difficulty.toLocaleLowerCase() === difficulty
    );

    return problems;
};

const getRandomSet = (problemList: leetProblem[], amt: number) => {
    const newProblems = [];
    for (let i = 0; i < amt; i++) {
        const newProblem = getRandomProblem(problemList);
        const sameProblems = newProblems.filter(
            (p) => p.text === newProblem.text
        );
        if (sameProblems.length > 0) i--;
        else newProblems.push(newProblem);
    }
    return newProblems;
};

export const getTodaysProblems = () => {
    const newProblems: leetProblem[] = [];
    const easyProblems = getProblems(DIFFICULTY_LEVEL.EASY);
    const medProblems = getProblems(DIFFICULTY_LEVEL.MEDIUM);
    const hardProblems = getProblems(DIFFICULTY_LEVEL.HARD);

    const EASY_AMT = getRandomNumber(2, 2);
    const MED_AMT = getRandomNumber(1, 3);
    const HARD_AMT = getRandomNumber(0, 2);
    console.log(EASY_AMT);
    console.log(MED_AMT);
    console.log(HARD_AMT);

    //Random amount between
    // for (let i = 0; i < EASY_AMT; i++) {
    //     const newProblem = getRandomProblem(easyProblems);
    //     const sameProblems = newProblems.filter(
    //         (p) => p.text === newProblem.text
    //     );
    //     if (sameProblems.length > 0) i--;
    //     else newProblems.push(newProblem);
    // }
    newProblems.push(...getRandomSet(easyProblems, EASY_AMT));

    newProblems.push(
        ...getRandomSet(medProblems, MED_AMT > EASY_AMT ? EASY_AMT : MED_AMT)
    );

    if (HARD_AMT === 1) {
        newProblems.push(getRandomProblem(hardProblems));
    }
    console.log(newProblems);
    return newProblems;
};

const getRandomProblem = (problems: leetProblem[]) => {
    return problems[getRandomNumber(0, problems.length - 1)];
};

const getRandomNumber = (floor: number, ceil: number) => {
    return Math.floor(Math.random() * ceil) + floor;
};
