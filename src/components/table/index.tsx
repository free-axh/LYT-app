import {
  createRef,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Table, Input, Button, Space, Form } from 'antd';
import { ColumnsType, ColumnType } from 'antd/es/table';
import styles from './index.less';

interface IProps {
  columns: ColumnsType<IData>;
  dataSource: IData[] | undefined;
  search?: boolean;
  onQuery?: Function;
  searchRender?: ReactNode;
  total?: number;
  pageSize?: number;
  onPageChange?: Function;
  current?: number;
  customSearch?: any;
}

interface IData {
  name: String;
  key: String;
  dataIndex?: String;
  render?: Function;
  align?: String;
  width?: string | number;
}

const SearchTable: React.FC<IProps> = memo(
  ({
    columns,
    dataSource,
    search,
    onQuery,
    searchRender,
    total = 0,
    pageSize = 10,
    onPageChange,
    current,
    customSearch,
    ...props
  }) => {
    // const [height, setHeight] = useState(0);
    const [loading, setLoading] = useState(false);
    const staticRef = useRef({ value: '' });
    const [form] = Form.useForm();

    useEffect(() => {
      setLoading(dataSource ? false : true);
    }, [dataSource]);

    // useEffect(() => {
    //   const resizeObserver = new ResizeObserver((entries) => {
    //     for (let entry of entries) {
    //       setHeight(entry.contentRect.height - 171);
    //     }
    //   });
    //   const element = document.getElementById('tableContent') as HTMLElement;
    //   resizeObserver.observe(element);
    //   return () => {
    //     resizeObserver.unobserve(element);
    //   };
    // }, []);

    function onSearch() {
      if (onQuery) {
        onQuery(staticRef.current.value);
      }
    }

    function onChange(e: any) {
      staticRef.current.value = e.target.value;
    }

    function onPaginationChange(page: number, pageSize: number) {
      if (typeof onPageChange === 'function') {
        onPageChange(page, pageSize);
      }
    }

    function onFinish(values: any) {
      if (onQuery) {
        onQuery(values);
      }
    }

    return (
      <div className={styles.content} id="tableContent">
        {search && (
          <div className={styles.header}>
            {customSearch ? (
              <Form
                form={form}
                name="search-table"
                layout="inline"
                onFinish={onFinish}
              >
                {customSearch}
                <Form.Item>
                  <Space size="middle">
                    <Button onClick={() => form.submit()}>查询</Button>
                    {searchRender}
                  </Space>
                </Form.Item>
              </Form>
            ) : (
              <>
                <div className={styles.searchInput}>
                  <Input
                    placeholder="请输入关键字查询"
                    onChange={onChange}
                    allowClear
                  />
                </div>
                <div>
                  <Space size="middle">
                    <Button onClick={() => onSearch()}>查询</Button>
                    {searchRender}
                  </Space>
                </div>
              </>
            )}
          </div>
        )}
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          bordered
          // scroll={{ y: height }}
          pagination={{
            total,
            pageSize,
            current,
            onChange: onPaginationChange,
          }}
          {...props}
        />
      </div>
    );
  },
);

export default SearchTable;
