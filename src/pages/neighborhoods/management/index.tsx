import { memo, useEffect, useState } from 'react';
import { Space, Popconfirm, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Table from '@/components/table';
import {
  goodsTypeList,
  goodsAddType,
  goodsUpdateType,
  goodsDeleteType,
} from '@/util/servers';
import TypeModal from './typeModel';

const Management = memo(() => {
  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(undefined);
  const [modalTitle, setModalTitle] = useState('');
  const [editData, setEditData] = useState();
  const [queryValue, setQueryValue] = useState('');
  const [current, setCurrent] = useState(1);

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as 'center',
    },
    {
      title: '排序',
      dataIndex: 'seq',
      key: 'seq',
      align: 'center' as 'center',
    },
    {
      title: '操作',
      dataIndex: 'handle',
      key: 'handle',
      align: 'center' as 'center',
      render: (text: any, record: any) => {
        function onDelete(id: number) {
          goodsDeleteType({ id }).then((data) => {
            if (data.status === 200) {
              if (data?.data?.code === 0) {
                message.success('删除成功');
                reload();
              } else {
                message.warning('该类型已被使用,无法删除');
              }
            }
          });
        }

        function edit(value: any) {
          setModalTitle('编辑分类');
          setEditData(value);
          setVisible(true);
        }

        return (
          <Space size="middle">
            <a onClick={() => edit(record)}>编辑</a>
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
    const options = Object.assign({}, pages, { params: { name: queryValue } });
    goodsTypeList(options).then((data) => {
      if (data.status === 200) {
        setData(data?.data?.data?.list);
        setTotal(data?.data?.data?.total);
      }
    });
  }, [pages, queryValue]);

  function addGoodsType() {
    setModalTitle('添加分类');
    setEditData(undefined);
    setVisible(true);
  }

  function onClose() {
    setVisible(false);
    setEditData(undefined);
  }

  function onSubmit(values: any) {
    if (values.id) {
      // 编辑
      goodsUpdateType(values).then((data) => {
        if (data.status === 200) {
          message.success('编辑分类成功');
          setVisible(false);
          reload();
        }
      });
    } else {
      // 新增
      goodsAddType(values).then((data) => {
        if (data.status === 200) {
          message.success('分类添加成功');
          setVisible(false);
          reload();
        }
      });
    }
  }

  function reload() {
    setData(undefined);
    const options = Object.assign({}, pages, { params: { name: queryValue } });
    goodsTypeList(options).then((data) => {
      if (data.status === 200) {
        setData(data?.data?.data?.list);
        setTotal(data?.data?.data?.total);
      }
    });
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

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        total={total}
        search
        current={current}
        searchRender={
          <Button onClick={addGoodsType} type="primary" icon={<PlusOutlined />}>
            添加分类
          </Button>
        }
        onQuery={onQuery}
        onPageChange={onPageChange}
      />
      ;
      {visible && (
        <TypeModal
          visible={visible}
          title={modalTitle}
          onClose={onClose}
          onSubmit={onSubmit}
          initialValues={editData}
        />
      )}
    </>
  );
});

export default Management;
