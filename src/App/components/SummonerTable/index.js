import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Hidden from '@material-ui/core/Hidden';
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from '@material-ui/core/styles';

import SummonerRow from '../SummonerRow';
import { getAllSummonersAction } from '../../store';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

const cellStyle = {
  fontSize: 24,
  width: 250,
  color: '#BBB',
  borderColor: 'rgba(256,256,256,0.1)',
  [theme.breakpoints.down('sm')]: {
    fontSize: 20,
    width: 200
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: 14,
    width: 150,
    paddingRight: 10
  }
};

const styles = theme => ({
  table: {
    fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    backgroundColor: '#1D1E21'
  },
  cell: cellStyle,
  head: {
    ...cellStyle,
    color: '#777'
  }
});

class SummonerTable extends React.Component {
  componentDidMount() {
    this.props.dispatch(getAllSummonersAction());
  }

  render() {
    const { summonersById, summonerIds, classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Paper>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell
                  classes={{ head: classes.head }}
                  style={{ width: 40, paddingRight: 10 }}
                >
                  <span role='img' aria-label='trophy'>
                    🏆
                  </span>
                </TableCell>

                <TableCell classes={{ head: classes.head }}>Twitch</TableCell>
                <Hidden mdDown>
                  <TableCell classes={{ head: classes.head }}>OP.GG</TableCell>
                </Hidden>
                <TableCell classes={{ head: classes.head }}>
                  Tier / League Points{' '}
                </TableCell>
                <Hidden smDown>
                  <TableCell classes={{ head: classes.head }}>
                    Wins / Losses{' '}
                  </TableCell>
                </Hidden>
              </TableRow>
            </TableHead>
            <TableBody>
              {summonerIds.map((summonerId, idx) => (
                <SummonerRow
                  key={summonerId}
                  summoner={summonersById[summonerId]}
                  idx={idx}
                  classes={classes}
                />
              ))}
            </TableBody>
          </Table>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

const mapState = state => ({
  summonersById: state.summonersById,
  summonerIds: state.summonerIds
});

const StyledTable = withStyles(styles)(SummonerTable);
export default connect(mapState)(StyledTable);
