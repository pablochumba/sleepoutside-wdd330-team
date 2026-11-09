export default class Alert {
  constructor(
    path = new URL('../json/alerts.json', import.meta.url).href,
    parent = document.querySelector('main'),
  ) {
    this.path = path;
    this.parent = parent;
  }

  async init() {
    if (!this.parent) return;

    try {
      const response = await fetch(this.path);
      if (!response.ok) return;

      const alerts = await response.json();
      if (!Array.isArray(alerts) || alerts.length === 0) return;

      this.render(alerts);
    } catch {
      // Optional announcements must not prevent visitors from browsing products.
    }
  }

  render(alerts) {
    const section = document.createElement('section');
    section.className = 'alert-list';
    section.setAttribute('aria-label', 'Store announcements');
    section.setAttribute('aria-live', 'polite');

    alerts.forEach((alert) => {
      const message = document.createElement('p');
      message.textContent = alert.message;
      message.style.backgroundColor = alert.background;
      message.style.color = alert.color;
      section.append(message);
    });

    this.parent.prepend(section);
  }
}
