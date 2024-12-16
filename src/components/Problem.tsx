import { DIFFICULTY_LEVEL, leetProblem } from '../types';
import Checkbox from '@mui/material/Checkbox';
import './problem.css';

const Problem = (props: {
    problem: leetProblem;
    toggleProblem: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toggleComplete: any;
    solved: boolean;
    idx: number;
}) => {
    const getDiffColor = () => {
        const diff = props.problem.difficulty.toLowerCase();
        if (diff === DIFFICULTY_LEVEL.EASY) {
            return 'bg-[#3a5f36]';
        } else if (diff === DIFFICULTY_LEVEL.MEDIUM) return 'bg-[#a67003]';
        else return 'bg-[#9e403d]';
    };

    const openInNewTab = (url: string) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    };

    return (
        // <tr
        //     className={`min-w-[100%]`}
        //     onClick={() => {
        //         openInNewTab(props.problem.href);
        //     }}>
        // {/* <td className={` px-6 py-2 ${getDiffColor()} `}> */}

        <div
            className={`flex min-h-[50px] w-[100%] items-center  gap-4 rounded-md pl-4  hover:cursor-pointer ${getDiffColor()} `}
            onClick={() => openInNewTab(props.problem.href)}
        >
            <Checkbox
                // type="checkbox"
                name="isSolved"
                id="isSolved"
                className="max-w-[20px] align-middle hover:cursor-pointer"
                onClick={(e) => {
                    props.toggleComplete(props.idx);
                    e.stopPropagation();
                }}
                checked={props.solved}
                color="default"
                style={
                    {
                        // transform: 'scale(1.5)'
                        // padding: 0
                    }
                }
                size="large"
            />
            <p className=" grow-1 text-lg ">
                {props.problem.text.length > 80
                    ? `${props.problem.text.substring(0, 80)}...`
                    : props.problem.text}
            </p>
        </div>
        // </td>
        // <td className={`pr-10 ${getDiffColor()}  w-[100%] `}>
        // {/* </td> */}
        // </tr>
    );
};

export default Problem;
