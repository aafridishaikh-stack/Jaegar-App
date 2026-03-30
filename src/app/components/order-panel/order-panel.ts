import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderItem } from '../../pages/dashboard/types';

@Component({
  selector: 'app-order-panel',
  standalone: true,
  imports: [NgFor, NgIf, SlicePipe, FormsModule],
  templateUrl: './order-panel.html',
  styleUrl: './order-panel.scss',
})
export class OrderPanel {
  @Input() orders: OrderItem[] = [];
  @Input() selectedType: 'Dine In' | 'To Go' | 'Delivery' = 'Dine In';
  @Input() subTotal = 0;

  @Output() typeChange = new EventEmitter<'Dine In' | 'To Go' | 'Delivery'>();
  @Output() remove = new EventEmitter<number>();
  @Output() continue = new EventEmitter<void>();

  selectType(type: 'Dine In' | 'To Go' | 'Delivery') {
    this.typeChange.emit(type);
  }

  removeItem(index: number, event: Event) {
    event.stopPropagation();
    this.remove.emit(index);
  }

  continueToPayment() {
    this.continue.emit();
  }
}
