import { memo } from 'react';
import Table from '@/components/table';

const Management = memo(() => {
  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as 'center',
    },
    {
      title: '排序',
      dataIndex: 'age',
      key: 'age',
      align: 'center' as 'center',
    },
    {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      align: 'center' as 'center',
    },
  ];

  const data: any[] = [];
  return <Table columns={columns} dataSource={data} search />;
});

export default Management;
