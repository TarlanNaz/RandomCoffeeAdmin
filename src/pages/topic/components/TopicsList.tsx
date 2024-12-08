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

  function addTopic() {
    
    return supabase
      .from("topics")
      .insert({ title: "Что-нет" })
      .then(({ error }) => {
        console.log(error)
        if (!error) {
          return supabase.from('topics').select()
        }
      })
      .then(({ data }) => {
        console.log(data);
        if (data) {
          setData(data);
        }
      });
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
      <Button onClick={() => addTopic()} style={{ marginBottom: '15px' }}>
        Добавить интерес
      </Button>
      <Table pagination={false} dataSource={data} columns={columns} />
    </>
  );
}

export default TopicsList;
