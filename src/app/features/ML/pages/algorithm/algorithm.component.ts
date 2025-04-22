import { Component, inject } from '@angular/core';
import { AlgorithmInfo } from '../../types/algorithms.type';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlgorithmService } from '../../services/algorithm.service';

@Component({
  selector: 'app-algorithm',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './algorithm.component.html',
  styleUrl: './algorithm.component.scss'
})
export class AlgorithmComponent {
  algorithms: AlgorithmInfo[] = [];
  algoService = inject(AlgorithmService);
  fb = inject(FormBuilder);
  
  taskTypes = [
    'Classification',
    'Regression',
    'Clustering',
    'Dimensionality Reduction',
    'Anomaly Detection',
    'Model Selection',
    'Preprocessing'
  ];
  
  algorithmForm = this.fb.group({
    algorithm_name: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
    lib_class: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
    task_type: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
    description: [''],
    default_params: ['']
  });
  

  addAlgorithm() {
    if (this.algorithmForm.valid) {
      const formValue = this.algorithmForm.value;

      if (!formValue.algorithm_name || !formValue.lib_class || !formValue.task_type) {
        alert('Required fields are missing');
        return;
      }
      // Parse the JSON string to an object for default_params
      let defaultParams = null;
      if (formValue.default_params) {
        try {
          defaultParams = JSON.parse(formValue.default_params);
        } catch (e) {
          alert('Invalid JSON format for default parameters');
          return;
        }
      }
      
      const algorithm: AlgorithmInfo = {
        algorithm_name: formValue.algorithm_name,
        lib_class: formValue.lib_class,
        task_type: formValue.task_type,
        description: formValue.description || null,
        default_params: defaultParams
      }
      
      this.algoService.createAlgorithm(algorithm).subscribe({
        next: (result) => {
          console.log('Algorithm created successfully', result);
          this.algorithmForm.reset();
          this.getAlgos();
        },
        error: (err) => console.error('Error creating algorithm', err)
      });
    }
  }
  ngOnInit() {
    this.getAlgos();
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

  deleteAlgorithm(id: string): void{
    this.algoService.deleteAlgo(id).subscribe({
      next: responst => {
        this.getAlgos();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
