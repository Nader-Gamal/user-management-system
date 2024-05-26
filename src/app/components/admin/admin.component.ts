import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { UpdateuserComponent } from '../updateuser/updateuser.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements AfterViewInit {
  constructor(
    private _AuthService: AuthService,
    private _MatDialog: MatDialog,
    private _ToastrService: ToastrService
  ) {
    this.loadUsers();
  }

  displayedColumns: string[] = [
    'userName',
    'Name',
    'Email',
    'Role',
    'Statues',
    'Action',
  ];
  dataSource: any;
  userList: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadUsers() {
    this._AuthService.getAll().subscribe((response) => {
      this.userList = response;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  updateUser(code: any) {
    const dialogRef = this._MatDialog.open(UpdateuserComponent, {
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
        this.loadUsers(); // Reload the users to update the table
      }
    });
  }

  deleteUser(code: any) {
    const dialogRef = this._MatDialog.open(ConfirmDeleteComponent, {
      width: '250px',
      data: { id: code },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._AuthService.deleteUser(code).subscribe(
          (response) => {
            this._ToastrService.success('User deleted successfully');
            this.loadUsers(); // Reload the users to update the table
          },
          (error) => {
            this._ToastrService.error('Failed to delete user');
          }
        );
      }
    });
  }

  addUser() {
    const dialogRef = this._MatDialog.open(AddUserComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._ToastrService.success('User added successfully');
        this.loadUsers(); // Reload the users to update the table
      }
    });
  }
}
