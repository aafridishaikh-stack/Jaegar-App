import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCard } from './food-card';

describe('FoodCard', () => {
  let component: FoodCard;
  let fixture: ComponentFixture<FoodCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodCard],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodCard);
    component = fixture.componentInstance;
    component.food = {
      name: 'Test',
      price: 1.0,
      available: 1,
      image: 'https://via.placeholder.com/100',
    };
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
