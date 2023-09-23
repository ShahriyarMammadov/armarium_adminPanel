import React, { useState } from "react";
import "./index.scss";
import axios from "axios";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (message, type) => {
    api[type]({
      message: message,
    });
  };

  const login = async (data) => {
    try {
      setLoading(true);
      let axiosData = await axios.post(
        `https://armariumbackend-production.up.railway.app/auth/signIn`,
        data,
        {
          withCredentials: true,
        }
      );
      setLoading(false);

      if (axiosData?.data?.created) {
        if (axiosData?.data?.data?.role === "admin") {
          openNotificationWithIcon(data?.data?.message, "success");

          sessionStorage.setItem("id", axiosData?.data?.data?._id);

          navigate(`/admin/adminData/${axiosData?.data?.data?._id}`);
        } else {
          openNotificationWithIcon("error");
        }
      } else {
        openNotificationWithIcon(
          data?.data?.message?.email
            ? data?.data?.errors?.email
            : data?.data?.errors?.password,
          "error"
        );
      }
    } catch (error) {
      console.log("catch", error);
      openNotificationWithIcon("error", "server error");
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={login}
        disabled={loading}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
