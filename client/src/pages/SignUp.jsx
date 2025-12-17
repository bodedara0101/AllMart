import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [file, setfile] = useState("");

  const navigate = useNavigate();

  const signUpHandler = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const formDataToSend = new FormData();
      console.log(file);
      formDataToSend.append("file", file); // Add the file
      formDataToSend.append("username", formData.username); // Add username
      formDataToSend.append("password", formData.password); // Add password

      const response = await fetch("http://localhost:8000/users/signup", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      console.log(data);
      {
        data.token && localStorage.setItem("token", data.token);
      }
      {
        data.fuser && localStorage.setItem("user", JSON.stringify(data.fuser));
      }

      if (response.status === 200) {
        navigate("/profile");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledWrapper className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form className="form" id="signupForm" onSubmit={signUpHandler}>
        <p className="title">Register </p>
        <p className="message">Signup now and get full access to our app. </p>
        <div className="flex">
          <label>
            <input
              className="input"
              onChange={(e) => (formData.username = e.target.value)}
              name="firstname"
              type="text"
              required
            />
            <span>Firstname</span>
          </label>
          <label>
            <input className="input" name="lastname" type="text" required />
            <span>Lastname</span>
          </label>
        </div>
        <label>
          <input className="input" name="email" type="email" required />
          <span>Email</span>
        </label>
        <label>
          <input
            className="input"
            onChange={(e) => (formData.password = e.target.value)}
            name="password"
            type="password"
            required
          />
          <span>Password</span>
        </label>
        <label>
          <input
            className="input"
            name="confirmpassword"
            type="password"
            required
          />
          <span>Confirm password</span>
        </label>
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt=""
            className="w-[200px] hover: cursor-zoom-in "
          />
        )}
        <label>
          <input
            className="image"
            name="file"
            type="file"
            onChange={(e) => {
              setfile(e.target.files[0]);
            }}
            required
          />
        </label>
        <button className="submit" type="submit">
          Submit
        </button>
        <p className="signin">
          Already have an acount ? <Link to="/login">Signin</Link>{" "}
        </p>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
    padding: 20px;
    border-radius: 20px;
    position: relative;
    background-color: #1a1a1a;
    color: #fff;
    border: 1px solid #333;
  }

  .title {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
    color: #00bfff;
  }

  .title::before {
    width: 18px;
    height: 18px;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .title::before,
  .title::after {
    position: absolute;
    content: " ";
    height: 20px;
    width: 20px;
    border-radius: 50%;
    left: 0px;
    background-color: #00bfff;
  }

  .message,
  .signin {
    font-size: 14.5px;
    color: rgba(255, 255, 255, 0.7);
  }

  .signin {
    text-align: center;
  }

  .signin a:hover {
    text-decoration: underline royalblue;
  }

  .signin a {
    color: #00bfff;
  }

  .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }

  .form label {
    position: relative;
  }

  .form label .input {
    background-color: #333;
    color: #fff;
    width: 100%;
    padding: 20px 05px 05px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form label .input + span {
    color: rgba(255, 255, 255, 0.5);
    position: absolute;
    left: 10px;
    top: 0px;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 12.5px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,
  .form label .input:valid + span {
    color: #00bfff;
    top: 0px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .input {
    font-size: medium;
  }

  .submit {
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: 0.3s ease;
    background-color: #00bfff;
  }

  .submit:hover {
    background-color: #00bfff96;
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }
`;

export default SignUpForm;
