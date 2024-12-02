import { Button, Table } from 'antd';
import { supabase } from '../../../shared/supabaseClient';
import { useEffect, useState } from 'react';

function PlacesList() {
  const [data, setData] = useState(new Array<Object>());

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('places').select();
      console.log(data);
      if (data) {
        setData(data);
      }
    };
    fetchData();
  }, []);

  async function addPlace() {
    await supabase.from('places').insert({ title: 'Мой дом', location: 'POINT(3,5)' });
    // обновление страницы
    window.location.reload();
  }

  const columns = [
    {
      title: 'Место',
      dataIndex: 'title',
    },
    {
        title: 'Местоположение',
        dataIndex:'location',
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
      <Button onClick={addPlace} style={{ marginBottom: '15px' }}>
        Добавить место
      </Button>
      <Table pagination={false} dataSource={data} columns={columns} />
    </>
  );
}

export default PlacesList;
