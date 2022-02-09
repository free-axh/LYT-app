import { memo, useEffect, useState } from 'react';
import Table from '@/components/table';
import { getGoodsList } from '@/util/servers';

const Apply = memo(() => {
  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
  });

  const [data, setData] = useState(undefined);
  const [total, setTotal] = useState(0);
  const [queryValue, setQueryValue] = useState('');
  const [current, setCurrent] = useState(1);

  const columns = [
    {
      title: '申请好物',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as 'center',
    },
    {
      title: '申请人',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center' as 'center',
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center' as 'center',
    },
    {
      title: '分类',
      key: 'typeName',
      dataIndex: 'typeName',
      align: 'center' as 'center',
    },
    {
      title: '申请时间',
      key: 'startTime',
      dataIndex: 'startTime',
      align: 'center' as 'center',
    },
  ];

  useEffect(() => {
    setData(undefined);
    const options = Object.assign({}, pages, { name: queryValue });
    getGoodsList(options).then((res) => {
      if (res.status === 200) {
        setData(res?.data?.data?.list);
        setTotal(res?.data?.data?.total);
      }
    });
  }, [pages, queryValue]);

  function onQuery(value: string) {
    setQueryValue(value);
    setPages({
      pageNo: 1,
      pageSize: 10,
    });
    setCurrent(1);
  }

  function onPageChange(page: number, pageSize: number) {
    setPages({
      pageNo: page,
      pageSize: pageSize,
    });
    setCurrent(page);
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      search
      current={current}
      total={total}
      onQuery={onQuery}
      onPageChange={onPageChange}
    />
  );
});

export default Apply;
