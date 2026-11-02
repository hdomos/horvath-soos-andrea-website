/* Horváth-Soós Andrea – site behaviour: mobile menu, filters, forms. */
(function () {
  'use strict';

  /* ---------- Mobile menu ---------- */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  if (header && toggle) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('is-open')) {
        header.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---------- Category filters (Blog, Rólam → tanúsítványok) ----------
     <div class="js-filter" data-target=".cert" data-limit="9" data-more="#cert-more">
       <button data-filter="Összes" aria-pressed="true">…</button> …
     Items carry data-cat. The first button shows everything. */
  Array.prototype.forEach.call(document.querySelectorAll('.js-filter'), function (group) {
    var buttons = Array.prototype.slice.call(group.querySelectorAll('button[data-filter]'));
    var items = Array.prototype.slice.call(document.querySelectorAll(group.getAttribute('data-target')));
    var limit = parseInt(group.getAttribute('data-limit') || '0', 10);
    var more = group.getAttribute('data-more') ? document.querySelector(group.getAttribute('data-more')) : null;
    var allLabel = buttons.length ? buttons[0].getAttribute('data-filter') : '';
    var onBtn = buttons.filter(function (b) { return b.getAttribute('aria-pressed') === 'true'; })[0];
    var offBtn = buttons.filter(function (b) { return b.getAttribute('aria-pressed') !== 'true'; })[0];
    var onStyle = onBtn ? onBtn.getAttribute('style') : '';
    var offStyle = offBtn ? offBtn.getAttribute('style') : '';
    var state = { cat: allLabel, all: false };

    function apply() {
      var matching = items.filter(function (it) {
        return state.cat === allLabel || it.getAttribute('data-cat') === state.cat;
      });
      items.forEach(function (it) { it.classList.add('is-hidden'); });
      matching.forEach(function (it, i) {
        if (!limit || state.all || i < limit) it.classList.remove('is-hidden');
      });
      buttons.forEach(function (b) {
        var pressed = b.getAttribute('data-filter') === state.cat;
        b.setAttribute('aria-pressed', String(pressed));
        b.setAttribute('style', pressed ? onStyle : offStyle);
      });
      if (more) {
        var wrap = more.parentElement;
        var hasMore = limit && matching.length > limit;
        wrap.classList.toggle('is-hidden', !hasMore);
        more.textContent = state.all ? 'Kevesebb megjelenítése' : 'Mind a ' + matching.length + ' megjelenítése';
        more.setAttribute('aria-expanded', String(!!state.all));
      }
    }

    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        state.cat = b.getAttribute('data-filter');
        state.all = false;
        apply();
      });
    });
    if (more) {
      more.addEventListener('click', function () {
        state.all = !state.all;
        apply();
      });
    }
    apply();
  });

  /* ---------- Forms ----------
     GitHub Pages has no server, so by default a form opens the visitor's mail
     program with the message pre-filled. To receive submissions directly instead,
     put a form-service URL (e.g. Formspree) into data-endpoint on the <form>. */
  var TO = 'soos.andrea.ev@gmail.com';

  function collect(form) {
    var lines = [];
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name || el.type === 'submit' || el.type === 'button') return;
      if ((el.type === 'radio' || el.type === 'checkbox') && !el.checked) return;
      if (!el.value) return;
      lines.push(el.name + ': ' + el.value);
    });
    return lines;
  }

  Array.prototype.forEach.call(document.querySelectorAll('form.js-mail-form'), function (form) {
    var status = form.querySelector('.form-status');
    var endpoint = form.getAttribute('data-endpoint');
    var subject = form.getAttribute('data-subject') || 'Üzenet a honlapról';

    function say(msg) { if (status) status.textContent = msg; }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var lines = collect(form);

      if (endpoint) {
        var data = new FormData(form);
        data.append('_subject', subject);
        say('Küldés…');
        fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (r) {
            if (!r.ok) throw new Error(r.status);
            form.reset();
            say('Köszönöm, megkaptam az üzeneted! Hamarosan jelentkezem.');
          })
          .catch(function () {
            say('Nem sikerült elküldeni. Kérlek, írj közvetlenül a ' + TO + ' címre.');
          });
        return;
      }

      window.location.href = 'mailto:' + TO +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));
      say('Megnyílt a levelezőprogramod a kitöltött üzenettel — csak a küldés gombot kell megnyomnod. Ha nem nyílt meg, írj a ' + TO + ' címre.');
    });
  });
})();
