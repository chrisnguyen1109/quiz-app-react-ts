import axiosClient from './axiosClient';

enum QuestionDifficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
}

export interface Question {
    category: string;
    correct_answer: string;
    difficulty: QuestionDifficulty;
    incorrect_answers: string[];
    question: string;
    type: string;
    answers: string[];
}

export type QuestionsResponse = { response_code: number; results: Question[] };

export const getQuestions = async (amount: number): Promise<Question[]> => {
    const url = `/api.php?amount=${amount}`;

    const response: QuestionsResponse = await axiosClient.get(url);

    return response.results.map(el => ({
        ...el,
        answers: el.incorrect_answers
            .concat(el.correct_answer)
            .sort(() => Math.random() - 0.5),
    }));
};
