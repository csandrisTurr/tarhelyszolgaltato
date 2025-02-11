import { Component } from '@angular/core';
import { authGuard } from '../../utils/auth.guard';
import { ApiService } from '../../utils/api.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
  ],
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss'
})
export class RootComponent {
  constructor(private readonly apiService: ApiService) {}

  packages = [];
  canBuyShit = () => localStorage.getItem('hasSubscription') == '0';
  activeSub = {
    date: '',
    package: {
      id: 0,
      name: '',
      price: 0,
      description: '',
    }
  };

  async ngOnInit() {
    const packagesRes = await this.apiService.get('packages', null);

    this.packages = packagesRes.data;

    const activeSubRes = await this.apiService.get('subscriptions/active', null);
    this.activeSub = activeSubRes.data;
  }

  async subscribe(id: number) {
    const res = await this.apiService.post('subscriptions/subscribe', {
      packageId: id,
    });

    localStorage.setItem('hasSubscription', '1');
    location.reload();
  }
}
