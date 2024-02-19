const LEADERBOARD_SPOTS = 3;
const NAME_LEN = 3;
const SCORE_LEN = 2;

// Name required by PICO8, so ignore naming convention
// eslint-disable-next-line @typescript-eslint/naming-convention
const pico8_gpio = Array(128).fill(0);

// eslint-disable-next-line @typescript-eslint/naming-convention
const pico8_gpio_prev = pico8_gpio.slice(0, LEADERBOARD_SPOTS * (NAME_LEN + SCORE_LEN));

function getChar(picoCode) {
  return String.fromCharCode(picoCode - 1);
}

function getPicoCode(char) {
  return char.charCodeAt(0) + 1;
}

function scoreToBytes(score) {
  const byteArray = Array(SCORE_LEN);
  for (let i = 0; i < SCORE_LEN; i++) {
    const modScore = score % (256 ** (i + 1));
    byteArray[i] = Math.floor(modScore / 256 ** i);
  }
  return byteArray;
}

window.onmessage = (ev) => {
  if (ev.data.type === 'send_scores' && 'scores' in ev.data) {
    // Message is list of scores - treat as list of {player: string, score: number}
    for (let i = 0; i < ev.data.scores.length && i < LEADERBOARD_SPOTS; i++) {
      const firstAddress = i * (NAME_LEN + SCORE_LEN);
      const score = ev.data.scores[i];

      const playerName = score.player;
      const playerScore = score.score;

      // Extract player name from score object (as pico letter codes)
      for (let j = 0; j < NAME_LEN && j < playerName.length; j++) {
        pico8_gpio[firstAddress + j] = getPicoCode(playerName[j]);
      }

      // Pad with As if necessary
      if (playerName.length < NAME_LEN) {
        for (let j = playerName.length; j < NAME_LEN; j++) {
          pico8_gpio[firstAddress + j] = getPicoCode('A');
        }
      }

      // Convert score to an array of bytes, and add to GPIO
      const byteArray = scoreToBytes(playerScore);

      for (let j = 0; j < SCORE_LEN; j++) {
        pico8_gpio[firstAddress + NAME_LEN + j] = byteArray[j];
      }
    }
  }
};

window.top.postMessage('connected');

// Initialise scores
for (let i = 0; i < LEADERBOARD_SPOTS; i++) {
  const firstAddress = i * (NAME_LEN + SCORE_LEN);
  for (let j = 0; j < NAME_LEN; j++) {
    pico8_gpio[firstAddress + j] = 66;
  }

  for (let j = 0; j < SCORE_LEN; j++) {
    pico8_gpio[firstAddress + NAME_LEN + j] = 0;
  }
}

// Set is_js flag for pico 8
pico8_gpio[127] = 1;

function postScores() {
  const players = [];

  for (let i = 0; i < LEADERBOARD_SPOTS; i++) {
    const firstAddress = i * (NAME_LEN + SCORE_LEN);
    let playerName = '';
    for (let j = 0; j < NAME_LEN; j++) {
      playerName += getChar(pico8_gpio[firstAddress + j]);
    }

    let score = 0;
    for (let j = 0; j < SCORE_LEN; j++) {
      score += pico8_gpio[firstAddress + NAME_LEN + j] * 256 ** j;
    }

    players.push({
      player: playerName,
      score,
    });
  }

  window.top.postMessage({
    type: 'new_scores',
    scores: players,
  });
}

function doGPIO() {
  let shouldPost = false;
  for (let i = 0; i < pico8_gpio_prev.length; i++) {
    if (pico8_gpio[i] !== pico8_gpio_prev[i]) {
      shouldPost = true;
    }
    pico8_gpio_prev[i] = pico8_gpio[i];
  }

  if (shouldPost) {
    postScores();
  }
}
setInterval(doGPIO, 50);
