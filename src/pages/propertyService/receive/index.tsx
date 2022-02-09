import { memo, useEffect, useState } from 'react';
import { Space, Tag, message } from 'antd';
import Table from '@/components/table';
import {
  receiveList,
  receiveDetail,
  getGoodsInfo,
  receiveApproval,
} from '@/util/servers';
import Detail from './detail';
import Modal from './modal';
import { getDate } from '@/util/function';

const Receive = memo(() => {
  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
  });

  const [data, setData] = useState(undefined);
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(undefined);
  const [total, setTotal] = useState(0);
  const [queryValue, setQueryValue] = useState('');
  const [current, setCurrent] = useState(1);

  const columns = [
    {
      title: '物品',
      dataIndex: 'objName',
      key: 'objName',
      align: 'center' as 'center',
    },
    {
      title: '领用时间',
      dataIndex: 'lendDate',
      key: 'lendDate',
      align: 'center' as 'center',
    },
    {
      title: '领用人姓名',
      dataIndex: 'lendUser',
      key: 'lendUser',
      align: 'center' as 'center',
    },
    {
      title: '联系方式',
      key: 'lendPhone',
      dataIndex: 'lendPhone',
      align: 'center' as 'center',
    },
    {
      title: '状态',
      key: 'approvalStatus',
      dataIndex: 'approvalStatus',
      align: 'center' as 'center',
      render: (text: any) => {
        if (text !== undefined && text !== null) {
          return <Tag color={'green'}>已审核</Tag>;
        }
        return <Tag color={'orange'}>待审核</Tag>;
      },
    },
    {
      title: '操作',
      key: 'handle',
      dataIndex: 'handle',
      align: 'center' as 'center',
      render: (text: any, record: any) => {
        async function detailHandle(record: any) {
          setDetailVisible(true);
          const goodsinfo = await getGoodsInfo({ id: record.objId });
          const detail = await receiveDetail({ id: record.id, status: '' });
          if (goodsinfo.status === 200 && detail.status === 200) {
            const data = Object.assign(
              {},
              { picture: goodsinfo?.data?.data },
              { ...detail?.data?.data[0] },
            );
            setDetailData(data);
          }
        }

        function auditHandle(record: any) {
          setModal(true);
          setModalData(record);
        }

        return (
          <Space size="middle">
            <a onClick={() => detailHandle(record)}>详情</a>
            {(record.approvalStatus === undefined ||
              record.approvalStatus === null) && (
              <a onClick={() => auditHandle(record)}>审核</a>
            )}
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    setData(undefined);
    const options = Object.assign({}, pages, {
      params: { objName: queryValue, status: '' },
    });
    receiveList(options).then((data) => {
      if (data.status === 200) {
        setData(data?.data?.data?.records);
        setTotal(data?.data?.data?.total);
      }
    });
  }, [pages, queryValue]);

  function onDetailClose() {
    setDetailVisible(false);
  }

  function onModalClose() {
    setModal(false);
  }

  // 审核
  async function onModalSubmit(values: {
    approvalStatus: string;
    approvalFailExplain: string;
  }) {
    const userData: string | null = window.sessionStorage.getItem('userData');
    const userJson = JSON.parse(userData as string);
    if (userJson && userJson.username && userJson.userId) {
      const options = {
        id: modalData,
        approvalDate: getDate(new Date().getTime()),
        approvalFailExplain: values.approvalFailExplain,
        approvalStatus: values.approvalStatus,
        approvalUser: userJson.username,
        approvalUserId: userJson.userId,
      };
      const data = await receiveApproval(options);
      if (data.status === 200 && data.data.code === 0) {
        message.success('审核完成');
        reload();
      } else {
        message.error('审核失败');
      }
    } else {
      message.warning('无法获取用户信息');
    }
  }

  function reload() {
    setData(undefined);
    const options = Object.assign({}, pages, {
      params: { objName: queryValue, status: '' },
    });
    receiveList(options).then((data) => {
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
    setCurrent(page);
  }

  // 模糊查询
  function onQuery(value: string) {
    setData(undefined);
    setPages({
      pageNo: 1,
      pageSize: 10,
    });
    setCurrent(1);
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        search
        current={current}
        total={total}
        onPageChange={onPageChange}
        onQuery={onQuery}
      />
      ;
      <Detail
        visible={detailVisible}
        data={detailData}
        onDetailClose={onDetailClose}
      />
      {modal && (
        <Modal
          visible={modal}
          title="工单审核"
          onClose={onModalClose}
          onSubmit={onModalSubmit}
        />
      )}
    </>
  );
});

export default Receive;
