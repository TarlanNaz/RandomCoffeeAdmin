import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: number;
  first_name: string;
  last_name : string;
  age: number;
  address: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'name',
    dataIndex: 'first_anme',
    key: 'name',
  },
  {
    title: 'last name',
    dataIndex: 'last_name',
    key: 'last',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.first_name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];






const data: DataType[] = [
  {
    key: 1,
    first_name: 'John',
    last_name : '12312312',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: 2,
    first_name: 'Jim Green',
    last_name: '123123',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: 3,
    first_name: 'Joe Black',
    last_name : '1213',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
];

const App: React.FC = () => <Table<DataType> columns={columns} dataSource={data} />;

export default App;