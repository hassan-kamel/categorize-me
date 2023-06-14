"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const TestData_json_1 = __importDefault(require("./TestData.json"));
// import 'express-serve-static-core';
const words_helpers_1 = require("./words.helpers");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3333;
const result = [];
const numberOfQuestions = 10;
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// Cors for cross origin allowance
app.use((0, cors_1.default)());
app.get('/words', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // transform wordslist data in image to get value without duplication and deficiency in pos type
    const list = yield (0, words_helpers_1.PosWordList)(TestData_json_1.default.wordList);
    while (result.length < numberOfQuestions) {
        // get random pos value ['verb','adver','noun','adjective']
        const num = yield (0, words_helpers_1.randomNum)(0, Object.keys(list).length - 1);
        // get one random value of words of selected pos
        const num2 = yield (0, words_helpers_1.randomNum)(0, Object.values(list)[num].length - 1);
        // get word
        const item = Object.values(list)[num][num2];
        // check if the item is exist of not if not exist add it if exist don't add it
        const exist = result.find((word) => word.id == item.id);
        if (!exist)
            result.push(item);
    }
    res.status(200).send(yield (0, words_helpers_1.disorder)(result));
}));
app.post('/rank', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('req.body: ', req.body);
    const score = yield (0, words_helpers_1.scores)(req.body);
    console.log('score: ', score);
    res.status(201).send({ myScore: score, scores: TestData_json_1.default.scoresList });
}));
app.listen(port, () => {
    console.log(`server is working on port ${port}`);
});
