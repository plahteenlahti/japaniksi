import { create } from "zustand";
import { fiFamily } from "../materials/fi-family";
import { jaFamily } from "../materials/ja-family";

type Word = {
  word: string;
  translation: string;
  extra: Array<{ field: string; value: string }>;
};

type WordList = {
  title: string;
  description: string;
  words: Word[];
};

interface GameState {
  currentWordIndex: number;
  correctAnswers: number;
  wrongAnswers: number;
  randomizedWords: Word[];
  wordList: WordList;

  // Actions
  initializeGame: () => void;
  handleAnswer: (selectedTranslation: string) => void;
  getCurrentWord: () => Word;
  getOptions: () => string[];
}

export const useGameStore = create<GameState>((set, get) => ({
  currentWordIndex: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  randomizedWords: [],
  wordList: fiFamily,

  initializeGame: () => {
    const shuffledWords = [...get().wordList.words].sort(
      () => Math.random() - 0.5
    );
    set({
      randomizedWords: shuffledWords,
      currentWordIndex: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
  },

  getCurrentWord: () => {
    const { randomizedWords, currentWordIndex, wordList } = get();
    return randomizedWords[currentWordIndex] || wordList.words[0];
  },

  getOptions: () => {
    const { randomizedWords, currentWordIndex } = get();
    const currentWord = get().getCurrentWord();
    const options = [currentWord.translation];

    const remainingWords = [
      ...randomizedWords.slice(currentWordIndex + 1),
      ...randomizedWords.slice(0, currentWordIndex),
    ];

    for (let i = 0; options.length < 4 && i < remainingWords.length; i++) {
      options.push(remainingWords[i].translation);
    }

    return options.sort(() => Math.random() - 0.5);
  },

  handleAnswer: (selectedTranslation: string) => {
    const { getCurrentWord, randomizedWords } = get();
    const currentWord = getCurrentWord();

    if (selectedTranslation === currentWord.translation) {
      set((state) => ({
        correctAnswers: state.correctAnswers + 1,
        currentWordIndex: (state.currentWordIndex + 1) % randomizedWords.length,
      }));
    } else {
      set((state) => ({
        wrongAnswers: state.wrongAnswers + 1,
      }));
    }
  },
}));
