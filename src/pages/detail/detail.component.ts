import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SettlementStore} from "../../app/core/stores/settlement.store";
import {newSettlement, Settlement} from "../../app/core/model/settlement.model";

@Component({
  templateUrl: 'detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailPage implements OnInit {

  settlement: Settlement;

  constructor(public navCtrl: NavController,
              public store: SettlementStore) {}

  ngOnInit(): void {
    this.settlement = this.store.selectedSettlement ? this.store.selectedSettlement : newSettlement();
  }

  saveSettlement() {
    this.store.saveSettlement(this.settlement);
    this.navCtrl.pop();
  }
}
