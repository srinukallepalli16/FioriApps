using { my.bookshop as my } from '../db/schema.cds';

service CatalogService {
 entity Book as projection on my.Book;
}