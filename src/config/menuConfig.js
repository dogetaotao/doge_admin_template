import {
  FileTextOutlined,
  HomeOutlined,
  KeyOutlined,
  LockOutlined,
  DotChartOutlined,
  FileExcelOutlined,
  CodepenOutlined,
  TableOutlined,
  FileZipOutlined,
  IssuesCloseOutlined,
  ClusterOutlined,
  UserOutlined,
} from "@ant-design/icons"
import React from "react";

const menuList = [
  {
    title: '首页',
    path: '/dashboard',
    icon: <HomeOutlined/>,
    roles: ['admin', 'editor', 'guest']
  },
  {
    title: '引导页',
    path: '/guide',
    icon: <KeyOutlined/>,
    roles: ['admin', 'editor', 'guest']
  },
  {
    title: "权限控制",
    path: "/permission",
    icon: <LockOutlined />,
    children: [
      {
        title: "权限说明",
        path: "/permission/explanation",
        roles:["admin"]
      },
      {
        title: "admin页面",
        path: "/permission/adminPage",
        roles:["admin"]
      },
      {
        title: "guest页面",
        path: "/permission/guestPage",
        roles:["guest"]
      },
      {
        title: "editor页面",
        path: "/permission/editorPage",
        roles:["editor"]
      },
    ],
  },
  {
    title: '用户管理',
    icon: <UserOutlined />,
    roles: ['admin'],
    path: '/user'
  },
  {
    title: 'Components',
    icon: <CodepenOutlined />,
    roles: ['admin', 'editor'],
    path: '/components',
    children: [
      {
        title: 'Markdown',
        path: '/components/markdown',
        roles: ['admin', 'editor'],
      },
      {
        title: '富文本编辑器',
        path: '/components/richtexteditor',
        roles: ['admin', 'editor'],
      },
    ]
  },
  {
    title: '图表',
    icon: <DotChartOutlined />,
    roles: ['admin', 'editor'],
    path: '/charts',
    children: [
      {
        title: "混合图表",
        path: "/charts/mixchart",
        roles: ['admin', 'editor']
      },
      {
        title: "键盘图表",
        path: "/charts/keyboard",
        roles: ['admin', 'editor']
      },
      {
        title: "折线图",
        path: "/charts/line",
        roles: ['admin', 'editor']
      }
    ]
  },
  {
    title: 'Excel',
    icon: <FileExcelOutlined/>,
    roles: ['admin', 'editor'],
    path: '/excel',
    children: [
      {
        title: "导出Excel",
        path: "/excel/export",
        roles: ['admin', 'editor']
      },
      {
        title: "上传Excel",
        path: "/excel/upload",
        roles: ['admin', 'editor']
      }
    ]
  },
  {
    title: 'table',
    icon: <TableOutlined />,
    roles: ['admin', 'editor'],
    path: '/table'
  },
  {
    title: 'zip',
    icon: <FileZipOutlined />,
    roles: ['admin', 'editor'],
    path: '/zip'
  },
  {
    title: "路由嵌套",
    path: "/nested",
    icon: <ClusterOutlined />,
    roles:["admin","editor"],
    children: [
      {
        title: "菜单1",
        path: "/nested/menu1",
        children: [
          {
            title: "菜单1-1",
            path: "/nested/menu1/menu1-1",
            roles:["admin","editor"],
          },
          {
            title: "菜单1-2",
            path: "/nested/menu1/menu1-2",
            children: [
              {
                title: "菜单1-2-1",
                path: "/nested/menu1/menu1-2/menu1-2-1",
                roles:["admin","editor"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: '作者博客',
    path: '/doc',
    icon: <FileTextOutlined/>,
    roles: ['admin', 'editor', 'guest']
  },
  {
    title: '404',
    icon: <IssuesCloseOutlined />,
    roles: ['admin', 'editor', 'guest'],
    path: '/404'
  },
]

export default menuList
