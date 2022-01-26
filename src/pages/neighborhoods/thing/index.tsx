import { memo, useEffect, useState } from 'react';
import { Button, Space, Tag, message, Popconfirm } from 'antd';
import Table from '@/components/table';
import { getDate } from '@/util/function';
import {
  goodsList,
  goodsDetail,
  goodsUpdate,
  goodsAuditing,
  goodsDelete,
  goodsTypeList,
} from '@/util/servers';
import Detail from './detail';
import Modal from './modal';

const Thing = memo(() => {
  const [data, setData] = useState(undefined);
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);

  const columns = [
    {
      title: '好物名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as 'center',
    },
    {
      title: '共享人',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center' as 'center',
    },
    {
      title: '分类',
      dataIndex: 'typeName',
      key: 'typeName',
      align: 'center' as 'center',
    },
    {
      title: '共享时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center' as 'center',
      render: (text: number) => {
        return getDate(text);
      },
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      align: 'center' as 'center',
      render: (text: any) => {
        switch (text) {
          case 0:
            return <Tag color="green">可申请</Tag>;
          case 1:
            return <Tag color="blue">已借出</Tag>;
          case 99:
            return <Tag color="orange">待审核</Tag>;
          case 100:
            return <Tag color="red">未通过审核</Tag>;
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
        function statusButton(status: number) {
          switch (status) {
            case 0:
              return '更改为已借出';
            case 1:
              return '更改为可申请';
            case 99:
              return '审核';
          }
        }

        // 详情
        function detailHandle(id: any) {
          setDetailVisible(true);
          goodsDetail({ id }).then((data: any) => {
            if (data.status === 200) {
              setDetailData(data.data.data);
            }
          });
        }

        // 审核、更改为已借出、更改为可申请
        function goodsHandle(record: any) {
          switch (record.status) {
            case 99:
              setModal(true);
              setModalId(record.id);
              break;
            case 0:
              goodsUpdate({ id: record.id, status: 1 }).then((res) => {
                if (res.status === 200) {
                  reload();
                }
              });
              break;
            case 1:
              goodsUpdate({ id: record.id, status: 0 }).then((res) => {
                if (res.status === 200) {
                  reload();
                }
              });
              break;
          }
        }

        // 删除
        function onDelete(id: any) {
          goodsDelete({ id }).then((data: any) => {
            if (data.status === 200) {
              message.success('删除成功');
              reload();
            }
          });
        }

        return (
          <Space size="middle">
            <a onClick={() => detailHandle(record.id)}>详情</a>
            <Popconfirm
              title="是否确定删除?"
              onConfirm={() => onDelete(record.id)}
            >
              <a>删除</a>
            </Popconfirm>
            <a onClick={() => goodsHandle(record)}>
              {statusButton(record.status)}
            </a>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    goodsList(pages).then((data) => {
      if (data.status === 200) {
        setData(data?.data?.data?.records);
        setTotal(data?.data?.data?.total);
      }
    });
  }, [pages]);

  function reload() {
    setData(undefined);
    goodsList(pages).then((data) => {
      if (data.status === 200) {
        setData(data?.data?.data?.records);
        setTotal(data?.data?.data?.total);
      }
    });
  }

  function onDetailClose() {
    setDetailVisible(false);
  }

  function onModalClose() {
    setModal(false);
  }

  function onModalSubmit(values: { resultFlag: string; failReason: string }) {
    const data = Object.assign({}, { id: modalId }, { ...values });
    goodsAuditing(data).then((res) => {
      if (res.status === 200) {
        setModal(false);
        reload();
      }
    });
  }

  function onQuery(value: string) {
    setData(undefined);
    const options = Object.assign({}, pages, { params: { name: value } });
    goodsList(options).then((data) => {
      if (data.status === 200) {
        setData(data?.data?.data?.records);
        setTotal(data?.data?.data?.total);
      }
    });
  }

  function onPageChange(page: number, pageSize: number) {
    setPages({
      pageNo: page,
      pageSize: pageSize,
    });
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        search
        onQuery={onQuery}
        onPageChange={onPageChange}
      />
      <Detail
        visible={detailVisible}
        data={detailData}
        onDetailClose={onDetailClose}
      />
      <Modal
        visible={modal}
        title="好物审核"
        onClose={onModalClose}
        onSubmit={onModalSubmit}
      />
    </>
  );
});

export default Thing;
