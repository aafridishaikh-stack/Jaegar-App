import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgFor, NgIf, SlicePipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderItem } from '../../pages/dashboard/types';

@Component({
  selector: 'app-payment-popup',
  standalone: true,
  imports: [NgFor, NgIf, SlicePipe, TitleCasePipe, FormsModule],
  templateUrl: './payment-popup.html',
  styleUrl: './payment-popup.scss',
})
export class PaymentPopup {
  @Input() isOpen = false;
  @Input() orders: OrderItem[] = [];
  @Input() subTotal = 0;
  @Input() selectedPaymentMethod: 'credit' | 'paypal' | 'cash' = 'credit';

  private _selectedType: 'Dine In' | 'To Go' | 'Delivery' = 'Dine In';
  @Input() set selectedType(value: 'Dine In' | 'To Go' | 'Delivery') {
    this._selectedType = value;
  }
  get selectedType() { return this._selectedType; }

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  @Output() selectPaymentMethod = new EventEmitter<'credit' | 'paypal' | 'cash'>();
  @Output() remove = new EventEmitter<number>();
  @Output() typeChange = new EventEmitter<'Dine In' | 'To Go' | 'Delivery'>();

  isTypeDropdownOpen = false;

  // Expiry picker
  expiryDisplay = '';
  isExpiryOpen = false;
  pickerYear = new Date().getFullYear();
  selectedExpiryMonth: number | null = null;
  selectedExpiryYear: number | null = null;
  readonly months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  openExpiry(event: Event) {
    event.stopPropagation();
    this.isExpiryOpen = !this.isExpiryOpen;
  }

  prevYear() { this.pickerYear--; }
  nextYear() { this.pickerYear++; }

  selectMonth(monthIndex: number) {
    this.selectedExpiryMonth = monthIndex + 1;
    this.selectedExpiryYear = this.pickerYear;
    const mm = String(this.selectedExpiryMonth).padStart(2, '0');
    this.expiryDisplay = `${mm}/${this.pickerYear}`;
    this.isExpiryOpen = false;
  }

  chooseMethod(method: 'credit' | 'paypal' | 'cash') {
    this.selectPaymentMethod.emit(method);
  }

  removeItem(index: number, event: Event) {
    event.stopPropagation();
    this.remove.emit(index);
  }

  toggleTypeDropdown(event: Event) {
    event.stopPropagation();
    this.isTypeDropdownOpen = !this.isTypeDropdownOpen;
  }

  chooseType(type: 'Dine In' | 'To Go' | 'Delivery', event: Event) {
    event.stopPropagation();
    this._selectedType = type;
    this.typeChange.emit(type);
    this.isTypeDropdownOpen = false;
  }

  @HostListener('document:click')
  closeDropdowns() {
    this.isTypeDropdownOpen = false;
    this.isExpiryOpen = false;
  }
}
