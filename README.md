# 开发技术知识库

一个纯静态的知识库网站：左边目录树、右边正文、顶部搜索，外加「学习路径」。零依赖、零构建、不需要 npm，双击 `index.html` 就能看，也可以直接扔到任何静态托管。

面向不懂技术的 vibe coding 开发者：每条知识点都写清「是什么 / 什么时候用 / 什么时候别用 / 常见踩坑 / 常见场景」，前端 24 个 UI 组件还配了能直接点的运行效果。

**线上地址**：https://dengkang336-glitch.github.io/zhishiku/
（Cloudflare Worker 也部署了一份：https://zhishiku.dengkang336.workers.dev ，国内网络可能打不开，见 `docs/DEPLOY.md`）

## 现在有什么

13 个大类、294 个节点，其中 **232 条叶子知识点**、**630 条常见踩坑**、**5 条学习路径**：

| 大类 | 叶子数 | 内容 |
|---|---|---|
| 前端开发 | 50 | 框架、页面结构、24 个 UI 组件（全部带可交互示例）、样式、工程化、框架生态（Hooks / 状态库 / 组件库 / 表单 / 请求 / 文件路由 / lint / monorepo） |
| 后端开发 | 32 | 语言、Web 框架、API 设计、核心机制、Python 常用件（Pydantic / SQLAlchemy+Alembic / Celery / Gunicorn）、Node 常用件（Prisma / Zod / BullMQ / SQLite） |
| 数据库 | 13 | MySQL / PostgreSQL / SQLite / SQL Server、MongoDB / Redis / ES、SQL 与索引事务备份 |
| 中间件与基础设施 | 12 | Nginx / 网关 / CDN、Kafka / RabbitMQ、对象存储、监控告警 |
| 云服务与三方服务 | 8 | 托管平台、云服务器、对象存储、云数据库、登录认证、支付、邮件短信、AI 接口 |
| DevOps 与部署 | 14 | 服务器与托管、Docker / K8s、CI/CD、域名 HTTPS 上线 |
| 移动端开发 | 10 | iOS / Android 原生、RN / Flutter / WebView、上架 / 推送 / 内购 |
| AI 与大模型 | 18 | 模型调用、提示词工程、RAG、Agent、Token 成本与评估 |
| 编程语言与基础 | 21 | 10 种语言、通用基础概念、Git 与 GitHub |
| 架构与设计 | 18 | 单体 / 微服务、设计原则、设计模式、接口与数据建模 |
| 安全 | 13 | 认证授权、XSS / SQL 注入 / CSRF、密钥与隐私、上线前自查 |
| 测试与质量 | 11 | 单元 / 集成 / E2E、Vitest / Playwright / pytest、覆盖率与 CI |
| 数据与分析 | 12 | 埋点、漏斗、图表选型、数据仓库与管道、指标口径 |

学习路径（顶部「学习路径」按钮进入，每步可打勾，进度存在浏览器本地）：

| 路径 | 步数 | 给谁 |
|---|---|---|
| 从零到上线：非技术背景主线 | 12 | 想用 AI 做产品但不知道从哪下手 |
| 前端专精：从页面到交互 | 12 | 要做界面、调样式、自己实现交互 |
| 后端与数据：让产品真的能存能算 | 12 | 要做登录、存储、支付、通知 |
| AI 应用开发者：把模型接进产品 | 11 | 要做 AI 功能、AI 客服、AI 工具 |
| 上线与安全体检 | 12 | 东西做完了，准备给真实用户用 |

## 怎么用

- 浏览器打开：`open index.html`，或 `python3 -m http.server 8814` 后访问 http://localhost:8814/
- 左边目录逐层展开；每篇文章底部有子分类卡片
- 顶部搜索框搜组件名（按钮）、技术名（Redis）、场景（什么时候用缓存）
- 网址跟着内容变（`#/frontend/ui/button`、`#/paths/ai`），可以收藏 / 分享
- 手机上是抽屉式目录，点左上角汉堡按钮拉出
- 点左上角「K 技术知识库」回到首页

## 目录结构

```
zhishiku/
├── index.html          # 页面骨架（script 按顺序引入 data/*.js，最后 app.js）
├── style.css           # 全部样式
├── app.js              # 目录树 / 正文渲染 / 搜索 / hash 路由 / 学习路径
├── data/
│   ├── frontend.js     # 每个大类一个文件，注册到 window.KB.<key>
│   ├── backend.js      # （新增内容用 children.push 追加在文件末尾）
│   ├── database.js
│   ├── middleware.js
│   ├── cloud.js        # 云服务与三方服务
│   ├── devops.js
│   ├── mobile.js
│   ├── ai.js
│   ├── language.js
│   ├── architecture.js
│   ├── security.js
│   ├── testing.js
│   ├── data.js
│   ├── pitfalls.js     # 常见踩坑，按「节点 id → 坑列表」挂载（window.KB_PITFALLS）
│   └── paths.js        # 学习路径（window.KB_PATHS）
├── docs/
│   ├── DEPLOY.md       # 部署与更新流程
│   └── pages.yml.example
├── vercel.json         # Vercel 部署配置（含安全响应头）
├── wrangler.jsonc      # Cloudflare Workers 静态资源部署配置
├── netlify.toml        # Netlify 部署配置
├── _headers            # Cloudflare Pages 响应头
├── robots.txt
└── .nojekyll           # GitHub Pages 必备：别让 Jekyll 处理仓库
```

## 怎么加内容（不需要懂编程也能改）

### 加一条知识点

打开 `data/` 里对应大类的文件，照抄一段现有条目改文字即可。字段：

```js
{
  id: "frontend.ui.button",        // 唯一 id，用点分层级，必须和父子路径一致
  title: "按钮（Button）",
  summary: "触发一个动作的可点击元素。",   // 一句话，出现在目录卡片
  tags: ["按钮", "button"],         // 搜索关键词
  what: "是什么——大白话解释。",
  useWhen: ["什么时候用", "…"],
  avoidWhen: ["什么时候别用 / 注意", "…"],
  examples: ["常见场景", "…"],
  code: `<button>提交</button>`,     // 最小示例，反引号里别出现反引号
  codeLang: "html",                 // 只影响右上角标签
  demo: `<style>…</style><div>…</div>`,  // 可选：完整可交互 HTML，会渲染进 iframe
  children: []                      // 有子节点就是分类页，没有就是叶子页
}
```

### 给一条知识点加「常见踩坑」

打开 `data/pitfalls.js`，在 `Object.assign(window.KB_PITFALLS, { … })` 里加一行：

```js
"frontend.ui.button": [
  "表单里的按钮不写 type，默认是 submit，一点就提交并刷新页面",
  "异步提交时不禁用按钮，用户连点三次就下三单",
],
```

key 就是上面那条知识点的 `id`；值是一个字符串数组（建议 2–4 条，写具体现象，别写空话）。踩坑区块会出现在「什么时候别用」之后、「常见场景」之前。

### 加一条学习路径

打开 `data/paths.js`，照抄一个对象改文字：

```js
{
  id: "ship",                       // 路径 id，网址是 #/paths/ship
  title: "上线与安全体检",
  summary: "一句话说明这条线解决什么问题。",
  who: "适合：…",
  steps: [
    { node: "devops.release.domain", note: "这一步为什么重要，一句话。" },
    // node 必须是已经存在的知识点 id；写错了页面会提示「这条知识点暂时不存在」
  ],
}
```

### 加一个新大类

新建 `data/xxx.js`，写 `window.KB.xxx = {…}`，然后在 `index.html` 里 `data/data.js` 之后、`app.js` 之前加一行 `<script src="data/xxx.js"></script>`。

在已有大类里加分组：文件末尾用 `window.KB.<大类>.children.push({…})` 追加，不用动前面几百行。

## 注意事项

- **一律用 `textContent` 渲染，不要用 `innerHTML`**（`app.js` 里的 `h()` 辅助函数已经处理好）。用户内容里的 `<script>` 不会被当成执行代码。
- `demo` 用 iframe `srcdoc` + `sandbox="allow-scripts allow-modals"` 渲染，示例里的脚本影响不到主页面。
- `demo` 和 `code` 都是 JS 模板字符串，里面**不要出现反引号**，会提前结束字符串；数据里用双引号字符串时内部别写裸双引号（改用「」或单引号）。
- id 必须父子连续（`a` → `a.b` → `a.b.c`），`#/a/b/c` 与 `a.b.c` 两种网址都能打开。
- 改完推送：`git add -A && git commit -m "改了什么" && git push`，GitHub Pages 一分钟内自动更新（详见 `docs/DEPLOY.md`）。
