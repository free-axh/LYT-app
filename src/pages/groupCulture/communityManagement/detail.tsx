import { memo } from 'react';
import { Drawer, Descriptions, Button, Tag } from 'antd';
import { getDate } from '@/util/function';

interface IProps {
  visible: boolean;
  data: any | null;
  onDetailClose: Function;
}

const Detail: React.FC<IProps> = memo(({ visible, data, onDetailClose }) => {
  const returnStatus = (type: number) => {
    switch (type) {
      case 0:
        return <Tag color="orange">待审核</Tag>;
      case 1:
        return <Tag color="green">已通过</Tag>;
      case 2:
        return <Tag color="red">已拒绝</Tag>;
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
      <Descriptions column={1}>
        <Descriptions.Item label="社群名称">{data?.title}</Descriptions.Item>
        <Descriptions.Item label="社群人数">{data?.total}</Descriptions.Item>
        <Descriptions.Item label="社群创建人">
          {data?.userName}
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">
          {getDate(data?.createTime)}
        </Descriptions.Item>

        <Descriptions.Item label="状态">
          {returnStatus(data?.checkStatus)}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
});

export default Detail;
