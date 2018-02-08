import {ChangeDetectorRef, OnDestroy, OnInit} from "@angular/core";
import {autorun, IReactionDisposer, whyRun} from "mobx";
import {ENV} from "@environment";

export abstract class BasePageComponent implements OnInit, OnDestroy {

  private _mobx_unsubs: IReactionDisposer[];

  constructor(protected changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.startObserve(() => {
      this.observe();
      if (ENV.DEBUG_MOBX) {
        whyRun();
      }
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.stopObserve();
  }

  private startObserve(expression: () => void) {
    const disposer = autorun('[OBSERVE] ' + this.constructor.name, expression);
    if (!this._mobx_unsubs) {
      this._mobx_unsubs = [disposer];
    } else {
      this._mobx_unsubs.push(disposer);
    }
  }

  private stopObserve() {
    if (this._mobx_unsubs) {
      this._mobx_unsubs.forEach(disposer => disposer());
    }
  }

  protected abstract observe();
}
