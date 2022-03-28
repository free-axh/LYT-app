import { memo, useEffect, useState } from 'react';
import { Space, Tag, message, Popconfirm, Button } from 'antd';
import Table from '@/components/table';
import { getDate } from '@/util/function';
import { PlusOutlined } from '@ant-design/icons';
import RecipeModal from './recipeModal';
import Detail from './detail';
import { getRecipeList, addRecipeList } from '@/util/servers';

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
      dataIndex: 'putawayTime',
      key: 'putawayTime',
      align: 'center' as 'center',
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center' as 'center',
      render: (t: number) => {
        return getDate(t);
      },
    },
    {
      title: '操作',
      key: 'handle',
      dataIndex: 'handle',
      width: 400,
      align: 'center' as 'center',
      render: (text: any, record: any) => {
        function detailHandle(id: number) {
          setDetailVisible(true);
        }

        function editHandle(r: object) {
          setRecipeModalFlag(true);
        }

        function onDelete(id: number) {}
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
    setData(undefined);
    const options = Object.assign({}, pages, {
      params: { foodName: queryValue },
    });
    getRecipeList(options).then((data) => {
      if (data.status === 200) {
        setData(data?.data?.data?.records);
        setTotal(data?.data?.data?.total);
      }
    });
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

  function onRecipeModalSubmit(values: any) {
    addRecipeList(values).then((res) => {});
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
          onSubmit={onRecipeModalSubmit}
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
