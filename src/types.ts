export const DIFFICULTY_LEVEL = {
    EASY: "easy",
    MEDIUM: "medium",
    HARD: "hard"
} as const

type ObjectValues<T> = T[keyof T]

export type DifficultyLevel = ObjectValues<typeof DIFFICULTY_LEVEL>

export type leetProblem = {
    category: string,
    href: string,
    text: string,
    difficulty: string,
    isPremium: boolean
}

