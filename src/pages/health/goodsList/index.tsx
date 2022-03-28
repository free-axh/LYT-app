import { memo, useEffect, useState } from 'react';
import { Space, Tag, message, Popconfirm, Button } from 'antd';
import Table from '@/components/table';
import { getDate } from '@/util/function';
import { PlusOutlined } from '@ant-design/icons';
import GoodsModal from './addGoodsModal';

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
      dataIndex: 'name',
      key: 'name',
      align: 'center' as 'center',
    },
    {
      title: '商品名称',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center' as 'center',
    },
    {
      title: '分类',
      dataIndex: 'userName1',
      key: 'userName1',
      align: 'center' as 'center',
    },
    {
      title: '价格',
      dataIndex: 'userName2',
      key: 'userName2',
      align: 'center' as 'center',
    },
    {
      title: '库存',
      dataIndex: 'userName3',
      key: 'userName3',
      align: 'center' as 'center',
    },
    {
      title: '状态',
      dataIndex: 'userName3',
      key: 'userName3',
      align: 'center' as 'center',
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
    setData([
      {
        name: '分类1',
        userName: '1',
      },
    ]);
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
