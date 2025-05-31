import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MLModelService } from '../../services/mlmodel.service';
import { DatasetService } from '../../services/dataset.service';
import { AuthService } from '../../../Authentication/services/auth.service';
import { RunInput, RunResponse, TrainedModel } from '../../types/MLModel.type';
import { DatasetInfo } from '../../types/dataset.type';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { finalize } from 'rxjs';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-run-model',
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule, MatProgressBarModule],
  templateUrl: './run-model.component.html',
  styleUrl: './run-model.component.scss'
})
export class RunModelComponent {
  modelService = inject(MLModelService);
  dataService = inject(DatasetService);
  auth = inject(AuthService);
  alert = inject(AlertService)
  
  modelObject: TrainedModel | null = null;
  featuresArr: string[] | null = null
  inputValues: {[key: string]: string} = {};
  runInput: string = "";
  result: RunResponse | null = null;
  errorMsg: string = "";
  progressBar: boolean = false;

  ngOnInit() {
    this.modelService.getModels();
    this.dataService.getDatasets().subscribe();
    this.auth.getMyInfo().subscribe();
  }

  inputIndexes() {
    this.dataService.getDatasets().subscribe();
    const datasets = this.dataService.datasets();
    const targetSet = datasets.find(x => x.id === this.modelObject?.dataset_id);

    if (targetSet) {
      const target: DatasetInfo = targetSet;
      this.featuresArr = target.feature_names;
    }
  }

  runModel() {
    this.progressBar = true;
    const wrappedInput: RunInput = [this.inputValues];
    const APIKey: string | undefined= this.auth.userInfo()?.api_key; 
    if (APIKey && wrappedInput && this.modelObject) {
      this.modelService.run(APIKey, this.modelObject.id, wrappedInput)
        .pipe(
          finalize(() => {
            this.progressBar = false;
          })
        )
        .subscribe({
      next: response => {
        this.result = response;
      },
      error: err => {
        this.errorMsg = "Det gick inte att köra ml modellen"
        this.alert.alert("Det gick inte att köra ml modellen");
      }
    }); 
    } else {
      if (!APIKey) {
        this.errorMsg = "API nyckeln saknars"
      }
      if (!this.modelObject) {
        this.errorMsg = "Tränad modell saknars"
      }
      this.progressBar = false;
      return
    }
  }
}

