import { memo, useState } from 'react';
import { Button, Modal, Radio, Input, Form, Descriptions } from 'antd';
import styles from './index.less';

interface IProps {
  visible: boolean;
  title: string;
  onClose: Function;
  data: any;
}

const IModal: React.FC<IProps> = memo(({ visible, title, onClose, data }) => {
  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      className={styles.modal}
      title={title}
      visible={visible}
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
              onClick={handleCancel}
            >
              关闭
            </Button>
          </div>
        </div>
      }
    >
      <Descriptions column={1}>
        <Descriptions.Item label="审核时间">{data?.time}</Descriptions.Item>
        <Descriptions.Item label="审核人">{data?.persion}</Descriptions.Item>
        <Descriptions.Item label="审核信息">{data?.info}</Descriptions.Item>
        <Descriptions.Item label="拒绝理由">{data?.resion}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
});

export default IModal;
