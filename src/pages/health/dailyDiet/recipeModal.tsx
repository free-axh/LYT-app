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
  message,
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
    const [fileList, setFileList] = useState<any>({});

    const handleOk = () => {
      form.submit();
    };

    const handleCancel = () => {
      if (typeof onClose === 'function') {
        onClose();
      }
    };

    const onFinish = async (values: any) => {
      console.log(1111111, values);
      let data: any = {};
      data.putawayTime = values.putawayTime.format('YYYY-MM-DD');
      const foods = [];
      if (values.foodType0) {
        let list = values.foodType0;
        for (let i = 0; i < list.length; i += 1) {
          const food: any = {
            foodMaterials: list[i].foodMaterials,
            foodName: list[i].foodName,
            cookWay: list[i].cookWay.toHTML(),
            foodType: 0,
          };
          for (let j = 0; j < list[i].picture.fileList.length; j += 1) {
            const picture = list[i].picture.fileList[j];
            food[`foodPicture${i === 0 ? '' : i}`] = picture.response.data;
          }
          foods.push(food);
        }
      }

      if (values.foodType1) {
        let list = values.foodType1;
        for (let i = 0; i < list.length; i += 1) {
          const food: any = {
            foodMaterials: list[i].foodMaterials,
            foodName: list[i].foodName,
            cookWay: list[i].cookWay.toHTML(),
            foodType: 0,
          };
          for (let j = 0; j < list[i].picture.fileList.length; j += 1) {
            const picture = list[i].picture.fileList[j];
            food[`foodPicture${i === 0 ? '' : i}`] = picture.response.data;
          }
          foods.push(food);
        }
      }

      if (values.foodType2) {
        let list = values.foodType2;
        for (let i = 0; i < list.length; i += 1) {
          const food: any = {
            foodMaterials: list[i].foodMaterials,
            foodName: list[i].foodName,
            cookWay: list[i].cookWay.toHTML(),
            foodType: 0,
          };
          for (let j = 0; j < list[i].picture.fileList.length; j += 1) {
            const picture = list[i].picture.fileList[j];
            food[`foodPicture${i === 0 ? '' : i}`] = picture.response.data;
          }
          foods.push(food);
        }
      }

      data.food = foods;
      console.log('data', data);
      if (typeof onSubmit === 'function') {
        onSubmit(data);
      }
    };

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>添加图片</div>
      </div>
    );

    console.log('files', fileList);

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
                        action={'/ocean/file/upload'}
                        name="file"
                        style={{ background: '#ffffff' }}
                        listType="picture-card"
                        className="avatar-uploader"
                        maxCount={3}
                        accept={'.jpg, .jpeg, .png'}
                      >
                        {uploadButton}
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
                        action={'/ocean/file/upload'}
                        name="file"
                        style={{ background: '#ffffff' }}
                        listType="picture-card"
                        className="avatar-uploader"
                        maxCount={3}
                        accept={'.jpg, .jpeg, .png'}
                      >
                        {uploadButton}
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
                      />
                    </Form.Item>
                  </div>
                ))}
              </>
            )}
          </Form.List>
          <Form.List name="foodType2">
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
                        action={'/ocean/file/upload'}
                        name="file"
                        style={{ background: '#ffffff' }}
                        listType="picture-card"
                        className="avatar-uploader"
                        maxCount={3}
                        accept={'.jpg, .jpeg, .png'}
                      >
                        {uploadButton}
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
