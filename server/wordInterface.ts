export interface IWordList {
  id: number;
  word: string;
  pos: string;
}
export interface IScoreData {
  scoreValue: number | string;
}
export type TList = {
  [key: string]: Array<IWordList>;
};
