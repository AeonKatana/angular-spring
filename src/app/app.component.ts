import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public employees : Employee[] = [];
  public hello : string = "Hello World!";
  public viewemployee : any;
  public count : number = 0;


  constructor(private employeeService : EmployeeService){}

  ngOnInit(): void {
    this.getEmployees();
  }

  public changeProperty(): void{
     this.hello = "Property Changed!";
  }
  public countInc(): void{
     this.count++;
  }
  public countDec(): void{
    this.count--;
 }

 public trythis(){
   this.employeeService.tryThis().subscribe(
     (response) =>{
        console.log(response)
     },
     (error) =>{
       console.log(error);
     }
   )
 }

 public testonly(){
    this.employeeService.testingOnly().subscribe(
      (response)=>{
        console.log(response);
      },
      (error) =>{
        console.log(error);
      }
    );
 }


  public searchEmployees(key: string):void{
    this.employeeService.searchEmployee(key).subscribe(
      (response : Employee[]) => {
        if(response.length === 0 || !key || response == null){
          this.getEmployees();
        }else{
          this.employees = response;
        }

      }
    )

  }

  public getEmployees() : void{
    this.employeeService.getEmployees().subscribe({
      next : (response : Employee[]) =>{
        this.employees = response;
      },
      error : (error : HttpErrorResponse) =>{
        alert(error.message);
      },
      complete : () =>{
        console.log("Complete");
      }
    });
  }

  public deleteEmployee(id : number) : void{
      this.employeeService.deleteEmployees(id).subscribe(
        () =>{
          this.getEmployees();
        }
      )

  }

  public editEmployee(employee : NgForm) : void{
      this.employeeService.updateEmployees(employee.value).subscribe({
        next : (response : Employee) => {
          this.getEmployees();
          $("#testingonly").text("This text is now changed!");
          console.log(employee.value);
        },
        error : (e : HttpErrorResponse) =>{
          alert(e.message);
        },
        complete : () =>{
          console.log("Complete");
        }
      });
  }

  public editModal(employee : Employee) : void{
      this.viewemployee = employee;
  }
  public addModal() : void{
    this.viewemployee = null;
}



}
