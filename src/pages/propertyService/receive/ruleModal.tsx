import { memo, useEffect, useState } from 'react';
import { Button, Modal, Form, message } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import styles from './index.less';
import { getRecipientsRules, updateRecipientsRules } from '@/util/servers';

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
    const [id, setId] = useState();

    useEffect(() => {
      getRecipientsRules({ code: 0 }).then((res) => {
        if (res.status === 200 && res.data?.code === 0) {
          setId(res.data.data.id);
          setEditorState(BraftEditor.createEditorState(res.data.data.msg));
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

    const onFinish = () => {
      if (typeof onSubmit === 'function') {
        updateRecipientsRules({ id, msg: editorState.toHTML() }).then((res) => {
          console.log('res', res);
          if (res.status === 200 && res.data?.code === 0) {
            message.success('编辑领用规则成功');
            onSubmit();
          } else {
            message.error('编辑领用规则失败');
          }
        });
      }
    };

    const handleEditorChange = function (editorState: any) {
      // console.log('2222222', editorState.toHTML());
      setEditorState(editorState);
    };

    console.log('editorState', editorState);

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
                保存
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
          // labelCol={{ span: 4 }}
          // wrapperCol={{ span: 18 }}
        >
          <Form.Item
            // label="达人简介"
            name="msg"
            // rules={[{ required: true, message: '请输入达人简介' }]}
          >
            <BraftEditor
              placeholder="请输入达人简介"
              style={{ border: '1px solid #d9d9d9' }}
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
