import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
  color: white;
  text-align: center;
  margin: 20px;
`;

const Paragraph = styled.p`
  margin: 0px;
  margin-bottom: 10px;
`;

const Link = styled.a`
  color: white;
  text-decoration: underline;
`;

export default () => (
  <Footer>
    <Paragraph>
      Personal project, created with <span style={{ color: '#b60000' }}>❤</span>
      {` by `}
      <Link href='https://twitter.com/thekogmo'>{` @thekogmo`}</Link>
    </Paragraph>
    <Paragraph>
      PS, for fellow developers: if it interests you, the source is{' '}
      <Link
        href='https://github.com/thekogmo/race-to-masters'
        target='_blank'
        rel='noopener noreferrer'
      >
        available on GitHub.
      </Link>
    </Paragraph>
    <Paragraph>
      {`This application isn’t endorsed by Riot Games and doesn’t reflect
  the views or opinions of Riot Games or anyone officially involved in
  producing or managing League of Legends.`}
    </Paragraph>
    <Paragraph>
      {`League of Legends and Riot Games are trademarks or registered
  trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.`}
    </Paragraph>
  </Footer>
);
