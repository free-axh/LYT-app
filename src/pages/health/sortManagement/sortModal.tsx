import { memo, useEffect } from 'react';
import { Button, Modal, Input, Form } from 'antd';
import styles from './index.less';

interface IProps {
  visible: boolean;
  title: string;
  onClose: Function;
  onSubmit: Function;
  data?: object | null;
}

const IModal: React.FC<IProps> = memo(
  ({ visible, title, onClose, onSubmit, data }) => {
    const [form] = Form.useForm();

    useEffect(() => {
      if (data) {
        form.setFieldsValue(data);
      }
    }, [data]);

    const handleOk = () => {
      form.submit();
    };

    const handleCancel = () => {
      onClose();
    };

    const onFinish = (values: { name: string; indexNumber: number }) => {
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
            name="name"
            label="分类名称"
            rules={[{ required: true, message: '请输入分类名称' }]}
          >
            <Input placeholder="请输入分类名称" />
          </Form.Item>
          <Form.Item
            name="indexNumber"
            label="分类排序"
            rules={[{ required: true, message: '请输入分类排序' }]}
            extra="数值越小，排序越高"
          >
            <Input placeholder="请输入分类排序" />
          </Form.Item>
        </Form>
      </Modal>
    );
  },
);

export default IModal;
