type Data = {
  id: number,
  tasteCategory: string,
  category: string,
  countryCategory: string,
  name: string,
  type: string,
  price: number,
  country: string,
  acidity: string,
  taste: string,
  popular: boolean,
  quantity: number,
  img: string,
  cart: boolean
};

type State = {
  search: string,
  price: number[],
  quantity: number[],
  type: string[],
  taste: string[],
  country: string[],
  popular: boolean
};


export { Data, State };