(function () {
  "use strict";

  var config = window.SITE_CONFIG || {};
  var links = config.links || {};
  var owner = config.owner || {};

  // 站点文案：从配置注入，避免内容与结构混在一起
  function setText(selector, value) {
    if (!value) return;
    var nodes = document.querySelectorAll(selector);
    for (var i = 0; i < nodes.length; i++) nodes[i].textContent = value;
  }

  setText("[data-owner-alias]", owner.alias);
  setText("[data-owner-tagline]", owner.tagline);
  setText("[data-owner-intro]", owner.intro);
  setText("[data-owner-name]", owner.name);

  // 邮箱：mailto 链接
  if (owner.email) {
    var mailNodes = document.querySelectorAll("[data-owner-email]");
    for (var j = 0; j < mailNodes.length; j++) {
      mailNodes[j].textContent = owner.email;
      mailNodes[j].setAttribute("href", "mailto:" + owner.email);
    }
  }

  // 卡片链接：配置中有 URL 才启用，否则显示「链接待补充」
  var cards = document.querySelectorAll("[data-link-key]");
  for (var k = 0; k < cards.length; k++) {
    var card = cards[k];
    var entry = links[card.getAttribute("data-link-key")];
    var anchor = card.querySelector(".card-link");
    if (!anchor) continue;

    if (entry && entry.url && /^https?:\/\//i.test(entry.url)) {
      anchor.setAttribute("href", entry.url);
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
    } else {
      var pending = document.createElement("span");
      pending.className = "card-link is-pending";
      pending.textContent = anchor.getAttribute("data-pending-text") || "链接待补充";
      anchor.parentNode.replaceChild(pending, anchor);
    }
  }

  // 页脚年份
  var yearNode = document.getElementById("year");
  if (yearNode) yearNode.textContent = String(new Date().getFullYear());
})();
