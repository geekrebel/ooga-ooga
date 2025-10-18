export interface Word {
  word: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const WORD_LIST: Word[] = [
  // Easy words
  { word: "banana", difficulty: "easy" },
  { word: "fire", difficulty: "easy" },
  { word: "mountain", difficulty: "easy" },
  { word: "water", difficulty: "easy" },
  { word: "book", difficulty: "easy" },
  { word: "phone", difficulty: "easy" },
  { word: "music", difficulty: "easy" },
  { word: "pizza", difficulty: "easy" },
  { word: "cookie", difficulty: "easy" },
  { word: "rainbow", difficulty: "easy" },
  { word: "butterfly", difficulty: "easy" },
  { word: "elephant", difficulty: "easy" },
  { word: "basketball", difficulty: "easy" },
  { word: "computer", difficulty: "easy" },
  { word: "umbrella", difficulty: "easy" },
  
  // Medium words
  { word: "telescope", difficulty: "medium" },
  { word: "helicopter", difficulty: "medium" },
  { word: "refrigerator", difficulty: "medium" },
  { word: "hurricane", difficulty: "medium" },
  { word: "pyramid", difficulty: "medium" },
  { word: "volcano", difficulty: "medium" },
  { word: "treasure", difficulty: "medium" },
  { word: "dinosaur", difficulty: "medium" },
  { word: "marathon", difficulty: "medium" },
  { word: "carnival", difficulty: "medium" },
  { word: "democracy", difficulty: "medium" },
  { word: "calculator", difficulty: "medium" },
  { word: "newspaper", difficulty: "medium" },
  { word: "microwave", difficulty: "medium" },
  { word: "kangaroo", difficulty: "medium" },
  
  // Hard words
  { word: "sophisticated", difficulty: "hard" },
  { word: "philosophical", difficulty: "hard" },
  { word: "entrepreneur", difficulty: "hard" },
  { word: "ambiguous", difficulty: "hard" },
  { word: "consciousness", difficulty: "hard" },
  { word: "bureaucracy", difficulty: "hard" },
  { word: "metamorphosis", difficulty: "hard" },
  { word: "procrastination", difficulty: "hard" },
  { word: "serendipity", difficulty: "hard" },
  { word: "paradigm", difficulty: "hard" },
  { word: "juxtaposition", difficulty: "hard" },
  { word: "photosynthesis", difficulty: "hard" },
  { word: "cryptocurrency", difficulty: "hard" },
  { word: "claustrophobia", difficulty: "hard" },
  { word: "onomatopoeia", difficulty: "hard" },
];

export const getRandomWord = (): Word => {
  const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
  return WORD_LIST[randomIndex];
};
