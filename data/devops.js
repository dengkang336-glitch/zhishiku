/* DevOps 与部署 大类内容 */
window.KB = window.KB || {};

window.KB.devops = {
  id: "devops",
  title: "DevOps 与部署",
  summary: "把代码从「我电脑上能跑」变成「全世界都能用」，并持续稳定运行。",
  tags: ["devops", "部署", "运维", "docker", "ci/cd", "服务器"],
  what: "写好的代码要放到服务器上别人才能访问——这就是部署。DevOps 是把「开发」和「运维」打通的一套做法和工具：用容器保证环境一致、用流水线自动测试和发布、用云服务器承载流量。对不懂技术的人来说，这块是「上线」环节的全部。",
  children: [
    // ================= 服务器 / 托管 =================
    {
      id: "devops.server",
      title: "服务器与托管",
      summary: "代码最终跑在哪台机器上。",
      tags: ["服务器", "云服务器", "vps", "云平台", "托管"],
      what: "服务器就是运行你代码的远程电脑。可以买云服务器（自己配置一切），也可以用托管平台（平台帮你处理服务器细节，你只管推代码）。",
      children: [
        {
          id: "devops.server.vps",
          title: "云服务器（VPS / ECS）",
          summary: "租一台远程电脑，全部自己配。",
          tags: ["云服务器", "vps", "ecs", "阿里云", "腾讯云"],
          what: "云厂商（阿里云、腾讯云、AWS、DigitalOcean）提供的虚拟服务器。你拿到一个 IP 和 root 权限，系统、软件、安全全自己装自己管。灵活、便宜，但需要会运维。",
          useWhen: ["想完全掌控环境", "预算敏感、愿意自己维护"],
          avoidWhen: ["不想管服务器细节，用托管平台更省心"],
          examples: ["阿里云 ECS", "腾讯云 CVM", "AWS EC2", "DigitalOcean Droplet"],
          codeLang: "text",
        },
        {
          id: "devops.server.paas",
          title: "托管平台（PaaS）",
          summary: "推代码就自动部署，不用管服务器。",
          tags: ["paas", "托管", "vercel", "netlify", "railway", "fly.io"],
          what: "PaaS 平台帮你处理服务器、扩容、HTTPS、部署流程，你只要连上 Git 仓库，推代码就自动上线。最适合个人开发者和快速上线。",
          useWhen: ["个人项目、快速上线、不想运维", "前端站点（Vercel/Netlify 极快）"],
          avoidWhen: ["成本随规模上升比自建服务器贵", "需要深度定制环境时受限"],
          examples: ["Vercel / Netlify（前端）", "Railway / Render / Fly.io（全栈）", "Cloudflare Workers"],
          codeLang: "text",
        },
        {
          id: "devops.server.cloud",
          title: "云平台（AWS / 阿里云）",
          summary: "一整套云服务：服务器、数据库、存储、CDN 全都有。",
          tags: ["aws", "阿里云", "云平台", "云计算", "腾讯云"],
          what: "云平台提供几百种服务：虚拟机、托管数据库、对象存储、CDN、消息队列、AI 能力……按需组合。企业常用，但服务多、计费复杂，容易踩坑。",
          useWhen: ["企业级项目", "需要托管数据库、CDN 等全套服务"],
          avoidWhen: ["个人小项目容易因为配置复杂和账单失控而踩坑"],
          examples: ["AWS", "阿里云", "腾讯云", "Google Cloud", "Azure"],
          codeLang: "text",
        },
        {
          id: "devops.server.serverless",
          title: "Serverless（无服务器）",
          summary: "只写函数，不用管服务器，按调用付费。",
          tags: ["serverless", "无服务器", "函数", "lambda", "边缘"],
          what: "Serverless 让你只写一个函数（比如「处理这个请求」），平台自动运行、自动扩容，没人访问就不花钱。适合流量波动大、或事件触发的场景。",
          useWhen: ["流量波动大（闲时零成本）", "定时任务、Webhook、图片处理"],
          avoidWhen: ["冷启动有延迟", "长时间运行的任务不适合"],
          examples: ["AWS Lambda", "Cloudflare Workers", "Vercel Functions", "阿里云函数计算"],
          codeLang: "text",
        },
      ],
    },

    // ================= 容器 =================
    {
      id: "devops.container",
      title: "容器与编排",
      summary: "把应用和它的运行环境打包在一起，到哪都能跑。",
      tags: ["docker", "容器", "kubernetes", "k8s", "镜像"],
      what: "「在我电脑上能跑」是开发经典难题——因为环境不一样。容器把「应用 + 它依赖的一切」打包成一个镜像，在任何机器上运行结果都一样。",
      children: [
        {
          id: "devops.container.docker",
          title: "Docker",
          summary: "最流行的容器工具，打包应用和运行环境。",
          tags: ["docker", "容器", "镜像", "dockerfile", "环境一致"],
          what: "Docker 把应用和它的依赖打包成「镜像」，运行时启动成「容器」。解决了「我电脑上能跑，服务器上跑不了」的经典问题，是现在部署的标准方式。",
          useWhen: ["几乎所有正式部署都用", "需要保证开发/测试/生产环境一致"],
          examples: ["打包 Node/Python 应用", "本地跑数据库（不用装 MySQL）", "多服务编排", "CI 里跑测试"],
          code: `# Dockerfile：把 Node 应用打包成镜像
FROM node:20
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "index.js"]`,
          codeLang: "dockerfile",
        },
        {
          id: "devops.container.compose",
          title: "Docker Compose",
          summary: "用一份配置同时启动多个容器。",
          tags: ["docker compose", "多容器", "编排", "本地环境"],
          what: "一个应用常常需要多个服务（应用 + 数据库 + Redis）。Docker Compose 用一份 YAML 配置把这些容器一起启动、互相连接，一条命令全起来。",
          useWhen: ["本地开发需要多个服务", "小规模部署（单机多容器）"],
          avoidWhen: ["多台服务器的大规模集群用 Kubernetes"],
          examples: ["本地跑「应用 + MySQL + Redis」", "小项目一键部署"],
          code: `# docker-compose.yml：一键启动应用 + 数据库
services:
  app:
    build: .
    ports: ["3000:3000"]
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: secret`,
          codeLang: "yaml",
        },
        {
          id: "devops.container.k8s",
          title: "Kubernetes（K8s）",
          summary: "管理大规模容器的「操作系统」。",
          tags: ["kubernetes", "k8s", "编排", "集群", "扩容"],
          what: "Kubernetes 管理成百上千个容器：自动扩容、自动重启挂掉的服务、滚动更新不停机、负载均衡。是企业级部署的事实标准，但学习曲线陡、运维复杂。",
          useWhen: ["大规模服务集群", "需要自动扩容和高可用"],
          avoidWhen: ["小项目用 K8s 是严重过度设计（运维成本极高）"],
          examples: ["大型企业微服务", "需要弹性扩容的业务", "云厂商托管 K8s（EKS/ACK）"],
          codeLang: "yaml",
        },
      ],
    },

    // ================= CI/CD =================
    {
      id: "devops.cicd",
      title: "CI/CD 流水线",
      summary: "推代码后自动测试、自动构建、自动上线。",
      tags: ["ci/cd", "流水线", "自动化", "github actions", "部署"],
      what: "CI（持续集成）= 每次推代码自动跑测试、检查错误；CD（持续部署）= 测试通过后自动发布上线。好处：不用手动部署（少出错）、问题早发现、随时可发布。",
      children: [
        {
          id: "devops.cicd.githubactions",
          title: "GitHub Actions",
          summary: "GitHub 自带的自动化流水线，最常用。",
          tags: ["github actions", "ci", "自动化", "workflow"],
          what: "在 GitHub 仓库里写一个 YAML 文件，就能定义「推代码后自动做什么」：跑测试、构建、部署。免费额度对个人项目足够。",
          useWhen: ["代码托管在 GitHub 的项目（几乎默认选择）"],
          examples: ["推代码自动跑测试", "自动部署到 Vercel/服务器", "自动构建 Docker 镜像", "自动发版"],
          code: `# .github/workflows/deploy.yml
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npm test`,
          codeLang: "yaml",
        },
        {
          id: "devops.cicd.gitlabci",
          title: "GitLab CI",
          summary: "GitLab 自带的流水线。",
          tags: ["gitlab ci", "ci", "流水线"],
          what: "GitLab 内置的 CI/CD，用 .gitlab-ci.yml 定义流程。企业自建 GitLab 时常用。",
          useWhen: ["代码托管在 GitLab", "企业内网自建流水线"],
          examples: ["企业内网 CI", "自动构建部署"],
          codeLang: "yaml",
        },
        {
          id: "devops.cicd.pipeline",
          title: "流水线设计思路",
          summary: "一条好流水线应该有哪些阶段。",
          tags: ["流水线", "pipeline", "阶段", "设计"],
          what: "典型流水线：装依赖 → 代码检查（lint/类型检查）→ 跑测试 → 构建产物 → 部署到测试环境 → 部署到生产。每一步失败就停下，不让坏代码上线。",
          useWhen: ["设计项目的自动化流程时"],
          examples: ["lint → test → build → deploy", "分环境部署（测试/预发/生产）"],
          codeLang: "text",
        },
      ],
    },

    // ================= 上线相关 =================
    {
      id: "devops.release",
      title: "上线相关",
      summary: "域名、HTTPS、环境配置这些「上线必办的事」。",
      tags: ["域名", "https", "环境变量", "seo", "上线"],
      what: "代码跑起来只是第一步。要让别人能正经访问，还得：买个域名、配 HTTPS 证书（浏览器不报警）、把密钥配置好（不能写死在代码里）、考虑搜索引擎能不能收录。",
      children: [
        {
          id: "devops.release.domain",
          title: "域名与 DNS",
          summary: "把好记的网址指向你的服务器。",
          tags: ["域名", "dns", "解析", "网址"],
          what: "域名是网址（example.com），DNS 负责把域名翻译成服务器的 IP 地址。买域名后要在 DNS 里加一条记录指向服务器。",
          useWhen: ["任何正式对外网站都要"],
          examples: ["买域名（阿里云/Namecheap/Cloudflare）", "配 A 记录指向服务器 IP", "配 CNAME 指向托管平台"],
          code: `# DNS 记录示例
A      example.com        → 1.2.3.4        （指向服务器 IP）
CNAME  www.example.com    → example.com    （www 指向主域名）`,
          codeLang: "text",
        },
        {
          id: "devops.release.https",
          title: "HTTPS 与证书",
          summary: "让网站地址前面出现小锁，数据加密传输。",
          tags: ["https", "ssl", "证书", "加密", "letsencrypt"],
          what: "HTTPS 加密浏览器和服务器之间的通信，防止被窃听篡改。没有 HTTPS，浏览器会显示「不安全」警告。现在有免费证书（Let's Encrypt），托管平台一般自动配好。",
          useWhen: ["所有对外网站都必须有（现在已是标配）"],
          examples: ["Let's Encrypt 免费证书", "Cloudflare 自动 HTTPS", "Vercel/Netlify 自动配证书"],
          codeLang: "text",
        },
        {
          id: "devops.release.env",
          title: "环境变量与密钥管理",
          summary: "密码、API Key 不能写死在代码里。",
          tags: ["环境变量", "env", "密钥", "配置", "安全"],
          what: "数据库密码、第三方 API Key 这类敏感信息绝不能写在代码里（会被提交到 Git 泄露）。正确做法是放在「环境变量」里，代码运行时读取。",
          useWhen: ["任何涉及密码/密钥的项目"],
          avoidWhen: ["绝对不能把 .env 文件提交到 Git 仓库"],
          examples: [".env 文件存本地配置", "部署平台配置环境变量", "密钥管理服务（Vault）"],
          code: `# .env 文件（不提交到 Git！）
DATABASE_URL=postgres://user:pass@localhost/db
API_KEY=sk-xxxxxx

# 代码里读
process.env.DATABASE_URL`,
          codeLang: "bash",
        },
        {
          id: "devops.release.seo",
          title: "SEO（搜索引擎优化）",
          summary: "让 Google/百度能收录你的网站。",
          tags: ["seo", "搜索", "收录", "meta", "sitemap"],
          what: "SEO 让你的网站能被搜索引擎找到。基础要点：语义化 HTML、title/description、sitemap、服务端渲染（SPA 对 SEO 不友好）、加载速度。",
          useWhen: ["内容站、官网、电商等靠搜索带来流量的站"],
          avoidWhen: ["后台管理系统等不需要被搜索的站可以不管"],
          examples: ["设置页面 title 和 description", "提交 sitemap 到 Search Console", "用 SSR/SSG 保证内容能被抓取"],
          code: `<head>
  <title>产品名 - 一句话说明你是做什么的</title>
  <meta name="description" content="页面描述，会显示在搜索结果里" />
</head>`,
          codeLang: "html",
        },
      ],
    },
  ],
};
