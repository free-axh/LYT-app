import { memo, useRef, useState } from 'react';
import {
  Drawer,
  Descriptions,
  List,
  Avatar,
  Divider,
  Typography,
  Button,
  Tag,
  Modal,
  Radio,
  Input,
  Form,
} from 'antd';
import styles from './index.less';

interface IProps {
  visible: boolean;
  title: string;
  onClose: Function;
  onSubmit: Function;
  initialValues?: any;
}

const TypeModal: React.FC<IProps> = memo(
  ({ visible, title, onClose, onSubmit, initialValues }) => {
    const [form] = Form.useForm();

    const handleOk = () => {
      form.submit();
    };

    const handleCancel = () => {
      onClose();
    };

    const onFinish = (values: { resultFlag: string; failReason: string }) => {
      if (initialValues) {
        const data = Object.assign({}, { id: initialValues.id }, { ...values });
        onSubmit(data);
      } else {
        onSubmit(values);
      }
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
                确认添加
              </Button>
            </div>
            <div>
              <Button
                type="primary"
                style={{ borderRadius: '20px' }}
                onClick={handleCancel}
              >
                取消添加
              </Button>
            </div>
          </div>
        }
      >
        <Form
          form={form}
          initialValues={initialValues}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            label="分类名称"
            name="name"
            rules={[{ required: true, message: '请输入分类名称' }]}
          >
            <Input placeholder="请输入分类名称" />
          </Form.Item>
          <Form.Item
            label="分类排序"
            name="seq"
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

export default TypeModal;
