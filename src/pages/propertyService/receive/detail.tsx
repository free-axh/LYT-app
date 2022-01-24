import { memo } from 'react';
import { Drawer, Descriptions, Divider, Button, Tag } from 'antd';

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
        物品
      </Divider>
      <Descriptions column={2}>
        <Descriptions.Item label="申领物品" span={2}>
          {data?.objName}
        </Descriptions.Item>
        <Descriptions.Item label="图片" span={2} />
        {data?.picture &&
          data.picture.map((item: any) => {
            return (
              <Descriptions.Item span={1}>
                <img width={150} height={150} src={item.pic} />
              </Descriptions.Item>
            );
          })}
      </Descriptions>
      <Divider dashed orientation="left">
        申领人信息
      </Divider>
      <Descriptions column={1}>
        <Descriptions.Item label="工单下单时间">
          {data?.lendDate}
        </Descriptions.Item>
        <Descriptions.Item label="姓名">{data?.lendUser}</Descriptions.Item>
        <Descriptions.Item label="联系方式">
          {data?.lendPhone}
        </Descriptions.Item>
        <Descriptions.Item label="地址">{data?.lendAddress}</Descriptions.Item>
        <Descriptions.Item label="用途说明">
          {data?.lendPurpose}
        </Descriptions.Item>
        <Descriptions.Item label="申请领用日期">
          {data?.lendDate}
        </Descriptions.Item>
      </Descriptions>
      {data?.approvalStatus !== undefined && data?.approvalStatus !== null && (
        <>
          <Divider dashed orientation="left">
            审核信息
          </Divider>
          <Descriptions column={1}>
            <Descriptions.Item label="审核状态">
              <Tag color={data?.approvalStatus === 1 ? 'green' : 'red'}>
                {data?.approvalStatus === 1 ? '审核通过' : '审核拒绝'}
              </Tag>
            </Descriptions.Item>
            {data?.approvalStatus === 0 && (
              <Descriptions.Item label="拒绝理由">
                {data?.approvalFailExplain}
              </Descriptions.Item>
            )}
            <Descriptions.Item label="审核人">
              {data?.approvalUser}
            </Descriptions.Item>
            <Descriptions.Item label="审核时间">
              {data?.approvalDate}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Drawer>
  );
});

export default Detail;
