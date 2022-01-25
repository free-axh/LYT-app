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
      <Descriptions column={2}>
        <Descriptions.Item label="好物名称" span={2}>
          {data?.name}
        </Descriptions.Item>
        {data?.picture1 || data?.picture2 || data?.picture3 ? (
          <>
            {data?.picture1 && (
              <Descriptions.Item span={1}>
                <img width={150} height={150} src={data?.picture1} />
              </Descriptions.Item>
            )}
            {data?.picture2 && (
              <Descriptions.Item span={1}>
                <img width={150} height={150} src={data?.picture2} />
              </Descriptions.Item>
            )}
            {data?.picture3 && (
              <Descriptions.Item span={1}>
                <img width={150} height={150} src={data?.picture3} />
              </Descriptions.Item>
            )}
          </>
        ) : (
          <Descriptions.Item label="图片" span={2}>
            无图片
          </Descriptions.Item>
        )}
        {data?.picture &&
          data.picture.map((item: any) => {
            return (
              <Descriptions.Item span={1}>
                <img width={150} height={150} src={item.pic} />
              </Descriptions.Item>
            );
          })}
      </Descriptions>
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
