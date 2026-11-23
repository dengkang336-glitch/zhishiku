# 开发技术知识库

一个纯静态的知识库网站：左边目录树、右边正文、顶部搜索。零依赖、零构建、不需要 npm，双击 `index.html` 就能看，也可以直接扔到任何静态托管（Cloudflare Pages / Vercel / GitHub Pages / 自己的服务器）。

面向不懂技术的 vibe coding 开发者：每条知识点都写清「是什么 / 什么时候用 / 什么时候别用 / 常见场景」，前端组件还配了能直接点的运行效果。

## 现在有什么

12 个大类，266 个节点，其中 208 条是叶子知识点：

| 大类 | 叶子数 | 内容 |
|---|---|---|
| 前端开发 | 42 | 前端框架、页面结构、24 个 UI 组件（全部带可交互示例）、样式、工程化 |
| 后端开发 | 24 | 语言、Web 框架、API 设计、核心机制（鉴权 / ORM / 缓存 / 队列 / 日志 / 定时任务） |
| 数据库 | 13 | MySQL / PostgreSQL / SQLite / SQL Server、MongoDB / Redis / ES、SQL 与索引事务 |
| 中间件与基础设施 | 12 | Nginx / 网关 / CDN、Kafka / RabbitMQ、对象存储、监控告警 |
| DevOps 与部署 | 14 | 服务器与托管、Docker / K8s、CI/CD、域名 HTTPS 上线 |
| 移动端开发 | 10 | iOS / Android 原生、RN / Flutter / WebView、上架 / 推送 / 内购 |
| AI 与大模型 | 18 | 模型调用、提示词工程、RAG、Agent、Token 成本与评估 |
| 编程语言与基础 | 21 | 10 种语言、通用基础概念、Git 与 GitHub |
| 架构与设计 | 18 | 单体 / 微服务、设计原则、设计模式、接口与数据建模 |
| 安全 | 13 | 认证授权、XSS / SQL 注入 / CSRF、密钥与隐私、上线前自查 |
| 测试与质量 | 11 | 单元 / 集成 / E2E、Vitest / Playwright / pytest、覆盖率与 CI |
| 数据与分析 | 12 | 埋点、漏斗、图表选型、数据仓库与管道、指标口径 |

## 怎么用

- 浏览器打开：`open index.html`，或 `python3 -m http.server 8814` 后访问 http://localhost:8814/
- 左边目录逐层展开；每篇文章底部有子分类卡片
- 顶部搜索框搜组件名（按钮）、技术名（Redis）、场景（什么时候用缓存）
- 网址跟着内容变（`#/frontend/ui/button`），可以收藏 / 分享
- 点左上角「K 技术知识库」回到首页

## 目录结构

```
zhishiku/
├── index.html        # 页面骨架（script 按顺序引入 data/*.js，最后 app.js）
├── style.css         # 全部样式
├── app.js            # 目录树 / 正文渲染 / 搜索 / hash 路由
└── data/
    ├── frontend.js   # 每个大类一个文件，注册到 window.KB.<key>
    ├── backend.js
    ├── database.js
    ├── middleware.js
    ├── devops.js
    ├── mobile.js
    ├── ai.js
    ├── language.js
    ├── architecture.js
    ├── security.js
    ├── testing.js
    └── data.js
```

## 怎么加内容（不需要懂编程也能改）

1. 打开 `data/` 里对应大类的文件，照抄一段现有条目改文字即可。
2. 一条知识点的字段：

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

3. 加一个新大类：新建 `data/xxx.js`，写 `window.KB.xxx = {…}`，然后在 `index.html` 里 `data/<上一个>.js` 之后、`app.js` 之前加一行 `<script src="data/xxx.js"></script>`。顺序无所谓，都会被读进来。

## 注意事项

- **一律用 `textContent` 渲染，不要用 `innerHTML`**（`app.js` 里的 `h()` 辅助函数已经处理好）。用户内容里的 `<script>` 不会被当成代码执行。
- `demo` 用 iframe `srcdoc` + `sandbox="allow-scripts allow-modals"` 渲染，示例里的脚本影响不到主页面。
- `demo` 和 `code` 都是 JS 模板字符串，里面**不要出现反引号**，会提前结束字符串。
- id 必须父子连续（`a` → `a.b` → `a.b.c`），`#/a/b/c` 与 `a.b.c` 两种网址都能打开。
