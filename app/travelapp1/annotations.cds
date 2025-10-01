using TravelService as service from '../../srv/travel-service';
using from '../../db/schema';


annotate service.Travel with @(
    UI.SelectionFields: [
        to_Agency.AgencyID,
        to_Customer.CustomerID,
        TravelStatus.code,
    ],
    UI.LineItem:[
        {
            $Type : 'UI.DataField',
            Value : TravelID,
            Label : 'Travel Id',
        },
        {
            $Type : 'UI.DataField',
            Value : TravelStatus_code,
            Criticality : TravelStatus.criticality,
            Label : 'Travel Status'
        },
        {
            $Type : 'UI.DataField',
            Value : BeginDate,
            Label : 'Begin Date'
        },
        {
            $Type : 'UI.DataField',
            Value : EndDate,
            Label : 'End Date'
        },
        {
            $Type : 'UI.DataField',
            Value : to_Agency_AgencyID,
            Label : 'Agency Id'
        },
        {
            $Type : 'UI.DataField',
            Value : to_Customer_CustomerID,
            Label : 'Customer Id'
        },{
            $Type : 'UI.DataField',
            Value : TotalPrice,
            Label : 'Total Price'
        },{
            $Type : 'UI.DataFieldForAction',
            Label : 'AcceptTravel',
            Action : 'TravelService.acceptTravel',
        },{
            $Type : 'UI.DataFieldForAction',
            Label: 'RejectTravel',
            Action : 'TravelService.rejectTravel',
        },

    ],
    UI.HeaderInfo : {
        TypeName : 'Travel',
        TypeNamePlural : 'Travels',
        Title : {
            $Type : 'UI.DataField',
            Value : TravelID,
        },
        Description : {
            $Type : 'UI.DataField',
            Value : Description,
        },
        ImageUrl: 'https://media.licdn.com/dms/image/v2/C4D0BAQGcd6NnLDSavw/company-logo_200_200/company-logo_200_200/0/1630510008066/vkollab_technologies_logo?e=2147483647&v=beta&t=NfG__BoJPWlS7nzs3k49jdebGhcboR4R79z02AoLbBI',
        
    },
    UI.Facets:[
        {
            $Type : 'UI.CollectionFacet',
            Label : 'Travel',
            ID : 'Travel',
            Facets : [
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : '{i18n>Travel}',
                    ID : 'Travel1',
                    Target : '@UI.FieldGroup#Travel',
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : '{i18n>PricesDetails}',
                    ID : 'PricesDetails',
                    Target : '@UI.FieldGroup#PricesDetails',
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : '{i18n>Dates}',
                    ID : 'Dates',
                    Target : '@UI.FieldGroup#Dates',
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : '{i18n>Sustainability}',
                    ID : 'Sustainability',
                    Target : '@UI.FieldGroup#Sustainability',
                },
            ],
        },
    ],
    UI.Identification : [
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'TravelService.acceptTravel',
            Label : 'Accept Travel',
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'TravelService.rejectTravel',
            Label : 'Reject Travel',
        },
    ],
    UI.FieldGroup #Travel : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : TravelID,
                Label : 'TravelID',
            },
            {
                $Type : 'UI.DataField',
                Value : to_Agency_AgencyID,
                Label : 'to_Agency_AgencyID',
            },
            {
                $Type : 'UI.DataField',
                Value : to_Customer_CustomerID,
                Label : 'to_Customer_CustomerID',
            },
            {
                $Type : 'UI.DataField',
                Value : TravelStatus_code,
                Label : 'TravelStatus_code',
            },
        ],
    },
    UI.FieldGroup #PricesDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : BookingFee,
                Label : 'BookingFee',
            },
            {
                $Type : 'UI.DataField',
                Value : TotalPrice,
                Label : 'TotalPrice',
            },
        ],
    },
    UI.FieldGroup #Dates : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : BeginDate,
                Label : 'BeginDate',
            },
            {
                $Type : 'UI.DataField',
                Value : EndDate,
                Label : 'EndDate',
            },
        ],
    },
    UI.FieldGroup #Sustainability : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : GoGreen,
                Label : 'GoGreen',
            },
            {
                $Type : 'UI.DataField',
                Value : GreenFee,
                Label : 'GreenFee',
            },
            {
                $Type : 'UI.DataField',
                Value : TreesPlanted,
                Label : 'TreesPlanted',
            },
        ],
    },
);









