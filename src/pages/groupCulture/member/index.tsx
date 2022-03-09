import { memo, useEffect, useState } from 'react';
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
import Tabs from '@/components/tabs';
import styles from './index.less';

const Member = memo(() => {
  const basicData = {
    title: '社群管理',
    tabs: [{ title: '社群成员', code: 'member' }],
  };

  const data = [
    {
      name: '张三',
    },
    {
      name: '张三',
    },
    {
      name: '张三',
    },
    {
      name: '张三',
    },
  ];

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
              <h3 className={styles.title}>书法社群</h3>
            </div>
            <div className={styles.right}>
              <div className={styles.search}>
                <Input placeholder="请输入关键字查询" allowClear />
              </div>
              <Button>查询</Button>
            </div>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item actions={[<a key="list-loadmore-edit">移除</a>]}>
                <List.Item.Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={
                    <Descriptions>
                      <Descriptions.Item label="发表文章">23</Descriptions.Item>
                    </Descriptions>
                  }
                />
              </List.Item>
            )}
          />
          <div className={styles.pagination}>
            <Pagination defaultCurrent={6} total={500} />
          </div>
        </Tabs>
      </div>
    </div>
  );
});

export default Member;
