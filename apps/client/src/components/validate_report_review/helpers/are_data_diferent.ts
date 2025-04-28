export const areDataDifferent = (
  initialData: {
    dataCaseTypeId: number;
    dataOriginId: number;
    dataSubOriginId: number;
    dataOriginServiceId: number;
    dataReportingServiceId: number;
    dataAdmConsecutivePatient: number | null;
    dataFolioPatient: string | null;
    dataEventTypeId: number;
    dataEventId: number;
    dataDescriptionOthers: string | null;
    dataRiskLevelId: number | null;
    dataSeverityClasificationId: number | null;
    dataDescriptionCase: string;
    dataInmediateActions: string | null;
    dataCharacterizationCaseId: number | null;
    dataInfoprovidedFamily: boolean;
    dataClinicalFollowRequired: boolean;
    dataObservationsCharacterization: string | null;
    dataMedicines: { drugCode: string; drugDescription: string }[];
    dataDevices: { deviceCode: string; deviceDescription: string }[];
  },
  currentData: {
    dataCaseTypeId: number;
    dataOriginId: number;
    dataSubOriginId: number;
    dataOriginServiceId: number;
    dataReportingServiceId: number;
    dataAdmConsecutivePatient: number | null;
    dataFolioPatient: string | null;
    dataEventTypeId: number;
    dataEventId: number;
    dataDescriptionOthers: string | null;
    dataRiskLevelId: number | null;
    dataSeverityClasificationId: number | null;
    dataDescriptionCase: string;
    dataInmediateActions: string | null;
    dataCharacterizationCaseId: number | null;
    dataInfoprovidedFamily: boolean;
    dataClinicalFollowRequired: boolean;
    dataObservationsCharacterization: string | null;
    dataMedicines: { drugCode: string; drugDescription: string }[];
    dataDevices: { deviceCode: string; deviceDescription: string }[];
  }
): boolean => {
  return (
    initialData.dataCaseTypeId !== currentData.dataCaseTypeId ||
    initialData.dataOriginId !== currentData.dataOriginId ||
    initialData.dataSubOriginId !== currentData.dataSubOriginId ||
    initialData.dataOriginServiceId !== currentData.dataOriginServiceId ||
    initialData.dataReportingServiceId !== currentData.dataReportingServiceId ||
    (initialData.dataAdmConsecutivePatient ?? 0) !==
      (currentData.dataAdmConsecutivePatient ?? 0) ||
    (initialData.dataFolioPatient ?? "") !==
      (currentData.dataFolioPatient ?? "") ||
    initialData.dataEventTypeId !== currentData.dataEventTypeId ||
    initialData.dataEventId !== currentData.dataEventId ||
    (initialData.dataDescriptionOthers ?? "") !==
      (currentData.dataDescriptionOthers ?? "") ||
    (initialData.dataRiskLevelId ?? 0) !== (currentData.dataRiskLevelId ?? 0) ||
    (initialData.dataSeverityClasificationId ?? 0) !==
      (currentData.dataSeverityClasificationId ?? 0) ||
    initialData.dataDescriptionCase !== currentData.dataDescriptionCase ||
    (initialData.dataInmediateActions ?? "") !==
      (currentData.dataInmediateActions ?? "") ||
    (initialData.dataCharacterizationCaseId ?? 0) !==
      (currentData.dataCharacterizationCaseId ?? 0) ||
    initialData.dataInfoprovidedFamily !== currentData.dataInfoprovidedFamily ||
    initialData.dataClinicalFollowRequired !==
      currentData.dataClinicalFollowRequired ||
    (initialData.dataObservationsCharacterization ?? "") !==
      (currentData.dataObservationsCharacterization ?? "") ||
    initialData.dataMedicines.length !== currentData.dataMedicines.length ||
    initialData.dataMedicines.some(
      (med, index) =>
        med.drugCode !== currentData.dataMedicines[index]?.drugCode ||
        med.drugDescription !==
          currentData.dataMedicines[index]?.drugDescription
    ) ||
    initialData.dataDevices.length !== currentData.dataDevices.length ||
    initialData.dataDevices.some(
      (dev, index) =>
        dev.deviceCode !== currentData.dataDevices[index]?.deviceCode ||
        dev.deviceDescription !==
          currentData.dataDevices[index]?.deviceDescription
    )
  );
};
