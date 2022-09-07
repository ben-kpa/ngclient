import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {RgComponent} from "./auth/rg/rg.component";
import {LgComponent} from "./auth/lg/lg.component";


const routes: Routes = [
    { path: 'auth', component: AuthComponent },
    {path: 'rg', component: RgComponent},
    {path: 'lg', component: LgComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
