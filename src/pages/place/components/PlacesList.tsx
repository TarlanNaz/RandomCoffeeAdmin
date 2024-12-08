import { Button, Table } from 'antd';
import { supabase } from '../../../shared/supabaseClient';
import { useEffect, useState } from 'react';
import React from 'react';

function PlacesList() {
  const [place, setPlace] = useState(new Array<Object>());

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('places').select();
      console.log(data);
      if (data) {
        setPlace(data);
      }
    };
    fetchData();
  }, []);



  function addPlace() {
    return supabase
      .from('places')
      .insert({title : 'Кто-нибудь', location: 'Point(1 4)', })
      .then(({ error }) => {
        console.log(error)
        if (!error) {
          return supabase.from('places').select()
        }
        throw new Error(error.details)
      })
      .then(({ data }) => {
        console.log(data);
        if (data) {
          setPlace(data);
        }
      })
      .catch((err) => {
        console.log(err)
      });
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
      <Table pagination={false} dataSource={place} columns={columns} />
    </>
  );
}

export default PlacesList;
