import { memo, useRef, useState } from 'react';
import { Button, Modal, Radio, Input, Form, Upload, Select } from 'antd';
import BraftEditor from 'braft-editor';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import 'braft-editor/dist/index.css';
import styles from './index.less';
import { uploadFile } from '@/util/servers';

const { Option } = Select;
interface IProps {
  visible: boolean;
  title: string;
  onClose?: Function;
  onSubmit?: Function;
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
      console.log('file', file);
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
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

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
            label="达人姓名"
            name="peopleName"
            rules={[{ required: true, message: '请输入达人姓名' }]}
          >
            <Input placeholder="请输入达人姓名" />
          </Form.Item>
          <Form.Item
            label="达人ID"
            name="peopleId"
            rules={[{ required: true, message: '请输入达人ID' }]}
          >
            <Input placeholder="请输入达人ID" />
          </Form.Item>
          <Form.Item
            label="达人类型"
            name="peopleType"
            rules={[{ required: true, message: '请输入达人类型' }]}
          >
            <Input placeholder="请输入达人类型" />
            {/* <Select placeholder="请选择达人类型">
              <Option value="0">书法</Option>
              <Option value="1">手工</Option>
              <Option value="2">美食</Option>
            </Select> */}
          </Form.Item>
          <Form.Item
            label="达人照片"
            name="peoplePhoto"
            rules={[{ required: true, message: '请输入达人类型' }]}
          >
            <Upload
              name="avatar"
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
          <Form.Item
            label="达人简介"
            name="peopleInfo"
            rules={[{ required: true, message: '请输入达人简介' }]}
          >
            <BraftEditor
              placeholder="请输入达人简介"
              className={styles.editor}
              value={editorState}
              onChange={handleEditorChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  },
);

export default IModal;
