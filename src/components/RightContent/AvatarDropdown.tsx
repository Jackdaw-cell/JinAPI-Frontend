import { outLogin } from '@/services/ant-design-pro/api';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import {Avatar, Menu, message, Spin, Tag} from 'antd';
import type { ItemType } from 'antd/es/menu/hooks/useItems';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, {useCallback, useEffect, useState} from 'react';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import {getLoginUserUsingGET, userLogoutUsingPOST} from "@/services/yuapi-backend/userController";

type loginUser={
  id: string,
  userName: string,
  userAvatar: string,
  userProfile: string,
  userRole: string,
  createTime: string,
  updateTime: string
}


export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const fetchUserInfo = async (): Promise<object | undefined> => {
  try {
    // @ts-ignore
    const res = await getLoginUserUsingGET();
    if (res.data) {
      return res.data
    }
  }catch (err){
    return undefined;
  }
  return undefined;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const [currentUser, setcurrentUser] = useState<loginUser>();
  const loadData = async (current = 1, pageSize = 5) => {
    try {
      const res =await fetchUserInfo();
      setcurrentUser(res)
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    await outLogin();
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };
  // const { initialState, setInitialState } = useModel('@@initialState');
  const onMenuClick = useCallback(
    async (event: MenuInfo) => {
      const {key} = event;
      if (key === 'logout') {
        // flushSync(() => {
        //   setInitialState((s) => ({ ...s, currentUser: undefined }));
        // });
        const msg=await userLogoutUsingPOST();
        if (msg.code==0) {
          message.success('退出登录！')
          if (!history) return;
          const { query } = history.location;
          history.push({
            pathname: '/user/login',
            query,
          });
          return;
        }
      }
      if (key === 'center') {
        // const msg=await getLoginUserUsingGET();
        // if (msg.code==0) {
          if (!history) return;
          const { query } = history.location;
          history.push({
            pathname: '/account',
            query,
          });
        //   return;
        // }
      }
    },
    // [setInitialState],
    [setcurrentUser],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!currentUser) {
    return loading;
  }

  const menuItems: ItemType[] = [
    {
      key: 'center',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick} items={menuItems} />
  );
  const role = (
    <Tag color="gold">管理员</Tag>
  );
  const user = (
    <Tag color="gold">用户</Tag>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.userAvatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>{currentUser.userName}</span>
        <span className={`${styles.name} anticon`}>
          { currentUser.userRole=="admin"? (role):(user)}
        </span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
