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
      <div className={styles.topMain}>
        <div className={styles.picture}>
          <img width={'100%'} height={200} src={data?.picture1} />
        </div>
        <div className={styles.text}>
          <span>好物名称：</span>
          <br />
          <span>{data?.name}</span>
        </div>
      </div>
      <Divider dashed />
      <Descriptions column={1}>
        <Descriptions.Item label="显示状态">
          {data?.showStatus === 1 ? '显示' : '不显示'}
        </Descriptions.Item>
        <Descriptions.Item label="借用状态">
          {getStatus(data?.status)}
        </Descriptions.Item>
      </Descriptions>
      <Divider dashed />
      <Descriptions column={1}>
        <Descriptions.Item label="物品描述">{data?.remark}</Descriptions.Item>
        <Descriptions.Item label="共享人">{data?.userName}</Descriptions.Item>
        <Descriptions.Item label="共享时间">
          {data?.createTime}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
});

export default Detail;
