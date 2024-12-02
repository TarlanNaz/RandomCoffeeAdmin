import React from 'react';
import { Space, Table,Button } from 'antd';
import type { TableProps } from 'antd';
//import { supabase } from '../../shared/supabaseClient.tsx';

interface DataType {
  key: string;
  name: string;
  age: number;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Имя',
    dataIndex: 'first_name',
    key: '/name',
  },
  {
    title: 'Фамилия',
    dataIndex: 'last_name',
    key: '/places',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button>Invite {record.name}</Button>
        <Button>Delete</Button>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
  },
];



const TestPage: React.FC = () => <Table<DataType> columns={columns} dataSource={data} />;

export default TestPage;