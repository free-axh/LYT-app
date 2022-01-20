import { memo } from 'react';
import Table from '@/components/table';

const Apply = memo(() => {
  const columns = [
    {
      title: '申请好物',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as 'center',
    },
    {
      title: '申请人',
      dataIndex: 'age',
      key: 'age',
      align: 'center' as 'center',
    },
    {
      title: '联系方式',
      dataIndex: 'address',
      key: 'address',
      align: 'center' as 'center',
    },
    {
      title: '分类',
      key: 'tags',
      dataIndex: 'tags',
      align: 'center' as 'center',
    },
    {
      title: '申请时间',
      key: 'action',
      dataIndex: 'action',
      align: 'center' as 'center',
    },
  ];

  const data: any[] = [];
  return <Table columns={columns} dataSource={data} search />;
});

export default Apply;
