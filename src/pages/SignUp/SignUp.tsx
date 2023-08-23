import { Button, Form, Image, Input, Row, notification } from "antd";
import React, { useState, useEffect } from "react";
import logo from "../../assets/sanakilogo1.png";
import { styled } from "styled-components";
import { useRegisterMutation } from "../../redux/apis/apiUser";
import { MessageResponse } from "../../interface/interface";
import { useNavigate } from "react-router-dom";
import { handleResponse } from "../../utility/HandleResponse";
const LoginBg = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

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

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regiser, { isError }] = useRegisterMutation();
  const navigate = useNavigate();
  const handleSubmit = async (values: any) => {
    regiser(values).then((response: MessageResponse<any>) => {
      const { messageResponse, isError } = handleResponse(response);
      console.log(response, response.error, messageResponse);

      if (isError) {
        notification.error({
          message: messageResponse,
          description: "Có lỗi xảy ra, vui lòng thử lại",
        });
      } else {
        notification.success({
          message: "Thành công",
          description: "Đăng ký thành công thành công",
        });
        navigate("/sign-in");
      }
    });
    if (!isError) {
    }
  };
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      navigate("/");
    }
  }, []);
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
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Title>
              <h1>Sign Up</h1>
              {/* <p>Sign in with your email address and password</p> */}
            </Title>

            <Form.Item<FieldType>
              label="Email"
              name="email"
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
              label="Full name"
              name="fullname"
              rules={[
                {
                  required: true,
                  message: "Please input your fullname!",
                },
                { whitespace: false },
              ]}
            >
              <Input
                placeholder="Enter fullname"
                id="fullname"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
                { whitespace: false },
              ]}
            >
              <Input
                placeholder="Enter address"
                id="addresss"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone!",
                },
                { whitespace: false },
              ]}
            >
              <Input
                placeholder="Enter phone"
                id="phone"
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
                {
                  pattern:
                    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,20}$/,
                  message:
                    "Password should be 5-20 characters and include at least 1 letter, 1 number and 1 special character!",
                },
              ]}
            >
              <Input.Password
                placeholder="Enter password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="Confirm Password"
              // name="confirm_password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  validator(_, value) {
                    if (!value || password === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered does not match."
                    );
                  },
                },
                {
                  pattern:
                    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,20}$/,
                  message:
                    "Password should be 5-20 characters and include at least 1 letter, 1 number and 1 special character!",
                },
              ]}
            >
              <Input.Password
                placeholder="Enter password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

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
                // onClick={() => handleSubmit}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </LoginBg>
    </>
  );
};
