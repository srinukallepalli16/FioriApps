namespace employeedb;

entity users{
    key ID: Integer;
    username:String;
    password:String;
    role:String
}
entity Employees {
    key EMPID:Integer;
    name:String;
    designation:String;
    department:String;
}
