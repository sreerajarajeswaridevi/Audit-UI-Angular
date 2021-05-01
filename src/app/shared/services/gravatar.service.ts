import { Injectable } from '@angular/core';
import * as md5 from 'md5';

@Injectable({
  providedIn: 'root'
})
export class GravatarService {

  constructor() { }

  getUserGravatar(username: string) {
    if (username) {
      return `https://www.gravatar.com/avatar/${md5(username)}`;
    }
  }
}
