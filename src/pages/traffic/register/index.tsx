import { memo, useEffect, useState } from 'react';
import Table from '@/components/table';
import { registerList } from '@/util/servers';
import Detail from './detail';

const Register = memo(() => {
  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const [data, setData] = useState(undefined);
  const [total, setTotal] = useState(0);
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailData, setDetailData] = useState(undefined);
  const [queryValue, setQueryValue] = useState('');
  const [current, setCurrent] = useState(1);

  const columns = [
    {
      title: '车牌号',
      dataIndex: 'carNumber',
      key: 'carNumber',
      align: 'center' as 'center',
    },
    {
      title: '登记时间',
      dataIndex: 'violationTime',
      key: 'violationTime',
      align: 'center' as 'center',
    },
    {
      title: '登记人',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center' as 'center',
    },
    {
      title: '违章描述',
      key: 'violationDesc',
      dataIndex: 'violationDesc',
      align: 'center' as 'center',
    },
    {
      title: '操作',
      key: 'handle',
      dataIndex: 'handle',
      align: 'center' as 'center',
      render: (text: any, record: any) => {
        function detailHandle(record: any) {
          setDetailVisible(true);
          registerList({
            pageNo: 1,
            pageSize: 10,
            params: { id: record.id },
          }).then((res) => {
            if (res.status === 200) {
              setDetailData(res?.data?.data?.records?.[0]);
            }
          });
        }

        return <a onClick={() => detailHandle(record)}>详情</a>;
      },
    },
  ];

  useEffect(() => {
    setData(undefined);
    const options = Object.assign({}, pages, {
      params: { carNumber: queryValue },
    });
    registerList(options).then((res) => {
      if (res.status === 200) {
        setData(res?.data?.data?.records);
        setTotal(res?.data?.data?.total);
      }
    });
  }, [pages]);

  function onDetailClose() {
    setDetailVisible(false);
  }

  // 模糊查询
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
    <>
      <Table
        columns={columns}
        dataSource={data}
        search
        current={current}
        total={total}
        onQuery={onQuery}
        onPageChange={onPageChange}
      />
      <Detail
        visible={detailVisible}
        data={detailData}
        onDetailClose={onDetailClose}
      />
    </>
  );
});

export default Register;
