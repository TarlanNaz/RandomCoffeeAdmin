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
      try {
        const { data, error } = await supabase.from('users').select();
        if (error) throw error;
        if (data) {
          setData(data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, []);

  async function addUser() {
    try {
      const { error: insertError } = await supabase
        .from('users')
        .insert({ first_name: 'Что-нибудь', last_name: 'Кто-нибудь' });

      if (insertError) throw insertError;

      const { data, error: selectError } = await supabase.from('users').select();
      if (selectError) throw selectError;
      
      if (data) {
        setData(data);
      }
    } catch (error: any) {
      console.error('Error adding user:', error);
    }
  }

  const content = (
    <div>
      <Button type="primary" style={{ margin: 12 }}>удалить</Button>
      <Button type="primary">редактировать</Button>
    </div>
  );

  interface ColumnType {
    title: string;
    dataIndex?: string;
    key?: string;
    render?: (text: any, record: User) => JSX.Element;
  }

  const columns: ColumnType[] = [
    {
      title: 'Имя',
      dataIndex: 'first_name',
      key: 'first_name'
    },
    {
      title: 'Фамилия',
      dataIndex: 'last_name',
      key: 'last_name'
    },
    {
      title: 'Время создания',
      dataIndex: 'created_at',
      key: 'created_at'
    },
    {
      title: 'Время последнего изменения',
      dataIndex: 'updated_at',
      key: 'updated_at'
    },
    {
      title: 'Действия',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => console.log(record.id)}>Редактировать</Button>
          <Button>Удалить</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button onClick={() => addUser()} style={{ marginBottom: '15px' }}>
        Добавить пользователя
      </Button>
      <Table pagination={false} dataSource={data} columns={columns}>
        <Popover content={content} title="Title">
        </Popover>
      </Table>
    </>
  );
}

export default UsersList;
