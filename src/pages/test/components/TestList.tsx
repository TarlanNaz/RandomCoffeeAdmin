import React from 'react';
import { Space, Table, Button, Modal, Input  } from 'antd';
import type { TableProps } from 'antd';
import { supabase } from '../../../shared/supabaseClient.tsx';
import { useEffect, useState } from 'react';

const Label: React.FC = () => (
  <>
    <Input size="large" placeholder="Введите Имя" />
    <br />
    <br />
    <Input size="large" placeholder="Введите Фамилию" />
    <br />
    <br />
    <Input size="large" placeholder="Введите возраст" />
  </>
);

async function addUser() {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([{
        first_name:'Тарлн', body:'Назров', age: '17'
      }])
 
    if (error) throw error
    return data
  } catch (e) {
    throw e
  } finally{
    window.location.reload();
  }
  
 }

const ModalUpdate = () =>{
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    addUser()
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <Button type="primary" onClick={showModal}>
        Обновить
      </Button>
      <Modal title="Обновить" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Label/>
      </Modal>
    </>
  );
};

const ModalDelete = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Удалить
      </Button>
      <Modal
        title="Вы уверены что хотите удалить?"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
      </Modal>
    </>
  );
};





function TestList(){

    


    interface DataType {
        key: string;
        name: string;
        age: number;
        address: string;
      }
    const [data , setData] = useState(new Array<DataType>());

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('users').select();
      console.log(data);
      if (data) {
        setData(data);
      }
    };
    fetchData();
  }, []); 


      
      const columns: TableProps<DataType>['columns'] = [
        {
          title: 'Name',
          dataIndex: 'first_name',
          key: 'fName',
        },
        {
          title: 'Фамилия',
          dataIndex: 'last_name',
          key: 'lName',
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
          render: (text) => <a>{text}</a>,
        },
      
        {
          title: 'Action',
          key: 'action',
          render: () => (
            <Space size="middle">
              <ModalUpdate />
              <ModalDelete />
            </Space>
          ),
        },
      ];
      

      return(
        <Table<DataType> columns={columns} dataSource={data} />
      )
      

}


export default TestList;