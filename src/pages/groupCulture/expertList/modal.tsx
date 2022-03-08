import { memo, useState } from 'react';
import { Button, Modal, Radio, Input, Form, Upload } from 'antd';
import styles from './index.less';

interface IProps {
  visible: boolean;
  title: string;
  onClose: Function;
  onSubmit: Function;
}

const IModal: React.FC<IProps> = memo(
  ({ visible, title, onClose, onSubmit }) => {
    const [value, setValue] = useState('1');
    const [form] = Form.useForm();

    const handleOk = () => {
      form.submit();
    };

    const handleCancel = () => {
      onClose();
    };

    const onChange = (e: any) => {
      setValue(e.target.value);
    };

    const onFinish = (values: { resultFlag: string; failReason: string }) => {
      onSubmit(values);
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
        width={350}
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
        <Form form={form} autoComplete="off" onFinish={onFinish}>
          <Form.Item
            label="达人姓名"
            name="username"
            rules={[{ required: true, message: '请输入达人姓名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="达人ID"
            name="username"
            rules={[{ required: true, message: '请输入达人ID' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="达人类型"
            name="username"
            rules={[{ required: true, message: '请输入达人类型' }]}
          >
            <Input />
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
              <div>
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            label="达人简介"
            name="username"
            rules={[{ required: true, message: '请输入达人简介' }]}
          ></Form.Item>
        </Form>
      </Modal>
    );
  },
);

export default IModal;
