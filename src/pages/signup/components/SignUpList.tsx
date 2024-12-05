import { Button, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { supabase } from '../../../shared/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import  React  from 'react';


const SignUpList = ({ text }: { text: string }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((e.target as HTMLInputElement).value);
  }

  return (
    <div>   
      <Input placeholder={text} value={inputValue} onChange={handleChange} />
      <button onClick={()=>{console.log(inputValue);
      }}></button>
    </div>
  )
}



type FieldType = {
    email: string;
    password: string;
  };
  
  const SignUpForm = () => {
    const navigate = useNavigate();
  
    const[formData,setFormData] = useState({
    name:'',email:'', password:''
    })
  
    return (
      <Form
        name="singup"
        style={{
          minWidth: 500,
          background: 'white',
          padding: '20px',
          borderRadius: '16px',
        }}
        initialValues={{ remember: true }}
        onChange ={handleChange}
      >
        <Form.Item<FieldType>
          label="Электронная почта"
          name="email"
          rules={[{ required: true, message: 'Введите Email!' }]}
          <SignUpList text = 'email'/>
        >
          <Input />
        </Form.Item>
  
        <Form.Item<FieldType>
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введите пароль!' }]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              columnGap: '5px',
            }}
          >
            <Button style={{ width: '50%' }} type="primary" htmlType="submit">
              Уже есть аккаунт?
            </Button>
            <Button style={{ width: '50%' }} onClick={}>
              Зарегистрироваться
            </Button>
          </div>
        </Form.Item>
      </Form>
    );
  }
  
  export default LoginForm;
  