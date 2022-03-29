import { memo, useEffect, useState } from 'react';
import { Space, Tag, message, Popconfirm, Button } from 'antd';
import Table from '@/components/table';
import { getDate } from '@/util/function';
import { PlusOutlined } from '@ant-design/icons';
import GoodsModal from './addGoodsModal';
import { getFoodGoodsList } from '@/util/servers';

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
      title: '商品编号',
      dataIndex: 'foodTypeId',
      key: 'foodTypeId',
      align: 'center' as 'center',
    },
    {
      title: '商品名称',
      dataIndex: 'foodName',
      key: 'foodName',
      align: 'center' as 'center',
    },
    {
      title: '分类',
      dataIndex: 'specificationType',
      key: 'specificationType',
      align: 'center' as 'center',
      render: (t: number) => {
        return t === 0 ? '单规格' : '多规格';
      },
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      align: 'center' as 'center',
    },
    {
      title: '库存',
      dataIndex: 'inventory',
      key: 'inventory',
      align: 'center' as 'center',
    },
    {
      title: '状态',
      dataIndex: 'putaway',
      key: 'putaway',
      align: 'center' as 'center',
      render: (t: number) => {
        return t === 0 ? (
          <Tag color={'green'}>正常</Tag>
        ) : (
          <Tag color={'red'}>下架</Tag>
        );
      },
    },
    {
      title: '操作',
      key: 'handle',
      dataIndex: 'handle',
      width: 400,
      align: 'center' as 'center',
      render: (text: any, record: any) => {
        function detailHandle(r) {
          setDetailVisible(true);
        }

        function onDelete(id) {}

        return (
          <Space size="middle">
            <a onClick={() => detailHandle(record)}>详情</a>
            <a>编辑</a>
            <a>下架</a>
            <Popconfirm
              title="是否确定删除?"
              onConfirm={() => onDelete(record.id)}
            >
              <a>删除</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    setData(undefined);
    const options = Object.assign({}, pages, {
      params: { foodName: queryValue },
    });
    getFoodGoodsList(options).then((data) => {
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

  function addGoods() {
    setModalFlag(true);
  }

  function onRecipeModalClose() {
    setModalFlag(false);
  }

  function onDetailClose() {
    setDetailVisible(false);
  }

  function onModalClose() {
    setModalFlag(false);
  }

  function onModalSubmit() {
    setModalFlag(true);
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
        searchRender={
          <Button onClick={addGoods} type="primary" icon={<PlusOutlined />}>
            添加商品
          </Button>
        }
      />
      {modalFlag && (
        <GoodsModal
          visible={modalFlag}
          title={'添加商品'}
          onClose={onModalClose}
          onSubmit={onModalSubmit}
        />
      )}
      {/* <Detail
        visible={detailVisible}
        onDetailClose={onDetailClose}
        data={null}
      /> */}
    </>
  );
});
