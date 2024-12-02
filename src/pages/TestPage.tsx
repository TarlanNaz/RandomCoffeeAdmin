import React from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
    

const TestPage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

const navigate = useNavigate();


  


  
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          
          console.log(collapsed, type);
        }}
        
      >
        <div className="demo-logo-vertical" />
        <Menu
         //onClick={(e) => console.log(e)}
         theme="dark"
          mode="inline"
          defaultSelectedKeys={['/users']}
          items={[
            {
              key: '/users',
              label: 'users',
              
            },
            {
              key: '/topics',
              label: 'topic',
            },
            {
              key: '/places',
              label: 'place',
              
            },
          ]}
        /> 
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} >
           <div 
           style={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            padding: '15px',
            columnGap: '15px',
          }}>
              </div>
              </Header>
        <Content style={{ margin: '24px 16px 0' , height : '100vh'}}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            
             m jnbbbybub
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TestPage;