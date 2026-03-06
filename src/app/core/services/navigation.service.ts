import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private historyStack: string[] = [];

  push(route: string) {

    const last = this.historyStack[this.historyStack.length - 1];

    if (last !== route) {
      this.historyStack.push(route);
    }

  }

  pop(): string | null {
    this.historyStack.pop();
    return this.historyStack[this.historyStack.length - 1] || null;
  }

  getPrevious(): string | null {
    if (this.historyStack.length > 1) {
      return this.historyStack[this.historyStack.length - 2];
    }
    return null;
  }

  clear() {
    this.historyStack = [];
  }
}
