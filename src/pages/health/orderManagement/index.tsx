import { memo, useEffect, useState } from 'react';
import { Space, Tag, message, Popconfirm, Button } from 'antd';
import Table from '@/components/table';
import { getDate } from '@/util/function';
import { PlusOutlined } from '@ant-design/icons';
// import SortModal from './sortModal';
import { getOrderList, detailOrderList } from '@/util/servers';
import Detail from './detail';

export default memo(() => {
  const [data, setData] = useState(undefined);
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [modalFlag, setModalFlag] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);
  const [queryValue, setQueryValue] = useState('');
  const [current, setCurrent] = useState(1);

  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      align: 'center' as 'center',
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center' as 'center',
    },
    {
      title: '下单用户',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center' as 'center',
    },
    {
      title: '订单金额',
      dataIndex: 'money',
      key: 'money',
      align: 'center' as 'center',
    },
    {
      title: '状态',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      align: 'center' as 'center',
      render: (t: number) => {
        switch (t) {
          case 0:
            return <Tag color="orange">未付款</Tag>;
          case 1:
            return <Tag color="orange">待确认</Tag>;
          case 2:
            return <Tag color="green">已完成</Tag>;
          case 3:
            return <Tag color="red">已关闭</Tag>;
        }
      },
    },
    {
      title: '操作',
      key: 'handle',
      dataIndex: 'handle',
      width: 400,
      align: 'center' as 'center',
      render: (text: any, record: any) => {
        function detailHandle(r: any) {
          detailOrderList({ id: r.id }).then((res) => {
            if (res.status === 200 && res?.data && res?.data.code === 0) {
              const data = Object.assign({}, r, { detail: res.data.data });
              setDetailData(data);
              setDetailVisible(true);
            }
          });
        }

        return (
          <Space size="middle">
            <a onClick={() => detailHandle(record)}>详情</a>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    setData(undefined);
    const options = Object.assign({}, pages, {
      params: { userName: queryValue },
    });
    getOrderList(options).then((data) => {
      if (data.status === 200) {
        setData(data?.data?.data?.records);
        setTotal(data?.data?.data?.total);
      }
    });
  }, [pages]);

  function reload() {
    setData(undefined);
  }

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

  function addSort() {
    setModalFlag(true);
  }

  function onRecipeModalClose() {
    setModalFlag(false);
  }

  function onDetailClose() {
    setDetailVisible(false);
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        total={total}
        search
        current={current}
        onQuery={onQuery}
        onPageChange={onPageChange}
      />
      <Detail
        visible={detailVisible}
        onDetailClose={onDetailClose}
        data={detailData}
      />
    </>
  );
});
