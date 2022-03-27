import { memo } from 'react';
import { Drawer, Descriptions, List, Button, Tag, Table, Avatar } from 'antd';
import styles from './index.less';

interface IProps {
  visible: boolean;
  data: any | null;
  onDetailClose: Function;
}

const Detail: React.FC<IProps> = memo(({ visible, data, onDetailClose }) => {
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '规格',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '数量',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '单价',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '金额小计',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <Drawer
      visible={visible}
      closable={false}
      mask={false}
      placement="right"
      footer={<Button onClick={() => onDetailClose()}>关闭</Button>}
      footerStyle={{ textAlign: 'center' }}
      destroyOnClose={true}
      width={600}
    >
      <Descriptions column={2} title={'订单状态'} />
      <List
        itemLayout="horizontal"
        dataSource={[{ title: 'Ant Design Title 1' }]}
        renderItem={(item: any) => (
          <List.Item actions={[<Button>确认发货</Button>]}>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<Tag color={'green'}>已发货，待确认收货</Tag>}
              description="发货时间：2022-1-8 22:04:32"
            />
          </List.Item>
        )}
      />
      <Descriptions column={2} title={'顾客信息'}>
        <Descriptions.Item label="收货人" span={2}>
          {'曹操 18968149042'}
        </Descriptions.Item>
        <Descriptions.Item label="收货地址" span={2}>
          {'浙江省杭州市江干区鸳鸯锡新小区7幢23单元453号'}
        </Descriptions.Item>
        <Descriptions.Item label="收货时间" span={2}>
          {'2019-6-1 17:45:21'}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions column={2} title={'订单详情'}>
        <Descriptions.Item label="订单编号" span={2}>
          {'1254512541255121'}
        </Descriptions.Item>
        <Descriptions.Item label="创建时间" span={2}>
          {'2018-12-12 16:12:12'}
        </Descriptions.Item>
        <Descriptions.Item label="订单金额" span={2}>
          {'￥120.00'}
        </Descriptions.Item>
        <Descriptions.Item label="实付金额" span={2}>
          {'￥120.00'}
        </Descriptions.Item>
        <Descriptions.Item label="备注" span={2}>
          {''}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title={'订单商品详情'} />
      <Table columns={columns} bordered />
    </Drawer>
  );
});

export default Detail;
