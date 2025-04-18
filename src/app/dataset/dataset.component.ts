import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, Validators } from '@angular/forms';
import { DatasetService } from '../services/dataset.service';
import { Dataset } from '../types/dataset.type';

@Component({
  selector: 'app-dataset',
  imports: [CommonModule, FormsModule],
  templateUrl: './dataset.component.html',
  styleUrl: './dataset.component.scss'
})
export class DatasetComponent {
  fb = inject(FormBuilder)
  dataService = inject(DatasetService)
  selectedFile: File | null = null;
  datasetName: string = "";
  datasetTarget: string = "";
  errorDiv: string = "";

  selectFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  
  uploadDataset(): void{
    if (this.selectedFile && this.datasetName && this.datasetTarget) {
      const dataset: Dataset = {
        file: this.selectedFile,
        name: this.datasetName.trim(),
        target: this.datasetTarget.trim()
      }
      this.dataService.upload(dataset).subscribe({
        next: res => {console.log('Uploaded!', res)},
        error: err => {
          console.error('Upload failed', err)
          this.errorDiv = err.statusText;
        }
      });
    } else {
      
    }
  }
}
