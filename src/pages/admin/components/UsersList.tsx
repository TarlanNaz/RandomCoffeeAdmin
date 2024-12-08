import { Button, Table, Popover, Space } from 'antd';
import { supabase } from '../../../shared/supabaseClient.tsx';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
}

function UsersList() {
  const [data, setData] = useState<User[]>([]);

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

  function addUser() {
    return supabase
      .from('users')
      .insert({ first_name: 'Что-нибудь', last_name : 'Кто-нибудь'})
      .then(({ error }) => {
        console.log(error)
        if (!error) {
          return supabase.from('users').select()
        }
      })
      .then(({ data }) => {
        console.log(data);
        if (data) {
          setData(data);
        }
      });
}

    const content = (
    <div>
          <Button type="primary" style={{margin: 12} }>удалить</Button>
          
          <Button type="primary">редактировать</Button>
    </div>
    );

    interface ColumnType {
      title: string;
      dataIndex?: string;
      key: string;
      render?: (text: string, record: User) => JSX.Element;
    }

  const columns: ColumnType[] = [
    {
      title: 'Имя',
      dataIndex: 'first_name',
      key : 'first_name'
 
    },
    {
      title: 'Фамилия',
      dataIndex: 'last_name',
      key : 'last_name'


    },
    {
      title: 'Время создания',
      dataIndex: 'created_at',
      key : 'created_at'

    },
    {
      title: 'Время последнего изменения',
      dataIndex: 'updated_at',
      key : 'updated_at'
    },
    {
      title: 'Действия',
      render: (_, record) => (
      <Space size="middle">
        <Button onClick={() => console.log(record.id)}>Редактировать</Button>
        <Button>Удалить</Button>
      </Space>),
    },

      
  ];

  return (
    <>
      <Button onClick={() =>addUser()} style={{ marginBottom: '15px' }}>
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
