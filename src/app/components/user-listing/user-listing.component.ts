import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css'],
})
export class UserListingComponent implements AfterViewInit {
  constructor(private _AuthService: AuthService) {
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  loadUsers() {
    this._AuthService.getAll().subscribe((response) => {
      this.userList = response;
      this.dataSource = new MatTableDataSource(this.userList);
    });
  }
  deleteUser(code: any) {}
  updateUser(code: any) {}
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
