import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import {MainContentComponent} from './components/admin-dashboard/main-content/main-content.component';
import {ParentManagementComponent} from './components/parent-management/parent-management.component';
import {TeacherListComponent} from './components/teacher-list/teacher-list.component';
import {IQGameListComponent} from './components/iq-game-list/iq-game-list.component';
import {LessonListComponent} from './components/lesson-list/lesson-list.component';
import {AdminLessonListComponent} from './components/admin-lesson-list/admin-lesson-list.component';
import {LessonPreviewComponent} from './components/lesson-preview/lesson-preview.component';
import {GameContainerComponent} from './components/game-container/game-container.component';
import {LoginComponent} from './components/login/login.component';
import {StudentDashboardComponent} from './components/student-dashboard/student-dashboard.component';
import {MainStudentComponent} from './components/main-student/main-student.component';
import {ParentDashboardComponent} from './components/parent-dashboard/parent-dashboard.component';
import {MainParentComponent} from './components/main-parent/main-parent.component';
import {MainTeacherComponent} from './components/main-teacher/main-teacher.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'students',
        component: StudentListComponent
      },
      {
        path: 'parents',
        component: ParentManagementComponent
      },
      {
        path: 'teachers',
        component: TeacherListComponent
      },
      {
        path: 'games',
        component: IQGameListComponent
      },
      {
        path: 'lessons',
        component: LessonListComponent
      },
      {
        path: 'admin-lessons',
        component: AdminLessonListComponent
      },
      {
        path: 'lessons/:id',
        component: LessonPreviewComponent
      },
      { path: 'games/:gameId', component: GameContainerComponent },
      { path: 'games', redirectTo: 'games/1', pathMatch: 'full' },
      {
        path: '',
        component: MainContentComponent
      }
    ]
  },
  {
    path: 'student',
    component: StudentDashboardComponent,
    children: [
      {
        path: 'games',
        component: IQGameListComponent
      },
      {
        path: 'lessons',
        component: LessonListComponent
      },
      {
        path: '',
        component: MainStudentComponent
      },

      { path: 'games/:gameId', component: GameContainerComponent },
      { path: '', redirectTo: 'games', pathMatch: 'full' }
    ]
  },
  {
    path: 'parent',
    component: ParentDashboardComponent,
    children: [
      {
        path: 'games',
        component: IQGameListComponent
      },
      {
        path: '',
        component: MainParentComponent
      },
      {
        path: 'student',
        component: StudentListComponent
      },
      {
        path: 'lessons/:id',
        component: LessonPreviewComponent
      },
      { path: 'games/:gameId', component: GameContainerComponent },
      { path: '', redirectTo: 'games', pathMatch: 'full' }
    ]
  },
  {
    path: 'teacher',
    component: ParentDashboardComponent,
    children: [
      {
        path: 'students',
        component: StudentListComponent
      },
      {
        path: 'parents',
        component: ParentManagementComponent
      },
      {
        path: 'games',
        component: IQGameListComponent
      },
      {
        path: 'lessons',
        component: LessonListComponent
      },
      {
        path: 'lessons/:id',
        component: LessonPreviewComponent
      },
      { path: 'games/:gameId', component: GameContainerComponent },
      { path: 'games', redirectTo: 'games/1', pathMatch: 'full' },
      {
        path: '',
        component: MainTeacherComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
