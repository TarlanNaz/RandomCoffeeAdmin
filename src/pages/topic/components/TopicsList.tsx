import { Button, Table } from 'antd';
import { supabase } from '../../../shared/supabaseClient.tsx';
import { useEffect, useState } from 'react';

function TopicsList() {
  const [data, setData] = useState(new Array<Object>());

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('topics').select();
      console.log(data);
      if (data) {
        setData(data);
      }
    };
    fetchData();
  }, []);

  async function addTopic() {
    await supabase.from('topics').insert({ title: 'Рисование' });
    // обновление страницы
    window.location.reload();
  }

  const columns = [
    {
      title: 'Название',
      dataIndex: 'title',
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
      <Button onClick={addTopic} style={{ marginBottom: '15px' }}>
        Добавить интерес
      </Button>
      <Table pagination={false} dataSource={data} columns={columns} />
    </>
  );
}

export default TopicsList;
