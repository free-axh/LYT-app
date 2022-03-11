import { memo, useEffect, useState } from 'react';
import { Button, Space, Tag, message, Popconfirm } from 'antd';
import { history } from 'umi';
import Tabs from '@/components/tabs';
import Table from '@/components/table';
import Modal from './modal';
import InfoModal from './infoModal';
import {
  getCommunityList,
  deleteCommunityList,
  updateCommunityList,
} from '@/util/servers';
import Detail from './detail';
import { getDate } from '@/util/function';

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
  const [detail, setDetail] = useState();
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailData, setDetailData] = useState();
  const [id, setId] = useState<number>();

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
      render: (t: number) => {
        return getDate(t);
      },
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
            return <Tag color="orange">待审核</Tag>;
          case 1:
            return <Tag color="green">已通过</Tag>;
          case 2:
            return <Tag color="red">已拒绝</Tag>;
        }
      },
    },
    {
      title: '操作',
      key: 'handle',
      dataIndex: 'handle',
      align: 'center' as 'center',
      render: (text: any, record: any) => {
        function onDelete(id: number) {
          deleteCommunityList({ id: record.id }).then((res) => {
            if (res.status === 200 && res?.data?.code === 0) {
              message.success('删除成功');
              reload();
            } else {
              message.error('删除失败');
            }
          });
        }

        function onAudit(id: number) {
          setModal(true);
          setId(id);
        }

        function onDetail(record: any) {
          setInfoModal(true);
          setDetail(record);
        }

        function onDetailInfo(record: any) {
          setDetailData(record);
          setDetailVisible(true);
        }

        return (
          <Space size="middle">
            <a onClick={() => onDetailInfo(record)}>社群信息</a>
            <a
              onClick={() => {
                history.push({
                  pathname: '/groupCulture/member',
                  query: {
                    id: record.id,
                    type: record.title,
                  },
                });
              }}
            >
              社群成员
            </a>
            <a
              onClick={() => {
                history.push({
                  pathname: '/groupCulture/releaseList',
                  query: {
                    id: record.id,
                    type: record.title,
                  },
                });
              }}
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
              <a onClick={() => onDetail(record)}>审核信息</a>
            )}
          </Space>
        );
      },
    },
  ];

  function reload() {
    setData(undefined);
    const options = Object.assign({}, pages, {
      params: { title: queryValue },
    });
    getCommunityList(options).then((res) => {
      if (res.status === 200) {
        setData(res?.data?.data?.records);
        setTotal(res?.data?.data?.total);
      }
    });
  }

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

  async function onModalSubmit(values: {
    checkStatus: string;
    checkMsg: string;
  }) {
    const userData: string | null = window.sessionStorage.getItem('userData');
    const userJson = JSON.parse(userData as string);
    if (userJson && userJson.username) {
      const options = {
        id,
        checkStatus: values.checkStatus,
        checkMsg: values.checkMsg,
        checkUser: userJson.username,
        checkTime: new Date().getTime(),
      };
      const data = await updateCommunityList(options);
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
            title="审核信息"
            data={detail}
            onClose={onInfoModalClose}
          />
          <Detail
            visible={detailVisible}
            data={detailData}
            onDetailClose={() => setDetailVisible(false)}
          />
        </Tabs>
      </div>
    </div>
  );
});

export default CommunityManagement;
