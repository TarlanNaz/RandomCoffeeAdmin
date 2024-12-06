import React from 'react';
import { Space, Table, Button } from 'antd';
import type { TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { supabase } from '../../../shared/supabaseClient.tsx';


function TestList(){
const [users, setUsers] = useState(new Array<Object>());

useEffect(() => {
  const fetchData = async () => {
    const { data } = await supabase.from('users').select();
    console.log(data);
    if (data) {
      setUsers(data);
    }
  };
  fetchData();
}, []); 

async function AddUser(){
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
        setUsers(data);
      }
    });
}
interface DataType {
  key: React.Key;
  first_name: string;
  last_name : string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title : 'ID',
    dataIndex : 'id',
  },
  {
    title: 'name',
    dataIndex: 'first_name',
  },
  {
    title: 'last name',
    dataIndex: 'last_name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Редактировать</a>
        <a>Удалить {record.first_name}</a>
      </Space>
    ),
  },
];

return(
  <>
  <Button onClick={() =>AddUser()} style={{ marginBottom: '15px' }}>
  Добавить пользователя
  </Button> 
  <Table<DataType> columns={columns} dataSource={users} />
  </>
  )

}
export default TestList;