import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SettlementStore} from "../../../app/core/stores/settlement.store";
import {newSettlement, Settlement} from "../../../app/core/model/settlement.model";

@Component({
  templateUrl: 'timeline.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelinePage implements OnInit {

  settlement: Settlement;

  constructor(public store: SettlementStore) {}

  ngOnInit(): void {
    this.settlement = this.store.selectedSettlement ? this.store.selectedSettlement : newSettlement();
  }
}
