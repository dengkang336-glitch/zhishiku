/* 前端开发 大类内容 */
window.KB = window.KB || {};

window.KB.frontend = {
  id: "frontend",
  title: "前端开发",
  summary: "负责「用户看到和摸到的部分」：页面长什么样、点了按钮会怎样、数据怎么展示。",
  tags: ["前端", "frontend", "页面", "界面", "UI", "网页", "网站"],
  what: "前端开发做的是用户直接看到、点击、输入的那一层。后端把数据交给你，你负责把这些数据变成好看的界面，并处理用户的各种操作。一个完整的界面通常由「框架（怎么组织代码）+ 页面结构（怎么布局）+ UI 组件（按钮、输入框等具体控件）+ 样式（颜色、大小、动画）+ 工程化（打包、构建）」几部分组成。",
  children: [
    // ================= 前端框架 =================
    {
      id: "frontend.framework",
      title: "前端框架",
      summary: "写界面的「脚手架」，决定你怎么组织代码、怎么更新页面。",
      tags: ["框架", "framework", "react", "vue"],
      what: "框架帮你把界面拆成一个个可复用的「组件」，并自动处理「数据变了 → 界面跟着变」这件事。没有框架时，纯手写要自己盯着每一个按钮、每一块文字手动更新，非常累；框架会自动把数据变化翻译成界面更新。",
      children: [
        {
          id: "frontend.framework.react",
          title: "React",
          summary: "目前最主流的前端框架，Facebook 出品，生态最大、AI 最熟。",
          tags: ["react", "jsx", "组件", "facebook", "hooks"],
          what: "React 把界面拆成「组件」，每个组件是一段返回界面外观的代码，数据变化时自动重新渲染对应部分。它用 JSX 语法（在 JavaScript 里直接写类似 HTML 的东西）。",
          useWhen: [
            "做产品、网站的首选：招人、找资料、找现成组件库都最容易",
            "项目会长期维护、可能越做越大",
            "想用 AI 生成代码（vibe coding）——React 是 AI 最熟的框架，生成质量最高",
          ],
          avoidWhen: [
            "只想做个临时小页面，React 反而偏重",
            "团队完全不想写 JavaScript/TypeScript",
          ],
          examples: ["各类 SaaS 产品、后台管理系统", "电商、社交 App 的前端", "配合 Next.js 做整站"],
          code: `// 一个按钮组件 + 使用它
function Button({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
}

function App() {
  return <Button text="点我" onClick={() => alert("你好")} />;
}`,
          codeLang: "jsx",
        },
        {
          id: "frontend.framework.vue",
          title: "Vue",
          summary: "上手最容易的框架，中文资料多，单文件组件好懂。",
          tags: ["vue", "单文件组件", "中文", "vite"],
          what: "Vue 也是组件式框架，但写法更像普通网页：HTML、样式、脚本写在一个 .vue 文件里，对新手更友好。国内使用量很大。",
          useWhen: [
            "团队有后端/传统前端背景，想平滑上手",
            "国内项目，想要丰富的中文资料和组件库（Element Plus、Ant Design Vue）",
            "中小型项目，追求快速开发",
          ],
          avoidWhen: [
            "想最大程度吃到 AI 生成代码红利（AI 对 React 更熟）",
            "需要极致的全球生态与招聘池（仍是 React 更大）",
          ],
          examples: ["后台管理系统", "官网", "H5 活动页"],
          code: `<template>
  <button @click="count++">点了 {{ count }} 次</button>
</template>

<script setup>
import { ref } from "vue";
const count = ref(0);
</script>`,
          codeLang: "vue",
        },
        {
          id: "frontend.framework.angular",
          title: "Angular",
          summary: "大而全的企业级框架，Google 出品，TypeScript 为主。",
          tags: ["angular", "typescript", "企业级", "google"],
          what: "Angular 是一个「全家桶」框架，把路由、表单、HTTP 请求等都内置了，规则严格、结构统一，适合大型团队协作。",
          useWhen: ["大型企业项目、团队大、需要强约束保证代码风格一致"],
          avoidWhen: ["小项目/个人项目（太重）", "想快速上手（学习曲线陡）"],
          examples: ["银行、政府、大企业内部系统"],
          code: `@Component({
  selector: "app-root",
  template: \`<button (click)="count = count + 1">点了 {{ count }} 次</button>\`,
})
export class AppComponent { count = 0; }`,
          codeLang: "typescript",
        },
        {
          id: "frontend.framework.svelte",
          title: "Svelte",
          summary: "编译型框架，代码少、运行快。",
          tags: ["svelte", "编译", "性能"],
          what: "Svelte 在「编译」阶段就把代码转成高效的普通 JavaScript，运行时没有框架负担，所以快、代码短、写法也简单。",
          useWhen: ["追求性能和小体积（如嵌入页面的小组件）", "喜欢简洁写法"],
          avoidWhen: ["生态和招聘池小，大项目招人难", "AI 生成质量不如 React/Vue"],
          examples: ["交互组件、可视化", "追求极简的项目"],
          codeLang: "svelte",
        },
        {
          id: "frontend.framework.nextjs",
          title: "Next.js",
          summary: "基于 React 的全栈框架，能做服务端渲染，做产品整站首选。",
          tags: ["nextjs", "react", "服务端渲染", "ssr", "全栈", "seo"],
          what: "Next.js 在 React 基础上加了「服务端渲染 / 路由 / API 接口」等能力，一个项目里既能写页面又能写接口，是现在做正式产品网站的事实标准。",
          useWhen: ["做正式产品/官网、SEO 重要的站", "想前后端一起写、一个项目搞定"],
          avoidWhen: ["只想写纯前端", "已有独立后端服务"],
          examples: ["官网", "SaaS 产品", "电商、内容站（SEO 友好）"],
          code: `// pages/index.js —— 一个页面组件
export default function Home() {
  return <h1>你好，世界</h1>;
}`,
          codeLang: "jsx",
        },
        {
          id: "frontend.framework.nuxt",
          title: "Nuxt",
          summary: "Vue 版的 Next.js，服务端渲染 + 全栈。",
          tags: ["nuxt", "vue", "ssr", "服务端渲染"],
          what: "Nuxt 之于 Vue，就像 Next.js 之于 React：提供文件路由、服务端渲染、API 接口等全栈能力。",
          useWhen: ["用 Vue 又需要服务端渲染 / SEO 的场景"],
          examples: ["Vue 技术栈的官网、内容站"],
          codeLang: "vue",
        },
      ],
    },

    // ================= 页面结构 =================
    {
      id: "frontend.structure",
      title: "页面结构",
      summary: "页面骨架怎么摆、页面之间怎么跳、数据怎么共享。",
      tags: ["布局", "路由", "状态", "组件化"],
      what: "页面结构决定了一个应用的「骨架」：大块区域怎么排（布局）、不同网址对应哪个页面（路由）、多组件共享的数据怎么管（状态管理）、重复界面怎么复用（组件化）。",
      children: [
        {
          id: "frontend.structure.layout",
          title: "布局（Layout）",
          summary: "页面骨架怎么摆——顶栏、侧边栏、内容区。",
          tags: ["布局", "layout", "响应式", "网格", "flex"],
          what: "布局决定页面大块区域的排布，比如最常见的「顶栏 + 侧边栏 + 内容区」。常见布局有：单列、两栏、三栏、网格、响应式（随屏幕大小自动变化）。",
          useWhen: ["每个页面都要先定布局", "后台系统常用「侧边栏 + 内容」布局", "官网常用「顶部导航 + 单列」布局"],
          examples: ["后台管理系统（侧边栏布局）", "官网（顶部导航）", "内容站（三栏）", "商品列表（网格）"],
          code: `<!-- 经典三区布局：顶栏 + 侧边栏 + 内容 -->
<div class="layout">
  <header>顶栏</header>
  <aside>侧边栏</aside>
  <main>内容区</main>
</div>`,
          codeLang: "html",
          demo: `<style>
body{margin:0;padding:0;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;font-size:13px}
.wrap{display:flex;flex-direction:column;height:240px;border:1px solid #d8d5ce;border-radius:8px;overflow:hidden;background:#fff}
.top{background:#4f46e5;color:#fff;padding:10px 16px;font-weight:600}
.mid{display:flex;flex:1}
.side{width:90px;background:#f6f6f4;padding:12px;border-right:1px solid #e7e5e0;color:#666}
.main{flex:1;padding:12px;color:#1c1b1a}
</style>
<div class="wrap">
  <div class="top">顶栏（logo + 菜单）</div>
  <div class="mid">
    <div class="side">侧边栏<br>菜单</div>
    <div class="main">内容区</div>
  </div>
</div>`,
        },
        {
          id: "frontend.structure.routing",
          title: "路由（Routing）",
          summary: "让不同网址对应不同页面。",
          tags: ["路由", "routing", "router", "跳转", "url"],
          what: "路由决定「访问哪个地址显示哪个页面」。在单页应用（SPA）里，页面切换不刷新整页，而是靠路由在组件之间切换，体验更顺滑。",
          useWhen: ["任何多页面应用都需要"],
          examples: ["/ 首页", "/login 登录", "/settings 设置", "/article/123 文章详情（带参数）"],
          code: `// React Router 示例
<Route path="/" element={<Home />} />
<Route path="/article/:id" element={<Article />} />`,
          codeLang: "jsx",
        },
        {
          id: "frontend.structure.state",
          title: "状态管理（State）",
          summary: "让多个组件共享同一份数据，并保持同步。",
          tags: ["状态", "state", "redux", "zustand", "pinia", "数据共享"],
          what: "比如「登录用户信息」「购物车」这种很多地方都要用的数据，放在一个全局的「状态」里。任何组件改了它，其他用到的地方自动更新。常用工具：React 的 Context / Zustand / Redux，Vue 的 Pinia。",
          useWhen: ["数据被多个不相关的组件共享时"],
          avoidWhen: ["只是单个组件内部的数据，用局部变量即可，别引入全局状态（过度设计）"],
          examples: ["登录态（用户信息）", "购物车", "主题色/深色模式", "表单草稿"],
        },
        {
          id: "frontend.structure.components",
          title: "组件化（Components）",
          summary: "把界面拆成可复用的小块。",
          tags: ["组件", "component", "复用", "props"],
          what: "把重复出现的界面（按钮、卡片、导航）做成「组件」，一次写好到处用，改一处全部生效。组件之间通过「属性（props）」传数据。",
          useWhen: ["同一界面元素出现两次以上就值得抽成组件"],
          avoidWhen: ["只出现一次的界面没必要硬拆"],
          examples: ["按钮、卡片", "表单控件", "弹窗、导航"],
        },
      ],
    },

    // ================= UI 组件 =================
    {
      id: "frontend.ui",
      title: "UI 组件",
      summary: "界面上的具体控件：按钮、输入框、Tab、弹窗……",
      tags: ["组件", "控件", "ui", "按钮", "输入框", "表单"],
      what: "UI 组件是用户每天在界面上摸到的具体控件。它们大多有现成的组件库（如 Ant Design、Element Plus、shadcn/ui、MUI）可以直接用，但了解每个组件「是什么、什么时候用、什么时候别用」能帮你选对控件、设计出好用的界面。",
      children: [
        {
          id: "frontend.ui.button",
          title: "按钮（Button）",
          summary: "触发一个动作的可点击元素。",
          tags: ["按钮", "button", "点击", "提交", "操作"],
          what: "按钮是页面里最基础的交互元素，用户点击后触发某个动作（提交表单、打开页面、删除、保存等）。",
          useWhen: [
            "任何「点一下做件事」的地方",
            "主次按钮要有区分：主要操作突出（实心色）、次要操作低调（描边/透明）",
          ],
          avoidWhen: [
            "只是跳转链接用链接（<a>）更合适",
            "危险操作（删除、注销）一定要加二次确认，且用醒目警示色",
          ],
          examples: ["提交表单", "保存", "删除（危险色 + 确认）", "打开弹窗", "购买 / 支付"],
          code: `<button>普通按钮</button>
<button type="submit">提交表单</button>
<button disabled>禁用状态（点了没反应）</button>`,
          codeLang: "html",
          demo: `<style>
body{margin:0;padding:24px;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:#fff;font-size:14px}
.row{display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin-bottom:18px}
button{font-size:14px;border-radius:8px;padding:8px 18px;border:1px solid #d8d5ce;background:#fff;color:#1c1b1a;cursor:pointer}
button:hover{opacity:.85}
.primary{background:#4f46e5;color:#fff;border-color:#4f46e5}
.danger{background:#b3392f;color:#fff;border-color:#b3392f}
button:disabled{opacity:.4;cursor:not-allowed}
.cnt{font-weight:700;color:#4f46e5;font-size:16px}
</style>
<div class="row">
  <button>普通按钮</button>
  <button class="primary">主要按钮</button>
  <button class="danger">危险按钮</button>
  <button disabled>禁用按钮</button>
</div>
<div class="row">
  <button class="primary" onclick="document.getElementById('n').textContent=+document.getElementById('n').textContent+1">点我 +1</button>
  <span class="cnt" id="n">0</span>
</div>`,
        },
        {
          id: "frontend.ui.input",
          title: "输入框（Input）",
          summary: "让用户输入单行文字。",
          tags: ["输入框", "input", "文本框", "表单"],
          what: "用户输入简短文字（姓名、邮箱、搜索词）的单行框。",
          useWhen: ["单行短文本输入", "数字输入可以用 number 类型，带加减号"],
          avoidWhen: [
            "长文本用「文本域（Textarea）」",
            "密码要加 type=\"password\" 隐藏内容",
            "要选日期用「日期选择器」而不是让人手敲",
          ],
          examples: ["用户名", "邮箱", "搜索框", "金额输入", "密码"],
          code: `<input type="text" placeholder="请输入姓名" />
<input type="email" placeholder="邮箱" />
<input type="password" placeholder="密码" />
<input type="number" placeholder="年龄" />`,
          codeLang: "html",
          demo: `<style>
body{margin:0;padding:24px;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:#fff;font-size:14px}
.lbl{font-size:12px;color:#888;margin:14px 0 6px}
.lbl:first-child{margin-top:0}
input{display:block;width:260px;height:38px;padding:0 12px;border:1px solid #d8d5ce;border-radius:8px;font-size:14px;margin-bottom:4px}
input:focus{outline:none;border-color:#4f46e5;box-shadow:0 0 0 3px #eef0ff}
</style>
<div class="lbl">文字</div>
<input type="text" placeholder="请输入姓名">
<div class="lbl">邮箱</div>
<input type="email" placeholder="you@example.com">
<div class="lbl">密码</div>
<input type="password" placeholder="请输入密码">
<div class="lbl">数字（带加减）</div>
<input type="number" placeholder="年龄" min="0">`,
        },
        {
          id: "frontend.ui.textarea",
          title: "文本域（Textarea）",
          summary: "让用户输入多行长文本。",
          tags: ["文本域", "textarea", "多行", "评论"],
          what: "和输入框类似，但可以输入多行文字，右下角通常可以拖拽调整大小。",
          useWhen: ["评论、留言、简介、备注等多行文字"],
          examples: ["评论区", "反馈表单", "个人简介", "备注说明"],
          code: `<textarea rows="4" placeholder="写点什么…"></textarea>`,
          codeLang: "html",
          demo: `<style>
body{margin:0;padding:24px;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:#fff;font-size:14px}
.lbl{font-size:12px;color:#888;margin-bottom:6px}
textarea{display:block;width:280px;height:100px;padding:10px 12px;border:1px solid #d8d5ce;border-radius:8px;font-size:14px;font-family:inherit;resize:vertical}
textarea:focus{outline:none;border-color:#4f46e5;box-shadow:0 0 0 3px #eef0ff}
</style>
<div class="lbl">说说你的想法（可以拖右下角拉大）：</div>
<textarea placeholder="写点什么…"></textarea>`,
        },
        {
          id: "frontend.ui.select",
          title: "下拉选择（Select）",
          summary: "从多个选项里选一个。",
          tags: ["下拉", "select", "选择器", "dropdown", "选项"],
          what: "点击展开一个选项列表，从中选一个。适合选项多但用户只能选一个的场景。",
          useWhen: ["选项多（大约超过 5 个）且单选", "选项很多时用「可搜索下拉」"],
          avoidWhen: [
            "选项只有 2-3 个时用「单选框」更直观（不用多点一下）",
            "可以多选用「复选框」",
          ],
          examples: ["选择国家 / 城市", "选择分类", "选择日期格式"],
          code: `<select>
  <option>请选择城市</option>
  <option>北京</option>
  <option>上海</option>
  <option>广州</option>
</select>`,
          codeLang: "html",
          demo: `<style>
body{margin:0;padding:24px;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:#fff;font-size:14px}
.lbl{font-size:12px;color:#888;margin-bottom:6px}
select{display:block;width:220px;height:38px;padding:0 12px;border:1px solid #d8d5ce;border-radius:8px;font-size:14px;background:#fff}
select:focus{outline:none;border-color:#4f46e5}
</style>
<div class="lbl">选择你所在的城市：</div>
<select>
  <option>请选择城市</option>
  <option>北京</option>
  <option>上海</option>
  <option>广州</option>
  <option>深圳</option>
  <option>成都</option>
</select>`,
        },
        {
          id: "frontend.ui.radio",
          title: "单选框（Radio）",
          summary: "从少数几个选项里选一个，所有选项都看得见。",
          tags: ["单选", "radio", "选项", "互斥"],
          what: "圆形小按钮，一组里只能选一个。和下拉不同，它把所有选项都平铺出来，用户一眼看全。",
          useWhen: ["选项少（2-5 个）且互斥单选", "希望用户一眼看到所有选项"],
          avoidWhen: ["选项太多时用下拉，否则占地方"],
          examples: ["性别", "支付方式（微信 / 支付宝 / 银行卡）", "配送方式"],
          code: `<label><input type="radio" name="pay" /> 微信</label>
<label><input type="radio" name="pay" /> 支付宝</label>`,
          codeLang: "html",
          demo: `<style>
body{margin:0;padding:24px;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:#fff;font-size:14px}
.lbl{font-size:12px;color:#888;margin:14px 0 8px}
.lbl:first-child{margin-top:0}
label{display:flex;align-items:center;gap:8px;margin-bottom:10px;cursor:pointer}
input[type=radio]{accent-color:#4f46e5;width:16px;height:16px}
</style>
<div class="lbl">请选择支付方式：</div>
<label><input type="radio" name="pay" checked> 微信支付</label>
<label><input type="radio" name="pay"> 支付宝</label>
<label><input type="radio" name="pay"> 银行卡</label>`,
        },
        {
          id: "frontend.ui.checkbox",
          title: "复选框（Checkbox）",
          summary: "勾选多个选项，或单个开关式勾选。",
          tags: ["复选框", "checkbox", "多选", "勾选", "同意"],
          what: "方形小框，可以同时勾选多个；也常用于「我同意用户协议」这种单个勾选。",
          useWhen: ["多选场景", "「同意条款」这类单个勾选"],
          examples: ["选择多个标签 / 兴趣", "同意用户协议", "筛选条件多选"],
          code: `<label><input type="checkbox" /> 我已阅读并同意协议</label>`,
          codeLang: "html",
          demo: `<style>
body{margin:0;padding:24px;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:#fff;font-size:14px}
.lbl{font-size:12px;color:#888;margin:14px 0 8px}
.lbl:first-child{margin-top:0}
label{display:flex;align-items:center;gap:8px;margin-bottom:10px;cursor:pointer}
input[type=checkbox]{accent-color:#4f46e5;width:16px;height:16px}
.agree{padding-top:6px;border-top:1px solid #eee;color:#666}
</style>
<div class="lbl">选择你感兴趣的方向（可多选）：</div>
<label><input type="checkbox" checked> 前端</label>
<label><input type="checkbox" checked> 后端</label>
<label><input type="checkbox"> AI / 大模型</label>
<label><input type="checkbox"> 设计</label>
<label class="agree"><input type="checkbox"> 我已阅读并同意《用户协议》</label>`,
        },
        {
          id: "frontend.ui.switch",
          title: "开关（Switch）",
          summary: "两个状态之间的即时切换（开 / 关）。",
          tags: ["开关", "switch", "toggle", "开启", "关闭"],
          what: "像实体开关一样，拨一下立即在「开/关」两个状态间切换，通常立即生效。",
          useWhen: ["立即生效的开/关设置（开启通知、深色模式）"],
          avoidWhen: ["需要用户确认后才生效的，用复选框或按钮更合适"],
          examples: ["通知开关", "夜间模式", "启用 / 停用某功能"],
          demo: `<style>
body{margin:0;padding:24px;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:#fff;font-size:14px}
.row{display:flex;align-items:center;gap:12px;margin-bottom:16px}
.switch{position:relative;display:inline-block;width:48px;height:26px}
.switch input{opacity:0;width:0;height:0}
.slider{position:absolute;cursor:pointer;inset:0;background:#ccc;border-radius:26px;transition:.2s}
.slider:before{content:"";position:absolute;height:20px;width:20px;left:3px;top:3px;background:#fff;border-radius:50%;transition:.2s;box-shadow:0 1px 2px rgba(0,0,0,.2)}
input:checked + .slider{background:#4f46e5}
input:checked + .slider:before{transform:translateX(22px)}
</style>
<div class="row"><label class="switch"><input type="checkbox" checked><span class="slider"></span></label> 接收推送通知</div>
<div class="row"><label class="switch"><input type="checkbox" checked><span class="slider"></span></label> 深色模式</div>
<div class="row"><label class="switch"><input type="checkbox"><span class="slider"></span></label> 自动播放视频</div>`,
        },
        {
          id: "frontend.ui.tabs",
          title: "Tab 页签",
          summary: "在同一区域切换显示不同内容。",
          tags: ["tab", "页签", "标签页", "切换"],
          what: "一排页签，点击某个页签就在同一位置显示对应内容，不用跳转页面。",
          useWhen: ["内容分成平行的几类、在同一位置切换，不想跳转页面"],
          avoidWhen: ["内容太多太长时考虑分页或独立页面"],
          examples: ["商品详情（介绍 / 参数 / 评价）", "设置页（通用 / 通知 / 安全）", "编辑器多文档"],
          code: `<div class="tabs">
  <button class="active">介绍</button>
  <button>参数</button>
  <button>评价</button>
</div>`,
          codeLang: "html",
          demo: `<style>
body{margin:0;padding:24px;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:#fff;font-size:14px}
.tabs{display:flex;gap:6px;margin-bottom:12px}
.tab{padding:7px 16px;border-radius:8px;border:1px solid #d8d5ce;background:#fff;cursor:pointer;font-size:14px}
.tab.on{background:#4f46e5;color:#fff;border-color:#4f46e5}
.panel{padding:20px;background:#f6f6f4;border-radius:8px;color:#333}
</style>
<div class="tabs">
  <button class="tab on" onclick="show(0,this)">介绍</button>
  <button class="tab" onclick="show(1,this)">参数</button>
  <button class="tab" onclick="show(2,this)">评价</button>
</div>
<div id="p0" class="panel">这是「介绍」页签的内容。</div>
<div id="p1" class="panel" style="display:none">这是「参数」页签的内容：尺寸、重量、颜色……</div>
<div id="p2" class="panel" style="display:none">这是「评价」页签的内容：用户好评……</div>
<script>
function show(i, btn){
  for (var k = 0; k < 3; k++){ document.getElementById("p" + k).style.display = k === i ? "block" : "none"; }
  var tabs = document.querySelectorAll(".tab");
  for (var j = 0; j < tabs.length; j++){ tabs[j].classList.remove("on"); }
  btn.classList.add("on");
}
</script>`,
        },
        {
          id: "frontend.ui.form",
          title: "表单（Form）",
          summary: "收集用户输入的一组控件。",
          tags: ["表单", "form", "提交", "校验", "登录", "注册"],
          what: "表单把输入框、下拉、按钮等组合起来收集信息，提交后发给后端处理。是登录、注册、下单等一切「填信息」场景的基础。",
          useWhen: ["任何需要用户填写信息并提交的场景"],
          avoidWhen: [
            "要做校验：必填、格式（邮箱/手机号）、长度",
            "提交按钮要有「提交中…」状态，防止重复点击",
            "出错要在对应输入框旁给出明确错误提示",
          ],
          examples: ["登录 / 注册", "填写收货地址", "提交订单", "搜索"],
          code: `<form>
  <input type="email" placeholder="邮箱" required />
  <input type="password" placeholder="密码" required />
  <button type="submit">登录</button>
</form>`,
          codeLang: "html",
          demo: `<style>
body{margin:0;padding:28px;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:#fff;font-size:14px}
.box{max-width:300px}
.lbl{font-size:12px;color:#888;margin:12px 0 6px}
.lbl:first-child{margin-top:0}
input{display:block;width:100%;height:38px;padding:0 12px;border:1px solid #d8d5ce;border-radius:8px;font-size:14px;box-sizing:border-box}
input:focus{outline:none;border-color:#4f46e5;box-shadow:0 0 0 3px #eef0ff}
button{width:100%;height:40px;margin-top:18px;border:none;border-radius:8px;background:#4f46e5;color:#fff;font-size:15px;font-weight:600;cursor:pointer}
button:hover{opacity:.9}
#ok{display:block;margin-top:10px;color:#1a7f4b;font-size:13px}
</style>
<div class="box">
  <form onsubmit="event.preventDefault();document.getElementById('ok').textContent='✓ 登录成功（演示）'">
    <div class="lbl">邮箱</div>
    <input type="email" placeholder="you@example.com" required>
    <div class="lbl">密码</div>
    <input type="password" placeholder="请输入密码" required>
    <button type="submit">登 录</button>
    <span id="ok"></span>
  </form>
</div>`,
        },
        {
          id: "frontend.ui.modal",
          title: "弹窗（Modal）",
          summary: "浮在当前页面上层的对话框。",
          tags: ["弹窗", "modal", "dialog", "对话框", "确认"],
          what: "一个浮在页面上的对话框，通常带半透明遮罩，让用户专注于弹窗里的内容，处理完再关掉。",
          useWhen: ["需要用户关注或确认的操作", "填写少量信息（不打断太多上下文）"],
          avoidWhen: [
            "不要弹窗套弹窗",
            "重要流程考虑用独立页面而不是弹窗",
            "别滥用（频繁弹窗很烦人）",
          ],
          examples: ["确认删除", "登录弹窗", "快速新建", "详情预览"],
          demo: `<style>
body{margin:0;padding:28px;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:#fff;font-size:14px}
button{font-size:14px;border-radius:8px;padding:8px 18px;border:1px solid #d8d5ce;background:#fff;color:#1c1b1a;cursor:pointer}
.primary{background:#4f46e5;color:#fff;border-color:#4f46e5}
.danger{background:#b3392f;color:#fff;border-color:#b3392f}
#m{display:none;position:fixed;inset:0;background:rgba(0,0,0,.4);align-items:center;justify-content:center}
.card{background:#fff;border-radius:12px;padding:24px;max-width:320px;box-shadow:0 10px 40px rgba(0,0,0,.25)}
.card .t{font-weight:700;font-size:16px;margin-bottom:8px}
.card .d{color:#666;margin-bottom:20px;line-height:1.6}
.btns{display:flex;gap:10px;justify-content:flex-end}
</style>
<button class="primary" onclick="document.getElementById('m').style.display='flex'">打开弹窗</button>
<div id="m">
  <div class="card">
    <div class="t">确认删除？</div>
    <div class="d">删除后无法恢复，你确定要删除这条记录吗？</div>
    <div class="btns">
      <button onclick="document.getElementById('m').style.display='none'">取消</button>
      <button class="danger" onclick="document.getElementById('m').style.display='none'">删除</button>
    </div>
  </div>
</div>`,
        },
        {
          id: "frontend.ui.table",
          title: "表格（Table）",
          summary: "用行列展示结构化数据。",
          tags: ["表格", "table", "列表", "报表", "数据"],
          what: "用「行 + 列」展示多条结构相同的数据，通常支持排序、筛选、分页、勾选。",
          useWhen: ["展示多条结构相同的数据（列表、报表）", "需要排序 / 筛选 / 分页 / 批量操作"],
          avoidWhen: ["数据只是展示不用操作、条数少，可以用列表或卡片更轻量"],
          examples: ["用户列表", "订单列表", "数据报表", "文件列表"],
          code: `<table>
  <tr><th>姓名</th><th>年龄</th></tr>
  <tr><td>小明</td><td>20</td></tr>
  <tr><td>小红</td><td>22</td></tr>
</table>`,
          codeLang: "html",
          demo: `<style>
body{margin:0;padding:24px;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:#fff;font-size:14px}
table{border-collapse:collapse;width:100%;max-width:420px}
th,td{padding:10px 14px;text-align:left;border-bottom:1px solid #eee}
th{background:#f6f6f4;color:#666;font-weight:600;font-size:13px}
td{color:#1c1b1a}
tr:hover td{background:#faf9f7}
.tag{font-size:12px;padding:2px 8px;border-radius:10px}
.on{background:#eef7f0;color:#1a7f4b}
.off{background:#fbeeec;color:#b3392f}
</style>
<table>
  <tr><th>姓名</th><th>年龄</th><th>状态</th></tr>
  <tr><td>小明</td><td>20</td><td><span class="tag on">在线</span></td></tr>
  <tr><td>小红</td><td>22</td><td><span class="tag off">离线</span></td></tr>
  <tr><td>小刚</td><td>19</td><td><span class="tag on">在线</span></td></tr>
</table>`,
        },
        {
          id: "frontend.ui.card",
          title: "卡片（Card）",
          summary: "一个独立内容的容器。",
          tags: ["卡片", "card", "容器"],
          what: "把一组相关信息打包展示（如图片 + 标题 + 描述 + 按钮），常以网格形式排列多个卡片。",
          useWhen: ["把一组相关信息打包展示", "网格排列多个同类内容"],
          examples: ["商品卡片", "文章列表", "功能简介", "仪表盘指标卡"],
          demo: `<style>
body{margin:0;padding:24px;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:#fff;font-size:14px}
.grid{display:flex;gap:14px;flex-wrap:wrap}
.card{width:180px;border:1px solid #e7e5e0;border-radius:10px;overflow:hidden;background:#fff}
.img{height:90px;background:linear-gradient(135deg,#4f46e5,#8b7cf6)}
.body{padding:12px}
.body .t{font-weight:700;margin-bottom:4px}
.body .d{font-size:12px;color:#888;line-height:1.5}
.price{color:#b3392f;font-weight:700;margin-top:8px}
</style>
<div class="grid">
  <div class="card">
    <div class="img"></div>
    <div class="body">
      <div class="t">无线耳机</div>
      <div class="d">降噪 · 续航 30 小时</div>
      <div class="price">¥299</div>
    </div>
  </div>
  <div class="card">
    <div class="img" style="background:linear-gradient(135deg,#1a7f4b,#4ad3a0)"></div>
    <div class="body">
      <div class="t">机械键盘</div>
      <div class="d">87 键 · 茶轴</div>
      <div class="price">¥459</div>
    </div>
  </div>
</div>`,
        },
        {
          id: "frontend.ui.navbar",
          title: "导航栏（Navbar）",
          summary: "页面顶部的导航条，放 logo 和主要菜单。",
          tags: ["导航栏", "navbar", "导航", "菜单", "header"],
          what: "固定在页面顶部的横条，通常放 logo、主要菜单链接、搜索、登录按钮。",
          useWhen: ["几乎每个站都有；顶部放全局导航"],
          examples: ["官网顶部菜单", "App 顶部（返回 + 标题 + 操作）"],
          demo: `<style>
body{margin:0;padding:0;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;font-size:14px;background:#fff}
.nav{display:flex;align-items:center;gap:24px;height:56px;padding:0 20px;background:#fff;border-bottom:1px solid #e7e5e0}
.logo{font-weight:800;font-size:17px;color:#4f46e5}
.menu{display:flex;gap:4px;flex:1}
.menu a{padding:6px 14px;border-radius:8px;color:#4a4845;text-decoration:none}
.menu a:hover{background:#f6f6f4}
.menu a.on{background:#eef0ff;color:#4f46e5;font-weight:600}
.btn{padding:7px 16px;border-radius:8px;background:#4f46e5;color:#fff;border:none;font-size:14px;cursor:pointer}
</style>
<div class="nav">
  <span class="logo">Logo</span>
  <div class="menu">
    <a class="on" href="#">首页</a>
    <a href="#">产品</a>
    <a href="#">价格</a>
    <a href="#">关于</a>
  </div>
  <button class="btn">登录</button>
</div>`,
        },
        {
          id: "frontend.ui.sidebar",
          title: "侧边栏（Sidebar）",
          summary: "页面左侧的导航 / 内容栏。",
          tags: ["侧边栏", "sidebar", "目录", "菜单"],
          what: "页面左侧的竖条区域，放菜单或目录。后台系统和文档站最常用（本知识库就是侧边栏布局）。",
          useWhen: ["后台管理系统", "文档站 / 知识库", "内容多的导航"],
          examples: ["后台菜单", "文档目录", "聊天联系人列表"],
          demo: `<style>
body{margin:0;padding:0;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;font-size:13px;background:#fff}
.wrap{display:flex;height:240px;border:1px solid #e7e5e0;border-radius:8px;overflow:hidden}
.side{width:140px;background:#fbfbf9;border-right:1px solid #e7e5e0;padding:12px 8px}
.item{padding:8px 12px;border-radius:7px;color:#4a4845;cursor:pointer;margin-bottom:2px}
.item:hover{background:#efeeea}
.item.on{background:#eef0ff;color:#4f46e5;font-weight:600}
.main{flex:1;padding:16px;color:#1c1b1a}
</style>
<div class="wrap">
  <div class="side">
    <div class="item on">仪表盘</div>
    <div class="item">用户管理</div>
    <div class="item">订单管理</div>
    <div class="item">内容管理</div>
    <div class="item">系统设置</div>
  </div>
  <div class="main">这里是内容区</div>
</div>`,
        },
        {
          id: "frontend.ui.list",
          title: "列表（List）",
          summary: "垂直排列一组条目。",
          tags: ["列表", "list", "条目"],
          what: "一组同类条目从上到下排列，每个条目结构一致。",
          useWhen: ["展示一组同类条目（消息、联系人、评论）"],
          examples: ["消息列表", "联系人", "评论区", "待办事项"],
          demo: `<style>
body{margin:0;padding:24px;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:#fff;font-size:14px}
.list{max-width:320px}
.item{display:flex;align-items:center;gap:12px;padding:12px;border-bottom:1px solid #eee}
.avatar{width:38px;height:38px;border-radius:50%;background:#4f46e5;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0}
.info{flex:1}
.info .n{font-weight:600}
.info .m{font-size:12px;color:#888}
.time{font-size:11px;color:#aaa}
</style>
<div class="list">
  <div class="item">
    <div class="avatar">明</div>
    <div class="info"><div class="n">小明</div><div class="m">在吗？有个问题想问你</div></div>
    <div class="time">10:24</div>
  </div>
  <div class="item">
    <div class="avatar" style="background:#1a7f4b">红</div>
    <div class="info"><div class="n">小红</div><div class="m">文件我发你邮箱了</div></div>
    <div class="time">09:58</div>
  </div>
  <div class="item">
    <div class="avatar" style="background:#b3392f">刚</div>
    <div class="info"><div class="n">小刚</div><div class="m">[图片]</div></div>
    <div class="time">昨天</div>
  </div>
</div>`,
        },
        {
          id: "frontend.ui.tag",
          title: "标签 / 徽章（Tag / Badge）",
          summary: "给内容打标或显示状态的小块。",
          tags: ["标签", "tag", "徽章", "badge", "状态"],
          what: "小块文字，用来给内容分类打标（如文章标签），或显示状态（已读 / 未读、进行中、VIP）。徽章还常带数字表示未读数量。",
          useWhen: ["分类标签", "状态标记（已读/未读、进行中、已完结）", "未读消息数量"],
          examples: ["文章标签", "订单状态", "通知未读数（小红点）"],
          demo: `<style>
body{margin:0;padding:24px;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:#fff;font-size:14px}
.row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:16px}
.tag{font-size:12px;padding:3px 10px;border-radius:10px}
.gray{background:#f6f6f4;color:#666;border:1px solid #e7e5e0}
.blue{background:#eef0ff;color:#4f46e5}
.green{background:#eef7f0;color:#1a7f4b}
.red{background:#fbeeec;color:#b3392f}
.badge{position:relative;display:inline-flex}
.badge .n{position:absolute;top:-6px;right:-8px;background:#b3392f;color:#fff;font-size:11px;min-width:18px;height:18px;border-radius:9px;display:flex;align-items:center;justify-content:center;padding:0 4px}
.icon{width:34px;height:34px;border-radius:8px;background:#f6f6f4;border:1px solid #e7e5e0}
</style>
<div class="row">
  <span class="tag gray">前端</span>
  <span class="tag blue">React</span>
  <span class="tag green">已完结</span>
  <span class="tag red">进行中</span>
</div>
<div class="row">
  <span class="badge"><span class="icon"></span><span class="n">3</span></span>
  <span style="color:#666">通知（小红点带未读数）</span>
</div>`,
        },
        {
          id: "frontend.ui.breadcrumb",
          title: "面包屑（Breadcrumb）",
          summary: "显示当前位置的层级路径。",
          tags: ["面包屑", "breadcrumb", "路径", "层级"],
          what: "一条「首页 / 分类 / 当前页」的路径导航，告诉用户现在在哪、可以快速跳回上级。",
          useWhen: ["层级深的网站，帮用户知道位置、快速返回上级"],
          examples: ["首页 / 数码 / 手机", "文档站路径"],
          demo: `<style>
body{margin:0;padding:24px;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:#fff;font-size:14px}
.crumb{display:flex;align-items:center;gap:8px;color:#888}
.crumb a{color:#888;text-decoration:none}
.crumb a:hover{color:#4f46e5}
.sep{color:#ccc}
.here{color:#1c1b1a;font-weight:600}
</style>
<div class="crumb">
  <a href="#">首页</a><span class="sep">/</span>
  <a href="#">数码</a><span class="sep">/</span>
  <a href="#">手机</a><span class="sep">/</span>
  <span class="here">iPhone 15</span>
</div>`,
        },
        {
          id: "frontend.ui.pagination",
          title: "分页（Pagination）",
          summary: "把大量数据分成多页。",
          tags: ["分页", "pagination", "翻页", "页码"],
          what: "当数据很多时，一页显示不完，用「上一页 / 页码 / 下一页」把数据分页展示。",
          useWhen: ["数据很多（如几百条），一次全显示会太慢或太长"],
          avoidWhen: ["数据少时用「加载更多」或滚动到底自动加载更自然"],
          examples: ["商品列表", "搜索结果", "文章列表", "订单记录"],
          demo: `<style>
body{margin:0;padding:24px;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:#fff;font-size:14px}
.pg{display:flex;gap:6px;align-items:center}
.pg button{min-width:34px;height:34px;border:1px solid #d8d5ce;border-radius:8px;background:#fff;color:#4a4845;cursor:pointer;font-size:14px}
.pg button.on{background:#4f46e5;color:#fff;border-color:#4f46e5}
.pg button:disabled{opacity:.4;cursor:not-allowed}
</style>
<div class="pg">
  <button disabled>上一页</button>
  <button class="on">1</button>
  <button>2</button>
  <button>3</button>
  <button>…</button>
  <button>99</button>
  <button>下一页</button>
</div>`,
        },
        {
          id: "frontend.ui.datepicker",
          title: "日期选择器（Date Picker）",
          summary: "弹出日历让用户选日期。",
          tags: ["日期", "datepicker", "日历", "时间"],
          what: "点击后弹出日历面板，让用户点选日期（有时还带时间）。",
          useWhen: ["需要精确选日期（生日、起止日期、预约时间）"],
          avoidWhen: ["只是简单年月日，用三个下拉或文本框也行"],
          examples: ["生日", "出行日期（开始 / 结束）", "预约时间", "日程"],
          demo: `<style>
body{margin:0;padding:24px;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:#fff;font-size:14px}
.lbl{font-size:12px;color:#888;margin:14px 0 6px}
.lbl:first-child{margin-top:0}
input{display:block;height:38px;padding:0 12px;border:1px solid #d8d5ce;border-radius:8px;font-size:14px;background:#fff;width:200px}
input:focus{outline:none;border-color:#4f46e5}
</style>
<div class="lbl">出生日期：</div>
<input type="date">
<div class="lbl">预约时间（带时分）：</div>
<input type="datetime-local">`,
        },
        {
          id: "frontend.ui.loading",
          title: "加载态（Loading / Spinner）",
          summary: "数据加载中给用户反馈。",
          tags: ["加载", "loading", "spinner", "骨架屏", "转圈"],
          what: "在等待数据、提交、页面加载时给用户一个「正在处理」的视觉反馈，避免用户以为卡死了。常见形式：转圈图标、骨架屏（灰色占位块）、按钮上的「提交中…」。",
          useWhen: ["任何需要等待的操作（请求数据、提交、加载页面）"],
          avoidWhen: ["别让用户干等不知道发生什么；加载失败要给错误提示和重试"],
          examples: ["转圈图标", "骨架屏", "按钮显示「提交中…」", "下拉刷新"],
          demo: `<style>
body{margin:0;padding:24px;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:#fff;font-size:14px}
.lbl{font-size:12px;color:#888;margin:14px 0 10px}
.lbl:first-child{margin-top:0}
.spinner{width:32px;height:32px;border:3px solid #e7e5e0;border-top-color:#4f46e5;border-radius:50%;animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.skel{width:220px;height:14px;border-radius:7px;background:linear-gradient(90deg,#eee 25%,#f5f5f3 50%,#eee 75%);background-size:200% 100%;animation:sk 1.2s infinite}
@keyframes sk{0%{background-position:200% 0}100%{background-position:-200% 0}}
.btn{display:inline-flex;align-items:center;gap:8px;padding:8px 18px;border-radius:8px;background:#4f46e5;color:#fff;font-size:14px}
.btn .mini{width:14px;height:14px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:spin .8s linear infinite}
</style>
<div class="lbl">转圈图标：</div>
<div class="spinner"></div>
<div class="lbl">骨架屏（加载中占位）：</div>
<div class="skel"></div>
<div class="lbl">按钮加载态：</div>
<span class="btn"><span class="mini"></span>提交中…</span>`,
        },
        {
          id: "frontend.ui.toast",
          title: "提示通知（Toast）",
          summary: "短暂弹出的操作结果提示。",
          tags: ["提示", "toast", "通知", "notification", "成功"],
          what: "操作成功或失败后，在页面角落短暂弹出一个小提示（几秒后自动消失），不打断当前操作。",
          useWhen: ["操作成功/失败后给个短暂反馈"],
          examples: ["「保存成功」", "「已复制到剪贴板」", "「出错了，请重试」"],
          demo: `<style>
body{margin:0;padding:28px;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:#fff;font-size:14px}
button{font-size:14px;border-radius:8px;padding:8px 18px;border:none;background:#4f46e5;color:#fff;cursor:pointer}
#t{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1c1b1a;color:#fff;padding:10px 20px;border-radius:8px;opacity:0;transition:opacity .3s;box-shadow:0 4px 16px rgba(0,0,0,.2)}
</style>
<button onclick="toast()">点我保存</button>
<div id="t">✓ 保存成功</div>
<script>
function toast(){
  var t = document.getElementById("t");
  t.style.opacity = "1";
  clearTimeout(t._h);
  t._h = setTimeout(function(){ t.style.opacity = "0"; }, 1500);
}
</script>`,
        },
        {
          id: "frontend.ui.accordion",
          title: "折叠面板（Accordion）",
          summary: "点击标题展开 / 收起内容。",
          tags: ["折叠", "accordion", "collapse", "展开", "收起"],
          what: "一组可展开/收起的区块，点击标题就展开对应内容，通常同时只展开一个。",
          useWhen: ["内容多但想保持页面整洁、按需展开（如 FAQ 常见问题）"],
          examples: ["FAQ 常见问题", "设置分组", "帮助文档", "订单详情多段"],
          demo: `<style>
body{margin:0;padding:24px;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:#fff;font-size:14px}
.acc{max-width:360px}
.h{display:flex;justify-content:space-between;align-items:center;width:100%;padding:12px 14px;border:1px solid #e7e5e0;background:#fff;font-size:14px;font-weight:600;cursor:pointer;border-radius:8px;margin-bottom:6px}
.h .s{color:#888;font-size:18px}
.b{display:none;padding:12px 14px;color:#4a4845;line-height:1.7;margin-bottom:6px;background:#faf9f7;border-radius:8px}
</style>
<div class="acc">
  <button class="h" onclick="toggle(0,this)">什么是前端框架？<span class="s">+</span></button>
  <div id="a0" class="b">前端框架是写界面的「脚手架」，帮你把界面拆成组件，并自动处理数据变化时页面怎么更新。</div>
  <button class="h" onclick="toggle(1,this)">为什么需要它？<span class="s">+</span></button>
  <div id="a1" class="b">没有框架时，要手动更新页面上每一个按钮、每一块文字，非常累；框架能自动完成这件事。</div>
  <button class="h" onclick="toggle(2,this)">怎么选？<span class="s">+</span></button>
  <div id="a2" class="b">做产品首选 React，上手最容易选 Vue，大型企业团队可以考虑 Angular。</div>
</div>
<script>
function toggle(i, btn){
  var b = document.getElementById("a" + i);
  var open = b.style.display === "block";
  b.style.display = open ? "none" : "block";
  btn.querySelector(".s").textContent = open ? "+" : "−";
}
</script>`,
        },
        {
          id: "frontend.ui.tooltip",
          title: "工具提示（Tooltip）",
          summary: "鼠标悬停时弹出的说明小气泡。",
          tags: ["提示", "tooltip", "气泡", "悬停", "说明"],
          what: "鼠标悬停在某个元素上时，弹出一个小气泡补充说明，移开就消失。",
          useWhen: ["图标或缩写需要补充说明，又不占地方", "文字被省略时悬停显示全文"],
          examples: ["图标按钮的说明", "省略文字悬停显示全文", "专业名词解释"],
          demo: `<style>
body{margin:0;padding:32px;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:#fff;font-size:14px}
.tip{position:relative;display:inline-block;border-bottom:1px dashed #888;color:#4f46e5;cursor:help}
.bubble{visibility:hidden;position:absolute;bottom:140%;left:50%;transform:translateX(-50%);background:#1c1b1a;color:#fff;padding:6px 12px;border-radius:6px;font-size:12px;white-space:nowrap;opacity:0;transition:opacity .15s}
.bubble:after{content:"";position:absolute;top:100%;left:50%;transform:translateX(-50%);border:5px solid transparent;border-top-color:#1c1b1a}
.tip:hover .bubble{visibility:visible;opacity:1}
</style>
<p>把鼠标悬停在下面的<span class="tip">虚线词<span class="bubble">这就是工具提示的内容</span></span>上看看效果。</p>
<p>常用于解释图标按钮，或补充<span class="tip">缩写<span class="bubble">Full-Stack Developer 全栈工程师</span></span>的含义。</p>`,
        },
        {
          id: "frontend.ui.progress",
          title: "进度条（Progress）",
          summary: "显示任务完成进度。",
          tags: ["进度条", "progress", "进度", "百分比"],
          what: "一条会逐渐填满的条，直观显示任务完成了多少。",
          useWhen: ["上传/下载进度", "多步骤流程（注册、问卷）", "任务完成度"],
          examples: ["文件上传进度", "注册步骤（第 2 步 / 共 4 步）", "问卷填写进度"],
          demo: `<style>
body{margin:0;padding:24px;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:#fff;font-size:14px}
.row{margin-bottom:18px}
.lbl{display:flex;justify-content:space-between;font-size:12px;color:#888;margin-bottom:6px}
.bar{height:10px;background:#eee;border-radius:5px;overflow:hidden}
.fill{height:100%;border-radius:5px;background:#4f46e5;transition:width .3s}
.steps{display:flex;gap:6px}
.step{flex:1;height:8px;border-radius:4px;background:#eee}
.step.done{background:#4f46e5}
.step.cur{background:#8b7cf6}
</style>
<div class="row">
  <div class="lbl"><span>文件上传中</span><span>70%</span></div>
  <div class="bar"><div class="fill" style="width:70%"></div></div>
</div>
<div class="row">
  <div class="lbl"><span>注册进度（第 2 步 / 共 4 步）</span><span>50%</span></div>
  <div class="steps"><div class="step done"></div><div class="step cur"></div><div class="step"></div><div class="step"></div></div>
</div>`,
        },
      ],
    },

    // ================= 样式 =================
    {
      id: "frontend.styling",
      title: "样式",
      summary: "控制界面外观：颜色、大小、布局、动画。",
      tags: ["样式", "css", "tailwind", "颜色", "动画"],
      what: "样式负责界面「好不好看」。HTML 只搭结构，样式（CSS 及各种工具）决定颜色、字体、间距、布局和动画。",
      children: [
        {
          id: "frontend.styling.css",
          title: "CSS",
          summary: "控制界面外观的语言（颜色、大小、位置）。",
          tags: ["css", "样式", "flex", "grid", "盒模型"],
          what: "CSS 是给 HTML「化妆」的语言，控制颜色、字体、间距、布局、动画。是最基础、必须懂的一层，flex 和 grid 是两大布局核心。",
          useWhen: ["所有前端界面都离不开", "理解盒模型、flex、grid 布局"],
          examples: ["改颜色", "调间距", "做布局", "响应式适配"],
          code: `.card {
  padding: 16px;
  border-radius: 8px;
  background: #fff;
}`,
          codeLang: "css",
        },
        {
          id: "frontend.styling.tailwind",
          title: "Tailwind CSS",
          summary: "用一堆工具类直接写在标签上，不用写样式文件。",
          tags: ["tailwind", "工具类", "原子化", "css"],
          what: "Tailwind 提供大量现成的工具类（如 p-4 = 内边距、text-red-500 = 红色文字），直接在 HTML 标签上组合，开发快、风格统一。AI 生成代码也大量用 Tailwind。",
          useWhen: ["快速开发、想要统一设计规范", "AI 生成的前端代码（vibe coding 常见）"],
          avoidWhen: ["团队不想用工具类写法、需要大量自定义主题时权衡"],
          examples: ["快速搭界面", "组件库", "AI 生成的前端"],
          code: `<button class="px-4 py-2 bg-indigo-600 text-white rounded-lg">
  点我
</button>`,
          codeLang: "html",
        },
        {
          id: "frontend.styling.scss",
          title: "SCSS / Sass",
          summary: "CSS 的增强版，支持变量、嵌套等。",
          tags: ["scss", "sass", "变量", "嵌套", "css"],
          what: "CSS 的增强版，支持变量、嵌套、混入（mixin）等，让样式代码更好组织，最后编译成普通 CSS。",
          useWhen: ["大型项目需要更强的 CSS 组织能力"],
          examples: ["大型前端项目的样式管理", "主题定制"],
          code: `$primary: #4f46e5;
.button {
  background: $primary;
  &:hover { opacity: 0.9; }
}`,
          codeLang: "scss",
        },
        {
          id: "frontend.styling.animation",
          title: "动画过渡（Animation）",
          summary: "让界面动起来（过渡、渐变、动效）。",
          tags: ["动画", "animation", "过渡", "transition", "动效"],
          what: "让界面元素产生过渡、位移、淡入淡出等动效，增强体验和反馈。",
          useWhen: ["增强体验（按钮反馈、页面切换、加载动画）", "但一定要克制，别影响性能、别过度炫技"],
          examples: ["hover 悬停效果", "页面进入动画", "加载动画", "下拉展开"],
        },
      ],
    },

    // ================= 工程化 =================
    {
      id: "frontend.tooling",
      title: "工程化",
      summary: "打包、构建、管理依赖，让项目能跑起来、能上线。",
      tags: ["工程化", "构建", "打包", "npm", "vite", "typescript"],
      what: "工程化解决「代码怎么写更稳、怎么打包上线、怎么管理第三方库」。包括包管理（npm）、构建工具（Vite/Webpack）、类型安全（TypeScript）。",
      children: [
        {
          id: "frontend.tooling.npm",
          title: "npm / 包管理",
          summary: "下载和管理第三方代码库（依赖）的工具。",
          tags: ["npm", "包管理", "依赖", "package.json", "yarn", "pnpm"],
          what: "npm 是 JavaScript 生态的「应用商店」，用一条命令下载别人写好的库（如 React、lodash）。package.json 记录项目用了哪些库及版本。",
          useWhen: ["几乎每个前端项目都要用"],
          examples: ["npm install react 安装 React", "添加组件库", "管理依赖版本"],
          code: `npm install react        # 安装一个库
npm install                # 按 package.json 装全部依赖
npm run dev                # 启动开发`,
          codeLang: "bash",
        },
        {
          id: "frontend.tooling.vite",
          title: "Vite",
          summary: "现代前端构建工具，启动快。",
          tags: ["vite", "构建", "开发服务器", "打包"],
          what: "Vite 负责打包代码、启动开发服务器，本地开发秒开、改代码即时生效（热更新），是目前新建前端项目的默认构建工具。",
          useWhen: ["新建前端项目的默认选择"],
          examples: ["创建 React/Vue 项目", "本地热更新开发", "生产打包"],
          code: `npm create vite@latest my-app   # 创建项目
cd my-app
npm run dev                        # 启动开发`,
          codeLang: "bash",
        },
        {
          id: "frontend.tooling.webpack",
          title: "Webpack",
          summary: "老牌构建工具，配置灵活但复杂。",
          tags: ["webpack", "构建", "打包"],
          what: "Webpack 是上一代主流构建工具，功能强大、配置灵活但相对复杂。很多老项目还在用。",
          useWhen: ["旧项目维护", "需要深度自定义构建的场景"],
          avoidWhen: ["新项目一般直接用 Vite，更简单更快"],
          examples: ["老项目维护", "复杂构建配置"],
        },
        {
          id: "frontend.tooling.typescript",
          title: "TypeScript",
          summary: "给 JavaScript 加「类型」，提前发现错误。",
          tags: ["typescript", "ts", "类型", "类型安全"],
          what: "TypeScript 在 JavaScript 基础上加了类型标注，能在写代码时就发现「把数字当文字用」这类错误，项目越大越稳。AI 生成代码也大量用 TS。",
          useWhen: ["正式项目、团队协作、长期维护", "前后端共享数据类型"],
          avoidWhen: ["极小的临时脚本可以只用 JavaScript"],
          examples: ["大型项目", "组件库", "前后端共享类型定义"],
          code: `function 打招呼(名字: string): string {
  return "你好，" + 名字;
}
打招呼("小明");     // ✓ 正确
打招呼(123);       // ✗ 报错：参数应该是文字`,
          codeLang: "typescript",
        },
      ],
    },
  ],
};

// ================= 生态与工具（补充：主流框架周边的具体库） =================
window.KB.frontend.children.push({
  id: "frontend.ecosystem",
  title: "框架生态与常用库",
  summary: "选好框架之后，真正天天用的是这些周边库：状态、组件库、表单、请求。",
  tags: ["生态", "库", "library", "选型"],
  what: "框架本身只解决「界面怎么写」，一个真实产品还要用一堆周边库补齐：状态管理（数据放哪）、组件库（现成的按钮表格）、表单库（收集校验输入）、请求库（拿后端数据）、路由与目录约定、代码规范工具。选错库的代价比选错框架更大——因为它换起来更贵。",
  children: [
    {
      id: "frontend.ecosystem.hooks",
      title: "React Hooks（useState / useEffect 等）",
      summary: "React 里写逻辑的方式，现在几乎所有 React 代码都这么写。",
      tags: ["hooks", "usestate", "useeffect", "react hooks", "useMemo"],
      what: "Hooks 是一批以 use 开头的函数，用来在组件里「记住」数据（useState）、在渲染后做事（useEffect）、缓存计算结果（useMemo/useCallback）、共享逻辑（自定义 Hook）。在 React 里不需要记几百个 API，日常真正高频的就 5 个左右。",
      useWhen: ["所有 React 项目（16.8 之后）", "想把重复逻辑抽成自定义 Hook 复用", "需要在渲染后执行副作用（请求、订阅、DOM 操作）"],
      avoidWhen: ["不要把能算出来的值也放进 useState——派生数据直接算", "不要在 useEffect 里做能放在事件处理函数里的事"],
      examples: ["计数器 / 表单输入", "组件挂载时请求数据", "监听窗口大小变化", "抽一个 useDebounce 处理搜索框"],
      code: `const [count, setCount] = useState(0);   // 记住一个值
useEffect(() => {                         // 渲染后执行，[] 表示只跑一次
  fetch("/api/list").then(r => r.json()).then(setList);
}, []);
const total = items.reduce((a, b) => a + b.price, 0); // 能算就别用 state`,
      codeLang: "jsx",
    },
    {
      id: "frontend.ecosystem.state-lib",
      title: "状态管理库（Zustand / Redux / Pinia）",
      summary: "多个页面要共享的数据放哪：小项目用框架自带，大了才上库。",
      tags: ["zustand", "redux", "pinia", "状态管理", "store", "jotai"],
      what: "状态管理库把「跨页共享的数据」集中存放，任何组件都能读、能改，改完自动更新界面。React 常用 Zustand（轻）和 Redux Toolkit（重但规范），Vue 用 Pinia。很多项目其实只需要框架自带的 Context / provide。",
      useWhen: ["登录用户信息、主题、购物车这类多个页面都要用的数据", "状态变化逻辑复杂、需要集中调试", "团队多人协作，需要统一的数据修改入口"],
      avoidWhen: ["只有一两个页面用的数据，用 props 或组件内部状态就够", "把接口缓存也塞进状态库（那是请求库该干的）"],
      examples: ["登录态与用户资料", "购物车", "主题 / 语言切换", "多步骤表单跨步骤暂存"],
      code: `import { create } from "zustand";

export const useCart = create((set) => ({
  items: [],
  add: (item) => set((s) => ({ items: [...s.items, item] })),
  clear: () => set({ items: [] }),
}));

// 组件里：const { items, add } = useCart();`,
      codeLang: "javascript",
    },
    {
      id: "frontend.ecosystem.ui-lib",
      title: "UI 组件库（shadcn/ui、MUI、Ant Design、Element Plus）",
      summary: "别人写好的按钮、表格、弹窗，直接拿来用，不用从零画。",
      tags: ["组件库", "shadcn", "mui", "antd", "element plus", "ui kit"],
      what: "组件库提供一整套设计统一、可访问性做好的控件（按钮、表格、日期选择、弹窗）。主流三类：Ant Design / Element Plus（后台管理系统最快）、MUI（Material 风格）、shadcn/ui（代码直接复制进你的项目，最好改样式）。",
      useWhen: ["后台管理、内部工具：直接用 antd / Element Plus，两天能出可用界面", "想要自己的视觉风格：用 shadcn/ui 这类「给源码」的方案", "需要复杂表格、日期范围、树形选择这类难自己写的控件"],
      avoidWhen: ["营销页、品牌站：组件库的「系统感」会削弱品牌气质", "一个只有三屏的小工具，引入整套组件库比手写还重"],
      examples: ["后台管理系统", "数据录入表单", "带筛选排序的分页表格", "弹窗 + 抽屉的工作流"],
      code: `// shadcn/ui：组件代码就在你的项目里，可以直接改
import { Button } from "@/components/ui/button";

<Button variant="outline" onClick={save}>保存</Button>`,
      codeLang: "jsx",
    },
    {
      id: "frontend.ecosystem.form",
      title: "表单库（React Hook Form / VeeValidate）",
      summary: "表单字段多、校验规则多的时候，手写 state 会失控。",
      tags: ["表单", "react hook form", "校验", "veevalidate", "zod"],
      what: "表单库帮你管理每个字段的值、校验规则、错误提示、提交状态。React 最常用 React Hook Form（配 Zod 做校验），Vue 用 VeeValidate 或框架自带。字段少于三个时手写反而更快。",
      useWhen: ["字段超过五个、有多种校验规则的表单", "需要动态增删字段（如多行联系人）", "要和后端共享同一套校验规则（Zod schema 前后端复用）"],
      avoidWhen: ["只有一两个输入框 + 一个按钮，用 useState 就够", "纯展示型筛选条，不需要校验"],
      examples: ["注册 / 登录 / 实名认证", "多步骤申请表单", "带动态行的报价单", "后台配置表单"],
      code: `const schema = z.object({
  email: z.string().email("邮箱格式不对"),
  age: z.number().min(18, "需满 18 岁"),
});

const { register, handleSubmit, formState: { errors } } =
  useForm({ resolver: zodResolver(schema) });`,
      codeLang: "javascript",
    },
    {
      id: "frontend.ecosystem.data-fetch",
      title: "请求与缓存库（TanStack Query / SWR / Axios）",
      summary: "拿后端数据这件事，别在 useEffect 里裸写 fetch。",
      tags: ["tanstack query", "react query", "swr", "axios", "请求", "缓存"],
      what: "这类库统一处理「请求中 / 成功 / 失败 / 重试 / 缓存 / 失效」。TanStack Query（原 React Query）最常用：一个 useQuery 就自带加载态、错误态、缓存、窗口聚焦时刷新；Axios 则是更顺手的 fetch 封装（拦截器、超时、错误统一处理）。",
      useWhen: ["页面里有接口请求（几乎必然）", "多个页面请求同一份数据，需要共享缓存", "需要乐观更新（点赞立刻亮，失败再回滚）"],
      avoidWhen: ["只有一个静态接口、页面不切换，裸 fetch 就行", "把服务端数据再复制一份进状态管理库，会出现两份真相"],
      examples: ["列表页分页与筛选", "详情页数据 + 缓存", "提交后让列表自动刷新（invalidate）", "轮询任务进度"],
      code: `const { data, isLoading, error } = useQuery({
  queryKey: ["orders", page],
  queryFn: () => axios.get("/api/orders", { params: { page } }).then(r => r.data),
  staleTime: 30_000,
});`,
      codeLang: "javascript",
    },
    {
      id: "frontend.ecosystem.app-router",
      title: "文件路由（Next.js App Router / Nuxt 约定式路由）",
      summary: "不用手写路由表：文件夹结构就是网址结构。",
      tags: ["app router", "文件路由", "next.js", "nuxt", "layout", "server component"],
      what: "约定式路由把「目录」变成「网址」：app/orders/page.tsx 就是 /orders，app/orders/[id]/page.tsx 就是 /orders/123。Next.js App Router 还把组件分成服务端（默认，直接读数据库/密钥）和客户端（加 use client，能交互），并支持 layout 嵌套复用。",
      useWhen: ["用 Next.js / Nuxt 做站点或全栈应用", "需要 SEO、首屏速度（服务端渲染）", "多个页面共享同一套导航和侧边栏（layout）"],
      avoidWhen: ["纯 SPA 内部工具，用 React Router 这类显式路由更直观", "把需要交互的组件漏了 use client，会报 hooks 只能在客户端用"],
      examples: ["博客 / 官网 / 文档站", "电商商品详情页（SEO 重要）", "带权限的后台（layout 里统一校验登录）"],
      code: `app/
  layout.tsx        → 全站外壳（导航）
  page.tsx          → 首页 /
  orders/
    page.tsx        → /orders
    [id]/page.tsx   → /orders/123
  api/hello/route.ts → POST /api/hello`,
      codeLang: "text",
    },
    {
      id: "frontend.ecosystem.lint",
      title: "代码规范工具（ESLint / Prettier / Biome）",
      summary: "自动统一格式和常见错误，多人 / 多 AI 写代码时尤其重要。",
      tags: ["eslint", "prettier", "biome", "格式化", "lint", "代码规范"],
      what: "ESLint 检查代码问题（未使用变量、危险写法、React Hooks 依赖缺失），Prettier 统一格式（缩进、引号、换行），Biome 是两者合一的新选择。它们能在保存时自动运行，也能在提交前拦住不合规代码。",
      useWhen: ["团队协作（包括和 AI 一起写代码）", "项目超过几百行，风格混乱会拖慢阅读", "CI 里想自动挡住明显错误"],
      avoidWhen: ["规则开太严（几百条），每次提交都在改格式而不是写功能"],
      examples: ["保存时自动格式化", "提交前检查（husky + lint-staged）", "CI 里跑 lint 挡住合并"],
      code: `// package.json
"scripts": {
  "lint": "eslint . --max-warnings 0",
  "format": "prettier --write ."
}`,
      codeLang: "json",
    },
    {
      id: "frontend.ecosystem.monorepo",
      title: "多包仓库（pnpm workspace / Turborepo）",
      summary: "一个仓库里放前端、后端、共享类型，改一处全联动。",
      tags: ["monorepo", "pnpm", "turborepo", "workspace", "多包"],
      what: "Monorepo 把多个项目（Web、App、服务端、共享组件库）放在同一个仓库，用 pnpm workspace 管理依赖、Turborepo 缓存构建结果。好处是改共享代码立刻能验证全部使用方，不用发版再联调。",
      useWhen: ["前端 + 后端 + 移动端共用一套类型和工具函数", "做了组件库 / SDK 要给多个项目用", "团队几个项目版本需要同步升级"],
      avoidWhen: ["只有一个项目：纯属增加复杂度", "团队没有共识时，monorepo 的权限和发布流程会变成扯皮现场"],
      examples: ["apps/web + apps/api + packages/shared", "组件库与业务项目同仓", "多端共用类型定义"],
      code: `# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"

# 装依赖 / 跑全部
pnpm install
pnpm -r build`,
      codeLang: "yaml",
    },
  ],
});
