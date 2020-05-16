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

const ulParent = document.createElement('ul'); // create element for us to append our li s to
for (let game of warriorsGames) {
  const {homeTeam, awayTeam} = game;
  const {team: hTeam, points: hPoints} = homeTeam; // different syntax of desctructuring since we'd have clases of two names, two points. this way sets them to names we choose
  const {team: aTeam, points: aPoints} = awayTeam;

  const gameLi = document.createElement('li');
  let scoreLine;
  const teamNames = `${aTeam} @ ${hTeam}`;
  if (aPoints > hPoints) {
    // if (aTeam === 'Golden State') {
    //   gameLi.classList.add('win');
    // } else {
    //   gameLi.classList.add('loss');
    // }
    scoreLine = `<b>${aPoints}</b> - ${hPoints}`;
  } else {
    // if (aTeam !== 'Golden State') {
    //   gameLi.classList.add('win');
    // } else {
    //   gameLi.classList.add('loss');
    // }
    scoreLine = `${aPoints} - <b>${hPoints}</b>`;
  }
  
  const warriorsObj = hTeam === 'Golden State' ? homeTeam : awayTeam; // if hTeam's name is GoldenState then grab that, otherwise they're the away team
  gameLi.classList.add(warriorsObj.isWinner ? 'win' : 'loss'); // if the object's isWinner is true then set 'win' class

  gameLi.innerHTML = `${teamNames} ${scoreLine}`; // need to use innerHTML vs innerText to render the <b> tags

  ulParent.appendChild(gameLi); // could also do append()

  console.log(scoreLine);
}
document.querySelector('body').prepend(ulParent); // shortcut would just be document.body