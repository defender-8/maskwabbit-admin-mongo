import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';

import Layout from '../../App/Layout';
import { Spin, Form, FormItem, Input, UploadImage } from '../../base/components';
import { FormActions } from '../../components';

import category, { getById, save, remove } from '../../modules/category';
import useFeedbackEffect from '../../base/hooks/useFeedbackEffect';
import useFeedbackCallback from '../../base/hooks/useFeedbackCallback';

function CategoryForm({ history, match, getById, save, remove, data }) {
  const { params: { id }, url } = match;
  const [form] = Form.useForm();

  const { loading: getLoading } = useFeedbackEffect(async () => {
    if (id) {
      await getById(id);
    }
  }, [id, getById]);

  useEffect(() => {
    if (data) {
      const {title, image, description} = data;
      form.setFieldsValue({title, image, description});
    };
  }, [data]);

  useEffect(() => {
    if (!id) {
      form.resetFields();
    };
  }, []);

  const { callback: onFinish, loading: saveLoading } = useFeedbackCallback(async (values) => {
    if (id) {
      values.id = id;
    }

    await save(values);
    message.success('Successfully saved!');
  }, [id, save]);

  const {callback: deleteItem, loading: delLoading} = useFeedbackCallback(async () => {
    await remove(id, false);
    message.success('Successfully removed!');
    history.replace(url.substring(0, url.indexOf(`/${id}`)));
  }, [remove, id]);

  return (
    <Layout title={!id ? 'Add New Category' : 'Edit Category'}>
      {
        getLoading ? (<Spin />) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <FormActions
              deleteItem={deleteItem}
              isItemNew={!id}
              saveLoading={saveLoading}
              delLoading={delLoading}
            />
            <div className="container-sm">
              <FormItem
                name="title"
                label="Title:"
                rules={[{ required: true }]}
              >
                <Input />
              </FormItem>
              <FormItem
                name="image"
                label="Image:"
                rules={[{ required: true }]}
              >
                <UploadImage />
              </FormItem>
              <FormItem
                name="description"
                label="Description:"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={5} />
              </FormItem>
            </div>
          </Form>
        )
      }
    </Layout>
  );
}

export default connect(state => ({
  data: state[category.name].data,
}), {getById, save, remove})(CategoryForm);
