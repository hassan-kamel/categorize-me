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
exports.scores = exports.disorder = exports.PosWordList = exports.randomNum = void 0;
const TestData_json_1 = __importDefault(require("./TestData.json"));
const randomNum = (min, max) => __awaiter(void 0, void 0, void 0, function* () { return Math.floor(Math.random() * (max - min + 1)) + min; });
exports.randomNum = randomNum;
// create object ot type IList that will have pos as properties and inside properties will be array of objects
// that have same pos type like 'verb' poperty will have array of word list with pos = verb
const PosWordList = (wordList) => __awaiter(void 0, void 0, void 0, function* () {
    const list = {};
    if (Object.keys(list).length == 0) {
        yield wordList.forEach((item) => {
            if (list[item.pos]) {
                list[item.pos].push(item);
            }
            else {
                list[item.pos] = [item];
            }
        });
    }
    return list;
});
exports.PosWordList = PosWordList;
// disorder of result , i made it because the amount of data is small so even with random the many words that repeated
// so in this way we make disorder for words to the next round
const disorder = (list) => __awaiter(void 0, void 0, void 0, function* () {
    const last = [];
    while (list.length != 0) {
        const random = Math.floor(Math.random() * list.length);
        const el = list.splice(random, 1)[0];
        last.push(el);
    }
    return last;
});
exports.disorder = disorder;
// calculate the score of questions
const scores = ({ scoreValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const scores = TestData_json_1.default.scoresList;
    const sortedScores = scores.slice().sort((a, b) => a - b);
    const lessThanMyScore = sortedScores.filter((score) => score < Number(scoreValue)).length;
    const percentile = lessThanMyScore / sortedScores.length;
    return Number((percentile * 100).toFixed(2));
});
exports.scores = scores;
