import react, { memo, useState } from 'react';
import { history } from 'umi';
import './index.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Icon from '../../../public/image/icon.svg';
import { PoweroffOutlined } from '@ant-design/icons';

const Login = memo((props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onFinish = (values: any) => {
    const { password, username } = values;
    setLoading(true);
    setError(false);
    if (username === 'admin' && password === '123456') {
      setTimeout(() => {
        history.replace('/neighborhoods/thing');
        setLoading(false);
      }, 1500);
    } else {
      setTimeout(() => {
        setLoading(false);
        setError(true);
      }, 1000);
    }
  };

  return (
    <div className="login">
      <div className="login-header">
        <span className="login-logo">
          <img src={Icon} />
        </span>
        <span className="login-title">康田智慧服务</span>
      </div>
      <div className="login-main">
        <span
          style={{
            color: 'red',
            marginBottom: '5px',
            display: 'block',
            opacity: error ? 1 : 0,
          }}
        >
          账号密码错误，请重新输入
        </span>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              icon={loading && <PoweroffOutlined />}
              loading={loading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});

export default Login;
