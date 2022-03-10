import { memo, useEffect, useState } from 'react';
import { Button, Space, Tag, message, Popconfirm } from 'antd';
import { history } from 'umi';
import Tabs from '@/components/tabs';
import Table from '@/components/table';
import Modal from './modal';
import InfoModal from './infoModal';
import { getCommunityList } from '@/util/servers';

const CommunityManagement = memo(() => {
  const basicData = {
    title: '社群管理',
    tabs: [{ title: '社群列表', code: 'community' }],
  };

  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
  });

  const [data, setData] = useState(undefined);
  const [total, setTotal] = useState(0);
  const [queryValue, setQueryValue] = useState<string | null>(null);
  const [current, setCurrent] = useState(1);
  const [modal, setModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [detail, setDetail] = useState({
    time: '2022-3-7 00:36:38',
    persion: '张三',
    info: '审核拒绝',
    resion: '内容违规',
  });

  const columns = [
    {
      title: '社群名称',
      dataIndex: 'title',
      key: 'title',
      align: 'center' as 'center',
    },
    {
      title: '社群人数',
      dataIndex: 'total',
      key: 'total',
      align: 'center' as 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center' as 'center',
    },
    {
      title: '社群创建人',
      key: 'userName',
      dataIndex: 'userName',
      align: 'center' as 'center',
    },
    {
      title: '状态',
      key: 'checkStatus',
      dataIndex: 'checkStatus',
      align: 'center' as 'center',
      render: (t: number) => {
        switch (t) {
          case 0:
            return '待审核';
          case 1:
            return '已通过';
          case 2:
            return '已拒绝';
        }
      },
    },
    {
      title: '操作',
      key: 'handle',
      dataIndex: 'handle',
      align: 'center' as 'center',
      render: (text: any, record: any) => {
        function onDelete(id: number) {}

        function onAudit(id: number) {
          setModal(true);
        }

        function onDetail(id: number) {
          setInfoModal(true);
        }
        return (
          <Space size="middle">
            <a>社群信息</a>
            <a
              onClick={() =>
                history.push('/groupCulture/member', {
                  id: record.id,
                  type: record.type,
                })
              }
            >
              社群成员
            </a>
            <a
              onClick={() =>
                history.push('/groupCulture/releaseList', {
                  id: record.id,
                  type: record.type,
                })
              }
            >
              发布列表
            </a>
            <Popconfirm
              title="是否确定删除?"
              onConfirm={() => onDelete(record.id)}
            >
              <a>删除</a>
            </Popconfirm>
            {record.checkStatus === 0 ? (
              <a onClick={() => onAudit(record.id)}>审核</a>
            ) : (
              <a onClick={() => onDetail(record.id)}>审核信息</a>
            )}
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    setData(undefined);
    const options = Object.assign({}, pages, { params: { title: queryValue } });
    getCommunityList(options).then((res) => {
      if (res.status === 200 && res.data && res.data.code === 0) {
        setData(res.data.data.records);
        setTotal(res.data.data.total);
      }
    });
  }, [pages, queryValue]);

  function onQuery(value: string) {
    setQueryValue(value === '' ? null : value);
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

  function onModalClose() {
    setModal(false);
  }

  function onModalSubmit(values: { resultFlag: string; failReason: string }) {}

  function onInfoModalClose() {
    setInfoModal(false);
  }

  return (
    <div id="tableContent" style={{ background: '#f0f2f5' }}>
      <div style={{ height: '100%', padding: '33px 17px' }}>
        <Tabs
          title={basicData.title}
          tabs={basicData.tabs}
          activeKey={'community'}
        >
          <Table
            columns={columns}
            dataSource={data}
            search
            current={current}
            total={total}
            onQuery={onQuery}
            onPageChange={onPageChange}
          />
          <Modal
            visible={modal}
            title="社群审核"
            onClose={onModalClose}
            onSubmit={onModalSubmit}
          />
          <InfoModal
            visible={infoModal}
            title="社群审核"
            data={detail}
            onClose={onInfoModalClose}
          />
        </Tabs>
      </div>
    </div>
  );
});

export default CommunityManagement;
