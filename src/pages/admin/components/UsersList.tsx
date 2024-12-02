import { Button, Table } from 'antd';
import { supabase } from '../../../shared/supabaseClient.tsx';
import { useEffect, useState } from 'react';

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
    await supabase.from('users').insert({ first_name:'Тарлн', last_name:'Назров' });
    // обновление страницы
    window.location.reload();
  }

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
      <Table pagination={false} dataSource={data} columns={columns} />
    </>
  );
}

export default UsersList;
