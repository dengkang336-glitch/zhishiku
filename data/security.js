/* 安全 大类内容 */
window.KB = window.KB || {};

window.KB.security = {
  id: "security",
  title: "安全",
  summary: "网站不被黑、用户数据不泄露、密钥不丢——最低限度的安全常识。",
  tags: ["安全", "security", "漏洞", "加密", "攻击"],
  what: "安全不是「上线后再加固」，而是从第一行代码就在的事。大部分被黑的网站不是因为黑客多厉害，而是因为最基础的几条没做：密码明文存、密钥传到 GitHub、SQL 拼接字符串、没做权限校验。这块内容帮你把这些基础坑一次性避开。",
  children: [
    // ================= 认证与授权 =================
    {
      id: "security.auth",
      title: "认证与授权",
      summary: "你是谁（认证）、你能干什么（授权）。",
      tags: ["认证", "授权", "登录", "auth", "鉴权"],
      what: "认证 = 证明「你是你」（登录）；授权 = 判断「你能做什么」（权限）。两者必须分开做：登录成功不等于能看任何人的数据，每次请求都要再检查一次「这条数据是不是你的」。最常见的严重漏洞就是「登录了但没校验归属」。",
      children: [
        {
          id: "security.auth.password",
          title: "密码存储",
          summary: "密码永远不能明文存。",
          tags: ["密码", "哈希", "bcrypt", "明文"],
          what: "数据库里绝对不能存明文密码。存的是哈希值（用 bcrypt / argon2 这类专门给密码用的算法，它们故意慢、带随机盐）。用户登录时把输进来的密码算一遍哈希，跟存的值比对。",
          useWhen: ["任何需要用户注册登录的系统"],
          avoidWhen: ["不要用 MD5/SHA256 直接哈希密码（太快，能被彩虹表和暴力破解）", "不要把密码写进日志"],
          examples: ["用户注册", "登录校验", "找回密码"],
          code: `// Node 用 bcrypt（注意：不能是 MD5/SHA）
import bcrypt from "bcrypt";

// 注册：存哈希
const 哈希 = await bcrypt.hash(明文密码, 12);

// 登录：比对
const 对 = await bcrypt.compare(输入的密码, 哈希);`,
          codeLang: "javascript",
        },
        {
          id: "security.auth.session",
          title: "会话与 Token",
          summary: "登录状态怎么保持。",
          tags: ["session", "token", "jwt", "cookie", "登录状态"],
          what: "HTTP 本身不记得你是谁，所以要靠 Cookie（服务端存会话）或 Token（JWT，把身份写在令牌里）来保持登录。Cookie 必须开 HttpOnly（防 JS 偷）+ Secure（只走 HTTPS）+ SameSite（防跨站伪造）。",
          useWhen: ["任何登录功能"],
          avoidWhen: ["别把 token 存 localStorage 后还允许 XSS（等于送人）", "JWT 不要设超长有效期"],
          examples: ["网页登录用 HttpOnly Cookie", "App 用 token 放安全存储"],
          code: `// Cookie 关键三个属性
res.cookie("token", 值, {
  httpOnly: true,   // JS 读不到，防 XSS 偷
  secure: true,     // 只走 HTTPS
  sameSite: "lax",  // 防跨站请求伪造
});`,
          codeLang: "javascript",
        },
        {
          id: "security.auth.rbac",
          title: "权限控制（RBAC）",
          summary: "谁能看什么、改什么，要在服务端判断。",
          tags: ["权限", "rbac", "角色", "越权", "idor"],
          what: "权限判断必须放在服务端，且必须判断「这条数据是不是你的」。做法：给用户分配角色（管理员/普通用户），每个接口检查角色；查单条数据时永远带上 `where user_id = 当前用户`。",
          useWhen: ["有用户体系、有管理后台的系统"],
          avoidWhen: ["只在前端隐藏按钮 = 没做权限，直接调接口就绕过了"],
          examples: ["管理后台仅管理员可进", "用户只能看自己的订单", "越权访问他人数据（IDOR 漏洞）"],
          code: `// 错误：谁都能查任意订单
db.订单.查询({ id: 前端传的id });

// 正确：必须限定归属
db.订单.查询({ id: 前端传的id, 用户ID: 当前登录用户.id });`,
          codeLang: "javascript",
        },
      ],
    },

    // ================= 常见攻击与防护 =================
    {
      id: "security.attack",
      title: "常见攻击与防护",
      summary: "最常被利用的几个漏洞及挡法。",
      tags: ["攻击", "xss", "sql注入", "csrf", "防护"],
      what: "下面四个占了网站漏洞的绝大多数。它们的共同点是：都把「用户输入」当成了可信的东西。铁律——用户输入的一切都不可信，用之前必须处理。",
      children: [
        {
          id: "security.attack.xss",
          title: "XSS（跨站脚本）",
          summary: "别把用户输入直接塞进网页。",
          tags: ["xss", "跨站脚本", "innerHTML", "转义"],
          what: "攻击者在输入框里填一段 <script>，如果你的页面把它原样塞进 HTML，这段脚本就会在别人的浏览器里跑，偷走登录状态。防护：渲染用户内容用 textContent 而不是 innerHTML；必须渲染 HTML 时先做转义/净化。",
          useWhen: ["任何显示用户输入内容的地方（评论、昵称、富文本）"],
          avoidWhen: ["别用 innerHTML 拼用户输入"],
          examples: ["评论区", "用户昵称", "富文本编辑器"],
          code: `// 危险：用户输入里的脚本会执行
el.innerHTML = 用户输入;

// 安全：当纯文本显示
el.textContent = 用户输入;`,
          codeLang: "javascript",
        },
        {
          id: "security.attack.sqli",
          title: "SQL 注入",
          summary: "别用字符串拼 SQL。",
          tags: ["sql注入", "sqli", "参数化", "预编译"],
          what: "把用户输入直接拼进 SQL 语句，攻击者就能改写你的 SQL（比如输入 `' OR 1=1 --` 直接绕过登录）。防护极其简单：用参数化查询（占位符 + 参数数组），或者用 ORM。",
          useWhen: ["任何写 SQL 的地方"],
          avoidWhen: ["永远不要用字符串拼接 SQL"],
          examples: ["登录查询", "搜索功能", "任何带 where 的查询"],
          code: `// 危险：拼接
db.query("SELECT * FROM 用户 WHERE 名 = '" + 输入 + "'");

// 安全：参数化
db.query("SELECT * FROM 用户 WHERE 名 = ?", [输入]);`,
          codeLang: "javascript",
        },
        {
          id: "security.attack.csrf",
          title: "CSRF（跨站请求伪造）",
          summary: "别让别人借你的登录态发请求。",
          tags: ["csrf", "跨站请求", "sameSite", "token"],
          what: "你登录着银行网站，另一个恶意网页偷偷向银行发一个转账请求，浏览器会自动带上你的 Cookie。防护：Cookie 设 SameSite；关键操作加 CSRF token；重要操作二次确认。",
          useWhen: ["用 Cookie 保持登录的系统"],
          examples: ["表单提交", "转账/删除等敏感操作"],
          code: `// 三道防线
// 1. Cookie 设 SameSite
// 2. 表单里带一个服务端生成的 csrf token 并校验
// 3. 敏感操作要求重新输入密码/二次确认`,
          codeLang: "text",
        },
        {
          id: "security.attack.ratelimit",
          title: "限流与防爆破",
          summary: "别让人无限次试密码。",
          tags: ["限流", "rate limit", "爆破", "验证码"],
          what: "如果不限次数，攻击者可以暴力猜密码、刷短信验证码、刷接口。防护：按 IP / 用户限流（比如每分钟 5 次）、登录失败多次锁定或加验证码、短信接口严格限频。",
          useWhen: ["登录、注册、发短信、任何公开接口"],
          examples: ["登录失败限次", "短信验证码限频", "API 限流"],
          code: `// 简单限流思路：同一 IP 1 分钟最多 5 次
if (本分钟次数(ip) > 5) return 拒绝;
记录次数(ip);`,
          codeLang: "text",
        },
      ],
    },

    // ================= 数据与密钥 =================
    {
      id: "security.data",
      title: "数据与密钥",
      summary: "密钥别泄露、敏感数据别乱存。",
      tags: ["密钥", "环境变量", "加密", "隐私", "合规"],
      what: "泄露密钥（API Key、数据库密码）是最常见的事故，很多是直接把密钥写进代码然后推到 GitHub。规则：所有密钥放环境变量、.env 加进 .gitignore、只给需要的人最小权限。",
      children: [
        {
          id: "security.data.secret",
          title: "密钥管理",
          summary: "密钥放环境变量，永不进代码库。",
          tags: ["密钥", "secret", "env", "环境变量", "泄露"],
          what: "API Key、数据库密码、第三方密钥都不能写在代码里。放在环境变量或密钥管理服务里，本地用 .env 文件并确保它被 .gitignore 忽略。一旦泄露立刻作废重发。",
          useWhen: ["任何需要调用第三方服务/连数据库的项目"],
          avoidWhen: ["别把 .env 提交到 Git", "别在前端代码里放任何密钥（前端代码用户都能看到）"],
          examples: ["数据库密码", "OpenAI API Key", "支付商户密钥"],
          code: `// .env（不进 git）
DATABASE_URL=postgres://...
OPENAI_API_KEY=sk-...

// 代码里读
const key = process.env.OPENAI_API_KEY;`,
          codeLang: "bash",
        },
        {
          id: "security.data.transport",
          title: "传输加密（HTTPS）",
          summary: "全站必须 HTTPS。",
          tags: ["https", "tls", "加密", "证书"],
          what: "HTTP 是明文的，路上任何一环都能看到内容。必须上 HTTPS（现在 Let's Encrypt 免费，云平台基本一键开）。另外服务端要设安全响应头，避免点击劫持、MIME 嗅探等问题。",
          useWhen: ["所有对外提供的网站和服务"],
          examples: ["全站 HTTPS", "强制 HTTP 跳 HTTPS", "HSTS 头"],
          codeLang: "text",
        },
        {
          id: "security.data.privacy",
          title: "隐私与合规",
          summary: "只收集必要的数据，说清怎么用。",
          tags: ["隐私", "合规", "gdpr", "个人信息", "政策"],
          what: "用户数据是负债不是资产：收集越多，泄露时赔越多。原则：只收集功能必需的数据、能删就支持删除、敏感数据（身份证、手机号）加密存或脱敏显示、有隐私政策说清收集什么怎么用。",
          useWhen: ["任何收集用户信息的系统，尤其要上架 App Store / 面向海外"],
          examples: ["隐私政策页面", "手机号脱敏显示", "支持注销账号", "数据导出"],
          codeLang: "text",
        },
      ],
    },

    // ================= 上线前检查 =================
    {
      id: "security.checklist",
      title: "上线前安全检查",
      summary: "发布前照着过一遍。",
      tags: ["检查清单", "checklist", "上线", "加固"],
      what: "上线前花半小时照着清单过一遍，能挡掉 90% 的低级事故。这份清单不长，但每一条都对应真实发生过的重大事故。",
      children: [
        {
          id: "security.checklist.basic",
          title: "基础自查清单",
          summary: "十条，逐条打勾。",
          tags: ["清单", "自查", "上线"],
          what: "① 密码用 bcrypt 存 ② 密钥全在环境变量、不在 Git 历史里 ③ 全站 HTTPS ④ 所有查询都限定了数据归属 ⑤ SQL 全参数化 ⑥ 用户内容用 textContent ⑦ 登录/短信接口有限流 ⑧ 错误信息不暴露内部细节（别把堆栈返回给用户）⑨ 依赖包已更新（没高危漏洞）⑩ 有备份且试过恢复。",
          useWhen: ["每次上线前"],
          examples: ["新功能发布", "正式上线", "定期复查"],
          codeLang: "text",
        },
        {
          id: "security.checklist.deps",
          title: "依赖安全",
          summary: "第三方包也可能有漏洞。",
          tags: ["依赖", "npm audit", "漏洞", "供应链"],
          what: "你用的 npm 包里可能有已知漏洞。定期跑 `npm audit` 看有没有高危项并升级；别乱装没维护的小包；锁定版本（package-lock.json 要提交）。",
          useWhen: ["项目引入任何第三方依赖后"],
          examples: ["npm audit", "Dependabot 自动升级 PR"],
          code: `npm audit           # 看漏洞
npm audit fix       # 能自动修的先修`,
          codeLang: "bash",
        },
        {
          id: "security.checklist.errors",
          title: "错误处理与日志",
          summary: "别把内部细节暴露给用户。",
          tags: ["错误", "日志", "堆栈", "信息泄露"],
          what: "出错时对外只返回友好提示 + 错误码，堆栈和 SQL 只写进服务端日志。否则攻击者能从报错信息里读到表名、路径、版本号，直接为下一步攻击指路。",
          useWhen: ["配置任何错误处理和日志"],
          examples: ["统一错误处理中间件", "日志脱敏（别记密码、身份证）"],
          codeLang: "text",
        },
      ],
    },
  ],
};
