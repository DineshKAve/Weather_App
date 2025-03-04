import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Form, Input, Col, Row, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./login.css";

const Login = () => {
    const navigate = useNavigate();
    const { Text, Title } = Typography;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errormsgs, setErrormgs] = useState(false);
    const [inCorrectError, setInCorrectError] = useState("");

    // Login Form Method Start 
    const onFinish = async (values) => {
        setErrormgs(false);
        console.log('Success:', values);
        if (values.username != '' && values.password == 'admin@123') {
            setErrormgs(false);
            localStorage.setItem("userId", "1");
            localStorage.setItem("username", values.username);
            navigate('/weather');
        } else {
            setErrormgs(true);
            setInCorrectError('Invalid username or password');
        }
    };
    // Login Form Method End 


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className="login_content_body">
                <div className="login_content_card">
                    <Form name="basic"
                        style={{
                            maxWidth: 300,
                            padding: 23
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Title level={4} style={{ margin: "0px", color: '#3194e9' }}>Sign In</Title>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ paddingTop: '15px' }}>
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your username!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Username" value={username}
                                        onChange={(e) => setUsername(e.target.value)} prefix={<UserOutlined />} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Password" value={password}
                                        onChange={(e) => setPassword(e.target.value)} prefix={<LockOutlined />} />
                                </Form.Item>
                            </Col>
                            {errormsgs == true && <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Text type="danger">{inCorrectError}</Text>
                            </Col>}
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ paddingTop: '5px' }}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                        Login
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Login;



