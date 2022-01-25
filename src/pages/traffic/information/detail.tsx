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
        <Descriptions.Item label="车牌号">{data?.key1}</Descriptions.Item>
        <Descriptions.Item label="车主姓名">{data?.key4}</Descriptions.Item>
        <Descriptions.Item label="车主手机号">{data?.key5}</Descriptions.Item>
      </Descriptions>
      <Divider dashed orientation="left">
        违章信息
      </Divider>
      <Descriptions column={2}>
        <Descriptions.Item label="违章时间" span={2}>
          {data?.key3}
        </Descriptions.Item>
        <Descriptions.Item label="违法行为" span={2}>
          {data?.key2}
        </Descriptions.Item>
        {data?.picture ? (
          <>
            {data.picture.map((item: string) => (
              <Descriptions.Item span={1}>
                <img width={150} height={150} src={item} />
              </Descriptions.Item>
            ))}
          </>
        ) : (
          <Descriptions.Item label="违章图片" span={2}>
            无图片
          </Descriptions.Item>
        )}
      </Descriptions>
    </Drawer>
  );
});

export default Detail;
