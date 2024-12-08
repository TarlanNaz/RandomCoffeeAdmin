import { Button, Table } from 'antd';
import { supabase } from '../../../shared/supabaseClient';
import { useEffect, useState } from 'react';

interface Place {
  id: number;
  title: string;
  location: string;
}

function PlacesList() {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('places').select();
        if (error) throw error;
        if (data) {
          setPlaces(data);
        }
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };
    fetchData();
  }, []);

  async function addPlace() {
    try {
      const { error } = await supabase
        .from('places')
        .insert({title: 'Кто-нибудь', location: 'Point(1 4)'});
      
      if (error) throw error;

      const { data, error: fetchError } = await supabase.from('places').select();
      if (fetchError) throw fetchError;
      
      if (data) {
        setPlaces(data);
      }
    } catch (error) {
      console.error('Error adding place:', error);
    }
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
      <Button onClick={() => addPlace()} style={{ marginBottom: '15px' }}>
        Добавить место
      </Button>
      <Table pagination={false} dataSource={places} columns={columns} />
    </>
  );
}

export default PlacesList;
