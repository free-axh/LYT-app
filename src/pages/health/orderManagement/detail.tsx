import { memo } from 'react';
import { Drawer, Descriptions, List, Button, Tag, Table, Avatar } from 'antd';
import { updateOrderList } from '@/util/servers';
import { getDate } from '@/util/function';

interface IProps {
  visible: boolean;
  data: any | null;
  onDetailClose: Function;
  onConfirm?: Function;
}

const Detail: React.FC<IProps> = memo(
  ({ visible, data, onDetailClose, onConfirm: onSubmit }) => {
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
        title: '单价(元)',
        dataIndex: 'price',
        key: 'price',
        align: 'center' as 'center',
      },
      {
        title: '金额小计(元)',
        dataIndex: 'total',
        key: 'total',
        align: 'center' as 'center',
        render: (t: any, record: any) => {
          if (record.number && record.price) {
            return Number(record.number) * Number(record.price);
          }
          return '';
        },
      },
    ];

    const getStatus = (code: number) => {
      switch (code) {
        case 0:
          return <Tag color="red">未付款</Tag>;
        case 1:
          return <Tag color="green">已完成</Tag>;
        case 2:
          return <Tag color="orange">待发货</Tag>;
        case 3:
          return <Tag color="green">已发货</Tag>;
        case 4:
          return <Tag color="orange">退款中</Tag>;
        case 5:
          return <Tag color="green">已关闭</Tag>;
      }
    };

    const getMessage = (r: any) => {
      switch (r.orderStatus) {
        case 0:
          return '';
        case 1:
          return `收货时间：${getDate(r.consigneeTime) || '无'}`;
        case 3:
          return `发货时间：${getDate(r.sendTime) || '无'}`;
        case 2:
          return '';
        case 4:
          return '';
        case 5:
          return '';
      }
    };

    const onConfirm = () => {
      const time = new Date().getTime();
      updateOrderList({ id: data.id, orderStatus: 3, sendTime: time }).then(
        (res) => {
          if (res.status === 200 && res?.data && res?.data.code === 0) {
            if (typeof onSubmit === 'function') {
              onSubmit(data.id, time);
            }
          }
        },
      );
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
        width={600}
      >
        <Descriptions column={2} title={'订单状态'} />
        <List
          itemLayout="horizontal"
          dataSource={[{ title: '' }]}
          renderItem={(item: any) => (
            <List.Item
              actions={[
                (data?.orderStatus === 2 || data?.orderStatus === '2') && (
                  <Button onClick={onConfirm}>确认发货</Button>
                ),
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`/ocean${data?.detail?.orderList[0]?.picture1}`}
                  />
                }
                title={getStatus(data.orderStatus)}
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
            {getDate(data?.createTime)}
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
  },
);

export default Detail;
