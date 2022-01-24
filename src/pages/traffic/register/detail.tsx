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

interface IProps {
  visible: boolean;
  data: any | null;
  onDetailClose: Function;
}

const Detail: React.FC<IProps> = memo(({ visible, data, onDetailClose }) => {
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
        车辆信息
      </Divider>
      <Descriptions column={1}>
        <Descriptions.Item label="车牌号">渝A123456</Descriptions.Item>
        <Descriptions.Item label="车主姓名">张三</Descriptions.Item>
        <Descriptions.Item label="车主手机号">15100000000</Descriptions.Item>
      </Descriptions>
      <Divider dashed orientation="left">
        违章信息
      </Divider>
      <Descriptions column={1}>
        <Descriptions.Item label="违章时间">
          2022-1-6 15:20:39
        </Descriptions.Item>
        <Descriptions.Item label="违法行为">违章占用人行道</Descriptions.Item>
        <Descriptions.Item label="违章图片">{undefined}</Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
});

export default Detail;
