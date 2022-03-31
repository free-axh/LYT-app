import { memo, useEffect, useState } from 'react';
import {
  Space,
  Tag,
  message,
  Popconfirm,
  Button,
  Form,
  Input,
  Select,
} from 'antd';
import Table from '@/components/table';
import { PlusOutlined } from '@ant-design/icons';
import GoodsModal from './addGoodsModal';
import {
  getFoodGoodsList,
  addGoodsTypeList,
  deleteGoodsTypeList,
  updatePutaway,
  detailGoodsTypeList,
  updateGoodsTypeList,
} from '@/util/servers';
import Detail from './detail';

export default memo(() => {
  const [data, setData] = useState(undefined);
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);
  const [modalFlag, setModalFlag] = useState(false);
  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);
  const [queryValue, setQueryValue] = useState({
    foodName: null,
    putaway: null,
  });
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
        function detailHandle(r: any) {
          detailGoodsTypeList({ id: r.id }).then((res) => {
            if (res.status === 200 && res?.data && res?.data.code === 0) {
              setDetailVisible(true);
              setDetailData(res.data.data);
            }
          });
        }

        function onDelete(id: number) {
          deleteGoodsTypeList({ id }).then((res) => {
            if (res.status === 200 && res?.data && res?.data.code === 0) {
              message.success('删除成功');
              reload();
            } else {
              message.error('删除失败');
            }
          });
        }

        function onUpdatePutaway(r: any) {
          updatePutaway({ id: r.id, putaway: r.putaway === 0 ? 1 : 0 }).then(
            () => {
              reload();
            },
          );
        }

        function updateHandle(r: any) {
          detailGoodsTypeList({ id: r.id }).then((res) => {
            if (res.status === 200 && res?.data && res?.data.code === 0) {
              setModalFlag(true);
              setDetailData(res.data.data);
            }
          });
        }

        return (
          <Space size="middle">
            <a onClick={() => detailHandle(record)}>详情</a>
            <a onClick={() => updateHandle(record)}>编辑</a>
            <a onClick={() => onUpdatePutaway(record)}>
              {record.putaway === 0 ? '下架' : '上架'}
            </a>
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
      params: { foodName: queryValue.foodName, putaway: queryValue.putaway },
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
    const options = Object.assign({}, pages, {
      params: { foodName: queryValue.foodName, putaway: queryValue.putaway },
    });
    getFoodGoodsList(options).then((data) => {
      if (data.status === 200) {
        setData(data?.data?.data?.records);
        setTotal(data?.data?.data?.total);
      }
    });
  }

  function onQuery(values: any) {
    setQueryValue({
      foodName: values.foodName ? values.foodName : null,
      putaway: values.putaway || values.putaway === 0 ? values.putaway : null,
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

  function addGoods() {
    setDetailData(null);
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

  function onModalSubmit(values: any) {
    if (detailData) {
      const options = Object.assign({}, values, { id: detailData.id });
      updateGoodsTypeList(options).then((res) => {
        if (res.status === 200 && res?.data && res?.data.code === 0) {
          message.success('编辑商品成功');
          reload();
        } else {
          message.error('编辑商品失败');
        }
        setModalFlag(false);
      });
    } else {
      addGoodsTypeList(values).then((res) => {
        if (res.status === 200 && res?.data && res?.data.code === 0) {
          message.success('添加商品成功');
          reload();
        } else {
          message.error('添加商品失败');
        }
        setModalFlag(false);
      });
    }
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
            <Form.Item label="商品名称" name="foodName">
              <Input placeholder="商品名称" />
            </Form.Item>
            <Form.Item label="状态" name="putaway">
              <Select placeholder="选择状态" style={{ width: '200px' }}>
                <option>全部</option>
                <option value={0}>正常</option>
                <option value={1}>下架</option>
              </Select>
            </Form.Item>
          </>
        }
        searchRender={
          <Button onClick={addGoods} type="primary" icon={<PlusOutlined />}>
            添加商品
          </Button>
        }
      />
      {modalFlag && (
        <GoodsModal
          visible={modalFlag}
          title={detailData ? '编辑商品' : '添加商品'}
          onClose={onModalClose}
          onSubmit={onModalSubmit}
          data={detailData}
        />
      )}
      <Detail
        visible={detailVisible}
        onDetailClose={onDetailClose}
        data={detailData}
      />
    </>
  );
});
