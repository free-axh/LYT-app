import {
  createRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Table, Input, Button } from 'antd';
import { ColumnsType, ColumnType } from 'antd/es/table';
import styles from './index.less';

interface IProps {
  columns: ColumnsType<IData>;
  dataSource: IData[];
  search?: boolean;
}

interface IData {
  name: String;
  key: String;
  dataIndex?: String;
  render?: Function;
  align?: String;
}

const SearchTable: React.FC<IProps> = memo(
  ({ columns, dataSource, search, ...props }) => {
    const [height, setHeight] = useState(0);

    useEffect(() => {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setHeight(entry.contentRect.height - 171);
        }
      });
      const element = document.getElementById('tableContent') as HTMLElement;
      resizeObserver.observe(element);
      return () => {
        resizeObserver.unobserve(element);
      };
    }, []);

    return (
      <div className={styles.content} id="tableContent">
        {search && (
          <div className={styles.header}>
            <div className={styles.searchInput}>
              <Input placeholder="请输入关键字查询" />
            </div>
            <div>
              <Button>查询</Button>
            </div>
          </div>
        )}
        <Table
          columns={columns}
          dataSource={dataSource}
          bordered
          scroll={{ y: height }}
          {...props}
        />
      </div>
    );
  },
);

export default SearchTable;
