import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';


import { MainAreaWidget } from '@jupyterlab/apputils';
import { WeatherWidget } from './weather';
import { ITranslator } from '@jupyterlab/translation';
import { ExamplePanel } from './panel';




// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.




const extension: JupyterFrontEndPlugin<void> = {
  id: 'weather-widgets',
  autoStart: true,

  activate: async (app: JupyterFrontEnd,
    translator: ITranslator) => {

    const manager = app.serviceManager;



    const newWidget = async () => {


      const content = new WeatherWidget();

      const widget = new MainAreaWidget<WeatherWidget>({ content })



      widget.title.iconClass = 'fa fa-cloud';
      widget.id = 'weather_widget';
      widget.show()



      return widget;
    }

    const panel = new ExamplePanel(manager, translator);

    app.shell.add(panel, 'main');


    let widget = await newWidget();
    app.shell.add(widget, 'left', { rank: 1000 });
    app.shell.activateById(widget.id);



  }


};

export default extension;
