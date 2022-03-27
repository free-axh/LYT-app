import { memo, useEffect, useState } from 'react';
import { Space, Tag, message, Popconfirm, Button } from 'antd';
import Table from '@/components/table';
import { getDate } from '@/util/function';
import { PlusOutlined } from '@ant-design/icons';
import RecipeModal from './recipeModal';
import Detail from './detail';

const DailyDiet = memo(() => {
  const [data, setData] = useState(undefined);
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);
  const [queryValue, setQueryValue] = useState('');
  const [current, setCurrent] = useState(1);
  const [recipeModalFlag, setRecipeModalFlag] = useState(false);

  const columns = [
    {
      title: '食谱日期',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as 'center',
    },
    {
      title: '添加时间',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center' as 'center',
    },
    {
      title: '操作',
      key: 'handle',
      dataIndex: 'handle',
      width: 400,
      align: 'center' as 'center',
      render: (text: any, record: any) => {
        function detailHandle(id) {
          setDetailVisible(true);
        }

        function editHandle(r) {
          setRecipeModalFlag(true);
        }

        function onDelete(id) {}
        return (
          <Space size="middle">
            <a onClick={() => detailHandle(record.id)}>详情</a>
            <a onClick={() => editHandle(record)}>编辑</a>
            <Popconfirm
              title="是否确定删除?"
              onConfirm={() => onDelete(record.id)}
            >
              <a>删除</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    setData([
      {
        name: '2022-1-8',
        userName: '2019-9-5 21:14:14',
      },
    ]);
  }, [pages]);

  function reload() {
    setData(undefined);
  }

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

  function addRecipe() {
    setRecipeModalFlag(true);
  }

  function onRecipeModalClose() {
    setRecipeModalFlag(false);
  }

  function onDetailClose() {
    setDetailVisible(false);
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        total={total}
        search
        current={current}
        onQuery={onQuery}
        onPageChange={onPageChange}
        searchRender={
          <Button onClick={addRecipe} type="primary" icon={<PlusOutlined />}>
            添加食谱
          </Button>
        }
      />
      {recipeModalFlag && (
        <RecipeModal
          visible={recipeModalFlag}
          title="新增食谱"
          onClose={onRecipeModalClose}
        />
      )}
      <Detail
        visible={detailVisible}
        data={detailData}
        onDetailClose={onDetailClose}
      />
    </>
  );
});

export default DailyDiet;
