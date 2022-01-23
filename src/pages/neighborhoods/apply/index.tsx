import { memo, useEffect, useState } from 'react';
import Table from '@/components/table';
import { getGoodsList } from '@/util/servers';

const Apply = memo(() => {
  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
  });

  const [data, setData] = useState(undefined);

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

  useEffect(() => {
    getGoodsList(pages).then((res) => {
      if (res.status === 200) {
        setData(res.data.data);
      }
    });
  }, [pages]);

  function onQuery(value: string) {
    setData(undefined);
    const options = Object.assign({}, pages, { params: { name: value } });
    getGoodsList(options).then((data) => {
      if (data.status === 200) {
        setData(data.data.data);
      }
    });
  }

  return <Table columns={columns} dataSource={data} search onQuery={onQuery} />;
});

export default Apply;
