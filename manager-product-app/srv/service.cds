using manager from '../db/data-model';

service ManagerService {
  entity Managers as projection on manager.Managers;
  entity Employees as projection on manager.Employees;
  entity Products as projection on manager.Products;
  entity ProductSupports as projection on manager.ProductSupports;
}
