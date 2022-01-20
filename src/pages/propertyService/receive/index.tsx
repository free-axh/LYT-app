import { memo } from 'react';
import Table from '@/components/table';

const Receive = memo(() => {
  const columns = [
    {
      title: '物品',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as 'center',
    },
    {
      title: '领用时间',
      dataIndex: 'age',
      key: 'age',
      align: 'center' as 'center',
    },
    {
      title: '领用人姓名',
      dataIndex: 'address',
      key: 'address',
      align: 'center' as 'center',
    },
    {
      title: '联系方式',
      key: 'tags',
      dataIndex: 'tags',
      align: 'center' as 'center',
    },
    {
      title: '状态',
      key: 'action',
      dataIndex: 'action',
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

export default Receive;
