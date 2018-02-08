import {action, autorun, computed, observable, useStrict} from "mobx";
import {Injectable} from "@angular/core";
import {User} from "../model/user.model";
import {HttpClient} from "@angular/common/http";
import {ENV} from "@environment";
import {of} from "rxjs/observable/of";

import "rxjs/add/operator/catch";
import "rxjs/add/operator/delay";

useStrict(true);

@Injectable()
export class UserStore {

  @observable.ref
  public users: User[];

  @computed
  public get nbUsers(): number {
    return this.users ? this.users.length : 0;
  }

  constructor(private http: HttpClient) {
    autorun(() => this.http.post(ENV.URL_USERS, this.users));
  }

  @action('[USER] LOAD')
  public loadBestSettlements() {
    this.http.get<User[]>(ENV.URL_USERS)
      .catch(() => of([]))
      .delay(2000)
      .subscribe(users => this.onUsersLoaded(users));
  }

  @action('[USER] LOADED')
  private onUsersLoaded(users: User[]) {
    this.users = users ? users : [];
  }

  @action('[USER] ADD')
  public addUser(user: User) {
    this.users = [
      user,
      ...this.users
    ]
  }
}
