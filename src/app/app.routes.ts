import { Routes } from '@angular/router';
import { DatasetComponent } from './features/ML/pages/dataset/dataset.component';
import { AlgorithmComponent } from './features/ML/pages/algorithm/algorithm.component';
import { MLModelComponent } from './features/ML/pages/ml-model/ml-model.component';
import { LoginComponent } from './features/Authentication/pages/login/login.component';
import { SignupComponent } from './features/Authentication/pages/signup/signup.component';
import { HomeComponent } from './features/home/home.component';
import { RunModelComponent } from './features/ML/pages/run-model/run-model.component';
import { authGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './features/ML/pages/dashboard/dashboard.component';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "signup", component: SignupComponent },
    { path: "login", component: LoginComponent },
    {
        path: "ml", component: DashboardComponent, canActivate: [authGuard],
        children: [
            {path: "", redirectTo: "dataset", pathMatch: "full"},
            { path: "dataset", component: DatasetComponent },
            { path: "algorithm", component: AlgorithmComponent, canActivate: [adminGuard] },
            { path: "model", component: MLModelComponent },
            { path: "run", component: RunModelComponent}
        ]
    }
];
