import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: false,
})
export class SidebarComponent {
  @Input() collapsed = false;

  userRole: string | null = null;
  isStudent = false;
  isParent = false;
  isTeacher = false;
  isAdmin = false;

  ngOnInit() {
    const userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
      const user = JSON.parse(userDetails);
      this.userRole = user.role;
      console.log('User role:', this.userRole);
      this.isStudent = this.userRole === 'STUDENT';
      this.isParent = this.userRole === 'PARENT';
      this.isTeacher = this.userRole === 'TEACHER';
      this.isAdmin = this.userRole === 'ADMIN';
      console.log('Is student:', this.isStudent);
      console.log('Is parent:', this.isParent);
    }
  }
}
