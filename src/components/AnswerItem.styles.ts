import styled from 'styled-components';

type ButtonWrapperProps = {
    correct: boolean | null;
};

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
    transition: all 0.3s ease;

    :hover {
        opacity: 0.8;
    }

    button {
        cursor: pointer;
        user-select: none;
        font-size: 0.8rem;
        width: 100%;
        height: 40px;
        margin: 5px 0;
        background: linear-gradient(90deg, #56ccff, #6eafb4);
        background: ${({ correct }) =>
            correct && 'linear-gradient(90deg, #56FFA4, #59BC86) !important'};
        background: ${({ correct }) =>
            correct === false &&
            'linear-gradient(90deg, #FF5656, #C16868) !important'};
        border: 3px solid #ffffff;
        box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        color: #fff;
        text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
    }
`;
