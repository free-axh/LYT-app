import { memo, useEffect, useState, useRef } from 'react';
import Table from '@/components/table';
import Detail from './detail';

const Information = memo(() => {
  const [data, setData] = useState<undefined | any[]>(undefined);
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const staticRef = useRef<{ data: undefined | any[] }>({
    data: undefined,
  });

  const columns = [
    {
      title: '车牌号',
      dataIndex: 'key1',
      key: 'key1',
      align: 'center' as 'center',
    },
    {
      title: '违停信息',
      dataIndex: 'key2',
      key: 'key2',
      align: 'center' as 'center',
    },
    {
      title: '违停时间',
      dataIndex: 'key3',
      key: 'key3',
      align: 'center' as 'center',
    },
    {
      title: '车主姓名',
      key: 'key4',
      dataIndex: 'key4',
      align: 'center' as 'center',
    },
    {
      title: '车主手机',
      key: 'key5',
      dataIndex: 'key5',
      align: 'center' as 'center',
    },
    {
      title: '操作',
      key: 'key6',
      dataIndex: 'key6',
      align: 'center' as 'center',
      render: (text: any, record: any) => {
        function detailHandle(id: number) {
          setDetailVisible(true);
        }
        return <a onClick={() => detailHandle(record.id)}>详情</a>;
      },
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      const data: any = [
        {
          key1: '浙H·D23J1',
          key2: '违章占用人行道',
          key3: '2022-1-8 23:41:34',
          key4: '张**',
          key5: '134****6387',
          key6: '',
        },
        {
          key1: '浙H·D23J1',
          key2: '违章占用人行道',
          key3: '2022-1-8 23:41:34',
          key4: '张**',
          key5: '134****6387',
          key6: '',
        },
      ];
      setData(data);
      staticRef.current.data = data;
    }, 500);
  }, []);

  function onDetailClose() {
    setDetailVisible(false);
  }

  function onQuery(value: string) {
    setData(undefined);
    setTimeout(() => {
      if (Array.isArray(staticRef.current.data)) {
        const arr = staticRef.current.data.filter((item) => {
          return item.key1.indexOf(value) !== -1;
        });
        setData(arr);
      }
    }, 500);
  }

  return (
    <>
      <Table columns={columns} dataSource={data} search onQuery={onQuery} />;
      <Detail
        visible={detailVisible}
        data={detailData}
        onDetailClose={onDetailClose}
      />
    </>
  );
});

export default Information;
