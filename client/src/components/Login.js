import React, {useState, useContext} from 'react';
import Navbar from './Navbar';
import { AuthContext, } from '../providers/AuthProvider';
import {Button, Form, Segment, Header, } from 'semantic-ui-react';

const Login = (props) => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    const {history} = props
    e.preventDefault();
    auth.handleLogin({email, password, }, history)
  };

    return(
      <Segment basic>
        <Navbar/>
        <Header as='h1' textAlign='center'>Admin Login</Header>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            label="Email"
            autoFocus
            required
            name='email'
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Input
            label="Password"
            required
            type="password"
            name='password'
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button>Sign In</Button>
        </Form>
      </Segment>
    )
};

export default Login;