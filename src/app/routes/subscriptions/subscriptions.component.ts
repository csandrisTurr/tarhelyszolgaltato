import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ApiService } from '../../utils/api.service';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.scss'
})
export class SubscriptionsComponent {
  constructor(private readonly apiService: ApiService) {}

  subscriptions = [];

  async ngOnInit() {
    const usersRes = await this.apiService.get('admin/subscriptions?page=1&limit=100', null);
    
    this.subscriptions = usersRes.data;
  }
}
