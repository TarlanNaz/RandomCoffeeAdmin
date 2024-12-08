import { Button, Form, Input, message } from 'antd';
import type { FormProps } from 'antd';
import { supabase } from '../../../shared/supabaseClient';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

type FieldType = {
  email: string;
  password: string;
};

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Перенаправляем на главную только если есть сессия и мы на странице входа
      if (session && location.pathname === '/login') {
        navigate('/');
      }
    };
    checkSession();
  }, [location.pathname]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      
      if (error) {
        throw error;
      }
      
      message.success('Успешный вход!');
      navigate('/');
    } catch (error) {
      message.error('Неверный логин или пароль!');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
        <Form
          form={form}
          name="login"
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
              Вход в систему
            </h1>
          </div>

          <Form.Item<FieldType>
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

          <Form.Item<FieldType>
            name="password"
            rules={[
              { required: true, message: 'Пожалуйста, введите пароль' }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="Пароль"
              size="large"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: '12px' }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              size="large"
              style={{
                height: '46px',
                fontWeight: 500,
                fontSize: '16px'
              }}
            >
              Войти
            </Button>
          </Form.Item>

          <Button 
            block 
            size="large"
            onClick={() => navigate('/signup')}
            style={{
              height: '46px',
              fontWeight: 500,
              fontSize: '16px'
            }}
          >
            Зарегистрироваться
          </Button>
        </Form>
    </div>
  );
}

export default LoginForm;