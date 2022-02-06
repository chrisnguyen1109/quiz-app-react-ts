import { useEffect, useRef, useState } from 'react';
import { Question } from '../api/questionApi';
import AnswerItem from './AnswerItem';
import { Wrapper } from './QuestionCard.styles';

interface QuestionCardProps {
    currentQuestion: Question;
    setUserScore: React.Dispatch<React.SetStateAction<number>>;
    nextQuestionHandler: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
    currentQuestion,
    setUserScore,
    nextQuestionHandler,
}) => {
    const { question, correct_answer, answers, category } = currentQuestion;

    const [questionAnswer, setQuestionAnswer] = useState('');
    const [disabledSelect, setDisabledSelect] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setQuestionAnswer('');
        setDisabledSelect(false);

        return () => {
            timerRef.current && clearTimeout(timerRef.current);
        };
    }, [nextQuestionHandler]);

    const checkAnswerHandler = (userAnswer: string) => {
        setDisabledSelect(true);
        if (userAnswer === correct_answer) {
            setUserScore(prevState => prevState + 1);
        } else {
            setQuestionAnswer(correct_answer);
        }

        timerRef.current = setTimeout(() => {
            nextQuestionHandler();
        }, 1500);
    };

    return (
        <Wrapper>
            <p>Category: ({category})</p>
            <p>{question}</p>
            {answers.map(el =>
                questionAnswer === el ? (
                    <AnswerItem
                        key={el}
                        answer={el}
                        correct_answer={correct_answer}
                        checkAnswerHandler={checkAnswerHandler}
                        disabledSelect={disabledSelect}
                        question_answer
                    />
                ) : (
                    <AnswerItem
                        key={el}
                        answer={el}
                        correct_answer={correct_answer}
                        checkAnswerHandler={checkAnswerHandler}
                        disabledSelect={disabledSelect}
                    />
                )
            )}
        </Wrapper>
    );
};

export default QuestionCard;
