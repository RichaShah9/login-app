import React, { Component } from "react";
import {
  Button,
  Icon,
  Form,
  Grid,
  Header,
  Segment,
  Divider
} from "semantic-ui-react";
import Service from "./service";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.service = new Service();
  }

  handleSubmit(e) {
    this.service.login(this.state.username, this.state.password).then(res => {
      console.log(res.status);
      if (res.status === 200) {
        this.props.history.push("/welcome");
      } else if (res.status === 401) {
        alert("Invalid Credentials");
      } else {
        alert("Something going Wrong");
      }
    });
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleClick(e) {
    e.preventDefault();
    this.props.history.push("/signin");
  }

  render() {
    return (
      <div
        className="login-form"
        style={{ marginTop: 150, marginLeft: 50, marginRight: 50 }}
      >
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="blue" icon textAlign="center">
              <Icon name="users" circular />
              <Header.Content>Login to your account</Header.Content>
            </Header>
            <Form size="large" onSubmit={e => this.handleSubmit(e)}>
              <Segment raised>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  name="username"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <Button circular basic color="blue" fluid size="large">
                  Sign In
                </Button>
                <Divider fitted hidden />
                <Button
                  animated="fade"
                  circular
                  basic
                  color="blue"
                  fluid
                  size="large"
                  onClick={e => this.handleClick(e)}
                >
                  <Button.Content visible>New to us?</Button.Content>
                  <Button.Content hidden>Sign Up</Button.Content>
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
