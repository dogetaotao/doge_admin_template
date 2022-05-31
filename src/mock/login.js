const tokens = {
  admin: "admin-token",
  guest: "guest-token",
  editor: "editor-token",
};

const users = {
  "admin-token": {
    id: "admin",
    role: "admin",
    name: "dogetaotao",
    avatar: "https://tse1-mm.cn.bing.net/th/id/R-C.ba211b58b37557fbb78546db73e3bacc?rik=WZfayrIY%2fQta5w&riu=http%3a%2f%2fimg.woyaogexing.com%2f2017%2f02%2f24%2f56f29d72293a07ab!600x600.jpg&ehk=vwPsL%2bVmE4wnZFSMlLLAYkgvjjOeTDl%2bQFBL%2fmgSmow%3d&risl=&pid=ImgRaw&r=0",
    description: "拥有系统内所有菜单和路由权限",
  },
  "editor-token": {
    id: "editor",
    role: "editor",
    name: "编辑员",
    avatar: "https://tse1-mm.cn.bing.net/th/id/R-C.ba211b58b37557fbb78546db73e3bacc?rik=WZfayrIY%2fQta5w&riu=http%3a%2f%2fimg.woyaogexing.com%2f2017%2f02%2f24%2f56f29d72293a07ab!600x600.jpg&ehk=vwPsL%2bVmE4wnZFSMlLLAYkgvjjOeTDl%2bQFBL%2fmgSmow%3d&risl=&pid=ImgRaw&r=0",
    description:"可以看到除户管理页面之外的所有页面",
  },
  "guest-token": {
    id: "guest",
    role: "guest",
    name: "游客",
    avatar: "https://tse1-mm.cn.bing.net/th/id/R-C.ba211b58b37557fbb78546db73e3bacc?rik=WZfayrIY%2fQta5w&riu=http%3a%2f%2fimg.woyaogexing.com%2f2017%2f02%2f24%2f56f29d72293a07ab!600x600.jpg&ehk=vwPsL%2bVmE4wnZFSMlLLAYkgvjjOeTDl%2bQFBL%2fmgSmow%3d&risl=&pid=ImgRaw&r=0",
    description:"仅能看到Dashboard、作者博客、权限测试和关于作者四个页面",
  },
};

export default {
  login: (config) => {
    const { username } = JSON.parse(config.body);
    const token = tokens[username];
    if (!token) {
      return {
        status: 1,
        message: "用户名或密码错误",
      };
    }
    return {
      status: 0,
      token,
    };
  },
  userInfo: (config) => {
    const token = config.body;
    const userInfo = users[token];
    if (!userInfo) {
      return {
        status: 1,
        message: "获取用户信息失败",
      };
    }
    return {
      status: 0,
      userInfo,
    };
  },
  getUsers: () => {
    return {
      status: 0,
      users: Object.values(users),
    };
  },
  deleteUser: (config) => {
    const { id } = JSON.parse(config.body);
    const token = tokens[id];
    if (token) {
      delete tokens[id];
      delete users[token];
    }
    return {
      status: 0,
    };
  },
  editUser: (config) => {
    const data = JSON.parse(config.body);
    const { id } = data;
    const token = tokens[id];
    if (token) {
      users[token] = { ...users[token], ...data };
    }
    return {
      status: 0,
    };
  },
  ValidatUserID: (config) => {
    const userID = config.body;
    const token = tokens[userID];
    if (token) {
      return {
        status: 1,
      };
    } else {
      return {
        status: 0
      };
    }
  },
  addUser: (config) => {
    const data = JSON.parse(config.body);
    const { id } = data;
    tokens[id] = `${id}-token`
    users[`${id}-token`] = {
      ...users["guest-token"],
      ...data
    }
    return {
      status: 0,
    };
  },
  logout: (_) => {
    return {
      status: 0,
      data: "success",
    };
  },
};
