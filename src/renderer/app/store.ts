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

const runes =
{
    namespaced: true,
    state: {
        Name: null,
        KeystoneTree: null,
        SecondaryTree: null,
        Runes: []
    },
    mutations: {
        setRunes( state: any, listOfRunes: number[])
        {
            state.Runes =  listOfRunes
        },
        SetKeystoneTree(state: any, treenumber: number)
        {
          state.KeystoneTree = treenumber;
        },
        SetSecondaryTree(state: any, treenumber: number)
        {
            state.SecondaryTree = treenumber;
        },
        SetName(state: any, name: string)
        {
            state.Name = name;
        }
    }
};


export const store = new Vuex.Store({
  modules: {
    lcu,
    preferences,
      runes,
  },
});

