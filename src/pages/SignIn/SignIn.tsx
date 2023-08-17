import { Button, Form, Image, Input, Row, notification } from "antd";
import React, { useState, useEffect } from "react";
import logo from "../../assets/sanakilogo1.png";
import { styled } from "styled-components";
import {
  LoginCredentials,
  useGetUserQuery,
  useLoginMutation,
} from "../../redux/apis/apiUser";
import { AxiosResponse } from "axios";
import {
  ErrorResponse,
  LoginResponse,
  MessageResponse,
} from "../../interface/interface";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slice/userSlice";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const LoginBg = styled.div`
  height: 100vh;
  /* width: 100vw; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */

  .ant-image {
    margin: 2rem 0;
    width: 240px;
  }

  .ant-row form {
    background: #ffffff;
    box-shadow: 0px 4px 55px rgba(0, 0, 0, 0.07);
    border-radius: 16px;
    padding: 20px;
  }

  .ant-row .ant-form .ant-form-item {
    margin-bottom: 15px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  .h1 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
  }
`;

type FieldType = {
  username?: string;
  password?: string;
};
const handleSubmit = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

// interface Response {
//   data?: LoginResponse;
//   error?: FetchBaseQueryError | SerializedError;
// }
export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector<RootState>((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isSuccess, isError, error }] = useLoginMutation();
  const handleLogin = async () => {
    const dataLogin: LoginCredentials = {
      email: email,
      password: password,
    };

    const response: MessageResponse<LoginResponse> = await login(dataLogin);
    // console.log(response, response.error);

    if (response.data?.success) {
      localStorage.setItem("access_token", response.data?.AccessToken);
      notification.success({
        message: "Thành công",
        description: "Đăng nhập thành công",
      });
      navigate("/dashboard");
    }
    if (error) {
      notification.error({
        message: "Lỗi",
        description: `${JSON.stringify(error)}`,
      });
    }
  };

  return (
    <>
      <LoginBg>
        <Image src={logo} preview={false}>
          Image
        </Image>
        <Row justify="center">
          <Form
            name="basic"
            layout="vertical"
            style={{
              width: 400,
              margin: 32,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleLogin}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Title>
              <h1>Sign In</h1>
              <p>Sign in with your email address and password</p>
            </Title>

            <Form.Item<FieldType>
              label="Email"
              name="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input your Email!",
                },
                { whitespace: false },
              ]}
            >
              <Input
                placeholder="Enter email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                // {
                //   pattern: new RegExp(
                //     /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/
                //   ),
                //   message:
                //     " Password should be 6-20 characters and include at least 1 letter, 1 number and 1 special character!",
                // },
              ]}
            >
              <Input.Password
                placeholder="Enter password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <p style={{ marginLeft: "auto" }}>Forget password?</p>

            <Form.Item
              wrapperCol={{
                // offset: 8,
                span: 16,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: 360, marginTop: 10 }}
                // onClick={handleLogin}
              >
                Login
              </Button>
            </Form.Item>

            <p>Creact Account</p>
          </Form>
        </Row>
      </LoginBg>
    </>
  );
};
