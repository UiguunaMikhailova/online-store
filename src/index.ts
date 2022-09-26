import App from './components/app/app';
import './global.css';

async function getCoffee(): Promise<void> {

    const app = new App();
    app.start();

}

getCoffee();