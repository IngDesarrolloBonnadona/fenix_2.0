interface DeviceCaseReport {
  id?: number;
  dev_case_id_fk?: string;
  dev_code: string;
  dev_name: string;
  dev_description?: string;
  dev_status?: boolean;
  createdAt?: string;
  updateAt?: string;
  deletedAt?: string | null;
  listDevices?: Array<DeviceCaseReport>
}
