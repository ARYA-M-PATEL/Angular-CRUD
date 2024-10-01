// src/app/user-list/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { user } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: user[] = [];
  selectedUser: user | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  selectUser(user: user): void {
    // Clone the user to avoid direct mutations
    this.selectedUser = user ? { ...user } : null;
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id);
    }
  }

  onSave(user: user): void {
    if (user.id) {
      this.userService.updateUser(user);
    } else {
      this.userService.addUser(user);
    }
    this.selectedUser = null;
  }

  onCancel(): void {
    this.selectedUser = null;
  }
}
