import React, { useState, useEffect } from "react";
import profilestyles from "./Profile.module.css";
import { Calendar } from "react-calendar";
import axios from "axios";
import moment from "moment";
import { useToken } from "../../CustomHooks/useToken";
import { Header } from "../Home/Header";
export const Profile = () => {
  const { token, setToken } = useToken();
  const [values, setValues] = useState({
    UserName: "",
    Password: "",
    PhoneNumber: "",
    EmailID: "",
    DescribeYourself: "",
    DateOfBirth: "",
    Hobbies: "",
    Interests: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [gender, setGender] = useState();
  const [editing, setEditing] = useState(false);

  const [chooseDate, setChooseDate] = useState(false);
  const [date, setDate] = useState();

  const handlePhoneNumbereInputChange = (event) => {
    setValues({ ...values, PhoneNumber: event.target.value });
  };

  const handleDescribeYourselfInputChange = (event) => {
    setValues({ ...values, DescribeYourself: event.target.value });
  };

  const handleHobbiesInputChange = (event) => {
    setValues({ ...values, Hobbies: event.target.value });
  };
  const handleInterestsInputChange = (event) => {
    setValues({ ...values, Interests: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      values.DescribeYourself &&
      values.PhoneNumber &&
      values.Hobbies &&
      values.Interests
    ) {
      setValid(true);
    }
    setSubmitted(true);
    setEditing(false);
    postData();
  };

  const getData = async () => {
    await axios
      .get(`/api/v1/profile`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const {
          UserName,
          EmailID,
          BirthDay,
          Gender,
          Hobbies,
          Interests,
          Phone,
          About,
        } = res.data.data;
        setValues({
          ...values,
          UserName: UserName,
          EmailID: EmailID,
          DateOfBirth: BirthDay,
          Hobbies: Hobbies,
          Interests: Interests,
          PhoneNumber: Phone,
          DescribeYourself: About,
        });
        setGender(Gender);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        }
      });
  };
  const postData = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const newDate = moment(date, "MM-DD-YYYY");
    const dob = new Date(newDate);
    dob.setDate(dob.getDate() + 1);
    await axios
      .post(
        "/api/v1/profile/edit",
        {
          BirthDay: dob,
          Gender: gender.toLowerCase(),
          Hobbies: values.Hobbies,
          Interests: values.Interests,
          Phone: values.PhoneNumber,
          About: values.DescribeYourself,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <div className={profilestyles.model}>
        <div className="container rounded bg-white mt-5 mb-5">
          {submitted && valid ? (
            <div className={profilestyles["success-message"]}>
              Sucessfully Saved your Profile
            </div>
          ) : null}
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5"
                  width="150px"
                  src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                />
                <span
                  className={profilestyles.fontapply}
                  className="font-weight-bold"
                >
                  {values.UserName}
                </span>
                <span
                  className={profilestyles.fontapply}
                  className="text-black-50"
                >
                  {values.EmailID}
                </span>

                <span> </span>
              </div>
            </div>
            <div className="col-md-5 border-right">
              <div className="p-2 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="text-right">User Profile</h2>
                </div>
                <div className="row mt-2">
                  <div className="col-md-12">
                    <label className={profilestyles.labels}>User Name</label>
                    <label
                      className="form-control"
                      style={{
                        height: 35,
                        width: "100%",
                        borderRadius: 20,
                        color: "lightgray",
                        fontSize: 16,
                        marginBottom: 50,
                        fontFamily: "sans-serif",
                      }}
                      readOnly
                    >
                      {values.UserName}
                    </label>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className={profilestyles.labels}>
                      Mobile Number
                    </label>
                    {!editing ? (
                      <label
                        className="form-control"
                        style={{
                          height: 35,
                          width: "100%",
                          borderRadius: 20,
                          color: "lightgray",
                          fontSize: 16,
                          marginBottom: 50,
                          fontFamily: "sans-serif",
                        }}
                        readOnly
                      >
                        {values.PhoneNumber}
                      </label>
                    ) : (
                      <section>
                        <input
                          onChange={handlePhoneNumbereInputChange}
                          className="form-control"
                          placeholder="Enter Phone Number"
                          name="PhoneNumber"
                          value={values.PhoneNumber}
                        />
                      </section>
                    )}

                    {submitted && !values.PhoneNumber ? (
                      <span className={profilestyles.fontapply}>
                        Please enter a Phone Number
                      </span>
                    ) : null}
                  </div>

                  <div className="col-md-12">
                    <label className={profilestyles.labels}>Email ID</label>
                    <label
                      className="form-control"
                      style={{
                        height: 35,
                        width: "100%",
                        borderRadius: 20,
                        color: "lightgray",
                        fontSize: 16,
                        marginBottom: 50,
                        fontFamily: "sans-serif",
                      }}
                      readOnly
                    >
                      {values.EmailID}
                    </label>
                  </div>
                  <div className="col-md-12">
                    <label className={profilestyles.labels}>
                      Describe Yourself
                    </label>
                    {editing ? (
                      <input
                        onChange={handleDescribeYourselfInputChange}
                        className="form-control"
                        placeholder="Describe Yourself"
                        name="DescribeYourself"
                        value={values.DescribeYourself}
                      />
                    ) : (
                      <label
                        className="form-control"
                        style={{
                          height: 35,
                          width: "100%",
                          borderRadius: 20,
                          color: "lightgray",
                          fontSize: 16,
                          marginBottom: 50,

                          fontFamily: "sans-serif",
                        }}
                        readOnly
                      >
                        {values.DescribeYourself}
                      </label>
                    )}
                    {submitted && !values.DescribeYourself ? (
                      <span className={profilestyles.fontapply}>
                        Please fill this value
                      </span>
                    ) : null}
                  </div>
                </div>
                <br />
                <label className={profilestyles.labels}>Gender</label>
                {editing ? (
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      onChange={(e) => setGender(e.target.value)}
                      checked={gender === "male"}
                    />
                    &nbsp;Male &nbsp;&nbsp;
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      onChange={(e) => setGender(e.target.value)}
                      checked={gender === "female"}
                    />
                    &nbsp;Female &nbsp; &nbsp;
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      onChange={(e) => setGender(e.target.value)}
                      checked={gender === "other"}
                    />
                    &nbsp;Other
                  </div>
                ) : (
                  <label
                    className="form-control"
                    style={{
                      height: 35,
                      width: "100%",
                      borderRadius: 20,
                      color: "lightgray",
                      fontSize: 16,
                      marginBottom: 50,

                      fontFamily: "sans-serif",
                    }}
                    readOnly
                  >
                    {gender}
                  </label>
                )}

                <br />
                <label className={profilestyles.labels}>Date Of Birth</label>
                <br />
                {editing ? (
                  <div>
                    <button
                      className={profilestyles.createbtn}
                      onClick={() => {
                        setChooseDate(chooseDate ? "" : "true");
                      }}
                    >
                      {chooseDate
                        ? "Click here to select the Date"
                        : `${
                            date ? date.toDateString() : "Please Select a Date"
                          }`}
                    </button>

                    {chooseDate && (
                      <Calendar
                        onChange={setDate}
                        value={date}
                        className={`${profilestyles.Calendar}`}
                      />
                    )}
                  </div>
                ) : (
                  <label
                    className="form-control"
                    style={{
                      height: 35,
                      width: "100%",
                      borderRadius: 20,
                      color: "lightgray",
                      fontSize: 16,
                      marginBottom: 50,

                      fontFamily: "sans-serif",
                    }}
                    readOnly
                  >
                    {values.DateOfBirth
                      ? values.DateOfBirth.substring(0, 10)
                      : "--Date-of-Birth--"}
                  </label>
                )}

                <div className="row mt-5 text-center">
                  <div className="col md-3">
                    <button
                      className={
                        "btn btn-primary" +
                        " " +
                        profilestyles["profile-button"]
                      }
                      type="button"
                      onClick={handleSubmit}
                    >
                      Save Profile
                    </button>
                  </div>

                  <div className="col-md-5">
                    {!editing ? (
                      <button
                        className={
                          "btn btn-primary" +
                          " " +
                          profilestyles["profile-button"]
                        }
                        onClick={() => {
                          setEditing(true);
                        }}
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <button
                        className={
                          "btn btn-primary" +
                          " " +
                          profilestyles["profile-button"]
                        }
                        onClick={() => {
                          setEditing(false);
                        }}
                      >
                        Cancel Changes
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center Hobbies">
                  <h3>Hobbies and Interests</h3>
                </div>
                <br />
                <div className="col-md-12">
                  <label className={profilestyles.labels}>Hobbies</label>
                  {editing ? (
                    <input
                      onChange={handleHobbiesInputChange}
                      className="form-control"
                      placeholder="Hobbies"
                      name="Hobbies"
                      value={values.Hobbies}
                    />
                  ) : (
                    <label
                      className="form-control"
                      style={{
                        height: 150,
                        width: "100%",
                        borderRadius: 20,
                        color: "lightgray",
                        fontSize: 16,
                        marginBottom: 50,
                        fontFamily: "sans-serif",
                      }}
                      readOnly
                    >
                      {values.Hobbies}
                    </label>
                  )}

                  {submitted && !values.Hobbies ? (
                    <span className={profilestyles.fontapply}>
                      Please enter your Hobbies
                    </span>
                  ) : null}
                </div>{" "}
                <br />
                <div className="col-md-12">
                  <label className={profilestyles.labels}>Interests</label>
                  {editing ? (
                    <textarea
                      onChange={handleInterestsInputChange}
                      className="form-control"
                      placeholder="additional Interests"
                      name="Interests"
                      rows="6"
                      value={values.Interests}
                    />
                  ) : (
                    <label
                      className="form-control"
                      style={{
                        height: 150,
                        width: "100%",
                        borderRadius: 20,
                        color: "lightgray",
                        fontSize: 16,
                        marginBottom: 50,

                        fontFamily: "sans-serif",
                      }}
                      readOnly
                    >
                      {values.Interests}
                    </label>
                  )}

                  {submitted && !values.Interests ? (
                    <span className={profilestyles.fontapply}>
                      Please enter your other Interests
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
