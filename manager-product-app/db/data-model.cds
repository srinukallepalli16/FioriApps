namespace manager;

entity Managers {
  key ID     : UUID;
      name   : String;
      email  : String;
      employees : Composition of many Employees on employees.manager = $self;
}

entity Employees {
  key ID     : UUID;
      name   : String;
      manager : Association to Managers;
}

entity Products {
  key code   : String(10);
      name   : String;
}

entity ProductSupports {
  key ID         : UUID;
      employee   : Association to Employees;
      product    : Association to Products;
}
