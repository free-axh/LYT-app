import { memo } from 'react';
import Table from '@/components/table';

const Receive = memo(() => {
  const columns = [
    {
      title: '投放地点',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as 'center',
    },
    {
      title: '投放时间',
      dataIndex: 'age',
      key: 'age',
      align: 'center' as 'center',
    },
    {
      title: '投放人',
      dataIndex: 'address',
      key: 'address',
      align: 'center' as 'center',
    },
    {
      title: '账号',
      key: 'tags',
      dataIndex: 'tags',
      align: 'center' as 'center',
    },
    {
      title: '获取积分',
      key: 'action',
      dataIndex: 'action',
      align: 'center' as 'center',
    },
  ];

  const data: any[] = [];
  return <Table columns={columns} dataSource={data} search />;
});

export default Receive;
