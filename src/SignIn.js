import React, { Component } from "react";
import {
  Button,
  Segment,
  Grid,
  Header,
  Form,
  Message
} from "semantic-ui-react";
import Service from "./service";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      code: "",
      password: "",
      confirmpassword: "",
      email: "",
      check: false
    };
    this.service = new Service();
  }

  handleSignIn(e) {
    e.preventDefault();
    const formPayload = {
      name: this.state.name,
      code: this.state.code,
      password: this.state.password,
      confirmpassword: this.state.confirmpassword,
      email: this.state.email
    };

    if (this.state.password === this.state.confirmpassword) {
      if (this.state.check === true) {
        console.log("form data: ", formPayload);
        this.service.add("com.axelor.auth.db.User", formPayload);
      } else {
        alert("Accept the terms");
      }
    } else {
      alert("Passwords are not matched");
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleCheck = e => this.setState({ check: true });

  render() {
    return (
      <div
        className="signup-form"
        style={{ marginTop: 150, marginLeft: 50, marginRight: 50 }}
      >
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="blue" icon textAlign="center">
              <Header.Content>SIGN UP</Header.Content>
            </Header>
            <Form onSubmit={e => this.handleSignIn(e)}>
              <Segment raised>
                <Form.Input
                  label="Full Name"
                  placeholder="Full name"
                  required
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />

                <Form.Input
                  label="Username"
                  placeholder="Username"
                  required
                  name="code"
                  value={this.state.code}
                  onChange={this.handleChange}
                />

                <Form.Input
                  label="Password"
                  placeholder="Password"
                  type="Password"
                  required
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />

                <Form.Input
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  type="Password"
                  required
                  name="confirmpassword"
                  value={this.state.confirmpassword}
                  onChange={this.handleChange}
                />

                <Form.Input
                  label="Email"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />

                <Form.Checkbox
                  label="I agree to the Terms and Conditions"
                  required
                  onChange={this.handleCheck}
                />
                <Button type="submit" basic circular color="blue">
                  Submit
                </Button>
              </Segment>
            </Form>
            <Message>
              <b>
                Already member? <a href="/loginform"> Login</a>
              </b>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
