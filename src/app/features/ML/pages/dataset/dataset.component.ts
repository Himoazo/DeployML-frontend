import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { UploadDatasetComponent } from '../../components/upload-dataset/upload-dataset.component';
import { CleanDatasetComponent } from '../../components/clean-dataset/clean-dataset.component';
import { DatasetService } from '../../services/dataset.service';
import { AlertService } from '../../../../core/services/alert.service';


@Component({
  selector: 'app-dataset',
  imports: [CommonModule, FormsModule, UploadDatasetComponent, CleanDatasetComponent],
  templateUrl: './dataset.component.html',
  styleUrl: './dataset.component.scss'
})
export class DatasetComponent {
  dataService = inject(DatasetService);
  alert = inject(AlertService)
  
  ngOnInit() {
    this.dataService.getDatasets();
  }

  deleteDataset(id: string) {
    this.dataService.deleteDataset(id).subscribe({
      next: (response) => {
        this.dataService.getDatasets();
        this.alert.alert("Datafilen har raderats");
      },
      error: (err) => {
        console.log(err);
        this.alert.alert("Ett fel har inträffats");
      }
    });
  }
}
