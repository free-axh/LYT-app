import { memo, useEffect, useRef, useState } from 'react';
import {
  Button,
  Space,
  Tag,
  message,
  Popconfirm,
  List,
  Avatar,
  Descriptions,
  Input,
  Pagination,
} from 'antd';
import { history } from 'umi';
import Tabs from '@/components/tabs';
import styles from './index.less';
import {
  getMemberList,
  deleteMemberList,
  updateTopicList,
} from '@/util/servers';

const Member = memo(() => {
  const basicData = {
    title: '社群管理',
    tabs: [{ title: '社群成员', code: 'member' }],
  };
  const [title, setTitle] = useState();
  const [id, setId] = useState();
  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const [queryValue, setQueryValue] = useState<string | null>(null);
  const [data, setData] = useState();
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const staticData = useRef({
    value: null,
  });

  useEffect(() => {
    const {
      location: {
        query: { id, type },
      },
    }: any = history;
    setTitle(type);
    setId(id);
  }, []);

  function reload() {
    setData(undefined);
    const options = Object.assign({}, pages, {
      params: { associationId: id, userName: queryValue },
    });
    getMemberList(options).then((res) => {
      if (res.status === 200) {
        setData(res?.data?.data?.records);
        setTotal(res?.data?.data?.total);
      }
    });
  }

  useEffect(() => {
    if (id) {
      setData(undefined);
      const options = Object.assign({}, pages, {
        params: { associationId: id, userName: queryValue },
      });
      getMemberList(options).then((res) => {
        if (res.status === 200 && res?.data?.code === 0) {
          setData(res.data.data.records);
          setTotal(res.data.data.total);
        }
      });
    }
  }, [id, pages, queryValue]);

  function onDelete(id: number) {
    deleteMemberList({ id }).then((res) => {
      if (res.status === 200 && res?.data?.code === 0) {
        message.success('删除成功');
        reload();
      } else {
        message.error('删除失败');
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

  function onChange(e: any) {
    staticData.current.value = e.target.value;
  }

  function onSearch() {
    setQueryValue(
      staticData.current.value === '' ? null : staticData.current.value,
    );
    setPages({
      pageNo: 1,
      pageSize: 10,
    });
    setCurrent(1);
  }

  return (
    <div id="tableContent" style={{ background: '#f0f2f5' }}>
      <div style={{ height: '100%', padding: '33px 17px' }}>
        <Tabs
          title={basicData.title}
          tabs={basicData.tabs}
          activeKey={'member'}
        >
          <div className={styles.header}>
            <div className={styles.left}>
              <h3 className={styles.title}>{title}</h3>
            </div>
            <div className={styles.right}>
              <div className={styles.search}>
                <Input
                  placeholder="请输入关键字查询"
                  allowClear
                  onChange={onChange}
                />
              </div>
              <Button onClick={onSearch}>查询</Button>
            </div>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item: any) => (
              <List.Item
                actions={[
                  <Popconfirm
                    title="是否确定删除?"
                    onConfirm={() => onDelete(item.id)}
                  >
                    <a key="list-loadmore-edit">移除</a>
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={
                    <>
                      <a style={{ marginRight: '10px' }}>{item.userName}</a>
                      {item.isCreate === 1 && <Tag color={'green'}>创建者</Tag>}
                    </>
                  }
                  description={
                    <Descriptions>
                      <Descriptions.Item label="发表文章">
                        {item.total}
                      </Descriptions.Item>
                    </Descriptions>
                  }
                />
              </List.Item>
            )}
          />
          <div className={styles.pagination}>
            <Pagination
              total={total}
              current={current}
              onChange={onPageChange}
            />
          </div>
        </Tabs>
      </div>
    </div>
  );
});

export default Member;
