import { Button, Table, Popover } from 'antd';
import { supabase } from '../../../shared/supabaseClient.tsx';
import { useEffect, useState } from 'react';
import React from "react";
import { NONAME } from "dns";


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

 

  async function addUser() {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{
          first_name:'Тарлн', body:'Назров', author_id: '17'
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



  const columns = [
    {
      title: 'Имя',
      dataIndex: 'first_name',
    },
    {
        title: 'Фамилия',
        dataIndex: 'last_name',

    },
    {
      title: 'Возраст',
      dataIndex: 'age',

    },
    {
      title: 'Время создания',
      dataIndex: 'created_at',

    },
    {
      title: 'Время последнего изменения',
      dataIndex: 'updated_at',

    },

      
  ];

  return (
    <>
      <Button onClick={addUser} style={{ marginBottom: '15px' }}>
        Добавить пользователя
      </Button>
      <Table pagination={false} dataSource={data} columns={columns} >
        <Popover content={content} title="Title">
          <Button type="primary">что можно сделать</Button>
        </Popover>
      </Table>
    </>
  );
}

export default UsersList;
