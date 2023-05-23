import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "antd";
import dayjs from "dayjs";
const GeneratePdf = () => {
  const handleClick = () => {
    const doc = new jsPDF();
    var pageHeight =
      doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth =
      doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    doc.setTextColor(100);
    doc.setFontSize(20);

    doc.text("Analytics Report", pageWidth / 2, 10, {
      align: "center",
    });
    doc.setFontSize(10);
    doc.text("Date:" + dayjs().toDate().toLocaleString(), pageWidth / 2, 20, {
      align: "center",
    });

    doc.text("Number of sub redits:", 10, 40);
    doc.text("Total number of posts made:", 10, 50);
    doc.text("Avg upvotes:", 10, 60);
    doc.text("Average comments:", 10, 70);

    autoTable(doc, {
      head: [["Subredit name", "Up Votes", "Online Members", "Members"]],
      body: [
        // ...
      ],
      startY: 80,
    });
    doc.save("a4.pdf");
  };
  return (
    <div>
      <Button
        onClick={() => {
          handleClick();
        }}
      >
        Generate Pdf
      </Button>
    </div>
  );
};

export default GeneratePdf;
