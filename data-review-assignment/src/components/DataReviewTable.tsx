// components/DataReview.tsx

import { useEffect, useState } from "react";
import { ErrorDialog } from "./ErrorDialog";
import { CSVLink } from "react-csv";
import { Button, Tooltip } from "@material-tailwind/react";
import styles from "./styles/DataReviewTable.module.css";

export default function DataReviewTable() {
  const [data, setData] = useState([]);

  async function getData() {
    const url = "/api/data";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setData(json.records);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const getCSVData = (data: any) => {
    return data.map((record: any) => {
      return {
        ...record,
        // convert error object to string
        errors: JSON.stringify(record.errors),
      };
    });
  };

  return (
    <div style={{ margin: "20px" }}>
      <div className={styles.header}>
        <h1 className={styles.title}>Data Review</h1>
        <CSVLink data={getCSVData(data)}>
          <Button>Export CSV</Button>
        </CSVLink>
      </div>
      {data.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key} className={styles.tableHeader}>
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((record: any) => (
              <tr key={record.id}>
                {Object.entries(record).map(([key, value]: any) => {
                  if (key === "errors") {
                    return (
                      <td key={record.id + key} className={styles.errorDialog}>
                        <ErrorDialog
                          buttonText="Show Errors"
                          headerText="Error Summary"
                          errors={value}
                        />
                      </td>
                    );
                  }
                  if (key in record.errors) {
                    return (
                      <Tooltip content={record.errors[key].message}>
                        <td
                          key={record.id + key}
                          className={styles[record.errors[key].severity]}
                        >
                          {value}
                        </td>
                      </Tooltip>
                    );
                  }
                  return (
                    <td key={record.id + key} className={styles.tableData}>
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
