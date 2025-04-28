import { Empty, Skeleton, Table } from "antd";
import React from "react";
import CustomSpin from "../custom_spin/CustomSpin";

interface ColumnConfig<T> {
  title: string;
  key: string;
  dataIndex: string;
  width?: string | number;
}

const CustomSimpleTable: React.FC<{
  dataCustomTable: any[];
  columnsCustomTable: ColumnConfig<any>[];
  loading?: boolean;
}> = ({ dataCustomTable, columnsCustomTable, loading }) => {
  return (
    <Table
      columns={columnsCustomTable}
      dataSource={dataCustomTable}
      bordered
      rowKey={(record) => record.id}
      size={"small"}
      loading={{
        spinning: loading,
        indicator: <CustomSpin />,
      }}
      locale={{
        emptyText: loading ? (
          <Skeleton active />
        ) : (
          <Empty description="No hay nada para mostrar... " />
        ),
      }}
      pagination={false}
    />
  );
};

export default CustomSimpleTable;
