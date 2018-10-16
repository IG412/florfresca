import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

export class Session {
  public token: string;
  public id: string;
}

@Injectable()
export class AuthService implements CanActivate {
  private currentSession : Session = null;
	constructor(
		private router: Router
  ){
    this.currentSession = new Session();
    this.currentSession.id = localStorage.getItem('id');
    this.currentSession.token = localStorage.getItem('token');
	}
  	canActivate() {
    	if (this.isAuthenticated()) {
          return true;
      }
      this.router.navigate(['/login']);
        return false;
    }
    // setCurrentSession(session: Session): void {
    //   this.currentSession = session;
    //   localStorage.setItem('currentUser', JSON.stringify(session));
    // }
    // loadSessionData(): Session{
    //   var sessionStr = localStorage.getItem('currentUser');
    //   return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
    // }
    getCurrentSession(): Session {
      return this.currentSession;
    }
    isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
    }
    getCurrentToken(): string {
      var session = this.getCurrentSession();
      return (session && session.token) ? session.token : null;
    }
}