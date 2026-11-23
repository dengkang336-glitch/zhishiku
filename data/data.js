/* 数据与大数据 大类内容 */
window.KB = window.KB || {};

window.KB.data = {
  id: "data",
  title: "数据与分析",
  summary: "埋点、报表、数据仓库、看数据做决定。",
  tags: ["数据", "分析", "埋点", "数据仓库", "bi"],
  what: "这块分两层：小项目只要「埋点 + 报表」——知道有多少人来、点了什么、在哪走了；数据量大了才需要「数据仓库 + 数据管道」这整套。绝大多数产品停在前一层就够。",
  children: [
    // ================= 埋点与统计 =================
    {
      id: "data.tracking",
      title: "埋点与统计",
      summary: "记录用户做了什么。",
      tags: ["埋点", "统计", "analytics", "事件", "转化"],
      what: "埋点 = 在关键位置记一笔「谁在什么时候做了什么」。比如「用户点了注册按钮」「完成了支付」。没有埋点，所有产品决策都是猜的。做法：定义一个事件名 + 若干属性，统一上报。",
      children: [
        {
          id: "data.tracking.event",
          title: "事件埋点",
          summary: "一个动作一条记录。",
          tags: ["埋点", "事件", "event", "属性"],
          what: "每个要统计的动作定义成一个事件，带属性：`{ 事件: '支付成功', 金额: 99, 商品: '年费' }`。命名统一（动作用动词过去式、属性用 snake_case），否则后期没法分析。",
          useWhen: ["产品上线前想看清用户行为"],
          avoidWhen: ["别把用户隐私数据（手机号、身份证）当属性上报"],
          examples: ["注册成功", "点击购买", "搜索关键词", "视频播放完成"],
          code: `// 统一上报函数
埋点("支付成功", { 金额: 99, 商品: "年费", 渠道: "微信" });`,
          codeLang: "javascript",
        },
        {
          id: "data.tracking.funnel",
          title: "漏斗与转化率",
          summary: "看用户在哪一步走了。",
          tags: ["漏斗", "转化率", "funnel", "流失"],
          what: "把一串步骤连起来看每一步剩多少人：访问 → 注册 → 试用 → 付费。哪一步掉得最多，就修哪一步。这是最实用的一种分析。",
          useWhen: ["有明确的多步流程（注册、下单、订阅）"],
          examples: ["注册漏斗", "下单漏斗", "新手引导漏斗"],
          codeLang: "text",
        },
        {
          id: "data.tracking.tool",
          title: "统计工具选择",
          summary: "自建、GA、还是第三方。",
          tags: ["google analytics", "umami", "plausible", "统计工具"],
          what: "简单流量统计用 Google Analytics（免费但重、有隐私争议）或 Umami / Plausible（轻、可自建）；产品行为分析用 PostHog / Mixpanel；只要看访问量，服务端日志加个简单统计也行。",
          useWhen: ["要给产品加数据统计时"],
          examples: ["官网访问统计", "产品行为分析", "自建轻量统计"],
          codeLang: "text",
        },
      ],
    },

    // ================= 报表与可视化 =================
    {
      id: "data.bi",
      title: "报表与可视化",
      summary: "把数据变成能看懂的表和图。",
      tags: ["报表", "可视化", "bi", "图表", "dashboard"],
      what: "数据躺在数据库里没用，要变成「一眼看懂」的图。做法：把常用指标做成看板，每天自动刷新。注意——图上放太多指标等于没有指标，核心指标控制在 5 个以内。",
      children: [
        {
          id: "data.bi.dashboard",
          title: "数据看板（Dashboard）",
          summary: "核心指标一屏看完。",
          tags: ["看板", "dashboard", "指标", "kpi"],
          what: "一屏放 4-8 个核心数字/趋势图：日活、新增、付费、留存。每天看一眼就知道产品状况。做之前先问「看到这个数字我会做什么动作」，答不上来的指标就别放。",
          useWhen: ["产品有了一定用户量，需要日常监控"],
          avoidWhen: ["别堆几十个图表，没人看"],
          examples: ["运营看板", "增长看板", "营收看板"],
          codeLang: "text",
        },
        {
          id: "data.bi.chart",
          title: "图表库与选型",
          summary: "前端怎么画图。",
          tags: ["图表", "echarts", "chart.js", "recharts", "可视化"],
          what: "前端画图用 ECharts（功能全、中文生态好）、Chart.js（轻、简单）、Recharts（React 项目顺手）；更复杂的定制可视化用 D3。选一个用熟，比换来换去强。",
          useWhen: ["要在页面上展示数据图表"],
          examples: ["折线图看趋势", "柱状图做对比", "饼图看构成（慎用）"],
          code: `// Chart.js 最小例子
new Chart(ctx, {
  type: "line",
  data: { labels: ["周一","周二"], datasets: [{ data: [3, 7] }] },
});`,
          codeLang: "javascript",
        },
        {
          id: "data.bi.chartchoice",
          title: "什么数据用什么图",
          summary: "别用饼图展示十个分类。",
          tags: ["图表选择", "折线", "柱状", "饼图"],
          what: "看趋势用折线图；比大小用柱状图；看构成占比用堆叠柱或饼图（分类别超过 5 个就别用饼图）；看分布用直方图；看相关用散点图。选错图会让结论完全跑偏。",
          useWhen: ["做任何图表之前"],
          examples: ["日活趋势 → 折线", "各渠道收入 → 柱状", "占比 → 堆叠柱"],
          codeLang: "text",
        },
      ],
    },

    // ================= 数据管道与仓库 =================
    {
      id: "data.warehouse",
      title: "数据仓库与管道",
      summary: "数据量大了才需要的整套东西。",
      tags: ["数据仓库", "etl", "数据管道", "数仓"],
      what: "当数据分散在业务库、日志、第三方后台，且要跨源分析时，才需要把数据定期抽到一个专门的库里（数据仓库），在那里做分析不打扰业务库。小项目别上这套，直接查业务库或导出 Excel 就行。",
      children: [
        {
          id: "data.warehouse.etl",
          title: "ETL / 数据管道",
          summary: "把数据从各处搬到一起。",
          tags: ["etl", "数据管道", "抽取", "同步"],
          what: "ETL = 抽取（Extract）→ 转换（Transform）→ 加载（Load）。比如每天凌晨把订单表汇总成「每日营收」写进分析库。工具：轻量用定时脚本 + SQL，重一点用 Airflow / Dagster。",
          useWhen: ["要定期把多个源的数据汇总分析"],
          avoidWhen: ["直接在业务库上跑复杂聚合查询会拖垮线上"],
          examples: ["每日营收汇总", "多源用户数据合并", "日志入仓"],
          codeLang: "text",
        },
        {
          id: "data.warehouse.warehouse",
          title: "数据仓库",
          summary: "专门用来分析的库。",
          tags: ["数据仓库", "clickhouse", "bigquery", "snowflake", "olap"],
          what: "面向分析（OLAP）优化的数据库，能扫几亿行还算得快。常见：ClickHouse（自建、快、便宜）、BigQuery / Snowflake（云托管、按量付费）、DuckDB（单机分析神器）。业务库（OLTP）不适合跑大分析。",
          useWhen: ["数据量到千万行以上、需要复杂聚合分析"],
          examples: ["用户行为分析", "大表关联统计", "日志分析"],
          code: `-- ClickHouse 里扫几亿行做聚合是常见操作
SELECT 日期, count() FROM 事件表 GROUP BY 日期;`,
          codeLang: "sql",
        },
        {
          id: "data.warehouse.lake",
          title: "数据湖 / Lakehouse",
          summary: "原始数据先存下来再说。",
          tags: ["数据湖", "lakehouse", "iceberg", "parquet"],
          what: "数据湖 = 把原始数据（JSON、日志、文件）以低成本存在对象存储里，用的时候再解析。Lakehouse 是「湖 + 表格式（Iceberg/Delta）」，让它也能像表一样查询。适合数据来源杂、先存后用的场景。",
          useWhen: ["原始数据量大、来源杂、不确定以后怎么用"],
          examples: ["原始日志归档", "多源数据集中存储"],
          codeLang: "text",
        },
      ],
    },

    // ================= 数据治理 =================
    {
      id: "data.gov",
      title: "数据治理",
      summary: "别让数据变成一团没名字的垃圾。",
      tags: ["数据治理", "口径", "质量", "血缘"],
      what: "数据用久了必然出问题：同一个「活跃用户」在三个报表里三个算法、某天数据突然掉一半没人知道为什么。治理就是把这些定死：指标怎么算、数据从哪来、坏了谁修。",
      children: [
        {
          id: "data.gov.metric",
          title: "指标口径统一",
          summary: "一个指标只能有一个算法。",
          tags: ["指标", "口径", "定义", "一致性"],
          what: "把核心指标的定义写进文档：什么叫「活跃用户」（今天登录过？还是有操作？）、「收入」含不含退款。所有人用同一份定义，否则开会时数字对不上，讨论全废。",
          useWhen: ["团队开始有人问「这个数字怎么和那个不一样」时"],
          examples: ["活跃用户定义", "收入口径", "留存率算法"],
          codeLang: "text",
        },
        {
          id: "data.gov.quality",
          title: "数据质量监控",
          summary: "数据坏了要第一时间知道。",
          tags: ["数据质量", "监控", "告警", "校验"],
          what: "给关键数据加校验：每天行数在合理区间吗？关键字段有空值吗？金额有负数吗？异常就告警。比等老板发现报表不对要好得多。",
          useWhen: ["有定时数据管道时"],
          examples: ["每日订单数突降告警", "空值率监控", "金额为负校验"],
          codeLang: "text",
        },
        {
          id: "data.gov.lineage",
          title: "数据血缘",
          summary: "这个数字是从哪算出来的。",
          tags: ["数据血缘", "lineage", "追溯"],
          what: "记录「A 表由 B 表和 C 表算出」的关系。当某个报表数字不对，能顺着血缘往回查是哪一步坏了。小团队用文档画个图就够。",
          useWhen: ["数据表多起来、链路变长之后"],
          examples: ["报表 → 汇总表 → 明细表追溯"],
          codeLang: "text",
        },
      ],
    },
  ],
};
