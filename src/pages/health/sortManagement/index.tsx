import { memo, useEffect, useState } from 'react';
import { Space, Tag, message, Popconfirm, Button } from 'antd';
import Table from '@/components/table';
import { getDate } from '@/util/function';
import { PlusOutlined } from '@ant-design/icons';
import SortModal from './sortModal';
import {
  getSortList,
  deleteSortList,
  updateSortList,
  addSortList,
} from '@/util/servers';
// import Detail from './detail';

const SortManagement = memo(() => {
  const [data, setData] = useState(undefined);
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);
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
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as 'center',
    },
    {
      title: '排序',
      dataIndex: 'indexNumber',
      key: 'indexNumber',
      align: 'center' as 'center',
    },
    {
      title: '操作',
      key: 'handle',
      dataIndex: 'handle',
      width: 400,
      align: 'center' as 'center',
      render: (text: any, record: any) => {
        function editHandle(r: any) {
          setModalFlag(true);
          setDetailData(r);
        }

        function onDelete(id: number) {
          deleteSortList({ id }).then((res) => {
            if (res.status === 200 && res?.data && res?.data.code === 0) {
              message.success('删除成功');
              reload();
            } else {
              message.error('删除失败');
            }
          });
        }

        return (
          <Space size="middle">
            <a onClick={() => editHandle(record)}>编辑</a>
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
      params: { name: queryValue },
    });
    getSortList(options).then((data) => {
      if (data.status === 200) {
        setData(data?.data?.data?.records);
        setTotal(data?.data?.data?.total);
      }
    });
  }, [pages]);

  function reload() {
    setData(undefined);
    const options = Object.assign({}, pages, {
      params: { name: queryValue },
    });
    getSortList(options).then((data) => {
      if (data.status === 200) {
        setData(data?.data?.data);
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

  function addSort() {
    setModalFlag(true);
    setDetailData(null);
  }

  function onRecipeModalClose() {
    setModalFlag(false);
  }

  function onDetailClose() {
    setDetailVisible(false);
  }

  function onModalSubmit(values: { name: string; indexNumber: number }) {
    console.log('values', values);
    if (detailData) {
      const options = Object.assign({}, values, { id: detailData.id });
      updateSortList(options).then((res) => {
        if (res.status === 200 && res?.data && res?.data.code === 0) {
          message.success('编辑分类成功');
          reload();
        } else {
          message.error('编辑分类失败');
        }
        setModalFlag(false);
      });
    } else {
      addSortList(values).then((res) => {
        if (res.status === 200 && res?.data && res?.data.code === 0) {
          message.success('添加分类成功');
          reload();
        } else {
          message.error('添加分类失败');
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
        searchRender={
          <Button onClick={addSort} type="primary" icon={<PlusOutlined />}>
            添加分类
          </Button>
        }
      />
      {modalFlag && (
        <SortModal
          visible={modalFlag}
          title={detailData ? '编辑分类' : '添加分类'}
          onSubmit={onModalSubmit}
          onClose={onRecipeModalClose}
          data={detailData}
        />
      )}
    </>
  );
});

export default SortManagement;
