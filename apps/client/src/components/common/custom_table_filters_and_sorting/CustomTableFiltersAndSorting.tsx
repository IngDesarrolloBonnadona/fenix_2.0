import React, { useRef, useState } from "react";
import { Button, Space, Table, Row, Col, Skeleton, Empty, Input } from "antd";
import {
  ReloadOutlined,
  LoadingOutlined,
  SearchOutlined,
  FilterOutlined,
  CloseCircleOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

import type {
  InputRef,
  TableColumnsType,
  TableColumnType,
  TableProps,
} from "antd";
import CustomButton from "../custom_button/CustomButton";
import { FaBroom, FaFilter, FaRegWindowClose, FaSearch } from "react-icons/fa";
import { LuFilterX } from "react-icons/lu";
import CustomSpin from "../custom_spin/CustomSpin";

type OnChange = NonNullable<TableProps<CaseReportValidate>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface ColumnConfig<T> {
  title: string;
  key: string;
  dataIndex: string;
  width?: string | number;
  filters?: { text: string; value: React.Key }[];
  onFilter?: (value: boolean | React.Key, record: T) => boolean;
  sorter?: (a: T, b: T) => number;
  searchable?: boolean;
  fixed?: boolean | "left" | "right";
}

const CustomTableFiltersAndSorting: React.FC<{
  dataCustomTable: any[];
  columnsCustomTable: ColumnConfig<any>[];
  onClickRechargeCustomTable: () => void;
  loading: boolean;
  customButton?: React.ReactNode;
  customTag?: React.ReactNode;
  enableRowSelection?: boolean;
  onSelectionChange?: (selection: {
    selectedRowKeys: React.Key[];
    selectedRows: any[];
  }) => void;
}> = ({
  dataCustomTable,
  columnsCustomTable,
  onClickRechargeCustomTable,
  loading,
  customButton,
  customTag,
  enableRowSelection = false,
  onSelectionChange,
}) => {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleChange: OnChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  const clearFilters = () => {
    setFilteredInfo({});
    setSearchText("");
  };

  const clearSorting = () => {
    setSortedInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
    handleReset(clearFilters);
  };

  // Manejador de selección de filas
  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: any[]
  ) => {
    setSelectedRowKeys(newSelectedRowKeys);
    if (onSelectionChange) {
      onSelectionChange({
        selectedRowKeys: newSelectedRowKeys,
        selectedRows,
      });
    }
  };

  const rowSelection = enableRowSelection
    ? {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
          Table.SELECTION_ALL,
          Table.SELECTION_INVERT,
          Table.SELECTION_NONE,
        ],
      }
    : undefined;

  const getColumnSearchProps = (dataIndex: string): TableColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Buscar...`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space
          direction="vertical"
          size={"small"}
          style={{
            width: "100%",
          }}
        >
          <Col
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "space-evenly",
              alignContent: "center",
              alignItems: "center",
              paddingBottom: "7px",
              margin: "0px",
            }}
          >
            <CustomButton
              classNameCustomButton="search-button"
              idCustomButton="search-button"
              titleCustomButton="Buscar"
              typeCustomButton="primary"
              htmlTypeCustomButton="button"
              iconCustomButton={<FaSearch />}
              onClickCustomButton={() =>
                handleSearch(selectedKeys as string[], confirm, dataIndex)
              }
              styleCustomButton={{
                width: "45%",
                background: "#015E90",
                color: "#ffffff",
                borderRadius: "16px",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                marginInline: "2px",
              }}
              iconPositionCustomButton={"start"}
              sizeCustomButton={"small"}
            />
            <CustomButton
              classNameCustomButton="clean-button"
              idCustomButton="clean-button"
              titleCustomButton="Limpiar"
              typeCustomButton="primary"
              htmlTypeCustomButton="reset"
              iconCustomButton={<FaBroom />}
              onClickCustomButton={() =>
                clearFilters && handleReset(clearFilters)
              }
              styleCustomButton={{
                width: "45%",
                background: "#FD7E14",
                color: "#ffffff",
                borderRadius: "16px",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                marginInline: "2px",
              }}
              iconPositionCustomButton={"start"}
              sizeCustomButton={"small"}
            />
          </Col>

          <CustomButton
            classNameCustomButton="filter-button"
            idCustomButton="filter-button"
            titleCustomButton="Filtrar"
            typeCustomButton="primary"
            htmlTypeCustomButton="button"
            iconCustomButton={<FaFilter />}
            onClickCustomButton={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
            styleCustomButton={{
              width: "100%",
              background: "#1D8348",
              color: "#ffffff",
              borderRadius: "16px",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              paddingInline: "7px",
              marginBottom: "7px",
            }}
            iconPositionCustomButton={"start"}
            sizeCustomButton={"small"}
          />
          <CustomButton
            classNameCustomButton="close-button"
            idCustomButton="close-button"
            titleCustomButton="Cerrar"
            typeCustomButton="primary"
            htmlTypeCustomButton="button"
            iconCustomButton={<FaRegWindowClose />}
            onClickCustomButton={() => close()}
            styleCustomButton={{
              width: "100%",
              background: "#8C1111",
              color: "#ffffff",
              borderRadius: "16px",
              fontWeight: "bold",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              paddingInline: "7px",
              marginBottom: "7px",
            }}
            iconPositionCustomButton={"start"}
            sizeCustomButton={"small"}
          />
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      const recordValue = record[dataIndex];
      if (recordValue !== null && recordValue !== undefined) {
        const normalizedValue = (value as string)
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const normalizedRecordValue = recordValue
          .toString()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        return normalizedRecordValue
          .toUpperCase()
          .includes(normalizedValue.toUpperCase());
      }
      return false;
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<any> = columnsCustomTable.map((col) => {
    const column = {
      ...col,
      filteredValue: filteredInfo[col.key] || null,
      sortOrder: sortedInfo.columnKey === col.key ? sortedInfo.order : null,
      ellipsis: true,
    };

    if (col.searchable) {
      Object.assign(column, getColumnSearchProps(col.dataIndex));
    }

    if (col.fixed) {
      column.fixed = col.fixed;
    }

    return column;
  });

  return (
    <Row
      justify="center"
      style={{
        width: "450px",
        minWidth: "100%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        padding: "0px",
        marginBlock: "13px",
        marginInline: "0px",
      }}
    >
      <Col span={24} style={{ width: "100%" }}>
        <Row style={{ marginBottom: "16px", marginTop: 0 }}>
          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomButton
              classNameCustomButton="recharge-button"
              idCustomButton="recharge-button"
              titleCustomButton="Actualizar"
              typeCustomButton="primary"
              htmlTypeCustomButton="button"
              iconCustomButton={
                !loading ? <ReloadOutlined /> : <LoadingOutlined />
              }
              onClickCustomButton={onClickRechargeCustomTable}
              styleCustomButton={{
                background: "#002140",
                color: "#ffffff",
                borderRadius: "16px",
              }}
              iconPositionCustomButton="end"
              sizeCustomButton="small"
              disabledCustomButton={loading}
            />
            <CustomButton
              classNameCustomButton="remove-filters-button"
              idCustomButton="remove-filters-button"
              titleCustomButton="Quitar filtros"
              typeCustomButton="primary"
              htmlTypeCustomButton="button"
              iconCustomButton={<LuFilterX />}
              onClickCustomButton={() => {
                clearFilters();
              }}
              styleCustomButton={{
                marginLeft: "16px",
                background: "#6C757D",
                color: "#ffffff",
                borderRadius: "16px",
              }}
              iconPositionCustomButton="end"
              sizeCustomButton="small"
            />
            <CustomButton
              classNameCustomButton="remove-order-button"
              idCustomButton="remove-order-button"
              titleCustomButton="Quitar orden"
              typeCustomButton="primary"
              htmlTypeCustomButton="button"
              iconCustomButton={<SortAscendingOutlined />}
              onClickCustomButton={() => {
                clearSorting();
              }}
              styleCustomButton={{
                marginLeft: "16px",
                background: "#868E96",
                color: "#ffffff",
                borderRadius: "16px",
              }}
              iconPositionCustomButton="end"
              sizeCustomButton="small"
            />
            <CustomButton
              classNameCustomButton="clean-all-button"
              idCustomButton="clean-all-button"
              titleCustomButton="Limpiar todo"
              typeCustomButton="primary"
              htmlTypeCustomButton="button"
              iconCustomButton={<CloseCircleOutlined />}
              onClickCustomButton={() => {
                clearAll();
              }}
              styleCustomButton={{
                marginLeft: "16px",
                background: "#FF7F50",
                color: "#ffffff",
                borderRadius: "16px",
              }}
              iconPositionCustomButton="end"
              sizeCustomButton="small"
            />
            {customButton}
          </Col>
          {customTag}
        </Row>
        <Table
          columns={columns}
          dataSource={dataCustomTable}
          onChange={handleChange}
          bordered
          rowKey={(record) => record.id}
          size={"small"}
          loading={{
            spinning: loading,
            indicator: <CustomSpin />,
          }}
          rowSelection={rowSelection}
          locale={{
            emptyText: loading ? (
              <Skeleton active />
            ) : (
              <Empty description="No hay nada para mostrar... " />
            ),
            filterReset: "Resetear",
            filterConfirm: "Aplicar",
            triggerAsc: "Haga clic para ordenar en orden ascendente",
            triggerDesc: "Haga clic para ordenar en orden descendente",
            cancelSort: "Haga clic para cancelar",
          }}
          pagination={{
            size: "small",
            position: ["bottomCenter"],
            showQuickJumper: true,
            style: {
              margin: "0px",
              paddingTop: "13px",
            },
            showTotal: (total) => `Total ${total} registro(s)`,
            locale: {
              jump_to: "Ir a",
              page: "Página",
              items_per_page: "/ Página",
            },
          }}
          scroll={{
            x: 900,
          }}
        />
      </Col>
    </Row>
  );
};

export default CustomTableFiltersAndSorting;
