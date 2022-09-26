import { Data, State } from './../../types/types';
import coffee from './../../coffee.json';
import Products from './../view/products/products';
import * as noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import './nouislider.css';
import './filters.css';

let state: State = JSON.parse(window.localStorage.getItem('text') as string) || {
    search: '',
    price: [],
    quantity: [],
    type: [],
    taste: [],
    country: [],
    popular: false
}

let sort = JSON.parse(window.localStorage.getItem('text') as string) || 1;

const defaultState: State= {
  search: '',
  price: [],
  quantity: [],
  type: [],
  taste: [],
  country: [],
  popular: false
}
class AppController {
    private products: Data[];
    private filteredProducts: Data[];
    private drawProducts: Products;
    private slider: noUiSlider.target;
    private sliderQuantity: noUiSlider.target;

    constructor() {
        this.products = coffee;
        this.filteredProducts = coffee;
        this.drawProducts = new Products();
        this.slider = document.getElementById('slider-price') as noUiSlider.target;
        this.sliderQuantity = document.getElementById('slider-quantity') as noUiSlider.target;
    }

    getLocalStorage(): void {
        if (window.localStorage.getItem('text')) {
            state = JSON.parse(window.localStorage.getItem('text') as string);
        }
        if (window.localStorage.getItem('sort')) {
            sort = +JSON.parse(window.localStorage.getItem('sort') as string);
            const select = document.querySelector('.select') as HTMLInputElement;
            select.value = sort
        }
    }

    listener(): void {
        this.getLocalStorage();

        const type = document.querySelector('.type') as HTMLElement;
        type.addEventListener('click', (e): void => {
            this.handler(e);
            this.isEmpty();
        })

        const taste = document.querySelector('.taste')  as HTMLElement;
        taste.addEventListener('click', (e): void => {
            this.handler(e);
            this.isEmpty();
        })

        const country = document.querySelector('.country') as HTMLElement;
        country.addEventListener('click', (e): void => {
            this.handler(e);
            this.isEmpty();
        })

        const popular = document.querySelector('.popular') as HTMLElement;
        popular.addEventListener('click', (e): void => {
            this.handler(e);
            this.isEmpty();
        })

        const input = document.querySelector('.input');
        input?.addEventListener('input', (e): void => {
            const value = (e.target as HTMLInputElement).value;
            state.search = value;
            window.localStorage.setItem('text', JSON.stringify(state))
            this.isEmpty();
            this.filter();
        })

        const select = document.querySelector('.select') as HTMLElement;
        select.addEventListener('change', (e): void => {
            const value = (e.target as HTMLInputElement).value;
            sort = +value;
            window.localStorage.setItem('sort', JSON.stringify(sort))
            this.isEmpty();
            this.filter();
        })

        const items = document.getElementsByClassName('list__item')
        for (const item of items) {
            const itemFilter = item as HTMLElement;
            const name = itemFilter.dataset.name;

            if (state.type.length) {
                state.type.forEach((x) => {
                    if (x === name) {
                        item.classList.add('active')
                    }
                })
            }

            if (state.taste.length) {
                state.taste.forEach((x) => {
                    if (x === name) {
                        item.classList.add('active')
                    }
                })
            }

            if (state.country.length) {
                state.country.forEach((x) => {
                    if (x === name) {
                        item.classList.add('active')
                    }
                })
            }

            if (state.popular) {
                if ('popular' === name) {
                    item.classList.add('active')
                }
            }
        }
        this.isEmpty();
        this.filter()
    }

    handler(e: Event): void | undefined {

        const elem = e.target as HTMLElement;
        const name = elem.dataset.name as string;
        const group = elem.parentElement?.dataset.group as string;

        switch(group) {

            case 'type':
                if (state.type.includes(name)) {
                    state.type = state.type.filter((x) => x !== name);
                    window.localStorage.setItem('text', JSON.stringify(state));
                    elem.classList.remove('active');
                } else {
                    state.type.push(name);
                    window.localStorage.setItem('text', JSON.stringify(state));
                    elem.classList.add('active');
                }
                break;

            case 'taste':
                if (state.taste.includes(name)) {
                    state.taste = state.taste.filter((x) => x !== name);
                    window.localStorage.setItem('text', JSON.stringify(state));
                    elem.classList.remove('active');
                } else {
                    state.taste.push(name);
                    window.localStorage.setItem('text', JSON.stringify(state));
                    elem.classList.add('active');
                }
                break;

            case 'country':
                if (state.country.includes(name)) {
                    state.country = state.country.filter((x) => x !== name);
                    window.localStorage.setItem('text', JSON.stringify(state));
                    elem.classList.remove('active');
                } else {
                    state.country.push(name);
                    window.localStorage.setItem('text', JSON.stringify(state));
                    elem.classList.add('active');
                }
                break;

            case 'popular':
                if (state.popular) {
                    state.popular = false;
                    window.localStorage.setItem('text', JSON.stringify(state));
                    elem.classList.remove('active');
                } else {
                    state.popular = true;
                    window.localStorage.setItem('text', JSON.stringify(state));
                    elem.classList.add('active');
                }
        }

        this.filter();
    }

    filter(): void {
        this.getLocalStorage();
        const filteredProducts = this.products.filter((item) => {

            switch(false) {

                case item.name.toLowerCase().includes(state.search.toLowerCase()):
                  return false;

                case (state.type.includes(item.category) || state.type.length === 0):
                  return false;

                case (state.taste.includes(item.tasteCategory) || state.taste.length === 0):
                  return false;

                case (state.country.includes(item.countryCategory) || state.country.length === 0):
                  return false;

                case (state.popular === item.popular || state.popular === false):
                    return false;

                case (item.price >= state.price[0] && item.price <= state.price[1]):
                    return false;

                case (item.quantity >= state.quantity[0] && item.quantity <= state.quantity[1]):
                    return false;

                default: return true;
            }
        })

        switch(sort) {

            case 1: filteredProducts.sort((a, b): number => {
                return a.quantity - b.quantity;
            })
            break;

            case 2: filteredProducts.sort((a, b): number => {
                return b.quantity - a.quantity;
            })
            break;

            case 3: filteredProducts.sort((a, b): number => {
                return a.price - b.price;
            })
            break;

            case 4: filteredProducts.sort((a, b): number => {
                return b.price - a.price;
            })
            break;

            default: filteredProducts.sort((a, b): number => {
                return a.quantity - b.quantity;
            })
        }

        this.filteredProducts = filteredProducts;
        this.drawProducts.draw(this.filteredProducts);
    }

    isEmpty(): void {

        const productsWrapper = document.querySelector('.products-wrapper');
        const noResultCounter = productsWrapper?.children.length as number;
        const noResult = document.querySelector('.no-results') as HTMLElement;

        if (noResultCounter < 1) {
            noResult.classList.add('active');

        } else {
            noResult.classList.remove('active');
        }
    }

    reset(): void {

        const reset = document.querySelector('#reset') as HTMLElement;
        const resetFull = document.querySelector('#reset-full') as HTMLElement;
        const input = document.querySelector('.input') as HTMLInputElement;

        reset.addEventListener('click', () => {
            this.resetFilters(input);
        })

        resetFull.addEventListener('click', () => {
            window.localStorage.clear();
            this.resetFilters(input);
        })
    }

    resetFilters(input: HTMLInputElement): void {
        state = defaultState
        const filterButtons = document.querySelectorAll('.list__item');
        for (const btn of filterButtons) {
            btn.classList.remove('active');
        }
        input.value = '';
        this.slider.noUiSlider?.set([615, 8148]);
        this.sliderQuantity.noUiSlider?.set([0, 10]);
        window.localStorage.removeItem('text');
        this.isEmpty();
        this.listener();
        location.reload();
    }

    draw(): void {
        let [startPrice, endPrice] = [615, 8148];
        let [startQuantity, endQuantity] = [0, 10];
        if (window.localStorage.getItem('text')) {
            [startPrice, endPrice] = state.price;
            [startQuantity, endQuantity] = state.quantity;
        }

        const dollarPrefixFormat = wNumb({prefix: '$', decimals: 0});
        noUiSlider.create(this.slider, {
            start: [startPrice, endPrice],
            connect: true,
            margin: 10,
            tooltips: [dollarPrefixFormat, dollarPrefixFormat],
            pips: {
                mode: 'steps' as noUiSlider.PipsMode.Steps,
                density: 5,
                format: dollarPrefixFormat
            },
            range: {
                'min': 615,
                'max': 8148
            }
        });

        this.slider.noUiSlider?.on('update', (values) => {
            state.price = [];
            const value1 = Math.round(+values[0]);
            const value2 = Math.round(+values[1]);
            state.price.push(value1, value2);
            window.localStorage.setItem('text', JSON.stringify(state))
            this.isEmpty();
            this.listener();
        })

        const prefixFormat = wNumb({prefix: ' ', decimals: 0});
        noUiSlider.create(this.sliderQuantity, {
            start: [startQuantity, endQuantity],
            connect: true,
            margin: 1,
            tooltips: [prefixFormat, prefixFormat],
            pips: {
                mode: 'steps' as noUiSlider.PipsMode.Steps,
                density: 5,
                format: prefixFormat
            },
            range: {
                'min': 0,
                'max': 10
            }
        });

        this.sliderQuantity.noUiSlider?.on('update', (values) => {
            state.quantity = [];
            const value1 = Math.round(+values[0]);
            const value2 = Math.round(+values[1]);
            state.quantity.push(value1, value2);
            window.localStorage.setItem('text', JSON.stringify(state))
            this.isEmpty();
            this.listener()
        })
    }

}
export default AppController;