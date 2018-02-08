import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {SettlementStore} from "../../app/core/stores/settlement.store";
import {DetailPage} from "../detail/detail.component";
import {BasePageComponent} from "../../app/core/components/base-page/base-page.component";
import {Settlement} from "../../app/core/model/settlement.model";
import {UserStore} from "../../app/core/stores/user.store";

@Component({
  selector: 'page-list',
  templateUrl: 'list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPage extends BasePageComponent {

  settlements: Array<{title: string, description?: string, icon?: string}>;

  constructor(public navCtrl: NavController,
              public store: SettlementStore,
              public userStore: UserStore,
              private alertCtrl: AlertController,
              protected changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  protected observe() {
    this.settlements = this.store.settlements ? this.store.settlements
      .map(settlement => ({
        title: settlement.name,
        description: this.getSettlementDescription(settlement)
      })) : null;
  }

  private getSettlementDescription(settlement: Settlement): string {
    return 'this is a todo';
  }

  addSettlement() {
    this.gotoDetail();
  }

  onSelectSettlement(selectedIndex: number) {
    this.gotoDetail(selectedIndex);
  }

  private gotoDetail(indexSettlement: number = NaN) {
    this.store.selectEditSettlement(indexSettlement);
    this.navCtrl.push(DetailPage);
  }

  deleteSettlement(index: number) {
    this.alertCtrl.create({
      title: 'Delete this settlement?',
      message: 'Do you really want to delete this settlement?',
      buttons: [
        {
          text: 'Cancel'
        }, {
          text: 'Validate',
          handler: () => this.store.deleteSettlement(index)
        }
      ]
    }).present();
  }
}
