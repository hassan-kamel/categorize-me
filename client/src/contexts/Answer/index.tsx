import { Dispatch, ReactNode, useReducer } from 'react';
import { createContext } from 'react';
import { Word } from '../../types';
type Answer = {
  id: number;
  pos: string;
};
type Score = { othersScore: number[]; percentile: number };
type AnswerAction = {
  type: 'ANSWER' | 'SUBMIT' | 'CORRECT' | 'RESET' | 'SCORE';
  payload?: Answer | Answer[] | Score;
};
type State = {
  answers: Answer[];
  score: number;
  correct?: Word[];
  othersScore?: number[];
  percentile?: number;
};
const initialState: State = {
  answers: [
    {
      id: 0,
      pos: 'N/A',
    },
  ],
  score: 0,
};
type AnswerContextType = {
  state: State;
  dispatch: Dispatch<AnswerAction>;
};
const answerReducer = (state: State, action: AnswerAction): State => {
  switch (action.type) {
    case 'CORRECT': {
      return { ...state, correct: [...(action.payload as Word[])] };
    }
    case 'ANSWER': {
      let ID: { id: number; index: number; pos: string } | undefined;
      const pLoad = action.payload as Answer;
      state.answers.forEach((curr, index) => {
        if (action.payload && curr.id === pLoad.id) {
          ID = { id: curr.id, index, pos: pLoad.pos };
        }
      });
      if (ID) state.answers[ID.index] = { id: ID.id, pos: ID.pos };
      else
        action.payload &&
          state.answers.push({
            id: pLoad.id,
            pos: pLoad.pos,
          });

      return {
        ...state,
      };
    }
    case 'SUBMIT': {
      state.answers.sort((a, b) => a.id - b.id);
      state?.correct?.sort((a, b) => a.id - b.id);

      let score = 0;

      for (let i = 0; i < state.answers.length - 1; i++) {
        if (state.answers[i + 1].pos === state?.correct?.[i].pos) score += 10;
      }
      console.log({ score });

      return { ...state, score };
    }
    case 'RESET': {
      return {
        answers: [
          {
            id: 0,
            pos: 'N/A',
          },
        ],
        score: 0,
      };
    }
    case 'SCORE': {
      const actPyld = action.payload as Score;
      return {
        ...state,
        othersScore: actPyld.othersScore,
        percentile: actPyld.percentile,
      };
    }
  }
};
export const AnswersContext = createContext<AnswerContextType>({
  state: initialState,
  dispatch: () => null,
});
export const AnswerProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(answerReducer, initialState);
  const value = { state, dispatch };
  return (
    <AnswersContext.Provider value={value}>{children}</AnswersContext.Provider>
  );
};
