import { Button, Form, Input, message } from 'antd';
import { supabase } from '../../../shared/supabaseClient';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

type FieldType = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpList: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: FieldType) => {
    if (values.password !== values.confirmPassword) {
      message.error('Пароли не совпадают');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      if (data) {
        message.success('Регистрация успешна! Проверьте вашу почту для подтверждения.');
        navigate('/login');
      }
    } catch (error) {
      message.error(error.message || 'Ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #371005 0%, #371005 100%)'
    }}>
      <Form<FieldType>
        form={form}
        name="signup"
        style={{
          width: '100%',
          maxWidth: '400px',
          background: 'white',
          padding: '32px',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          margin: '20px'
        }}
        onFinish={onFinish}
        layout="vertical"
        size="large"
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ 
            fontSize: '24px', 
            margin: 0,
            color: '#1a1a1a',
            fontWeight: 600 
          }}>
            Регистрация
          </h1>
        </div>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Пожалуйста, введите email' },
            { type: 'email', message: 'Пожалуйста, введите корректный email' }
          ]}
        >
          <Input 
            prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="Email"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Пожалуйста, введите пароль' },
            { min: 6, message: 'Пароль должен быть не менее 6 символов' }
          ]}
        >
          <Input.Password 
            prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="Пароль"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: 'Пожалуйста, подтвердите пароль' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают'));
              },
            }),
          ]}
        >
          <Input.Password 
            prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="Подтвердите пароль"
            size="large"
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: '12px' }}>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            block 
            size="large"
            style={{
              height: '46px',
              fontWeight: 500,
              fontSize: '16px'
            }}
          >
            Зарегистрироваться
          </Button>
        </Form.Item>
        <Button 
          block 
          size="large"
          onClick={() => navigate('/login')}
          style={{
            height: '46px',
            fontWeight: 500,
            fontSize: '16px'
          }}
        >
          Уже есть аккаунт? Войти
        </Button>
      </Form>
    </div>
  );
};

export default SignUpList;