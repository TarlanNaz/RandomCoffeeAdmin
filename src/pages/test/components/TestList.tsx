import { Button, Table } from 'antd';
import { supabase } from '../../../shared/supabaseClient.tsx';
import { useEffect, useState } from 'react';
import React from 'react';

function TopicsList() {
  const [data, setData] = useState(new Array<Object>());
  const [value,setValue] = useState('');
/*
  async function handleChange(event : any){
    const {error} = await supabase.from().insert()
if (!error) {
  setValue(event.target.value)
}

    

  }
*/
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
    <Input value = {value} onClick = {handleChange}/>
      <Button onClick={addTopic} style={{ marginBottom: '15px' }}>
        Добавить интерес
      </Button>
      <Table pagination={false} dataSource={data} columns={columns} />
    </>
  );
}

export default TopicsList;
