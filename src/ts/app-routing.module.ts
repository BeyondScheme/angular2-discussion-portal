import {DashboardComponent} from "./dashboard/components/dashboard.component";
import {PostComponent} from "./post/components/post.component";
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "/dashboard",
    },
    {
        component: DashboardComponent,
        path: "dashboard",
    },
    {
        component: PostComponent,
        path: "posts/:id",
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {
}

export const routedComponents = [DashboardComponent, PostComponent];
