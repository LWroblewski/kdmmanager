import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SettlementStore} from "../../../app/core/stores/settlement.store";
import {newSettlement, Settlement} from "../../../app/core/model/settlement.model";

@Component({
  templateUrl: 'population.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopulationPage implements OnInit {

  settlement: Settlement;

  constructor(public store: SettlementStore) {}

  ngOnInit(): void {
    this.settlement = this.store.selectedSettlement ? this.store.selectedSettlement : newSettlement();
  }
}
