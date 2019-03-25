import memoize from 'fast-memoize';

function sortSummonersFunc(a, b) {
  if (!a.sortingData || !b.sortingData) {
    return -1;
  }

  let result = -1;
  // result = -1 (a comes first, a is higher elo)
  // result = 1 (b comes first, b is higher elo)

  if (a.sortingData.tier < b.sortingData.tier) {
    result = -1;
    return result;
  } else if (a.sortingData.tier > b.sortingData.tier) {
    result = 1;
    return result;
  } else if (a.sortingData.tier === b.sortingData.tier) {
    if (a.sortingData.division < b.sortingData.division) {
      result = -1;
      return result;
    } else if (a.sortingData.division > b.sortingData.division) {
      result = 1;
      return result;
    } else if (a.sortingData.division === b.sortingData.division) {
      if (a.sortingData.leaguePoints >= b.sortingData.leaguePoints) {
        result = -1;
        return result;
      } else if (a.sortingData.leaguePoints < b.sortingData.leaguePoints) {
        result = 1;
        return result;
      }
    }
  }
}

export const sortSummoners = memoize(sortSummonersFunc);

export function calculateSortingData(summoner) {
  // Tier
  let tier = 0;

  switch (summoner.tier) {
    case 'CHALLENGER':
      tier = 1;
      break;
    case 'GRANDMASTER':
      tier = 2;
      break;
    case 'MASTER':
      tier = 3;
      break;
    case 'DIAMOND':
      tier = 4;
      break;
    case 'PLATINUM':
      tier = 5;
      break;
    case 'GOLD':
      tier = 6;
      break;
    case 'SILVER':
      tier = 7;
      break;
    case 'BRONZE':
      tier = 8;
      break;
    case 'IRON':
      tier = 9;
      break;
    default:
      throw new Error('invalid tier');
  }

  // Division

  let division = 0;

  switch (summoner.rank) {
    case 'I':
      division = 1;
      break;
    case 'II':
      division = 2;
      break;
    case 'III':
      division = 3;
      break;
    case 'IV':
      division = 4;
      break;
    default:
      throw new Error('invalid rank');
  }

  // win ratio

  const winRatio = (
    (summoner.wins * 100) /
    (summoner.wins + summoner.losses)
  ).toFixed(0);

  return {
    tier,
    division,
    leaguePoints: summoner.leaguePoints,
    winRatio
  };
}
