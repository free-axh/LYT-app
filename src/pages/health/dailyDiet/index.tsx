import { memo, useEffect, useState } from 'react';
import { Space, message, Popconfirm, Button, Form, DatePicker } from 'antd';
import Table from '@/components/table';
import { getDate } from '@/util/function';
import { PlusOutlined } from '@ant-design/icons';
import RecipeModal from './recipeModal';
import Detail from './detail';
import {
  getRecipeList,
  addRecipeList,
  deleteRecipeList,
  detailRecipeList,
  updateRecipeList,
} from '@/util/servers';

const DailyDiet = memo(() => {
  const [data, setData] = useState(undefined);
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);
  const [queryValue, setQueryValue] = useState<string | null>(null);
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
        function detailHandle(record: any) {
          const options = Object.assign({}, pages, {
            params: { putawayTime: record.putawayTime },
          });
          detailRecipeList(options).then((res) => {
            if (res.status === 200 && res?.data && res?.data.code === 0) {
              setDetailData(res.data.data.records);
            }
          });
          setDetailVisible(true);
        }

        function editHandle(r: object) {
          const options = Object.assign({}, pages, {
            params: { putawayTime: record.putawayTime },
          });
          detailRecipeList(options).then((res) => {
            if (res.status === 200 && res?.data && res?.data.code === 0) {
              setDetailData(res.data.data.records);
            }
          });
          setRecipeModalFlag(true);
        }

        function onDelete(id: number) {
          deleteRecipeList({ id }).then((res) => {
            if (res.status === 200 && res?.data && res?.data.code === 0) {
              message.success('删除成功');
              reload();
            } else {
              message.error('删除失败');
            }
          });
        }

        return (
          <Space size="middle">
            <a onClick={() => detailHandle(record)}>详情</a>
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
      params: { putawayTime: queryValue },
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
    const options = Object.assign({}, pages, {
      params: { putawayTime: queryValue },
    });
    getRecipeList(options).then((data) => {
      if (data.status === 200) {
        setData(data?.data?.data?.records);
        setTotal(data?.data?.data?.total);
      }
    });
  }

  function onQuery(value: any) {
    setQueryValue(
      value.putawayTime ? value.putawayTime.format('YYYY-MM-DD') : null,
    );
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
    setDetailData(null);
    setRecipeModalFlag(true);
  }

  function onRecipeModalClose() {
    setRecipeModalFlag(false);
  }

  function onRecipeModalSubmit(values: any) {
    if (detailData) {
      // 编辑
      updateRecipeList(values).then((res) => {
        if (res.status === 200 && res?.data && res?.data.code === 0) {
          message.success('编辑食谱成功');
          setRecipeModalFlag(false);
          reload();
        } else {
          message.error('编辑食谱失败');
        }
      });
    } else {
      addRecipeList(values).then((res) => {
        if (res.status === 200 && res?.data && res?.data.code === 0) {
          message.success('添加食谱成功');
          setRecipeModalFlag(false);
          reload();
        } else {
          message.error('添加食谱失败');
        }
      });
    }
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
        customSearch={
          <>
            <Form.Item name="putawayTime">
              <DatePicker style={{ width: '200px' }} format="YYYY-MM-DD" />
            </Form.Item>
          </>
        }
        searchRender={
          <Button onClick={addRecipe} type="primary" icon={<PlusOutlined />}>
            添加食谱
          </Button>
        }
      />
      {recipeModalFlag && (
        <RecipeModal
          visible={recipeModalFlag}
          title={detailData ? '编辑食谱' : '新增食谱'}
          onClose={onRecipeModalClose}
          onSubmit={onRecipeModalSubmit}
          data={detailData}
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
