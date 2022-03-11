import { memo, useState } from 'react';
import { Button, Modal, Radio, Input, Tag, Descriptions } from 'antd';
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

  const returnStatus = (t: number) => {
    switch (t) {
      case 0:
        return <Tag color="orange">待审核</Tag>;
      case 1:
        return <Tag color="green">已通过</Tag>;
      case 2:
        return <Tag color="red">已拒绝</Tag>;
    }
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
        <Descriptions.Item label="审核时间">
          {data?.checkTime}
        </Descriptions.Item>
        <Descriptions.Item label="审核人">{data?.persion}</Descriptions.Item>
        <Descriptions.Item label="审核信息">
          {returnStatus(data?.checkStatus)}
        </Descriptions.Item>
        {data?.checkStatus === 2 && (
          <Descriptions.Item label="拒绝理由">
            {data?.checkMsg}
          </Descriptions.Item>
        )}
      </Descriptions>
    </Modal>
  );
});

export default IModal;
