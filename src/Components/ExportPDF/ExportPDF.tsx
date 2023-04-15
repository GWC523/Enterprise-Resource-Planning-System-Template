import React, { useState } from "react";
import PropTypes from "prop-types";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import Button from "Components/Button/Button";

export default function ExportPDF({ name, data, header }) {
  var infos = [{}]

    data.map((info: { [s: string]: unknown; } | ArrayLike<unknown>, index: any) => {
      infos.push(Object.values(info));
    });
  
  function print() {
    const doc = new jsPDF("l", "mm", "tabloid");
    doc.text(name, 20, 20);

    autoTable(doc, {
      styles: {
        fontSize: 7,
      },

      theme: "plain",
      margin: { top: 25 },
      head: [header],
      body: infos,
    });

    doc.save(name + ".pdf");
  }

   return (
     <Button
       type="export-pdf"
       title="EXPORT TO PDF"
       role="export"
       className="export-btn"
       onClick={print}
     />
   );
}

ExportPDF.propTypes = {
  name: PropTypes.string,
  data: PropTypes.array,
  header: PropTypes.array
};
