import AppController from './../controller/controller';
class AppView {
    private controller: AppController;
    constructor() {
        this.controller = new AppController();
    }

    draw(): void {
        this.controller.draw();
        this.controller.reset();
    }
}

export default AppView;