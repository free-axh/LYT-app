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
          key1: '远洋1号楼垃圾桶',
          key2: '2022-1-20 23:37:24',
          key3: '李伟',
          key4: '13986543824',
          key5: 20,
        },
        {
          key1: '远洋6号楼垃圾桶',
          key2: '2022-1-20 23:55:24',
          key3: '李伟',
          key4: '13986543824',
          key5: 20,
        },
        // {
        //   key1: '朝晖一小区1号垃圾桶',
        //   key2: '2022-1-15 20:50:24',
        //   key3: '张净',
        //   key4: '18756498366',
        //   key5: 40,
        // },
        // {
        //   key1: '朝晖二小区1号垃圾桶',
        //   key2: '2022-1-15 22:50:24',
        //   key3: '张净',
        //   key4: '18756498366',
        //   key5: 27,
        // },
        // {
        //   key1: '朝晖二小区1号垃圾桶',
        //   key2: '2022-1-16 21:50:24',
        //   key3: '黄明',
        //   key4: '17784659876',
        //   key5: 27,
        // },
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
