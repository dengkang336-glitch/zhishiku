/* 中间件与基础设施 大类内容 */
window.KB = window.KB || {};

window.KB.middleware = {
  id: "middleware",
  title: "中间件与基础设施",
  summary: "在应用和服务器之间「打辅助」的通用组件：代理、队列、搜索、存储、监控。",
  tags: ["中间件", "middleware", "nginx", "kafka", "基础设施", "infra"],
  what: "中间件是在你的代码之外、但又必须有的「通用能力组件」。它们不直接实现你的业务，但你的业务跑起来离不开它们：把请求转发给服务器的网关（Nginx）、异步传消息的队列（Kafka）、存图片的对象存储（OSS）、盯系统健康的监控。小项目很多用不上，一旦上规模就非常关键。",
  children: [
    // ================= 网关与代理 =================
    {
      id: "middleware.gateway",
      title: "网关与代理",
      summary: "挡在服务前面的「门卫 + 调度员」。",
      tags: ["网关", "代理", "nginx", "反向代理", "负载均衡"],
      what: "网关/代理站在真实服务前面，负责接收所有外部请求，再做转发、分发、限流、加解密、设 HTTPS 等。用户以为在跟一个服务说话，其实背后可能是一群服务。",
      children: [
        {
          id: "middleware.gateway.nginx",
          title: "Nginx",
          summary: "最常用的 Web 服务器 / 反向代理。",
          tags: ["nginx", "反向代理", "负载均衡", "静态文件", "https"],
          what: "Nginx 是最流行的 Web 服务器和反向代理。常见用途：把请求转发给后端服务（反向代理）、把流量分给多台服务器（负载均衡）、直接托管静态文件（HTML/图片，速度极快）、配置 HTTPS。",
          useWhen: ["几乎每个正式上线项目都会用", "需要反向代理、负载均衡、HTTPS"],
          examples: ["反向代理后端 API", "托管静态网站", "负载均衡多台服务器", "配置 HTTPS 证书"],
          code: `# Nginx 反向代理配置
server {
  listen 80;
  server_name example.com;

  location / {
    proxy_pass http://localhost:3000;   # 转发给后端
  }
}`,
          codeLang: "nginx",
        },
        {
          id: "middleware.gateway.apigateway",
          title: "API 网关",
          summary: "微服务架构下统一入口，统一认证限流。",
          tags: ["api 网关", "gateway", "微服务", "限流", "统一入口"],
          what: "微服务多了以后，前端不该直接对接几十个服务。API 网关做「统一入口」：所有请求先进网关，由它负责鉴权、限流、路由到对应服务、记录日志。",
          useWhen: ["微服务架构（服务多了）", "需要统一鉴权、限流、监控"],
          avoidWhen: ["单体应用不需要（Nginx 就够）"],
          examples: ["Kong", "APISIX", "云厂商的 API 网关", "Spring Cloud Gateway"],
          codeLang: "text",
        },
        {
          id: "middleware.gateway.cdn",
          title: "CDN",
          summary: "把静态资源分发到全球各地，离用户更近。",
          tags: ["cdn", "加速", "静态资源", "全球", "缓存"],
          what: "CDN 把你的图片、JS、视频等静态文件复制到全球各地的节点服务器上，用户访问时自动从最近的节点取，速度快很多。",
          useWhen: ["用户分布广、静态资源多（图片、视频、前端文件）", "需要提升访问速度"],
          examples: ["图片加速", "视频分发", "前端静态资源加速", "Cloudflare / 阿里云 CDN"],
          codeLang: "text",
        },
      ],
    },

    // ================= 消息与异步 =================
    {
      id: "middleware.messaging",
      title: "消息与异步",
      summary: "让服务之间「异步传话」的组件。",
      tags: ["消息队列", "kafka", "rabbitmq", "异步", "事件"],
      what: "消息队列让服务之间不用「你等我答」，而是把消息丢进队列，谁需要谁取。带来三个好处：解耦（服务互不依赖）、削峰（流量高峰排队慢慢处理）、异步（用户不用等）。",
      children: [
        {
          id: "middleware.messaging.kafka",
          title: "Kafka",
          summary: "高吞吐的消息队列，大数据和日志管道常用。",
          tags: ["kafka", "消息队列", "大数据", "日志", "流"],
          what: "Kafka 是超高吞吐量的分布式消息队列，能处理每秒百万级消息，常用于日志收集、大数据管道、实时数据流。",
          useWhen: ["海量数据流（日志、埋点）", "大数据管道", "实时数据处理"],
          avoidWhen: ["小项目用 Kafka 太重，用 RabbitMQ/Redis 更简单"],
          examples: ["日志收集", "用户行为埋点", "实时数据管道", "事件驱动架构"],
          codeLang: "text",
        },
        {
          id: "middleware.messaging.rabbitmq",
          title: "RabbitMQ",
          summary: "功能完善的传统消息队列，路由灵活。",
          tags: ["rabbitmq", "消息队列", "路由", "任务队列"],
          what: "RabbitMQ 是成熟稳定的消息队列，路由规则灵活，适合「任务队列」类场景（把任务分发给多个 worker 处理）。",
          useWhen: ["异步任务（发邮件、生成报表）", "服务间解耦", "任务分发"],
          avoidWhen: ["超大数据流吞吐用 Kafka 更合适"],
          examples: ["异步发邮件", "图片处理任务", "订单通知", "任务分发"],
          codeLang: "text",
        },
        {
          id: "middleware.messaging.event",
          title: "事件驱动（Event）",
          summary: "一个动作发生后，通知所有关心它的服务。",
          tags: ["事件", "event", "事件驱动", "发布订阅", "pubsub"],
          what: "事件驱动的思路是：A 服务做完一件事就「广播一个事件」，其他关心的服务各自去处理，彼此不用知道对方存在。比如「下单成功」事件 → 库存服务扣库存、通知服务发短信、积分服务加积分。",
          useWhen: ["多个服务要对同一个动作做出反应", "想让服务之间尽量解耦"],
          avoidWhen: ["简单流程直接调函数就行，硬套事件会变复杂"],
          examples: ["下单成功 → 发短信/加积分/扣库存", "用户注册 → 发欢迎邮件"],
          codeLang: "text",
        },
      ],
    },

    // ================= 存储服务 =================
    {
      id: "middleware.storage",
      title: "文件与对象存储",
      summary: "存图片、视频、文件这类「大文件」。",
      tags: ["对象存储", "oss", "s3", "文件", "图片", "存储"],
      what: "数据库不适合存图片视频这类大文件。对象存储专门存文件（图片、视频、文档、备份），容量几乎无限、按量付费、可通过网址访问。",
      children: [
        {
          id: "middleware.storage.s3",
          title: "对象存储（S3 / OSS）",
          summary: "存文件的标准方案，AWS S3、阿里云 OSS 等。",
          tags: ["s3", "oss", "对象存储", "文件", "图片"],
          what: "对象存储把文件存成「对象」，每个对象有一个唯一网址。AWS S3 是行业标准，国内对应阿里云 OSS、腾讯云 COS。几乎所有要「上传图片/视频」的应用都用它。",
          useWhen: ["用户上传图片/视频/文件", "托管静态资源", "备份数据"],
          avoidWhen: ["小文件少、小项目也可以直接存服务器硬盘（但要考虑扩容）"],
          examples: ["用户头像上传", "商品图片", "视频存储", "文件下载"],
          code: `# 上传一个文件到对象存储（伪代码）
storage.upload("avatar.png", file)   # 上传
# 返回一个网址，可以直接用
# https://bucket.oss.com/avatar.png`,
          codeLang: "text",
        },
        {
          id: "middleware.storage.file",
          title: "本地文件 / 分布式文件系统",
          summary: "文件存在自己服务器硬盘上。",
          tags: ["文件系统", "本地存储", "nas", "分布式"],
          what: "最朴素的方式：文件直接存服务器硬盘。小项目简单够用，但服务器多了就不好共享，扩容和备份也麻烦。",
          useWhen: ["小项目、单台服务器", "内网环境"],
          avoidWhen: ["多台服务器、要扩容时用对象存储更合适"],
          examples: ["小网站的文件目录", "内网共享盘"],
          codeLang: "text",
        },
      ],
    },

    // ================= 可观测性 =================
    {
      id: "middleware.observability",
      title: "监控与可观测性",
      summary: "系统跑了之后，怎么知道它健康不健康、哪里出了问题。",
      tags: ["监控", "可观测性", "日志", "指标", "链路追踪", "告警"],
      what: "「可观测性」是一整套让你能看清系统内部状态的能力，通常分三块：指标（Metrics，系统快不快、占多少内存）、日志（Logs，具体发生了什么）、链路追踪（Traces，一个请求经过了哪些服务、每段花了多久）。",
      children: [
        {
          id: "middleware.observability.metrics",
          title: "指标监控（Metrics）",
          summary: "看系统的「体检数据」：CPU、内存、QPS、响应时间。",
          tags: ["监控", "metrics", "prometheus", "grafana", "cpu", "qps"],
          what: "指标是数字化的系统状态：CPU 使用率、内存占用、每秒请求数（QPS）、平均响应时间、错误率。常用 Prometheus 采集、Grafana 画成仪表盘。",
          useWhen: ["任何上线的系统都需要", "设置告警阈值（CPU > 90% 就通知）"],
          examples: ["CPU / 内存监控", "QPS / 响应时间", "错误率", "Grafana 仪表盘"],
          codeLang: "text",
        },
        {
          id: "middleware.observability.logs",
          title: "日志收集（Logs）",
          summary: "把多台服务器的日志集中起来查。",
          tags: ["日志", "logs", "elk", "loki", "日志收集", "排查"],
          what: "服务器一多，日志散在各台机器上很难查。日志收集系统把日志统一收起来，可以集中搜索、按时间过滤、做告警。常见方案：ELK（Elasticsearch + Logstash + Kibana）、Loki。",
          useWhen: ["多台服务器", "需要快速定位线上问题"],
          examples: ["ELK 日志平台", "按请求 ID 追踪一次请求的所有日志", "错误日志告警"],
          codeLang: "text",
        },
        {
          id: "middleware.observability.trace",
          title: "链路追踪（Tracing）",
          summary: "追踪一个请求经过了哪些服务、各花了多久。",
          tags: ["链路追踪", "trace", "opentelemetry", "jaeger", "性能"],
          what: "微服务下一个请求可能经过 10 个服务，哪里慢了很难查。链路追踪给每个请求打上唯一 ID，记录它经过的每个服务和耗时，一眼看出瓶颈在哪。常用 OpenTelemetry + Jaeger。",
          useWhen: ["微服务架构", "排查「为什么这个接口这么慢」"],
          avoidWhen: ["单体应用用日志和指标就够"],
          examples: ["定位慢接口", "看服务调用拓扑", "排查跨服务问题"],
          codeLang: "text",
        },
        {
          id: "middleware.observability.alert",
          title: "告警（Alerting）",
          summary: "出问题时自动通知你。",
          tags: ["告警", "alert", "通知", "值班", "钉钉", "slack"],
          what: "告警让系统在出问题时主动叫你：CPU 飙高、错误率上升、服务挂了，立刻发消息到微信/钉钉/Slack/短信。没有告警，你可能几小时后才从用户投诉里知道服务挂了。",
          useWhen: ["任何正式上线的系统", "关键指标设阈值告警"],
          avoidWhen: ["告警别太频繁（告警疲劳），分级处理"],
          examples: ["服务宕机告警", "错误率突增告警", "磁盘快满告警", "证书即将过期告警"],
          codeLang: "text",
        },
      ],
    },
  ],
};
