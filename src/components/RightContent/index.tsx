import { QuestionCircleOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Space } from 'antd';
import React from 'react';
import HeaderSearch from '../HeaderSearch';
import Avatar from './AvatarDropdown';
import styles from './index.less';
export type SiderTheme = 'light' | 'dark';
const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  if (!initialState || !initialState.settings) {
    return null;
  }
  const { navTheme, layout } = initialState.settings;
  let className = styles.right;
  if ((navTheme === 'realDark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      {/*<span*/}
      {/*  className={styles.action}*/}
      {/*  onClick={() => {*/}
      {/*    window.open('https://pro.ant.design/docs/getting-started');*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <QuestionCircleOutlined />*/}
      {/*</span>*/}
      <Avatar/>
    </Space>
  );
};
export default GlobalHeaderRight;
