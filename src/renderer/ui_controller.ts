
import { LcuClientWatcher } from './lcu/client_watcher';
import { LcuConnection } from './lcu/connection';
import { LcuEventDispatcher } from './lcu/event_dispatcher';
import { LcuHelper } from './lcu_helper';
import { IncomingInvite, LobbyData, LoginWatcher, LoginWatcherDelegate,
         LoginWatcherState } from './login_watcher';
import {
     WsConnectionDelegate, WsConnectionState
}
    from './ws_connection';
import {ChampSelectHandler} from "./champ_select_state";

export type UiControllerState =
    'lcu-offline' | 'lcu-online' | WsConnectionState;

export class UiController
    implements WsConnectionDelegate, LoginWatcherDelegate {
  /** Looks for live LCU clients. */
  public readonly clientWatcher: LcuClientWatcher;
  /** LCU status events. */
  public readonly eventDispatcher: LcuEventDispatcher;
  /** Tracks the LCU's client state. */
  public readonly loginWatcher: LoginWatcher;
  public readonly vueStore: any;  // Vuex.Store;
  /** Connection to our WebSockets server. */


  private lastState: UiControllerState;
  /** Last known-good LCU connection, wrapped in an LcuHelper. */
  private lcu: LcuHelper | null;
  /** The URL of our WebSockets server.  */

  private champSelectHander: ChampSelectHandler | null;

  constructor(vueStore: any) {  // Should be Vuex.Store.
    this.eventDispatcher = new LcuEventDispatcher();
    this.lastState = 'lcu-offline';
    this.lcu = null;
    this.loginWatcher = new LoginWatcher(this.eventDispatcher, this);
    this.vueStore = vueStore;
    this.clientWatcher = new LcuClientWatcher(this.eventDispatcher);
    this.champSelectHander = null;

    this.setupDebugLogging();
    this.setupChampSelectHandler();
  }


  /** LCU connection wrapped in an LcuHelper.
   *
   * This throws an exception if the LCU client is not signed in.
   */
  public setupDebugLogging(): void {
    this.eventDispatcher.addListener(
        'OnJsonApiEvent', (_: string, payload: any) => {
      console.log(payload);
    });
    this.eventDispatcher.addListener(
        'OnLcdsEvent', (_: string, payload: any) =>  {
      console.log(payload);
    });
    // Also available:
    // OnLog, OnRegionLocaleChanged, OnServiceProxyAsyncEvent,
    // OnServiceProxyMethodEvent, OnServiceProxyUuidEvent
  }

  public setupChampSelectHandler(): void
  {
        this.eventDispatcher.addListener(
            'OnJsonApiEvent', (_: string, payload: any) =>
            {
              if(this.champSelectHander != null) {
                  this.champSelectHander.champselectListener(payload);
              }
            });
  }

  // WsConnectionDelegate
  public onWsStateChange(state: WsConnectionState): void {
    console.log(`WSConnection state: ${state}`);

    if (this.loginWatcher.state() !== 'lcu-signedin') {
      return;
    }

  }


  // LoginWatcherDelegate
  public async onLoginChange(state: LoginWatcherState): Promise<void> {
    console.log(`LoginWatcher state: ${state}`);
    console.log(`login state change to: ${state}`);
    if (state !== 'lcu-signedin') {
        this.lcu = null;
        this.setState(state);
        return;
    }

    // When signed in, the state comes from the WebSocket connection.
    // "as LcuConnection" is safe because loginWatcher's connection is only
    // null when the state is 'offline'.

    const lcuConnection = this.loginWatcher.connection() as LcuConnection;
    this.lcu = new LcuHelper(lcuConnection);
    this.setState('ready');

    this.champSelectHander = new ChampSelectHandler(this.lcu);
  }

  public async onLobbyChange(lobby: LobbyData | null): Promise<void> {
      console.log('UIC onLobbyChange');
      console.log(lobby);

  }
  public async onIncomingInvitesChange(invites: IncomingInvite[]):
      Promise<void> {
    console.log('UIC onIncomingInvitesChange');
    console.log(invites);
    if (this.lastState !== 'matched') {
      return;
    }
  }
  private setState(state: UiControllerState): void {
    if (this.lastState === state) {
        return;
    }
      this.lastState = state;
      console.log(['UIController', state]);
      this.vueStore.commit('lcu/setStatus', state);
      //this.vueStore["_modules"]["root"]["_children"]["preferences"]["state"] saving for later
  }
}
