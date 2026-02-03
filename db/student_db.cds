// namespace studentbd;
// using {cuid, managed  } from '@sap/cds/common';
// entity student : cuid, managed{

//     first_name : String(250);
//     last_name : String(250);
// }
// entity marks : cuid ,managed {
//     // cuid : Association to student;
//     english  :Int16;
//     telugu   : Int16;
//     hindi    : Int16;
//     maths   : Int16;
//     science  : Int16;
//     social    : Int16
// }

namespace studentbd;

entity student {
    key ID        : UUID;
    first_name    : String(50);
    last_name     : String(50);
    createdAt    : Timestamp;
    createdBy    : String;
    modifiedAt   : Timestamp;
    modifiedBy   : String;

    marks : Composition of one marks
        on marks.student = $self;
}
entity marks {
    key ID      : UUID;
    telugu      : Integer;
    hindi       : Integer;
    english     : Integer;
    maths       : Integer;
    science     : Integer;
    social      : Integer;

    student : Association to student;
}
