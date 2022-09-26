import AppController from '../controller/controller';
import AppView from '../view/appView';
class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        this.controller.listener();
        this.view.draw();
    }
}

export default App;