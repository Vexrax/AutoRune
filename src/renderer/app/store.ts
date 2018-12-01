import Vue from 'vue';
import Vuex from 'vuex';
import { UiControllerState } from '../ui_controller';

Vue.use(Vuex);
Vue.config.devtools = true;

const lcu = {
  namespaced: true,
  state: {
    status: 'lcu-offline',
  },
  mutations: {
    setStatus(state: any, value: UiControllerState): void {
      state.status = value;
    },
  },
};

const preferences = {
  namespaced: true,
  state: {
    intensity: null,
    language: null,
    primaryPosition: null,
    secondaryPosition: null,
    roles: [],
  },
  mutations: {
    setIntensity(state: any, value: number): void {
      state.intensity = value;
    },
    setLanguage(state: any, value: string): void {
      state.language = value;
    },
    setPrimaryPosition(state: any, value: string): void {
      state.primaryPosition = value;
    },
    setSecondaryPosition(state: any, value: string): void {
      state.secondaryPosition = value;
    },
    setRoles(state: any, value: Array<string>): void {
      state.roles = value;
    },
  },
};

const tempRuneMatrix = {
      namespaced: true,
      state: {
          ChampName: null,
          KeystoneTree: 0,
          SecondaryTree: 1,
          KeyStoneMatrix: [-1, -1, -1, -1],
          SecondaryTreeMatrix: [-1, -1, -1],
          ShardMatrix: [-1, -1, -1],
          selectedSecondaryRunes: 0,
      },
      mutations: {
          SetKeyStoneMatrix(state: any, payload: any) {
              state.KeyStoneMatrix[payload.row] = payload.id;
          },
          SetSecondaryTreeMatrix(state: any, payload: any) {
              state.SecondaryTreeMatrix[payload.row] = payload.id;
          },
          SetShardMatrix(state: any, payload: any) {
              state.ShardMatrix[payload.row] = payload.id;
          },
          AddSelectedSecondaryRunes(state: any) {
              state.selectedSecondaryRunes += 1;
          },
          SubtractSelectedSecondaryRunes(state: any) {
              state.selectedSecondaryRunes -= 1;
          },
          ResetAllMatricies(state: any) {
              state.KeyStoneMatrix = [-1, -1, -1, -1];
              state.SecondaryTreeMatrix =  [-1, -1, -1];
              state.ShardMatrix =  [-1, -1, -1];
              state.selectedSecondaryRunes = 0;
          },
          ResetKeyStoneMatrix(state: any) {
              state.KeyStoneMatrix = [-1, -1, -1, -1];
          },
          ResetSecondaryMatrix(state: any) {
              state.SecondaryTreeMatrix =  [-1, -1, -1];
              state.selectedSecondaryRunes = 0;

          },
          ResetShardMatrix(state: any) {
              state.ShardMatrix =  [-1, -1, -1];
          },
          SetChampName(state: any, name: string) {
            state.ChampName = name;
            },
          SetKeystoneTree(state: any, treenumber: number) {
              state.KeystoneTree = treenumber;
          },
          SetSecondaryTree(state: any, treenumber: number) {
              state.SecondaryTree = treenumber;
          },
      },

    };


export const store = new Vuex.Store({
  modules: {
    lcu,
    preferences,
      tempRuneMatrix,
  },
});

