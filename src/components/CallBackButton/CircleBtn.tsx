import { Button } from 'antd';
import React from 'react';

export type CircleButtonProps = {
  icon: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
  title?: string;
  key?: string;
  href?: string;
};


export const CircleBtn: React.FC<CircleButtonProps> = (props) => {
  const { onClick, title, icon, loading, href } = props;

  return (
    <Button
      title={title}
      loading={loading}
      icon={icon}
      block
      type={'text'}
      shape={'circle'}
      onClick={onClick}
      href={href}
      download=''
    />
  );
};
