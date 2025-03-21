import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([
    { name: 'Robert', email: 'robert@gmail.com', role: 'Admin' },
    { name: 'Marcos', email: 'marcos@yahoo.com', role: 'Editor' },
    { name: 'Nina', email: 'nina@gmail.com', role: 'Viewer' },
    { name: 'Robert', email: 'robert@gmail.com', role: 'Admin' },
    { name: 'Marcos', email: 'marcos@yahoo.com', role: 'Editor' },
    { name: 'Nina', email: 'nina@gmail.com', role: 'Viewer' },
    { name: 'Robert', email: 'robert@gmail.com', role: 'Admin' },
    { name: 'Marcos', email: 'marcos@yahoo.com', role: 'Editor' },
    { name: 'Nina', email: 'nina@gmail.com', role: 'Viewer' },
    { name: 'Robert', email: 'robert@gmail.com', role: 'Admin' },
    { name: 'Marcos', email: 'marcos@yahoo.com', role: 'Editor' },
    { name: 'Nina', email: 'nina@gmail.com', role: 'Viewer' },
    { name: 'Robert', email: 'robert@gmail.com', role: 'Admin' },
    { name: 'Marcos', email: 'marcos@yahoo.com', role: 'Editor' },
    { name: 'Nina', email: 'nina@gmail.com', role: 'Viewer' },
  ]);

  users$: Observable<User[]> = this.usersSubject.asObservable();

  addUser(user: User) {
    console.log(user);
    const currentUsers = this.usersSubject.getValue();
    this.usersSubject.next([...currentUsers, user]);
  }

  getRoleDistribution() {
    const roles = this.usersSubject.getValue().map(user => user.role);
    return roles.reduce((acc: any, role) => {
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {});
  }
}
