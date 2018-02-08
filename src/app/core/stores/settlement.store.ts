import {Injectable} from "@angular/core";
import {action, autorun, computed, observable, useStrict} from "mobx";
import {Settlement} from "../model/settlement.model";
import {Storage} from "@ionic/storage";

useStrict(true);

const SETTLEMENTS_KEY = 'settlements';

@Injectable()
export class SettlementStore {

  @observable.ref settlements: Settlement[];

  @observable selectedIndex: number = NaN;

  @computed get selectedSettlement(): Settlement {
    return !isNaN(this.selectedIndex) ? { ...this.settlements[this.selectedIndex] } : null;
  }

  constructor(private storage: Storage) {
    this.storage.get(SETTLEMENTS_KEY)
      .then(settlements => this.onSettlementsLoaded(settlements));

    autorun(() => storage.set(SETTLEMENTS_KEY, JSON.stringify(this.settlements)));
  }

  @action('[SETTLEMENT] LOAD')
  private onSettlementsLoaded(strSettlements: string) {
    this.settlements = strSettlements ? JSON.parse(strSettlements) : [];
  }

  @action('[SETTLEMENT] SELECT')
  public selectEditSettlement(index: number) {
    this.selectedIndex = index;
  }

  @action('[SETTLEMENT] ADD')
  public addSettlement(settlement: Settlement) {
    this.settlements = [
      settlement,
      ...this.settlements
    ];
  }

  @action('[SETTLEMENT] DELETE')
  public deleteSettlement(index: number) {
    const settlement: Settlement = this.settlements[index];
    this.settlements = this.settlements.filter(item => item !== settlement);
  }

  public saveSettlement(settlement: Settlement) {
    if (!isNaN(this.selectedIndex)) {
      this.deleteSettlement(this.selectedIndex);
    }
    this.addSettlement(settlement);
  }
}


