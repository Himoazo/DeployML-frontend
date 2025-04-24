import { Component, inject } from '@angular/core';
import { AuthService } from '../../../Authentication/services/auth.service';
import { apiBaseUrl } from '../../../../core/constants/endpoints.constant';

@Component({
  selector: 'app-api',
  imports: [],
  templateUrl: './api.component.html',
  styleUrl: './api.component.scss'
})
export class APIComponent {
  auth = inject(AuthService);
  info = this.auth.userInfo();
  baseUrl = apiBaseUrl;
}
