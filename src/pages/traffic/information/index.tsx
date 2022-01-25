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
        function detailHandle(record: any) {
          setDetailVisible(true);
          setDetailData(record);
        }
        return <a onClick={() => detailHandle(record)}>详情</a>;
      },
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      const data: any = [
        {
          key1: '浙HD23J1',
          key2: '违章占用人行道',
          key3: '2022-1-8 23:41:34',
          key4: '张益达',
          key5: '13466546387',
          key6: '',
          picture: null,
        },
        {
          key1: '浙K8307C',
          key2: '违章占用消防通道',
          key3: '2022-1-18 23:41:34',
          key4: '蔡文',
          key5: '17745836521',
          key6: '',
          picture: null,
        },
        {
          key1: '浙AU7730',
          key2: '违章占用人行道',
          key3: '2022-1-20 23:41:34',
          key4: '陈森',
          key5: '15102374523',
          key6: '',
          picture: null,
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
