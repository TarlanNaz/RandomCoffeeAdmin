import { Button, Table } from 'antd';
import { supabase } from '../../../shared/supabaseClient.tsx';
import { useEffect, useState } from 'react';

interface Topic {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

function TopicsList() {
  const [data, setData] = useState<Topic[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('topics').select();
        if (error) throw error;
        if (data) {
          setData(data);
        }
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };
    fetchData();
  }, []);

  async function addTopic() {
    try {
      const { error } = await supabase
        .from("topics")
        .insert({ title: "Что-нет" });
      
      if (error) throw error;

      const { data, error: fetchError } = await supabase.from('topics').select();
      if (fetchError) throw fetchError;
      
      if (data) {
        setData(data);
      }
    } catch (error) {
      console.error('Error adding topic:', error);
    }
  }

  const columns = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title'
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
