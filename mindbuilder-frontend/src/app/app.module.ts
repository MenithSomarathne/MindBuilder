import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SidebarComponent } from './components/admin-dashboard/sidebar/sidebar.component';
import { MainContentComponent } from './components/admin-dashboard/main-content/main-content.component';
import { HeaderComponent } from './components/admin-dashboard/header/header.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ParentManagementComponent } from './components/parent-management/parent-management.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import {IQGameListComponent} from './components/iq-game-list/iq-game-list.component';
import { LessonListComponent } from './components/lesson-list/lesson-list.component';
import { QuillModule } from 'ngx-quill';
import { AdminLessonListComponent } from './components/admin-lesson-list/admin-lesson-list.component';
import { LessonCardComponent } from './components/lesson-card/lesson-card.component';
import { LessonPreviewComponent } from './components/lesson-preview/lesson-preview.component';
import { AlphabetGameComponent } from './components/alphabet-game/alphabet-game.component';
import { NumberGameComponent } from './components/number-game/number-game.component';
import { ColorGameComponent } from './components/color-game/color-game.component';
import { AnimalGameComponent } from './components/animal-game/animal-game.component';
import { ShapeGameComponent } from './components/shape-game/shape-game.component';
import { MemoryGameComponent } from './components/memory-game/memory-game.component';
import { GameContainerComponent } from './components/game-container/game-container.component';
import { LoginComponent } from './components/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { MainStudentComponent } from './components/main-student/main-student.component';
import { ParentDashboardComponent } from './components/parent-dashboard/parent-dashboard.component';
import { MainParentComponent } from './components/main-parent/main-parent.component';
import { MainTeacherComponent } from './components/main-teacher/main-teacher.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { ParentLessonCardComponent } from './components/parent-lesson-card/parent-lesson-card.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StudentLessonsCardsComponent } from './components/student-lessons-cards/student-lessons-cards.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    HeaderComponent,
    SidebarComponent,
    MainContentComponent,
    StudentListComponent,
    ParentManagementComponent,
    TeacherListComponent,
    IQGameListComponent,
    LessonListComponent,
    AdminLessonListComponent,
    LessonCardComponent,
    LessonPreviewComponent,
    AlphabetGameComponent,
    NumberGameComponent,
    ColorGameComponent,
    AnimalGameComponent,
    ShapeGameComponent,
    MemoryGameComponent,
    GameContainerComponent,
    LoginComponent,
    StudentDashboardComponent,
    MainStudentComponent,
    ParentDashboardComponent,
    MainParentComponent,
    MainTeacherComponent,
    TeacherDashboardComponent,
    ParentLessonCardComponent,
    StudentLessonsCardsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    QuillModule.forRoot(),
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,

    }),
    MatSnackBarModule,
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
