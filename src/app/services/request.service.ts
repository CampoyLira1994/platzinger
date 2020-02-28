import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private angularFireDataBase:AngularFireDatabase) { }
  
  createRequest(request){
    const clearEmail = request.recever_email.remplace('.',',');
    return this.angularFireDataBase.object('request/'+clearEmail+'/'+request.sender).set(request);
  }
  
  setRequestStatus(request,status){
    const clearEmail = request.recever_email.remplace('.',',');
    return this.angularFireDataBase.object('request/'+clearEmail+'/'+request.sender+'/status').set(status);
  }

  getRequestsForEmail(email){
    const clearEmail = email.remplace('.',',');
    return this.angularFireDataBase.list('request/'+clearEmail);
  }
}
