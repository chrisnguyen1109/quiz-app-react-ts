import { useEffect, useState } from 'react';
import { ButtonWrapper } from './AnswerItem.styles';

interface AnswerItemProps {
    answer: string;
    correct_answer: string;
    checkAnswerHandler: (userAnswer: string) => void;
    question_answer?: boolean;
    disabledSelect: boolean;
}

const AnswerItem: React.FC<AnswerItemProps> = ({
    answer,
    correct_answer,
    question_answer,
    checkAnswerHandler,
    disabledSelect,
}) => {
    const [correctAnswer, setCorrectAnswer] = useState<boolean | null>(null);

    useEffect(() => {
        if (correctAnswer !== null) checkAnswerHandler(answer);
    }, [correctAnswer]);

    useEffect(() => {
        !disabledSelect && setCorrectAnswer(null);
    }, [disabledSelect]);

    const answerHandler = () => {
        if (disabledSelect) return;

        setCorrectAnswer(answer === correct_answer);
    };

    return (
        <ButtonWrapper
            key={answer}
            correct={question_answer ? question_answer : correctAnswer}
        >
            <button onClick={answerHandler}>{answer}</button>
        </ButtonWrapper>
    );
};

export default AnswerItem;
