import React, { useContext, useState, useEffect, useRef, memo } from 'react';
import { Table, Input, Button, Popconfirm, Form, InputRef } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { PlusOutlined } from '@ant-design/icons';
import './index.less';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title}是必填项`,
          },
        ]}
      >
        <Input
          placeholder={`请输入${title}`}
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
        />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24, height: 32 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = {
  columns: any;
  type?: string | number;
  columnsKeys: Array<any>;
  onChange?: Function;
};

interface DataType {
  key: React.Key;
  name: string;
  age: string;
  address: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const EditableTable: React.FC<EditableTableProps> = memo(
  ({ columns, type, columnsKeys, onChange }) => {
    const [data, setData] = useState<Array<any>>([]);
    const [columnsData, setColumnsData] = useState<Array<any>>([]);

    useEffect(() => {
      if (columnsKeys) {
        const data: any = {};
        for (let i = 0; i < columnsKeys.length; i += 1) {
          data[columnsKeys[i]] = '';
        }
        setData([data]);
      }
    }, [columnsKeys]);

    function onDelete(index: number) {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    }

    useEffect(() => {
      if (columns) {
        columns.push({
          title: '操作',
          dataIndex: 'handle',
          width: '15%',
          render: (t, record: { key: React.Key }, index: number) => {
            return index === 0 ? null : (
              <a onClick={() => onDelete(index)}>删除</a>
            );
          },
        });
        setColumnsData(columns);
      }
    }, [columns]);

    const handleSave = (row: DataType) => {
      console.log('handleSave', row);
      const newData = [...data];
      const index = newData.findIndex((item) => row.key === item.key);
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      console.log('newData', newData);
      setData(newData);
      if (typeof onChange === 'function') {
        onChange(newData);
      }
    };

    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const newColumns = columnsData.map((col: any) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: DataType) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: handleSave,
        }),
      };
    });

    function handleAdd() {
      const d: any = {};
      const newData = [...data];
      for (let i = 0; i < columnsKeys.length; i += 1) {
        d[columnsKeys[i]] = '';
      }
      newData.push(d);
      setData(newData);
    }
    return (
      <div>
        {(type === 1 || type === '1') && (
          <Button onClick={handleAdd} type="primary" icon={<PlusOutlined />}>
            新增
          </Button>
        )}
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={data}
          columns={newColumns as ColumnTypes}
          pagination={false}
        />
      </div>
    );
  },
);

export default EditableTable;
