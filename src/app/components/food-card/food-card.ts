import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-food-card',
  imports: [],
  templateUrl: './food-card.html',
  styleUrl: './food-card.scss',
})
export class FoodCard {
  @Input() food: any;
}
