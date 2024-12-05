import { Button, Table, Popover, Space } from 'antd';
import { supabase } from '../../../shared/supabaseClient.tsx';
import { useEffect, useState } from 'react';
import React from "react";


function UsersList() {
  const [data, setData] = useState(new Array<Object>());

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('users').select();
      console.log(data);
      if (data) {
        setData(data);
      }
    };
    fetchData();
  }, []);

 
  async function deleteUser() {
    
    
  }
  async function addUser() {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{
          first_name:'Тарлн', last_name:'Назров', age :12 
        }])
   
      if (error) throw error
      return data
    } catch (e) {
      throw e
    } finally{
      window.location.reload();
    }
    
   }

    const content = (
    <div>
          <Button type="primary" style={{margin: 12} }>удалить</Button>
          
          <Button type="primary">редактировать</Button>
    </div>
    );

    interface DataType {
      title: string;
      dataIndex : string;
      key: string;
    }

  const columns: Array<DataType> = [
    {
      title: 'Имя',
      dataIndex: 'first_name',
      key : 'first_name',
    },
    {
      title: 'Фамилия',
      dataIndex: 'last_name',
      key : 'last_name',

    },
    {
      title: 'Возраст',
      dataIndex: 'age',
      key : 'age',

    },
    {
      title: 'Время создания',
      dataIndex: 'created_at',
      key : 'created_at',

    },
    {
      title: 'Время последнего изменения',
      dataIndex: 'updated_at',
      key : 'updated_at',

    },
    {
      title: 'Дейсвия',
      render:() => (
      <Space size="middle">
        <Button>Редактировать</Button>
        <Button>Удалить</Button>
      </Space>),
    },

      
  ];

  return (
    <>
      <Button onClick={addUser} style={{ marginBottom: '15px' }}>
        Добавить пользователя
      </Button>
      <Table pagination={false} dataSource={data} columns={columns} >
        <Popover content={content} title="Title">
        </Popover>
      </Table>
    </>
  );
}

export default UsersList;
