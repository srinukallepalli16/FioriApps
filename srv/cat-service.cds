using {my.bookshop as my} from '../db/schema';
service Catalog {
 entity Books as projection on my.Books;
}