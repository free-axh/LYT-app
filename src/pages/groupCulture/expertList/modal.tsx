import { memo, useState } from 'react';
import { Button, Modal, Radio, Input, Form, Upload } from 'antd';
import BraftEditor from 'braft-editor';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import 'braft-editor/dist/index.css';
import styles from './index.less';

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

    const handleOk = () => {
      form.submit();
    };

    const handleCancel = () => {
      if (typeof onClose === 'function') {
        onClose();
      }
    };

    const onFinish = (values: { resultFlag: string; failReason: string }) => {
      if (typeof onSubmit === 'function') {
        onSubmit(values);
      }
    };

    const handleEditorChange = function (editorState: any) {
      setEditorState(editorState);
    };

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
            name="username"
            rules={[{ required: true, message: '请输入达人姓名' }]}
          >
            <Input placeholder="请输入达人姓名" />
          </Form.Item>
          <Form.Item
            label="达人ID"
            name="username"
            rules={[{ required: true, message: '请输入达人ID' }]}
          >
            <Input placeholder="请输入达人ID" />
          </Form.Item>
          <Form.Item
            label="达人类型"
            name="username"
            rules={[{ required: true, message: '请输入达人类型' }]}
          >
            <Input placeholder="请输入达人类型" />
          </Form.Item>
          <Form.Item
            label="达人照片"
            name="username"
            rules={[{ required: true, message: '请输入达人类型' }]}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            >
              <span style={{ marginTop: 8 }}>Upload</span>
            </Upload>
          </Form.Item>
          <Form.Item
            label="达人简介"
            name="username"
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
