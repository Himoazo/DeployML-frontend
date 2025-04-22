import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MLModelService } from '../../services/mlmodel.service';
import { DatasetService } from '../../services/dataset.service';
import { AuthService } from '../../../Authentication/services/auth.service';
import { RunInput, RunResponse, TrainedModel } from '../../types/MLModel.type';
import { DatasetInfo } from '../../types/dataset.type';

@Component({
  selector: 'app-run-model',
  imports: [CommonModule, FormsModule],
  templateUrl: './run-model.component.html',
  styleUrl: './run-model.component.scss'
})
export class RunModelComponent {
  modelService = inject(MLModelService);
  dataService = inject(DatasetService);
  auth = inject(AuthService);
  
  modelObject: TrainedModel | null = null;
  featuresArr: string[] | null = null
  inputValues: number[] = [];
  runInput: string = "";
  result: RunResponse | null = null;

  ngOnInit() {
    this.modelService.getModels();
    this.dataService.getDatasets();
    this.auth.getMyInfo();
  }

  inputIndexes() {
    const datasets = this.dataService.datasets();
    const targetSet = datasets.find(x => x.id === this.modelObject?.dataset_id);

    if (targetSet) {
      const target: DatasetInfo = targetSet;
      this.featuresArr = target.feature_names;
      this.inputValues = new Array(this.featuresArr.length).fill(null);
    }
  }

  runModel() {
    const wrappedInput: RunInput = [this.inputValues];
    const APIKey: string | undefined= this.auth.userInfo()?.api_key; 
    if (APIKey && wrappedInput && this.modelObject) {
      this.modelService.run(APIKey, this.modelObject.id, wrappedInput).subscribe({
      next: response => {
        this.result = response;
      },
      error: err => {
        
      }
    }); 
    } else {
      console.log("error running model");
      return
    }
  }
}

