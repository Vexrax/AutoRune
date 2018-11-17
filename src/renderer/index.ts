// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import { store } from './app/store';

import { UiController } from './ui_controller';

(self as any).controller = new UiController(store);
