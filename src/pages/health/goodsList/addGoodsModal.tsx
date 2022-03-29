import { memo, useEffect, useRef, useState } from 'react';
import {
  Button,
  Modal,
  DatePicker,
  Input,
  Form,
  Upload,
  Select,
  Tooltip,
  Radio,
} from 'antd';
import BraftEditor from 'braft-editor';
import {
  LoadingOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import 'braft-editor/dist/index.css';
import styles from './index.less';
import { uploadFile } from '@/util/servers';
import EditableTable from '@/components/editableTable';
import { getGoodsTypeList } from '@/util/servers';

const { Option } = Select;
interface IProps {
  visible: boolean;
  title: string;
  onClose?: Function;
  onSubmit?: Function;
  data?: object;
}

const IModal: React.FC<IProps> = memo(
  ({ visible, title, onClose, onSubmit }) => {
    const [form] = Form.useForm();
    const [typeList, setTypeList] = useState<Array<any>>([]);
    const [specificationType, setSpecificationType] = useState(0);
    const [columnsKeys, setColumnsKeys] = useState([
      'specificationName',
      'inventory',
      'weight',
      'price',
    ]);
    const staticData = useRef({
      tableData: null,
    });

    useEffect(() => {
      getGoodsTypeList({ pageNo: 1, pageSize: 999 }).then((res) => {
        if (res.status === 200 && res?.data && res?.data.code === 0) {
          setTypeList(res.data.data);
        }
      });
    }, []);

    const handleOk = () => {
      form.submit();
    };

    const handleCancel = () => {
      if (typeof onClose === 'function') {
        onClose();
      }
    };

    const onFinish = (values: any) => {
      console.log('value', values);

      const data: any = {
        foodTypeId: values.foodTypeId,
        foodName: values.foodName,
        specificationType: values.specificationType,
        foodMsg: values.foodMsg.toHTML(),
        putaway: values.putaway,
        specificationList: staticData.current.tableData,
      };
      for (let i = 0; i < values.picture.fileList.length; i += 1) {
        data[`picture${i + 1}`] = values.picture.fileList[i].response.data;
      }
      console.log('11111111', data);
      if (typeof onSubmit === 'function') {
        onSubmit(data);
      }
    };

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>添加图片</div>
      </div>
    );

    const columns = [
      {
        title: '规格名称',
        dataIndex: 'specificationName',
        width: '23%',
        editable: true,
      },
      {
        title: '库存',
        dataIndex: 'inventory',
        width: '23%',
        editable: true,
      },
      {
        title: '重量（kg）',
        dataIndex: 'weight',
        width: '23%',
        editable: true,
      },
      {
        title: '售价（元）',
        dataIndex: 'price',
        width: '23%',
        editable: true,
      },
    ];

    function onChange(e: any) {
      setSpecificationType(e.target.value);
    }

    function onEditableTableChange(values: any) {
      staticData.current.tableData = values;
    }

    return (
      <Modal
        className={styles.modal}
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        centered={true}
        width={1200}
        footer={
          <div className={styles.modalFooter}>
            <div>
              <Button
                type="primary"
                style={{ borderRadius: '20px' }}
                onClick={handleOk}
              >
                添加
              </Button>
            </div>
            <div>
              <Button
                type="primary"
                style={{ borderRadius: '20px' }}
                onClick={handleCancel}
              >
                取消
              </Button>
            </div>
          </div>
        }
      >
        <Form
          form={form}
          autoComplete="off"
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          initialValues={{
            specificationType: '0',
            putaway: '0',
          }}
        >
          <Form.Item
            label="商品类别"
            name="foodTypeId"
            rules={[{ required: true, message: '请选择商品类别' }]}
          >
            <Select placeholder="请选择商品类别">
              {typeList.map((res) => (
                <Option value={res.id}>{res.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="商品名称"
            name="foodName"
            rules={[{ required: true, message: '请输入商品名称' }]}
          >
            <Input placeholder="请输入商品名称" />
          </Form.Item>
          <Form.Item
            label="商品规格"
            name="specificationType"
            rules={[{ required: true, message: '请选择商品规格' }]}
          >
            <Radio.Group onChange={onChange}>
              <Radio value="0">单规格</Radio>
              <Radio value="1">多规格</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="typeList" wrapperCol={{ offset: 4, span: 18 }}>
            <EditableTable
              type={specificationType}
              columns={columns}
              columnsKeys={columnsKeys}
              onChange={onEditableTableChange}
            />
          </Form.Item>
          <Form.Item
            label="商品主图"
            name={'picture'}
            rules={[{ required: true, message: '请上传图片' }]}
            extra="最多添加五张图片"
          >
            <Upload
              action={'/ocean/file/upload'}
              name="file"
              style={{ background: '#ffffff' }}
              listType="picture-card"
              className="avatar-uploader"
              accept={'.jpg, .jpeg, .png'}
              maxCount={5}
            >
              {uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item label="商品描述" name="foodMsg">
            <BraftEditor
              placeholder="请输入商品描述"
              className={styles.editor}
            />
          </Form.Item>
          <Form.Item label="是否上架" name="putaway">
            <Radio.Group>
              <Radio value="0">上架</Radio>
              <Radio value="1">下架</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    );
  },
);

export default IModal;
