// Sound utility functions using Web Audio API

const createOscillator = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

export const playOoga = () => {
  // Happy, ascending "OOGA!" sound
  createOscillator(200, 0.1, 'square');
  setTimeout(() => createOscillator(300, 0.15, 'square'), 100);
};

export const playUgh = () => {
  // Deep, grunting "UGH!" sound
  createOscillator(100, 0.2, 'sawtooth');
  setTimeout(() => createOscillator(80, 0.3, 'sawtooth'), 100);
  
  // Add vibration if available
  if ('vibrate' in navigator) {
    navigator.vibrate([100, 50, 100]);
  }
};

export const playTimesUp = () => {
  // Descending tone for time's up
  createOscillator(400, 0.2, 'triangle');
  setTimeout(() => createOscillator(300, 0.2, 'triangle'), 150);
  setTimeout(() => createOscillator(200, 0.3, 'triangle'), 300);
};

export const playVictory = () => {
  // Triumphant ascending sequence
  const notes = [262, 330, 392, 523]; // C, E, G, C
  notes.forEach((note, i) => {
    setTimeout(() => createOscillator(note, 0.3, 'sine'), i * 150);
  });
};
