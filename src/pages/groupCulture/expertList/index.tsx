import { memo, useEffect, useState } from 'react';
import { Button, Space, Tag, message, Popconfirm } from 'antd';
import Tabs from '@/components/tabs';
import Table from '@/components/table';
import { PlusOutlined } from '@ant-design/icons';

const ExpertList = memo(() => {
  const basicData = {
    title: '社区达人',
    tabs: [{ title: '达人列表', code: 'expert' }],
  };

  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
  });

  const [data, setData] = useState([
    {
      name: 1111,
      userName: '书法达人',
      phone: '222',
    },
  ]);
  const [total, setTotal] = useState(0);
  const [queryValue, setQueryValue] = useState('');
  const [current, setCurrent] = useState(1);

  const columns = [
    {
      title: '达人',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as 'center',
    },
    {
      title: '达人类型',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center' as 'center',
    },
    {
      title: '照片',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center' as 'center',
    },
    {
      title: '添加时间',
      key: 'typeName',
      dataIndex: 'typeName',
      align: 'center' as 'center',
    },
    {
      title: '操作',
      key: 'handle',
      dataIndex: 'handle',
      align: 'center' as 'center',
      render: (text: any, record: any) => {
        function onDelete(id: number) {}
        return (
          <Space size="middle">
            <a>详情</a>
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
    // setData(undefined);
    const options = Object.assign({}, pages, { name: queryValue });
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
              <Button type="primary" icon={<PlusOutlined />}>
                添加达人
              </Button>
            }
          />
        </Tabs>
      </div>
    </div>
  );
});

export default ExpertList;
