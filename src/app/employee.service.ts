import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }


public tryThis(){
  return this.http.get(`${this.apiServerUrl}/trythis`);
}


public testingOnly(){
  const requestHeader = new HttpHeaders(
    {Authorization :'Basic ' + btoa("Admin:12345")}
  );
    return this.http.get(`${this.apiServerUrl}/`,{headers:requestHeader,responseType:'text' as 'json'});
}

public searchEmployee(firstname : string) : Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/search?name=${firstname}`);
}

public getEmployees() : Observable<Employee[]>{
   return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
 }
 public getEmployeeById(employeeId : number) : Observable<Employee>{
  return this.http.get<Employee>(`${this.apiServerUrl}/employee/${employeeId}`);
}
public updateEmployees(employee : Employee) : Observable<Employee>{
  return this.http.patch<Employee>(`${this.apiServerUrl}/employee/update`, employee);
}
public deleteEmployees(employeeId : number) : Observable<void>{
  return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
}

}
