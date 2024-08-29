
import React, { useEffect, useState } from 'react';
import {Button} from "antd";

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { ProForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { SubmitterProps } from '@ant-design/pro-form/es/components';
import { Col, Row } from 'antd';

import './Login.css'
import { useTranslation } from 'react-i18next';


type LoginFormProps = {
  onSubmit: (values: any) => Promise<void>;
};

export const LoginForm: React.FC<LoginFormProps> = (props) => {

  const { onSubmit } = props

  const [form] = ProForm.useForm();

  const { t } = useTranslation()

  const [submitting, setSubmitting] = useState(false);

  const handleClickLogin = async () => {
    setSubmitting(true);
    await onSubmit({...form.getFieldsValue()})
    setSubmitting(false);
  };

  const renderLoginForm = () => {
    return (
      <>
        <ProFormText
          label={t('login.username.placeholder')}
          name='userName'
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined />
          }}
          required
          placeholder={t('login.username.placeholder')}
          rules={[
            {
              required: true,
              message: t('login.username.required')
            }
          ]}
        />
        <ProFormText.Password
          label={t('login.password.placeholder')}
          name='password'
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined />
          }}
          placeholder={t('login.password.placeholder')}
          rules={[
            {
              required: true,
              message: t('login.password.required')
            }
          ]}
        />
        {/*<Row>
          <Col span={18}>
            <ProFormCheckbox name='autoLogin'>记住当前用户</ProFormCheckbox>
          </Col>
          <Col span={6}>
            <ProFormCheckbox name='ldapLogin' hidden={!ldapEnabled}>
              LDAP 登录
            </ProFormCheckbox>
          </Col>
        </Row>*/}
      </>
    )
  }

  const proFormSubmitter: SubmitterProps = {
    searchConfig: { submitText: t('common.login') },
    resetButtonProps: false,
    submitButtonProps: {
      loading: submitting,
      autoFocus: true,
      htmlType: 'button',
      size: 'large',
      shape: 'round',
      style: { width: '100%' }
    }
  };

  return (
    <ProForm
      className={'loginform'}
      form={form}
      onFinish={handleClickLogin}
      initialValues={{ autoLogin: true }}
      submitter={{ ...proFormSubmitter }}
    >
      {renderLoginForm()}
    </ProForm>
  )
}

// export default Login
