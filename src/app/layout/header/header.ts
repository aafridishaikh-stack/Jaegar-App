import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { AppStateService, FoodCategory } from '../../services/app-state.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  categories: FoodCategory[] = ['Hot Dishes', 'Cold Dishes', 'Soup', 'Grill', 'Appetizer', 'Dessert'];

  selectedCategory: FoodCategory = 'Hot Dishes';

  constructor(public appState: AppStateService) {
    this.selectedCategory = this.appState.selectedCategory$.value;
    this.appState.selectedCategory$.subscribe((category) => (this.selectedCategory = category));
  }

  selectCategory(category: FoodCategory) {
    this.appState.setCategory(category);
  }

  onTypeChange(event: Event) {
    const value = (event.target as HTMLSelectElement)?.value;
    if (value === 'Dine In' || value === 'To Go' || value === 'Delivery') {
      this.appState.setType(value);
    }
  }
}
