import { Component, inject } from '@angular/core';
import { AuthService } from '../../../Authentication/services/auth.service';
import { apiBaseUrl } from '../../../../core/constants/endpoints.constant';
import { CommonModule } from '@angular/common';
import { MLModelService } from '../../../ML/services/mlmodel.service';

@Component({
  selector: 'app-api',
  imports: [CommonModule],
  templateUrl: './api.component.html',
  styleUrl: './api.component.scss'
})
export class APIComponent {
  auth = inject(AuthService);
  modelService = inject(MLModelService);
  info = this.auth.userInfo();
  baseUrl = apiBaseUrl;

  ngOnInit() {
    this.modelService.getModels();
  }
}
