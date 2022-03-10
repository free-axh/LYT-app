import { memo, useEffect, useState } from 'react';
import { Button, Space, Tag, message, Popconfirm } from 'antd';
import Tabs from '@/components/tabs';
import Table from '@/components/table';
import Modal from './modal';
import InfoModal from './infoModal';
import { getTopicList } from '@/util/servers';

const TopicList = memo(() => {
  const basicData = {
    title: '话题管理',
    tabs: [{ title: '话题列表', code: 'topic' }],
  };

  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
  });

  const [data, setData] = useState(undefined);
  const [total, setTotal] = useState(0);
  const [queryValue, setQueryValue] = useState('');
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
      title: '内容',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as 'center',
    },
    {
      title: '图片',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center' as 'center',
    },
    {
      title: '评论数',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center' as 'center',
    },
    {
      title: '点赞数',
      key: 'typeName',
      dataIndex: 'typeName',
      align: 'center' as 'center',
    },
    {
      title: '发布人',
      key: 'startTime',
      dataIndex: 'startTime',
      align: 'center' as 'center',
    },
    {
      title: '发布时间',
      key: 'startTime1',
      dataIndex: 'startTime1',
      align: 'center' as 'center',
    },
    {
      title: '状态',
      key: 'startTime2',
      dataIndex: 'startTime2',
      align: 'center' as 'center',
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
            <Popconfirm
              title="是否确定删除?"
              onConfirm={() => onDelete(record.id)}
            >
              <a>删除</a>
            </Popconfirm>
            <a onClick={() => onAudit(record.id)}>审核</a>
            <a onClick={() => onDetail(record.id)}>审核信息</a>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    setData(undefined);
    const options = Object.assign({}, pages, { params: { msg: queryValue } });
    getTopicList(options).then((res) => {
      if (res.status === 200 && res?.data?.code === 0) {
        setData(res.data.data.records);
        setTotal(res.data.data.total);
      }
    });
  }, [pages, queryValue]);

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
        <Tabs title={basicData.title} tabs={basicData.tabs} activeKey={'topic'}>
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

export default TopicList;
