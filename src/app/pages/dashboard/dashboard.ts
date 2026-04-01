import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FoodCard } from '../../components/food-card/food-card';
import { Header } from '../../layout/header/header';
import { AppStateService, FoodCategory } from '../../services/app-state.service';
import { Food, OrderItem } from './types';
import { OrderPanel } from '../../components/order-panel/order-panel';
import { PaymentPopup } from '../../components/payment-popup/payment-popup';

@Component({
  selector: 'app-dashboard',
  host: { style: 'display:flex; flex-direction:column; flex:1; height:100%; min-height:0;' },
  imports: [
    FoodCard,
    Header,
    OrderPanel,
    PaymentPopup,
    NgFor,
    NgIf,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  categories: FoodCategory[] = ['Hot Dishes', 'Cold Dishes', 'Soup', 'Grill', 'Appetizer', 'Dessert'];
  foods: Food[] = [
    {
      name: 'Healthy noodle with spinach leaf',
      price: 3.29,
      available: 22,
      image: '/noodle_spinach.png',
      categories: ['Hot Dishes', 'Hot Dishes'],
    },
    {
      name: 'Hot spicy fried rice with omelet',
      price: 3.49,
      available: 13,
      image: '/fried_rice_omelet.png',
      categories: ['Hot Dishes', 'Hot Dishes'],
    },
    {
      name: 'Spicy instant noodle with special omelette',
      price: 3.59,
      available: 17,
      image: '/instant_noodle_omelette.png',
      categories: ['Hot Dishes', 'Hot Dishes'],
    },
    {
      name: 'Spicy seasoned seafood noodles',
      price: 2.29,
      available: 20,
      image: '/seafood_noodles.png',
      categories: ['Appetizer', 'Hot Dishes'],
    },
    {
      name: 'Salted Pasta with mushroom sauce',
      price: 2.69,
      available: 11,
      image: '/pasta_mushroom.png',
      categories: ['Grill', 'Hot Dishes'],
    },
    {
      name: 'Beef dumpling in hot and sour soup',
      price: 2.99,
      available: 16,
      image: '/beef_dumpling_soup.png',
      categories: ['Soup', 'Hot Dishes'],
    },
    {
      name: 'Spicy seasoned seafood noodles',
      price: 2.29,
      available: 20,
      image: '/seafood_noodles.png',
      categories: ['Cold Dishes', 'Hot Dishes'],
    },
    {
      name: 'Salted Pasta with mushroom sauce',
      price: 2.69,
      available: 11,
      image: '/pasta_mushroom.png',
      categories: ['Cold Dishes', 'Hot Dishes'],
    },
    {
      name: 'Beef dumpling in hot and sour soup',
      price: 2.99,
      available: 16,
      image: '/beef_dumpling_soup.png',
      categories: ['Dessert', 'Hot Dishes'],
    },
    {
      name: 'Spicy instant noodle with special omelette',
      price: 3.59,
      available: 17,
      image: '/instant_noodle_omelette.png',
      categories: ['Soup', 'Hot Dishes'],
    },
    {
      name: 'Healthy noodle with spinach leaf',
      price: 3.29,
      available: 22,
      image: '/noodle_spinach.png',
      categories: ['Grill', 'Hot Dishes'],
    },
    {
      name: 'Hot spicy fried rice with omelet',
      price: 3.49,
      available: 13,
      image: '/fried_rice_omelet.png',
      categories: ['Dessert', 'Hot Dishes'],
    },
  ];

  orders: OrderItem[] = [];
  isPaymentOpen = false;
  isDropdownOpen = false;
  selectedType: 'Dine In' | 'To Go' | 'Delivery' = 'Dine In';
  selectedCategory: FoodCategory = 'Hot Dishes';
  selectedPaymentMethod: 'credit' | 'paypal' | 'cash' = 'credit';

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectPaymentMethod(method: 'credit' | 'paypal' | 'cash') {
    this.selectedPaymentMethod = method;
  }

  selectTypeFromDropdown(type: 'Dine In' | 'To Go' | 'Delivery', event: Event) {
    // Prevent the dropdown toggle click handler from reopening the menu
    event.stopPropagation();
    this.selectType(type);
    this.isDropdownOpen = false;
  }

  get filteredFoods() {
    return this.foods.filter((f) => f.categories.includes(this.selectedCategory));
  }

  constructor(public appState: AppStateService) {
    this.appState.selectedType$.subscribe((v) => (this.selectedType = v));
    this.appState.selectedCategory$.subscribe((v) => (this.selectedCategory = v));
    
    // Add default orders for testing
    this.orders = [
      { food: this.foods[0], qty: 2, note: 'Please, just a little bit spicy only.' },
      { food: this.foods[4], qty: 1, note: '' },
      { food: this.foods[2], qty: 3, note: '' }
    ];
  }

  addToCart(food: Food) {
    if (!food.available) return;
    const item = this.orders.find((o) => o.food.name === food.name);
    if (item) {
      item.qty = Math.min(item.qty + 1, food.available);
    } else {
      this.orders.push({ food, qty: 1, note: '' });
    }
  }

  removeFromCart(index: number) {
    this.orders.splice(index, 1);
  }

  updateQty(index: number, delta: number) {
    const item = this.orders[index];
    if (!item) return;
    const next = item.qty + delta;
    if (next < 1 || next > item.food.available) return;
    item.qty = next;
  }

  selectType(type: 'Dine In' | 'To Go' | 'Delivery') {
    this.appState.setType(type);
  }

  selectCategory(category: FoodCategory) {
    this.appState.setCategory(category);
  }

  get subTotal() {
    return this.orders.reduce((sum, o) => sum + o.food.price * o.qty, 0);
  }

  continueToPayment() {
    if (this.orders.length > 0) this.isPaymentOpen = true;
  }

  closePayment() {
    this.isPaymentOpen = false;
  }

  confirmPayment() {
    alert(`Payment confirmed! Total: $${this.subTotal.toFixed(2)}`);
    this.isPaymentOpen = false;
    this.orders = [];
  }
}
