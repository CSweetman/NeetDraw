import { DIFFICULTY_LEVEL, leetProblem } from '../types';

const Problem = (props: { problem: leetProblem; toggleProblem: boolean }) => {

    const getDiffColor = () => {
        const diff = props.problem.difficulty.toLowerCase();
        if (diff === DIFFICULTY_LEVEL.EASY) {
            return 'bg-green-700';
        } else if (diff === DIFFICULTY_LEVEL.MEDIUM) return 'bg-yellow-500';
        else return 'bg-red-600';
    };

    const openInNewTab = (url: string) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    };

    return (
        <tr
            className={`${getDiffColor()} flex min-h-[60px] items-center border border-slate-600 hover:cursor-pointer`}
            onClick={() => {
                openInNewTab(props.problem.href);
            }}
        >
            <td className=" px-6 py-2">
                <input
                    type="checkbox"
                    name="isSolved"
                    id="isSolved"
                    className=" h-[1.5rem] w-[1.5rem] align-middle hover:cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                />
            </td>
            <td className="w-[30rem] pr-10">
                <p className="text-1xl text-xl">
                    {props.problem.text.length > 80
                        ? `${props.problem.text.substring(0, 120)}...`
                        : props.problem.text}
                </p>
            </td>
        </tr>
    );
};

export default Problem;
