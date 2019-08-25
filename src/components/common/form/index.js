import React from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  FormFeedback,
  Alert
} from "reactstrap";

class Forms extends React.Component {
  state = {
    user: [],
    showAlert: false,
    message: "",
    success: "",
    isEdit: false,
    userId: this.props.match.params.id
  };
  componentDidMount() {
    if (this.state.userId) {
      this.getUserForUpdate(this.state.userId);
    }
  }

  getUserForUpdate = async id => {
    this.setState({ loading: true });
    const response = await fetch(
      `https://react-training-apis.herokuapp.com/api/users/${id}`
    );
    const data = await response.json();
    this.setState({
      user: data.user,
      isEdit: true
    });
    console.log(this.state.user, "Update User");
    console.log(this.state.isEdit, "Is Edit");
  };

  onDismiss = () =>
    this.setState({
      showAlert: false
    });

  validation = Yup.object().shape({
    name: Yup.string()
      .required("Must not be empty")
      .min(3, "Not less than 3 characters ")
      .max(100, "Too Long"),
    email: Yup.string()
      .required("Must not be empty")
      .email("Must be Valid Email")
      .max(255, "Too Long"),
    gender: Yup.string().required("You have to select Gender!"),
    profession: Yup.string()
      .oneOf(["Dev", "Doctor", "Business Man"])
      .required("Please choose your Profession"),
    address: Yup.string()
      .required("Must not be empty")
      .min(3, "Not less than 3 characters ")
      .max(100, "Too Long")
  });

  onSubmit = (values, actions) => {
    this.setState({
      user: values
    });
    const userData = this.state.user;

    actions.setSubmitting(true);

    {
      this.state.isEdit
        ? axios
            .post(
              `https://react-training-apis.herokuapp.com/api/users/${
                this.state.userId
              }/update`,
              this.state.user
            )
            .then(res => {
              console.log(res.data);
              this.setState({
                showAlert: true,
                message: res.data.message,
                success: res.data.success
              });
              if (this.state.success) {
                this.props.history.push("/listings");
                this.setState({ isEdit: false });
              }
            })
            .catch(error => {
              console.log(error);
            })
        : axios
            .post(
              `https://react-training-apis.herokuapp.com/api/users/store`,
              userData
            )
            .then(res => {
              this.setState({
                showAlert: true,
                message: res.data.message,
                success: res.data.success
              });
              actions.setSubmitting(false);
            })
            .catch(error => {
              this.setState({
                showAlert: true,
                message: error
              });
              actions.setSubmitting(false);
            });
    }
  };

  render() {
    return (
      <div>
        <Alert
          isOpen={this.state.showAlert}
          toggle={this.onDismiss}
          fade
          color={this.state.success ? `success` : `danger`}
        >
          {this.state.message}
        </Alert>
        <h1>{this.state.isEdit ? `Update User` : `Add User`}</h1>
        <Formik
          enableReinitialize
          initialValues={{
            name: this.state.isEdit ? this.state.user.name : "",
            email: this.state.isEdit ? this.state.user.email : "",
            gender: this.state.isEdit ? this.state.user.gender : "",
            profession: this.state.isEdit ? this.state.user.profession : "",
            address: this.state.isEdit ? this.state.user.address : ""
          }}
          validationSchema={this.validation}
          onSubmit={this.onSubmit}
          render={({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit
          }) => (
            <Form onSubmit={handleSubmit}>
              <FormGroup row>
                <Col md="6">
                  <legend>Name</legend>

                  <Input
                    type="text"
                    name="name"
                    tag={Field}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    invalid={errors.name && touched.name}
                  />
                  <FormFeedback tooltip>{errors.name}</FormFeedback>
                </Col>
                <Col md="6">
                  <legend>Email</legend>
                  <Input
                    name="email"
                    tag={Field}
                    type="email"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    invalid={errors.email && touched.email}
                  />
                  <FormFeedback tooltip>{errors.email}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="6">
                  <legend>Gender</legend>
                  <FormGroup check>
                    <Label check>
                      <Input
                        id="gender"
                        type="radio"
                        name="gender"
                        value="Male"
                        onChange={handleChange}
                        invalid={errors.gender && touched.gender}
                      />{" "}
                      Male
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={handleChange}
                        invalid={errors.gender && touched.gender}
                      />{" "}
                      Female
                    </Label>
                  </FormGroup>

                  <FormFeedback>{errors.gender}</FormFeedback>
                </Col>
                <Col md="6">
                  <legend>Address</legend>
                  <Input
                    component="textarea"
                    name="address"
                    tag={Field}
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    invalid={errors.address && touched.address}
                  />
                  <FormFeedback tooltip>{errors.address}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <legend>Profession</legend>

                  <Input
                    type="select"
                    name="profession"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.profession}
                    invalid={errors.profession && touched.profession}
                  >
                    <option disabled>Choose</option>
                    <option>Dev</option>
                    <option>Doctor</option>
                    <option>Business Man</option>
                  </Input>
                  <FormFeedback tooltip>{errors.profession}</FormFeedback>
                </Col>
              </FormGroup>

              <Button color="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}
        />
      </div>
    );
  }
}

export default Forms;
