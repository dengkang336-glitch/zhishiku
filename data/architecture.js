/* 架构与设计 大类内容 */
window.KB = window.KB || {};

window.KB.architecture = {
  id: "architecture",
  title: "架构与设计",
  summary: "系统怎么搭、模块怎么分、代码怎么组织——决定项目能不能长大。",
  tags: ["架构", "设计", "系统设计", "微服务", "设计模式"],
  what: "架构是「系统怎么拆、怎么连、怎么长大」。一个人写的小脚本不需要架构，但项目变成几万行、几十万用户时，架构没想清楚就会越改越乱。这块知识主要是帮你在做技术选型和搭骨架时别走弯路。",
  children: [
    // ================= 系统架构形态 =================
    {
      id: "architecture.shape",
      title: "系统架构形态",
      summary: "单体、微服务、无服务器——系统怎么拆。",
      tags: ["单体", "微服务", "架构形态", "serverless"],
      what: "「拆不拆」是架构最根本的问题。全写在一个应用里最简单（单体），拆成很多小服务最灵活但最复杂（微服务）。绝大多数项目该从中等粒度开始，别一上来就微服务。",
      children: [
        {
          id: "architecture.shape.monolith",
          title: "单体架构（Monolith）",
          summary: "所有功能写在一个应用里。",
          tags: ["单体", "monolith", "简单", "起步"],
          what: "前端、后端、业务逻辑全在一个项目里，一起部署。开发简单、调试简单、部署简单。缺点是规模大了以后互相牵制、一次改动要整个重部署。",
          useWhen: ["项目刚起步、团队小（3-5 人以内）", "还看不清业务边界时"],
          avoidWhen: ["别在项目早期就担心「以后拆不动」——绝大多数项目根本没到那一步"],
          examples: ["早期创业项目", "内部系统", "个人产品", "SaaS 早期"],
          codeLang: "text",
        },
        {
          id: "architecture.shape.micro",
          title: "微服务（Microservices）",
          summary: "拆成很多小服务，各自独立部署。",
          tags: ["微服务", "microservices", "拆分", "独立部署"],
          what: "把系统按业务拆成多个独立服务（用户服务、订单服务、支付服务），各自独立开发和部署，通过 API 通信。好处是团队可以并行、局部扩容；坏处是运维复杂、调试困难、数据一致性难。",
          useWhen: ["团队大（几十人以上）、业务边界清晰", "某部分需要独立扩容"],
          avoidWhen: ["小团队/早期项目上微服务是灾难级的过度设计"],
          examples: ["大型电商", "大型 SaaS", "组织结构大的公司"],
          codeLang: "text",
        },
        {
          id: "architecture.shape.modular",
          title: "模块化单体（Modular Monolith）",
          summary: "一个应用，但内部按模块严格分开。",
          tags: ["模块化", "modular", "单体", "折中"],
          what: "推荐的折中方案：仍是一个应用一个部署，但代码内部按业务严格分模块，模块之间只能通过明确的接口通信。将来真需要拆微服务时，按模块边界拆就很容易。",
          useWhen: ["大多数项目的理想起点——简单但不失秩序"],
          examples: ["中等规模的 SaaS", "业务边界清晰的系统"],
          codeLang: "text",
        },
        {
          id: "architecture.shape.serverless",
          title: "Serverless 架构",
          summary: "只写函数，平台负责运行和扩容。",
          tags: ["serverless", "无服务器", "函数", "事件"],
          what: "把功能拆成一个个函数，由平台在需要时运行、自动扩容，不用管服务器。适合流量波动大、事件驱动的场景。",
          useWhen: ["流量波动大", "事件驱动、定时任务", "想零运维"],
          avoidWhen: ["冷启动延迟敏感的场景", "长时间运行的任务"],
          examples: ["图片处理", "Webhook 接收", "定时任务", "轻量 API"],
          codeLang: "text",
        },
      ],
    },

    // ================= 设计原则 =================
    {
      id: "architecture.principle",
      title: "设计原则",
      summary: "写代码时该遵守的几条「常识」。",
      tags: ["设计原则", "solid", "解耦", "dry", "kiss"],
      what: "这些原则不是教条，是无数人踩坑后总结的「别这样写」：别重复、别过度设计、模块之间别纠缠、一个函数只干一件事。遵循它们，代码才能在被改第 100 次时还不崩。",
      children: [
        {
          id: "architecture.principle.dry",
          title: "DRY（别重复自己）",
          summary: "同样的逻辑不要写两遍。",
          tags: ["dry", "重复", "复用", "抽取"],
          what: "同一段逻辑出现两次，就该抽成函数/组件。改的时候只改一处，不会漏改另一处。",
          useWhen: ["发现相同代码出现第二次时"],
          avoidWhen: ["别过度抽象——两段代码只是长得像但会各自演化，硬合并反而更糟（这叫「错误的 DRY」）"],
          examples: ["把重复的表单校验抽成函数", "把重复的 UI 抽成组件"],
          code: `// 不好：重复
const a = 价格 * 0.9;
const b = 价格2 * 0.9;

// 好：抽成函数
function 打九折(价格) { return 价格 * 0.9; }`,
          codeLang: "javascript",
        },
        {
          id: "architecture.principle.kiss",
          title: "KISS（保持简单）",
          summary: "能用简单方案就别用复杂方案。",
          tags: ["kiss", "简单", "过度设计"],
          what: "最简单的方案往往最好。别为了「以后可能要用」提前引入复杂架构、设计模式、抽象层——大概率用不上，却让现在变复杂。",
          useWhen: ["做技术选型和设计时"],
          examples: ["能用单体就别上微服务", "能用普通函数就别硬套设计模式"],
          codeLang: "text",
        },
        {
          id: "architecture.principle.solid",
          title: "SOLID 原则",
          summary: "面向对象设计的五条原则。",
          tags: ["solid", "单一职责", "开闭原则", "设计原则"],
          what: "SOLID 是五个原则的缩写，核心思想：一个类只干一件事（单一职责）、对扩展开放对修改关闭（开闭）、子类能替换父类（里氏替换）、接口要小而专（接口隔离）、依赖抽象不依赖具体（依赖倒置）。听起来抽象，实际就是「别让一个类什么都干」。",
          useWhen: ["设计类/模块结构时参考"],
          avoidWhen: ["小项目别过度套用，会写出大量无意义的抽象层"],
          examples: ["一个类只负责一件事", "通过接口解耦"],
          codeLang: "text",
        },
        {
          id: "architecture.principle.decouple",
          title: "解耦与分层",
          summary: "层与层之间别互相乱伸手。",
          tags: ["解耦", "分层", "mvc", "controller", "service"],
          what: "经典分层：路由层（收请求）→ 服务层（业务逻辑）→ 数据层（读写数据库）。每层只跟相邻层打交道。这样改数据库不影响业务逻辑，换框架不影响业务代码。",
          useWhen: ["设计后端项目结构时"],
          examples: ["Controller → Service → Repository 三层", "前端 UI 层 / 逻辑层 / 数据层分离"],
          codeLang: "text",
        },
        {
          id: "architecture.principle.yagni",
          title: "YAGNI（你不会需要它）",
          summary: "别为想象中的需求写代码。",
          tags: ["yagni", "过度设计", "需求"],
          what: "「以后可能会用到」的功能，大概率永远用不到。先写现在需要的，等真需要了再加。提前实现的成本是双份：写它的时间 + 维护它的时间。",
          useWhen: ["想加「以后可能有用」的抽象/配置/开关时"],
          examples: ["别为「也许要支持多语言」提前搭一套 i18n", "别为「也许要换数据库」提前写 ORM 抽象层"],
          codeLang: "text",
        },
      ],
    },

    // ================= 常见设计模式 =================
    {
      id: "architecture.pattern",
      title: "常见设计模式",
      summary: "反复出现的解法，起个名字方便沟通。",
      tags: ["设计模式", "pattern", "单例", "工厂", "观察者"],
      what: "设计模式是「常见问题的标准解法」。不用背，但知道名字有好处：看别人代码能看懂、跟人讨论时能说清。日常真正高频用到的只有少数几个。",
      children: [
        {
          id: "architecture.pattern.singleton",
          title: "单例（Singleton）",
          summary: "全局只有一个实例。",
          tags: ["单例", "singleton", "全局", "实例"],
          what: "保证某个类全局只有一个实例，比如数据库连接、配置对象。",
          useWhen: ["需要全局唯一的资源（连接池、配置）"],
          avoidWhen: ["滥用单例会变成隐式全局状态，难测试"],
          examples: ["数据库连接", "全局配置", "日志器"],
          code: `// 单例：全局只有一个实例
let 实例 = null;
function 获取连接() {
  if (!实例) 实例 = 创建连接();
  return 实例;
}`,
          codeLang: "javascript",
        },
        {
          id: "architecture.pattern.factory",
          title: "工厂（Factory）",
          summary: "用一个函数统一创建对象。",
          tags: ["工厂", "factory", "创建", "封装"],
          what: "把「创建对象」的复杂逻辑收进一个函数，调用方只说「给我一个 XX」，不用关心怎么造出来的。",
          useWhen: ["创建逻辑复杂或会变", "要根据条件创建不同实现"],
          examples: ["根据类型创建不同支付方式", "创建数据库连接"],
          code: `// 工厂：根据类型造对象，调用方不用关心细节
function 创建支付(类型) {
  if (类型 === "微信") return new 微信支付();
  if (类型 === "支付宝") return new 支付宝();
}`,
          codeLang: "javascript",
        },
        {
          id: "architecture.pattern.observer",
          title: "观察者（Observer）",
          summary: "状态一变，通知所有订阅者。",
          tags: ["观察者", "observer", "订阅", "发布订阅", "事件"],
          what: "一个对象状态变了，自动通知所有「订阅」了它的对象。前端的事件监听、状态管理（Vue 的响应式、React 的订阅）本质都是观察者模式。",
          useWhen: ["一对多通知（状态变了要更新多处）"],
          examples: ["UI 数据绑定", "事件系统", "消息订阅"],
          code: `// 观察者：订阅了就能收到通知
按钮.添加监听("click", () => {
  console.log("被点了");
});`,
          codeLang: "javascript",
        },
        {
          id: "architecture.pattern.strategy",
          title: "策略（Strategy）",
          summary: "把一堆 if-else 换成可替换的算法。",
          tags: ["策略", "strategy", "if else", "替换"],
          what: "当你有「根据情况选不同算法」的一大坨 if-else 时，把每种算法封装成独立对象，运行时替换。代码更清晰、更好扩展。",
          useWhen: ["if-else 分支很多、每种分支逻辑复杂"],
          examples: ["不同会员等级的价格计算", "不同支付方式", "不同排序算法"],
          code: `// 策略：替换掉一大坨 if-else
const 打折策略 = {
  普通: (价) => 价,
  VIP: (价) => 价 * 0.9,
  超级VIP: (价) => 价 * 0.8,
};
打折策略["VIP"](100);   // 90`,
          codeLang: "javascript",
        },
        {
          id: "architecture.pattern.middleware",
          title: "中间件模式（Middleware）",
          summary: "请求一层层过滤处理。",
          tags: ["中间件", "middleware", "管道", "拦截"],
          what: "请求进来后依次经过一串处理函数（鉴权 → 日志 → 限流 → 业务），每个可以放行或拦截。Express、Koa、Redux 都是这个模型。",
          useWhen: ["请求需要多步通用处理（鉴权、日志、错误捕获）"],
          examples: ["Express 中间件", "Redux middleware", "请求拦截器"],
          code: `// 中间件：一层层处理请求
app.use(记录日志);      // 1. 先记日志
app.use(检查登录);      // 2. 再检查登录
app.use("/api", 业务);  // 3. 最后进业务`,
          codeLang: "javascript",
        },
      ],
    },

    // ================= 数据与接口设计 =================
    {
      id: "architecture.data",
      title: "数据与接口设计",
      summary: "表怎么设计、接口怎么定、状态放哪。",
      tags: ["数据建模", "接口设计", "版本", "幂等"],
      what: "这些是最容易「一开始随便定、后来痛不欲生」的地方：数据库表设计不合理后期改起来极痛；接口没版本管理升级会打死老客户端；接口不幂等会让用户重复扣款。",
      children: [
        {
          id: "architecture.data.modeling",
          title: "数据建模（表设计）",
          summary: "想清楚实体、字段、关系再建表。",
          tags: ["数据建模", "表设计", "范式", "字段"],
          what: "建表前先想清楚：有哪些「实体」（用户、订单、商品）、每个实体有哪些「属性」（字段）、实体之间什么关系。字段类型、是否可空、默认值都要定好。改表结构成本很高，尤其在数据多了以后。",
          useWhen: ["设计任何数据库表之前"],
          avoidWhen: ["别一上来就为了「灵活」用一堆 JSON 字段，后期查询和约束都会很痛"],
          examples: ["用户表设计", "订单与订单项的关系设计", "软删除字段"],
          codeLang: "text",
        },
        {
          id: "architecture.data.apidesign",
          title: "接口设计规范",
          summary: "命名、返回格式、错误码要统一。",
          tags: ["接口设计", "api 规范", "返回格式", "错误码"],
          what: "接口要统一：网址用名词复数（/users）、返回格式固定（{ data, error }）、错误用 HTTP 状态码 + 业务错误码、分页参数统一（page/pageSize）。统一了前端才好写，AI 生成也才一致。",
          useWhen: ["设计任何对外接口"],
          examples: ["统一返回 { code, data, message }", "统一分页参数", "统一错误码"],
          code: `// 统一返回格式
{
  "code": 0,
  "data": { "id": 1, "name": "小明" },
  "message": "ok"
}
// 出错
{ "code": 40101, "data": null, "message": "登录已过期" }`,
          codeLang: "json",
        },
        {
          id: "architecture.data.version",
          title: "接口版本管理",
          summary: "接口改了不能把老客户端打死。",
          tags: ["版本", "api version", "兼容", "升级"],
          what: "App 装出去就收不回来，老版本还在用旧接口。所以接口要版本化（/v1/users），改接口时新增字段可以，删改字段要开新版本。",
          useWhen: ["有 App / 第三方调用方的接口"],
          examples: ["/v1/users → /v2/users", "字段只加不删"],
          codeLang: "text",
        },
        {
          id: "architecture.data.idempotent",
          title: "幂等（Idempotency）",
          summary: "同一个请求重复发，结果不能重复生效。",
          tags: ["幂等", "idempotent", "重复提交", "支付"],
          what: "用户网络卡了点了两次「支付」，不能扣两次钱。幂等就是「同一请求执行多次，效果和执行一次一样」。做法：客户端生成唯一请求 ID，服务端记录已处理的 ID。",
          useWhen: ["支付、下单、创建资源等会产生副作用的接口"],
          examples: ["防止重复支付", "防止重复下单", "防止重复发券"],
          code: `// 幂等：用唯一请求 ID 去重
if (已处理过(请求ID)) return 上次的结果;
执行();
记录已处理(请求ID);`,
          codeLang: "text",
        },
      ],
    },
  ],
};
