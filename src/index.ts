import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the gsoc2023_task1 extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'gsoc2023_task1:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension gsoc2023_task1 is activated!');
  }
};

export default plugin;
