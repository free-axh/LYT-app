import { memo } from 'react';
import Table from '@/components/table';

const Register = memo(() => {
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

  const data: any[] = [];
  return <Table columns={columns} dataSource={data} search />;
});

export default Register;
