// src/app/user.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { user } from './user'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: user[] = [];
  private usersSubject: BehaviorSubject<user[]> = new BehaviorSubject(
    this.users
  );

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
      this.usersSubject.next(this.users);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  getUsers(): Observable<user[]> {
    return this.usersSubject.asObservable();
  }

  addUser(user: user): void {
    user.id = this.generateId();
    this.users.push(user);
    this.updateUsers();
  }

  updateUser(updatedUser: user): void {
    const index = this.users.findIndex((u) => u.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.updateUsers();
    }
  }

  deleteUser(id: number): void {
    this.users = this.users.filter((u) => u.id !== id);
    this.updateUsers();
  }

  private generateId(): number {
    return this.users.length > 0
      ? Math.max(...this.users.map((u) => u.id)) + 1
      : 1;
  }

  private updateUsers(): void {
    this.usersSubject.next(this.users);
    this.saveToLocalStorage();
  }
}
