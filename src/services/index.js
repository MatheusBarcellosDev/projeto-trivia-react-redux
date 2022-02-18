const setRanking = ({ playerName, playerScore, playerPicture }) => {
  const newPlayer = {
    name: playerName,
    score: playerScore,
    picture: playerPicture,
  };
  let newRanking = [];
  const previousData = localStorage.getItem('ranking');
  console.log(previousData);
  console.log(JSON.parse(previousData));
  if (JSON.parse(previousData)) {
    const prevRanking = JSON.parse(previousData);
    newRanking = [...prevRanking, newPlayer];
  } else {
    newRanking = [newPlayer];
  }
  localStorage.setItem('ranking', JSON.stringify(newRanking));
};

export default setRanking;
