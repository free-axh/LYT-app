import { memo, useEffect, useState } from 'react';
import { Button, Space, Tag, message, Popconfirm, Image } from 'antd';
import Tabs from '@/components/tabs';
import Table from '@/components/table';
import { PlusOutlined } from '@ant-design/icons';
import Modal from './modal';
import Detail from './detail';
import { getExpertList, addExpert, deleteExpert } from '@/util/servers';

const ExpertList = memo(() => {
  const basicData = {
    title: '社区达人',
    tabs: [{ title: '达人列表', code: 'expert' }],
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
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailData, setDetailData] = useState();

  const columns = [
    {
      title: '达人',
      dataIndex: 'peopleName',
      key: 'peopleName',
      align: 'center' as 'center',
    },
    {
      title: '达人类型',
      dataIndex: 'peopleType',
      key: 'peopleType',
      align: 'center' as 'center',
      render: (t: string) => {
        switch (t) {
          case '0':
            return '书法';
          case '1':
            return '手工';
          case '2':
            return '美食';
        }
      },
    },
    {
      title: '照片',
      dataIndex: 'peoplePhoto',
      key: 'peoplePhoto',
      align: 'center' as 'center',
      render: (t: string) => {
        return <Image height={60} width={60} src={`/ocean${t}`} />;
      },
    },
    {
      title: '添加时间',
      key: 'createTime',
      dataIndex: 'createTime',
      align: 'center' as 'center',
    },
    {
      title: '操作',
      key: 'handle',
      dataIndex: 'handle',
      align: 'center' as 'center',
      render: (text: any, record: any) => {
        function onDelete(id: number) {
          deleteExpert({ id: record.id }).then((res) => {
            if (res.status === 200 && res?.data?.code === 0) {
              message.success('删除成功');
              reload();
            } else {
              message.error('删除失败');
            }
          });
        }
        function onDetail(record: any) {
          setDetailData(record);
          setDetailVisible(true);
        }
        return (
          <Space size="middle">
            <a onClick={() => onDetail(record)}>详情</a>
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
      params: { peopleName: queryValue },
    });
    getExpertList(options).then((res) => {
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

  function onAddPersion() {
    setModal(true);
  }

  function onModalClose() {
    setModal(false);
  }

  function reload() {
    setData(undefined);
    const options = Object.assign({}, pages, {
      params: { peopleName: queryValue },
    });
    getExpertList(options).then((res) => {
      if (res.status === 200) {
        setData(res?.data?.data?.records);
        setTotal(res?.data?.data?.total);
      }
    });
  }

  /**
   * 添加达人-提交
   * @param values
   */
  function onModalSubmit(values: any) {
    // console.log('values', values);
    addExpert(values).then((res) => {
      setModal(false);
      if (res.status === 200 && res.data?.code === 0) {
        message.success('添加达人成功');
        reload();
      } else {
        message.error('添加达人失败');
      }
    });
  }

  function onDetailClose() {
    setDetailVisible(false);
  }

  return (
    <div id="tableContent" style={{ background: '#f0f2f5' }}>
      <div style={{ height: '100%', padding: '33px 17px' }}>
        <Tabs
          title={basicData.title}
          tabs={basicData.tabs}
          activeKey={'expert'}
        >
          <Table
            columns={columns}
            dataSource={data}
            search
            current={current}
            total={total}
            onQuery={onQuery}
            onPageChange={onPageChange}
            searchRender={
              <Button
                onClick={onAddPersion}
                type="primary"
                icon={<PlusOutlined />}
              >
                添加达人
              </Button>
            }
          />
        </Tabs>
      </div>
      <Modal
        visible={modal}
        title={'添加达人'}
        onClose={onModalClose}
        onSubmit={onModalSubmit}
      />
      <Detail
        visible={detailVisible}
        data={detailData}
        onDetailClose={onDetailClose}
      />
    </div>
  );
});

export default ExpertList;
