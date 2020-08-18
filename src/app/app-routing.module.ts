import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnicornListComponent } from './pages/unicorn-list/unicorn-list.component';
import { UnicornComponent } from './pages/unicorn/unicorn.component';
import { AgeGuard } from './pages/unicorn/age.guard';

const routes: Routes = [
    { path: '', component: UnicornListComponent },
    { path: 'unicorn/:id', component: UnicornComponent, canActivate: [AgeGuard] },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
