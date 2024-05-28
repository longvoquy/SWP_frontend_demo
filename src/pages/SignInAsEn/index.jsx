import { Button, Form, Input, notification } from "antd";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import SigninStyle from "./Signin.style";
import api from "../../api/http";
import useProtectRoute from "../../hook/user/useProtectRoute";
const clientGoogleId =
  "633795216418-nirmtba2ogtmj84i1om6mc7f8lhlkr4p.apps.googleusercontent.com";
  
const SignInAsEnterpriseScreen = () => {
  const navigate = useNavigate();
  useProtectRoute()
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId: clientGoogleId,
      });
    });
  });

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
  };

  const loginMutation = useMutation({
    mutationFn: (formData) => {
      return api.post("enterprise/login", formData);
    },
  });
  const reverifyMutation = useMutation({
    mutationFn: (formData) => {
      return api.post("enterprise/reverify", formData);
    },
  });
  const socialLoginMutation = useMutation({
    mutationFn: (formData) => {
      return api.post("enterprise/social", formData);
    },
  });

  const onfinish = (body) => {
    loginMutation.mutate(body, {
      onError(data) {
        if (data.response.data.message === "not_verify_yet") {
          reverifyMutation.mutate(
            { email: body.email },
            {
              onSuccess() {
                navigate(`/enterprise/verify?email=${body.email}`);
              },
            }
          );
        }
        notification.error({ message: data.response.data.message });
      },
    });
  };
  const responseGoogle = (response) => {
    const {
      name,
      googleId: sid,
      imageUrl: picture,
      email,
    } = response.profileObj;
    socialLoginMutation.mutate(
      { name, sid, picture, email },
      {
        onError() {
          notification.success({ message: "Can't login with google" });
        },
      }
    );
  };

  return (
    <SigninStyle>
      <div className="signup">
        <div className="image ">hello</div>
        <div className="signup_content ">
          <span className="signup_content_title">Sign In As Enterprise</span>
          <div className="social mt-3">
            <GoogleLogin
              className="social_button"
              buttonText="Continue with Google"
              clientId={clientGoogleId}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
          </div>
          <span>Or Email</span>
          <Form
            onFinish={onfinish}
            layout="vertical"
            {...formItemLayout}
            name="register"
            scrollToFirstError
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item className="right">
              <Link style={{ color: "blue" }} to="/enterprise/forgot-password">
                Forgot password
              </Link>
            </Form.Item>

            <Form.Item>
              {loginMutation.isPending ? (
                <Button loading style={{ textAlign: "center" }}>
                  Sign in
                </Button>
              ) : (
                <Button
                  size="large"
                  htmlType="submit"
                  style={{ textAlign: "center" }}
                >
                  Sign in
                </Button>
              )}
            </Form.Item>
            <Form.Item>
              <span>You dont have account? </span>{" "}
              <Link style={{ color: "blue" }} to={"/enterprise/register"}>
                Sign up
              </Link>
            </Form.Item>
            <Form.Item>
              <span>You are an Employee?  </span>{" "}
              <Link style={{ color: "blue" }} to={"/login"}>
                Login here
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </SigninStyle>
  );
};
export default SignInAsEnterpriseScreen;
