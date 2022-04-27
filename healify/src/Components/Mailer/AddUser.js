import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
export const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const onSubmit = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const newUser = {
      name,
      email,
    };
    await axios
      .post(
        "/api/v1/mailer/add-contact",
        {
          user: newUser,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
      });

    history.push("/Mailer");
  };
  const onChange = (e) => {
    setName(e.target.value);
  };
  const ChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  return (
    <Form>
      <FormGroup>
        <Label>Name</Label>
        <Input
          type="text"
          value={name}
          onChange={onChange}
          placeholder="Name"
        ></Input>
        <Label>Email</Label>
        <Input
          type="text"
          value={email}
          onChange={ChangeEmail}
          placeholder="Email"
        ></Input>
      </FormGroup>
      <Button onClick={onSubmit}>Submit</Button>
      <Link to="/Mailer" className="btn btn-danger ml-2">
        Cancel
      </Link>
    </Form>
  );
};
