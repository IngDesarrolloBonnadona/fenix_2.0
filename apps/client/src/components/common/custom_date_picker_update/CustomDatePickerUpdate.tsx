"use client";

import React from "react";

import { DatePicker } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/es";
import locale from "antd/es/date-picker/locale/es_ES";

dayjs.locale("es");

const CustomDatePickerUpdate: React.FC<{
  onChangeDateCustomDatePicker: (
    date: any,
    dateString: string | string[]
  ) => void;
  value?: any;
}> = ({ onChangeDateCustomDatePicker, value }) => {
  const DATE_FORMAT = "YYYY-MM-DD";

  return (
    <DatePicker
      className="custom-date-picker"
      placeholder="Seleccionar fecha"
      style={{
        width: "100%",
      }}
      format={{
        format: DATE_FORMAT,
        // type: "mask",
      }}
      minDate={dayjs().subtract(130, "year")}
      disabledDate={(current) => current && current > dayjs().endOf("day")}
      // mode="date"
      size="small"
      allowClear
      onChange={onChangeDateCustomDatePicker}
      value={value ? dayjs(value, DATE_FORMAT) : null}
      locale={locale}
      popupStyle={{
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
      }}
    />
  );
};

export default CustomDatePickerUpdate;
