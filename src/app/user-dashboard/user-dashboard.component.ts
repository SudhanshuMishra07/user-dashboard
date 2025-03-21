import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserService, User } from '../services/user.service';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-user-dashboard',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule, MatPaginatorModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'role'];
  dataSource = new MatTableDataSource<User>();
  chart: any;
  pageSize=8;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit() {
    this.userService.users$.subscribe((users) => {
      console.log(users)
      console.log(users.length)
      const blanks = Array(users.length%this.pageSize).fill(null);
      this.dataSource.data = [...users,...blanks];
      this.updateChart();
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openAddUserForm() {
    import('../add-user/add-user.component').then(({ AddUserComponent }) => {
      this.dialog.open(AddUserComponent);
    });
  }

  updateChart() {
    const data = this.userService.getRoleDistribution();
    const chartData = {
      labels: Object.keys(data),
      datasets: [{ data: Object.values(data), backgroundColor: ['#4caf50', '#2196f3', '#f44336'] }],
    };

    if (this.chart) this.chart.destroy();

    this.chart = new Chart('userChart', {
      type: 'pie',
      data: chartData,
    });
  }
  
}