import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type OrderType = 'Dine In' | 'To Go' | 'Delivery';
export type FoodCategory = 'Hot Dishes' | 'Cold Dishes' | 'Soup' | 'Grill' | 'Appetizer' | 'Dessert';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  selectedType$ = new BehaviorSubject<OrderType>('Dine In');
  selectedCategory$ = new BehaviorSubject<FoodCategory>('Hot Dishes');

  setType(type: OrderType) {
    this.selectedType$.next(type);
  }

  setCategory(category: FoodCategory) {
    this.selectedCategory$.next(category);
  }
}
