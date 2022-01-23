import { memo, useEffect, useState } from 'react';
import { Space } from 'antd';
import Table from '@/components/table';
import { registerList } from '@/util/servers';
import Detail from './detail';
import Modal from './modal';

const Receive = memo(() => {
  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
  });

  const [data, setData] = useState(undefined);
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [modal, setModal] = useState(false);

  const columns = [
    {
      title: '物品',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as 'center',
    },
    {
      title: '领用时间',
      dataIndex: 'age',
      key: 'age',
      align: 'center' as 'center',
    },
    {
      title: '领用人姓名',
      dataIndex: 'address',
      key: 'address',
      align: 'center' as 'center',
    },
    {
      title: '联系方式',
      key: 'tags',
      dataIndex: 'tags',
      align: 'center' as 'center',
    },
    {
      title: '状态',
      key: 'action',
      dataIndex: 'action',
      align: 'center' as 'center',
    },
    {
      title: '操作',
      key: 'handle',
      dataIndex: 'handle',
      align: 'center' as 'center',
      render: (text: any, record: any) => {
        function detailHandle(id: number) {
          setDetailVisible(true);
        }

        function auditHandle(record: any) {
          setModal(true);
        }

        return (
          <Space size="middle">
            <a onClick={() => detailHandle(record.id)}>详情</a>
            <a onClick={() => auditHandle(record)}>审核</a>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    registerList(pages).then((data) => {
      if (data.status === 200) {
        console.log('ddddd', data);
      }
    });
    setData([{ name: '111' }]);
  }, [pages]);

  function onDetailClose() {
    setDetailVisible(false);
  }

  function onModalClose() {
    setModal(false);
  }

  function onModalSubmit(values: { resultFlag: string; failReason: string }) {}

  return (
    <>
      <Table columns={columns} dataSource={data} search />;
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
