import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrainModelComponent } from '../train-model/train-model.component';

@Component({
  selector: 'app-ml-model',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TrainModelComponent],
  templateUrl: './ml-model.component.html',
  styleUrl: './ml-model.component.scss'
})
export class MLModelComponent {
  
}
