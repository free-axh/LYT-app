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
      console.log(1111111, values);
      // const options = Object.assign({}, values, {
      //   peoplePhoto: staticData.current.url,
      //   peopleInfo: editorState.toHTML(),
      // });
      // if (typeof onSubmit === 'function') {
      //   onSubmit(options);
      // }
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
            label="添加日期"
            name="putawayTime"
            rules={[{ required: true, message: '请选择日期' }]}
          >
            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.List name="foodType0">
            {(fields, { add, remove }) => (
              <>
                <Form.Item label="添加早餐">
                  <Button onClick={() => add()} block icon={<PlusOutlined />}>
                    添加食谱
                  </Button>
                </Form.Item>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    style={{
                      backgroundColor: '#f1f1f1',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 22,
                        right: 10,
                        color: 'red',
                      }}
                    >
                      <Tooltip placement="top" title={'删除'}>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Tooltip>
                    </div>
                    <Form.Item
                      {...restField}
                      label="名称"
                      name={[name, 'foodName']}
                      labelAlign={'left'}
                      labelCol={{ span: 3, offset: 4 }}
                      wrapperCol={{ span: 15 }}
                      rules={[{ required: true, message: '请输入名称' }]}
                      style={{ paddingTop: '20px' }}
                    >
                      <Input placeholder="请输入名称" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="图片"
                      name={[name, 'picture']}
                      labelAlign={'left'}
                      labelCol={{ span: 3, offset: 4 }}
                      wrapperCol={{ span: 15 }}
                      rules={[{ required: true, message: '请上传图片' }]}
                      extra="最多添加三张图片"
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
                        maxCount={3}
                      >
                        {/* {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt="avatar"
                            style={{ width: '100%' }}
                          />
                        ) : ( */}
                        {uploadButton}
                        {/* )} */}
                      </Upload>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="食材名称"
                      name={[name, 'foodMaterials']}
                      labelAlign={'left'}
                      labelCol={{ span: 3, offset: 4 }}
                      wrapperCol={{ span: 15 }}
                      rules={[{ required: true, message: '请输入食谱名称' }]}
                    >
                      <Input placeholder="请输入食谱名称" />
                    </Form.Item>
                    <Form.Item
                      label="烹饪方式"
                      name={[name, 'cookWay']}
                      labelAlign={'left'}
                      labelCol={{ span: 3, offset: 4 }}
                      wrapperCol={{ span: 15 }}
                      rules={[{ required: true, message: '请输入烹饪方式' }]}
                      style={{ paddingBottom: '20px' }}
                    >
                      <BraftEditor
                        placeholder="请输入烹饪方式"
                        className={styles.editor}
                        value={editorState}
                        onChange={handleEditorChange}
                      />
                    </Form.Item>
                  </div>
                ))}
              </>
            )}
          </Form.List>
          <Form.List name="foodType1">
            {(fields, { add, remove }) => (
              <>
                <Form.Item label="添加午餐">
                  <Button onClick={() => add()} block icon={<PlusOutlined />}>
                    添加食谱
                  </Button>
                </Form.Item>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    style={{
                      backgroundColor: '#f1f1f1',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 22,
                        right: 10,
                        color: 'red',
                      }}
                    >
                      <Tooltip placement="top" title={'删除'}>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Tooltip>
                    </div>
                    <Form.Item
                      {...restField}
                      label="名称"
                      name={[name, 'foodName']}
                      labelAlign={'left'}
                      labelCol={{ span: 3, offset: 4 }}
                      wrapperCol={{ span: 15 }}
                      rules={[{ required: true, message: '请输入名称' }]}
                      style={{ paddingTop: '20px' }}
                    >
                      <Input placeholder="请输入名称" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="图片"
                      name={[name, 'picture']}
                      labelAlign={'left'}
                      labelCol={{ span: 3, offset: 4 }}
                      wrapperCol={{ span: 15 }}
                      rules={[{ required: true, message: '请上传图片' }]}
                      extra="最多添加三张图片"
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
                          <img
                            src={imageUrl}
                            alt="avatar"
                            style={{ width: '100%' }}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="食材名称"
                      name={[name, 'foodMaterials']}
                      labelAlign={'left'}
                      labelCol={{ span: 3, offset: 4 }}
                      wrapperCol={{ span: 15 }}
                      rules={[{ required: true, message: '请输入食谱名称' }]}
                    >
                      <Input placeholder="请输入食谱名称" />
                    </Form.Item>
                    <Form.Item
                      label="烹饪方式"
                      name={[name, 'cookWay']}
                      labelAlign={'left'}
                      labelCol={{ span: 3, offset: 4 }}
                      wrapperCol={{ span: 15 }}
                      rules={[{ required: true, message: '请输入烹饪方式' }]}
                      style={{ paddingBottom: '20px' }}
                    >
                      <BraftEditor
                        placeholder="请输入烹饪方式"
                        className={styles.editor}
                        value={editorState}
                        onChange={handleEditorChange}
                      />
                    </Form.Item>
                  </div>
                ))}
              </>
            )}
          </Form.List>
          <Form.List name="foodType3">
            {(fields, { add, remove }) => (
              <>
                <Form.Item label="添加晚餐">
                  <Button onClick={() => add()} block icon={<PlusOutlined />}>
                    添加食谱
                  </Button>
                </Form.Item>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    style={{
                      backgroundColor: '#f1f1f1',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 22,
                        right: 10,
                        color: 'red',
                      }}
                    >
                      <Tooltip placement="top" title={'删除'}>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Tooltip>
                    </div>
                    <Form.Item
                      {...restField}
                      label="名称"
                      name={[name, 'foodName']}
                      labelAlign={'left'}
                      labelCol={{ span: 3, offset: 4 }}
                      wrapperCol={{ span: 15 }}
                      rules={[{ required: true, message: '请输入名称' }]}
                      style={{ paddingTop: '20px' }}
                    >
                      <Input placeholder="请输入名称" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="图片"
                      name={[name, 'picture']}
                      labelAlign={'left'}
                      labelCol={{ span: 3, offset: 4 }}
                      wrapperCol={{ span: 15 }}
                      rules={[{ required: true, message: '请上传图片' }]}
                      extra="最多添加三张图片"
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
                          <img
                            src={imageUrl}
                            alt="avatar"
                            style={{ width: '100%' }}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="食材名称"
                      name={[name, 'foodMaterials']}
                      labelAlign={'left'}
                      labelCol={{ span: 3, offset: 4 }}
                      wrapperCol={{ span: 15 }}
                      rules={[{ required: true, message: '请输入食谱名称' }]}
                    >
                      <Input placeholder="请输入食谱名称" />
                    </Form.Item>
                    <Form.Item
                      label="烹饪方式"
                      name={[name, 'cookWay']}
                      labelAlign={'left'}
                      labelCol={{ span: 3, offset: 4 }}
                      wrapperCol={{ span: 15 }}
                      rules={[{ required: true, message: '请输入烹饪方式' }]}
                      style={{ paddingBottom: '20px' }}
                    >
                      <BraftEditor
                        placeholder="请输入烹饪方式"
                        className={styles.editor}
                        value={editorState}
                        onChange={handleEditorChange}
                      />
                    </Form.Item>
                  </div>
                ))}
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    );
  },
);

export default IModal;
