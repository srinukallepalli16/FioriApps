using {employeedb} from '../db/employeedb';

service EmpService  {

    entity Users as projection on employeedb.users;
    entity Employees as projection on employeedb.Employees;

}