import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { MainAreaWidget  } from '@jupyterlab/apputils';
import { WeatherWidget } from './weather';


const extension: JupyterFrontEndPlugin<void> = {
  id: 'weather-widgets',
  autoStart: true,

  activate: async (app: JupyterFrontEnd) => {
    const newWidget = async () => {
       
      const content = new WeatherWidget();
      const widget = new MainAreaWidget<WeatherWidget>({ content })
  
      widget.title.iconClass = 'fa fa-cloud';
      widget.id = 'weather_widget';
      widget.show()
      return widget;
    }
    let widget = await newWidget();
    app.shell.add(widget, 'left', { rank: 1000 });
    app.shell.activateById(widget.id);
  }
};

export default extension;
