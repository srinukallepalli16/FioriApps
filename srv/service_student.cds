// using {studentbd} from '../db/student_db';

// service studentServices {
//     @odata.draft.enabled
//     entity student as projection on studentbd.student;
//     @odata.draft.enabled
//     entity student_marks as projection on studentbd.marks

//     // entity students as select from studentbd.student;

//     // @data.draft.enabled
//     // entity studentmarks as select from studentbd.marks;
// // entity studentmarksss as projection on studentbd.marks;

// }

// annotate studentbd.student with @(UI: {
//     LineItem               : [
//         {
//             $Type: 'UI.DataField',
//             Value: first_name
//         },
//         {
//             $Type: 'UI.DataField',
//             Value: last_name
//         }
//     ],
//     FieldGroup #studentdata: {
//         $Type: 'UI.FieldGroupType',
//         Data : [
//             {
//                 $Type: 'UI.DataField',
//                 Value: first_name
//             },
//             {
//                 $Type: 'UI.DataField',
//                 Value: last_name
//             }
//         ]
//     },
//     FieldGroup #Admindata  : {
//         $Type: 'UI.FieldGroupType',
//         Data : [
//             {
//                 $Type: 'UI.DataField',
//                 Value: createdBy
//             },
//             {
//                 $Type: 'UI.DataField',
//                 Value: createdAt
//             },
//             {
//                 $Type: 'UI.DataField',
//                 Value: modifiedBy
//             },
//             {
//                 $Type: 'UI.DataField',
//                 Value: modifiedAt
//             }
//         ]
//     },
//     Facets                 : [
//         {
//             $Type : 'UI.ReferenceFacet',
//             Target: @UI.FieldGroup #studentdata,
//             Label : 'student_details'
//         },
//         {
//             $Type : 'UI.ReferenceFacet',
//             Target: '@UI.FieldGroup#Admindata',
//             Label : 'Admin Data'
//         },
//     ]
// }) {
//     first_name @title: 'First Name';
//     last_name  @title: 'Last Name';
// }


// annotate studentbd.marks with @(

// UI: {
//     ListItems        : [
//         {
//             $Type: 'UI.DataField',
//             Value: telugu
//         },
//         {
//             $Type: 'UI.DataField',
//             Value: hindi
//         },
//         {
//             $Type: 'UI.DataField',
//             Value: english
//         },
//         {
//             $Type: 'UI.DataField',
//             Value: science
//         },
//         {
//             $Type: 'UI.DataField',
//             Value: maths
//         },
//         {
//             $Type: 'UI.DataField',
//             Value: social
//         }

//     ],

//     FieldGroup #marks: {
//         $Type: 'UI.FieldGroupType',
//         Data : [
//             {
//                 $Type: 'UI.DataField',
//                 Value: telugu
//             },
//             {
//                 $Type: 'UI.DataField',
//                 Value: hindi
//             },
//             {
//                 $Type: 'UI.DataField',
//                 Value: english
//             },
//             {
//                 $Type: 'UI.DataField',
//                 Value: maths
//             },
//             {
//                 $Type: 'UI.DataField',
//                 Value: science
//             },
//             {
//                 $Type: 'UI.DataField',
//                 Value: social
//             }
//         ]
//     },

//     Facets           : [{
//         $Type : 'UI.ReferenceFacet',
//         Target: '@UI.FieldGroup#marks',
//         Label : 'Student Marks'
//     }],
// }


// )

// {
//     telugu  @title: 'telugu';
//     hindi   @title: 'hindi';
//     english @title: 'english';
//     maths   @title: 'maths';
//     science @title: 'science';
//     social  @title: 'social'
// }



using { studentbd } from '../db/student_db';

service studentServices {

    @odata.draft.enabled
    entity student as projection on studentbd.student {
        *,
        marks
    };

}
