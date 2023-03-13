
// Distributed under the terms of the Modified BSD License.

export function log(content: any): void {
    const el = document.getElementById('output');
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    if (el) {
      el.textContent = el.textContent + '\n' + content;
    }
    console.log(content);
  }