annotate studentServices.student with @(UI: {

    LineItem: [
        { $Type: 'UI.DataField', Value: first_name },
        { $Type: 'UI.DataField', Value: last_name }
    ],

    FieldGroup #studentdata: {
        $Type: 'UI.FieldGroupType',
        Data: [
            { $Type: 'UI.DataField', Value: first_name },
            { $Type: 'UI.DataField', Value: last_name }
        ]
    },

    FieldGroup #Admindata: {
        $Type: 'UI.FieldGroupType',
        Data: [
            { $Type: 'UI.DataField', Value: createdBy },
            { $Type: 'UI.DataField', Value: createdAt },
            { $Type: 'UI.DataField', Value: modifiedBy },
            { $Type: 'UI.DataField', Value: modifiedAt }
        ]
    },

    Facets: [
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : 'Student Details',
            Target : '@UI.FieldGroup#studentdata'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : 'Admin Data',
            Target : '@UI.FieldGroup#Admindata'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : 'Student Marks',
            Target : 'marks/@UI.FieldGroup#marks'
        }
    ]
});
