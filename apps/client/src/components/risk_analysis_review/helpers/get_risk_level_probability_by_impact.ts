import { RiskLevelProbabilityByImpactEnum } from "@/utils/enums/risk_level_probability_by_impact.enum";

export const getRiskLevelProbabilityByImpact = (
  probability: number,
  impact: number
) => {
  const riskLevel = probability * impact;

  if (riskLevel >= 1 && riskLevel <= 5) {
    return { name: RiskLevelProbabilityByImpactEnum.LOW, color: "#137A2B" };
  } else if (riskLevel >= 6 && riskLevel <= 10) {
    return {
      name: RiskLevelProbabilityByImpactEnum.MODERATE,
      color: "#F4D03F",
    };
  } else if (riskLevel >= 11 && riskLevel <= 16) {
    return {
      name: RiskLevelProbabilityByImpactEnum.ABOVE_AVERAGE,
      color: "#FD7E14",
    };
  } else if (riskLevel >= 17 && riskLevel <= 25) {
    return { name: RiskLevelProbabilityByImpactEnum.HIGH, color: "#eb1313" };
  }
};

export const getAlertTypeRiskLevel = (riskLevelName: string) => {
  switch (riskLevelName) {
    case RiskLevelProbabilityByImpactEnum.LOW:
      return "success";
    case RiskLevelProbabilityByImpactEnum.MODERATE:
      return "info";
    case RiskLevelProbabilityByImpactEnum.ABOVE_AVERAGE:
      return "warning";
    case RiskLevelProbabilityByImpactEnum.HIGH:
      return "error";
    default:
      return "info";
  }
};
