import { IScoreData, IWordList, TList } from './wordInterface';
import worldList from './TestData.json';

export const randomNum = async (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
// create object ot type IList that will have pos as properties and inside properties will be array of objects
// that have same pos type like 'verb' poperty will have array of word list with pos = verb
export const PosWordList = async (wordList: IWordList[]): Promise<TList> => {
  const list: TList = {};
  if (Object.keys(list).length == 0) {
    await wordList.forEach((item) => {
      if (list[item.pos]) {
        list[item.pos].push(item);
      } else {
        list[item.pos] = [item];
      }
    });
  }
  return list;
};

// disorder of result , i made it because the amount of data is small so even with random the many words that repeated
// so in this way we make disorder for words to the next round
export const disorder = async (list: IWordList[]): Promise<IWordList[]> => {
  const last: IWordList[] = [];
  while (list.length != 0) {
    const random = Math.floor(Math.random() * list.length);
    const el = list.splice(random, 1)[0];
    last.push(el);
  }
  return last;
};
// calculate the score of questions
export const scores = async ({ scoreValue }: IScoreData): Promise<number> => {
  const scores = worldList.scoresList;
  const sortedScores = scores.slice().sort((a, b) => a - b);
  const lessThanMyScore = sortedScores.filter(
    (score) => score < Number(scoreValue),
  ).length;
  const percentile = lessThanMyScore / sortedScores.length;
  return Number((percentile * 100).toFixed(2));
};
