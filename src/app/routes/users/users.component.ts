import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ApiService } from '../../utils/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  constructor(private readonly apiService: ApiService) {}
  users = [];

  async ngOnInit() {
    const usersRes = await this.apiService.get('admin/users?page=1&limit=100', null);
    
    this.users = usersRes.data;
  }
}
