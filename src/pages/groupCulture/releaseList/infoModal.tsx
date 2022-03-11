import { memo, useState } from 'react';
import { Button, Modal, Radio, Input, Tag, Descriptions } from 'antd';
import styles from './index.less';
import { getDate } from '@/util/function';

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

  const returnCheckStatus = function (status: number) {
    switch (status) {
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
          {getDate(data?.checkTime)}
        </Descriptions.Item>
        <Descriptions.Item label="审核人">{data?.checkName}</Descriptions.Item>
        <Descriptions.Item label="审核信息">
          {returnCheckStatus(data?.checkStatus)}
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
