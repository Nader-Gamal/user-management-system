// user.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserViewComponent } from '../user-view/user-view.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'role',
    'statues',
    'action',
  ];
  dataSource: MatTableDataSource<any>;

  constructor(
    private authService: AuthService,
    private _MatDialog: MatDialog,
    private _ToastrService: ToastrService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const userId = sessionStorage.getItem('username') || '';
    this.authService.getByCode(userId).subscribe((user) => {
      this.dataSource.data = [user]; // Wrap the user in an array
    });
  }

  updateUser(code: any) {
    const dialogRef = this._MatDialog.open(UserViewComponent, {
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      width: '50%',
      data: {
        userCode: code,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._ToastrService.success('User updated successfully');
        this.loadUserData(); // Reload the users to update the table
      }
    });
  }
}
