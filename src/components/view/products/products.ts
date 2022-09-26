import './products.css';
import { Data } from '../../../types/types';

const productsWrapper = document.querySelector('.products-wrapper') as HTMLElement;
const overlay = document.querySelector('.overlay-popup') as HTMLElement;
const popup = document.querySelector('.modal') as HTMLElement;
const popupClose = document.querySelector('.modal__close');
const cart = document.querySelector('.cart-count') as HTMLElement;

let cartCount = JSON.parse(window.localStorage.getItem('cartCount') as string) || [];
class Products {

    getLocalStorage(): void {
        if (window.localStorage.getItem('cartCount')) {
            cartCount = JSON.parse(window.localStorage.getItem('cartCount') as string);
        }
    }

    draw(data: Data[]): void {
        this.getLocalStorage();

        const coffee = data;
        productsWrapper.innerHTML = '';

        popupClose?.addEventListener('click', this.closePopup)
        overlay?.addEventListener('click', this.closePopup)

        coffee.forEach((item) => this.renderCards(item));

        cart.textContent = `${cartCount.length}`;
    }

    renderCards(item: Data): void {
        const card = this.create('div', 'card', productsWrapper);

            const img = this.create('img', 'img', card) as HTMLImageElement;
            img.src = `${item.img}`;

            const textWrapper = this.create('div', 'card__text', card);

            const title = this.create('h3', 'title', textWrapper);
            title.textContent = item.name;

            const category = item.category;
            const tasteCategory = item.tasteCategory;
            card.setAttribute('data-category', category as string);
            card.setAttribute('data-tasteCategory', tasteCategory as string);

            const type = this.create('span', 'text', textWrapper);
            type.textContent = `Тип: ${item.type}`;

            const price = this.create('span', 'text', textWrapper);
            price.textContent = `Цена: ${item.price}`;

            const country = this.create('span', 'text', textWrapper);
            country.textContent = `Страна: ${item.country}`;

            const taste = this.create('span', 'text', textWrapper);
            taste.textContent = `Вкус: ${item.taste}`;

            const quantity = this.create('span', 'text', textWrapper);
            quantity.textContent = `Количество: ${item.quantity}`;

            cart.textContent = `${cartCount.length}`;

            this.toggleCardActive(item, card);

            card.addEventListener('click', (): void => this.cartCounter(item, card))
    }

    cartCounter(item: Data, card: HTMLElement): void {
        if (cartCount.includes(item.id)) {
            const index = cartCount.indexOf(item.id);
            cartCount.splice(index, 1);
            window.localStorage.setItem('cartCount', JSON.stringify(cartCount))
            card.classList.remove('active');
        } else {
            if (cartCount.length > 19) {
                this.openPopup();
            } else {
                cartCount.push(item.id)
                window.localStorage.setItem('cartCount', JSON.stringify(cartCount))
                card.classList.add('active');
            }
        }
        cart.textContent = `${cartCount.length}`;
    }

    create(elemTag: string, elemClass: string, elemParent: HTMLElement): HTMLElement {

        const newElem = document.createElement(`${elemTag}`);
        newElem.classList.add(`${elemClass}`);
        elemParent.append(newElem);

        return newElem;
    }

    openPopup(): void {
        overlay?.classList.add('active');
        popup?.classList.add('active');
        document.body.classList.add('lock');
    }

    closePopup(): void {
        overlay?.classList.remove('active');
        popup?.classList.remove('active');
        document.body.classList.remove('lock');
    }

    toggleCardActive(item: Data, card: HTMLElement): void {
        if (item.cart || cartCount.includes(item.id)) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    }
}
export default Products;