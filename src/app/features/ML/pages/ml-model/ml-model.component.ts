import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrainModelComponent } from '../../components/train-model/train-model.component';
import { MLModelService } from '../../services/mlmodel.service';


@Component({
  selector: 'app-ml-model',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TrainModelComponent],
  templateUrl: './ml-model.component.html',
  styleUrl: './ml-model.component.scss'
})
export class MLModelComponent {
  modelService = inject(MLModelService);
  models = this.modelService.models
  modelFile: string = ""

  ngOnInit() {
    this.modelService.getModels();
    const mods = this.models
    for (let item of mods()) {
      this.downloadModel(item.id)
    }
  }

  downloadModel(id: string): void{
    this.modelService.download(id).subscribe({
      next: (response: Blob) => {
        const url = URL.createObjectURL(response);
        this.modelFile = url;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  deleteModel(id: string): void{
    this.modelService.delete(id).subscribe({
      next: response => {
        this.modelService.getModels();
      },
      error: err => {
        
      }
    });
  }  
}
