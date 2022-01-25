import { memo } from 'react';
import { Drawer, Descriptions, Divider, Button } from 'antd';

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
        <Descriptions.Item label="车牌号">{data?.carNumber}</Descriptions.Item>
        <Descriptions.Item label="登记人">{data?.userName}</Descriptions.Item>
        <Descriptions.Item label="登记时间">
          {data?.violationTime}
        </Descriptions.Item>
      </Descriptions>
      <Divider dashed orientation="left">
        违章信息
      </Divider>
      <Descriptions column={2}>
        <Descriptions.Item label="违章描述" span={2}>
          {data?.violationDesc}
        </Descriptions.Item>
        {data?.violationPic1 || data?.violationPic2 || data?.violationPic3 ? (
          <>
            {data?.violationPic1 && (
              <Descriptions.Item span={1}>
                <img width={150} height={150} src={data?.violationPic1} />
              </Descriptions.Item>
            )}
            {data?.violationPic2 && (
              <Descriptions.Item span={1}>
                <img width={150} height={150} src={data?.violationPic2} />
              </Descriptions.Item>
            )}
            {data?.violationPic3 && (
              <Descriptions.Item span={1}>
                <img width={150} height={150} src={data?.violationPic3} />
              </Descriptions.Item>
            )}
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
