import { memo } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

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
}

const SearchTable: React.FC<IProps> = memo(
  ({ columns, dataSource, search, ...props }) => {
    return (
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          bordered
          scroll={{ y: 530 }}
          {...props}
        />
      </div>
    );
  },
);

export default SearchTable;
