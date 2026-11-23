# zhishiku · 开发技术知识库 项目约定（给 agent 看）

一个**纯静态**的技术知识库网站：左边目录树、右边正文、顶部搜索、外加「学习路径」。面向**不懂技术的 vibe coding 开发者**——每条知识点用大白话写「是什么 / 什么时候用 / 什么时候别用 / 常见踩坑 / 常见场景」，前端 24 个 UI 组件配可直接点的运行效果。

当前状态：**13 大类 / 294 节点 / 232 条叶子知识点 / 630 条踩坑 / 5 条学习路径**，零依赖、零构建、不需要 npm。已上线 GitHub Pages（国内可访问），Cloudflare Worker 备份一份。

线上：https://dengkang336-glitch.github.io/zhishiku/
仓库：`https://github.com/dengkang336-glitch/zhishiku`（`main`，**public**，因为 GitHub Pages 免费版要求公开）

---

## 一、必读优先级

1. 本文件（项目级约定 + 踩过的坑）
2. `README.md`（内容清单 / 字段说明 / 怎么加知识点、踩坑、路径）
3. `docs/DEPLOY.md`（部署、更新、回滚、SEO 现状）

---

## 二、硬约束（改之前先看这一节）

- **禁止 `innerHTML`**。所有渲染走 `app.js` 里的 `h(tag, cls, text)`（内部 `createElement` + `textContent`）。数据里可能塞用户输入，`innerHTML` 就是 XSS 入口。唯一的 `innerHTML = ""` 是历史遗留的清空写法，紧跟着还有 `textContent = ""`，新代码不要模仿。
- **没有任何构建步骤、没有 npm、没有框架**。不要引入打包器、不要装依赖、不要改成 React。「双击 `index.html` 就能用」是产品的一部分。
- **数据与渲染分离**：内容全在 `data/*.js`（纯数据字面量），渲染逻辑全在 `app.js`。改文案不要碰 `app.js`。
- **`demo` 用 iframe `srcdoc` + `sandbox="allow-scripts allow-modals"`**。示例里的脚本必须影响不到主页面。
- **模板字符串里不能出现反引号**。`code` / `demo` 都是反引号字符串，内部写反引号会提前截断（要写 `<code>` 标签时用单引号包属性）。
- **双引号字符串里不能有裸双引号**。`what:` 之类用 `"..."` 时，中文引号用「」，否则整份数据文件语法错误（曾一次性暴 6 处）。
- **id 必须父子连续**：`a` → `a.b` → `a.b.c`，且全局唯一。`#/a/b/c` 与 `a.b.c` 两种网址都要能打开（路由会把斜杠转成点）。
- **改完必须自查**：用后文「验证」里的 vm 校验脚本过一遍（id 唯一 / 父子连续 / 叶子有 examples / 踩坑 key 都存在），再跑一次浏览器全量 sweep。
- 中文文案统一用**全角标点**；技术名保英文原样；解释里不要出现「本工具」「该库」这类生硬表述，用「它」「这东西」。

---

## 三、目录与架构

```
zhishiku/
├── index.html      # 骨架。script 顺序 = 树里大类顺序：frontend → backend → database
│                   #   → middleware → cloud → devops → mobile → ai → language
│                   #   → architecture → security → testing → data → app.js
├── style.css       # 全部样式（含 .demo-frame / .pitfall-list / 学习路径）
├── app.js          # 目录树 / 正文 / 搜索 / hash 路由 / 学习路径
├── data/
│   ├── frontend.js … data.js   # 13 个大类，各自 window.KB.<key> = {…}
│   ├── pitfalls.js             # 踩坑 overlay：window.KB_PITFALLS[id] = [...]
│   └── paths.js                # 学习路径：window.KB_PATHS = [{id,title,…,steps}]
├── docs/DEPLOY.md, docs/pages.yml.example
├── vercel.json / wrangler.jsonc / netlify.toml / _headers / robots.txt
├── .nojekyll       # GitHub Pages 必需（别让 Jekyll 处理，否则 _headers 之类被忽略）
├── .assetsignore   # Cloudflare 上传时排除 .git/.github/docs/node_modules
└── README.md / AGENTS.md
```

### `app.js` 结构（IIFE，约 600 行）

| 函数 | 作用 |
|---|---|
| `buildIndex()` / `walk()` | 把 `window.KB` 扁平化成 `flatNodes`（带 `categories` 祖先标题链）+ `byId` |
| `buildTree()` / `renderTreeNode()` | 左目录树；`expanded` Set 控制展开；末尾把 `.tree-node.active` `scrollIntoView({block:"nearest"})` |
| `renderHome()` | 首页：标题 + 自动统计的知识点数 + 「怎么用」+ `renderHomePaths()` + 13 张 `.home-card` |
| `renderContent(node)` | 正文。区块顺序固定：面包屑 → 标题/摘要/tags → 是什么 → 什么时候用 → 什么时候别用 → **常见踩坑** → 常见场景 → 运行效果(iframe) → 长什么样(code) → 这一层包含(子卡片) |
| `renderPaths()` / `renderPath(path)` / `makePathCard(p)` | `#/paths` 总览、`#/paths/<id>` 详情（勾选进度 + 进度条 + 清空） |
| `handleRoute()` | `#/`→首页；`#/paths` / `#/paths/<id>`；其余转成 id 查 `byId`；查不到走 `renderNotFound()` |
| `select(node)` | 写 `location.hash = "#/" + id.split(".").join("/")` 并关抽屉 |
| `setNav(open)` | 手机抽屉（`body.nav-open`） |
| `search()` | 实时搜索，标题权重 100/60/40，summary/what/tags/examples 加分；↑↓ 选中、Enter 打开 |
| `loadProgress()` / `saveProgress()` / `stepKey()` / `countDone()` | 学习路径进度，`localStorage["kb-paths-v1"]`，key 是 `pathId + "|" + nodeId`；隐私模式 `try/catch` 忽略 |

### 数据字段

知识点（`data/*.js`）：

```js
{ id, title, summary, tags[], what, useWhen[], avoidWhen[], examples[],
  code, codeLang, demo /* 可选，自包含 HTML 文档 */, children[] }
```

踩坑（`data/pitfalls.js`）：`Object.assign(window.KB_PITFALLS, { "节点id": ["坑1","坑2","坑3"] })`，分块追加，别改前面已写好的块。

学习路径（`data/paths.js`）：`{ id, title, summary, who, steps: [{ node, note }] }`；`node` 必须是真实叶子/节点 id。

**在已有大类里加分组**：文件末尾 `window.KB.<大类>.children.push({…})`，不要动前面几百行。

---

## 四、视觉语言

- 暖白底 `#f6f6f4`、面板白 `#ffffff`、侧栏 `#fbfbf9`、边框 `#e7e5e0`；主色靛蓝 `#4f46e5`（`--accent`）、`--accent-soft #eef0ff`；绿 `#1a7f4b`（适合）、红 `#b3392f`（别用）、棕 `#9a5b12`（踩坑）。
- 变量只有这一套：`--bg --panel --sidebar-bg --border --border-strong --text --text-2 --muted --accent --accent-soft --accent-border --code-bg --green --green-bg --red --red-bg --radius --shadow --font --mono`。**没有 `--text-3`、没有 `--serif`**（写成不存在变量会静默失效，颜色变继承色）。
- 字体：`--font` 系统字（-apple-system → PingFang SC → …）、`--mono` 等宽。标题不用衬线体，靠字重和字号分层。
- badge 配色：`what`(靛蓝) / `use`(绿) / `avoid`(红) / `pitfall`(棕) / `example`(灰) / `code`(灰)。
- 断点只有 760px（手机抽屉 + 单列 + demo 高度 380px + 路径行换行）。

---

## 五、验证（每次改完都要跑）

### 1. 数据校验（秒级，先跑这个）

```bash
cd /Users/kd/Documents/PI/zhishiku
node -e '
const fs=require("fs"),vm=require("vm");
const files=["frontend","backend","database","middleware","cloud","devops","mobile","ai","language","architecture","security","testing","data"];
const KB={};files.forEach(f=>{const w={window:{}};vm.createContext(w);vm.runInContext(fs.readFileSync("data/"+f+".js","utf8"),w);Object.assign(KB,w.window.KB);});
const w2={window:{}};vm.createContext(w2);vm.runInContext(fs.readFileSync("data/pitfalls.js","utf8"),w2);
const p=w2.window.KB_PITFALLS, ids=new Set(), leaves=[];
const walk=n=>{ids.add(n.id); if(n.children&&n.children.length) n.children.forEach(walk); else leaves.push(n.id)};
Object.values(KB).forEach(walk);
console.log("大类",Object.keys(KB).length,"节点",ids.size,"叶子",leaves.length);
console.log("踩坑",Object.keys(p).length,"孤立id",Object.keys(p).filter(i=>!ids.has(i)).length,"缺踩坑",leaves.filter(i=>!p[i]).length);'
```

期望：`孤立id 0`、`缺踩坑 0`。（当前应为 13 / 294 / 232 / 232）

### 2. 浏览器全量 sweep

静态服务：`python3 -m http.server 8814`（`file://` 也能开，但测试统一走 http）。

playwright 在 `/Users/kd/.agents/skills/huashu-design/node_modules/playwright`，chromium 在 `~/Library/Caches/ms-playwright/chromium-1248`。

脚本骨架（遍历 294 个节点检查 h1 + `.section`、遍历 232 叶子检查 `.pitfall-list li`、5 条路径检查 `.step-row`、手机 390px 抽屉开合、收集 `pageerror`/`console.error`）：

```js
const { chromium } = require('/Users/kd/.agents/skills/huashu-design/node_modules/playwright');
const p = await browser.newPage();
await p.goto('http://localhost:8814/', { waitUntil: 'networkidle' });
const ids = await p.evaluate(() => { const o=[]; const w=n=>{o.push(n.id);(n.children||[]).forEach(w)}; Object.values(window.KB).forEach(w); return o; });
for (const id of ids) {
  await p.evaluate(i => { location.hash = '#/' + i.split('.').join('/'); }, id);
  await p.waitForTimeout(45);
  // 断言 document.querySelector('.article-header h1') 与 .section 数量
}
```

验收线：**badCount 0 / noPitCount 0 / pathBad 0 / errCount 0**；手机端抽屉关时 `sidebar.x = -326`、开时 `0`，正文宽 = 视口宽（不被挤）。

### 3. 线上抽查

`curl -m 10 -o /dev/null -w '%{http_code}' https://dengkang336-glitch.github.io/zhishiku/` → 200；再用 playwright 打开首页 + 任一知识点，确认 `errs: []`。

---

## 六、部署

- **主用 GitHub Pages**：`main` 分支根目录。`git add -A && git commit -m "…" && git push` → 30 秒～1 分钟自动重建，地址不变。
- 备用 Cloudflare Worker（`wrangler.jsonc`，`npx wrangler deploy`，账户 `dengkang336@gmail.com`）：`*.workers.dev` **国内不可达**（本机 curl 60s 超时属正常，不是部署失败）。
- 另备 `vercel.json` / `netlify.toml`。
- 细节与回滚、自定义域名、自有服务器 nginx、备案提示 → `docs/DEPLOY.md`。

---

## 七、踩过的坑（别踩第二次）

1. **`var(--text-3)` / `var(--serif)` 不存在** → 静默失效，颜色变继承色。用 `--muted` / `--font`。
2. **id 记错**：Tab 组件真 id 是 `frontend.ui.tabs`（复数），不是 `frontend.ui.tab`；消息队列在 `middleware.messaging.*`（不是 `message`）；向量库是 `ai.rag.vectorstore`（不是 `vector-db`）。测试选择器超时先怀疑 id。
3. **`gh` token 缺 `workflow` scope** → 推 `.github/workflows/*.yml` 会被拒。所以 Actions 版发布配置放在 `docs/pages.yml.example`，实际走分支发布，无需 workflow。
4. **GitHub Pages 必须有 `.nojekyll`**，否则下划线开头文件被忽略、构建行为不可控。
5. **`workers.dev` 国内打不开**，验证线上要用 GitHub Pages 地址，别用 CF 地址判断"部署失败"。
6. **数据文件语法错误会让整个大类消失**（`window.KB.x` 没赋值 → 树里少一大类）。改完先跑 vm 校验。
7. **首页 `lead` 的数字是运行时统计的**（`countLeaves`），不需要手改；README 里的数字是写死的，加内容记得同步。
8. **搜索 `select()` 会清空搜索框**；从搜索结果跳转后返回，搜索词不保留——这是有意设计，别"修"。

---

## 八、还可以做（按价值排序）

1. **SEO 预渲染**：现在是 `#/` 片段路由，搜索引擎只收录首页。做法：Node 脚本读 `data/*.js` → 每个知识点生成 `/frontend/ui/button/index.html`（真实 HTML），再补 `sitemap.xml`；可选把路由改成真实路径 + SPA 回落（Pages/nginx 回落已配好）。
2. **内容纵深**：React 生态已到 Hooks 级别；可继续下钻到具体问题（性能优化、并发渲染）；数据库可补分库分表、慢查询实战；安全可补 JWT 实战、OAuth 流程。
3. **反查**：给每个叶子加「相关知识点」交叉引用（数据加 `related: []`，渲染在文末）。
4. **导出**：一键把某个大类导出为 Markdown / PDF，方便带走。
5. **进度**：学习路径进度目前存 localStorage；要跨设备就得上后端（但这就破坏了"纯静态"的定位，慎重）。
