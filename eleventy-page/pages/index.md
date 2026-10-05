---
layout: base-layout.njk
title: Startseite
---

<h1>Willkommen auf der Startseite</h1>
<p>Hier finden Sie Informationen über unser Unternehmen und unseren Blog.</p>
<img src="{{ '' | url }}/../assets/kill-bill-roland-golla.jpg" alt="Kill Bugs Fakebild mit Roland Golla im Kill Bill Look" />

<form>
  <label for="contact-name">Name</label>
  <input type="text" id="contact-name" name="name">
  <label for="contact-topic">Thema</label>
  <select id="contact-topic" name="topic">
    <option value="general">Allgemein</option>
  </select>
  <label for="contact-message">Nachricht</label>
  <textarea id="contact-message" name="message"></textarea>
  <button type="submit">Absenden</button>
</form>
