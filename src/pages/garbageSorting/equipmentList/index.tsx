import { memo, useEffect, useState, useRef } from 'react';
import Table from '@/components/table';
import { getEquipmentList } from '@/util/servers';

const EquipmentList = memo(() => {
  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);
  const [queryValue, setQueryValue] = useState('');
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<undefined | any[]>(undefined);

  const columns = [
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
      align: 'center' as 'center',
    },
    {
      title: '所在小区',
      dataIndex: 'communityName',
      key: 'communityName',
      align: 'center' as 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center' as 'center',
    },
    {
      title: '主板编码',
      key: 'deviceCode',
      dataIndex: 'deviceCode',
      align: 'center' as 'center',
    },
    {
      title: '设备位置',
      key: 'deviceLocation',
      dataIndex: 'deviceLocation',
      align: 'center' as 'center',
    },
    {
      title: '设备ID',
      key: 'deviceId',
      dataIndex: 'deviceId',
      align: 'center' as 'center',
    },
    {
      title: '设备类型ID',
      key: 'deviceTypeId',
      dataIndex: 'deviceTypeId',
      align: 'center' as 'center',
    },
    {
      title: '设备类型名称',
      key: 'deviceTypeName',
      dataIndex: 'deviceTypeName',
      align: 'center' as 'center',
    },
  ];

  useEffect(() => {
    setData(undefined);
    const options = Object.assign({}, pages, {
      params: { deviceName: queryValue },
    });
    getEquipmentList(options).then((data) => {
      if (data.status === 200) {
        setData(data?.data?.data?.records);
        setTotal(data?.data?.data?.total);
      }
    });
  }, [pages]);

  function onQuery(value: string) {
    setQueryValue(value);
    setPages({
      pageNo: 1,
      pageSize: 10,
    });
    setCurrent(1);
  }

  function onPageChange(page: number, pageSize: number) {
    setPages({
      pageNo: page,
      pageSize: pageSize,
    });
    setCurrent(page);
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      total={total}
      onPageChange={onPageChange}
      current={current}
      search
      onQuery={onQuery}
    />
  );
});

export default EquipmentList;
