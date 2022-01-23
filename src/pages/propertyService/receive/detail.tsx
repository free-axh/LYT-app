import { memo } from 'react';
import {
  Drawer,
  Descriptions,
  List,
  Avatar,
  Divider,
  Typography,
  Button,
  Tag,
} from 'antd';
import styles from './index.less';

interface IProps {
  visible: boolean;
  data: any | null;
  onDetailClose: Function;
}

const Detail: React.FC<IProps> = memo(({ visible, data, onDetailClose }) => {
  const getStatus = (status: number) => {
    switch (status) {
      case 0:
        return <Tag color="green">可申请</Tag>;
      case 1:
        return <Tag color="blue">已借出</Tag>;
      case 99:
        return <Tag color="orange">待审核</Tag>;
      case 100:
        return <Tag color="red">未通过审核</Tag>;
    }
  };

  return (
    <Drawer
      visible={visible}
      closable={false}
      mask={false}
      placement="right"
      footer={<Button onClick={() => onDetailClose()}>关闭</Button>}
      footerStyle={{ textAlign: 'center' }}
    >
      <Divider dashed orientation="left">
        物品
      </Divider>
      <div className={styles.topMain}>
        <div className={styles.picture}>
          <img width={'100%'} height={200} src={data?.picture1} />
        </div>
        <div className={styles.text}>
          <span>申领物品：</span>
          <br />
          <span>手电筒</span>
        </div>
      </div>
      <Divider dashed orientation="left">
        申领人信息
      </Divider>
      <Descriptions column={1}>
        <Descriptions.Item label="姓名">张三</Descriptions.Item>
        <Descriptions.Item label="联系方式">13656344856</Descriptions.Item>
        <Descriptions.Item label="用途说明">修下水道</Descriptions.Item>
        <Descriptions.Item label="申请领用日期">2022-1-5</Descriptions.Item>
        <Descriptions.Item label="工单下单时间">
          2022-1-11 16:05:54
        </Descriptions.Item>
      </Descriptions>
      <Divider dashed orientation="left">
        审核信息
      </Divider>
      <Descriptions column={1}>
        <Descriptions.Item label="审核状态">
          <Tag color={'red'}>已拒绝</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="审核人">李四</Descriptions.Item>
        <Descriptions.Item label="审核时间">
          2022-1-11 16:05:54
        </Descriptions.Item>
        <Descriptions.Item label="拒绝理由">物品坏了</Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
});

export default Detail;
