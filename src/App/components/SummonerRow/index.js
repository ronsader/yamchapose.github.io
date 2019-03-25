import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Hidden from '@material-ui/core/Hidden';

export default function SummonerRow({ summoner, idx, classes }) {
  if (!summoner) {
    return null;
  }
  return (
    <TableRow>
      <TableCell
        classes={{ body: classes.cell }}
        style={{ width: 40, paddingRight: 10 }}
      >{`#${idx + 1}`}</TableCell>
      <TableCell classes={{ body: classes.cell }}>
        <a href={summoner.twitchUrl} target='blank'>
          {summoner.title}
        </a>
      </TableCell>
      <Hidden mdDown>
        <TableCell classes={{ body: classes.cell }}>
          <a href={summoner.opgg} target='blank'>
            {summoner.summonerName}
          </a>
        </TableCell>
      </Hidden>
      <TableCell classes={{ body: classes.cell }}>
        {summoner.tier &&
          `${summoner.tier} ${summoner.rank} (${summoner.leaguePoints} LP)`}
      </TableCell>
      <Hidden smDown>
        <TableCell classes={{ body: classes.cell }}>
          {summoner.tier &&
            `${summoner.wins}W - ${summoner.losses}L` +
              ' (' +
              (summoner.sortingData && summoner.sortingData.winRatio) +
              '%)'}
        </TableCell>
      </Hidden>
    </TableRow>
  );
}
