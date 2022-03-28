import { memo, useRef, useState } from 'react';
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
    const [editorState, setEditorState] = useState(
      BraftEditor.createEditorState(null),
    );
    const [imageUrl, setImageUrl] = useState();
    const [loading, setLoading] = useState(false);
    const staticData = useRef({
      url: null,
    });

    const handleOk = () => {
      form.submit();
    };

    const handleCancel = () => {
      if (typeof onClose === 'function') {
        onClose();
      }
    };

    const onFinish = (values: any) => {
      const options = Object.assign({}, values, {
        peoplePhoto: staticData.current.url,
        peopleInfo: editorState.toHTML(),
      });
      if (typeof onSubmit === 'function') {
        onSubmit(options);
      }
    };

    const handleEditorChange = function (editorState: any) {
      // console.log('2222222', editorState.toHTML());
      setEditorState(editorState);
    };

    function getBase64(img: Blob, callback: Function) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    }

    /**
     * 上传图片改变事件
     */
    const handleChange = function (info: any) {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        const fd = new FormData();
        fd.append('file', info.file.originFileObj);
        uploadFile(fd).then((res) => {
          if (res.status === 200 && res.data && res.data.code === 0) {
            staticData.current.url = res.data.data;
          }
        });

        getBase64(info.file.originFileObj, (imageUrl: any) => {
          setImageUrl(imageUrl);
          setLoading(false);
        });
      }
    };

    const beforeUpload = function (file: any) {
      const fd = new FormData();
      fd.append('file', file);
      uploadFile(fd).then((res) => {
        if (res.status === 200 && res.data && res.data.code === 0) {
          staticData.current.url = res.data.data;
        }
      });
      getBase64(file, (imageUrl: any) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
      return false;
    };

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>添加图片</div>
      </div>
    );

    const columns = [
      {
        title: '库存',
        dataIndex: 'name',
        width: '30%',
        editable: true,
      },
      {
        title: '重量（kg）',
        dataIndex: 'age',
        width: '30%',
        editable: true,
      },
      {
        title: '售价（元）',
        dataIndex: 'address',
        width: '30%',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'handle',
        render: (_, record: { key: React.Key }) => {
          return <a>删除</a>;
        },
      },
    ];

    return (
      <Modal
        className={styles.modal}
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        centered={true}
        width={800}
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
        >
          <Form.Item
            label="商品类别"
            name="date"
            rules={[{ required: true, message: '请选择商品类别' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="商品名称"
            name="date"
            rules={[{ required: true, message: '请输入商品名称' }]}
          >
            <Input placeholder="请输入商品名称" />
          </Form.Item>
          <Form.Item label="商品规格" name="peopleInfo">
            <Radio.Group>
              <Radio value="1">单规格</Radio>
              <Radio value="0">多规格</Radio>
            </Radio.Group>
            <EditableTable
              columns={columns}
              dataSource={[
                {
                  key: '0',
                  name: 'Edward King 0',
                  age: '32',
                  address: 'London, Park Lane no. 0',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="商品主图"
            rules={[{ required: true, message: '请上传图片' }]}
            extra="最多添加五张图片"
          >
            <Upload
              name="avatar"
              style={{ background: '#ffffff' }}
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              // onChange={handleChange}
              beforeUpload={beforeUpload}
              accept={'.jpg, .jpeg, .png'}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item label="商品描述" name="peopleInfo">
            <BraftEditor
              placeholder="请输入商品描述"
              className={styles.editor}
              value={editorState}
              onChange={handleEditorChange}
            />
          </Form.Item>
          <Form.Item label="是否上架" name="peopleInfo">
            <Radio.Group>
              <Radio value="1">上架</Radio>
              <Radio value="0">下架</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    );
  },
);

export default IModal;
