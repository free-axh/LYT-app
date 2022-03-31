import { memo, useEffect, useState } from 'react';
import { Space, Tag, Form, Input, Select } from 'antd';
import Table from '@/components/table';
import { getDate } from '@/util/function';
import { getOrderList, detailOrderList } from '@/util/servers';
import Detail from './detail';

const { Option } = Select;

export default memo(() => {
  const [data, setData] = useState(undefined);
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);
  const [queryValue, setQueryValue] = useState<any>({
    orderStatus: null,
    orderNumber: null,
    userName: null,
  });
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
      render: (t: number) => {
        return getDate(t);
      },
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
            return <Tag color="red">未付款</Tag>;
          case 1:
            return <Tag color="orange">待确认</Tag>;
          case 2:
            return <Tag color="green">已完成</Tag>;
          case 3:
            return <Tag color="green">已关闭</Tag>;
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
      params: {
        userName: queryValue.userName,
        orderStatus: queryValue.orderStatus,
        orderNumber: queryValue.orderNumber,
      },
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
    const options = Object.assign({}, pages, {
      params: {
        userName: queryValue.userName,
        orderStatus: queryValue.orderStatus,
        orderNumber: queryValue.orderNumber,
      },
    });
    getOrderList(options).then((data) => {
      if (data.status === 200) {
        setData(data?.data?.data?.records);
        setTotal(data?.data?.data?.total);
      }
    });
  }

  function onQuery(values: any) {
    setQueryValue({
      orderStatus:
        values.orderStatus || values.orderStatus === 0
          ? values.orderStatus
          : null,
      orderNumber: values.orderNumber ? values.orderNumber : null,
      userName: values.userName ? values.userName : null,
    });
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

  function onDetailClose() {
    setDetailVisible(false);
  }

  function onConfirm(id: number, sendTime: number) {
    const data: any = Object.assign({}, detailData, { status: 2, sendTime });
    setDetailData(data);
    reload();
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
        customSearch={
          <>
            <Form.Item label="状态" name="orderStatus">
              <Select placeholder="请选择状态" style={{ width: '200px' }}>
                <Option>全部</Option>
                <Option value={0}>未付款</Option>
                <Option value={1}>待确认</Option>
                <Option value={2}>已完成</Option>
                <Option value={3}>已关闭</Option>
              </Select>
            </Form.Item>
            <Form.Item name="orderNumber">
              <Input placeholder="请输入订单号" allowClear />
            </Form.Item>
            <Form.Item name="userName">
              <Input placeholder="请输入用户名称" allowClear />
            </Form.Item>
          </>
        }
      />
      <Detail
        visible={detailVisible}
        onDetailClose={onDetailClose}
        data={detailData}
        onConfirm={onConfirm}
      />
    </>
  );
});
