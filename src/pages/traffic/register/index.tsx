import { memo, useEffect, useState } from 'react';
import Table from '@/components/table';
import { receiveList, registerList } from '@/util/servers';

const Register = memo(() => {
  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const columns = [
    {
      title: '车牌号',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as 'center',
    },
    {
      title: '登记时间',
      dataIndex: 'age',
      key: 'age',
      align: 'center' as 'center',
    },
    {
      title: '登记人',
      dataIndex: 'address',
      key: 'address',
      align: 'center' as 'center',
    },
    {
      title: '违章描述',
      key: 'tags',
      dataIndex: 'tags',
      align: 'center' as 'center',
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      align: 'center' as 'center',
    },
  ];

  useEffect(() => {
    receiveList(pages).then((data) => {
      console.log('1111111111111', data);
    });
  }, [pages]);

  const data: any[] = [];
  return <Table columns={columns} dataSource={data} search />;
});

export default Register;
