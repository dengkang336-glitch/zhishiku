/* 技术知识库 - 前端逻辑 */
(function () {
  "use strict";

  const registry = (window.KB = window.KB || {});

  // ---------- 数据收集 ----------
  // 把 window.KB 里的每个大类，整理成带层级路径的扁平索引
  const flatNodes = [];   // { node, path[], categories[] }
  const byId = new Map();

  function walk(node, parentPath, categories) {
    const path = parentPath.concat(node.title);
    const cats = categories.concat(node.title);
    flatNodes.push({ node, path, categories: cats });
    if (node.id) byId.set(node.id, node);
    if (node.children) {
      node.children.forEach((c) => walk(c, path, cats));
    }
  }

  function buildIndex() {
    flatNodes.length = 0;
    byId.clear();
    Object.keys(registry).forEach((key) => walk(registry[key], [], []));
  }

  // ---------- DOM refs ----------
  const treeEl = document.getElementById("tree");
  const contentEl = document.getElementById("content");
  const searchInput = document.getElementById("search");
  const searchResults = document.getElementById("search-results");
  const brandEl = document.getElementById("brand");
  const menuBtn = document.getElementById("menu-btn");
  const navScrim = document.getElementById("nav-scrim");
  const pathsBtn = document.getElementById("paths-btn");

  if (pathsBtn) {
    pathsBtn.addEventListener("click", () => {
      setNav(false);
      location.hash = "#/paths";
      searchResults.hidden = true;
    });
  }

  // 窄屏：侧边目录变成抽屉
  function setNav(open) {
    document.body.classList.toggle("nav-open", open);
    if (menuBtn) menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      setNav(!document.body.classList.contains("nav-open"));
    });
  }
  if (navScrim) navScrim.addEventListener("click", () => setNav(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setNav(false);
  });

  if (brandEl) {
    brandEl.addEventListener("click", () => {
      if (location.hash) location.hash = "";
      else handleRoute();
      searchResults.hidden = true;
    });
  }

  // ---------- DOM 工具（安全：一律用 textContent，杜绝 innerHTML/XSS） ----------
  function h(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  // ---------- 目录树 ----------
  let expanded = new Set();
  let currentId = null;

  function buildTree() {
    treeEl.innerHTML = "";
    treeEl.textContent = "";
    const root = document.createElement("ul");
    Object.keys(registry).forEach((key) => root.appendChild(renderTreeNode(registry[key], 0)));
    treeEl.appendChild(root);
    const active = treeEl.querySelector(".tree-node.active");
    if (active) active.scrollIntoView({ block: "nearest" });
  }

  function renderTreeNode(node, depth) {
    const li = document.createElement("li");
    const hasChildren = node.children && node.children.length > 0;

    const btn = h("button", "tree-node" + (depth === 0 ? " cat" : ""));
    btn.dataset.id = node.id || "";

    const twisty = h("span", "twisty" + (hasChildren ? "" : " leaf") + (expanded.has(node.id) ? " open" : ""), "▶");
    btn.appendChild(twisty);
    btn.appendChild(h("span", "t-label", node.title));

    if (hasChildren) btn.appendChild(h("span", "t-count", String(node.children.length)));
    if (node.id === currentId) btn.classList.add("active");

    btn.addEventListener("click", () => {
      if (hasChildren) toggle(node.id);
      select(node);
    });
    li.appendChild(btn);

    if (hasChildren && expanded.has(node.id)) {
      const ul = document.createElement("ul");
      node.children.forEach((c) => ul.appendChild(renderTreeNode(c, depth + 1)));
      li.appendChild(ul);
    }
    return li;
  }

  function toggle(id) {
    if (expanded.has(id)) expanded.delete(id);
    else expanded.add(id);
    buildTree();
  }

  // ---------- 内容渲染 ----------
  function select(node) {
    if (!node) return;
    setNav(false);
    currentId = node.id;
    buildTree();
    renderContent(node);
    location.hash = "#/" + node.id.split(".").join("/");
    searchResults.hidden = true;
    searchInput.value = "";
  }

  // ---------- 首页 ----------
  function countLeaves(node) {
    const kids = node.children || [];
    if (!kids.length) return 1;
    return kids.reduce((sum, k) => sum + countLeaves(k), 0);
  }

  function renderHome() {
    currentId = null;
    contentEl.textContent = "";
    const frag = document.createDocumentFragment();

    const header = h("div", "article-header");
    header.appendChild(h("h1", null, "开发技术知识库"));
    const catKeys = Object.keys(registry);
    const totalLeaves = catKeys.reduce((s, k) => s + countLeaves(registry[k]), 0);
    header.appendChild(
      h(
        "p",
        "lead",
        catKeys.length + " 个大类、" + totalLeaves + " 条知识点。每条都写清：是什么、什么时候用、什么时候别用、常见场景。前端组件还配了能直接点的运行效果。"
      )
    );
    frag.appendChild(header);

    const how = h("div", "section");
    how.appendChild(h("h2", null, null)).appendChild(h("span", "badge what", "怎么用"));
    const howList = h("ul", "use-list");
    howList.appendChild(h("li", null, "左边目录点开大类，一层层往下钻；每篇底部都有子分类卡片。"));
    howList.appendChild(h("li", null, "上面的搜索框直接搜：组件名（按钮）、技术名（Redis）、场景（什么时候用缓存）。"));
    howList.appendChild(h("li", null, "不知道先学什么：进顶部「学习路径」，按顺序走，每步可以打勾记进度。"));
    howList.appendChild(h("li", null, "网址会跟着变（#/backend/framework/express），可以收藏或发给别人。"));
    how.appendChild(howList);
    frag.appendChild(how);

    renderHomePaths(frag);

    const sec = h("div", "section");
    sec.appendChild(h("h2", null, null)).appendChild(h("span", "badge example", "全部大类"));
    const grid = h("div", "child-grid home-grid");
    catKeys.forEach((key) => {
      const cat = registry[key];
      const card = h("div", "child-card home-card");
      const top = h("div", "hc-top");
      top.appendChild(h("div", "cc-title", cat.title));
      top.appendChild(h("span", "hc-count", String(countLeaves(cat))));
      card.appendChild(top);
      if (cat.summary) card.appendChild(h("div", "cc-summary", cat.summary));
      card.addEventListener("click", () => gotoId(cat.id));
      grid.appendChild(card);
    });
    sec.appendChild(grid);
    frag.appendChild(sec);

    contentEl.appendChild(frag);
    window.scrollTo(0, 0);
  }

  function renderContent(node) {
    const entry = flatNodes.find((f) => f.node.id === node.id);
    const categories = entry ? entry.categories : [node.title];

    contentEl.textContent = "";
    const frag = document.createDocumentFragment();

    // 面包屑（大类根节点只有一个层级，不重复显示标题）
    if (categories.length > 1) {
      const crumb = h("div", "breadcrumb");
      categories.forEach((seg, i) => {
        if (i === categories.length - 1) {
          crumb.appendChild(h("span", "here", seg));
        } else {
          const anc = findAncestorId(node, i);
          const a = h("a", null, seg);
          a.dataset.goto = anc;
          a.addEventListener("click", () => gotoId(anc));
          crumb.appendChild(a);
          crumb.appendChild(h("span", "sep", "/"));
        }
      });
      frag.appendChild(crumb);
    }

    // 文章头
    const header = h("div", "article-header");
    header.appendChild(h("h1", null, node.title));
    if (node.summary) header.appendChild(h("p", "lead", node.summary));
    if (node.tags && node.tags.length) {
      const tags = h("div", "tags");
      node.tags.forEach((t) => tags.appendChild(h("span", "tag", t)));
      header.appendChild(tags);
    }
    frag.appendChild(header);

    // 是什么
    if (node.what) {
      const s = h("div", "section");
      s.appendChild(h("h2", null, null)).appendChild(h("span", "badge what", "是什么"));
      s.appendChild(h("p", null, node.what));
      frag.appendChild(s);
    }

    // 什么时候用
    if (node.useWhen && node.useWhen.length) {
      const s = h("div", "section");
      s.appendChild(h("h2", null, null)).appendChild(h("span", "badge use", "什么时候用"));
      const ul = h("ul", "use-list");
      node.useWhen.forEach((t) => ul.appendChild(h("li", null, t)));
      s.appendChild(ul);
      frag.appendChild(s);
    }

    // 什么时候别用 / 注意
    if (node.avoidWhen && node.avoidWhen.length) {
      const s = h("div", "section");
      s.appendChild(h("h2", null, null)).appendChild(h("span", "badge avoid", "什么时候别用 / 注意"));
      const ul = h("ul", "avoid-list");
      node.avoidWhen.forEach((t) => ul.appendChild(h("li", null, t)));
      s.appendChild(ul);
      frag.appendChild(s);
    }

    // 常见踩坑（数据在 data/pitfalls.js，按 id 挂上来）
    const pitfalls = (window.KB_PITFALLS || {})[node.id];
    if (pitfalls && pitfalls.length) {
      const s = h("div", "section");
      s.appendChild(h("h2", null, null)).appendChild(h("span", "badge pitfall", "常见踩坑"));
      const ul = h("ul", "pitfall-list");
      pitfalls.forEach((t) => ul.appendChild(h("li", null, t)));
      s.appendChild(ul);
      frag.appendChild(s);
    }

    // 常见使用场景
    if (node.examples && node.examples.length) {
      const s = h("div", "section");
      s.appendChild(h("h2", null, null)).appendChild(h("span", "badge example", "常见使用场景"));
      const ul = h("ul", "example-list");
      node.examples.forEach((t) => ul.appendChild(h("li", null, t)));
      s.appendChild(ul);
      frag.appendChild(s);
    }

    // 运行效果（真实示例，可交互）
    if (node.demo) {
      const s = h("div", "section");
      s.appendChild(h("h2", null, null)).appendChild(h("span", "badge code", "运行效果（可交互）"));
      const frame = document.createElement("iframe");
      frame.className = "demo-frame";
      frame.setAttribute("sandbox", "allow-scripts allow-modals");
      frame.srcdoc = node.demo;
      s.appendChild(frame);
      frag.appendChild(s);
    }

    // 代码示例
    if (node.code) {
      const s = h("div", "section");
      s.appendChild(h("h2", null, null)).appendChild(h("span", "badge code", "长什么样（最小示例）"));
      const box = h("div", "code-block");
      box.appendChild(h("span", "lang", node.codeLang || "text"));
      const pre = h("pre");
      pre.appendChild(h("code", null, node.code));
      box.appendChild(pre);
      s.appendChild(box);
      frag.appendChild(s);
    }

    // 子节点网格
    if (node.children && node.children.length) {
      const s = h("div", "section");
      s.appendChild(h("h2", null, null)).appendChild(h("span", "badge what", "这一层包含"));
      const grid = h("div", "child-grid");
      node.children.forEach((c) => {
        const card = h("a", "child-card");
        card.dataset.goto = c.id;
        card.appendChild(h("div", "cc-title", c.title));
        if (c.summary) card.appendChild(h("div", "cc-summary", c.summary));
        card.addEventListener("click", () => gotoId(c.id));
        grid.appendChild(card);
      });
      s.appendChild(grid);
      frag.appendChild(s);
    }

    contentEl.appendChild(frag);
    contentEl.scrollTop = 0;
  }

  function gotoId(id) {
    const n = byId.get(id);
    if (n) {
      ensurePathExpanded(id);
      select(n);
    }
  }

  // 找到当前节点在第 i 层（从 0 开始）的祖先节点 id
  function findAncestorId(node, depth) {
    const entry = flatNodes.find((f) => f.node.id === node.id);
    if (!entry) return node.id;
    let current = null;
    for (const key of Object.keys(registry)) {
      current = registry[key];
      if (current.title === entry.categories[0]) break;
    }
    for (let i = 1; i <= depth; i++) {
      const seg = entry.categories[i];
      current = current && current.children ? current.children.find((c) => c.title === seg) : null;
    }
    return current ? current.id : node.id;
  }

  function ensurePathExpanded(id) {
    const entry = flatNodes.find((f) => f.node.id === id);
    if (!entry) return;
    for (const key of Object.keys(registry)) {
      const cat = registry[key];
      if (cat.title !== entry.categories[0]) continue;
      let cur = cat;
      expanded.add(cat.id);
      for (let i = 1; i < entry.categories.length - 1; i++) {
        const seg = entry.categories[i];
        cur = cur.children.find((c) => c.title === seg);
        if (cur) expanded.add(cur.id);
      }
    }
  }

  // ---------- 搜索 ----------
  function search(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      searchResults.hidden = true;
      searchResults.textContent = "";
      return;
    }

    const scored = [];
    flatNodes.forEach(({ node }) => {
      const title = node.title.toLowerCase();
      const summary = (node.summary || "").toLowerCase();
      const what = (node.what || "").toLowerCase();
      const tags = (node.tags || []).join(" ").toLowerCase();
      const ex = (node.examples || []).join(" ").toLowerCase();

      let score = 0;
      if (title === q) score += 100;
      else if (title.startsWith(q)) score += 60;
      else if (title.includes(q)) score += 40;
      if (summary.includes(q)) score += 10;
      if (what.includes(q)) score += 8;
      if (tags.includes(q)) score += 6;
      if (ex.includes(q)) score += 4;
      if (score > 0) scored.push({ node, score });
    });

    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, 30);

    searchResults.textContent = "";
    if (top.length === 0) {
      searchResults.appendChild(h("div", "search-empty", "没有找到「" + query + "」相关的内容"));
    } else {
      top.forEach((r) => {
        const item = h("div", "search-item");
        item.dataset.goto = r.node.id;

        const title = h("div", "si-title");
        appendHighlighted(title, r.node.title, q);
        item.appendChild(title);

        const pathStr = findPathStr(r.node);
        if (pathStr) item.appendChild(h("div", "si-path", pathStr));
        if (r.node.summary) item.appendChild(h("div", "si-summary", r.node.summary));

        item.addEventListener("click", () => gotoId(r.node.id));
        item.addEventListener("mousemove", () => {
          searchResults.querySelectorAll(".search-item").forEach((x) => x.classList.remove("active"));
          item.classList.add("active");
        });
        searchResults.appendChild(item);
      });
    }
    searchResults.hidden = false;
  }

  function findPathStr(node) {
    const entry = flatNodes.find((f) => f.node.id === node.id);
    if (!entry) return "";
    return entry.categories.slice(0, -1).join(" / ");
  }

  function appendHighlighted(parent, text, q) {
    const t = String(text);
    const ql = q.trim().toLowerCase();
    const i = ql ? t.toLowerCase().indexOf(ql) : -1;
    if (i < 0) {
      parent.textContent = t;
      return;
    }
    parent.appendChild(document.createTextNode(t.slice(0, i)));
    parent.appendChild(h("span", "hl", t.slice(i, i + ql.length)));
    parent.appendChild(document.createTextNode(t.slice(i + ql.length)));
  }

  searchInput.addEventListener("input", () => search(searchInput.value));
  searchInput.addEventListener("focus", () => {
    if (searchInput.value.trim()) search(searchInput.value);
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-box")) searchResults.hidden = true;
  });
  searchInput.addEventListener("keydown", (e) => {
    const items = searchResults.querySelectorAll(".search-item");
    if (!items.length) return;
    let idx = -1;
    items.forEach((it, i) => {
      if (it.classList.contains("active")) idx = i;
    });
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSearch(items, Math.min(idx + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSearch(items, Math.max(idx - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = idx >= 0 ? items[idx] : items[0];
      gotoId(target.dataset.goto);
    }
  });

  function setActiveSearch(items, idx) {
    items.forEach((it, i) => it.classList.toggle("active", i === idx));
    if (items[idx]) items[idx].scrollIntoView({ block: "nearest" });
  }

  // ---------- 学习路径 ----------
  const PROGRESS_KEY = "kb-paths-v1";

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
    } catch {
      return {};
    }
  }

  function saveProgress(p) {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
    } catch {
      /* 隐私模式下存不了，忽略即可 */
    }
  }

  function stepKey(pathId, nodeId) {
    return pathId + "|" + nodeId;
  }

  function countDone(path) {
    const prog = loadProgress();
    return path.steps.filter((s) => prog[stepKey(path.id, s.node)]).length;
  }

  // 路径卡片（首页与路径列表共用）
  function makePathCard(p) {
    const done = countDone(p);
    const total = p.steps.length;
    const card = h("div", "path-card");
    card.appendChild(h("div", "pc-title", p.title));
    card.appendChild(h("div", "pc-summary", p.summary));
    if (p.who) card.appendChild(h("div", "pc-who", p.who));
    const meta = h("div", "pc-meta");
    meta.appendChild(h("span", null, total + " 步"));
    meta.appendChild(h("span", null, done ? "已完成 " + done + "/" + total : "还没开始"));
    card.appendChild(meta);
    const bar = h("div", "path-progress mini");
    const fill = h("div", "fill");
    fill.style.width = (total ? (done / total) * 100 : 0) + "%";
    bar.appendChild(fill);
    card.appendChild(bar);
    card.addEventListener("click", () => {
      location.hash = "#/paths/" + p.id;
    });
    return card;
  }

  function renderHomePaths(frag) {
    const paths = window.KB_PATHS || [];
    if (!paths.length) return;
    const sec = h("div", "section");
    sec.appendChild(h("h2", null, null)).appendChild(
      h("span", "badge example", "不知道从哪开始？走一条线")
    );
    const grid = h("div", "path-grid");
    paths.forEach((p) => grid.appendChild(makePathCard(p)));
    sec.appendChild(grid);
    frag.appendChild(sec);
  }

  function renderPaths() {
    currentId = null;
    contentEl.textContent = "";
    const frag = document.createDocumentFragment();
    const paths = window.KB_PATHS || [];

    const header = h("div", "article-header");
    header.appendChild(h("h1", null, "学习路径"));
    header.appendChild(
      h(
        "p",
        "lead",
        "不知道该先学什么，就照下面某一条线从上往下走。每条路径都是「按顺序的步骤」，点开每步是详细的知识点；走完可以打勾，进度存在你自己浏览器里。"
      )
    );
    frag.appendChild(header);

    const grid = h("div", "path-grid");
    paths.forEach((p) => grid.appendChild(makePathCard(p)));
    frag.appendChild(grid);

    contentEl.appendChild(frag);
    window.scrollTo(0, 0);
  }

  function renderPath(path) {
    currentId = null;
    contentEl.textContent = "";
    const frag = document.createDocumentFragment();

    const crumb = h("div", "breadcrumb");
    const back = h("a", null, "学习路径");
    back.addEventListener("click", () => {
      location.hash = "#/paths";
    });
    crumb.appendChild(back);
    crumb.appendChild(h("span", "sep", "/"));
    crumb.appendChild(h("span", "here", path.title));
    frag.appendChild(crumb);

    const header = h("div", "article-header");
    header.appendChild(h("h1", null, path.title));
    header.appendChild(h("p", "lead", path.summary));
    if (path.who) header.appendChild(h("p", "muted", path.who));
    frag.appendChild(header);

    const total = path.steps.length;
    const barBox = h("div", "path-bar");
    const barText = h("span", "path-bar-text");
    const bar = h("div", "path-progress");
    const fill = h("div", "fill");
    bar.appendChild(fill);
    barBox.appendChild(bar);
    barBox.appendChild(barText);
    frag.appendChild(barBox);

    function refreshBar() {
      const done = countDone(path);
      fill.style.width = (total ? (done / total) * 100 : 0) + "%";
      barText.textContent = "完成 " + done + " / " + total + (done === total ? "　全部走完了" : "");
    }
    refreshBar();

    const listEl = h("div", "path-steps");
    const prog = loadProgress();
    path.steps.forEach((step, i) => {
      const node = byId.get(step.node);
      const key = stepKey(path.id, step.node);
      const row = h("div", "step-row");
      if (prog[key]) row.classList.add("done");

      const label = h("label", "step-check");
      const box = document.createElement("input");
      box.type = "checkbox";
      box.checked = !!prog[key];
      box.setAttribute("aria-label", "标记完成：" + (node ? node.title : step.node));
      label.appendChild(box);
      row.appendChild(label);

      row.appendChild(h("div", "step-idx", String(i + 1)));

      const body = h("div", "step-body");
      const title = h("div", "step-title", node ? node.title : step.node);
      title.dataset.goto = step.node;
      title.addEventListener("click", () => gotoId(step.node));
      body.appendChild(title);
      if (step.note) body.appendChild(h("div", "step-note", step.note));
      if (!node) body.appendChild(h("div", "step-note muted", "（这条知识点暂时不存在，可能是 id 写错了）"));
      row.appendChild(body);

      const open = h("button", "step-open", "查看");
      open.type = "button";
      if (!node) open.disabled = true;
      open.addEventListener("click", () => gotoId(step.node));
      row.appendChild(open);

      box.addEventListener("change", () => {
        const p = loadProgress();
        if (box.checked) p[key] = true;
        else delete p[key];
        saveProgress(p);
        row.classList.toggle("done", box.checked);
        refreshBar();
      });

      listEl.appendChild(row);
    });
    frag.appendChild(listEl);

    const foot = h("div", "section");
    const reset = h("button", "ghost-btn", "清空这条路径的进度");
    reset.type = "button";
    reset.addEventListener("click", () => {
      const p = loadProgress();
      path.steps.forEach((s) => delete p[stepKey(path.id, s.node)]);
      saveProgress(p);
      renderPath(path);
    });
    foot.appendChild(reset);
    frag.appendChild(foot);

    contentEl.appendChild(frag);
    window.scrollTo(0, 0);
  }

  // ---------- 路由 ----------
  function handleRoute() {
    const hash = location.hash.replace(/^#\/?/, "").replace(/\/$/, "").split("/").join(".");
    if (!hash) {
      buildTree();
      renderHome();
      return;
    }
    // 学习路径：#/paths 与 #/paths/<id>
    if (hash === "paths") {
      buildTree();
      renderPaths();
      return;
    }
    if (hash.indexOf("paths.") === 0) {
      const pid = hash.slice("paths.".length);
      const path = (window.KB_PATHS || []).find((p) => p.id === pid);
      if (path) {
        buildTree();
        renderPath(path);
      } else {
        buildTree();
        renderNotFound(location.hash.replace(/^#\/?/, ""));
      }
      return;
    }
    const n = byId.get(hash);
    if (n) {
      ensurePathExpanded(hash);
      currentId = hash;
      buildTree();
      renderContent(n);
    } else {
      buildTree();
      renderNotFound(location.hash.replace(/^#\/?/, ""));
    }
  }

  function renderNotFound(hash) {
    currentId = null;
    contentEl.textContent = "";
    const box = h("div", "empty-state");
    box.appendChild(h("h1", null, "没找到这个页面"));
    box.appendChild(h("p", "muted", "地址里的「/" + hash + "」不是已有的知识点。"));
    const back = h("button", "ghost-btn", "回到首页");
    back.addEventListener("click", () => {
      location.hash = "";
    });
    box.appendChild(back);
    contentEl.appendChild(box);
  }
  window.addEventListener("hashchange", handleRoute);

  // ---------- 启动 ----------
  buildIndex();
  buildTree();
  handleRoute();
})();
