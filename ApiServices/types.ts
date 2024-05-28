

const TYPES = {
    DBClient: "DBClient",
    AWSClient: "AWSClient",
    AWSSESClient: "AWSSESClient",
    extendedValidator: "extendedValidator",


    UserRecord: "UserRecord",
    FacilityRecord: "FacilityRecord",
    FacilityHolidaysRecord: "FacilityHolidaysRecord",
    GlobalSlotConfigRecord: "GlobalSlotConfigRecord",
    GlobalBlockSlotRecord: "GlobalBlockSlotRecord",
    ClientRecord: "ClientRecord",
    ClientPersonalInfoRecord : "ClientPersonalInfoRecord",

    MedicalQuestionnaireRecord: "MedicalQuestionnaireRecord",
    ClientAccountRecord: "ClientAccountRecord",
    CategoryRecord: "CategoryRecord",
    ServiceRecord: "ServiceRecord",
    ServiceProviderRecord: "ServiceProviderRecord",
    TokenRecord: "TokenRecord",
    ResetPasswordRecord: "ResetPasswordRecord",
    ClientActivityLogRecord: "ClientActivityLogRecord",
    MedicalRecord: "MedicalRecord",
    SurgeryRecord: "SurgeryRecord",
    InterventionRecord: "InterventionRecord",
    ProgressReportRecord: "ProgressReportRecord",
    ProgressReportICDRecord: "ProgressReportICDRecord",
    ExerciseRecord: "ExerciseRecord",
    ROMRecord: "ROMRecord",
    SpecialTestRecord: "SpecialTestRecord",
    InterventionICDRecord: "InterventionICDRecord",
    InterventionCPTRecord: "InterventionCPTRecord",
    ProviderICDRecord: "ProviderICDRecord",
    DocumentRecord: "DocumentRecord",
    DryNeedlingRecord: "DryNeedlingRecord",
    ConcussionRecord: "ConcussionRecord",

    ProductRecord: "ProductRecord",
    StockIncomingRecord: "StockIncomingRecord",
    StockOutgoingRecord: "StockOutgoingRecord",

    ChartNoteActivityLogRecord: "ChartNoteActivityLogRecord",
    AppointmentRecord: "AppointmentRecord",
    SystemSettingRecord: "SystemSettingRecord",
    AppointmentSettingRecord: "AppointmentSettingRecord",
    MessageHistoryRecord: "MessageHistoryRecord",
    InvoiceRecord: "InvoiceRecord",
    ReceiptRecord: "ReceiptRecord",
    BillingAddressRecord: "BillingAddressRecord",
    CouponRecord: "CouponRecord",
    CouponServiceRecord: "CouponServiceRecord",

    InjuryFormRecord: "InjuryFormRecord",
    CertificationConsentFormRecord: "CertificationConsentFormRecord",
    AuthorizationRMIFormRecord: "AuthorizationRMIFormRecord",
    WaiverFormRecord: "WaiverFormRecord",

    RolesRecord: "RolesRecord",
    ConsultationDurationRecord: "ConsultationDurationRecord",
    ConsultationSessionRecord:"ConsultationSessionRecord",
    ConsultationExpiryRecord:"ConsultationExpiryRecord",

    LocationRecord: "LocationRecord",
    PhoneTypeRecord: "PhoneTypeRecord",
    EmploymentStatusRecord: "EmploymentStatusRecord",
    RelationshipRecord: "RelationshipRecord",
    GenderRecord: "GenderRecord",
    LanguageRecord: "LanguageRecord",
    MedicalHistoryRecord: "MedicalHistoryRecord",
    SurgicalHistoryRecord: "SurgicalHistoryRecord",
    MusculoSkeletalRecord: "MusculoSkeletalRecord",
    CommunicationRecord: "CommunicationRecord",
    ReferralRecord: "ReferralRecord",
    SocialMediaRecord: "SocialMediaRecord",
    CaseStatusRecord: "CaseStatusRecord",
    BodyPartsRecord: "BodyPartsRecord",
    BodySidesRecord: "BodySidesRecord",
    InjuryTypesRecord: "InjuryTypesRecord",
    ICDCodesRecord: "ICDCodesRecord",
    CPTCodesRecord: "CPTCodesRecord",
    MinuteRuleChartRecord: "MinuteRuleChartRecord",
    ProgressStatRecord: "ProgressStatRecord",
    DocumentTypeRecord: "DocumentTypeRecord",
    ConcussionTypeRecord: "ConcussionTypeRecord",
    AutoLockRecord: "AutoLockRecord",
    UnEditableRecord: "UnEditableRecord",
    AppointmentTypeRecord: "AppointmentTypeRecord",
    PurchasedBundlePackRecord: "PurchasedBundlePackRecord",
    PaymentModeRecord: "PaymentModeRecord",
    AppointmentStatusRecord: "AppointmentStatusRecord",
    FAQRecord: "FAQRecord",
    PrimaryReminderHoursRecord: "PrimaryReminderHoursRecord",
    SecondaryReminderHoursRecord: "SecondaryReminderHoursRecord",
    ReschedulingHoursRecord: "ReschedulingHoursRecord",
    ReschedulingTimesRecord: "ReschedulingTimesRecord",
    MentionsRecord: "MentionsRecord",
    ValidDaysRecord: "ValidDaysRecord",
    SpecialTestsMetaRecord: "SpecialTestsMetaRecord",
    DiscountTypeRecord: "DiscountTypeRecord",
    InterventionConfigurationRecord: "InterventionConfigurationRecord",
    ServiceCategoryConfigRecord : "ServiceCategoryConfigRecord",
    HeightUnitsRecord: "HeightUnitsRecord",
    WeightUnitsRecord: "WeightUnitsRecord",
    NameColorMetaRecord: "NameColorMetaRecord",

    LinkedProfileRecord: "LinkedProfileRecord",
    BillingSettingRecord : "BillingSettingRecord",
    ConsolidatedBillRecord : "ConsolidatedBillRecord",

    UserOtpRecord: "UserOtpRecord",
    NotificationTrackerRecord: "NotificationTrackerRecord",
    IdCounterRecord: "IdCounterRecord",




    // services


    MetaService: "MetaService",
    SlotConfigService: "SlotConfigService",
    MedicalRecordService : "MedicalRecordService",
    AppointmentService: "AppointmentService",

    AWSXRAY: "AWSXRAY",



    PerformanceRecord: "PerformanceRecord",
    PerformanceRecordService: "PerformanceRecordService",
    PerformanceActivityLogRecord: "PerformanceActivityLogRecord",
    
    PerformanceInterventionRecord : "PerformanceInterventionRecord",
    PerformanceInterventionService: "PerformanceInterventionService",
    PerformanceExerciseRecord: "PerformanceExerciseRecord",
    PerformanceDocumentRecord: "PerformanceDocumentRecord",
    PerformanceCPTCodeRecord: "PerformanceCPTCodeRecord",
    PerformanceROMRecord: "PerformanceROMRecord",
    PerformanceSpecialTestRecord: "PerformanceSpecialTestRecord",
    

}

export {
    TYPES
}