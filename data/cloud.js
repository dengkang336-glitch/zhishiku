/* 云服务与三方服务 大类：不用自己搭，直接买 / 直接接的现成能力 */
window.KB = window.KB || {};

window.KB.cloud = {
  id: "cloud",
  title: "云服务与三方服务",
  summary: "不用自己搭服务器：托管、存储、数据库、登录、支付、邮件，直接买现成的。",
  tags: ["云服务", "cloud", "托管", "三家服务", "serverless", "SaaS"],
  what: "现代产品很少全部自己搭。前端托管、对象存储、数据库、登录、支付、邮件短信、AI 接口，基本都是「注册 → 拿密钥 → 接 SDK」三步搞定。这一类讲的是：哪些东西该买、买哪家、什么阶段买、多少钱，以及买了之后会踩什么坑。",
  children: [
    {
      id: "cloud.hosting",
      title: "托管平台（Vercel / Cloudflare / Netlify）",
      summary: "把代码推上去就有网址，不用管服务器、不用配 nginx。",
      tags: ["vercel", "cloudflare", "netlify", "托管", "deploy", "pages", "workers"],
      what: "这类平台连上你的 Git 仓库，一 push 自动构建、自动发布、自动配 HTTPS 和全球 CDN。前端项目、静态站点几乎零配置；Next.js 在 Vercel 上体验最好，Cloudflare 的免费额度最实在（Pages/Workers 静态资源免费且无限带宽）。",
      useWhen: ["纯前端 / 静态站点（最省事，免费额度就够）", "想快速给客户看 demo、给应用商店审核看官网", "需要全球加速但不想买 CDN"],
      avoidWhen: ["需要长连接 WebSocket、常驻后台进程（选云服务器更合适）", "服务要在国内稳定访问（需要备案与国内节点，选阿里云/腾讯云）"],
      examples: ["官网 / 文档站 / 博客", "前端 + Serverless 接口", "预览每个 PR 的效果", "个人知识库上线"],
      code: `# Cloudflare Pages（wrangler.jsonc）
{ "name": "my-site", "assets": { "directory": "./dist" } }

npx wrangler deploy`,
      codeLang: "json",
    },
    {
      id: "cloud.compute",
      title: "云服务器（ECS / EC2 / 轻量应用服务器）",
      summary: "一台你自己的 24 小时开机电脑，什么都能装，什么都要自己管。",
      tags: ["ecs", "ec2", "vps", "云服务器", "轻量", "root"],
      what: "云服务器就是租一台远程 Linux 机器，你有 root 权限，能装数据库、跑 Docker、开端口。自由度高、成本可预测（几十元/月），但系统更新、安全加固、备份、监控全要自己负责。国内厂商还有「轻量应用服务器」这种打包好的入门款。",
      useWhen: ["需要常驻进程、定时任务、WebSocket", "要跑数据库或自建服务（如代理、爬虫、队列）", "成本要求可控，长期跑比 Serverless 便宜"],
      avoidWhen: ["只想放个静态站（用托管平台，省掉全部运维）", "没有精力做安全加固（公网机器每天都有人扫）"],
      examples: ["自建后端 + 数据库", "跑 Docker 多服务", "定时爬虫 / 数据同步", "自建 Git / 图床 / 网盘"],
      code: `# 最小安全配置
adduser deploy && usermod -aG sudo deploy   # 别用 root 登录
# /etc/ssh/sshd_config: PasswordAuthentication no
ufw allow 22 && ufw allow 80 && ufw allow 443 && ufw enable`,
      codeLang: "bash",
    },
    {
      id: "cloud.storage",
      title: "对象存储（S3 / OSS / COS / R2）",
      summary: "存图片、视频、附件的地方，按量付费，自带 CDN 和权限控制。",
      tags: ["s3", "oss", "cos", "r2", "对象存储", "图床", "文件上传"],
      what: "对象存储把文件当成「桶里的对象」，用 key 访问，天生适合海量文件。配合预签名 URL 可以让前端直传、私有文件限时访问。Cloudflare R2 出流量免费，是海外项目的省钱选择；国内项目用阿里云 OSS / 腾讯云 COS（同区访问快）。",
      useWhen: ["用户上传头像、图片、视频、附件", "需要私有文件（只有登录用户能看）", "文件体积大、数量多，不适合塞数据库"],
      avoidWhen: ["几十个小文件、只在服务端内部用，直接放磁盘更简单", "需要频繁改写同一个文件（对象存储是覆盖写）"],
      examples: ["用户头像与商品图", "导出报表下载", "视频 / 音频托管", "网站静态资源 + CDN"],
      code: `// 前端直传：后端只签发一个短时上传地址
const url = await s3.getSignedUrl("putObject", {
  Bucket: "app-uploads", Key: \`avatar/\${userId}.png\`, Expires: 300,
});`,
      codeLang: "javascript",
    },
    {
      id: "cloud.db",
      title: "云数据库（RDS / Supabase / Neon / Firebase）",
      summary: "别人替你管数据库：备份、升级、监控都省了。",
      tags: ["rds", "supabase", "neon", "firebase", "云数据库", "postgres", "托管"],
      what: "托管数据库把运维外包：自动备份、故障切换、参数调优、安全补丁。传统云厂商的 RDS 稳但贵；Supabase / Neon 这类新一代平台提供「注册即用的 Postgres + 自带登录 + 自动 API」，非常适合小团队和 MVP；Firebase 则是文档型 + 实时同步。",
      useWhen: ["不想自己装数据库、配备份和监控", "MVP 阶段想最快跑起来（Supabase 免费额度够用）", "需要自动扩缩容"],
      avoidWhen: ["数据量极大、成本敏感，自建可能更便宜", "合规要求数据必须放在特定地域/私有环境"],
      examples: ["MVP 后端数据", "实时协作类应用（Firebase 实时订阅）", "需要登录 + 存储一体（Supabase）"],
      code: `// Supabase：前端直接读写（权限由行级安全策略控制）
const { data } = await supabase
  .from("notes")
  .select("*")
  .eq("user_id", user.id);`,
      codeLang: "javascript",
    },
    {
      id: "cloud.auth",
      title: "登录认证服务（Clerk / Auth0 / Supabase Auth / 微信登录）",
      summary: "登录、注册、找回密码、第三方登录，别自己写。",
      tags: ["clerk", "auth0", "supabase auth", "微信登录", "oauth", "登录", "认证"],
      what: "认证服务替你处理注册登录、邮箱验证、找回密码、Google/Apple/微信第三方登录、多设备会话、两步验证。代价是要按用户数付费，且用户数据放在别人那里。国内产品通常要接微信 / 手机号验证码，这块需自行对接。",
      useWhen: ["产品需要账号体系（几乎必然）", "要支持第三方登录，自己对接每个平台很费劲", "团队没有安全经验，自己写登录容易出漏洞"],
      avoidWhen: ["纯内部工具、用户就几个人（简单密码 + 会话就够）", "用户量很大且成本敏感（按 MAU 计费会很贵）"],
      examples: ["Google / Apple 一键登录", "邮箱验证码登录", "多设备登录与注销", "两步验证"],
      code: `// Clerk（React）：包一层 Provider 就有登录组件
<ClerkProvider publishableKey={key}>
  <SignedOut><SignInButton /></SignedOut>
  <SignedIn><UserButton /></SignedIn>
</ClerkProvider>`,
      codeLang: "jsx",
    },
    {
      id: "cloud.payment",
      title: "支付（Stripe / 微信支付 / 支付宝 / 内购）",
      summary: "收钱这件事每条通道规则都不一样，选错了上不了线。",
      tags: ["stripe", "微信支付", "支付宝", "iap", "内购", "支付", "订阅"],
      what: "支付分四类：① Stripe / Paddle（海外，卡支付 + 订阅，个人也能接）；② 微信支付 / 支付宝（国内，需营业执照与商户号）；③ App Store 内购 / Google Play 结算（虚拟商品必须走，抽成 15–30%）；④ 虚拟货币/加密货币（多数平台禁止）。收款前先确认你的商品属于哪类、你的主体能不能开通。",
      useWhen: ["卖订阅、卖一次性功能、卖服务", "App 内卖虚拟内容（必须用内购）", "海外用户付款（Stripe 最通用）"],
      avoidWhen: ["还没验证有人愿意付钱就接支付（先做付费意愿验证）", "想绕过 App 内购卖虚拟商品（会被拒审/下架）"],
      examples: ["SaaS 月订阅", "买断制 App 解锁", "服务定金", "打赏 / 赞助"],
      code: `// Stripe：服务端创建 Checkout 会话，前端跳转
const session = await stripe.checkout.sessions.create({
  mode: "subscription",
  line_items: [{ price: PRICE_ID, quantity: 1 }],
  success_url: "https://app.com/ok",
});`,
      codeLang: "javascript",
    },
    {
      id: "cloud.email",
      title: "邮件与短信（Resend / SendGrid / 阿里云短信）",
      summary: "发验证码、通知、账单，自己搭邮件服务器基本进垃圾箱。",
      tags: ["resend", "sendgrid", "短信", "邮件", "验证码", "smtp"],
      what: "事务邮件服务替你处理发信、送达率、退信、SPF/DKIM 认证（决定会不会进垃圾箱）。Resend 对开发者最友好（API 一行、免费额度够小产品用），SendGrid/Mailgun 更成熟。国内短信必须用持牌服务商（阿里云/腾讯云），且模板要审核。",
      useWhen: ["注册验证码、密码重置", "订单通知、账单、日报", "营销邮件（要单独确认合规与退订）"],
      avoidWhen: ["用户就几个人、只在内部用，手动发就行", "想用个人邮箱批量发营销邮件（很快被封）"],
      examples: ["邮箱验证码登录", "付款成功通知", "每周数据摘要", "手机号验证码"],
      code: `await resend.emails.send({
  from: "no-reply@yourdomain.com",   // 域名要先做 DNS 验证
  to: user.email,
  subject: "你的验证码",
  text: "验证码 4821，10 分钟内有效",
});`,
      codeLang: "javascript",
    },
    {
      id: "cloud.ai-platform",
      title: "AI 模型接口（OpenAI / Anthropic / DeepSeek / 通义）",
      summary: "按 token 付费调用别人的模型，不用自己训练。",
      tags: ["openai", "anthropic", "claude", "deepseek", "通义", "api", "token"],
      what: "主流做法是调 API：注册 → 拿 key → 按输入输出 token 计费。差异主要在：能力（推理/代码/多模态）、价格（能差十倍）、速度、上下文长度、是否支持结构化输出、国内是否能直连（很多需要中转或选国内模型）。写代码时优先选支持「流式 + 结构化输出 + 工具调用」的。",
      useWhen: ["产品要接入 AI 能力（写文案、问答、总结、识别）", "想快速验证想法，不想碰模型训练", "需要多模型对比成本与效果"],
      avoidWhen: ["数据绝对不能出内网（要本地模型）", "任务规则明确（比如格式转换），写代码比调模型更便宜可靠"],
      examples: ["文档问答（RAG）", "自动写商品描述", "会议纪要总结", "客服机器人"],
      code: `const res = await client.chat.completions.create({
  model: "gpt-4o-mini",           // 便宜 + 快，先用它验证
  messages: [{ role: "user", content: "把这句话改得更客气：" + text }],
  stream: true,
});`,
      codeLang: "javascript",
    },
  ],
};
