interface Patient {
  patientDoctype: string;
  patientDocument: string;
  patientCompanyCode: string;
  patientCompanyDescription: string;
  patientFirstName: string;
  patientSecondName: string;
  patientSurname: string;
  patientLastname: string;
  patientAge: string;
  patientGender: string;
  diagnosisCode: string | null;
  diagnosisDescription: string | null;
  admissions?: AdmissionsPatient
}
