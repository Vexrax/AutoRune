import { LcuConnection } from './lcu/connection';
import { MatchedMessagePlayerRole } from './ws_messages';

/** Wraps an LcuConnection and implements high-level methods on top of it. */
export class LcuHelper {
  private readonly connection: LcuConnection;

  constructor(lcuConnection: LcuConnection) {
    this.connection = lcuConnection;
  }

  /** Used to authenticate the ownership of a League account to our server. */
  public async setVerificationToken(summonerId: string, token: string):
    Promise<void> {
    const url = `/lol-collections/v1/inventories/${summonerId}/verification`;
    await this.connection.request('PUT', url, token);
  }

  /** Create a game lobby. */
  public async createLobby(queueId: number): Promise<void> {
    const lobbyData = {
      "queueId": queueId,
      "canStartActivity": false,
      "gameConfig": {
        "allowablePremadeSizes": [
          1,
          2,
          3,
          4,
          5
        ],
        "customLobbyName": "",
        "customMutatorName": "",
        "customRewardsDisabledReasons": [],
        "customSpectatorPolicy": "NotAllowed",
        "customSpectators": [],
        "customTeam100": [],
        "customTeam200": [],
        "gameMode": "CLASSIC",
        "isCustom": false,
        "isLobbyFull": false,
        "isTeamBuilderManaged": false,
        "mapId": 11,
        "maxHumanPlayers": 5,
        "maxLobbySize": 5,
        "maxTeamSize": 5,
        "pickType": "",
        "premadeSizeAllowed": true,
        "queueId": queueId,
        "showPositionSelector": true
      },
      "partyType": "closed",
      "restrictions": [],
    };
    console.log('Creating lobby');
    console.log(lobbyData);
    await this.connection.request('POST', '/lol-lobby/v2/lobby', lobbyData);
  }

  /** Invite some players to a lobby. */
  public async sendLobbyInvite(summonerId: number,
                               summonerName: string): Promise<void> {
    await this.connection.request(
        'POST', '/lol-lobby/v2/eog-invitations',
        [{ state: 'Requested', timeStamp: Date.now().toString(),
           toSummonerId: summonerId, toSummonerName: summonerName }]);
  }

  /** Set a position in a game lobby. */
  public async setLobbyPreferredRoles(roles: MatchedMessagePlayerRole[]):
      Promise<void> {
    await this.connection.request(
        'PUT', '/lol-lobby/v1/lobby/members/localMember/position-preferences',
        { firstPreference: roles[0] || 'FILL',
          secondPreference: roles[1] || 'FILL'});
  }

  /** Click the 'Start' button in the lobby. */
  public async startLobbyMatch(): Promise<void> {
    await this.connection.request(
        'POST', '/lol-lobby/v2/lobby/matchmaking/search', {});
  }

  /** Accept an invitation to a lobby. */
  public async acceptLobbyInvite(invitationId: string): Promise<void> {
    const url = `/lol-lobby/v2/received-invitations/${invitationId}/accept`;
    await this.connection.request('POST', url, {});
  }

  /** Set a rune page **/
  public async setRunePage(runeArray: number[], primaryRunePage: number, secondaryRunePage: number): Promise<void>
  {
      const url = `/lol-perks/v1/pages`;
      var data =
          {
              "autoModifiedSelections": [],
              "current": true,
              "isActive": false,
              "isDeletable": true,
              "isEditable": true,
              "isValid": true,
              "name": "DB RunePage",
              "order": 1,
              "primaryStyleId": primaryRunePage,
              "selectedPerkIds": runeArray,
              "subStyleId": secondaryRunePage
          };
      await this.connection.request('POST', url, data);
  }
  /** Gets the list of runepages **/
  public async getRunePageList(): Promise<string>
  {
      const url =`/lol-perks/v1/pages`;
      return await this.connection.request('GET', url, {});
  }

  /** Deletes one specific RunePage Given the id**/
  public async deleteRunePage(id: number): Promise<void>
  {
      const url = `/lol-perks/v1/pages/${id}`;
      await this.connection.request('DELETE', url, {});
  }

  /** Delete all runepages **/
  public async deleteAllRunePages(): Promise<void>
  {
      const url = '/lol-perks/v1/pages';
      await this.connection.request('DELETE', url, {});
  }

  public async getRunePageCount(): Promise<string>
  {
    const url = '/lol-perks/v1/inventory';
    return await this.connection.request('GET', url, {});
  }


}



