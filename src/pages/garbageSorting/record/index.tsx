import { memo, useEffect, useState, useRef } from 'react';
import Table from '@/components/table';

const Receive = memo(() => {
  const [data, setData] = useState<undefined | any[]>(undefined);
  const staticRef = useRef<{ data: undefined | any[] }>({
    data: undefined,
  });

  const columns = [
    {
      title: '投放地点',
      dataIndex: 'key1',
      key: 'key1',
      align: 'center' as 'center',
    },
    {
      title: '投放时间',
      dataIndex: 'key2',
      key: 'key2',
      align: 'center' as 'center',
    },
    {
      title: '投放人',
      dataIndex: 'key3',
      key: 'key3',
      align: 'center' as 'center',
    },
    {
      title: '账号',
      key: 'key4',
      dataIndex: 'key4',
      align: 'center' as 'center',
    },
    {
      title: '获取积分',
      key: 'key5',
      dataIndex: 'key5',
      align: 'center' as 'center',
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      const data: any = [
        {
          key1: '翠光一区3号垃圾桶',
          key2: '2022-1-8 23:37:24',
          key3: '张三',
          key4: '139****3824',
          key5: 5,
        },
        {
          key1: '翠光一区2号垃圾桶',
          key2: '2022-1-8 23:37:24',
          key3: '李四',
          key4: '139****3824',
          key5: 6,
        },
      ];
      setData(data);
      staticRef.current.data = data;
    }, 500);
  }, []);

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

  return <Table columns={columns} dataSource={data} search onQuery={onQuery} />;
});

export default Receive;
