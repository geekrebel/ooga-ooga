import baseGameGray from './base_game_gray.json';
import baseGameRed from './base_game_red.json';

export interface Word {
  word: string;
  difficulty: 'easy' | 'hard';
}

interface RawWordData {
  "1": string;
  "3": string;
}

interface GameData {
  game_data: RawWordData[];
}

// Parse the actual Poetry for Neanderthals word lists
const parseWordList = (gameData: GameData): Word[] => {
  const words: Word[] = [];
  
  gameData.game_data.forEach((item) => {
    // Add the 1-point (easy) word
    if (item["1"]) {
      words.push({
        word: item["1"],
        difficulty: 'easy'
      });
    }
    
    // Add the 3-point (hard) word
    if (item["3"]) {
      words.push({
        word: item["3"],
        difficulty: 'hard'
      });
    }
  });
  
  return words;
};

// Combine both gray and red decks
const grayWords = parseWordList(baseGameGray as GameData);
const redWords = parseWordList(baseGameRed as GameData);

export const WORD_LIST: Word[] = [...grayWords, ...redWords];

export const getRandomWord = (): Word => {
  const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
  return WORD_LIST[randomIndex];
};

// Stats for fun
export const STATS = {
  totalWords: WORD_LIST.length,
  easyWords: WORD_LIST.filter(w => w.difficulty === 'easy').length,
  hardWords: WORD_LIST.filter(w => w.difficulty === 'hard').length,
};
