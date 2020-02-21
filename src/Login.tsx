import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button, MainHeading, SubHeading } from './Components'

const USERNAME = "user";
const PASSWORD = "pass";

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.7em;
  font-style: oblique;
  text-align: right;
`;

// can focus and hover have the same styling?
const SubmitButton = styled(Button)`
  color: white;  
  background-color: #26c6da;

  :focus, :hover {
    background-color: #00acc1;
  }
`;

const InputField = styled.input`
  font-size: 1em;
  border: 2px solid #26c6da;
  border-radius: 20px;
  padding: 0.8em 1.2em;

  ::placeholder {
    color: gray;
  }

  :focus {
    outline: none;
    border: 2px solid #00a4b7;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 1em 0;

  > :not(:first-child) {
    margin-top: 20px;
  }
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 350px;
`;

export default function LoginUser() {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (error) {
      setError(""); // change to non error state
    }
    setUsername(target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (error) {
      setError(""); // change to non error state
    }
    setPassword(target.value);
  };

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === USERNAME && password === PASSWORD) {
      sessionStorage.removeItem("profile"); // remove current profile from store
      history.push("/profile"); // login and navigate to profile page
    } else {
      setError("Username is '" + USERNAME + "' and password is '" + PASSWORD + "'."); // change to error state
    }
  }

  return (
    <Container>
      <MainHeading>Welcome</MainHeading>
      <SubHeading>to Hackathon Global</SubHeading>
      <LoginForm onSubmit={login}>
        <InputField
          placeholder="Username"
          onChange={handleUsernameChange}
          value={username}
          type="text"
          aria-label="Username"
          required>
        </InputField>
        <InputField 
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
          type="password"
          aria-label="Password"
          required>
        </InputField>
        {error ? <ErrorMessage>{error}</ErrorMessage> : null}
        <SubmitButton>Log in</SubmitButton>
      </LoginForm>
    </Container>
  )
}