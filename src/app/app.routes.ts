import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component'
import { HomeComponent } from './home/home.component';
import { DatasetComponent } from './dataset/dataset.component';
import { AlgorithmComponent } from './algorithm/algorithm.component';
export const routes: Routes = [
    {path: "", component: HomeComponent},
    { path: "login", component: LoginComponent },
    { path: "dataset", component: DatasetComponent },
    { path: "algorithm", component: AlgorithmComponent }
];
