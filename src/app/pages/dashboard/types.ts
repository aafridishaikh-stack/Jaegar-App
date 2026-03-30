export interface Food {
  name: string;
  price: number;
  available: number;
  image: string;
  categories: ('Hot Dishes' | 'Cold Dishes' | 'Soup' | 'Grill' | 'Appetizer' | 'Dessert')[];
}

export interface OrderItem {
  food: Food;
  qty: number;
  note: string;
}
