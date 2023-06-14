import express, { Express, Response, Request } from 'express';
import bodyParser from 'body-parser';
import worldList from './TestData.json';
import { IWordList } from './wordInterface';
// import 'express-serve-static-core';
import { PosWordList, disorder, randomNum, scores } from './words.helpers';
import cors from 'cors';

const app: Express = express();
const port: number = 3333;
const result: IWordList[] = [];
const numberOfQuestions: number = 10;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());

app.get('/words', async (req: Request, res: Response) => {
  // transform wordslist data in image to get value without duplication and deficiency in pos type
  const list = await PosWordList(worldList.wordList);
  while (result.length < numberOfQuestions) {
    // get random pos value ['verb','adver','noun','adjective']
    const num = await randomNum(0, Object.keys(list).length - 1);
    // get one random value of words of selected pos
    const num2 = await randomNum(0, Object.values(list)[num].length - 1);
    // get word
    const item = Object.values(list)[num][num2];
    // check if the item is exist of not if not exist add it if exist don't add it
    const exist = result.find((word) => word.id == item.id);
    if (!exist) result.push(item);
  }
  res.status(200).send(await disorder(result));
});

app.post('/rank', async (req: Request, res: Response) => {
  console.log('req.body: ', req.body);
  const score = await scores(req.body);
  console.log('score: ', score);
  res.status(201).send({ myScore: score, scores: worldList.scoresList });
});

app.listen(port, () => {
  console.log(`server is working on port ${port}`);
});
