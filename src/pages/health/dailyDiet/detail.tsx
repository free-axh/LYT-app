import { memo } from 'react';
import { Drawer, Descriptions, Divider, Button, Tag, Image } from 'antd';
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
      destroyOnClose={true}
    >
      <Divider orientation="left">基本信息</Divider>
      <Descriptions column={2}>
        <Descriptions.Item label="食谱日期" span={2}>
          {data?.name}
        </Descriptions.Item>
        <Descriptions.Item label="添加时间" span={2}>
          {data?.name}
        </Descriptions.Item>
      </Descriptions>
      <Divider orientation="left">早餐</Divider>
      <Descriptions column={2}>
        <Descriptions.Item label="名称" span={2}>
          {data?.name}
        </Descriptions.Item>
        <Descriptions.Item label="图片" span={2}>
          {data?.name}
        </Descriptions.Item>
        <Descriptions.Item label="食材名称" span={2}>
          {data?.name}
        </Descriptions.Item>
        <Descriptions.Item label="烹饪方式" span={2}>
          {data?.name}
        </Descriptions.Item>
      </Descriptions>
      <Divider orientation="left">午餐</Divider>
      <Descriptions column={2}>
        <Descriptions.Item label="名称" span={2}>
          {data?.name}
        </Descriptions.Item>
        <Descriptions.Item label="图片" span={2}>
          {data?.name}
        </Descriptions.Item>
        <Descriptions.Item label="食材名称" span={2}>
          {data?.name}
        </Descriptions.Item>
        <Descriptions.Item label="烹饪方式" span={2}>
          {data?.name}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
});

export default Detail;
