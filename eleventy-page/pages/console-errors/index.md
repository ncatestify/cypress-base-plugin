---
layout: base-layout.njk
title: Console Errors
---

<h1>Console Errors Seite</h1>
<p>Diese Seite erzeugt absichtlich Fehler in allen Kategorien, um die Fehlererkennung zu testen.</p>

<script src="/does-not-exist.js"></script>

<script>
  console.error('Error Seite: console.error');
</script>

<script>
  throw new Error('Error Seite: runtime error');
</script>

<script>
  setTimeout(function () {
    throw new Error('Error Seite: delayed error');
  }, 200);
</script>

<script>
  Promise.reject('Error Seite: unhandled rejection');
</script>
