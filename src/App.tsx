import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Route, Switch, useLocation, Link } from 'react-router-dom';

import LoginUser from './Login'
import Profile from './Profile'
import { MainHeading, Button } from './Components';

const MAX_VIEWPORT_WIDTH = 3000;
const MIN_VIEWPORT_WIDTH = 300;
const MAX_SIZE = 20;
const MIN_SIZE = 15;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }

  body, #root {
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
  }
`

const LogoutButton = styled(Button)`
  font-size: 0.7em;
  margin: 0;
  padding: 0.6em 1em;
  color: white;  
  background-color: #26c6da;

  :focus, :hover {
    background-color: #00acc1;
  }
`;

const HeaderHeading = styled(MainHeading)`
  font-size: 1em;
  font-family: "Lucida Console", Monaco, monospace;
  margin: 0;
`;

const HeaderBar = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4vh;
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 10vh 15vw;
  @media (max-width: 768px) {
    padding: 12vh 10vw 10vw 10vw;
  }
  box-sizing: border-box;
  background: #e1f5fe;
  display: flex;
  justify-content: center;
  font-size: calc(${MIN_SIZE}px + (${MAX_SIZE} - ${MIN_SIZE}) * ((100vw - ${MIN_VIEWPORT_WIDTH}px) / (${MAX_VIEWPORT_WIDTH} - ${MIN_VIEWPORT_WIDTH})));
`;

function App() {
  const location = useLocation();
  
  const removeProfileFromStore = () => {
    sessionStorage.removeItem("profile");
  }

  return (
    <>
      <HeaderBar>
        <HeaderHeading>Hackathon Global</HeaderHeading>
        {location.pathname !== "/" ? <Link to="/"><LogoutButton onClick={removeProfileFromStore}>LOGOUT</LogoutButton></Link> : null}
      </HeaderBar>
      <Container>
        <GlobalStyle/>
        <Switch>
          <Route path='/' component={LoginUser} exact/>
          <Route path='/profile' component={Profile} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
