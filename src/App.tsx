import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { getQuestions, Question } from './api/questionApi';
import { GlobalStyle, Wrapper } from './App.styles';
import QuestionCard from './components/QuestionCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TOTAL_QUESTIONS = 20;

const App: React.FC = () => {
    const { isLoading, data, isError, error, refetch, isFetching } = useQuery<
        Question[],
        Error
    >('questions', () => getQuestions(TOTAL_QUESTIONS), {
        enabled: false,
        onSuccess: () => {
            setCurrentQuestion(1);
            setUserScore(0);
        },
    });

    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [useScore, setUserScore] = useState(0);

    const nextQuestionHandler = useCallback(() => {
        if (currentQuestion === TOTAL_QUESTIONS) {
            toast(`Congratulation! You got ${useScore} points`);
            refetch();
            return;
        }

        setCurrentQuestion(currentQuestion + 1);
    }, [currentQuestion]);

    return (
        <>
            <ToastContainer />
            <GlobalStyle />
            <Wrapper>
                <h1>QUIZ APP</h1>
                <button
                    className="start"
                    onClick={() => refetch()}
                    disabled={isFetching}
                >
                    Start
                </button>

                {isLoading && <p className="loading">Loading Questions...</p>}
                {isError && <p className="error">{error?.message}</p>}

                {data && (
                    <>
                        <p className="score">Score: {useScore}</p>
                        <p>
                            <strong>
                                Question: <u>{currentQuestion}</u> /{' '}
                                {TOTAL_QUESTIONS}
                            </strong>
                        </p>
                        <QuestionCard
                            setUserScore={setUserScore}
                            currentQuestion={data[currentQuestion - 1]}
                            nextQuestionHandler={nextQuestionHandler}
                        />
                        <button
                            className="next"
                            onClick={nextQuestionHandler}
                            disabled={currentQuestion >= TOTAL_QUESTIONS}
                        >
                            Next Question
                        </button>
                    </>
                )}
            </Wrapper>
        </>
    );
};

export default App;
