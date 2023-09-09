export default [
  { path: '/', name: '快速开始', icon: 'ReadOutlined', component: './Begining' },
  { path: '/shortInterface', name: '短连接接口服务', icon: 'smile', component: './ShortInterface' },
  { path: '/longInterface', name: 'OpenAI对话服务', icon: 'RedditCircleFilled', component: './LongInterface' },
  { path: '/short_interface_info/:id', name: '查看接口', icon: 'smile', component: './ShortInterfaceInfo', hideInMenu: true },
  { path: '/long_interface_info/:id', name: '查看接口', icon: 'smile', component: './LongInterfaceInfo', hideInMenu: true },
  { path: '/account', name: '个人信息',  component: './AccountInfo', hideInMenu: true },
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' },
    ],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { name: '接口管理', icon: 'table', path: '/admin/interface_info', component: './Admin/InterfaceInfo' },
      { name: '接口分析', icon: 'analysis', path: '/admin/interface_analysis', component: './Admin/InterfaceAnalysis' },
    ],
  },

  // { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
