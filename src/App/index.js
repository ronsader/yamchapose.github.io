import React from 'react';
import styled from 'styled-components';
import Hidden from '@material-ui/core/Hidden';

import SummonerTable from './components/SummonerTable';
import Footer from './components/Footer';
import LandingParticles from './components/LandingParticles';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #222;
`;

const FlexWrapper = styled.div`
  flex: 1;
`;

const Header = styled.h1`
  color: white;
  font-size: 48px;
  text-align: center;
  text-shadow: rgba(0, 0, 0, 0.4) 1px 1px;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export default function App() {
  return (
    <Container>
      <Hidden smDown>
        <LandingParticles />
      </Hidden>
      <Header>
        Race to Masters Tracker{' '}
        <span role='img' aria-label='running-man'>
          🏃‍
        </span>
      </Header>
      <FlexWrapper>
        <SummonerTable />
      </FlexWrapper>

      <Footer />
    </Container>
  );
}
