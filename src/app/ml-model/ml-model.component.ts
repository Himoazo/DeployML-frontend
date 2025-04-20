import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatasetService } from '../services/dataset.service';
import { AlgorithmService } from '../services/algorithm.service';
import { AlgorithmInfo } from '../types/algorithms.type';
import { TrainRequest } from '../types/MLModel.type';
import { MLModelService } from '../services/mlmodel.service';

@Component({
  selector: 'app-ml-model',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ml-model.component.html',
  styleUrl: './ml-model.component.scss'
})
export class MLModelComponent {
  private fb = inject(FormBuilder);
  datasetService = inject(DatasetService);
  algoService = inject(AlgorithmService);
  modelService = inject(MLModelService)
  datasetId: string = "";
  algorithms: AlgorithmInfo[] = [];

  trainForm: FormGroup = this.fb.group({
    dataset_id: ['', Validators.required],
    model_type: ['', Validators.required],
    name_of_model: ['', Validators.required]
  });

  ngOnInit() {
    this.getAlgos();
    this.datasetService.getDatasets();
  }

  getAlgos(): void{
    this.algoService.getAlgorithms().subscribe({
      next: response => {
        this.algorithms = response;
      },
      error: err => {

      }
    });
  }

  trainModel(): void{
    if (this.trainForm.valid) {
      const form = this.trainForm.value;

      const request: TrainRequest = {
        dataset_id: form.dataset_id,
        model_type: form.model_type,
        name_of_model: form.name_of_model
      }  
      
      this.modelService.train(request).subscribe({
        next: response => {
          console.log("Model was trained: ", response)
        },
        error: err => {
          console.log(err)
        }
      });
    }

  }
}
