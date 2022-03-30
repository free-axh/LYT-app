import { memo } from 'react';
import { Drawer, Descriptions, List, Button, Tag, Table, Avatar } from 'antd';
import styles from './index.less';
import { updateOrderList } from '@/util/servers';

interface IProps {
  visible: boolean;
  data: any | null;
  onDetailClose: Function;
}

const Detail: React.FC<IProps> = memo(({ visible, data, onDetailClose }) => {
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'foodName',
      key: 'foodName',
      align: 'center' as 'center',
    },
    {
      title: '规格',
      dataIndex: 'foodSpecification',
      key: 'foodSpecification',
      align: 'center' as 'center',
    },
    {
      title: '数量',
      dataIndex: 'number',
      key: 'number',
      align: 'center' as 'center',
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      align: 'center' as 'center',
    },
    {
      title: '金额小计',
      dataIndex: 'address',
      key: 'address',
      align: 'center' as 'center',
    },
  ];

  const getStatus = (code: number) => {
    switch (code) {
      case 0:
        return <Tag color="green">已收货</Tag>;
      case 1:
        return <Tag color="orange">制作中</Tag>;
      case 2:
        return <Tag color="orange">派送中</Tag>;
      case 4:
        return <Tag color="green">确认收货</Tag>;
    }
  };

  const getMessage = (r: any) => {
    switch (r.status) {
      case 0:
        return `收货时间：${r.consigneeTime || '无'}`;
      case 1:
        return `制作时间：${r.producerTime || '无'}`;
      case 2:
        return `派送时间：${r.sendTime} || '无'`;
      case 4:
        return `到达时间：${r.arriveTime} || '无'`;
    }
  };

  const onConfirm = () => {
    updateOrderList({ id: data.id }).then((res) => {});
  };
  console.log('11111111111111', data);

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
          <List.Item
            actions={[
              (data.status === 1 || data.status === 2) && (
                <Button onClick={onConfirm}>确认发货</Button>
              ),
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src={`/ocean${data?.detail?.orderList[0]?.picture1}`} />
              }
              title={getStatus(data.status)}
              description={getMessage(data)}
            />
          </List.Item>
        )}
      />
      <Descriptions column={2} title={'顾客信息'}>
        <Descriptions.Item label="收货人" span={2}>
          {data?.userName}
        </Descriptions.Item>
        <Descriptions.Item label="收货地址" span={2}>
          {data?.detail?.address}
        </Descriptions.Item>
        <Descriptions.Item label="收货时间" span={2}>
          {data?.consigneeTime}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions column={2} title={'订单详情'}>
        <Descriptions.Item label="订单编号" span={2}>
          {data?.orderNumber}
        </Descriptions.Item>
        <Descriptions.Item label="创建时间" span={2}>
          {data?.createTime}
        </Descriptions.Item>
        <Descriptions.Item label="订单金额" span={2}>
          {data?.money}
        </Descriptions.Item>
        <Descriptions.Item label="实付金额" span={2}>
          {data?.money}
        </Descriptions.Item>
        <Descriptions.Item label="备注" span={2}>
          {data?.msg}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title={'订单商品详情'} />
      <Table
        columns={columns}
        bordered
        dataSource={data?.detail?.orderList}
        pagination={false}
      />
    </Drawer>
  );
});

export default Detail;
