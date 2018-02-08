import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {Loading, LoadingController} from "ionic-angular";
import {UserStore} from "../../app/core/stores/user.store";
import {BasePageComponent} from "../../app/core/components/base-page/base-page.component";
import {User} from "../../app/core/model/user.model";
import {SettlementStore} from "../../app/core/stores/settlement.store";

@Component({
  selector: 'page-users',
  templateUrl: 'users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPage extends BasePageComponent implements OnInit {

  users: User[];
  loader: Loading;

  constructor(public userStore: UserStore,
              public settlementStore: SettlementStore,
              public loadingCtrl: LoadingController,
              protected changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.loader.present();
    this.userStore.loadBestSettlements();
  }

  observe() {
    // if (this.userStore.users) console.log(this.settlementStore.settlements); // Exemple dependency tree
    this.users = this.userStore.users ? [ ...this.userStore.users ] : [];
    this.loader.dismiss();
  }
}
