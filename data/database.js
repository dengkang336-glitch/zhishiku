/* 数据库 大类内容 */
window.KB = window.KB || {};

window.KB.database = {
  id: "database",
  title: "数据库",
  summary: "负责「把数据存起来、存得安全、要的时候能快速查到」。",
  tags: ["数据库", "database", "db", "存储", "mysql", "redis"],
  what: "数据库是应用「存数据」的地方。用户注册的信息、订单、文章、商品……都存进数据库。数据库分两大类：关系型（像表格，存结构化数据）和非关系型（更灵活或更快）。选对数据库、设计好表结构，是后端能不能稳、能不能快的根基。",
  children: [
    // ================= 关系型数据库 =================
    {
      id: "database.relational",
      title: "关系型数据库（SQL）",
      summary: "像 Excel 表格一样存数据，用 SQL 查询。",
      tags: ["关系型", "sql", "mysql", "postgresql", "表格"],
      what: "关系型数据库把数据存成一张张「表」（像 Excel），表之间可以建立「关系」。用 SQL 语言查询。适合数据有明确结构、需要强一致性的场景，是绝大多数业务系统的主力数据库。",
      children: [
        {
          id: "database.relational.mysql",
          title: "MySQL",
          summary: "最流行、资料最多的关系型数据库。",
          tags: ["mysql", "sql", "关系型", "数据库"],
          what: "MySQL 是最流行、最普及的关系型数据库，免费开源、资料极多、招人容易，是中小型项目和创业公司的默认选择。",
          useWhen: ["绝大多数业务系统的默认选择", "中小型项目、创业项目"],
          avoidWhen: ["需要非常复杂的高级功能时 PostgreSQL 更强"],
          examples: ["电商", "博客", "后台系统", "几乎所有常见业务"],
          code: `-- 建一张用户表
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(100)
);

-- 查所有用户
SELECT * FROM users;`,
          codeLang: "sql",
        },
        {
          id: "database.relational.postgresql",
          title: "PostgreSQL",
          summary: "功能最强大的开源关系型数据库。",
          tags: ["postgresql", "postgres", "sql", "开源", "高级功能"],
          what: "PostgreSQL（简称 PG）功能最全、最强大，支持复杂查询、JSON、地理数据等，是追求技术实力和长期扩展的团队首选。",
          useWhen: ["需要高级功能（JSON、全文搜索、地理数据）", "对数据一致性要求高", "想用最「硬核」的开源数据库"],
          examples: ["SaaS 产品", "数据分析", "需要复杂查询的系统", "配合 AI 应用的向量检索（pgvector）"],
          code: `-- PostgreSQL 支持更多高级功能
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT,
  tags JSONB          -- 存 JSON 数据
);`,
          codeLang: "sql",
        },
        {
          id: "database.relational.sqlite",
          title: "SQLite",
          summary: "一个文件就是整个数据库，轻量零配置。",
          tags: ["sqlite", "轻量", "嵌入式", "本地", "零配置"],
          what: "SQLite 把整个数据库装在一个文件里，不需要单独的服务器、零配置，非常适合移动 App、桌面软件、本地小工具、原型。",
          useWhen: ["移动 App / 桌面软件本地存储", "原型、小工具", "单机应用"],
          avoidWhen: ["高并发多人同时写入的服务器场景（SQLite 不适合）"],
          examples: ["手机 App 本地数据", "浏览器/桌面软件", "原型验证", "脚本工具"],
          code: `-- SQLite 不需要服务器，一个文件搞定
-- Python 里直接用
import sqlite3
conn = sqlite3.connect("app.db")  # 一个文件 = 一个数据库
conn.execute("CREATE TABLE users (id INTEGER, name TEXT)")`,
          codeLang: "python",
        },
        {
          id: "database.relational.sqlserver",
          title: "SQL Server",
          summary: "微软的关系型数据库，Windows 企业生态。",
          tags: ["sql server", "mssql", "微软", "企业"],
          what: "SQL Server 是微软的关系型数据库，和 Windows、.NET 生态结合紧密，在企业（尤其传统企业）里很常见。",
          useWhen: ["Windows / .NET 企业环境"],
          examples: ["传统企业系统", ".NET 项目"],
          codeLang: "sql",
        },
      ],
    },

    // ================= 非关系型数据库 =================
    {
      id: "database.nosql",
      title: "非关系型数据库（NoSQL）",
      summary: "不用表格、更灵活的存储方式。",
      tags: ["nosql", "mongodb", "redis", "非关系型", "文档"],
      what: "NoSQL 不按「表格」存数据，而是用更灵活或更快的方式。常见类型：文档型（MongoDB，存 JSON 一样的文档）、键值型（Redis，极快的内存存储）、搜索引擎（Elasticsearch）。适合结构多变、或需要极致速度的场景。",
      children: [
        {
          id: "database.nosql.mongodb",
          title: "MongoDB",
          summary: "文档型数据库，存 JSON 一样的结构，灵活。",
          tags: ["mongodb", "文档", "json", "nosql"],
          what: "MongoDB 存「文档」（类似 JSON 的对象），结构灵活、改字段不用改表结构，适合快速迭代、数据结构多变的项目。",
          useWhen: ["数据结构多变、快速迭代", "存文档/JSON 类型数据", "配合 Node.js 生态常见"],
          avoidWhen: ["数据之间有强关联、需要复杂事务时，关系型更稳"],
          examples: ["内容管理", "用户资料", "日志", "快速原型"],
          code: `// MongoDB 存的是「文档」（像 JSON）
db.users.insertOne({
  name: "小明",
  email: "xiaoming@example.com",
  tags: ["前端", "设计"]     // 字段可以很灵活
});`,
          codeLang: "javascript",
        },
        {
          id: "database.nosql.redis",
          title: "Redis",
          summary: "内存数据库，极快，常用来做缓存。",
          tags: ["redis", "缓存", "内存", "键值", "快速"],
          what: "Redis 把数据放在内存里（比硬盘快几个数量级），做缓存、存临时数据、实现排行榜等。数据主要在内存，所以快，但通常不是唯一的数据存储。",
          useWhen: ["缓存（加速热点数据）", "存验证码、登录态等临时数据", "排行榜、计数、限流"],
          avoidWhen: ["不要只靠 Redis 存重要数据（内存数据可能丢），要配合持久化"],
          examples: ["缓存", "排行榜", "验证码", "限流", "分布式锁"],
          code: `# Redis 键值操作
SET name "小明"          # 存
GET name                  # 取 → "小明"
EXPIRE name 60            # 60 秒后过期`,
          codeLang: "bash",
        },
        {
          id: "database.nosql.elasticsearch",
          title: "Elasticsearch",
          summary: "搜索引擎数据库，全文搜索、模糊匹配。",
          tags: ["elasticsearch", "搜索", "全文搜索", "es"],
          what: "Elasticsearch 专门做搜索：能对大量文本做全文搜索、模糊匹配、分词，搜索速度快。也常用于日志分析。",
          useWhen: ["站内搜索、商品搜索", "日志分析、监控", "需要全文搜索的场景"],
          avoidWhen: ["普通精确查询用普通数据库就行，ES 是重型组件"],
          examples: ["电商商品搜索", "站内全文搜索", "日志平台（ELK）", "模糊搜索"],
          codeLang: "json",
        },
      ],
    },

    // ================= 核心概念 =================
    {
      id: "database.concepts",
      title: "核心概念",
      summary: "用数据库必须懂的通用知识。",
      tags: ["sql", "索引", "事务", "表", "主键"],
      what: "不管用哪个数据库，都要理解几个核心概念：怎么查数据（SQL）、数据怎么组织（表/字段/主键）、表之间怎么关联（关系）、怎么加速查询（索引）、怎么保证操作要么全成要么全不成（事务）、怎么防丢（备份）。",
      children: [
        {
          id: "database.concepts.sql",
          title: "SQL 语言",
          summary: "操作数据库的标准语言。",
          tags: ["sql", "查询", "增删改查", "select"],
          what: "SQL 是操作关系型数据库的标准语言。核心就四件事：增（INSERT）、删（DELETE）、改（UPDATE）、查（SELECT）。其中「查」最常用也最复杂。",
          useWhen: ["操作关系型数据库必备"],
          examples: ["查询数据", "插入记录", "更新记录", "删除记录"],
          code: `-- 增删改查（CRUD）
INSERT INTO users (name, email) VALUES ('小明', 'a@b.com');  -- 增
SELECT * FROM users WHERE age > 18;                          -- 查
UPDATE users SET age = 21 WHERE id = 1;                      -- 改
DELETE FROM users WHERE id = 1;                              -- 删`,
          codeLang: "sql",
        },
        {
          id: "database.concepts.schema",
          title: "表 / 字段 / 主键",
          summary: "数据怎么组织：一张表、几列字段、唯一标识。",
          tags: ["表", "字段", "主键", "列", "schema", "外键"],
          what: "数据存在「表」里，表由「字段（列）」组成。每张表要有一个「主键」唯一标识每一条记录（就像身份证号）。「外键」用来引用另一张表的记录。",
          useWhen: ["设计任何数据库表都要先想清楚字段和主键"],
          examples: ["users 表有 id/name/email 字段", "id 是主键", "订单表的 user_id 是外键指向用户表"],
          code: `CREATE TABLE orders (
  id INT PRIMARY KEY,          -- 主键：唯一标识
  user_id INT,                 -- 外键：指向 users 表
  amount DECIMAL(10,2),        -- 字段：金额
  created_at DATETIME          -- 字段：创建时间
);`,
          codeLang: "sql",
        },
        {
          id: "database.concepts.relation",
          title: "数据关系（关联）",
          summary: "表与表之间怎么关联。",
          tags: ["关系", "关联", "一对多", "多对多", "外键", "join"],
          what: "现实数据是有联系的，比如「一个用户有多个订单」。数据库用三种关系表达：一对一、一对多、多对多。查询时用 JOIN 把多张表连起来查。",
          useWhen: ["设计表结构时要理清实体之间的关系"],
          examples: [
            "一对多：一个用户 → 多个订单（最常见）",
            "多对多：一个学生 → 多门课（需要中间表）",
            "一对一：一个用户 → 一份资料",
          ],
          code: `-- 一对多：查「小明」的所有订单（JOIN 连表）
SELECT orders.*
FROM users
JOIN orders ON users.id = orders.user_id
WHERE users.name = '小明';`,
          codeLang: "sql",
        },
        {
          id: "database.concepts.index",
          title: "索引（Index）",
          summary: "给字段建「目录」，让查询变快。",
          tags: ["索引", "index", "加速", "查询优化", "性能"],
          what: "索引像书的目录：没有目录要一页页翻（全表扫描），有了目录直接定位。给常查询的字段建索引，查询速度能提升成百上千倍。",
          useWhen: ["给经常用于查询/筛选/排序的字段建索引", "主键自动有索引"],
          avoidWhen: ["索引不是越多越好——会拖慢写入、占空间", "很少查询的字段别建"],
          examples: ["给 email 建索引加速登录查询", "给 created_at 建索引加速按时间排序"],
          code: `-- 给 email 字段建索引（加速按邮箱查用户）
CREATE INDEX idx_users_email ON users(email);`,
          codeLang: "sql",
        },
        {
          id: "database.concepts.transaction",
          title: "事务（Transaction）",
          summary: "一组操作要么全成功、要么全回滚。",
          tags: ["事务", "transaction", "回滚", "一致性", "原子性"],
          what: "事务保证一组操作「要么全部成功，要么全部撤销（回滚）」。比如转账：扣 A 的钱 + 加 B 的钱，必须一起成功，绝不能只扣了 A 没加给 B。",
          useWhen: ["涉及多个步骤、必须一起成功或一起失败的操作", "转账、下单（扣库存 + 生成订单）"],
          avoidWhen: ["简单单条操作不需要事务"],
          examples: ["转账", "下单（扣库存 + 生成订单 + 扣款）", "批量更新"],
          code: `-- 转账：扣钱 + 加钱，必须一起成功
BEGIN;                                  -- 开始事务
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;                                 -- 全部成功才提交
-- 中途出错就 ROLLBACK 全部撤销`,
          codeLang: "sql",
        },
        {
          id: "database.concepts.backup",
          title: "备份与恢复",
          summary: "定期备份数据，出事了能找回。",
          tags: ["备份", "backup", "恢复", "数据安全", "容灾"],
          what: "数据库是应用最宝贵的东西，必须定期备份。备份就是把数据复制一份存起来，出问题（误删、服务器故障、被攻击）时能恢复。",
          useWhen: ["任何正式上线的系统都必须有备份策略"],
          avoidWhen: ["不要等出事了才想起备份；备份要定期验证能恢复"],
          examples: ["每日自动备份", "主从复制（实时同步到另一台）", "异地备份", "恢复演练"],
          code: `# MySQL 备份一条命令
mysqldump -u root -p 数据库名 > backup.sql
# 恢复
mysql -u root -p 数据库名 < backup.sql`,
          codeLang: "bash",
        },
      ],
    },
  ],
};
