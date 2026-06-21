# 研究生管理系统 · 学生端

Vue 3 + Element Plus 构建的研究生信息管理学生门户。

## 🚀 在线演示

**http://106.54.8.221**

## 📦 技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | Vue 3 (Composition API) |
| UI 组件库 | Element Plus |
| 构建工具 | Vite 5 |
| 路由 | Vue Router 4 |
| 状态管理 | Pinia |
| 日期处理 | dayjs |

## 📂 项目结构

```
src/
├── App.vue                          # 根布局
├── main.js                          # 入口
├── router/index.js                  # 路由配置
├── stores/user.js                   # 数据层 (Mock)
├── assets/styles/global.css         # 全局样式
├── components/
│   ├── layout/
│   │   ├── Sidebar.vue              # 左侧导航
│   │   ├── TopNav.vue               # 顶部导航
│   │   └── WelcomeBar.vue           # 欢迎栏
│   └── common/
│       └── NotificationPanel.vue    # 通知公告 + 待办提醒
└── views/
    ├── home/HomePage.vue            # 首页(课表/学分/科研/学业进展)
    ├── personal/                    # 个人(6页)
    ├── research-work/               # 研工(4页)
    ├── mentorship/                  # 导学(5页)
    ├── cultivation/                 # 培养(4页)
    ├── research/                    # 科研(2页)
    ├── degree/                      # 学位(2页)
    └── graduated/                   # 已毕业
```

## 🔧 本地运行

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 🏗 生产构建

```bash
npm run build   # 输出到 dist/
```

## 📋 功能模块

| 一级菜单 | 二级页面 | 说明 |
|----------|----------|------|
| 个人学业中心 | 课表/学分进度/科研进度/学业进展 | 首页仪表盘 |
| 个人 | 信息/证件/档案/照片/注册/投诉 | 6个子页 |
| 研工 | 奖助学金/日常管理/三助一辅/困难 | 4个子页 |
| 导学 | 团队/学风/思想/文化/导师变更 | 5个子页 |
| 培养 | 方案/课务(11子tab)/考级/异动 | 4个子页 |
| 科研 | 学术成果/揭榜挂帅 | 2个子页 |
| 学位 | 论文(8子tab)/学位申请/就业 | 2个子页 |

## 🤝 参考来源

- 重庆邮电大学研究生管理系统需求文档
- 设计参考: Element Plus 官方文档
- 配色方案: 重庆邮电大学校徽蓝 (#153D97)
