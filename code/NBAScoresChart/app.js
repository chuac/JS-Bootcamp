const warriorsGames = [{
    awayTeam: {
      team: 'Golden State',
      points: 119,
      isWinner: true
    },
    homeTeam: {
      team: 'Houston',
      points: 106,
      isWinner: false
    }
  },
  {
    awayTeam: {
      team: 'Golden State',
      points: 105,
      isWinner: false
    },
    homeTeam: {
      team: 'Houston',
      points: 127,
      isWinner: true
    }
  },
  {
    homeTeam: {
      team: 'Golden State',
      points: 126,
      isWinner: true
    },
    awayTeam: {
      team: 'Houston',
      points: 85,
      isWinner: false
    }
  },
  {
    homeTeam: {
      team: 'Golden State',
      points: 92,
      isWinner: false
    },
    awayTeam: {
      team: 'Houston',
      points: 95,
      isWinner: true
    }
  },
  {
    awayTeam: {
      team: 'Golden State',
      points: 94,
      isWinner: false
    },
    homeTeam: {
      team: 'Houston',
      points: 98,
      isWinner: true
    }
  },
  {
    homeTeam: {
      team: 'Golden State',
      points: 115,
      isWinner: true
    },
    awayTeam: {
      team: 'Houston',
      points: 86,
      isWinner: false
    }
  },
  {
    awayTeam: {
      team: 'Golden State',
      points: 101,
      isWinner: true
    },
    homeTeam: {
      team: 'Houston',
      points: 92,
      isWinner: false
    }
  }
]

const makeChart = (games, targetTeam) => {
  const ulParent = document.createElement('ul'); // create element for us to append our li s to
  for (let game of games) {
    const gameLi = document.createElement('li');
    gameLi.innerHTML = getScoreLine(game);
    
    gameLi.classList.add(isWinner(game, targetTeam) ? 'win' : 'loss'); // if the object's isWinner is true then set 'win' class

    ulParent.appendChild(gameLi); // could also do append()
  }
  return ulParent;
}

const isWinner = ({homeTeam, awayTeam}, targetTeam) => {
  const targetObj = homeTeam.team === targetTeam ? homeTeam : awayTeam; // if hTeam's name is GoldenState then grab that, otherwise they're the away team. Finding the target team
  return targetObj.isWinner;
}

const getScoreLine = ({homeTeam, awayTeam}) => { // accepts a game object and destructures
  const {team: hTeam, points: hPoints} = homeTeam; // different syntax of desctructuring since we'd have clases of two names, two points. this way sets them to names we choose
  const {team: aTeam, points: aPoints} = awayTeam;

    
  let scoreLine;
  const teamNames = `${aTeam} @ ${hTeam}`;
  if (aPoints > hPoints) {
    scoreLine = `<b>${aPoints}</b> - ${hPoints}`;
  } else {
    scoreLine = `${aPoints} - <b>${hPoints}</b>`;
  }
  return `${teamNames} ${scoreLine}`;
}

const gsSection = document.querySelector('#gs');
const hrSection = document.querySelector('#hr');
const gsChart = makeChart(warriorsGames, 'Golden State');
const hrChart = makeChart(warriorsGames, 'Houston');

gsSection.appendChild(gsChart);
hrSection.appendChild(hrChart);