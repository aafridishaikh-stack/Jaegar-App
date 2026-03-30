import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order-list',
  imports: [NgFor, MatButtonModule],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})
export class OrderList {
  orders: any[] = [];
}
