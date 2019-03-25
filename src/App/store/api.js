export const summonersGet = () => {
  const API_BASE = 'https://rocky-hollows-93229.herokuapp.com';
  const url = `/api/v1/summoners`;
  return fetch(API_BASE + url).then(response => response.json());
};

// to get Ids: https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/MarcMerill?api_key=****

// multiquery: https://na.op.gg/multi/query=buffmozambique%2Cumetadyr%2Chamstring%2Cmet4theo%2Cgettinnasty%2Cmcbayze%2Cmattywhoo%2Csunnyspeed%2Ctwtvlegitkorea%2Cisukudesu
