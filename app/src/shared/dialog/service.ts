const globalDivId = 'dialog-app-fixed';

class OverlayService {
  public globalDiv: HTMLElement;
  public constructor() {
    if (!process.browser) {
      return;
    }
    this.globalDiv = document.createElement('div');
    this.globalDiv.id = globalDivId;
    try {
      document.body.appendChild(this.globalDiv);
    } catch (e) {
      console.error(e);
    }
  }
}

export const overlayService = new OverlayService();
